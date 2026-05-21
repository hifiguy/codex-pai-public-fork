---
name: Ideate
pack-id: pai-ideate-v1.0.0
version: 1.0.0
author: danielmiessler
description: Evolutionary ideation engine — loop-controlled multi-cycle idea generation through 9 phases (CONSUME, DREAM at noise=0.9, DAYDREAM at noise=0.5, CONTEMPLATE at noise=0.1, STEAL cross-domain borrowing, MATE recombination via Fisher-Yates shuffle, TEST fitness scoring, EVOLVE selection, META-LEARN Lamarckian strategy adjustment). Loop Controller drives adaptive continue/pivot/stop logic with mid-cycle quality checkpoints; strategies evolve across cycles based on what worked. Produces ranked novel solution candidates with full provenance and fitness landscape. Six workflows: FullCycle (all 9 phases adaptive — default), QuickCycle (compressed CONSUME+STEAL+MATE+TEST single cycle), Dream (DREAM phase only), Steal (cross-domain transfer only), Mate (recombination only), Test (fitness evaluation only). Integrates IterativeDepth in CONTEMPLATE, RedTeam in TEST, Council optionally in MATE.
type: skill
platform: codex
source: PAI v5.0.0
---

# Ideate

Evolutionary ideation engine — loop-controlled multi-cycle idea generation through 9 phases (CONSUME, DREAM at noise=0.9, DAYDREAM at noise=0.5, CONTEMPLATE at noise=0.1, STEAL cross-domain borrowing, MATE recombination via Fisher-Yates shuffle, TEST fitness scoring, EVOLVE selection, META-LEARN Lamarckian strategy adjustment). Loop Controller drives adaptive continue/pivot/stop logic with mid-cycle quality checkpoints; strategies evolve across cycles based on what worked. Produces ranked novel solution candidates with full provenance and fitness landscape. Six workflows: FullCycle (all 9 phases adaptive — default), QuickCycle (compressed CONSUME+STEAL+MATE+TEST single cycle), Dream (DREAM phase only), Steal (cross-domain transfer only), Mate (recombination only), Test (fitness evaluation only). Integrates IterativeDepth in CONTEMPLATE, RedTeam in TEST, Council optionally in MATE.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Ideate pack from PAI/Packs/Ideate/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Ideate/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
