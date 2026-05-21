---
name: BrightData
pack-id: pai-brightdata-v1.0.0
version: 1.0.0
author: danielmiessler
description: 4-tier progressive scraping with automatic escalation: Tier 1 WebFetch (fast, built-in), Tier 2 curl with Chrome headers (basic bot bypass), Tier 3 agent-browser (headless JavaScript rendering via Rust CLI daemon), Tier 4 Bright Data MCP proxy (CAPTCHA, advanced bot detection, residential proxies). Two workflows: FourTierScrape for single URLs, Crawl for multi-page site mapping (light crawl via scrape_batch loop up to 50 pages, or full crawl via Bright Data Crawl API). Always starts at Tier 1 and escalates only when blocked — Tier 4 has usage costs. Outputs URL content in markdown format.
type: skill
platform: codex
source: PAI v5.0.0
---

# BrightData

4-tier progressive scraping with automatic escalation: Tier 1 WebFetch (fast, built-in), Tier 2 curl with Chrome headers (basic bot bypass), Tier 3 agent-browser (headless JavaScript rendering via Rust CLI daemon), Tier 4 Bright Data MCP proxy (CAPTCHA, advanced bot detection, residential proxies). Two workflows: FourTierScrape for single URLs, Crawl for multi-page site mapping (light crawl via scrape_batch loop up to 50 pages, or full crawl via Bright Data Crawl API). Always starts at Tier 1 and escalates only when blocked — Tier 4 has usage costs. Outputs URL content in markdown format.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the BrightData pack from PAI/Packs/BrightData/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/BrightData/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
