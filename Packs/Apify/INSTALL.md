# Apify — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Apify skill from the PAI v5.0.0 release.

Scrape social media platforms, business data, and e-commerce via Apify actors — Instagram profiles/posts/hashtags/comments, LinkedIn profiles/jobs/posts, TikTok profiles/hashtags/videos/comments, YouTube channels/search/comments, Facebook posts/groups/comments, Google Maps business search with contact/review/image extraction, Amazon products/reviews/pricing, and general-purpose multi-page web crawling with custom pageFunction extraction logic. File-based TypeScript wrappers (scrapeInstagramProfile, searchGoogleMaps, scrapeAmazonProduct, scrapeWebsite, etc.) filter and transform data in code before returning to model context, achieving 95-99% token savings over direct MCP protocol. Parallel multi-platform queries via Promise.all for social listening dashboards. Lead enrichment pipeline: Google Maps → qualified filter → optional LinkedIn enrichment. Competitive analysis across Instagram, YouTube, and TikTok simultaneously.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Apify"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Apify skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Apify skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Apify` into `~/.codex/skills/Apify/`? (yes/no)"
2. If existing skill found: "Back up the existing `Apify` to `~/.codex/skills/Apify.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
