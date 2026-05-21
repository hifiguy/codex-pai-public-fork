---
name: Prompting
pack-id: pai-prompting-v1.0.0
version: 1.0.0
author: danielmiessler
description: Meta-prompting standard library — the PAI system for generating, optimizing, and composing prompts programmatically. Owns three pillars: Standards (Anthropic Claude 4.x best practices, context engineering principles, 1,500+ paper synthesis, Fabric pattern system, markdown-first / no-XML-tags); Templates (Handlebars-based — Briefing.hbs, Structure.hbs, Gate.hbs, DynamicAgent.hbs, and eval-specific templates Judge.hbs, Rubric.hbs, TestCase.hbs, Comparison.hbs, Report.hbs used by Agents and Evals skills); and Tools (RenderTemplate.ts for CLI/TypeScript rendering with data-content separation). Philosophy: prompts that write prompts — structure is code, content is data. Delivered 65% token reduction across PAI (53K → 18K tokens) via template extraction. Output is always a prompt to be used elsewhere, not final content. Reference files: Standards.md (complete prompt engineering guide), Tools/RenderTemplate.ts (rendering implementation).
type: skill
platform: codex
source: PAI v5.0.0
---

# Prompting

Meta-prompting standard library — the PAI system for generating, optimizing, and composing prompts programmatically. Owns three pillars: Standards (Anthropic Claude 4.x best practices, context engineering principles, 1,500+ paper synthesis, Fabric pattern system, markdown-first / no-XML-tags); Templates (Handlebars-based — Briefing.hbs, Structure.hbs, Gate.hbs, DynamicAgent.hbs, and eval-specific templates Judge.hbs, Rubric.hbs, TestCase.hbs, Comparison.hbs, Report.hbs used by Agents and Evals skills); and Tools (RenderTemplate.ts for CLI/TypeScript rendering with data-content separation). Philosophy: prompts that write prompts — structure is code, content is data. Delivered 65% token reduction across PAI (53K → 18K tokens) via template extraction. Output is always a prompt to be used elsewhere, not final content. Reference files: Standards.md (complete prompt engineering guide), Tools/RenderTemplate.ts (rendering implementation).

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Prompting pack from PAI/Packs/Prompting/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Standards.md
  Templates
  Tools
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Prompting/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
