# Ideate — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Ideate skill from the PAI v5.0.0 release.

Evolutionary ideation engine — loop-controlled multi-cycle idea generation through 9 phases (CONSUME, DREAM at noise=0.9, DAYDREAM at noise=0.5, CONTEMPLATE at noise=0.1, STEAL cross-domain borrowing, MATE recombination via Fisher-Yates shuffle, TEST fitness scoring, EVOLVE selection, META-LEARN Lamarckian strategy adjustment). Loop Controller drives adaptive continue/pivot/stop logic with mid-cycle quality checkpoints; strategies evolve across cycles based on what worked. Produces ranked novel solution candidates with full provenance and fitness landscape. Six workflows: FullCycle (all 9 phases adaptive — default), QuickCycle (compressed CONSUME+STEAL+MATE+TEST single cycle), Dream (DREAM phase only), Steal (cross-domain transfer only), Mate (recombination only), Test (fitness evaluation only). Integrates IterativeDepth in CONTEMPLATE, RedTeam in TEST, Council optionally in MATE.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Ideate"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Ideate skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Ideate skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Ideate` into `~/.codex/skills/Ideate/`? (yes/no)"
2. If existing skill found: "Back up the existing `Ideate` to `~/.codex/skills/Ideate.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
