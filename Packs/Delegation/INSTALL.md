# Delegation — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Delegation skill from the PAI v5.0.0 release.

Parallelize work via six patterns: built-in agents (Engineer/Architect/Algorithm/Explore/Plan via Task), worktree-isolated agents (conflict-free parallel file edits), background agents (run_in_background: true, non-blocking), custom agents (ComposeAgent via Agents skill → Task general-purpose), agent teams (TeamCreate + TaskCreate + SendMessage for multi-turn peer coordination), and parallel task dispatch (N identical operations). Two-tier delegation: lightweight (haiku, max_turns=3, one-shot extraction/classification) vs full (multi-step, tool use, iteration). Decision rule — agents need to talk to each other or share state → Teams; independent one-shot work → Subagents. Auto-invoked by Algorithm when 3+ independent workstreams exist at Extended+ effort.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/Delegation"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Delegation skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Delegation skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Delegation` into `~/.codex/skills/Delegation/`? (yes/no)"
2. If existing skill found: "Back up the existing `Delegation` to `~/.codex/skills/Delegation.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
