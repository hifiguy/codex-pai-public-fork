---
name: CreateCLI
pack-id: pai-createcli-v1.0.0
version: 1.0.0
author: danielmiessler
description: Generate production-ready TypeScript CLIs using a 3-tier template system: Tier 1 llcli-style manual arg parsing (zero deps, Bun + TypeScript, ~300-400 lines — 80% of cases), Tier 2 Commander.js (subcommands, nested options, auto-help — 15%), Tier 3 oclif reference only (enterprise scale — 5%). Every generated CLI includes full implementation, README + QUICKSTART docs, package.json with Bun, tsconfig strict mode, type-safe throughout, JSON output, exit code compliance. Workflows: CreateCli (from scratch), AddCommand (extend existing), UpgradeTier (migrate Tier 1 → 2). Outputs go to ~/.codex/Bin/ or ~/Projects/. Tier 1 (llcli pattern — 327 lines, zero deps) suits API clients, data transformers, simple automation — 2-10 commands, JSON output. Tier 2 (Commander.js) for 10+ commands, nested options, or plugin architecture. Tier 3 (oclif) is documentation-only reference for Heroku/Salesforce scale. Output tree: {name}.ts + package.json + tsconfig.json (strict) + .env.example + README.md + QUICKSTART.md. Quality gates: zero TypeScript errors, exit codes 0/1, --help comprehensive, JSON output pipes to jq/grep.
type: skill
platform: codex
source: PAI v5.0.0
---

# CreateCLI

Generate production-ready TypeScript CLIs using a 3-tier template system: Tier 1 llcli-style manual arg parsing (zero deps, Bun + TypeScript, ~300-400 lines — 80% of cases), Tier 2 Commander.js (subcommands, nested options, auto-help — 15%), Tier 3 oclif reference only (enterprise scale — 5%). Every generated CLI includes full implementation, README + QUICKSTART docs, package.json with Bun, tsconfig strict mode, type-safe throughout, JSON output, exit code compliance. Workflows: CreateCli (from scratch), AddCommand (extend existing), UpgradeTier (migrate Tier 1 → 2). Outputs go to ~/.codex/Bin/ or ~/Projects/. Tier 1 (llcli pattern — 327 lines, zero deps) suits API clients, data transformers, simple automation — 2-10 commands, JSON output. Tier 2 (Commander.js) for 10+ commands, nested options, or plugin architecture. Tier 3 (oclif) is documentation-only reference for Heroku/Salesforce scale. Output tree: {name}.ts + package.json + tsconfig.json (strict) + .env.example + README.md + QUICKSTART.md. Quality gates: zero TypeScript errors, exit codes 0/1, --help comprehensive, JSON output pipes to jq/grep.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the CreateCLI pack from PAI/Packs/CreateCLI/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  FrameworkComparison.md
  Patterns.md
  SKILL.md
  TypescriptPatterns.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/CreateCLI/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
