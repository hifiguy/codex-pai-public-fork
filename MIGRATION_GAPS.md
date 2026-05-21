# Codex PAI Migration Gaps

This repo is Codex-native for core inference, but the full PAI control plane is
not yet fully ported from Claude Code semantics. Track gaps here so the repo
does not quietly imply completion where only the engine path has been proven.

## Verified Working

- `PAI/TOOLS/Inference.ts` defaults to `codex`.
- Optional backends include `claude-code`, `openai`, `openai-compatible`,
  `anthropic`, `ollama`, and `lmstudio`.
- `bun test ./Releases/v5.0.0/.codex/PAI/TOOLS/Inference.smoke.test.ts`
  passes.
- Codex skill descriptions in `Releases/v5.0.0/.codex/skills` satisfy the
  current 1024-character description limit.
- `pai prompt` uses `codex exec`, not the obsolete profile-flag prompt form.

## Fixed In This Fork

- Legacy `kai` primary-assistant defaults were neutralized to `primary`.
- `kai-agents-tools` was renamed to `pai-agents-tools`.
- `settings.json` no longer documents loop mode with obsolete Codex prompt flags.
- No `rules/default.rules` file exists in this repo snapshot.

## Open Migration Work

No open migration work remains from the six-item Claude-to-Codex audit in this
snapshot. Keep this section for future gaps found during live install testing.

## Resolved

1. **Hooks are Codex-native.**
   Moved supported lifecycle hooks from `settings.json` to `config.toml`
   using Codex `pre_tool_use`, `post_tool_use`, `pre_compact`,
   `session_start`, and `user_prompt_submit` event keys.

2. **Custom agents use Codex subagent config.**
   Converted release agents from Markdown/frontmatter files to
   `.codex/agents/*.toml` files with `name`, `description`, and
   `developer_instructions`, and updated ComposeAgent to save TOML.

3. **Skill workflow syntax is Codex-native.**
   Replaced standalone Claude tool-call examples in pack Markdown with Codex
   subagent and shell-tool vocabulary.

4. **Security hook parity is documented.**
   Preserved the `SecurityPipeline.hook.ts` pre-tool path in Codex hooks and
   documented unsupported Claude-only lifecycle hooks in
   `Releases/v5.0.0/.codex/PAI/DOCUMENTATION/CodexMigration.md`.

5. **Installer config surface is Codex-first.**
   The repo snapshot has no executable `install.sh`; the release template now
   makes `config.toml` the Codex-native control surface and the v5 README tells
   installers to retain `settings.json` only for legacy metadata.

6. **Workspace anchoring replaces skipped Git checks.**
   Removed `--skip-git-repo-check` from release Codex entry points and anchored
   `codex exec` with explicit `--cd` workspaces.

## Safety Rule

Do not update a live user's `~/.codex` setup while resolving these gaps unless
the operator explicitly asks for a live install change. Patch the repo first,
validate, then let the operator choose when to sync.
