# Evals — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Evals skill from the PAI v5.0.0 release.

Comprehensive AI agent evaluation framework with three grader types (code-based: deterministic/fast; model-based: nuanced/LLM rubric; human: gold standard) and pass@k / pass^k scoring. Evaluates agent transcripts, tool-call sequences, and multi-turn conversations — not just single outputs. Supports capability evals (~70% pass target) and regression evals (~99% pass target). Workflows: RunEval, CompareModels, ComparePrompts, CreateJudge, CreateUseCase, RunScenario, CreateScenario, ViewResults. Integrates with THE ALGORITHM ISC rows for automated verification. Domain patterns pre-configured for coding, conversational, research, and computer-use agent types in Data/DomainPatterns.yaml. Tools: AlgorithmBridge.ts (ISC integration), FailureToTask.ts (failures → tasks), SuiteManager.ts (create/graduate/saturation-check), ScenarioRunner.ts (multi-turn simulated-user), TranscriptCapture.ts, PAIAgentAdapter.ts (wraps Inference.ts), ScenarioToTranscript.ts. Code-based graders: string_match, regex_match, binary_tests, static_analysis, state_check, tool_calls. Model-based graders: llm_rubric, natural_language_assert, pairwise_comparison.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/Evals"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Evals skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Evals skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Evals` into `~/.codex/skills/Evals/`? (yes/no)"
2. If existing skill found: "Back up the existing `Evals` to `~/.codex/skills/Evals.backup-{timestamp}/` first? (yes/no — recommend yes)"

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
