# CreateCLI — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the CreateCLI skill from the PAI v5.0.0 release.

Generate production-ready TypeScript CLIs using a 3-tier template system: Tier 1 llcli-style manual arg parsing (zero deps, Bun + TypeScript, ~300-400 lines — 80% of cases), Tier 2 Commander.js (subcommands, nested options, auto-help — 15%), Tier 3 oclif reference only (enterprise scale — 5%). Every generated CLI includes full implementation, README + QUICKSTART docs, package.json with Bun, tsconfig strict mode, type-safe throughout, JSON output, exit code compliance. Workflows: CreateCli (from scratch), AddCommand (extend existing), UpgradeTier (migrate Tier 1 → 2). Outputs go to ~/.codex/Bin/ or ~/Projects/. Tier 1 (llcli pattern — 327 lines, zero deps) suits API clients, data transformers, simple automation — 2-10 commands, JSON output. Tier 2 (Commander.js) for 10+ commands, nested options, or plugin architecture. Tier 3 (oclif) is documentation-only reference for Heroku/Salesforce scale. Output tree: {name}.ts + package.json + tsconfig.json (strict) + .env.example + README.md + QUICKSTART.md. Quality gates: zero TypeScript errors, exit codes 0/1, --help comprehensive, JSON output pipes to jq/grep.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/CreateCLI"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING CreateCLI skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing CreateCLI skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `CreateCLI` into `~/.codex/skills/CreateCLI/`? (yes/no)"
2. If existing skill found: "Back up the existing `CreateCLI` to `~/.codex/skills/CreateCLI.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
