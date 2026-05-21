---
name: Evals
pack-id: pai-evals-v1.0.0
version: 1.0.0
author: danielmiessler
description: Comprehensive AI agent evaluation framework with three grader types (code-based: deterministic/fast; model-based: nuanced/LLM rubric; human: gold standard) and pass@k / pass^k scoring. Evaluates agent transcripts, tool-call sequences, and multi-turn conversations — not just single outputs. Supports capability evals (~70% pass target) and regression evals (~99% pass target). Workflows: RunEval, CompareModels, ComparePrompts, CreateJudge, CreateUseCase, RunScenario, CreateScenario, ViewResults. Integrates with THE ALGORITHM ISC rows for automated verification. Domain patterns pre-configured for coding, conversational, research, and computer-use agent types in Data/DomainPatterns.yaml. Tools: AlgorithmBridge.ts (ISC integration), FailureToTask.ts (failures → tasks), SuiteManager.ts (create/graduate/saturation-check), ScenarioRunner.ts (multi-turn simulated-user), TranscriptCapture.ts, PAIAgentAdapter.ts (wraps Inference.ts), ScenarioToTranscript.ts. Code-based graders: string_match, regex_match, binary_tests, static_analysis, state_check, tool_calls. Model-based graders: llm_rubric, natural_language_assert, pairwise_comparison.
type: skill
platform: codex
source: PAI v5.0.0
---

# Evals

Comprehensive AI agent evaluation framework with three grader types (code-based: deterministic/fast; model-based: nuanced/LLM rubric; human: gold standard) and pass@k / pass^k scoring. Evaluates agent transcripts, tool-call sequences, and multi-turn conversations — not just single outputs. Supports capability evals (~70% pass target) and regression evals (~99% pass target). Workflows: RunEval, CompareModels, ComparePrompts, CreateJudge, CreateUseCase, RunScenario, CreateScenario, ViewResults. Integrates with THE ALGORITHM ISC rows for automated verification. Domain patterns pre-configured for coding, conversational, research, and computer-use agent types in Data/DomainPatterns.yaml. Tools: AlgorithmBridge.ts (ISC integration), FailureToTask.ts (failures → tasks), SuiteManager.ts (create/graduate/saturation-check), ScenarioRunner.ts (multi-turn simulated-user), TranscriptCapture.ts, PAIAgentAdapter.ts (wraps Inference.ts), ScenarioToTranscript.ts. Code-based graders: string_match, regex_match, binary_tests, static_analysis, state_check, tool_calls. Model-based graders: llm_rubric, natural_language_assert, pairwise_comparison.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the Evals pack from PAI/Packs/Evals/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  BestPractices.md
  bun.lock
  CLIReference.md
  Data
  Graders
  package.json
  PROJECT.md
  Results
  Scenarios
  ScienceMapping.md
  ScorerTypes.md
  SKILL.md
  Suites
  TemplateIntegration.md
  Tools
  Types
  UseCases
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/Evals/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
