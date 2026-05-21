#!/usr/bin/env bun
/**
 * ============================================================================
 * INFERENCE - Unified inference tool with three run levels + advisor escalation
 * ============================================================================
 *
 * PURPOSE:
 * Single inference tool with configurable speed/capability trade-offs.
 * The backend is selected with PAI_INFERENCE_BACKEND:
 * - codex: ChatGPT Codex CLI, including local providers via --oss
 * - claude-code: Claude Code CLI, using local Claude auth/subscription state
 * - openai: OpenAI API
 * - openai-compatible: any /v1/chat/completions endpoint
 * - anthropic: Anthropic Messages API
 * - ollama: local Ollama /api/chat
 * - lmstudio: local LM Studio OpenAI-compatible server
 * - Advisor: Smart-tier escalation for commitment-boundary review (Algorithm v3.23+ VERIFY doctrine)
 *
 * USAGE:
 *   bun Inference.ts --level fast <system_prompt> <user_prompt>
 *   bun Inference.ts --level standard <system_prompt> <user_prompt>
 *   bun Inference.ts --level smart <system_prompt> <user_prompt>
 *   bun Inference.ts --mode advisor <task> <state> <question>
 *   bun Inference.ts --mode advisor --auto-state <task> <question>   (v3.24 P5)
 *   bun Inference.ts --json --level fast <system_prompt> <user_prompt>
 *
 * OPTIONS:
 *   --level <fast|standard|smart>  Run level (default: standard)
 *   --mode advisor                 Advisor escalation mode — 3 positional args: task, state, question
 *   --auto-state                   v3.24 P5: Auto-synthesize state from current ISA + recent activity (advisor mode only, 2 positional args: task, question)
 *   --json                         Expect and parse JSON response
 *   --timeout <ms>                 Custom timeout (default varies by level)
 *
 * DEFAULTS BY LEVEL:
 *   fast:     model=haiku,   timeout=15s
 *   standard: backend default model, timeout=30s
 *   smart:    model=opus,    timeout=90s
 *   advisor:  model=opus,    timeout=120s
 *
 * CONFIG:
 *   PAI_INFERENCE_BACKEND=codex|claude-code|openai|openai-compatible|anthropic|ollama|lmstudio
 *   PAI_INFERENCE_MODEL_FAST=<model>
 *   PAI_INFERENCE_MODEL_STANDARD=<model>
 *   PAI_INFERENCE_MODEL_SMART=<model>
 *   PAI_INFERENCE_BASE_URL=<base-url>        # openai-compatible/local
 *   PAI_INFERENCE_API_KEY=<key>              # generic fallback
 *
 * ADVISOR PATTERN (v3.24 Verification Doctrine — see PAI/ALGORITHM/v3.24.0.md):
 *   The advisor() function implements the Sonnet→Opus escalation checkpoint rule
 *   from R Amjad's Anthropic Advisor tool writeup. Call at commitment boundaries:
 *   - Before committing to an approach
 *   - When stuck or diverging
 *   - Once after a durable deliverable, before declaring done
 *   Skip for short reactive tasks (measured: <4 min AND <2 files — v3.24 P2).
 *   On Extended+ ISAs, phase:complete transition = MANDATORY advisor call (v3.24 P4).
 *
 *   Unlike Anthropic's native Advisor which receives the full CC session, this
 *   function takes explicit (task, state, question) parameters. The caller may
 *   supply state manually OR set autoSynthesize: true to have the helper read
 *   the current ISA + recent activity automatically (v3.24 P5 — closes the
 *   state-gaming escape hatch where the caller cherry-picks what the reviewer sees).
 *
 *   Conflict-surfacing rule: if empirical results contradict advisor output,
 *   re-call advisor with the conflict surfaced — do NOT silently switch. Max 2
 *   re-calls on the same conflict; after that, escalate to user (v3.24 P1).
 *
 * ============================================================================
 */

import { spawn } from "child_process";
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { join, resolve } from "path";

export type InferenceLevel = 'fast' | 'standard' | 'smart';

export type InferenceBackend =
  | "codex"
  | "claude-code"
  | "openai"
  | "openai-compatible"
  | "anthropic"
  | "ollama"
  | "lmstudio";

export interface InferenceOptions {
  systemPrompt: string;
  userPrompt: string;
  level?: InferenceLevel;
  backend?: InferenceBackend;
  model?: string;
  expectJson?: boolean;
  timeout?: number;
  /** Optional image file paths. CLI backends receive them as attachments where supported.
   * HTTP backends currently receive paths in the text prompt unless a caller adds native
   * multimodal support for that provider. */
  imagePaths?: string[];
}

export interface InferenceResult {
  success: boolean;
  output: string;
  parsed?: unknown;
  error?: string;
  latencyMs: number;
  level: InferenceLevel;
}

const DEFAULT_TIMEOUTS: Record<InferenceLevel, number> = {
  fast: 15000,
  standard: 30000,
  smart: 90000,
};

const DEFAULT_MODELS: Record<InferenceBackend, Record<InferenceLevel, string>> = {
  codex: {
    fast: "gpt-5.4-mini",
    standard: "gpt-5.4",
    smart: "gpt-5.4",
  },
  "claude-code": {
    fast: "haiku",
    standard: "sonnet",
    smart: "opus",
  },
  openai: {
    fast: "gpt-5.4-mini",
    standard: "gpt-5.4",
    smart: "gpt-5.4",
  },
  "openai-compatible": {
    fast: "gpt-4.1-mini",
    standard: "gpt-4.1",
    smart: "gpt-4.1",
  },
  anthropic: {
    fast: "claude-3-5-haiku-latest",
    standard: "claude-sonnet-4-20250514",
    smart: "claude-opus-4-20250514",
  },
  ollama: {
    fast: "llama3.2",
    standard: "llama3.1",
    smart: "llama3.1",
  },
  lmstudio: {
    fast: "local-model",
    standard: "local-model",
    smart: "local-model",
  },
};

// Advisor-specific defaults (v3.23 VERIFY doctrine).
const ADVISOR_TIMEOUT_MS = 120000;

function loadEnvFiles(): void {
  const home = homedir();
  const candidates = [
    process.env.PAI_CONFIG_DIR ? resolve(process.env.PAI_CONFIG_DIR, ".env") : "",
    join(home, ".codex", "PAI", ".env"),
    join(home, ".config", "PAI", ".env"),
  ].filter(Boolean);

  for (const envPath of candidates) {
    if (!existsSync(envPath)) continue;
    try {
      const content = readFileSync(envPath, "utf-8");
      for (const rawLine of content.split("\n")) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;
        const eqIndex = line.indexOf("=");
        if (eqIndex === -1) continue;
        const key = line.slice(0, eqIndex).trim();
        let value = line.slice(eqIndex + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      // Ignore unreadable env files; explicit process env still wins.
    }
  }
}

function parseBackend(value: string | undefined): InferenceBackend {
  const backend = (value || "codex").toLowerCase();
  if (
    backend === "codex" ||
    backend === "claude-code" ||
    backend === "openai" ||
    backend === "openai-compatible" ||
    backend === "anthropic" ||
    backend === "ollama" ||
    backend === "lmstudio"
  ) {
    return backend;
  }
  throw new Error(`Unsupported PAI_INFERENCE_BACKEND: ${value}`);
}

function modelFor(backend: InferenceBackend, level: InferenceLevel, override?: string): string {
  return (
    override ||
    process.env[`PAI_INFERENCE_MODEL_${level.toUpperCase()}`] ||
    process.env.PAI_INFERENCE_MODEL ||
    DEFAULT_MODELS[backend][level]
  );
}

function promptWithImages(options: InferenceOptions): string {
  if (!options.imagePaths || options.imagePaths.length === 0) return options.userPrompt;
  return [
    "Image inputs:",
    ...options.imagePaths.map((p) => `- ${p}`),
    "",
    options.userPrompt,
  ].join("\n");
}

async function postJson(url: string, headers: Record<string, string>, body: unknown, timeout: number): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status} ${res.statusText}: ${text.slice(0, 500)}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function runCodexCli(options: InferenceOptions, model: string, timeout: number, level: InferenceLevel): Promise<InferenceResult> {
  const startTime = Date.now();

  return new Promise((resolve) => {
    const env = { ...process.env };
    const workspace = process.env.PAI_CODEX_WORKSPACE || process.cwd();
    const args = [
      "exec",
      "--model", model,
      "--sandbox", "read-only",
      "--cd", workspace,
      "--ephemeral",
      ...(process.env.PAI_CODEX_OSS === "1" ? ["--oss"] : []),
      ...(process.env.PAI_CODEX_LOCAL_PROVIDER ? ["--local-provider", process.env.PAI_CODEX_LOCAL_PROVIDER] : []),
      ...(options.imagePaths || []).flatMap((p) => ["--image", p]),
      "-",
    ];

    const prompt = [
      options.systemPrompt ? `System instructions:\n${options.systemPrompt}` : "",
      `User request:\n${options.userPrompt}`,
    ].filter(Boolean).join("\n\n");

    let stdout = "";
    let stderr = "";
    const proc = spawn("codex", args, { env, stdio: ["pipe", "pipe", "pipe"] });

    proc.stdin.write(prompt);
    proc.stdin.end();
    proc.stdout.on("data", (data) => { stdout += data.toString(); });
    proc.stderr.on("data", (data) => { stderr += data.toString(); });

    const timeoutId = setTimeout(() => {
      proc.kill("SIGTERM");
      resolve({
        success: false,
        output: "",
        error: `Timeout after ${timeout}ms`,
        latencyMs: Date.now() - startTime,
        level,
      });
    }, timeout);

    proc.on("close", (code) => {
      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;
      if (code !== 0) {
        resolve({
          success: false,
          output: stdout.trim(),
          error: stderr.trim() || `Process exited with code ${code}`,
          latencyMs,
          level,
        });
        return;
      }
      resolve({ success: true, output: stdout.trim(), latencyMs, level });
    });

    proc.on("error", (err) => {
      clearTimeout(timeoutId);
      resolve({ success: false, output: "", error: err.message, latencyMs: Date.now() - startTime, level });
    });
  });
}

function runClaudeCodeCli(options: InferenceOptions, model: string, timeout: number, level: InferenceLevel): Promise<InferenceResult> {
  const startTime = Date.now();

  return new Promise((resolve) => {
    const env = { ...process.env };
    const args = [
      "--print",
      "--output-format", "text",
      "--model", model,
      "--permission-mode", "dontAsk",
      "--no-session-persistence",
      "--tools", "",
      ...(options.systemPrompt ? ["--system-prompt", options.systemPrompt] : []),
      promptWithImages(options),
    ];

    let stdout = "";
    let stderr = "";
    const proc = spawn("claude", args, { env, stdio: ["ignore", "pipe", "pipe"] });

    proc.stdout.on("data", (data) => { stdout += data.toString(); });
    proc.stderr.on("data", (data) => { stderr += data.toString(); });

    const timeoutId = setTimeout(() => {
      proc.kill("SIGTERM");
      resolve({
        success: false,
        output: "",
        error: `Timeout after ${timeout}ms`,
        latencyMs: Date.now() - startTime,
        level,
      });
    }, timeout);

    proc.on("close", (code) => {
      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;
      if (code !== 0) {
        resolve({
          success: false,
          output: stdout.trim(),
          error: stderr.trim() || `Process exited with code ${code}`,
          latencyMs,
          level,
        });
        return;
      }
      resolve({ success: true, output: stdout.trim(), latencyMs, level });
    });

    proc.on("error", (err) => {
      clearTimeout(timeoutId);
      resolve({ success: false, output: "", error: err.message, latencyMs: Date.now() - startTime, level });
    });
  });
}

async function runOpenAICompatible(
  options: InferenceOptions,
  backend: InferenceBackend,
  model: string,
  timeout: number,
  level: InferenceLevel,
): Promise<InferenceResult> {
  const startTime = Date.now();
  const baseUrl =
    process.env.PAI_INFERENCE_BASE_URL ||
    (backend === "lmstudio" ? process.env.LMSTUDIO_BASE_URL : undefined) ||
    process.env.PAI_OPENAI_BASE_URL ||
    "https://api.openai.com";
  const apiKey =
    process.env.PAI_INFERENCE_API_KEY ||
    process.env.OPENAI_API_KEY ||
    (backend === "lmstudio" ? "lm-studio" : "");

  if (!apiKey && backend !== "lmstudio") {
    return { success: false, output: "", error: "OPENAI_API_KEY or PAI_INFERENCE_API_KEY is required", latencyMs: 0, level };
  }

  try {
    const data = await postJson(
      `${baseUrl.replace(/\/$/, "")}/v1/chat/completions`,
      apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
      {
        model,
        messages: [
          { role: "system", content: options.systemPrompt },
          { role: "user", content: promptWithImages(options) },
        ],
      },
      timeout,
    );
    const output = data.choices?.[0]?.message?.content || "";
    return { success: true, output: output.trim(), latencyMs: Date.now() - startTime, level };
  } catch (err) {
    return { success: false, output: "", error: (err as Error).message, latencyMs: Date.now() - startTime, level };
  }
}

async function runAnthropic(options: InferenceOptions, model: string, timeout: number, level: InferenceLevel): Promise<InferenceResult> {
  const startTime = Date.now();
  const apiKey = process.env.PAI_INFERENCE_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { success: false, output: "", error: "ANTHROPIC_API_KEY or PAI_INFERENCE_API_KEY is required", latencyMs: 0, level };
  }

  try {
    const data = await postJson(
      "https://api.anthropic.com/v1/messages",
      {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      {
        model,
        max_tokens: 4096,
        system: options.systemPrompt,
        messages: [{ role: "user", content: promptWithImages(options) }],
      },
      timeout,
    );
    const output = data.content?.map((part: any) => part.text || "").join("") || "";
    return { success: true, output: output.trim(), latencyMs: Date.now() - startTime, level };
  } catch (err) {
    return { success: false, output: "", error: (err as Error).message, latencyMs: Date.now() - startTime, level };
  }
}

async function runOllama(options: InferenceOptions, model: string, timeout: number, level: InferenceLevel): Promise<InferenceResult> {
  const startTime = Date.now();
  const baseUrl = process.env.PAI_INFERENCE_BASE_URL || process.env.OLLAMA_BASE_URL || "http://localhost:11434";

  try {
    const data = await postJson(
      `${baseUrl.replace(/\/$/, "")}/api/chat`,
      {},
      {
        model,
        stream: false,
        messages: [
          { role: "system", content: options.systemPrompt },
          { role: "user", content: promptWithImages(options) },
        ],
      },
      timeout,
    );
    const output = data.message?.content || "";
    return { success: true, output: output.trim(), latencyMs: Date.now() - startTime, level };
  } catch (err) {
    return { success: false, output: "", error: (err as Error).message, latencyMs: Date.now() - startTime, level };
  }
}

function parseExpectedJson(result: InferenceResult, expectJson?: boolean): InferenceResult {
  if (!expectJson || !result.success) return result;

  const objectMatch = result.output.match(/\{[\s\S]*\}/);
  const arrayMatch = result.output.match(/\[[\s\S]*\]/);

  for (const candidate of [arrayMatch?.[0], objectMatch?.[0]]) {
    if (!candidate) continue;
    try {
      return { ...result, parsed: JSON.parse(candidate) };
    } catch {
      // Try next candidate.
    }
  }

  return { ...result, success: false, error: "Failed to parse JSON response" };
}

/**
 * Run inference with configurable level
 */
export async function inference(options: InferenceOptions): Promise<InferenceResult> {
  loadEnvFiles();
  const level = options.level || 'standard';
  const backend = options.backend || parseBackend(process.env.PAI_INFERENCE_BACKEND);
  const model = modelFor(backend, level, options.model);
  const timeout = options.timeout || DEFAULT_TIMEOUTS[level];

  let result: InferenceResult;
  if (backend === "codex") {
    result = await runCodexCli(options, model, timeout, level);
  } else if (backend === "claude-code") {
    result = await runClaudeCodeCli(options, model, timeout, level);
  } else if (backend === "openai" || backend === "openai-compatible" || backend === "lmstudio") {
    result = await runOpenAICompatible(options, backend, model, timeout, level);
  } else if (backend === "anthropic") {
    result = await runAnthropic(options, model, timeout, level);
  } else {
    result = await runOllama(options, model, timeout, level);
  }

  return parseExpectedJson(result, options.expectJson);
}

/**
 * Synthesize advisor state from the current ISA + recent activity (v3.24 P5).
 *
 * Closes the state-gaming Flaw identified by RedTeam review of v3.23 doctrine:
 * when the caller writes the state string manually, the same cognitive model
 * that might have missed the problem decides what the reviewer sees. Auto-synthesis
 * reads the ISA directly so the reviewer gets the unfiltered state.
 *
 * Reads:
 * - Current ISA content (resolved from MEMORY/STATE/work.json active session, or
 *   the most recently-updated ISA in MEMORY/WORK/)
 * - Recent session activity if available
 *
 * Returns a state string suitable for passing to advisor().
 */
export async function synthesizeAdvisorState(): Promise<string> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const home = process.env.HOME || process.env.USERPROFILE || "";
  const workDir = path.join(home, ".codex", "PAI", "MEMORY", "WORK");
  const stateFile = path.join(home, ".codex", "PAI", "MEMORY", "STATE", "work.json");

  // Try to read active session from work.json
  let activeSlug: string | undefined;
  try {
    const stateRaw = await fs.readFile(stateFile, "utf-8");
    const state = JSON.parse(stateRaw);
    activeSlug = state?.active || state?.current || state?.activeSession;
  } catch {
    // work.json may not exist — fall back to most recent ISA
  }

  // Fall back: find most recently updated ISA in WORK/
  if (!activeSlug) {
    try {
      const entries = await fs.readdir(workDir, { withFileTypes: true });
      const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
      if (dirs.length === 0) {
        return "No active ISA found. Advisor state unavailable.";
      }
      // Sort by mtime
      const statted = await Promise.all(
        dirs.map(async (d) => {
          const s = await fs.stat(path.join(workDir, d));
          return { name: d, mtime: s.mtimeMs };
        }),
      );
      statted.sort((a, b) => b.mtime - a.mtime);
      activeSlug = statted[0].name;
    } catch (err) {
      return `Unable to locate active ISA: ${(err as Error).message}`;
    }
  }

  // Read ISA content
  const isaPath = path.join(workDir, activeSlug, "ISA.md");
  let prdContent: string;
  try {
    prdContent = await fs.readFile(isaPath, "utf-8");
  } catch (err) {
    return `Active session ${activeSlug} has no ISA.md: ${(err as Error).message}`;
  }

  // Truncate to a reasonable size for advisor context (first 300 lines, ~8KB)
  const MAX_LINES = 300;
  const lines = prdContent.split("\n");
  const truncated = lines.length > MAX_LINES
    ? lines.slice(0, MAX_LINES).join("\n") + `\n\n[... ISA truncated at ${MAX_LINES} lines of ${lines.length} total ...]`
    : prdContent;

  return [
    `ISA: ${activeSlug}`,
    `Source: ${isaPath}`,
    ``,
    `--- ISA CONTENT (verbatim, auto-synthesized from disk — not caller-filtered) ---`,
    truncated,
    `--- END ISA CONTENT ---`,
  ].join("\n");
}

/**
 * Advisor escalation — v3.24 Verification Doctrine.
 *
 * Calls smart tier (Opus) framed as a reviewer. Caller may supply explicit state
 * OR set autoSynthesize: true to have the helper read the current ISA automatically
 * (v3.24 P5 — closes state-gaming escape hatch).
 *
 * @param task          What the executor is trying to accomplish
 * @param state         Current relevant state (omit when autoSynthesize is true)
 * @param question      Specific question or decision point the executor faces
 * @param autoSynthesize If true, ignore `state` and read current ISA via synthesizeAdvisorState()
 * @param timeout       Override timeout in ms (default 120000)
 * @returns Structured advisory response
 *
 * Usage:
 *   import { advisor } from "./Inference";
 *
 *   // Manual state
 *   const review = await advisor({
 *     task: "Ship Algorithm v3.24.0",
 *     state: "Edited 8 files; ISC 28/30 passing; Inference.ts typecheck clean.",
 *     question: "Any gaps before declaring done?",
 *   });
 *
 *   // Auto-synthesized state (v3.24 P5 — recommended for commitment boundaries)
 *   const review = await advisor({
 *     task: "Ship Algorithm v3.24.0",
 *     question: "Any gaps before declaring done?",
 *     autoSynthesize: true,
 *   });
 *
 * Rules (from Algorithm v3.24.0 VERIFY doctrine):
 * - Call at commitment boundaries: before approach, when stuck, before declaring done
 * - Skip for MEASURED short reactive tasks (<4 min wall-clock AND <2 files)
 * - Extended+ ISA phase:complete = mandatory advisor call (P4)
 * - On conflict with empirical: re-call surfacing conflict, max 2 re-calls, then escalate (P1)
 */
export interface AdvisorOptions {
  task: string;
  state?: string;
  question: string;
  autoSynthesize?: boolean;
  backend?: InferenceBackend;
  model?: string;
  timeout?: number;
}

export async function advisor(options: AdvisorOptions): Promise<InferenceResult> {
  const systemPrompt = [
    "You are an advisor model invoked at a commitment boundary by an executor model.",
    "Review the executor's task, state, and specific question.",
    "Be direct. Flag risks the executor may have missed.",
    "If you see a fatal flaw, say so. If the approach is sound, confirm and say why.",
    "Your output will be weighed against empirical test results — a passing test does NOT invalidate your review.",
  ].join(" ");

  // Resolve state: either auto-synthesized from ISA or caller-supplied.
  let resolvedState: string;
  if (options.autoSynthesize) {
    resolvedState = await synthesizeAdvisorState();
  } else if (options.state !== undefined) {
    resolvedState = options.state;
  } else {
    return {
      success: false,
      output: "",
      error: "advisor() requires either state or autoSynthesize: true",
      latencyMs: 0,
      level: 'smart',
    };
  }

  const userPrompt = [
    `TASK: ${options.task}`,
    ``,
    `STATE:`,
    resolvedState,
    ``,
    `QUESTION: ${options.question}`,
    ``,
    `Advisory response:`,
  ].join("\n");

  return inference({
    systemPrompt,
    userPrompt,
    level: 'smart',
    backend: options.backend,
    model: options.model,
    timeout: options.timeout ?? ADVISOR_TIMEOUT_MS,
  });
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse flags
  let expectJson = false;
  let timeout: number | undefined;
  let level: InferenceLevel = 'standard';
  let backend: InferenceBackend | undefined;
  let model: string | undefined;
  let mode: 'inference' | 'advisor' = 'inference';
  let autoState = false;  // v3.24 P5
  const positionalArgs: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json') {
      expectJson = true;
    } else if (args[i] === '--auto-state') {
      autoState = true;
    } else if (args[i] === '--mode' && args[i + 1]) {
      const requestedMode = args[i + 1].toLowerCase();
      if (requestedMode === 'advisor' || requestedMode === 'inference') {
        mode = requestedMode;
      } else {
        console.error(`Invalid mode: ${args[i + 1]}. Use inference or advisor.`);
        process.exit(1);
      }
      i++;
    } else if (args[i] === '--level' && args[i + 1]) {
      const requestedLevel = args[i + 1].toLowerCase();
      if (['fast', 'standard', 'smart'].includes(requestedLevel)) {
        level = requestedLevel as InferenceLevel;
      } else {
        console.error(`Invalid level: ${args[i + 1]}. Use fast, standard, or smart.`);
        process.exit(1);
      }
      i++;
    } else if (args[i] === '--timeout' && args[i + 1]) {
      timeout = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--backend' && args[i + 1]) {
      try {
        backend = parseBackend(args[i + 1]);
      } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
      }
      i++;
    } else if (args[i] === '--model' && args[i + 1]) {
      model = args[i + 1];
      i++;
    } else {
      positionalArgs.push(args[i]);
    }
  }

  // Advisor mode: normally task/state/question (3 args), or with --auto-state task/question (2 args)
  if (mode === 'advisor') {
    if (autoState) {
      if (positionalArgs.length < 2) {
        console.error('Usage: bun Inference.ts --mode advisor --auto-state [--backend <name>] [--model <id>] [--json] [--timeout <ms>] <task> <question>');
        process.exit(1);
      }
      const [task, question] = positionalArgs;
      const advisoryResult = await advisor({ task, question, autoSynthesize: true, timeout, backend, model });
      if (advisoryResult.success) {
        console.log(advisoryResult.output);
      } else {
        console.error(`Advisor error: ${advisoryResult.error}`);
        process.exit(1);
      }
      return;
    }
    if (positionalArgs.length < 3) {
      console.error('Usage: bun Inference.ts --mode advisor [--backend <name>] [--model <id>] [--json] [--timeout <ms>] <task> <state> <question>');
      console.error('       bun Inference.ts --mode advisor --auto-state [--backend <name>] [--model <id>] [--json] [--timeout <ms>] <task> <question>');
      process.exit(1);
    }
    const [task, state, question] = positionalArgs;
    const advisoryResult = await advisor({ task, state, question, timeout, backend, model });
    if (advisoryResult.success) {
      console.log(advisoryResult.output);
    } else {
      console.error(`Advisor error: ${advisoryResult.error}`);
      process.exit(1);
    }
    return;
  }

  if (positionalArgs.length < 2) {
    console.error('Usage: bun Inference.ts [--level fast|standard|smart] [--backend <name>] [--model <id>] [--json] [--timeout <ms>] <system_prompt> <user_prompt>');
    process.exit(1);
  }

  const [systemPrompt, userPrompt] = positionalArgs;

  const result = await inference({
    systemPrompt,
    userPrompt,
    level,
    backend,
    model,
    expectJson,
    timeout,
  });

  if (result.success) {
    if (expectJson && result.parsed) {
      console.log(JSON.stringify(result.parsed));
    } else {
      console.log(result.output);
    }
  } else {
    console.error(`Error: ${result.error}`);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.main) {
  main().catch(console.error);
}
