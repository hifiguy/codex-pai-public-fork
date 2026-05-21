# Iceberg Workflow — SystemsThinking

## Purpose

Walk down from visible **events** to the **mental models** that produced them. Most analysis stops at the top layer; durable fixes live at the bottom two.

The Iceberg Model (popularized by Michael Goodman and the Academy for Systemic Change) asserts that 90% of what generates behavior is below the waterline. Treating symptoms leaves the generator intact, which is why "the same thing keeps happening."

## Invocation

This workflow is invoked:
1. **Directly by the user:** "iceberg this", "walk down the iceberg", "why does this keep happening"
2. **By the Algorithm** when OBSERVE capability scan selects SystemsThinking with a recurring-problem signal
3. **By the RootCauseAnalysis skill** — its Postmortem workflow hands off to Iceberg when patterns repeat across incidents

## The Four Layers

```
╱═══════════════════════════════════╲
│        LAYER 1: EVENTS            │  ← What happened? (visible, reactive)
╲═══════════════════════════════════╱
        │ "Why did this happen?"
        ▼
╱═══════════════════════════════════╲
│        LAYER 2: PATTERNS          │  ← What has happened over time?
╲═══════════════════════════════════╱
        │ "What's generating this pattern?"
        ▼
╱═══════════════════════════════════╲
│       LAYER 3: STRUCTURES         │  ← What rules, incentives, feedback loops?
╲═══════════════════════════════════╱
        │ "What beliefs make this structure feel correct?"
        ▼
╱═══════════════════════════════════╲
│     LAYER 4: MENTAL MODELS        │  ← What assumptions generate the structure?
╲═══════════════════════════════════╱
```

**Intervention leverage increases as you descend.** Event-layer fixes are reactive and don't prevent recurrence. Structure-layer fixes change the generator. Mental-model-layer fixes change what the organization *believes*, which transforms the whole cascade.

## Execution

### Step 1: Name the Event Clearly

Write one sentence stating the specific event that triggered the analysis.

```
EVENT: [Specific thing that happened, with date/time/scope]
```

Avoid generalization at this stage. "A 14-minute outage of the payments service on 2026-04-12 at 23:51 UTC" is better than "reliability issues."

### Step 2: Find the Pattern (Layer 2)

Ask: "Has this kind of thing happened before?"

```
PATTERNS:
- Over what time window has this recurred?
- Under what conditions does it appear?
- Is the frequency changing (up, flat, down)?
- Are there similar patterns in adjacent systems/teams?
```

If no pattern exists — this was a one-time event. Iceberg is not the right tool; go to Postmortem (RootCauseAnalysis) for a single-incident analysis. If a pattern exists, continue down.

Common pattern shapes:
- **Recurring** — same thing, same shape, intermittent frequency
- **Escalating** — same thing, worse each time
- **Shifting** — symptom moved but the underlying rhythm is identical
- **Seasonal / triggered** — tied to a schedule, a release, a team event

### Step 3: Find the Structure (Layer 3)

Ask: "What rules, incentives, flows, or feedback loops generate this pattern?"

This is where most analyses stop too early. Push for at least 3 candidate structures. Categories to consider:

```
STRUCTURES:
- Feedback loops — what reinforces or balances the pattern?
- Incentives — what behavior does the system reward?
- Flows — where do information, resources, authority travel?
- Delays — gap between action and feedback, often the hidden cause
- Thresholds — above/below what number does behavior change?
- Boundaries — who owns what; what falls in the gaps?
- Rules / policies — what has been codified, for whom?
- Resource allocation — where does attention/time/money go?
```

**Key question:** If you removed the symptom and left the structure intact, would a new symptom of the same shape emerge somewhere else?

If yes — the structure you named is the generator.

### Step 4: Find the Mental Model (Layer 4)

Ask: "What beliefs, assumptions, or worldviews make the structure feel natural or correct?"

Mental models are the hardest to surface because they are *invisible to the people holding them*. They feel like "how things are," not "what we believe."

```
MENTAL MODELS — probe with these questions:
- What does this structure imply about what we value?
- What would we have to believe for this structure to make sense?
- What does the structure say about who is trusted, who is not?
- What does the structure treat as scarce vs. abundant?
- What time horizon does the structure optimize for?
- Whose voice is amplified by the structure? Whose is quiet?
```

Common mental-model archetypes:
- "We don't have time for X" (structure under-invests in X; may be wrong)
- "Quality is the QA team's job" (generates buck-passing structure)
- "Moving fast is more valuable than moving carefully" (generates brittle systems)
- "People need to be managed closely" (generates layered oversight + slow decisions)
- "Prevention isn't visible; fixing is" (rewards fire-fighting over fire-prevention)

### Step 5: Locate Intervention Points

Once you've walked down, walk back up with intervention candidates at each layer:

```
INTERVENTIONS BY LAYER:

Layer 4 (Mental Models) — highest leverage, hardest
- What belief would need to change?
- Who needs to see the structure differently?
- What evidence would shift the belief?

Layer 3 (Structures) — high leverage, actionable
- Change the feedback loop (tighten delays, flip polarity)
- Change incentives (reward what you want, stop rewarding what you don't)
- Change boundaries (merge responsibilities, split them)
- Change flows (information, resources, authority)

Layer 2 (Patterns) — medium leverage
- Instrument the pattern so it's visible
- Set thresholds that force response
- Change the rhythm (ship cadence, review cadence, staffing cycle)

Layer 1 (Events) — lowest leverage, fastest
- Patch the specific failure
- Useful only if structural fixes are already committed
- Otherwise: treating symptoms, problem returns
```

**Rule:** Never ship an event-layer fix without naming the structural fix it defers. The structural fix may not happen today, but it must be on the roadmap — otherwise the team is consenting to recurrence.

### Step 6: Output

```
🧊 ICEBERG ANALYSIS: [topic]

EVENTS (Layer 1):
- [Specific event 1]
- [Related event 2]
- ...

PATTERN (Layer 2):
- Time window: [e.g., 3 recurrences in 6 weeks]
- Shape: [recurring / escalating / shifting / seasonal]
- Trigger conditions: [what predicts it]

STRUCTURE (Layer 3):
- Primary generator: [feedback loop / incentive / flow / delay / rule]
- Contributing structures: [list]
- Test: if we remove the symptom, would this structure produce another?

MENTAL MODEL (Layer 4):
- Belief that makes the structure feel correct: [...]
- Who holds it: [...]
- What evidence would shift it: [...]

INTERVENTION CANDIDATES:
- Event-layer patch: [quick fix, explicitly deferred]
- Structural fix: [the real lever]
- Mental-model shift: [the durable change]

RECOMMENDED: [which layer to target given cost/benefit]
```

## Worked Example

```
EVENT: p99 latency spike in checkout service on 2026-04-11 caused cart abandonment

PATTERN:
- 4 p99 spikes in checkout in last 8 weeks
- Each time, fixed with a cache warm-up or pod resize
- Frequency is flat, not declining
- All spikes occur within 20min of a deploy

STRUCTURE:
- Feedback loop: deploy → cold cache → latency spike → ops response → warm-up → resolved. Loop never detects until after it damages users.
- Incentive: deploy velocity is measured; deploy safety is not (no SLO for post-deploy p99)
- Boundary: cache layer owned by infra; checkout owned by product. No team owns "the deploy behavior of the cache."
- Delay: 6-minute gap between cold cache and human response

MENTAL MODEL:
- Belief: "deploys are safe if tests pass"
- Held by: eng leadership, because CI is green
- Shift requires: evidence that tests don't cover cache warmth — a single p99 chart overlaid with deploy events does it

INTERVENTIONS:
- Event-layer patch (deferred): continue manual warm-ups — DO NOT keep doing only this
- Structural: add post-deploy p99 gate that blocks traffic shift until warm; name an owner for deploy-time cache behavior
- Mental-model: share p99-vs-deploy chart with leadership; add "post-deploy stability" to deploy definition of done

RECOMMENDED: structural fix (post-deploy p99 gate + ownership). Patches alone are consent to recurrence.
```

## Common Mistakes

- **Stopping at Layer 2.** "It keeps happening on deploys" is a pattern, not a structure. Push to the feedback loop / incentive.
- **Listing "people" as a structure.** Individuals are events. The structure is what the organization requires of them.
- **Conflating mental models with opinions.** "Team members disagree about X" is noise. The mental model is what the organization's *structure* believes, which may differ from what individuals articulate.
- **Naming a hero intervention at Layer 4 you can't actually make.** "We need to change the culture" is a cop-out if there's no concrete action. Culture-layer interventions must still have a specific first move.
- **Skipping the pattern check.** If there's no pattern, this isn't an iceberg problem — it's an incident. Use RootCauseAnalysis/Postmortem.

## Integration

- Feeds **CausalLoop** when Layer 3 structure is a feedback loop that deserves explicit diagramming.
- Feeds **FindArchetype** when Layer 2 pattern matches a known systems archetype.
- Handoffs to **RootCauseAnalysis/Postmortem** if the investigation reveals a single incident rather than a pattern.
- Output informs **ISC criteria** in OBSERVE — structural criteria, not just symptom criteria.

## Attribution

Iceberg Model popularized in *The Fifth Discipline Fieldbook* (Senge et al., 1994); four-layer formulation from Michael Goodman / Academy for Systemic Change. Leverage-by-layer principle: Donella Meadows, *Thinking in Systems*.
