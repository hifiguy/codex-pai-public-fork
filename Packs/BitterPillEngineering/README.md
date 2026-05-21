---
name: BitterPillEngineering
pack-id: pai-bitterpillengineering-v1.0.0
version: 1.0.0
author: danielmiessler
description: Audits any AI instruction set for over-prompting using the core test: would a smarter model make this rule unnecessary? Applies Five Questions to every rule — Does Claude already do this? Contradiction? Redundant? One-off fix? Vague? — then classifies each as CUT / RESOLVE / MERGE / EVALUATE / SHARPEN / MOVE / KEEP. Two workflows: Audit (full system — reads all force-loaded files from settings.json, reports token savings estimate) and QuickCheck (single file, fast keep/cut/sharpen verdict). Outputs categorized report with estimated line and token savings. Core principle: less scaffolding = better output — every unnecessary rule competes for attention and degrades the rules that matter. Anti-fragile rules to KEEP: verification harnesses, ISC, data pipelines, specific DO/DON'T examples, tool preferences, routing rules. Fragile rules to CUT: CoT orchestrators, format parsers, retry cascades, numeric personality scales, abstract value statements. Requires loadAtStartup and postCompactRestore.fullFiles to stay in sync in settings.json — removing a file from one requires checking the other.
type: skill
platform: codex
source: PAI v5.0.0
---

# BitterPillEngineering

Audits any AI instruction set for over-prompting using the core test: would a smarter model make this rule unnecessary? Applies Five Questions to every rule — Does Claude already do this? Contradiction? Redundant? One-off fix? Vague? — then classifies each as CUT / RESOLVE / MERGE / EVALUATE / SHARPEN / MOVE / KEEP. Two workflows: Audit (full system — reads all force-loaded files from settings.json, reports token savings estimate) and QuickCheck (single file, fast keep/cut/sharpen verdict). Outputs categorized report with estimated line and token savings. Core principle: less scaffolding = better output — every unnecessary rule competes for attention and degrades the rules that matter. Anti-fragile rules to KEEP: verification harnesses, ISC, data pipelines, specific DO/DON'T examples, tool preferences, routing rules. Fragile rules to CUT: CoT orchestrators, format parsers, retry cascades, numeric personality scales, abstract value statements. Requires loadAtStartup and postCompactRestore.fullFiles to stay in sync in settings.json — removing a file from one requires checking the other.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the BitterPillEngineering pack from PAI/Packs/BitterPillEngineering/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/BitterPillEngineering/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
