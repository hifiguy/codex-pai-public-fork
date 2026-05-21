---
name: Apify
pack-id: pai-apify-v1.0.0
version: 1.0.0
author: danielmiessler
description: Scrape social media platforms, business data, and e-commerce via Apify actors — Instagram profiles/posts/hashtags/comments, LinkedIn profiles/jobs/posts, TikTok profiles/hashtags/videos/comments, YouTube channels/search/comments, Facebook posts/groups/comments, Google Maps business search with contact/review/image extraction, Amazon products/reviews/pricing, and general-purpose multi-page web crawling with custom pageFunction extraction logic. File-based TypeScript wrappers (scrapeInstagramProfile, searchGoogleMaps, scrapeAmazonProduct, scrapeWebsite, etc.) filter and transform data in code before returning to model context, achieving 95-99% token savings over direct MCP protocol. Parallel multi-platform queries via Promise.all for social listening dashboards. Lead enrichment pipeline: Google Maps → qualified filter → optional LinkedIn enrichment. Competitive analysis across Instagram, YouTube, and TikTok simultaneously.
type: skill
platform: codex
source: PAI v5.0.0
---

# Apify

Scrape social media platforms, business data, and e-commerce via Apify actors — Instagram profiles/posts/hashtags/comments, LinkedIn profiles/jobs/posts, TikTok profiles/hashtags/videos/comments, YouTube channels/search/comments, Facebook posts/groups/comments, Google Maps business search with contact/review/image extraction, Amazon products/reviews/pricing, and general-purpose multi-page web crawling with custom pageFunction extraction logic. File-based TypeScript wrappers (scrapeInstagramProfile, searchGoogleMaps, scrapeAmazonProduct, scrapeWebsite, etc.) filter and transform data in code before returning to model context, achieving 95-99% token savings over direct MCP protocol. Parallel multi-platform queries via Promise.all for social listening dashboards. Lead enrichment pipeline: Google Maps → qualified filter → optional LinkedIn enrichment. Competitive analysis across Instagram, YouTube, and TikTok simultaneously.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Apify pack from PAI/Packs/Apify/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  actors
  bun.lock
  examples
  index.ts
  INTEGRATION.md
  package.json
  README.md
  SKILL.md
  skills
  tsconfig.json
  types
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Apify/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
