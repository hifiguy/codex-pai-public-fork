# Fabric — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Fabric skill from the PAI v5.0.0 release.

Execute any of 240+ specialized prompt patterns natively (no CLI required for most) across categories: Extraction (30+), Summarization (20+), Analysis (35+), Creation (50+), Improvement (10+), Security (15), Rating (8). Common patterns: extract_wisdom, summarize, create_5_sentence_summary, create_threat_model, create_stride_threat_model, analyze_claims, improve_writing, review_code, extract_main_idea, analyze_malware, create_sigma_rules, create_mermaid_visualization, youtube_summary, judge_output, rate_ai_response. Native execution reads Patterns/{name}/system.md and applies directly. Fabric CLI used only for YouTube transcript extraction (-y URL) and fallback URL fetching (-u URL). Patterns auto-synced from upstream Fabric repo via UpdatePatterns workflow. Workflows: ExecutePattern, UpdatePatterns.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/Fabric"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Fabric skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Fabric skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Fabric` into `~/.codex/skills/Fabric/`? (yes/no)"
2. If existing skill found: "Back up the existing `Fabric` to `~/.codex/skills/Fabric.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
mkdir -p "$CLAUDE_DIR/skills"
cp -R src/ "$SKILL_DIR/"
echo "Installed to $SKILL_DIR"
```

---

## Phase 5: Verify

Run the file and functional checks in [VERIFY.md](VERIFY.md). Confirm to the user when all checks pass.
