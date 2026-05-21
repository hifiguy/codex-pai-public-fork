---
name: Art
pack-id: pai-art-v1.0.0
version: 1.0.0
author: danielmiessler
description: Generates static visual content across 20+ formats via Flux, Nano Banana Pro (Gemini 3 Pro), and GPT-Image-1. Covers blog header illustrations, editorial art, Mermaid flowcharts, technical architecture diagrams, D3.js dashboards, taxonomies, timelines, 2x2 framework matrices, comparisons, annotated screenshots, recipe cards, aphorism/quote cards, conceptual maps, stat cards, comic panels, YouTube thumbnails, PAI pack icons, and brand-logo wallpapers. Named workflows: Essay, D3Dashboards, Visualize, Mermaid, TechnicalDiagrams, Taxonomies, Timelines, Frameworks, Comparisons, AnnotatedScreenshots, RecipeCards, Aphorisms, Maps, Stats, Comics, YouTubeThumbnailChecklist, AdHocYouTubeThumbnail, CreatePAIPackIcon, LogoWallpaper, RemoveBackground. SKILLCUSTOMIZATIONS loads PREFERENCES.md, CharacterSpecs.md, and SceneConstruction.md. --remove-bg flag produces transparent-background PNG (can produce black backgrounds — verify visually). Up to 14 reference images per request (5 human, 6 object Gemini API limit). Output staged to ~/Downloads/ for preview before any project directory copy. Nano Banana Pro uses --size for resolution tier 1K/2K/4K and separate --aspect-ratio.
type: skill
platform: codex
source: PAI v5.0.0
---

# Art

Generates static visual content across 20+ formats via Flux, Nano Banana Pro (Gemini 3 Pro), and GPT-Image-1. Covers blog header illustrations, editorial art, Mermaid flowcharts, technical architecture diagrams, D3.js dashboards, taxonomies, timelines, 2x2 framework matrices, comparisons, annotated screenshots, recipe cards, aphorism/quote cards, conceptual maps, stat cards, comic panels, YouTube thumbnails, PAI pack icons, and brand-logo wallpapers. Named workflows: Essay, D3Dashboards, Visualize, Mermaid, TechnicalDiagrams, Taxonomies, Timelines, Frameworks, Comparisons, AnnotatedScreenshots, RecipeCards, Aphorisms, Maps, Stats, Comics, YouTubeThumbnailChecklist, AdHocYouTubeThumbnail, CreatePAIPackIcon, LogoWallpaper, RemoveBackground. SKILLCUSTOMIZATIONS loads PREFERENCES.md, CharacterSpecs.md, and SceneConstruction.md. --remove-bg flag produces transparent-background PNG (can produce black backgrounds — verify visually). Up to 14 reference images per request (5 human, 6 object Gemini API limit). Output staged to ~/Downloads/ for preview before any project directory copy. Nano Banana Pro uses --size for resolution tier 1K/2K/4K and separate --aspect-ratio.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Art pack from PAI/Packs/Art/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  Examples
  HeadshotExamples
  Lib
  SKILL.md
  ThumbnailExamples
  Tools
  Workflows
  YouTubeThumbnailExamples
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Art/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
