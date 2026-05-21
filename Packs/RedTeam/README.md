---
name: RedTeam
pack-id: pai-redteam-v1.0.0
version: 1.0.0
author: danielmiessler
description: Military-grade adversarial analysis that deploys 32 parallel expert agents (engineers, architects, pentesters, interns) to stress-test ideas, strategies, and plans — not systems or infrastructure. Two workflows: ParallelAnalysis (5-phase: decompose into 24 atomic claims → 32-agent parallel attack → synthesis → steelman → counter-argument, each 8 points) and AdversarialValidation (competing proposals synthesized into best solution). Context files: Philosophy.md (core principles, success criteria, agent types), Integration.md (how to combine with FirstPrinciples, Council, and other skills; output format). Targets arguments, not network vulnerabilities. Findings ranked by severity; goal is to strengthen, not destroy — weaknesses delivered with remediation paths. Collaborates with FirstPrinciples (decompose assumptions before attacking) and Council (Council debates to find paths; RedTeam attacks whatever survives). Also invoked internally by Ideate (TEST phase) and WorldThreatModel (horizon stress-testing).
type: skill
platform: codex
source: PAI v5.0.0
---

# RedTeam

Military-grade adversarial analysis that deploys 32 parallel expert agents (engineers, architects, pentesters, interns) to stress-test ideas, strategies, and plans — not systems or infrastructure. Two workflows: ParallelAnalysis (5-phase: decompose into 24 atomic claims → 32-agent parallel attack → synthesis → steelman → counter-argument, each 8 points) and AdversarialValidation (competing proposals synthesized into best solution). Context files: Philosophy.md (core principles, success criteria, agent types), Integration.md (how to combine with FirstPrinciples, Council, and other skills; output format). Targets arguments, not network vulnerabilities. Findings ranked by severity; goal is to strengthen, not destroy — weaknesses delivered with remediation paths. Collaborates with FirstPrinciples (decompose assumptions before attacking) and Council (Council debates to find paths; RedTeam attacks whatever survives). Also invoked internally by Ideate (TEST phase) and WorldThreatModel (horizon stress-testing).

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the RedTeam pack from PAI/Packs/RedTeam/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Integration.md
  Philosophy.md
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/RedTeam/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
