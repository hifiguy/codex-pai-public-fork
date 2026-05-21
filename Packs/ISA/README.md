---
name: ISA
pack-id: pai-isa-v1.0.0
version: 1.0.0
author: danielmiessler
description: Owns the Ideal State Artifact — the universal primitive that holds the articulated ideal state of any thing (project, task, application, library, infrastructure, work session) as a hard-to-vary explanation. The ISA is a single document that articulates the ideal state, drives the build, verifies the build, and records the evolution of understanding. Five workflows: Scaffold (generate a fresh ISA from a prompt at a specified effort tier), Interview (adaptive question-and-answer to fill in or deepen sections), CheckCompleteness (score an existing ISA against the tier completeness gate and report gaps), Reconcile (deterministic merge of an ephemeral feature-file excerpt back into the master ISA, keyed on stable ISC IDs), Seed (bootstrap a draft project ISA from an existing repository's README, code structure, and recent commits). Examples directory contains canonical-isa.md (the showpiece reference, fully populated across all twelve sections), e1-minimal.md (90-second task — Goal + Criteria only), e3-project.md (mid-size project with eight sections), e5-comprehensive.md (full application with all twelve sections plus a populated changelog history). Twelve-section body order is locked: Problem, Vision, Out of Scope, Principles, Constraints, Goal, Criteria, Test Strategy, Features, Decisions, Changelog, Verification. The skill is invoked automatically by the Algorithm at OBSERVE for any non-trivial task and may also be invoked directly by the user to scaffold or audit an ISA outside an Algorithm run.
type: skill
platform: codex
source: PAI v5.0.0
---

# ISA

Owns the Ideal State Artifact — the universal primitive that holds the articulated ideal state of any thing (project, task, application, library, infrastructure, work session) as a hard-to-vary explanation. The ISA is a single document that articulates the ideal state, drives the build, verifies the build, and records the evolution of understanding. Five workflows: Scaffold (generate a fresh ISA from a prompt at a specified effort tier), Interview (adaptive question-and-answer to fill in or deepen sections), CheckCompleteness (score an existing ISA against the tier completeness gate and report gaps), Reconcile (deterministic merge of an ephemeral feature-file excerpt back into the master ISA, keyed on stable ISC IDs), Seed (bootstrap a draft project ISA from an existing repository's README, code structure, and recent commits). Examples directory contains canonical-isa.md (the showpiece reference, fully populated across all twelve sections), e1-minimal.md (90-second task — Goal + Criteria only), e3-project.md (mid-size project with eight sections), e5-comprehensive.md (full application with all twelve sections plus a populated changelog history). Twelve-section body order is locked: Problem, Vision, Out of Scope, Principles, Constraints, Goal, Criteria, Test Strategy, Features, Decisions, Changelog, Verification. The skill is invoked automatically by the Algorithm at OBSERVE for any non-trivial task and may also be invoked directly by the user to scaffold or audit an ISA outside an Algorithm run.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the ISA pack from PAI/Packs/ISA/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Examples
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/ISA/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
