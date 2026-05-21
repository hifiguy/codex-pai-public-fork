<div align="center">

<img src="release-icon-v2.png" alt="PAI Releases" width="256">

# PAI Codex Releases

</div>

---

## What Are Releases?

Releases are complete Codex-native PAI distributions. Each release contains skills, hooks, workflows, memory structure, and configuration for a local Codex install.

This fork currently ships the v5 Codex port only. Older Claude Code release bundles are intentionally omitted from the public fork to keep the shareable tree focused and easier to audit.

> **Note:** The `.codex` directory is hidden by default on macOS/Linux. Use `ls -la` to see it.

---

## Available Releases

### v5.0.0 — Codex Port

Codex-native port of PAI v5.

- `PAI/TOOLS/Inference.ts` defaults to Codex while preserving optional backends.
- Hooks are configured through Codex-native `config.toml` event keys.
- Custom agents are represented as Codex subagent TOML files.
- CLI entry points anchor execution with explicit workspaces.

**[Get v5.0.0 ->](v5.0.0/)**

---

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/hifiguy/codex-pai-public-fork.git
cd codex-pai-public-fork

# 2. Run the release installer
./Releases/v5.0.0/.codex/install.sh
```

See the v5 README for installer and configuration details.

See the [main README](../README.md#upgrading-from-a-previous-version) for upgrade instructions.

---

## Troubleshooting

**Can't see `.codex` directory?** It's hidden. Use `ls -la ~/` or press `Cmd+Shift+.` in Finder.

**Hooks not firing?** Check `~/.codex/config.toml`, then restart Codex.

---

**Questions?** See the main [PAI README](../README.md).
