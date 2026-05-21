---
name: RootCauseAnalysis
pack-id: pai-rootcauseanalysis-v1.0.0
version: 1.0.0
author: danielmiessler
description: Structured incident investigation grounded in Toyota Production System, Kaoru Ishikawa, James Reason's Swiss Cheese model, Dean Gano's Apollo method, and Google SRE blameless-postmortem culture. Five workflows: FiveWhys (linear/branching causal chain, single-thread incidents), Fishbone/Ishikawa (6 M's or 4 P's category mapping, multiple suspected areas), Postmortem (blameless timeline + contributing factors + action items, wraps other methods), FaultTree (AND/OR gate logic, safety-critical multi-path failures), KepnerTregoe IS/IS-NOT (distinction analysis, subtle hard-to-reproduce defects). Context files: Foundation.md (Toyoda, Ishikawa, Reason, Gano, Google SRE; canonical methods), MethodSelection.md (decision flow for workflow selection). Core axiom: proximate cause is where analysis starts, not ends. Humans are never root causes — if a human could make the mistake, the system allowed it. A cause is \"root enough\" when it's actionable. Also supports FMEA-style pre-launch risk inversion (what could fail before it does). Integrates with Science (hypothesis generation during investigation) and RedTeam (stress-test remediations).
type: skill
platform: codex
source: PAI v5.0.0
---

# RootCauseAnalysis

Structured incident investigation grounded in Toyota Production System, Kaoru Ishikawa, James Reason's Swiss Cheese model, Dean Gano's Apollo method, and Google SRE blameless-postmortem culture. Five workflows: FiveWhys (linear/branching causal chain, single-thread incidents), Fishbone/Ishikawa (6 M's or 4 P's category mapping, multiple suspected areas), Postmortem (blameless timeline + contributing factors + action items, wraps other methods), FaultTree (AND/OR gate logic, safety-critical multi-path failures), KepnerTregoe IS/IS-NOT (distinction analysis, subtle hard-to-reproduce defects). Context files: Foundation.md (Toyoda, Ishikawa, Reason, Gano, Google SRE; canonical methods), MethodSelection.md (decision flow for workflow selection). Core axiom: proximate cause is where analysis starts, not ends. Humans are never root causes — if a human could make the mistake, the system allowed it. A cause is \"root enough\" when it's actionable. Also supports FMEA-style pre-launch risk inversion (what could fail before it does). Integrates with Science (hypothesis generation during investigation) and RedTeam (stress-test remediations).

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the RootCauseAnalysis pack from PAI/Packs/RootCauseAnalysis/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Foundation.md
  MethodSelection.md
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/RootCauseAnalysis/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
