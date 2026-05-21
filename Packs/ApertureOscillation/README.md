---
name: ApertureOscillation
pack-id: pai-apertureoscillation-v1.0.0
version: 1.0.0
author: danielmiessler
description: 3-pass scope oscillation that holds a question constant while shifting the scope envelope — narrow/tactical, wide/strategic, then synthesis — to surface design tensions invisible at any single zoom level. Requires two distinct inputs: the tactical target (what you're building) and strategic context (the larger system it serves). Pass 1 captures the component's own internal logic. Pass 2 reveals what the system needs it to be. Pass 3 finds where those views diverge — that delta is the output. Produces: design tensions, scope recommendations, and coherence assessments. Single workflow: Workflows/Oscillate.md. BPE-fragile — quarterly test recommended to verify smarter models don't naturally oscillate scope without prompting. Best integration point: Algorithm OBSERVE phase (before ISC) or THINK phase (before approach commitment). NOT a lens rotation (that's IterativeDepth) and NOT idea generation (that's BeCreative).
type: skill
platform: codex
source: PAI v5.0.0
---

# ApertureOscillation

3-pass scope oscillation that holds a question constant while shifting the scope envelope — narrow/tactical, wide/strategic, then synthesis — to surface design tensions invisible at any single zoom level. Requires two distinct inputs: the tactical target (what you're building) and strategic context (the larger system it serves). Pass 1 captures the component's own internal logic. Pass 2 reveals what the system needs it to be. Pass 3 finds where those views diverge — that delta is the output. Produces: design tensions, scope recommendations, and coherence assessments. Single workflow: Workflows/Oscillate.md. BPE-fragile — quarterly test recommended to verify smarter models don't naturally oscillate scope without prompting. Best integration point: Algorithm OBSERVE phase (before ISC) or THINK phase (before approach commitment). NOT a lens rotation (that's IterativeDepth) and NOT idea generation (that's BeCreative).

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the ApertureOscillation pack from PAI/Packs/ApertureOscillation/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/ApertureOscillation/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
