---
name: ExtractWisdom
pack-id: pai-extractwisdom-v1.0.0
version: 1.0.0
author: danielmiessler
description: Content-adaptive wisdom extraction that reads the content first, detects what wisdom domains are actually present, then builds custom sections around what it finds — instead of forcing static headers every time. A security talk gets 'Threat Model Insights' and 'Defense Strategies'; a business podcast gets 'Contrarian Business Takes' and 'Money Philosophy'. Five depth levels: Instant (1 section), Fast (3 sections), Basic (3+takeaway), Full (5-12 sections, default), Comprehensive (10-15+themes). Voice follows the user's conversational style — bullets read like telling a friend what you just watched, not a press release. Output always includes dynamic sections, One-Sentence Takeaway, 'If You Only Have 2 Minutes', and References. Spicy/contrarian takes are mandatory inclusions, never softened. YouTube content extracted via `fabric -y URL` before extraction; article content fetched via WebFetch. Output: markdown with dynamic section headers, closing sections vary by depth level, References & Rabbit Holes, optional Themes & Connections (Comprehensive). Workflow: Extract.
type: skill
platform: codex
source: PAI v5.0.0
---

# ExtractWisdom

Content-adaptive wisdom extraction that reads the content first, detects what wisdom domains are actually present, then builds custom sections around what it finds — instead of forcing static headers every time. A security talk gets 'Threat Model Insights' and 'Defense Strategies'; a business podcast gets 'Contrarian Business Takes' and 'Money Philosophy'. Five depth levels: Instant (1 section), Fast (3 sections), Basic (3+takeaway), Full (5-12 sections, default), Comprehensive (10-15+themes). Voice follows the user's conversational style — bullets read like telling a friend what you just watched, not a press release. Output always includes dynamic sections, One-Sentence Takeaway, 'If You Only Have 2 Minutes', and References. Spicy/contrarian takes are mandatory inclusions, never softened. YouTube content extracted via `fabric -y URL` before extraction; article content fetched via WebFetch. Output: markdown with dynamic section headers, closing sections vary by depth level, References & Rabbit Holes, optional Themes & Connections (Comprehensive). Workflow: Extract.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the ExtractWisdom pack from PAI/Packs/ExtractWisdom/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/ExtractWisdom/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
