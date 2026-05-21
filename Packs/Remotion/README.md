---
name: Remotion
pack-id: pai-remotion-v1.0.0
version: 1.0.0
author: danielmiessler
description: Creates programmatic video with React via Remotion — builds compositions, sequences, and motion graphics rendered to MP4. Uses useCurrentFrame() for all animation (no CSS animations). Integrates PAI_THEME constants from Theme.ts and Art skill aesthetic preferences for visual consistency. Render command: bunx remotion render {composition-id} ~/Downloads/{name}.mp4. Output always to ~/Downloads/ for preview first. Tools: Render.ts (render, list compositions, create projects) and Theme.ts (PAI theme constants derived from Art). Reference docs: ArtIntegration.md (theme constants, color mapping), Patterns.md (code examples, presets), CriticalRules.md (what not to do), Tools/Ref-*.md (31 pattern files covering core Remotion, Lambda, ElevenLabs captions, AI pipeline). Supports ElevenLabs captions, Lambda rendering, and AI pipeline integration. Rendering is CPU-intensive — use run_in_background. Two primary workflows: ContentToAnimation (animate existing content) and GeneratedContentVideo (AI content to video / make a short).
type: skill
platform: codex
source: PAI v5.0.0
---

# Remotion

Creates programmatic video with React via Remotion — builds compositions, sequences, and motion graphics rendered to MP4. Uses useCurrentFrame() for all animation (no CSS animations). Integrates PAI_THEME constants from Theme.ts and Art skill aesthetic preferences for visual consistency. Render command: bunx remotion render {composition-id} ~/Downloads/{name}.mp4. Output always to ~/Downloads/ for preview first. Tools: Render.ts (render, list compositions, create projects) and Theme.ts (PAI theme constants derived from Art). Reference docs: ArtIntegration.md (theme constants, color mapping), Patterns.md (code examples, presets), CriticalRules.md (what not to do), Tools/Ref-*.md (31 pattern files covering core Remotion, Lambda, ElevenLabs captions, AI pipeline). Supports ElevenLabs captions, Lambda rendering, and AI pipeline integration. Rendering is CPU-intensive — use run_in_background. Two primary workflows: ContentToAnimation (animate existing content) and GeneratedContentVideo (AI content to video / make a short).

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Remotion pack from PAI/Packs/Remotion/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  ArtIntegration.md
  CriticalRules.md
  Patterns.md
  SKILL.md
  Tools
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Remotion/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
