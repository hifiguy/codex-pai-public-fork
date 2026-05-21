---
name: Delegation
pack-id: pai-delegation-v1.0.0
version: 1.0.0
author: danielmiessler
description: Parallelize work via six patterns: built-in agents (Engineer/Architect/Algorithm/Explore/Plan via Task), worktree-isolated agents (conflict-free parallel file edits), background agents (run_in_background: true, non-blocking), custom agents (ComposeAgent via Agents skill → Task general-purpose), agent teams (TeamCreate + TaskCreate + SendMessage for multi-turn peer coordination), and parallel task dispatch (N identical operations). Two-tier delegation: lightweight (haiku, max_turns=3, one-shot extraction/classification) vs full (multi-step, tool use, iteration). Decision rule — agents need to talk to each other or share state → Teams; independent one-shot work → Subagents. Auto-invoked by Algorithm when 3+ independent workstreams exist at Extended+ effort.
type: skill
platform: codex
source: PAI v5.0.0
---

# Delegation

Parallelize work via six patterns: built-in agents (Engineer/Architect/Algorithm/Explore/Plan via Task), worktree-isolated agents (conflict-free parallel file edits), background agents (run_in_background: true, non-blocking), custom agents (ComposeAgent via Agents skill → Task general-purpose), agent teams (TeamCreate + TaskCreate + SendMessage for multi-turn peer coordination), and parallel task dispatch (N identical operations). Two-tier delegation: lightweight (haiku, max_turns=3, one-shot extraction/classification) vs full (multi-step, tool use, iteration). Decision rule — agents need to talk to each other or share state → Teams; independent one-shot work → Subagents. Auto-invoked by Algorithm when 3+ independent workstreams exist at Extended+ effort.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Delegation pack from PAI/Packs/Delegation/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Delegation/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
