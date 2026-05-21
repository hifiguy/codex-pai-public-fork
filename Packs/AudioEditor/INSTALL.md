# AudioEditor — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the AudioEditor skill from the PAI v5.0.0 release.

AI-powered audio and video editing pipeline: Whisper word-level transcription (insanely-fast-whisper on MPS) → Claude segment classification (KEEP / CUT_FILLER / CUT_FALSE_START / CUT_STUTTER / CUT_DEAD_AIR / CUT_EDIT_MARKER) → ffmpeg execution with 40ms qsin crossfades and room-tone gap fill → optional Cleanvoice API cloud polish for mouth sounds and loudness normalization. Distinguishes rhetorical pauses from accidental ones. Breaths attenuated to 50% volume (not removed). Preview mode (--preview flag) shows proposed cuts without modifying audio. Aggressive mode (--aggressive flag) applies tighter filler detection thresholds. Polish step (--polish flag) uploads to Cleanvoice API for mouth sound removal and loudness normalization — confirm before cloud upload of sensitive content. Pipeline tools: Transcribe.ts, Analyze.ts, Edit.ts, Polish.ts, Pipeline.ts. Single workflow: Clean.md. Requires OPENAI_API_KEY; CLEANVOICE_API_KEY optional for polish step.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/AudioEditor"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING AudioEditor skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing AudioEditor skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `AudioEditor` into `~/.codex/skills/AudioEditor/`? (yes/no)"
2. If existing skill found: "Back up the existing `AudioEditor` to `~/.codex/skills/AudioEditor.backup-{timestamp}/` first? (yes/no — recommend yes)"

---

## Phase 3: Backup (only if existing)

```bash
if [ -d "$SKILL_DIR" ]; then
  BACKUP="$SKILL_DIR.backup-$(date +%Y%m%d-%H%M%S)"
  mv "$SKILL_DIR" "$BACKUP"
  echo "Backed up to $BACKUP"
fi
```

---

## Phase 4: Install

```bash
mkdir -p "$ENGINE_DIR/skills"
cp -R src/ "$SKILL_DIR/"
echo "Installed to $SKILL_DIR"
```

---

## Phase 5: Verify

Run the file and functional checks in [VERIFY.md](VERIFY.md). Confirm to the user when all checks pass.
