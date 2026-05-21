# WriteStory — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the WriteStory skill from the PAI v5.0.0 release.

Constructs fiction across seven simultaneous narrative layers (Meaning, Character Change, Plot, Mystery, World, Relationships, Prose) powered by Will Storr's Science of Storytelling, Pressfield's structure framework (Concept/Hook/Clothesline/Theme-as-question/Villain/Gift), and Mark Forsyth's Elements of Eloquence for rhetorical figures. Character arcs follow Storr's sacred flaw → crisis → transformation model. Anti-cliche system bans generic AI patterns. Story Bible is PRD-based — maps all 7 layers from first scene to final beat. Scales from short story to multi-book series. Aesthetic is configurable per project (Adams, Tolkien, sparse sci-fi, etc.). Five workflows: Interview (extract story ideas), BuildBible (full layered plan), Explore (brainstorm/what-if), WriteChapter (prose with rhetorical devices), Revise (edit/polish/rewrite).

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/WriteStory"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING WriteStory skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing WriteStory skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `WriteStory` into `~/.codex/skills/WriteStory/`? (yes/no)"
2. If existing skill found: "Back up the existing `WriteStory` to `~/.codex/skills/WriteStory.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
