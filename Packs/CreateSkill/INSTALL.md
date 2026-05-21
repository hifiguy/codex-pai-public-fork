# CreateSkill — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the CreateSkill skill from the PAI v5.0.0 release.

Complete PAI skill development lifecycle across two tracks. Structure track: scaffold new skills (TitleCase dirs, flat 2-level max, Workflows/ + Tools/ + References/ only), validate against canonical format, canonicalize existing skills. Effectiveness track (Anthropic methodology): TestSkill spawns with-skill vs baseline agents in parallel and compares outputs, ImproveSkill diagnoses root causes and rewrites instructions with reasoning over rigid constraints, OptimizeDescription generates 20 should/shouldn't-trigger test queries and rewrites for accuracy. Guides from Thariq Shihipar (Mar 2026): Gotchas section mandatory, BPE check before finalizing, progressive disclosure (frontmatter → SKILL.md body → reference files), on-demand hooks.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/CreateSkill"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING CreateSkill skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing CreateSkill skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `CreateSkill` into `~/.codex/skills/CreateSkill/`? (yes/no)"
2. If existing skill found: "Back up the existing `CreateSkill` to `~/.codex/skills/CreateSkill.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
