---
name: Aphorisms
pack-id: pai-aphorisms-v1.0.0
version: 1.0.0
author: danielmiessler
description: Manages a curated aphorism collection with full CRUD — content-based matching, themed search, thinker research, and database maintenance. Organizes quotes by author, theme, context, and newsletter usage history to prevent repetition. Four workflows: FindAphorism (analyze newsletter content, match themes, return 3-5 ranked recommendations with rationale), AddAphorism (parse quote + author, extract themes, validate uniqueness, update theme index), ResearchThinker (deep research on philosopher, add sourced quotes to database), SearchAphorisms (search by theme, keyword, or author). Database at ~/.codex/skills/aphorisms/Database/aphorisms.md — stores full quote text, author attribution, theme tags, context/background, source reference, and usage history per entry. Theme index supports 12+ categories: Work Ethic, Resilience, Learning, Stoicism, Risk, Wisdom, Truth-seeking, Excellence, Curiosity, Freedom, Rationality, Clarity. Supported thinkers: Hitchens, Feynman, Deutsch, Sam Harris, Spinoza, plus any requested author. Newsletter integration: tracks which quotes used in which issues to enforce variety; content theme extraction drives automated matching.
type: skill
platform: codex
source: PAI v5.0.0
---

# Aphorisms

Manages a curated aphorism collection with full CRUD — content-based matching, themed search, thinker research, and database maintenance. Organizes quotes by author, theme, context, and newsletter usage history to prevent repetition. Four workflows: FindAphorism (analyze newsletter content, match themes, return 3-5 ranked recommendations with rationale), AddAphorism (parse quote + author, extract themes, validate uniqueness, update theme index), ResearchThinker (deep research on philosopher, add sourced quotes to database), SearchAphorisms (search by theme, keyword, or author). Database at ~/.codex/skills/aphorisms/Database/aphorisms.md — stores full quote text, author attribution, theme tags, context/background, source reference, and usage history per entry. Theme index supports 12+ categories: Work Ethic, Resilience, Learning, Stoicism, Risk, Wisdom, Truth-seeking, Excellence, Curiosity, Freedom, Rationality, Clarity. Supported thinkers: Hitchens, Feynman, Deutsch, Sam Harris, Spinoza, plus any requested author. Newsletter integration: tracks which quotes used in which issues to enforce variety; content theme extraction drives automated matching.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Aphorisms pack from PAI/Packs/Aphorisms/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Database
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Aphorisms/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
