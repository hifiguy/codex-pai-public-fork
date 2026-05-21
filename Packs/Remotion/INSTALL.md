# Remotion — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Remotion skill from the PAI v5.0.0 release.

Creates programmatic video with React via Remotion — builds compositions, sequences, and motion graphics rendered to MP4. Uses useCurrentFrame() for all animation (no CSS animations). Integrates PAI_THEME constants from Theme.ts and Art skill aesthetic preferences for visual consistency. Render command: bunx remotion render {composition-id} ~/Downloads/{name}.mp4. Output always to ~/Downloads/ for preview first. Tools: Render.ts (render, list compositions, create projects) and Theme.ts (PAI theme constants derived from Art). Reference docs: ArtIntegration.md (theme constants, color mapping), Patterns.md (code examples, presets), CriticalRules.md (what not to do), Tools/Ref-*.md (31 pattern files covering core Remotion, Lambda, ElevenLabs captions, AI pipeline). Supports ElevenLabs captions, Lambda rendering, and AI pipeline integration. Rendering is CPU-intensive — use run_in_background. Two primary workflows: ContentToAnimation (animate existing content) and GeneratedContentVideo (AI content to video / make a short).

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Remotion"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Remotion skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Remotion skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Remotion` into `~/.codex/skills/Remotion/`? (yes/no)"
2. If existing skill found: "Back up the existing `Remotion` to `~/.codex/skills/Remotion.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
