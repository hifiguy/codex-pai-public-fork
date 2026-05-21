# RootCauseAnalysis — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the RootCauseAnalysis skill from the PAI v5.0.0 release.

Structured incident investigation grounded in Toyota Production System, Kaoru Ishikawa, James Reason's Swiss Cheese model, Dean Gano's Apollo method, and Google SRE blameless-postmortem culture. Five workflows: FiveWhys (linear/branching causal chain, single-thread incidents), Fishbone/Ishikawa (6 M's or 4 P's category mapping, multiple suspected areas), Postmortem (blameless timeline + contributing factors + action items, wraps other methods), FaultTree (AND/OR gate logic, safety-critical multi-path failures), KepnerTregoe IS/IS-NOT (distinction analysis, subtle hard-to-reproduce defects). Context files: Foundation.md (Toyoda, Ishikawa, Reason, Gano, Google SRE; canonical methods), MethodSelection.md (decision flow for workflow selection). Core axiom: proximate cause is where analysis starts, not ends. Humans are never root causes — if a human could make the mistake, the system allowed it. A cause is \"root enough\" when it's actionable. Also supports FMEA-style pre-launch risk inversion (what could fail before it does). Integrates with Science (hypothesis generation during investigation) and RedTeam (stress-test remediations).

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/RootCauseAnalysis"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING RootCauseAnalysis skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing RootCauseAnalysis skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `RootCauseAnalysis` into `~/.codex/skills/RootCauseAnalysis/`? (yes/no)"
2. If existing skill found: "Back up the existing `RootCauseAnalysis` to `~/.codex/skills/RootCauseAnalysis.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
