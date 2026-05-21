# Interview — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Interview skill from the PAI v5.0.0 release.

Runs a phased conversational interview across all PAI context files using InterviewScan.ts, which orders targets by PHASE and assigns conversation mode per file. Phase 1 (foundational TELOS) always runs first regardless of completeness: MISSION, GOALS, PROBLEMS, STRATEGIES, CHALLENGES, NARRATIVES, SPARKS, BELIEFS, WISDOM, MODELS, FRAMES in leverage order. Phase 2: IDEAL_STATE (HEALTH, MONEY, FREEDOM, RELATIONSHIPS, CREATIVE) in Fill mode. Phase 3: preferences (BOOKS, AUTHORS, BANDS, MOVIES, RESTAURANTS, FOOD_PREFERENCES, LEARNING, MEETUPS, CIVIC) in mixed mode. Phase 4: light touch on CURRENT_STATE/SNAPSHOT and PRINCIPAL_IDENTITY. Phase 9 (RHYTHMS) deferred. Review mode (≥80%) reads file then asks targeted questions one at a time — still accurate, outdated, missing, sharpen? Fill mode (<80%) walks scanner prompts one at a time. The principal answers in natural language; the DA formats into file structure. Voice confirms on actual changes only. Stop signals respected immediately. Target vs. north-star type confirmed per entry. Timestamped backup to TELOS/Backups/ before multi-edit at ≥50% of a file. TelosRenderer.ts regenerates PRINCIPAL_TELOS.md after foundational changes.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/Interview"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Interview skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Interview skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Interview` into `~/.codex/skills/Interview/`? (yes/no)"
2. If existing skill found: "Back up the existing `Interview` to `~/.codex/skills/Interview.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
