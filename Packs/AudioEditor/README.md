---
name: AudioEditor
pack-id: pai-audioeditor-v1.0.0
version: 1.0.0
author: danielmiessler
description: AI-powered audio and video editing pipeline: Whisper word-level transcription (insanely-fast-whisper on MPS) → Claude segment classification (KEEP / CUT_FILLER / CUT_FALSE_START / CUT_STUTTER / CUT_DEAD_AIR / CUT_EDIT_MARKER) → ffmpeg execution with 40ms qsin crossfades and room-tone gap fill → optional Cleanvoice API cloud polish for mouth sounds and loudness normalization. Distinguishes rhetorical pauses from accidental ones. Breaths attenuated to 50% volume (not removed). Preview mode (--preview flag) shows proposed cuts without modifying audio. Aggressive mode (--aggressive flag) applies tighter filler detection thresholds. Polish step (--polish flag) uploads to Cleanvoice API for mouth sound removal and loudness normalization — confirm before cloud upload of sensitive content. Pipeline tools: Transcribe.ts, Analyze.ts, Edit.ts, Polish.ts, Pipeline.ts. Single workflow: Clean.md. Requires OPENAI_API_KEY; CLEANVOICE_API_KEY optional for polish step.
type: skill
platform: codex
source: PAI v5.0.0
---

# AudioEditor

AI-powered audio and video editing pipeline: Whisper word-level transcription (insanely-fast-whisper on MPS) → Claude segment classification (KEEP / CUT_FILLER / CUT_FALSE_START / CUT_STUTTER / CUT_DEAD_AIR / CUT_EDIT_MARKER) → ffmpeg execution with 40ms qsin crossfades and room-tone gap fill → optional Cleanvoice API cloud polish for mouth sounds and loudness normalization. Distinguishes rhetorical pauses from accidental ones. Breaths attenuated to 50% volume (not removed). Preview mode (--preview flag) shows proposed cuts without modifying audio. Aggressive mode (--aggressive flag) applies tighter filler detection thresholds. Polish step (--polish flag) uploads to Cleanvoice API for mouth sound removal and loudness normalization — confirm before cloud upload of sensitive content. Pipeline tools: Transcribe.ts, Analyze.ts, Edit.ts, Polish.ts, Pipeline.ts. Single workflow: Clean.md. Requires OPENAI_API_KEY; CLEANVOICE_API_KEY optional for polish step.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the AudioEditor pack from PAI/Packs/AudioEditor/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Tools
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/AudioEditor/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
