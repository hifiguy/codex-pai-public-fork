---
name: WorldThreatModel
pack-id: pai-worldthreatmodel-v1.0.0
version: 1.0.0
author: danielmiessler
description: Persistent world-model harness that stress-tests ideas, strategies, and investments against 11 time horizons from 6 months to 50 years. Each horizon model is a deep (~10 page) analysis of geopolitics, technology, economics, society, environment, security, and wildcards stored at PAI_DIR/MEMORY/RESEARCH/WorldModels/. Three execution tiers: Fast (~2 min, single synthesizing agent), Standard (~10 min, 11 parallel horizon agents + RedTeam + FirstPrinciples), Deep (up to 1hr, adds per-horizon Research + Council). Four workflows: TestIdea (test any input across all 11 horizons, returns probability-weighted scenario matrix), UpdateModels (refresh model content with new research), ViewModels (read and summarize current state), TestScenario (test against alternative future models like great-correction-2027). Context files: ModelTemplate.md (structure for horizon model documents), OutputFormat.md (template for TestIdea results). Scenario models stored at WorldModels/Scenarios/. Orchestrates RedTeam, FirstPrinciples, Council, and Research internally.
type: skill
platform: codex
source: PAI v5.0.0
---

# WorldThreatModel

Persistent world-model harness that stress-tests ideas, strategies, and investments against 11 time horizons from 6 months to 50 years. Each horizon model is a deep (~10 page) analysis of geopolitics, technology, economics, society, environment, security, and wildcards stored at PAI_DIR/MEMORY/RESEARCH/WorldModels/. Three execution tiers: Fast (~2 min, single synthesizing agent), Standard (~10 min, 11 parallel horizon agents + RedTeam + FirstPrinciples), Deep (up to 1hr, adds per-horizon Research + Council). Four workflows: TestIdea (test any input across all 11 horizons, returns probability-weighted scenario matrix), UpdateModels (refresh model content with new research), ViewModels (read and summarize current state), TestScenario (test against alternative future models like great-correction-2027). Context files: ModelTemplate.md (structure for horizon model documents), OutputFormat.md (template for TestIdea results). Scenario models stored at WorldModels/Scenarios/. Orchestrates RedTeam, FirstPrinciples, Council, and Research internally.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the WorldThreatModel pack from PAI/Packs/WorldThreatModel/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  ModelTemplate.md
  OutputFormat.md
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/WorldThreatModel/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
