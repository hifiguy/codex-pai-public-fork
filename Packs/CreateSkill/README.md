---
name: CreateSkill
pack-id: pai-createskill-v1.0.0
version: 1.0.0
author: danielmiessler
description: Complete PAI skill development lifecycle across two tracks. Structure track: scaffold new skills (TitleCase dirs, flat 2-level max, Workflows/ + Tools/ + References/ only), validate against canonical format, canonicalize existing skills. Effectiveness track (Anthropic methodology): TestSkill spawns with-skill vs baseline agents in parallel and compares outputs, ImproveSkill diagnoses root causes and rewrites instructions with reasoning over rigid constraints, OptimizeDescription generates 20 should/shouldn't-trigger test queries and rewrites for accuracy. Guides from Thariq Shihipar (Mar 2026): Gotchas section mandatory, BPE check before finalizing, progressive disclosure (frontmatter → SKILL.md body → reference files), on-demand hooks.
type: skill
platform: codex
source: PAI v5.0.0
---

# CreateSkill

Complete PAI skill development lifecycle across two tracks. Structure track: scaffold new skills (TitleCase dirs, flat 2-level max, Workflows/ + Tools/ + References/ only), validate against canonical format, canonicalize existing skills. Effectiveness track (Anthropic methodology): TestSkill spawns with-skill vs baseline agents in parallel and compares outputs, ImproveSkill diagnoses root causes and rewrites instructions with reasoning over rigid constraints, OptimizeDescription generates 20 should/shouldn't-trigger test queries and rewrites for accuracy. Guides from Thariq Shihipar (Mar 2026): Gotchas section mandatory, BPE check before finalizing, progressive disclosure (frontmatter → SKILL.md body → reference files), on-demand hooks.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the CreateSkill pack from PAI/Packs/CreateSkill/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/CreateSkill/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
