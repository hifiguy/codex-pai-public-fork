# BrightData — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the BrightData skill from the PAI v5.0.0 release.

4-tier progressive scraping with automatic escalation: Tier 1 WebFetch (fast, built-in), Tier 2 curl with Chrome headers (basic bot bypass), Tier 3 agent-browser (headless JavaScript rendering via Rust CLI daemon), Tier 4 Bright Data MCP proxy (CAPTCHA, advanced bot detection, residential proxies). Two workflows: FourTierScrape for single URLs, Crawl for multi-page site mapping (light crawl via scrape_batch loop up to 50 pages, or full crawl via Bright Data Crawl API). Always starts at Tier 1 and escalates only when blocked — Tier 4 has usage costs. Outputs URL content in markdown format.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/BrightData"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING BrightData skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing BrightData skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `BrightData` into `~/.codex/skills/BrightData/`? (yes/no)"
2. If existing skill found: "Back up the existing `BrightData` to `~/.codex/skills/BrightData.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
