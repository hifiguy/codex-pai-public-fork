# WorldThreatModel — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the WorldThreatModel skill from the PAI v5.0.0 release.

Persistent world-model harness that stress-tests ideas, strategies, and investments against 11 time horizons from 6 months to 50 years. Each horizon model is a deep (~10 page) analysis of geopolitics, technology, economics, society, environment, security, and wildcards stored at PAI_DIR/MEMORY/RESEARCH/WorldModels/. Three execution tiers: Fast (~2 min, single synthesizing agent), Standard (~10 min, 11 parallel horizon agents + RedTeam + FirstPrinciples), Deep (up to 1hr, adds per-horizon Research + Council). Four workflows: TestIdea (test any input across all 11 horizons, returns probability-weighted scenario matrix), UpdateModels (refresh model content with new research), ViewModels (read and summarize current state), TestScenario (test against alternative future models like great-correction-2027). Context files: ModelTemplate.md (structure for horizon model documents), OutputFormat.md (template for TestIdea results). Scenario models stored at WorldModels/Scenarios/. Orchestrates RedTeam, FirstPrinciples, Council, and Research internally.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/WorldThreatModel"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING WorldThreatModel skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing WorldThreatModel skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `WorldThreatModel` into `~/.codex/skills/WorldThreatModel/`? (yes/no)"
2. If existing skill found: "Back up the existing `WorldThreatModel` to `~/.codex/skills/WorldThreatModel.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
