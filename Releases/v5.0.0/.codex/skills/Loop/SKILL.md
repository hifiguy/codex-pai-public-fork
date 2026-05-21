---
name: Loop
description: "Iterative improvement loop — revisit and refine a target across multiple Algorithm cycles toward an ideal state. USE WHEN loop, iterate, refine, improve iteratively, multiple passes, keep improving, loop mode, revisit, rework."
disable-model-invocation: true
effort: medium
---

# /loop — Iterative Improvement

Run the Algorithm in `mode: loop` — multiple full Algorithm cycles on the same target, each iteration building on the last. Unlike `/optimize` (autonomous mutation loop), `/loop` runs full Algorithm passes with human review between iterations.

## Invocation

```
/loop --target "path/to/target" --iterations 5
/loop --target "~/.codex/skills/Art/Workflows/TechnicalDiagrams.md" --goal "make diagrams more consistent"
/loop --resume       # Resume a previous loop
/loop --status       # Show iteration history
```

## What Happens

Each iteration is a full Algorithm cycle (OBSERVE → THINK → PLAN → BUILD → EXECUTE → VERIFY → LEARN) with:
- ISC criteria that evolve between iterations
- Each cycle's LEARN phase informs the next cycle's OBSERVE
- ISA tracks iteration count and cumulative improvements
- Human approves/redirects between iterations

## Arguments

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `--target PATH` | yes | | What to improve (file, directory, skill) |
| `--goal TEXT` | | inferred | What "better" means for this target |
| `--iterations N` | | 3 | Maximum number of Algorithm cycles |
| `--resume` | | | Resume a previous loop |
| `--status` | | | Show iteration history |
| `--autoresearch` | | off | Opt-in autonomous mode — see below |

## Algorithm Integration

Sets `mode: loop` in ISA frontmatter. The `iteration` field tracks cycle count. Each cycle re-enters the Algorithm with accumulated context from prior iterations.

## Autoresearch Mode (opt-in)

`--autoresearch` switches /loop from supervised multi-pass improvement to autonomous iteration, borrowing three patterns from pi-autoresearch (davebcn87, MIT):

1. **No human review between cycles** — each iteration's LEARN feeds directly into the next OBSERVE. Cycle continues until `--iterations` reached, target met, or explicit interrupt.
2. **Dead-ends ledger** — ISA maintains a `## Dead Ends` section. Every failed iteration appends one line with the rejected approach and reason. Resumes read this to avoid retrying rejected paths.
3. **MAD confidence on iteration score** — if the target has a measurable score, compute `|delta|/MAD(iteration_scores)` per cycle. Flag red (<1.0×) iterations as noise-floor and log `marginal`; do not update baseline. See `PAI/ALGORITHM/optimize-loop.md` → Confidence Gating.

Invocation:
```
/loop --target "path" --goal "X" --iterations 20 --autoresearch
```

Default /loop behavior is unchanged — autoresearch is opt-in only. Intended for overnight runs on targets where human-in-the-loop review between cycles is too slow.

## Examples

```
/loop --target "~/.codex/skills/Research" --goal "improve output quality" --iterations 5
/loop --target "prompts/summarize.md" --goal "more concise, less filler"
```

## Gotchas

- **Loop runs multiple full Algorithm cycles.** Each cycle is a complete OBSERVE→LEARN pass. This is expensive in time and tokens.
- **Set a clear exit condition.** Without one, loops can run indefinitely.
- **Human review happens between cycles.** Don't skip the review step — it's the feedback mechanism.
