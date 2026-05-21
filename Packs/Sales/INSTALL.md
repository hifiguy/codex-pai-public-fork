# Sales — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Sales skill from the PAI v5.0.0 release.

Transforms product documentation into sales-ready narrative packages combining story explanation, charcoal gestural sketch art, and talking points. Pipeline: extract narrative arc → determine emotional register (wonder, determination, hope) → derive visual scene → generate assets. Three workflows: CreateSalesPackage (full pipeline — narrative + charcoal sketch visual + key talking points), CreateNarrative (story only, 8-24 numbered points in first-person conversational voice, captures why-it-matters not what-it-does), CreateVisual (charcoal gestural sketch with transparent background for presentation versatility). Charcoal gestural sketch is the mandatory visual style — minimalist composition with breathing space. Output is tied directly to what's being sold — clear, succinct, effective. Integrates StoryExplanation (for narrative arc extraction) and Art essay-art workflow (for visual generation) internally.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/Sales"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Sales skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Sales skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Sales` into `~/.codex/skills/Sales/`? (yes/no)"
2. If existing skill found: "Back up the existing `Sales` to `~/.codex/skills/Sales.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
