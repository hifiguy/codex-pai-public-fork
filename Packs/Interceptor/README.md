---
name: Interceptor
pack-id: pai-interceptor-v1.0.0
version: 1.0.0
author: danielmiessler
description: Real Chrome browser automation via Interceptor extension — controls the actual browser from inside (zero CDP fingerprint, passes all major bot detection checks including BrowserScan, Pixelscan, CreepJS, Fingerprint.com). Stays logged in, uses your real sessions. Compound commands (open, read, act, inspect) collapse multi-step flows into single calls. Unique capabilities: monitor/replay system (record user actions → export replayable plan scripts for regression), network log (auto-captures all fetch/XHR), scene graph for rich editors (Google Docs, Canva, Slides). Workflows: VerifyDeploy, Reproduce (open affected page BEFORE code analysis — mandatory per rules), RecordFlow, ReplayFlow, TestForm, Update. MANDATORY for all visual verification — never use agent-browser for deploy confirmation.
type: skill
platform: codex
source: PAI v5.0.0
---

# Interceptor

Real Chrome browser automation via Interceptor extension — controls the actual browser from inside (zero CDP fingerprint, passes all major bot detection checks including BrowserScan, Pixelscan, CreepJS, Fingerprint.com). Stays logged in, uses your real sessions. Compound commands (open, read, act, inspect) collapse multi-step flows into single calls. Unique capabilities: monitor/replay system (record user actions → export replayable plan scripts for regression), network log (auto-captures all fetch/XHR), scene graph for rich editors (Google Docs, Canva, Slides). Workflows: VerifyDeploy, Reproduce (open affected page BEFORE code analysis — mandatory per rules), RecordFlow, ReplayFlow, TestForm, Update. MANDATORY for all visual verification — never use agent-browser for deploy confirmation.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Interceptor pack from PAI/Packs/Interceptor/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Flows
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Interceptor/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
