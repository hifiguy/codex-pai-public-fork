# Interceptor — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Interceptor skill from the PAI v5.0.0 release.

Real Chrome browser automation via Interceptor extension — controls the actual browser from inside (zero CDP fingerprint, passes all major bot detection checks including BrowserScan, Pixelscan, CreepJS, Fingerprint.com). Stays logged in, uses your real sessions. Compound commands (open, read, act, inspect) collapse multi-step flows into single calls. Unique capabilities: monitor/replay system (record user actions → export replayable plan scripts for regression), network log (auto-captures all fetch/XHR), scene graph for rich editors (Google Docs, Canva, Slides). Workflows: VerifyDeploy, Reproduce (open affected page BEFORE code analysis — mandatory per rules), RecordFlow, ReplayFlow, TestForm, Update. MANDATORY for all visual verification — never use agent-browser for deploy confirmation.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/Interceptor"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Interceptor skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Interceptor skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Interceptor` into `~/.codex/skills/Interceptor/`? (yes/no)"
2. If existing skill found: "Back up the existing `Interceptor` to `~/.codex/skills/Interceptor.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
mkdir -p "$CLAUDE_DIR/skills"
cp -R src/ "$SKILL_DIR/"
echo "Installed to $SKILL_DIR"
```

---

## Phase 5: Verify

Run the file and functional checks in [VERIFY.md](VERIFY.md). Confirm to the user when all checks pass.
