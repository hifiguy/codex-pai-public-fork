# BeCreative — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the BeCreative skill from the PAI v5.0.0 release.

Divergent ideation and corpus expansion using Verbalized Sampling + extended thinking. Single-shot mode generates 5 internally diverse candidates (p<0.10 each) and surfaces the strongest. Multi-turn mode expands a small seed corpus (5-20 examples) into a diverse N-example dataset for evals, training, or test sets. Research-backed: Zhang et al. 2025 (arXiv:2510.01171) — 1.6-2.1x diversity increase on creative writing, 25.7% quality improvement, and synthetic-data downstream accuracy lift 30.6% → 37.5% on math benchmarks. Seven workflows: StandardCreativity, MaximumCreativity, IdeaGeneration, TreeOfThoughts, DomainSpecific, TechnicalCreativityGemini3 for algorithmic/architecture work, and SyntheticDataExpansion for VS-Multi corpus growth. Single-shot output is one best response, not a ranked list; SyntheticDataExpansion writes a JSONL corpus to MEMORY/WORK/{slug}/synthetic-data/. Integrates with XPost, LinkedInPost, Blogging (creative angles), Art (diverse image prompt ideas), Business (offer frameworks), Research (creative synthesis), Evals and _PROMPTINJECTION (consume expanded corpora). Reference files: ResearchFoundation.md (why it works, activation triggers), Principles.md (core philosophy), Templates.md (quick reference for all modes), Examples.md.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/BeCreative"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING BeCreative skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing BeCreative skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `BeCreative` into `~/.codex/skills/BeCreative/`? (yes/no)"
2. If existing skill found: "Back up the existing `BeCreative` to `~/.codex/skills/BeCreative.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
