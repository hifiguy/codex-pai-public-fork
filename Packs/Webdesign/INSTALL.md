# Webdesign — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Webdesign skill from the PAI v5.0.0 release.

Design and integrate web interfaces using Anthropic's Claude Design (claude.ai/design) as the primary engine, with optional downstream handoff to the frontend-design plugin for production code. Drives Claude Design through the Interceptor skill for programmatic access to the authenticated claude.ai session.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Webdesign"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Webdesign skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Webdesign skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Webdesign` into `~/.codex/skills/Webdesign/`? (yes/no)"
2. If existing skill found: "Back up the existing `Webdesign` to `~/.codex/skills/Webdesign.backup-{timestamp}/` first? (yes/no — recommend yes)"

---

## Phase 3: Backup (only if existing)

```bash
if [ -d "$SKILL_DIR" ]; then
  BACKUP="$SKILL_DIR.backup-$(date +%Y%m%d-%H%M%S)"
  mv "$SKILL_DIR" "$BACKUP"
  echo "Backed up to $BACKUP"
fi
```

---

## Phase 4: Install

```bash
mkdir -p "$ENGINE_DIR/skills"
cp -R src/ "$SKILL_DIR/"
echo "Installed to $SKILL_DIR"
```

---

## Phase 5: Verify

Run the file and functional checks in [VERIFY.md](VERIFY.md). Confirm to the user when all checks pass.
