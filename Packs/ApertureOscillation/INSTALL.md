# ApertureOscillation — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the ApertureOscillation skill from the PAI v5.0.0 release.

3-pass scope oscillation that holds a question constant while shifting the scope envelope — narrow/tactical, wide/strategic, then synthesis — to surface design tensions invisible at any single zoom level. Requires two distinct inputs: the tactical target (what you're building) and strategic context (the larger system it serves). Pass 1 captures the component's own internal logic. Pass 2 reveals what the system needs it to be. Pass 3 finds where those views diverge — that delta is the output. Produces: design tensions, scope recommendations, and coherence assessments. Single workflow: Workflows/Oscillate.md. BPE-fragile — quarterly test recommended to verify smarter models don't naturally oscillate scope without prompting. Best integration point: Algorithm OBSERVE phase (before ISC) or THINK phase (before approach commitment). NOT a lens rotation (that's IterativeDepth) and NOT idea generation (that's BeCreative).

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/ApertureOscillation"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING ApertureOscillation skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing ApertureOscillation skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `ApertureOscillation` into `~/.codex/skills/ApertureOscillation/`? (yes/no)"
2. If existing skill found: "Back up the existing `ApertureOscillation` to `~/.codex/skills/ApertureOscillation.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
