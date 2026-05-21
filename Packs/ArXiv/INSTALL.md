# ArXiv — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the ArXiv skill from the PAI v5.0.0 release.

Search and retrieve arXiv academic papers by topic, category, or paper ID — with AlphaXiv-enriched AI-generated overviews. Uses arXiv Atom API (no auth) for discovery and search across cs.AI, cs.LG, cs.CL (NLP/LLMs), cs.CR (security), cs.MA (multi-agent), cs.SE, and cs.IR. Supports title (ti:), abstract (abs:), author (au:), and category (cat:) search fields with boolean operators (AND, OR, ANDNOT); sorts by lastUpdatedDate or relevance; paginates up to 2,000 results per call with 3s rate limit between calls. AlphaXiv enrichment fetches markdown summaries from alphaxiv.org/overview/{ID}.md; full text from alphaxiv.org/abs/{ID}.md as fallback; 404 means summary not yet generated. Workflows: Latest (new papers by category), Search (topic/keyword search), Paper (single paper deep-dive by ID or URL). API returns Atom XML — parse with text processing, not jq. HTTPS required with -L flag; check published date not lastUpdatedDate for truly new submissions. Output: paper title, authors, abstract, AlphaXiv summary, and direct arXiv URL.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/ArXiv"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING ArXiv skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing ArXiv skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `ArXiv` into `~/.codex/skills/ArXiv/`? (yes/no)"
2. If existing skill found: "Back up the existing `ArXiv` to `~/.codex/skills/ArXiv.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
