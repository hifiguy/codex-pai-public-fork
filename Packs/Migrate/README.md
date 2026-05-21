---
name: Migrate
pack-id: pai-migrate-v1.0.0
version: 1.0.0
author: danielmiessler
description: Intakes existing content from external sources, classifies each chunk against the PAI destination taxonomy, and commits approved chunks with provenance. Sources: .md/.markdown/.txt, stdin, PAI TELOS/MEMORY/KNOWLEDGE dirs, AGENTS.md/.cursorrules/OpenAI Custom Instructions, Obsidian/Notion/Apple Notes exports, journal dumps. MigrateScan.ts chunks and classifies, producing a routing table with per-target counts and confidence %. MigrateApprove.ts approval loop: --approve-all, --approve-target, --review, --dry-run. UNCLEAR never bulk-approved. Phase 6 delivers summary and /interview recommendation for sparse areas. Confidence: ≥70% auto-approve; 40-70% confirm; <40% walk-through. Destinations: TELOS (MISSION/GOALS/PROBLEMS/STRATEGIES/CHALLENGES/BELIEFS/WISDOM/MODELS/FRAMES/NARRATIVES/SPARKS), IDEAL_STATE (per-dimension explicit call), preferences (BOOKS/AUTHORS/MOVIES/BANDS/RESTAURANTS/FOOD_PREFERENCES/LEARNING/MEETUPS/CIVIC), Identity (PRINCIPAL_IDENTITY.md — always prompts), Knowledge (MEMORY/KNOWLEDGE/{Ideas,People,Companies,Research}), AI rules (memory/feedback_*.md — new file per chunk), UNCLEAR. Provenance HTML comment on every commit. Dedup via substring match.
type: skill
platform: codex
source: PAI v5.0.0
---

# Migrate

Intakes existing content from external sources, classifies each chunk against the PAI destination taxonomy, and commits approved chunks with provenance. Sources: .md/.markdown/.txt, stdin, PAI TELOS/MEMORY/KNOWLEDGE dirs, AGENTS.md/.cursorrules/OpenAI Custom Instructions, Obsidian/Notion/Apple Notes exports, journal dumps. MigrateScan.ts chunks and classifies, producing a routing table with per-target counts and confidence %. MigrateApprove.ts approval loop: --approve-all, --approve-target, --review, --dry-run. UNCLEAR never bulk-approved. Phase 6 delivers summary and /interview recommendation for sparse areas. Confidence: ≥70% auto-approve; 40-70% confirm; <40% walk-through. Destinations: TELOS (MISSION/GOALS/PROBLEMS/STRATEGIES/CHALLENGES/BELIEFS/WISDOM/MODELS/FRAMES/NARRATIVES/SPARKS), IDEAL_STATE (per-dimension explicit call), preferences (BOOKS/AUTHORS/MOVIES/BANDS/RESTAURANTS/FOOD_PREFERENCES/LEARNING/MEETUPS/CIVIC), Identity (PRINCIPAL_IDENTITY.md — always prompts), Knowledge (MEMORY/KNOWLEDGE/{Ideas,People,Companies,Research}), AI rules (memory/feedback_*.md — new file per chunk), UNCLEAR. Provenance HTML comment on every commit. Dedup via substring match.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Migrate pack from PAI/Packs/Migrate/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Migrate/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
