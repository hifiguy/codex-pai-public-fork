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
- A local Codex TUI patch has been validated for a native, reserved, multiline
  PAI footer. The patch adds `tui.static_footer`,
  `tui.static_footer_command`, and `tui.static_footer_refresh_interval`,
  renders the footer inside the normal TUI layout instead of with a terminal
  overlay, and feeds the footer command a status JSON payload on stdin so the
  renderer can show context and rate-limit data. This is not part of stock
  Codex yet; installers should treat it as an optional patched-Codex
  integration until upstream support exists.

## Fixed In This Fork

- Legacy `kai` primary-assistant defaults were neutralized to `primary`.
- `kai-agents-tools` was renamed to `pai-agents-tools`.
- `settings.json` no longer documents loop mode with obsolete Codex prompt flags.
- No `rules/default.rules` file exists in this repo snapshot.
- `pai` launcher behavior can preserve the startup banner and voice/catchphrase
  while using a patched Codex binary for the native footer. The persistent PAI
  status belongs in the native reserved footer; the startup banner remains a
  normal pre-TUI terminal banner and may scroll off.
- Gemini TTS fallback behavior is implemented in the release voice module.
  Empty-audio responses and transient 5xx responses are treated as retryable
  per-model failures, the failing model is cooled down, and fallback continues
  to the next configured TTS model.
- Gemini TTS request accounting uses both an aggregate daily guard and
  per-model daily guards. The default public guard is a 250-call aggregate cap
  plus explicit `50 / 100 / 100` model caps unless Google changes the published
  limits.
- Gemini TTS request accounting is persisted to a local runtime ledger so
  restarting the daemon cannot reset the local guard and accidentally allow a
  second round of daily API calls. Health output exposes aggregate count,
  per-model counts, per-model limits, and currently cooled-down models.

## Open Migration Work

Current technical gap:

- Upstream Codex does not currently ship native support for the multiline PAI
  footer described above. Until that support is upstreamed or packaged, the
  public fork should document the footer as a patched-binary capability rather
  than a guaranteed stock Codex feature.

No other Claude-to-Codex migration gaps are currently documented in this file.
New gaps should be added here only after reproducing the behavior against this
public fork.

## Public Release Safeguards

- The Codex footer payload should stay generic: workspace path, model/version,
  context-window usage, and rate-limit snapshots are sufficient. Do not place
  private identity, vault paths, credentials, transcript text, or personal
  catchphrases in public docs, default config, or example payloads.
- Voice docs and examples should stay generic. Do not include private assistant
  names, personal catchphrases, user-specific voice prompts, local machine
  names, absolute home-directory paths, transcript excerpts, API keys, or
  provider account details. Public examples should use placeholder voice IDs,
  placeholder runtime paths, and generic notification text.

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
