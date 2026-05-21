---
name: Sales
pack-id: pai-sales-v1.0.0
version: 1.0.0
author: danielmiessler
description: Transforms product documentation into sales-ready narrative packages combining story explanation, charcoal gestural sketch art, and talking points. Pipeline: extract narrative arc → determine emotional register (wonder, determination, hope) → derive visual scene → generate assets. Three workflows: CreateSalesPackage (full pipeline — narrative + charcoal sketch visual + key talking points), CreateNarrative (story only, 8-24 numbered points in first-person conversational voice, captures why-it-matters not what-it-does), CreateVisual (charcoal gestural sketch with transparent background for presentation versatility). Charcoal gestural sketch is the mandatory visual style — minimalist composition with breathing space. Output is tied directly to what's being sold — clear, succinct, effective. Integrates StoryExplanation (for narrative arc extraction) and Art essay-art workflow (for visual generation) internally.
type: skill
platform: codex
source: PAI v5.0.0
---

# Sales

Transforms product documentation into sales-ready narrative packages combining story explanation, charcoal gestural sketch art, and talking points. Pipeline: extract narrative arc → determine emotional register (wonder, determination, hope) → derive visual scene → generate assets. Three workflows: CreateSalesPackage (full pipeline — narrative + charcoal sketch visual + key talking points), CreateNarrative (story only, 8-24 numbered points in first-person conversational voice, captures why-it-matters not what-it-does), CreateVisual (charcoal gestural sketch with transparent background for presentation versatility). Charcoal gestural sketch is the mandatory visual style — minimalist composition with breathing space. Output is tied directly to what's being sold — clear, succinct, effective. Integrates StoryExplanation (for narrative arc extraction) and Art essay-art workflow (for visual generation) internally.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Sales pack from PAI/Packs/Sales/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Sales/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
