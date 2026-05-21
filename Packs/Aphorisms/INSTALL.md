# Aphorisms — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Aphorisms skill from the PAI v5.0.0 release.

Manages a curated aphorism collection with full CRUD — content-based matching, themed search, thinker research, and database maintenance. Organizes quotes by author, theme, context, and newsletter usage history to prevent repetition. Four workflows: FindAphorism (analyze newsletter content, match themes, return 3-5 ranked recommendations with rationale), AddAphorism (parse quote + author, extract themes, validate uniqueness, update theme index), ResearchThinker (deep research on philosopher, add sourced quotes to database), SearchAphorisms (search by theme, keyword, or author). Database at ~/.codex/skills/aphorisms/Database/aphorisms.md — stores full quote text, author attribution, theme tags, context/background, source reference, and usage history per entry. Theme index supports 12+ categories: Work Ethic, Resilience, Learning, Stoicism, Risk, Wisdom, Truth-seeking, Excellence, Curiosity, Freedom, Rationality, Clarity. Supported thinkers: Hitchens, Feynman, Deutsch, Sam Harris, Spinoza, plus any requested author. Newsletter integration: tracks which quotes used in which issues to enforce variety; content theme extraction drives automated matching.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Aphorisms"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Aphorisms skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Aphorisms skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Aphorisms` into `~/.codex/skills/Aphorisms/`? (yes/no)"
2. If existing skill found: "Back up the existing `Aphorisms` to `~/.codex/skills/Aphorisms.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
