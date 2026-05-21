# IterativeDepth — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the IterativeDepth skill from the PAI v5.0.0 release.

Structured multi-angle exploration that runs 2-8 sequential passes through the same problem, each from a systematically different scientific lens, to surface requirements and edge cases invisible from any single angle. Grounded in 20 established techniques across cognitive science (Hermeneutic Circle, Triangulation), AI/ML (Self-Consistency, Ensemble Methods), requirements engineering (Viewpoint-Oriented RE), and design thinking (Six Thinking Hats, Causal Layered Analysis). Each pass outputs new ISC criteria; passes stop when yields repeat. Best used in the OBSERVE phase at Extended+ effort — the default question should be why NOT to use it, not why to use it. A 4-lens pass routinely discovers 30-50% more criteria than direct analysis. Single workflow: Workflows/Explore.md (supports Fast mode with 2 lenses for quick depth). Reference files: ScientificFoundation.md (research grounding for all 20 techniques), TheLenses.md (full definitions for all 8 lenses). BPE-fragile — quarterly test recommended.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/IterativeDepth"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING IterativeDepth skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing IterativeDepth skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `IterativeDepth` into `~/.codex/skills/IterativeDepth/`? (yes/no)"
2. If existing skill found: "Back up the existing `IterativeDepth` to `~/.codex/skills/IterativeDepth.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
