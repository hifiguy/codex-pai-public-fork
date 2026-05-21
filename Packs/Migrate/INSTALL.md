# Migrate — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Migrate skill from the PAI v5.0.0 release.

Intakes existing content from external sources, classifies each chunk against the PAI destination taxonomy, and commits approved chunks with provenance. Sources: .md/.markdown/.txt, stdin, PAI TELOS/MEMORY/KNOWLEDGE dirs, AGENTS.md/.cursorrules/OpenAI Custom Instructions, Obsidian/Notion/Apple Notes exports, journal dumps. MigrateScan.ts chunks and classifies, producing a routing table with per-target counts and confidence %. MigrateApprove.ts approval loop: --approve-all, --approve-target, --review, --dry-run. UNCLEAR never bulk-approved. Phase 6 delivers summary and /interview recommendation for sparse areas. Confidence: ≥70% auto-approve; 40-70% confirm; <40% walk-through. Destinations: TELOS (MISSION/GOALS/PROBLEMS/STRATEGIES/CHALLENGES/BELIEFS/WISDOM/MODELS/FRAMES/NARRATIVES/SPARKS), IDEAL_STATE (per-dimension explicit call), preferences (BOOKS/AUTHORS/MOVIES/BANDS/RESTAURANTS/FOOD_PREFERENCES/LEARNING/MEETUPS/CIVIC), Identity (PRINCIPAL_IDENTITY.md — always prompts), Knowledge (MEMORY/KNOWLEDGE/{Ideas,People,Companies,Research}), AI rules (memory/feedback_*.md — new file per chunk), UNCLEAR. Provenance HTML comment on every commit. Dedup via substring match.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Migrate"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Migrate skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Migrate skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Migrate` into `~/.codex/skills/Migrate/`? (yes/no)"
2. If existing skill found: "Back up the existing `Migrate` to `~/.codex/skills/Migrate.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
