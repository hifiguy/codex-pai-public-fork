---
name: BeCreative
pack-id: pai-becreative-v1.0.0
version: 1.0.0
author: danielmiessler
description: Divergent ideation and corpus expansion using Verbalized Sampling + extended thinking. Single-shot mode generates 5 internally diverse candidates (p<0.10 each) and surfaces the strongest. Multi-turn mode expands a small seed corpus (5-20 examples) into a diverse N-example dataset for evals, training, or test sets. Research-backed: Zhang et al. 2025 (arXiv:2510.01171) — 1.6-2.1x diversity increase on creative writing, 25.7% quality improvement, and synthetic-data downstream accuracy lift 30.6% → 37.5% on math benchmarks. Seven workflows: StandardCreativity, MaximumCreativity, IdeaGeneration, TreeOfThoughts, DomainSpecific, TechnicalCreativityGemini3 for algorithmic/architecture work, and SyntheticDataExpansion for VS-Multi corpus growth. Single-shot output is one best response, not a ranked list; SyntheticDataExpansion writes a JSONL corpus to MEMORY/WORK/{slug}/synthetic-data/. Integrates with XPost, LinkedInPost, Blogging (creative angles), Art (diverse image prompt ideas), Business (offer frameworks), Research (creative synthesis), Evals and _PROMPTINJECTION (consume expanded corpora). Reference files: ResearchFoundation.md (why it works, activation triggers), Principles.md (core philosophy), Templates.md (quick reference for all modes), Examples.md.
type: skill
platform: codex
source: PAI v5.0.0
---

# BeCreative

Divergent ideation and corpus expansion using Verbalized Sampling + extended thinking. Single-shot mode generates 5 internally diverse candidates (p<0.10 each) and surfaces the strongest. Multi-turn mode expands a small seed corpus (5-20 examples) into a diverse N-example dataset for evals, training, or test sets. Research-backed: Zhang et al. 2025 (arXiv:2510.01171) — 1.6-2.1x diversity increase on creative writing, 25.7% quality improvement, and synthetic-data downstream accuracy lift 30.6% → 37.5% on math benchmarks. Seven workflows: StandardCreativity, MaximumCreativity, IdeaGeneration, TreeOfThoughts, DomainSpecific, TechnicalCreativityGemini3 for algorithmic/architecture work, and SyntheticDataExpansion for VS-Multi corpus growth. Single-shot output is one best response, not a ranked list; SyntheticDataExpansion writes a JSONL corpus to MEMORY/WORK/{slug}/synthetic-data/. Integrates with XPost, LinkedInPost, Blogging (creative angles), Art (diverse image prompt ideas), Business (offer frameworks), Research (creative synthesis), Evals and _PROMPTINJECTION (consume expanded corpora). Reference files: ResearchFoundation.md (why it works, activation triggers), Principles.md (core philosophy), Templates.md (quick reference for all modes), Examples.md.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the BeCreative pack from PAI/Packs/BeCreative/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Assets
  Examples.md
  Principles.md
  ResearchFoundation.md
  SKILL.md
  Templates.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/BeCreative/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
