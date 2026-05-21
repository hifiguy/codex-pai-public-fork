# Engine Porting Guide

PAI is a framework first and an engine integration second. This v5 release is the ChatGPT Codex adapter, so Codex-specific names remain in live paths where they are operationally true. Future forks should update the engine adapter surfaces below instead of doing broad string replacement.

## Stable PAI Surfaces

These are framework concepts and should survive engine ports unchanged unless the PAI architecture itself changes:

| Surface | Purpose |
|---------|---------|
| `PAI/` | Framework root for docs, tools, memory, and user context |
| `PAI/USER/` | Private user identity, goals, projects, preferences |
| `PAI/MEMORY/` | Persistent work, learning, knowledge, and state |
| `PAI/TOOLS/` | Framework utilities and CLIs |
| `PAI/ALGORITHM/` | Versioned task execution doctrine |
| `PAI/PAI_SYSTEM_PROMPT.md` | PAI constitutional rules loaded by the launcher |
| `PAI/TOOLS/Inference.ts` | Backend-agnostic model-call gateway |
| `PAI/PULSE/` | Dashboard, notification, and observability layer |

## Current Codex Adapter Map

| Adapter Surface | Current Codex Value | Porting Target |
|-----------------|---------------------|----------------|
| Engine home | `~/.codex` | New engine home or PAI-managed home |
| Launcher variables | `ENGINE_DIR`, `ENGINE_HOME` | Keep names; change defaults if needed |
| Compatibility variable | `CODEX_HOME` | Replace only if the target engine has an equivalent |
| Primary instruction file | `AGENTS.md` | Target engine's project instruction file |
| Config file | `config.toml` | Target engine config format |
| Legacy metadata | `settings.json` | Keep only if needed for PAI state, not engine control |
| Skills directory | `~/.codex/skills` | Target engine skill/plugin directory |
| Agent definitions | `.codex/agents/*.toml` | Target engine subagent format |
| Commands | `.codex/commands/*.md` | Target engine command/shortcut mechanism |
| Hooks | `hooks.*` entries in `config.toml` | Target engine lifecycle/hook API |
| Hook event names | `pre_tool_use`, `post_tool_use`, `pre_compact`, `session_start`, `user_prompt_submit` | Target engine lifecycle events |
| Interactive CLI | `codex` | Target engine CLI |
| Non-interactive CLI | `codex exec` | Target engine batch/exec mode |
| Workspace flag | `--cd` | Target engine workspace flag |
| One-shot/no-history flag | `--ephemeral` | Target engine equivalent, or remove if unsupported |
| Session storage | `~/.codex/projects/...` | Target engine transcript/session store |
| MCP management | `codex mcp` + `.mcp.json` | Target engine tool/server integration |

## Backend Versus Engine

Do not confuse model backends with the engine adapter.

`PAI/TOOLS/Inference.ts` can route model calls through Codex CLI, OpenAI, OpenAI-compatible gateways, Anthropic, Ollama, LM Studio, and other providers. That is backend portability.

The engine adapter is the surrounding harness: instruction loading, hooks, skills, agents, commands, sessions, permissions, and CLI execution. This v5 fork uses Codex for that harness.

## Porting Checklist

1. Choose the target engine and identify its equivalents for instructions, config, hooks, skills, agents, commands, session storage, and CLI execution.
2. Update `PAI/TOOLS/pai.ts` first. It owns engine launch, prompt execution, workspace anchoring, and `PAI_SYSTEM_PROMPT.md` loading.
3. Update engine config files next. For Codex this is `config.toml`; a different engine may need a different file shape.
4. Convert hook registrations and hook payload adapters. Do not silently drop security hooks; document unsupported lifecycle gaps in `MIGRATION_GAPS.md`.
5. Convert agent definitions. Preserve behavior and tool permissions, but use the target engine's native subagent format.
6. Convert skills and command shortcuts. Remove source-engine tool-call syntax and replace it with target-engine primitives.
7. Update statusline/session parsers that read engine-specific state paths.
8. Run portability scans for old engine names, old home directories, removed flags, and obsolete hook event names.
9. Verify with the target engine's strict config or doctor command when available.

## Do Not Rename Blindly

- Keep `ENGINE_DIR` and `ENGINE_HOME` as PAI abstraction names.
- Do not replace `AGENTS.md` unless the target engine uses a different live instruction file.
- Do not replace `CODEX_HOME` until every caller has a target-engine equivalent or a compatibility plan.
- Do not rename PAI framework paths such as `PAI/TOOLS/`, `PAI/USER/`, or `PAI/MEMORY/`.
- Do not alias PAI system upgrades to engine binary updates. `pai update` updates the engine CLI; `pai upgrade` runs PAIUpgrade in review-only mode.

## Current Guardrail

The public Codex fork should contain no legacy engine-home dependency and no source-engine instruction files. Mentions of a source engine should be limited to optional backend support, historical references, or product names where they are intentionally part of a skill.
