# Knowledge — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Knowledge skill from the PAI v5.0.0 release.

Manage the PAI Knowledge Archive — a curated, typed graph of notes across four entity domains: People, Companies, Ideas, and Research. Operations: search (3-pass: lexical + frontmatter + wikilink), add (creates note with mandatory typed cross-links), harvest (KnowledgeHarvester pulls from PAI sources), develop (surfaces seedling notes for enrichment), ingest (fetch URL or file, create primary note, ripple updates to related notes), contradictions (find conflicting claims via tag-overlap pairs), graph (stats or 2-hop traversal via KnowledgeGraph.ts), retrieve (BM25-lite compressed context via MemoryRetriever.ts), mine (SessionHarvester extracts memory candidates from recent conversations). Every note ships with typed related: frontmatter links (8 relationship types: supports, contradicts, extends, part-of, instance-of, caused-by, preceded-by, related).

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Knowledge"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Knowledge skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Knowledge skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Knowledge` into `~/.codex/skills/Knowledge/`? (yes/no)"
2. If existing skill found: "Back up the existing `Knowledge` to `~/.codex/skills/Knowledge.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
