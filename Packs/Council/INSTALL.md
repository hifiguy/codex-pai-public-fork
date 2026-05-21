# Council — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Council skill from the PAI v5.0.0 release.

Multi-agent collaborative debate that produces visible round-by-round transcripts with genuine intellectual friction. All council members are custom-composed via ComposeAgent (Agents skill) with domain expertise, unique voice, and personality tailored to the specific topic — never built-in generic types. ComposeAgent invoked as: bun run ~/.codex/skills/Agents/Tools/ComposeAgent.ts. Two workflows: DEBATE (3 rounds, full transcript + synthesis, parallel execution within rounds, 40-90 seconds total) and QUICK (1 round, fast perspective check). Context files: CouncilMembers.md (agent composition instructions), RoundStructure.md (three-round structure and timing), OutputFormat.md (transcript format templates). Agents are designed per debate topic to create real disagreement; 4-6 well-composed agents outperform 12 generic ones. Council is collaborative-adversarial (debate to find best path); for pure adversarial attack on an idea, use RedTeam instead.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/Council"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Council skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Council skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Council` into `~/.codex/skills/Council/`? (yes/no)"
2. If existing skill found: "Back up the existing `Council` to `~/.codex/skills/Council.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
