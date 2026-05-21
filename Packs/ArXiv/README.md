---
name: ArXiv
pack-id: pai-arxiv-v1.0.0
version: 1.0.0
author: danielmiessler
description: Search and retrieve arXiv academic papers by topic, category, or paper ID — with AlphaXiv-enriched AI-generated overviews. Uses arXiv Atom API (no auth) for discovery and search across cs.AI, cs.LG, cs.CL (NLP/LLMs), cs.CR (security), cs.MA (multi-agent), cs.SE, and cs.IR. Supports title (ti:), abstract (abs:), author (au:), and category (cat:) search fields with boolean operators (AND, OR, ANDNOT); sorts by lastUpdatedDate or relevance; paginates up to 2,000 results per call with 3s rate limit between calls. AlphaXiv enrichment fetches markdown summaries from alphaxiv.org/overview/{ID}.md; full text from alphaxiv.org/abs/{ID}.md as fallback; 404 means summary not yet generated. Workflows: Latest (new papers by category), Search (topic/keyword search), Paper (single paper deep-dive by ID or URL). API returns Atom XML — parse with text processing, not jq. HTTPS required with -L flag; check published date not lastUpdatedDate for truly new submissions. Output: paper title, authors, abstract, AlphaXiv summary, and direct arXiv URL.
type: skill
platform: codex
source: PAI v5.0.0
---

# ArXiv

Search and retrieve arXiv academic papers by topic, category, or paper ID — with AlphaXiv-enriched AI-generated overviews. Uses arXiv Atom API (no auth) for discovery and search across cs.AI, cs.LG, cs.CL (NLP/LLMs), cs.CR (security), cs.MA (multi-agent), cs.SE, and cs.IR. Supports title (ti:), abstract (abs:), author (au:), and category (cat:) search fields with boolean operators (AND, OR, ANDNOT); sorts by lastUpdatedDate or relevance; paginates up to 2,000 results per call with 3s rate limit between calls. AlphaXiv enrichment fetches markdown summaries from alphaxiv.org/overview/{ID}.md; full text from alphaxiv.org/abs/{ID}.md as fallback; 404 means summary not yet generated. Workflows: Latest (new papers by category), Search (topic/keyword search), Paper (single paper deep-dive by ID or URL). API returns Atom XML — parse with text processing, not jq. HTTPS required with -L flag; check published date not lastUpdatedDate for truly new submissions. Output: paper title, authors, abstract, AlphaXiv summary, and direct arXiv URL.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the ArXiv pack from PAI/Packs/ArXiv/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/ArXiv/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
