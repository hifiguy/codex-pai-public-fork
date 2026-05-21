---
name: Knowledge
pack-id: pai-knowledge-v1.0.0
version: 1.0.0
author: danielmiessler
description: Manage the PAI Knowledge Archive — a curated, typed graph of notes across four entity domains: People, Companies, Ideas, and Research. Operations: search (3-pass: lexical + frontmatter + wikilink), add (creates note with mandatory typed cross-links), harvest (KnowledgeHarvester pulls from PAI sources), develop (surfaces seedling notes for enrichment), ingest (fetch URL or file, create primary note, ripple updates to related notes), contradictions (find conflicting claims via tag-overlap pairs), graph (stats or 2-hop traversal via KnowledgeGraph.ts), retrieve (BM25-lite compressed context via MemoryRetriever.ts), mine (SessionHarvester extracts memory candidates from recent conversations). Every note ships with typed related: frontmatter links (8 relationship types: supports, contradicts, extends, part-of, instance-of, caused-by, preceded-by, related).
type: skill
platform: codex
source: PAI v5.0.0
---

# Knowledge

Manage the PAI Knowledge Archive — a curated, typed graph of notes across four entity domains: People, Companies, Ideas, and Research. Operations: search (3-pass: lexical + frontmatter + wikilink), add (creates note with mandatory typed cross-links), harvest (KnowledgeHarvester pulls from PAI sources), develop (surfaces seedling notes for enrichment), ingest (fetch URL or file, create primary note, ripple updates to related notes), contradictions (find conflicting claims via tag-overlap pairs), graph (stats or 2-hop traversal via KnowledgeGraph.ts), retrieve (BM25-lite compressed context via MemoryRetriever.ts), mine (SessionHarvester extracts memory candidates from recent conversations). Every note ships with typed related: frontmatter links (8 relationship types: supports, contradicts, extends, part-of, instance-of, caused-by, preceded-by, related).

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Knowledge pack from PAI/Packs/Knowledge/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Knowledge/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
