# ExtractWisdom — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the ExtractWisdom skill from the PAI v5.0.0 release.

Content-adaptive wisdom extraction that reads the content first, detects what wisdom domains are actually present, then builds custom sections around what it finds — instead of forcing static headers every time. A security talk gets 'Threat Model Insights' and 'Defense Strategies'; a business podcast gets 'Contrarian Business Takes' and 'Money Philosophy'. Five depth levels: Instant (1 section), Fast (3 sections), Basic (3+takeaway), Full (5-12 sections, default), Comprehensive (10-15+themes). Voice follows the user's conversational style — bullets read like telling a friend what you just watched, not a press release. Output always includes dynamic sections, One-Sentence Takeaway, 'If You Only Have 2 Minutes', and References. Spicy/contrarian takes are mandatory inclusions, never softened. YouTube content extracted via `fabric -y URL` before extraction; article content fetched via WebFetch. Output: markdown with dynamic section headers, closing sections vary by depth level, References & Rabbit Holes, optional Themes & Connections (Comprehensive). Workflow: Extract.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/ExtractWisdom"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING ExtractWisdom skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing ExtractWisdom skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `ExtractWisdom` into `~/.codex/skills/ExtractWisdom/`? (yes/no)"
2. If existing skill found: "Back up the existing `ExtractWisdom` to `~/.codex/skills/ExtractWisdom.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
