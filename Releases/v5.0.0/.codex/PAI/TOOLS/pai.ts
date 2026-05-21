#!/usr/bin/env bun
/**
 * pai - Personal AI CLI Tool
 *
 * Comprehensive CLI for managing ChatGPT Codex with dynamic MCP loading,
 * updates, version checking, and profile management.
 *
 * Usage:
 *   pai                  Launch ChatGPT Codex (default profile)
 *   pai -m bd            Launch with Bright Data MCP
 *   pai -m bd,ap         Launch with multiple MCPs
 *   pai -r / --resume    Resume last session
 *   pai --local          Stay in current directory (don't cd to ~/.codex)
 *   pai update           Update ChatGPT Codex CLI
 *   pai upgrade          Check for PAI system upgrade recommendations
 *   pai version          Show version info
 *   pai profiles         List available profiles
 *   pai mcp list         List available MCPs
 *   pai mcp set <profile>  Set MCP profile
 */

import { spawn, spawnSync } from "bun";
import { getIdentity, getStartupCatchphrase } from "../../../.codex/hooks/lib/identity";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, readdirSync, symlinkSync, unlinkSync, lstatSync } from "fs";
import { homedir, tmpdir } from "os";
import { join, basename } from "path";

// ============================================================================
// Configuration
// ============================================================================

const ENGINE_DIR = join(homedir(), ".codex");
const MCP_DIR = join(ENGINE_DIR, "MCPs");
const ACTIVE_MCP = join(ENGINE_DIR, ".mcp.json");
const BANNER_SCRIPT = join(ENGINE_DIR, "PAI", "TOOLS", "Banner.ts");
const STATUSLINE_SCRIPT = join(ENGINE_DIR, "PAI", "statusline-command.sh");
const VOICE_SERVER = "http://localhost:31337/notify/personality";
const WALLPAPER_DIR = join(homedir(), "Projects", "Wallpaper");
// Note: RAW archiving removed - ChatGPT Codex handles its own cleanup (30-day retention in projects/)

// MCP shorthand mappings
const MCP_SHORTCUTS: Record<string, string> = {
  bd: "Brightdata-MCP.json",
  brightdata: "Brightdata-MCP.json",
  ap: "Apify-MCP.json",
  apify: "Apify-MCP.json",
  cu: "ClickUp-MCP.json",
  clickup: "ClickUp-MCP.json",
  dev: "dev-work.mcp.json",
  sec: "security.mcp.json",
  security: "security.mcp.json",
  research: "research.mcp.json",
  full: "full.mcp.json",
  min: "minimal.mcp.json",
  minimal: "minimal.mcp.json",
  none: "none.mcp.json",
};

// Profile descriptions
const PROFILE_DESCRIPTIONS: Record<string, string> = {
  none: "No MCPs (maximum performance)",
  minimal: "Essential MCPs (content, daemon, Foundry)",
  "dev-work": "Development tools (Shadcn, Codex, Supabase)",
  security: "Security tools (httpx, naabu)",
  research: "Research tools (Brightdata, Apify)",
  clickup: "Official ClickUp MCP (tasks, time tracking, docs)",
  full: "All available MCPs",
};

// ============================================================================
// Utilities
// ============================================================================

function log(message: string, emoji = "") {
  console.log(emoji ? `${emoji} ${message}` : message);
}


function error(message: string) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function notifyVoice(message: string) {
  // Fire and forget voice notification using Qwen3-TTS with personality
  const identity = getIdentity();
  const personality = identity.personality;

  if (!personality?.baseVoice) {
    // Fall back to simple notify if no personality configured
    fetch("http://localhost:31337/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, play: true }),
    }).catch(() => {});
    return;
  }

  fetch(VOICE_SERVER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      personality: {
        name: identity.name.toLowerCase(),
        base_voice: personality.baseVoice,
        enthusiasm: personality.enthusiasm,
        energy: personality.energy,
        expressiveness: personality.expressiveness,
        resilience: personality.resilience,
        composure: personality.composure,
        optimism: personality.optimism,
        warmth: personality.warmth,
        formality: personality.formality,
        directness: personality.directness,
        precision: personality.precision,
        curiosity: personality.curiosity,
        playfulness: personality.playfulness,
      },
    }),
  }).catch(() => {}); // Silently ignore errors
}

function displayBanner() {
  if (existsSync(BANNER_SCRIPT)) {
    spawnSync(["bun", BANNER_SCRIPT], { stdin: "inherit", stdout: "inherit", stderr: "inherit" });
  }
}

function commandExists(command: string): boolean {
  return spawnSync(["/usr/bin/env", "which", command], { stdout: "ignore", stderr: "ignore" }).exitCode === 0;
}

function canAttemptPersistentStatus(): boolean {
  const term = process.env.TERM ?? "";
  return process.env.PAI_PERSISTENT_STATUS !== "0" &&
    process.stdin.isTTY &&
    process.stdout.isTTY &&
    process.stderr.isTTY &&
    term !== "" &&
    term !== "dumb" &&
    commandExists("expect");
}

function getTerminalSize(): { rows: number; cols: number } | null {
  const result = spawnSync(["/bin/sh", "-lc", "stty size < /dev/tty"], { stdout: "pipe", stderr: "ignore" });
  if (result.exitCode !== 0) return null;
  const [rowsRaw, colsRaw] = result.stdout.toString().trim().split(/\s+/);
  const rows = Number(rowsRaw);
  const cols = Number(colsRaw);
  if (!Number.isFinite(rows) || !Number.isFinite(cols) || rows < 1 || cols < 1) return null;
  return { rows, cols };
}

function codexVersion(): string {
  const versionOutput = spawnSync(["codex", "--version"]).stdout.toString().trim();
  const versionMatch = versionOutput.match(/([0-9]+\.[0-9]+\.[0-9]+)/);
  return versionMatch ? versionMatch[1] : versionOutput;
}

function renderStatusBlock(currentDir: string, cols: number, maxRows?: number): string[] {
  if (!existsSync(STATUSLINE_SCRIPT)) return [];
  const payload = {
    workspace: { current_dir: currentDir },
    cwd: currentDir,
    session_id: "pai-live-" + Date.now(),
    model: { display_name: "codex" },
    version: codexVersion(),
    context_window: {
      context_window_size: 200000,
      used_percentage: 0,
      total_input_tokens: 0,
    },
  };

  const result = spawnSync(["bash", STATUSLINE_SCRIPT], {
    stdin: Buffer.from(JSON.stringify(payload)),
    stdout: "pipe",
    stderr: "ignore",
    env: {
      ...process.env,
      COLUMNS: String(cols),
      PAI_DIR: join(ENGINE_DIR, "PAI"),
    },
  });
  if (result.exitCode !== 0) return [];
  const lines = result.stdout.toString().replace(/\s+$/g, "").split(/\r?\n/);
  return typeof maxRows === "number" ? lines.slice(0, maxRows) : lines;
}

function paintStatusBlock(lines: string[], topRows: number, reservedRows: number) {
  const out: string[] = ["\x1b7"];
  for (let i = 0; i < reservedRows; i++) {
    out.push(`\x1b[${topRows + i + 1};1H\x1b[2K`);
    if (lines[i]) out.push(lines[i]);
  }
  out.push("\x1b8");
  process.stdout.write(out.join(""));
}

async function spawnCodex(args: string[], env: Record<string, string | undefined>, cwd: string) {
  const proc = spawn(args, {
    stdio: ["inherit", "inherit", "inherit"],
    env,
  });
  return await proc.exited;
}

async function spawnCodexWithPersistentStatus(args: string[], env: Record<string, string | undefined>, cwd: string) {
  if (!canAttemptPersistentStatus()) {
    return await spawnCodex(args, env, cwd);
  }

  const size = getTerminalSize();
  if (!size) return await spawnCodex(args, env, cwd);

  const initialLines = renderStatusBlock(cwd, size.cols);
  if (initialLines.length === 0) return await spawnCodex(args, env, cwd);

  const minCodexRows = 12;
  const reservedRows = Math.min(initialLines.length, Math.max(0, size.rows - minCodexRows));
  if (reservedRows < 4) return await spawnCodex(args, env, cwd);
  const topRows = size.rows - reservedRows;

  const tmp = mkdtempSync(join(tmpdir(), "pai-codex-pty-"));
  const expectPath = join(tmp, "run.expect");
  writeFileSync(expectPath, [
    "set timeout -1",
    "set top_rows [lindex $argv 0]",
    "set cols [lindex $argv 1]",
    "set cmd [lrange $argv 3 end]",
    "spawn -noecho {*}$cmd",
    "stty rows $top_rows columns $cols < $spawn_out(slave,name)",
    "interact",
    "set result [wait]",
    "exit [lindex $result 3]",
    "",
  ].join("\n"));

  let closed = false;
  const repaint = () => {
    if (closed) return;
    const lines = renderStatusBlock(cwd, size.cols, reservedRows);
    paintStatusBlock(lines.length ? lines : initialLines, topRows, reservedRows);
  };

  process.stdout.write("\x1b[2J\x1b[H\x1b[?25l");
  repaint();
  const timer = setInterval(repaint, 2000);

  const proc = spawn(["expect", expectPath, String(topRows), String(size.cols), "--", ...args], {
    stdio: ["inherit", "inherit", "inherit"],
    env: {
      ...env,
      LINES: String(topRows),
      COLUMNS: String(size.cols),
    },
  });

  const exitCode = await proc.exited;
  closed = true;
  clearInterval(timer);
  process.stdout.write("\x1b[?25h");
  try { rmSync(tmp, { recursive: true, force: true }); } catch {}
  return exitCode;
}

function buildPaiBootstrapPrompt(systemPromptFile: string, userPrompt?: string): string | null {
  if (!existsSync(systemPromptFile)) {
    return userPrompt ?? null;
  }

  const paiInstructions = readFileSync(systemPromptFile, "utf-8").trim();
  const sections = [
    "Load and follow these PAI operating instructions for this session:",
    paiInstructions,
  ];

  if (userPrompt?.trim()) {
    sections.push("Initial user request:", userPrompt.trim());
  }

  return sections.join("\n\n");
}

function getCurrentVersion(): string | null {
  const result = spawnSync(["codex", "--version"]);
  const output = result.stdout.toString();
  const match = output.match(/([0-9]+\.[0-9]+\.[0-9]+)/);
  return match ? match[1] : null;
}

function compareVersions(a: string, b: string): number {
  const partsA = a.split(".").map(Number);
  const partsB = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (partsA[i] > partsB[i]) return 1;
    if (partsA[i] < partsB[i]) return -1;
  }
  return 0;
}

async function getLatestVersion(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://storage.googleapis.com/codex-dist-86c565f3-f756-42ad-8dfa-d59b1c096819/codex-releases/latest"
    );
    const version = (await response.text()).trim();
    if (/^[0-9]+\.[0-9]+\.[0-9]+/.test(version)) {
      return version;
    }
  } catch {
    return null;
  }
  return null;
}

// ============================================================================
// MCP Management
// ============================================================================

function getMcpProfiles(): string[] {
  if (!existsSync(MCP_DIR)) return [];
  return readdirSync(MCP_DIR)
    .filter((f) => f.endsWith(".mcp.json"))
    .map((f) => f.replace(".mcp.json", ""));
}

function getIndividualMcps(): string[] {
  if (!existsSync(MCP_DIR)) return [];
  return readdirSync(MCP_DIR)
    .filter((f) => f.endsWith("-MCP.json"))
    .map((f) => f.replace("-MCP.json", ""));
}

function getCurrentProfile(): string | null {
  if (!existsSync(ACTIVE_MCP)) return null;
  try {
    const stats = lstatSync(ACTIVE_MCP);
    if (stats.isSymbolicLink()) {
      const target = readFileSync(ACTIVE_MCP, "utf-8");
      // For symlink, we need the real target name
      const realpath = Bun.spawnSync(["readlink", ACTIVE_MCP]).stdout.toString().trim();
      return basename(realpath).replace(".mcp.json", "");
    }
    return "custom";
  } catch {
    return null;
  }
}

function mergeMcpConfigs(mcpFiles: string[]): object {
  const merged: Record<string, any> = { mcpServers: {} };

  for (const file of mcpFiles) {
    const filepath = join(MCP_DIR, file);
    if (!existsSync(filepath)) {
      log(`Warning: MCP file not found: ${file}`, "⚠️");
      continue;
    }
    try {
      const config = JSON.parse(readFileSync(filepath, "utf-8"));
      if (config.mcpServers) {
        Object.assign(merged.mcpServers, config.mcpServers);
      }
    } catch (e) {
      log(`Warning: Failed to parse ${file}`, "⚠️");
    }
  }

  return merged;
}

function setMcpProfile(profile: string) {
  const profileFile = join(MCP_DIR, `${profile}.mcp.json`);
  if (!existsSync(profileFile)) {
    error(`Profile '${profile}' not found`);
  }

  // Remove existing
  if (existsSync(ACTIVE_MCP)) {
    unlinkSync(ACTIVE_MCP);
  }

  // Create symlink
  symlinkSync(profileFile, ACTIVE_MCP);
  log(`Switched to '${profile}' profile`, "✅");
  log("Restart ChatGPT Codex to apply", "⚠️");
}

function setMcpCustom(mcpNames: string[]) {
  const files: string[] = [];

  for (const name of mcpNames) {
    const file = MCP_SHORTCUTS[name.toLowerCase()];
    if (file) {
      files.push(file);
    } else {
      // Try direct file match
      const directFile = `${name}-MCP.json`;
      const profileFile = `${name}.mcp.json`;
      if (existsSync(join(MCP_DIR, directFile))) {
        files.push(directFile);
      } else if (existsSync(join(MCP_DIR, profileFile))) {
        files.push(profileFile);
      } else {
        error(`Unknown MCP: ${name}`);
      }
    }
  }

  const merged = mergeMcpConfigs(files);

  // Remove symlink if exists, write new file
  if (existsSync(ACTIVE_MCP)) {
    unlinkSync(ACTIVE_MCP);
  }
  writeFileSync(ACTIVE_MCP, JSON.stringify(merged, null, 2));

  const serverCount = Object.keys((merged as any).mcpServers || {}).length;
  if (serverCount > 0) {
    log(`Configured ${serverCount} MCP server(s): ${mcpNames.join(", ")}`, "✅");
  }
}

// ============================================================================
// Wallpaper Management
// ============================================================================

function getWallpapers(): string[] {
  if (!existsSync(WALLPAPER_DIR)) return [];
  return readdirSync(WALLPAPER_DIR)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort();
}

function getWallpaperName(filename: string): string {
  return basename(filename).replace(/\.(png|jpg|jpeg|webp)$/i, "");
}

function findWallpaper(query: string): string | null {
  const wallpapers = getWallpapers();
  const queryLower = query.toLowerCase();

  // Exact match (without extension)
  const exact = wallpapers.find((w) => getWallpaperName(w).toLowerCase() === queryLower);
  if (exact) return exact;

  // Partial match
  const partial = wallpapers.find((w) => getWallpaperName(w).toLowerCase().includes(queryLower));
  if (partial) return partial;

  // Fuzzy: any word match
  const words = queryLower.split(/[-_\s]+/);
  const fuzzy = wallpapers.find((w) => {
    const name = getWallpaperName(w).toLowerCase();
    return words.some((word) => name.includes(word));
  });
  return fuzzy || null;
}

function setWallpaper(filename: string): boolean {
  const fullPath = join(WALLPAPER_DIR, filename);
  if (!existsSync(fullPath)) {
    log(`Wallpaper not found: ${fullPath}`, "❌");
    return false;
  }

  let success = true;

  // Set Kitty background
  try {
    const kittyResult = spawnSync(["kitty", "@", "set-background-image", fullPath]);
    if (kittyResult.exitCode === 0) {
      log("Kitty background set", "✅");
    } else {
      log("Failed to set Kitty background", "⚠️");
      success = false;
    }
  } catch {
    log("Kitty not available", "⚠️");
  }

  // Set macOS desktop background
  try {
    const script = `tell application "System Events" to tell every desktop to set picture to "${fullPath}"`;
    const macResult = spawnSync(["osascript", "-e", script]);
    if (macResult.exitCode === 0) {
      log("macOS desktop set", "✅");
    } else {
      log("Failed to set macOS desktop", "⚠️");
      success = false;
    }
  } catch {
    log("Could not set macOS desktop", "⚠️");
  }

  return success;
}

function cmdWallpaper(args: string[]) {
  const wallpapers = getWallpapers();

  if (wallpapers.length === 0) {
    error(`No wallpapers found in ${WALLPAPER_DIR}`);
  }

  // No args or --list: show available wallpapers
  if (args.length === 0 || args[0] === "--list" || args[0] === "-l" || args[0] === "list") {
    log("Available wallpapers:", "🖼️");
    console.log();
    wallpapers.forEach((w, i) => {
      console.log(`  ${i + 1}. ${getWallpaperName(w)}`);
    });
    console.log();
    log("Usage: pai -w <name>", "💡");
    log("Example: pai -w circuit-board", "💡");
    return;
  }

  // Find and set the wallpaper
  const query = args.join(" ");
  const match = findWallpaper(query);

  if (!match) {
    log(`No wallpaper matching "${query}"`, "❌");
    console.log("\nAvailable wallpapers:");
    wallpapers.forEach((w) => console.log(`  - ${getWallpaperName(w)}`));
    process.exit(1);
  }

  const name = getWallpaperName(match);
  log(`Switching to: ${name}`, "🖼️");

  const success = setWallpaper(match);
  if (success) {
    log(`Wallpaper set to ${name}`, "✅");
    notifyVoice(`Wallpaper changed to ${name}`);
  } else {
    error("Failed to set wallpaper");
  }
}


// ============================================================================
// Commands
// ============================================================================

async function cmdLaunch(options: { mcp?: string; resume?: boolean; skipPerms?: boolean; local?: boolean; systemPrompt?: string }) {
  // AGENTS.md is now static — no build step needed.
  // Algorithm spec is loaded on-demand when Algorithm mode triggers.
  // (InstantiatePAI.ts is retired — kept for reference only)

  if (!canAttemptPersistentStatus()) {
    displayBanner();
  }
  const args = ["codex"];

  // PAI operating instructions are sent as the initial prompt. Current Codex
  // does not expose a supported system-prompt-file launch flag.
  const systemPromptFile = options.systemPrompt ?? join(ENGINE_DIR, "PAI", "PAI_SYSTEM_PROMPT.md");
  const bootstrapPrompt = buildPaiBootstrapPrompt(systemPromptFile);
  if (bootstrapPrompt) {
    args.push(bootstrapPrompt);
  }

  // Handle MCP configuration
  if (options.mcp) {
    const mcpNames = options.mcp.split(",").map((s) => s.trim());
    setMcpCustom(mcpNames);
  }

  // Add flags
  // NOTE: We no longer use --dangerously-skip-permissions by default.
  // The settings.json permission system (allow/deny/ask) provides proper security.
  // Use --dangerous flag explicitly if you really need to skip all permission checks.
  if (options.resume) {
    args.push("--resume");
  }

  // Change to PAI directory unless --local flag is set
  if (!options.local) {
    process.chdir(ENGINE_DIR);
  }

  // Voice notification (using focused marker for calmer tone).
  // Reads daidentity.startupCatchphrase from settings.json so the user's
  // install-time catchphrase is actually honored. Falls back to the
  // historical "<name> here, ready to go." default when unset.
  notifyVoice(`[🎯 focused] ${getStartupCatchphrase()}`);

  // Launch ChatGPT Codex.
  // BILLING: subscription, not API. Strip OPENAI_API_KEY before spawn so the
  // interactive session uses OAuth (`codex /login`) instead of API-key billing.
  // Mirrors the protection in cmdPrompt() — same hazard, same fix.
  const launchEnv = { ...process.env };
  delete launchEnv.OPENAI_API_KEY;
  await spawnCodexWithPersistentStatus(args, launchEnv, process.cwd());
}

async function cmdUpdate() {
  log("Checking for updates...", "🔍");

  const current = getCurrentVersion();
  const latest = await getLatestVersion();

  if (!current) {
    error("Could not detect current version");
  }

  console.log(`Current: v${current}`);
  if (latest) {
    console.log(`Latest:  v${latest}`);
  }

  // Skip if already up to date
  if (latest && compareVersions(current, latest) >= 0) {
    log("Already up to date", "✅");
    return;
  }

  log("Updating ChatGPT Codex...", "🔄");

  // Step 1: Update Bun
  log("Step 1/2: Updating Bun...", "📦");
  const bunResult = spawnSync(["brew", "upgrade", "bun"]);
  if (bunResult.exitCode !== 0) {
    log("Bun update skipped (may already be latest)", "⚠️");
  } else {
    log("Bun updated", "✅");
  }

  // Step 2: Update ChatGPT Codex
  log("Step 2/2: Installing latest ChatGPT Codex...", "🤖");
  const codexResult = spawnSync(["bun", "install", "-g", "@openai/codex"]);
  if (codexResult.exitCode !== 0) {
    error("ChatGPT Codex installation failed");
  }
  log("ChatGPT Codex updated", "✅");

  // Show final version
  const newVersion = getCurrentVersion();
  if (newVersion) {
    console.log(`Now running: v${newVersion}`);
  }
}

async function cmdUpgrade(args: string[]) {
  const details = args.join(" ").trim();
  const prompt = [
    "Run the PAIUpgrade skill in review-only mode.",
    "Check for PAI system upgrade recommendations without modifying files, memory, settings, hooks, skills, or USER data.",
    "Preserve Codex-native behavior and flag any recommendation that would reintroduce source-engine runtime dependencies, legacy engine-home paths, or source-engine tool syntax.",
    details ? `User context: ${details}` : "",
  ].filter(Boolean).join("\n");

  await cmdPrompt(prompt);
}

async function cmdVersion() {
  log("Checking versions...", "🔍");

  const current = getCurrentVersion();
  const latest = await getLatestVersion();

  if (!current) {
    error("Could not detect current version");
  }

  console.log(`Current: v${current}`);
  if (latest) {
    console.log(`Latest:  v${latest}`);
    const cmp = compareVersions(current, latest);
    if (cmp >= 0) {
      log("Up to date", "✅");
    } else {
      log("Update available (run 'pai update')", "⚠️");
    }
  } else {
    log("Could not fetch latest version", "⚠️");
  }
}

function cmdProfiles() {
  log("Available MCP Profiles:", "📋");
  console.log();

  const current = getCurrentProfile();
  const profiles = getMcpProfiles();

  for (const profile of profiles) {
    const isCurrent = profile === current;
    const desc = PROFILE_DESCRIPTIONS[profile] || "";
    const marker = isCurrent ? "→ " : "  ";
    const badge = isCurrent ? " (active)" : "";
    console.log(`${marker}${profile}${badge}`);
    if (desc) console.log(`    ${desc}`);
  }

  console.log();
  log("Usage: pai mcp set <profile>", "💡");
}

function cmdMcpList() {
  log("Available MCPs:", "📋");
  console.log();

  // Individual MCPs
  log("Individual MCPs (use with -m):", "📦");
  const mcps = getIndividualMcps();
  for (const mcp of mcps) {
    const shortcut = Object.entries(MCP_SHORTCUTS)
      .filter(([_, v]) => v === `${mcp}-MCP.json`)
      .map(([k]) => k);
    const shortcuts = shortcut.length > 0 ? ` (${shortcut.join(", ")})` : "";
    console.log(`  ${mcp}${shortcuts}`);
  }

  console.log();
  log("Profiles (use with 'pai mcp set'):", "📁");
  const profiles = getMcpProfiles();
  for (const profile of profiles) {
    const desc = PROFILE_DESCRIPTIONS[profile] || "";
    console.log(`  ${profile}${desc ? ` - ${desc}` : ""}`);
  }

  console.log();
  log("Examples:", "💡");
  console.log("  pai -m bd          # Bright Data only");
  console.log("  pai -m bd,ap       # Bright Data + Apify");
  console.log("  pai mcp set research  # Full research profile");
}

async function cmdPrompt(prompt: string) {
  // One-shot prompt execution
  // NOTE: No --dangerously-skip-permissions - rely on settings.json permissions
  // BILLING: subscription, not API. Removed --bare (forces OPENAI_API_KEY),
  // strip the key from inherited env.
  const workspace = process.env.PAI_CODEX_WORKSPACE || process.cwd();
  const systemPromptFile = join(ENGINE_DIR, "PAI", "PAI_SYSTEM_PROMPT.md");
  const fullPrompt = buildPaiBootstrapPrompt(systemPromptFile, prompt) ?? prompt;
  const args = [
    "codex",
    "exec",
    "--cd",
    workspace,
    "--ephemeral",
    fullPrompt,
  ];

  process.chdir(ENGINE_DIR);

  const env: Record<string, string> = { ...process.env } as Record<string, string>;
  delete env.OPENAI_API_KEY;
  const proc = spawn(args, {
    stdio: ["inherit", "inherit", "inherit"],
    env,
  });

  const exitCode = await proc.exited;
  process.exit(exitCode);
}

function cmdHelp() {
  console.log(`
	pai - Personal AI CLI Tool (v2.0.0)

	USAGE:
	  pai                      Launch ChatGPT Codex (no MCPs, max performance)
	  pai -m <mcp>             Launch with specific MCP(s)
	  pai -m bd,ap             Launch with multiple MCPs
	  pai -r, --resume         Resume last session
	  pai -s, --system-prompt  PAI operating prompt file to load (default: PAI_SYSTEM_PROMPT.md)
	  pai -l, --local          Stay in current directory (don't cd to ~/.codex)

	COMMANDS:
	  pai update               Update ChatGPT Codex CLI to latest version
	  pai upgrade [topic]      Check PAI upgrade recommendations (review-only)
	  pai version, -v          Show version information
	  pai profiles             List available MCP profiles
	  pai mcp list             List all available MCPs
	  pai mcp set <profile>    Set MCP profile permanently
	  pai prompt "<text>"      One-shot prompt execution
	  pai -w, --wallpaper      List/switch wallpapers (Kitty + macOS)
	  pai help, -h             Show this help

MCP SHORTCUTS:
  bd, brightdata           Bright Data scraping
  ap, apify                Apify automation
  cu, clickup              Official ClickUp (tasks, time tracking, docs)
  dev                      Development tools
  sec, security            Security tools
  research                 Research tools (BD + Apify)
  full                     All MCPs
  min, minimal             Essential MCPs only
  none                     No MCPs

	EXAMPLES:
	  pai                      Start with current profile
	  pai -m bd                Start with Bright Data
	  pai -m bd,ap             Start with multiple MCPs
	  pai -r                   Resume last session
	  pai mcp set research     Switch to research profile
	  pai update               Update ChatGPT Codex CLI
	  pai upgrade hooks        Check PAI upgrade recommendations for hooks
	  pai prompt "What time is it?"   One-shot prompt
	  pai -w                   List available wallpapers
	  pai -w circuit-board     Switch wallpaper (Kitty + macOS)
`);
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  // No args - launch without touching MCP config (use native /mcp commands)
  if (args.length === 0) {
    await cmdLaunch({});
    return;
  }

  // Parse arguments
  let mcp: string | undefined;
  let resume = false;
  let skipPerms = true;
  let local = false;
  let systemPrompt: string | undefined;
  let command: string | undefined;
  let subCommand: string | undefined;
  let subArg: string | undefined;
  let promptText: string | undefined;
  let upgradeArgs: string[] = [];
  let wallpaperArgs: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "-m":
      case "--mcp":
        const nextArg = args[i + 1];
        // -m with no arg, or -m 0, or -m "" means no MCPs
        if (!nextArg || nextArg.startsWith("-") || nextArg === "0" || nextArg === "") {
          mcp = "none";
          if (nextArg === "0" || nextArg === "") i++;
        } else {
          mcp = args[++i];
        }
        break;
      case "-r":
      case "--resume":
        resume = true;
        break;
      case "--safe":
        skipPerms = false;
        break;
      case "-s":
      case "--system-prompt":
        systemPrompt = args[++i];
        break;
      case "-l":
      case "--local":
        local = true;
        break;
      case "-v":
      case "--version":
      case "version":
        command = "version";
        break;
      case "-h":
      case "--help":
      case "help":
        command = "help";
        break;
      case "update":
        command = "update";
        break;
      case "upgrade":
      case "--upgrade":
        command = "upgrade";
        upgradeArgs = args.slice(i + 1);
        i = args.length;
        break;
      case "profiles":
        command = "profiles";
        break;
      case "mcp":
        command = "mcp";
        subCommand = args[++i];
        subArg = args[++i];
        break;
      case "prompt":
      case "-p":
        command = "prompt";
        promptText = args.slice(i + 1).join(" ");
        i = args.length; // Exit loop
        break;
      case "-w":
      case "--wallpaper":
        command = "wallpaper";
        wallpaperArgs = args.slice(i + 1);
        i = args.length; // Exit loop
        break;
      default:
        if (!arg.startsWith("-")) {
          // Might be an unknown command
          error(`Unknown command: ${arg}. Use 'pai help' for usage.`);
        }
    }
  }

  // Handle commands
  switch (command) {
    case "version":
      await cmdVersion();
      break;
    case "help":
      cmdHelp();
      break;
    case "update":
      await cmdUpdate();
      break;
    case "upgrade":
      await cmdUpgrade(upgradeArgs);
      break;
    case "profiles":
      cmdProfiles();
      break;
    case "mcp":
      if (subCommand === "list") {
        cmdMcpList();
      } else if (subCommand === "set" && subArg) {
        setMcpProfile(subArg);
      } else {
        error("Usage: pai mcp list | pai mcp set <profile>");
      }
      break;
    case "prompt":
      if (!promptText) {
        error("Usage: pai prompt \"your prompt here\"");
      }
      await cmdPrompt(promptText);
      break;
    case "wallpaper":
      cmdWallpaper(wallpaperArgs);
      break;
    default:
      // Launch with options
      await cmdLaunch({ mcp, resume, skipPerms, local, systemPrompt });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
