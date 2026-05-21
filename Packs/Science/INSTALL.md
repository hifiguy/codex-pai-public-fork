# Science — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Science skill from the PAI v5.0.0 release.

The scientific method as a universal problem-solving algorithm — goal-first, hypothesis-plural, falsifiable experiments, honest measurement. Seven core workflows: DefineGoal, GenerateHypotheses (minimum 3 required — single-hypothesis testing is confirmation bias), DesignExperiment, MeasureResults, AnalyzeResults, Iterate, and FullCycle. Two diagnostic shortcuts: QuickDiagnosis (15-minute rule for fast debugging) and StructuredInvestigation (complex multi-factor issues). Scales across micro (TDD, minutes), meso (feature validation, hours-days), and macro (MVP launch, weeks-months). Reference files: METHODOLOGY.md (deep dive on each phase), Protocol.md (how other skills invoke Science), Templates.md (goal/hypothesis/experiment/results templates), Examples.md (worked examples across scales). Integrates with Council (hypothesis validation), Evals (measurement), Development (parallel experiment worktrees), and RedTeam (stress-test hypotheses). RootCauseAnalysis applies Science to failure investigation — pair them when investigating incidents.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Science"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Science skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Science skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Science` into `~/.codex/skills/Science/`? (yes/no)"
2. If existing skill found: "Back up the existing `Science` to `~/.codex/skills/Science.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
