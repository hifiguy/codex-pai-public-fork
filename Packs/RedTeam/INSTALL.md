# RedTeam — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the RedTeam skill from the PAI v5.0.0 release.

Military-grade adversarial analysis that deploys 32 parallel expert agents (engineers, architects, pentesters, interns) to stress-test ideas, strategies, and plans — not systems or infrastructure. Two workflows: ParallelAnalysis (5-phase: decompose into 24 atomic claims → 32-agent parallel attack → synthesis → steelman → counter-argument, each 8 points) and AdversarialValidation (competing proposals synthesized into best solution). Context files: Philosophy.md (core principles, success criteria, agent types), Integration.md (how to combine with FirstPrinciples, Council, and other skills; output format). Targets arguments, not network vulnerabilities. Findings ranked by severity; goal is to strengthen, not destroy — weaknesses delivered with remediation paths. Collaborates with FirstPrinciples (decompose assumptions before attacking) and Council (Council debates to find paths; RedTeam attacks whatever survives). Also invoked internally by Ideate (TEST phase) and WorldThreatModel (horizon stress-testing).

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/RedTeam"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING RedTeam skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing RedTeam skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `RedTeam` into `~/.codex/skills/RedTeam/`? (yes/no)"
2. If existing skill found: "Back up the existing `RedTeam` to `~/.codex/skills/RedTeam.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
