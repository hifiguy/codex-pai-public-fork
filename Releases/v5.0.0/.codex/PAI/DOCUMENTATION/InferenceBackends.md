# PAI Inference Backends

PAI routes model calls through `PAI/TOOLS/Inference.ts`. Tools and packs should call that helper instead of importing a provider SDK directly.

## Backend Selection

Set `PAI_INFERENCE_BACKEND` in `~/.codex/PAI/.env`, `~/.config/PAI/.env`, or the shell environment.

| Backend | Use Case | Required Configuration |
| --- | --- | --- |
| `codex` | Default. ChatGPT Codex CLI, including Codex local-provider mode | `codex` on `PATH` |
| `claude-code` | Optional Claude Code CLI backend for local Claude.ai subscription/OAuth use | `claude` on `PATH` and `claude auth login --claudeai` |
| `openai` | OpenAI API | `OPENAI_API_KEY` or `PAI_INFERENCE_API_KEY` |
| `openai-compatible` | Any `/v1/chat/completions` endpoint | `PAI_INFERENCE_BASE_URL`, optional API key |
| `anthropic` | Anthropic Messages API | `ANTHROPIC_API_KEY` or `PAI_INFERENCE_API_KEY` |
| `ollama` | Local Ollama server | `OLLAMA_BASE_URL` or default `http://localhost:11434` |
| `lmstudio` | Local LM Studio server | `LMSTUDIO_BASE_URL` or `PAI_INFERENCE_BASE_URL` |

## Model Selection

Models are selected by run level:

```bash
PAI_INFERENCE_MODEL_FAST=gpt-5.4-mini
PAI_INFERENCE_MODEL_STANDARD=gpt-5.4
PAI_INFERENCE_MODEL_SMART=gpt-5.4
```

Set `PAI_INFERENCE_MODEL` to force one model for every level.

## Local Examples

Ollama:

```bash
PAI_INFERENCE_BACKEND=ollama
PAI_INFERENCE_MODEL_STANDARD=llama3.1
OLLAMA_BASE_URL=http://localhost:11434
```

LM Studio:

```bash
PAI_INFERENCE_BACKEND=lmstudio
PAI_INFERENCE_MODEL_STANDARD=local-model
LMSTUDIO_BASE_URL=http://localhost:1234
```

OpenAI-compatible proxy:

```bash
PAI_INFERENCE_BACKEND=openai-compatible
PAI_INFERENCE_BASE_URL=https://your-gateway.example.com
PAI_INFERENCE_API_KEY=...
PAI_INFERENCE_MODEL_STANDARD=your-model-id
```

Claude Code subscription backend:

```bash
PAI_INFERENCE_BACKEND=claude-code
PAI_INFERENCE_MODEL_FAST=haiku
PAI_INFERENCE_MODEL_STANDARD=sonnet
PAI_INFERENCE_MODEL_SMART=opus
```

Use `claude-code` only for the local operator's own work. Bots or automations that respond to other humans should use explicit API-key or local-inference backends.
