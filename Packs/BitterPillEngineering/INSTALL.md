# BitterPillEngineering — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the BitterPillEngineering skill from the PAI v5.0.0 release.

Audits any AI instruction set for over-prompting using the core test: would a smarter model make this rule unnecessary? Applies Five Questions to every rule — Does Claude already do this? Contradiction? Redundant? One-off fix? Vague? — then classifies each as CUT / RESOLVE / MERGE / EVALUATE / SHARPEN / MOVE / KEEP. Two workflows: Audit (full system — reads all force-loaded files from settings.json, reports token savings estimate) and QuickCheck (single file, fast keep/cut/sharpen verdict). Outputs categorized report with estimated line and token savings. Core principle: less scaffolding = better output — every unnecessary rule competes for attention and degrades the rules that matter. Anti-fragile rules to KEEP: verification harnesses, ISC, data pipelines, specific DO/DON'T examples, tool preferences, routing rules. Fragile rules to CUT: CoT orchestrators, format parsers, retry cascades, numeric personality scales, abstract value statements. Requires loadAtStartup and postCompactRestore.fullFiles to stay in sync in settings.json — removing a file from one requires checking the other.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/BitterPillEngineering"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING BitterPillEngineering skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing BitterPillEngineering skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `BitterPillEngineering` into `~/.codex/skills/BitterPillEngineering/`? (yes/no)"
2. If existing skill found: "Back up the existing `BitterPillEngineering` to `~/.codex/skills/BitterPillEngineering.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
