# FirstPrinciples — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the FirstPrinciples skill from the PAI v5.0.0 release.

Physics-based reasoning framework (Musk/Elon methodology) that deconstructs problems to irreducible fundamental truths rather than reasoning by analogy. Three-step structure: DECONSTRUCT (break to constituent parts and actual values), CHALLENGE (classify every element as hard constraint / soft constraint / unvalidated assumption — only physics is truly immutable), RECONSTRUCT (build optimal solution from fundamentals alone, ignoring inherited form). Outputs: constituent-parts breakdown, constraint classification table, and reconstructed solution with key insight. Three workflows: Deconstruct.md, Challenge.md, Reconstruct.md. Integrates with RedTeam (attack assumptions before deploying adversarial agents), Security (decompose threat model), Architecture (challenge design constraints), and Pentesters (decompose assumed security boundaries). Other skills invoke via: Challenge on all stated constraints → classify as hard/soft/assumption. Cross-domain synthesis: solutions from unrelated fields often apply once the fundamental truths are exposed.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/FirstPrinciples"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING FirstPrinciples skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing FirstPrinciples skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `FirstPrinciples` into `~/.codex/skills/FirstPrinciples/`? (yes/no)"
2. If existing skill found: "Back up the existing `FirstPrinciples` to `~/.codex/skills/FirstPrinciples.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
