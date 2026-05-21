---
name: Interview
pack-id: pai-interview-v1.0.0
version: 1.0.0
author: danielmiessler
description: Runs a phased conversational interview across all PAI context files using InterviewScan.ts, which orders targets by PHASE and assigns conversation mode per file. Phase 1 (foundational TELOS) always runs first regardless of completeness: MISSION, GOALS, PROBLEMS, STRATEGIES, CHALLENGES, NARRATIVES, SPARKS, BELIEFS, WISDOM, MODELS, FRAMES in leverage order. Phase 2: IDEAL_STATE (HEALTH, MONEY, FREEDOM, RELATIONSHIPS, CREATIVE) in Fill mode. Phase 3: preferences (BOOKS, AUTHORS, BANDS, MOVIES, RESTAURANTS, FOOD_PREFERENCES, LEARNING, MEETUPS, CIVIC) in mixed mode. Phase 4: light touch on CURRENT_STATE/SNAPSHOT and PRINCIPAL_IDENTITY. Phase 9 (RHYTHMS) deferred. Review mode (≥80%) reads file then asks targeted questions one at a time — still accurate, outdated, missing, sharpen? Fill mode (<80%) walks scanner prompts one at a time. The principal answers in natural language; the DA formats into file structure. Voice confirms on actual changes only. Stop signals respected immediately. Target vs. north-star type confirmed per entry. Timestamped backup to TELOS/Backups/ before multi-edit at ≥50% of a file. TelosRenderer.ts regenerates PRINCIPAL_TELOS.md after foundational changes.
type: skill
platform: codex
source: PAI v5.0.0
---

# Interview

Runs a phased conversational interview across all PAI context files using InterviewScan.ts, which orders targets by PHASE and assigns conversation mode per file. Phase 1 (foundational TELOS) always runs first regardless of completeness: MISSION, GOALS, PROBLEMS, STRATEGIES, CHALLENGES, NARRATIVES, SPARKS, BELIEFS, WISDOM, MODELS, FRAMES in leverage order. Phase 2: IDEAL_STATE (HEALTH, MONEY, FREEDOM, RELATIONSHIPS, CREATIVE) in Fill mode. Phase 3: preferences (BOOKS, AUTHORS, BANDS, MOVIES, RESTAURANTS, FOOD_PREFERENCES, LEARNING, MEETUPS, CIVIC) in mixed mode. Phase 4: light touch on CURRENT_STATE/SNAPSHOT and PRINCIPAL_IDENTITY. Phase 9 (RHYTHMS) deferred. Review mode (≥80%) reads file then asks targeted questions one at a time — still accurate, outdated, missing, sharpen? Fill mode (<80%) walks scanner prompts one at a time. The principal answers in natural language; the DA formats into file structure. Voice confirms on actual changes only. Stop signals respected immediately. Target vs. north-star type confirmed per entry. Timestamped backup to TELOS/Backups/ before multi-edit at ≥50% of a file. TelosRenderer.ts regenerates PRINCIPAL_TELOS.md after foundational changes.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Interview pack from PAI/Packs/Interview/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Interview/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
