---
name: Browser
pack-id: pai-browser-v1.0.0
version: 1.0.0
author: danielmiessler
description: Headless browser automation via agent-browser — Rust CLI daemon with persistent auth profiles for fast, scriptable, parallel browser work. Supports batch commands, network interception, device emulation, per-site profile auth (one-time headed login, headless forever after), and parallel isolated sessions via --session. Workflows: ReviewStories (fan out YAML user stories to parallel UIReviewers), Automate (load/run parameterized recipe templates), Update. Delegates to general-purpose agents with agent-browser instructions for background parallel scraping. Falls back to Interceptor if site has bot detection.
type: skill
platform: codex
source: PAI v5.0.0
---

# Browser

Headless browser automation via agent-browser — Rust CLI daemon with persistent auth profiles for fast, scriptable, parallel browser work. Supports batch commands, network interception, device emulation, per-site profile auth (one-time headed login, headless forever after), and parallel isolated sessions via --session. Workflows: ReviewStories (fan out YAML user stories to parallel UIReviewers), Automate (load/run parameterized recipe templates), Update. Delegates to general-purpose agents with agent-browser instructions for background parallel scraping. Falls back to Interceptor if site has bot detection.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Browser pack from PAI/Packs/Browser/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  README.md
  Recipes
  SKILL.md
  Stories
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Browser/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
