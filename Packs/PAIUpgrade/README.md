---
name: PAIUpgrade
pack-id: pai-paiupgrade-v1.0.0
version: 1.0.0
author: danielmiessler
description: Generate prioritized PAI upgrade recommendations via 4 parallel threads: Thread 0 (prior-work audit — reads current Algorithm, PATTERNS.yaml, hooks, settings, recent ISAs, and KNOWLEDGE to assign Prior Status tags), Thread 1 (user context — TELOS goals, active projects, PAI system state), Thread 2 (source collection — Anthropic releases, YouTube channels, GitHub trending, custom sources), Thread 3 (internal reflections — Algorithm execution Q1/Q2 patterns). Output format: Discoveries table ranked by interestingness, then tiered Recommendations (CRITICAL/HIGH/MEDIUM/LOW) each with Prior Status (NEW/PARTIAL/DISCUSSED/REJECTED/DONE), then full Technique Details with before/after code. Every recommendation cites file:line evidence from Thread 0 — already-implemented items go to Skipped, never re-surfaced. Workflows: Upgrade, MineReflections, AlgorithmUpgrade, ResearchUpgrade, FindSources, TwitterBookmarks.
type: skill
platform: codex
source: PAI v5.0.0
---

# PAIUpgrade

Generate prioritized PAI upgrade recommendations via 4 parallel threads: Thread 0 (prior-work audit — reads current Algorithm, PATTERNS.yaml, hooks, settings, recent ISAs, and KNOWLEDGE to assign Prior Status tags), Thread 1 (user context — TELOS goals, active projects, PAI system state), Thread 2 (source collection — Anthropic releases, YouTube channels, GitHub trending, custom sources), Thread 3 (internal reflections — Algorithm execution Q1/Q2 patterns). Output format: Discoveries table ranked by interestingness, then tiered Recommendations (CRITICAL/HIGH/MEDIUM/LOW) each with Prior Status (NEW/PARTIAL/DISCUSSED/REJECTED/DONE), then full Technique Details with before/after code. Every recommendation cites file:line evidence from Thread 0 — already-implemented items go to Skipped, never re-surfaced. Workflows: Upgrade, MineReflections, AlgorithmUpgrade, ResearchUpgrade, FindSources, TwitterBookmarks.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the PAIUpgrade pack from PAI/Packs/PAIUpgrade/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Logs
  References
  SKILL.md
  sources.json
  Tools
  Workflows
  youtube-channels.json
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/PAIUpgrade/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
