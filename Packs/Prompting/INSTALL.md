# Prompting — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Prompting skill from the PAI v5.0.0 release.

Meta-prompting standard library — the PAI system for generating, optimizing, and composing prompts programmatically. Owns three pillars: Standards (Anthropic Claude 4.x best practices, context engineering principles, 1,500+ paper synthesis, Fabric pattern system, markdown-first / no-XML-tags); Templates (Handlebars-based — Briefing.hbs, Structure.hbs, Gate.hbs, DynamicAgent.hbs, and eval-specific templates Judge.hbs, Rubric.hbs, TestCase.hbs, Comparison.hbs, Report.hbs used by Agents and Evals skills); and Tools (RenderTemplate.ts for CLI/TypeScript rendering with data-content separation). Philosophy: prompts that write prompts — structure is code, content is data. Delivered 65% token reduction across PAI (53K → 18K tokens) via template extraction. Output is always a prompt to be used elsewhere, not final content. Reference files: Standards.md (complete prompt engineering guide), Tools/RenderTemplate.ts (rendering implementation).

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Prompting"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Prompting skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Prompting skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Prompting` into `~/.codex/skills/Prompting/`? (yes/no)"
2. If existing skill found: "Back up the existing `Prompting` to `~/.codex/skills/Prompting.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
