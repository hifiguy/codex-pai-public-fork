---
name: IterativeDepth
description: "Structured multi-angle exploration that runs 2-8 sequential passes through the same problem, each from a systematically different scientific lens, to surface requirements and edge cases invisible from any single angle. Grounded in 20 established techniques across cognitive science (Hermeneutic Circle, Triangulation), AI/ML (Self-Consistency, Ensemble Methods), requirements engineering (Viewpoint-Oriented RE), and design thinking (Six Thinking Hats, Causal Layered Analysis). Each pass outputs new ISC criteria; passes stop when yields repeat. USE WHEN: iterative depth, explore deeper, multi-angle analysis, multiple perspectives, surface hidden requirements, all angles, blind spot check, deep dive before building, what am I missing, Extended or Deep effort, quick depth, fast angles. NOT FOR: scope/zoom analysis (use ApertureOscillation) or hypothesis-test cycles (use Science)."
effort: high
---

## Customization

**Before executing, check for user customizations at:**
`~/.codex/PAI/USER/SKILLCUSTOMIZATIONS/IterativeDepth/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.


# IterativeDepth

**Structured multi-angle exploration of the same problem to extract deeper understanding and richer ISC criteria.**

Grounded in 20 established scientific techniques across cognitive science (Hermeneutic Circle, Triangulation), AI/ML (Self-Consistency, Ensemble Methods), requirements engineering (Viewpoint-Oriented RE), and design thinking (Six Thinking Hats, Causal Layered Analysis).

## Core Concept

Instead of analyzing a problem once, run 2-8 structured passes through the same problem, each from a systematically different **lens**. Each pass surfaces requirements, edge cases, and criteria invisible from other angles. The combination yields ISC criteria that no single-pass analysis could produce.

## Use / Win

**When to use:** Any time you have time budget beyond Standard tier and the task is important enough that getting the ISC right matters more than speed. This is the single most valuable thinking capability for the OBSERVE phase. If you're at Extended effort or above, you should be asking "why NOT use IterativeDepth?" rather than "why use it?"

Concrete triggers:
- **Extra time available** — Extended+ effort means you have the budget. Spend it on understanding the problem deeply before writing ISC, not on writing more code faster.
- **Deep analysis of what's actually being asked** — The user said X. But what do they actually need? What are they trying to accomplish? What would make them rate this 9-10? Single-pass reverse engineering catches the obvious. IterativeDepth catches the rest.
- **Different angles of approach** — Before committing to an approach, explore the problem from stakeholder, failure, temporal, experiential, and constraint-inversion angles. The right approach often only becomes obvious after seeing the problem from 3-4 directions.
- **Important or critical tasks** — When the user says "this is critical" or the task has high blast radius, the cost of missing a dimension is much higher than the cost of 2-5 extra minutes of analysis.
- **Tasks you've never done before** — Novel work has the highest density of hidden requirements. IterativeDepth is insurance against the things you don't know you don't know.

**What you win:**
- **ISC criteria that single-pass analysis cannot produce.** Each lens surfaces requirements invisible from other angles. A 4-lens pass routinely discovers 30-50% more criteria than direct analysis.
- **Blind spot elimination before they become mid-EXECUTE surprises.** Rework from missed requirements is 5-10x more expensive than the upfront analysis. IterativeDepth pays for itself by preventing restarts.
- **Approach clarity.** Seeing the problem from failure, stakeholder, and constraint-inversion angles often reveals that the obvious approach is wrong and a better path exists.
- **Confidence.** When ISC criteria are built on multi-angle analysis, you can execute with conviction instead of discovering gaps halfway through.

**The default mental model should be:** At Extended+ effort, IterativeDepth is not optional enrichment — it's the standard way to understand what you're building before you build it.

## Workflow Routing

| Trigger | Workflow |
|---------|----------|
| "iterative depth", "explore deeper", "multi-angle" | `Workflows/Explore.md` |
| "quick depth", "fast angles" | `Workflows/Explore.md` (Fast mode: 2 lenses) |

## Quick Reference

- **8 Lenses** available, scaled by SLA (2-8)
- **Each lens** is a structurally different exploration angle
- **Output** is new/refined ISC criteria per pass
- **Integration** point: Deeper understanding through structured multi-angle analysis

**Full Documentation:**
- Scientific grounding: `ScientificFoundation.md`
- Lens definitions: `TheLenses.md`

## Gotchas

- **2-8 lens passes, not infinite.** Diminishing returns after ~5 passes for most topics.
- **Each pass should surface genuinely NEW requirements, not restate previous findings.** If passes start repeating, stop early.
- **This is a BPE-fragile skill.** Monitor whether smarter models make it unnecessary. Quarterly test recommended.

## Examples

**Example 1: Surface hidden requirements**
```
User: "use iterative depth on this API redesign"
→ Pass 1: Functional requirements
→ Pass 2: Security implications
→ Pass 3: Performance constraints
→ Pass 4: Backward compatibility
→ Each pass surfaces new requirements missed by previous
```

## Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"IterativeDepth","workflow":"WORKFLOW_USED","input":"8_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.codex/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `8_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
