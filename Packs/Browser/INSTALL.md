# Browser — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Browser skill from the PAI v5.0.0 release.

Headless browser automation via agent-browser — Rust CLI daemon with persistent auth profiles for fast, scriptable, parallel browser work. Supports batch commands, network interception, device emulation, per-site profile auth (one-time headed login, headless forever after), and parallel isolated sessions via --session. Workflows: ReviewStories (fan out YAML user stories to parallel UIReviewers), Automate (load/run parameterized recipe templates), Update. Delegates to general-purpose agents with agent-browser instructions for background parallel scraping. Falls back to Interceptor if site has bot detection.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Browser"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Browser skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Browser skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Browser` into `~/.codex/skills/Browser/`? (yes/no)"
2. If existing skill found: "Back up the existing `Browser` to `~/.codex/skills/Browser.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
