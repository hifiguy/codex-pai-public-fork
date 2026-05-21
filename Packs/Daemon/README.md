---
name: Daemon
pack-id: pai-daemon-v1.0.0
version: 1.0.0
author: danielmiessler
description: Manage the public daemon profile — a living digital representation of what you're working on, thinking about, reading, and building. DaemonAggregator.ts reads PAI sources (TELOS missions/goals/books/wisdom, KNOWLEDGE/Ideas titles, PROJECTS.md, MEMORY/WORK themes, PRINCIPAL_IDENTITY bio) and writes to daemon-data.json. SecurityFilter.ts applies deterministic pattern-matching (NOT LLM judgment) to strip names, paths, credentials, and internal refs. Structurally excludes CONTACTS, FINANCES, HEALTH, OUR_STORY, OPINIONS. deploy.sh builds the VitePress static site and deploys to Cloudflare Pages. Two-repo pattern: public framework (danielmiessler/Daemon, forkable) + private content (daemon-dm). Workflows: UpdateDaemon, ReadDaemon, PreviewDaemon, DeployDaemon.
type: skill
platform: codex
source: PAI v5.0.0
---

# Daemon

Manage the public daemon profile — a living digital representation of what you're working on, thinking about, reading, and building. DaemonAggregator.ts reads PAI sources (TELOS missions/goals/books/wisdom, KNOWLEDGE/Ideas titles, PROJECTS.md, MEMORY/WORK themes, PRINCIPAL_IDENTITY bio) and writes to daemon-data.json. SecurityFilter.ts applies deterministic pattern-matching (NOT LLM judgment) to strip names, paths, credentials, and internal refs. Structurally excludes CONTACTS, FINANCES, HEALTH, OUR_STORY, OPINIONS. deploy.sh builds the VitePress static site and deploys to Cloudflare Pages. Two-repo pattern: public framework (danielmiessler/Daemon, forkable) + private content (daemon-dm). Workflows: UpdateDaemon, ReadDaemon, PreviewDaemon, DeployDaemon.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Daemon pack from PAI/Packs/Daemon/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Docs
  SKILL.md
  Tools
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Daemon/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
