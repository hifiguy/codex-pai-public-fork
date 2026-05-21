---
name: IterativeDepth
pack-id: pai-iterativedepth-v1.0.0
version: 1.0.0
author: danielmiessler
description: Structured multi-angle exploration that runs 2-8 sequential passes through the same problem, each from a systematically different scientific lens, to surface requirements and edge cases invisible from any single angle. Grounded in 20 established techniques across cognitive science (Hermeneutic Circle, Triangulation), AI/ML (Self-Consistency, Ensemble Methods), requirements engineering (Viewpoint-Oriented RE), and design thinking (Six Thinking Hats, Causal Layered Analysis). Each pass outputs new ISC criteria; passes stop when yields repeat. Best used in the OBSERVE phase at Extended+ effort — the default question should be why NOT to use it, not why to use it. A 4-lens pass routinely discovers 30-50% more criteria than direct analysis. Single workflow: Workflows/Explore.md (supports Fast mode with 2 lenses for quick depth). Reference files: ScientificFoundation.md (research grounding for all 20 techniques), TheLenses.md (full definitions for all 8 lenses). BPE-fragile — quarterly test recommended.
type: skill
platform: codex
source: PAI v5.0.0
---

# IterativeDepth

Structured multi-angle exploration that runs 2-8 sequential passes through the same problem, each from a systematically different scientific lens, to surface requirements and edge cases invisible from any single angle. Grounded in 20 established techniques across cognitive science (Hermeneutic Circle, Triangulation), AI/ML (Self-Consistency, Ensemble Methods), requirements engineering (Viewpoint-Oriented RE), and design thinking (Six Thinking Hats, Causal Layered Analysis). Each pass outputs new ISC criteria; passes stop when yields repeat. Best used in the OBSERVE phase at Extended+ effort — the default question should be why NOT to use it, not why to use it. A 4-lens pass routinely discovers 30-50% more criteria than direct analysis. Single workflow: Workflows/Explore.md (supports Fast mode with 2 lenses for quick depth). Reference files: ScientificFoundation.md (research grounding for all 20 techniques), TheLenses.md (full definitions for all 8 lenses). BPE-fragile — quarterly test recommended.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the IterativeDepth pack from PAI/Packs/IterativeDepth/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  ScientificFoundation.md
  SKILL.md
  TheLenses.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/IterativeDepth/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
