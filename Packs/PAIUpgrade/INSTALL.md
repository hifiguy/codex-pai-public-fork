# PAIUpgrade — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the PAIUpgrade skill from the PAI v5.0.0 release.

Generate prioritized PAI upgrade recommendations via 4 parallel threads: Thread 0 (prior-work audit — reads current Algorithm, PATTERNS.yaml, hooks, settings, recent ISAs, and KNOWLEDGE to assign Prior Status tags), Thread 1 (user context — TELOS goals, active projects, PAI system state), Thread 2 (source collection — Anthropic releases, YouTube channels, GitHub trending, custom sources), Thread 3 (internal reflections — Algorithm execution Q1/Q2 patterns). Output format: Discoveries table ranked by interestingness, then tiered Recommendations (CRITICAL/HIGH/MEDIUM/LOW) each with Prior Status (NEW/PARTIAL/DISCUSSED/REJECTED/DONE), then full Technique Details with before/after code. Every recommendation cites file:line evidence from Thread 0 — already-implemented items go to Skipped, never re-surfaced. Workflows: Upgrade, MineReflections, AlgorithmUpgrade, ResearchUpgrade, FindSources, TwitterBookmarks.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CODEX_DIR="$HOME/.codex"
SKILL_DIR="$CODEX_DIR/skills/PAIUpgrade"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING PAIUpgrade skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing PAIUpgrade skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `PAIUpgrade` into `~/.codex/skills/PAIUpgrade/`? (yes/no)"
2. If existing skill found: "Back up the existing `PAIUpgrade` to `~/.codex/skills/PAIUpgrade.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
mkdir -p "$CODEX_DIR/skills"
cp -R src/ "$SKILL_DIR/"
echo "Installed to $SKILL_DIR"
```

---

## Phase 5: Verify

Run the file and functional checks in [VERIFY.md](VERIFY.md). Confirm to the user when all checks pass.
