# ISA — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the ISA skill from the PAI v5.0.0 release.

Owns the Ideal State Artifact — the universal primitive that holds the articulated ideal state of any thing (project, task, application, library, infrastructure, work session) as a hard-to-vary explanation. The ISA is a single document that articulates the ideal state, drives the build, verifies the build, and records the evolution of understanding. Five workflows: Scaffold (generate a fresh ISA from a prompt at a specified effort tier), Interview (adaptive question-and-answer to fill in or deepen sections), CheckCompleteness (score an existing ISA against the tier completeness gate and report gaps), Reconcile (deterministic merge of an ephemeral feature-file excerpt back into the master ISA, keyed on stable ISC IDs), Seed (bootstrap a draft project ISA from an existing repository's README, code structure, and recent commits). Examples directory contains canonical-isa.md (the showpiece reference, fully populated across all twelve sections), e1-minimal.md (90-second task — Goal + Criteria only), e3-project.md (mid-size project with eight sections), e5-comprehensive.md (full application with all twelve sections plus a populated changelog history). Twelve-section body order is locked: Problem, Vision, Out of Scope, Principles, Constraints, Goal, Criteria, Test Strategy, Features, Decisions, Changelog, Verification. The skill is invoked automatically by the Algorithm at OBSERVE for any non-trivial task and may also be invoked directly by the user to scaffold or audit an ISA outside an Algorithm run.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/ISA"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING ISA skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing ISA skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `ISA` into `~/.codex/skills/ISA/`? (yes/no)"
2. If existing skill found: "Back up the existing `ISA` to `~/.codex/skills/ISA.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
