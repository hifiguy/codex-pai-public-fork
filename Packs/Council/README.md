---
name: Council
pack-id: pai-council-v1.0.0
version: 1.0.0
author: danielmiessler
description: Multi-agent collaborative debate that produces visible round-by-round transcripts with genuine intellectual friction. All council members are custom-composed via ComposeAgent (Agents skill) with domain expertise, unique voice, and personality tailored to the specific topic — never built-in generic types. ComposeAgent invoked as: bun run ~/.codex/skills/Agents/Tools/ComposeAgent.ts. Two workflows: DEBATE (3 rounds, full transcript + synthesis, parallel execution within rounds, 40-90 seconds total) and QUICK (1 round, fast perspective check). Context files: CouncilMembers.md (agent composition instructions), RoundStructure.md (three-round structure and timing), OutputFormat.md (transcript format templates). Agents are designed per debate topic to create real disagreement; 4-6 well-composed agents outperform 12 generic ones. Council is collaborative-adversarial (debate to find best path); for pure adversarial attack on an idea, use RedTeam instead.
type: skill
platform: codex
source: PAI v5.0.0
---

# Council

Multi-agent collaborative debate that produces visible round-by-round transcripts with genuine intellectual friction. All council members are custom-composed via ComposeAgent (Agents skill) with domain expertise, unique voice, and personality tailored to the specific topic — never built-in generic types. ComposeAgent invoked as: bun run ~/.codex/skills/Agents/Tools/ComposeAgent.ts. Two workflows: DEBATE (3 rounds, full transcript + synthesis, parallel execution within rounds, 40-90 seconds total) and QUICK (1 round, fast perspective check). Context files: CouncilMembers.md (agent composition instructions), RoundStructure.md (three-round structure and timing), OutputFormat.md (transcript format templates). Agents are designed per debate topic to create real disagreement; 4-6 well-composed agents outperform 12 generic ones. Council is collaborative-adversarial (debate to find best path); for pure adversarial attack on an idea, use RedTeam instead.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Council pack from PAI/Packs/Council/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  CouncilMembers.md
  OutputFormat.md
  RoundStructure.md
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Council/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
