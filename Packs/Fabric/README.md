---
name: Fabric
pack-id: pai-fabric-v1.0.0
version: 1.0.0
author: danielmiessler
description: Execute any of 240+ specialized prompt patterns natively (no CLI required for most) across categories: Extraction (30+), Summarization (20+), Analysis (35+), Creation (50+), Improvement (10+), Security (15), Rating (8). Common patterns: extract_wisdom, summarize, create_5_sentence_summary, create_threat_model, create_stride_threat_model, analyze_claims, improve_writing, review_code, extract_main_idea, analyze_malware, create_sigma_rules, create_mermaid_visualization, youtube_summary, judge_output, rate_ai_response. Native execution reads Patterns/{name}/system.md and applies directly. Fabric CLI used only for YouTube transcript extraction (-y URL) and fallback URL fetching (-u URL). Patterns auto-synced from upstream Fabric repo via UpdatePatterns workflow. Workflows: ExecutePattern, UpdatePatterns.
type: skill
platform: codex
source: PAI v5.0.0
---

# Fabric

Execute any of 240+ specialized prompt patterns natively (no CLI required for most) across categories: Extraction (30+), Summarization (20+), Analysis (35+), Creation (50+), Improvement (10+), Security (15), Rating (8). Common patterns: extract_wisdom, summarize, create_5_sentence_summary, create_threat_model, create_stride_threat_model, analyze_claims, improve_writing, review_code, extract_main_idea, analyze_malware, create_sigma_rules, create_mermaid_visualization, youtube_summary, judge_output, rate_ai_response. Native execution reads Patterns/{name}/system.md and applies directly. Fabric CLI used only for YouTube transcript extraction (-y URL) and fallback URL fetching (-u URL). Patterns auto-synced from upstream Fabric repo via UpdatePatterns workflow. Workflows: ExecutePattern, UpdatePatterns.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Fabric pack from PAI/Packs/Fabric/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Patterns
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Fabric/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
