import { afterEach, describe, expect, test } from "bun:test";
import { createServer } from "node:net";
import { join } from "path";
import { inference } from "./Inference";
import { spawnInference } from "../PULSE/lib";

type RecordedRequest = {
  url: string;
  authorization?: string;
  body: any;
};

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) delete process.env[key];
  }
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function isolateInferenceEnv(overrides: Record<string, string>) {
  for (const key of [
    "PAI_CONFIG_DIR",
    "PAI_INFERENCE_BACKEND",
    "PAI_INFERENCE_BASE_URL",
    "PAI_INFERENCE_API_KEY",
    "PAI_INFERENCE_MODEL",
    "PAI_INFERENCE_MODEL_FAST",
    "PAI_INFERENCE_MODEL_STANDARD",
    "PAI_INFERENCE_MODEL_SMART",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "OLLAMA_BASE_URL",
    "LMSTUDIO_BASE_URL",
  ]) {
    delete process.env[key];
  }

  process.env.PAI_CONFIG_DIR = join(import.meta.dir, ".test-empty-config");
  Object.assign(process.env, overrides);
}

function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => {
        if (address && typeof address === "object") resolve(address.port);
        else reject(new Error("Unable to allocate test port"));
      });
    });
  });
}

async function startMockServer(handler: (req: Request, records: RecordedRequest[]) => Response | Promise<Response>) {
  const records: RecordedRequest[] = [];
  const port = await getFreePort();
  const server = Bun.serve({
    hostname: "127.0.0.1",
    port,
    async fetch(req) {
      return handler(req, records);
    },
  });

  return {
    url: `http://127.0.0.1:${server.port}`,
    records,
    stop: () => server.stop(true),
  };
}

describe("PAI inference gateway smoke tests", () => {
  test("CLI-compatible OpenAI backend sends chat/completions requests and parses JSON output", async () => {
    const mock = await startMockServer(async (req, records) => {
      const body = await req.json();
      records.push({
        url: new URL(req.url).pathname,
        authorization: req.headers.get("authorization") ?? undefined,
        body,
      });

      return Response.json({
        choices: [
          {
            message: {
              content: 'Result: {"ok":true,"backend":"openai-compatible"}',
            },
          },
        ],
      });
    });

    try {
      isolateInferenceEnv({
        PAI_INFERENCE_BASE_URL: mock.url,
        PAI_INFERENCE_API_KEY: "test-key",
      });

      const result = await inference({
        backend: "openai-compatible",
        model: "test-model",
        systemPrompt: "Return JSON.",
        userPrompt: "Say ok.",
        expectJson: true,
        timeout: 2_000,
      });

      expect(result.success).toBe(true);
      expect(result.parsed).toEqual({ ok: true, backend: "openai-compatible" });
      expect(mock.records).toHaveLength(1);
      expect(mock.records[0].url).toBe("/v1/chat/completions");
      expect(mock.records[0].authorization).toBe("Bearer test-key");
      expect(mock.records[0].body.model).toBe("test-model");
      expect(mock.records[0].body.messages[0].role).toBe("system");
      expect(mock.records[0].body.messages[1].role).toBe("user");
    } finally {
      mock.stop();
    }
  });

  test("Ollama backend uses /api/chat with no API credential requirement", async () => {
    const mock = await startMockServer(async (req, records) => {
      const body = await req.json();
      records.push({
        url: new URL(req.url).pathname,
        authorization: req.headers.get("authorization") ?? undefined,
        body,
      });

      return Response.json({ message: { content: "ollama-ok" } });
    });

    try {
      isolateInferenceEnv({ PAI_INFERENCE_BASE_URL: mock.url });

      const result = await inference({
        backend: "ollama",
        model: "llama-local",
        systemPrompt: "System",
        userPrompt: "User",
        timeout: 2_000,
      });

      expect(result.success).toBe(true);
      expect(result.output).toBe("ollama-ok");
      expect(mock.records).toHaveLength(1);
      expect(mock.records[0].url).toBe("/api/chat");
      expect(mock.records[0].authorization).toBeUndefined();
      expect(mock.records[0].body.model).toBe("llama-local");
      expect(mock.records[0].body.stream).toBe(false);
    } finally {
      mock.stop();
    }
  });

  test("Pulse spawnInference uses provider-neutral model levels", async () => {
    const mock = await startMockServer(async (req, records) => {
      const body = await req.json();
      records.push({
        url: new URL(req.url).pathname,
        authorization: req.headers.get("authorization") ?? undefined,
        body,
      });

      return Response.json({
        choices: [{ message: { content: "pulse-ok" } }],
      });
    });

    try {
      isolateInferenceEnv({
        PAI_INFERENCE_BACKEND: "openai-compatible",
        PAI_INFERENCE_BASE_URL: mock.url,
        PAI_INFERENCE_API_KEY: "test-key",
        PAI_INFERENCE_MODEL_STANDARD: "standard-model",
      });

      const output = await spawnInference("Pulse prompt", { model: "standard", timeoutMs: 2_000 });

      expect(output).toBe("pulse-ok");
      expect(mock.records).toHaveLength(1);
      expect(mock.records[0].body.model).toBe("standard-model");
    } finally {
      mock.stop();
    }
  });
});
