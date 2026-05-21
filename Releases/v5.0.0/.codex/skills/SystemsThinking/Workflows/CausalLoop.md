# CausalLoop Workflow — SystemsThinking

## Purpose

Build a **Causal Loop Diagram (CLD)** of the system in question — variables connected by arrows labeled with polarity, organized into **reinforcing (R)** and **balancing (B)** loops. The CLD makes the generators of behavior visible in a way prose cannot.

CLDs are the working language of system dynamics (Forrester, Meadows, Senge). They let you simulate second- and third-order effects before committing to an intervention.

## Invocation

Invoked for:
- Mapping the dynamics behind a recurring behavior (usually after Iceberg finds a structural generator)
- Previewing unintended consequences of a planned intervention
- Explaining why a counterintuitive dynamic occurs (growth stalls, quality decays, "fixes" fail)
- Any problem where multiple variables interact with delays

## Notation

```
  A  ──(+)──▶  B        A increases → B increases (same direction)
                         A decreases → B decreases

  A  ──(−)──▶  B        A increases → B decreases (opposite direction)
                         A decreases → B increases

  A  ═══(+/−)═══▶  B    Same as above but with a DELAY (drawn thicker or with ||)


  Loop labels:
  (R) Reinforcing — same-direction cycle, amplifies change, exponential
  (B) Balancing — opposite-direction cycle, goal-seeking, stabilizes
```

**Polarity test for arrows:**
- Change A. Does B change *in the same direction*? → **(+)**
- Change A. Does B change *in the opposite direction*? → **(−)**

**Loop-type test (count the minus signs):**
- Even number (including 0) of (−) arrows in the loop → **Reinforcing (R)**
- Odd number of (−) arrows in the loop → **Balancing (B)**

## Execution

### Step 1: State the Question

Every CLD is built to answer a specific question. Without the question, the diagram sprawls.

```
QUESTION: [Specific question the CLD should answer]
```

Examples:
- "Why does our release velocity plateau past a certain team size?"
- "What happens if we double the rate limit?"
- "Why does tech debt accelerate even though we pay some down each quarter?"

### Step 2: Identify Variables

List 5-15 variables — quantities that can increase or decrease over time.

**Variables must be:**
- Nouns or noun phrases, not verbs ("Team size" not "Hiring")
- Directional (can go up or down)
- Observable or inferable

**Include "soft" variables.** Trust, morale, perceived urgency, customer satisfaction all matter. Drop them only if they genuinely don't influence the dynamics — not because they're hard to measure.

Fewer, high-quality variables beat exhaustive lists. Start with the 5-7 that matter most; add as needed.

### Step 3: Draw the Arrows

For each pair of variables, ask: *does a change in A directly cause a change in B?*

- **Direct causation only** — no "A correlates with B"; no "A causes C causes B" as a single arrow (draw it through C)
- **Polarity** — assign (+) or (−)
- **Delay** — mark with ═══ or || if the effect takes significantly longer than the rhythm of the system

**Sanity check each arrow** — can you describe the mechanism in one sentence? If not, the arrow is probably wrong.

### Step 4: Identify Loops

Trace cycles that return to their starting variable. For each loop:

1. Count the (−) arrows
2. Label **R** if even, **B** if odd
3. Give it a short, descriptive name ("Success-to-success," "Coordination tax," "Capacity drift")

**Every loop has a name.** Un-named loops are untracked. The name captures the *dynamic*, not the variables.

### Step 5: Interpret the Dynamics

For each loop, answer:
- **Reinforcing:** What does this loop amplify? Toward what limit?
- **Balancing:** Toward what goal does this loop pull? What sets the goal?
- **Delay:** Where are the delays, and what behavior do they produce (oscillation, overshoot, slow response)?

Identify **dominant loops** — which loops are driving behavior *right now*? Which will dominate as variables change?

Many real-world behaviors flip: reinforcing loop dominates early (growth), balancing loop dominates later (limits). This is the "limits to growth" archetype.

### Step 6: Stress-Test Interventions

Before recommending a change, simulate it on the CLD:

```
PROPOSED INTERVENTION: [change to a variable, a flow, or a loop]

Trace the effect:
- Directly affected variable: [X goes up/down by how much]
- First-order downstream: [what changes next, via which arrows]
- Second-order: [loops now pull differently, what behavior emerges]
- Third-order: [after delays complete, what's the new equilibrium]

Unintended consequences: [which balancing loop resists? which reinforcing loop accelerates?]
Side effects: [variables changed that weren't targeted]
```

**Every non-trivial intervention triggers at least one balancing loop.** If you can't find it, you haven't looked hard enough.

### Step 7: Output

```
🔄 CAUSAL LOOP DIAGRAM: [topic]

QUESTION: [what this CLD answers]

VARIABLES:
- [var1], [var2], [var3], ...

ARROWS (source → target, polarity, delay?):
- [A] →(+) [B]
- [B] →(−) [C] (delay)
- ...

LOOPS:
- R1 "Success-to-success": A → B → C → A (reinforcing)
  Dynamic: amplifies early wins, accelerates until limit
- B1 "Coordination tax": A → D → E → A (balancing)
  Dynamic: opposes growth, scales with team size

DOMINANT LOOP: [which is driving behavior now]
EMERGING DOMINANT LOOP: [which will dominate as system grows]

INTERVENTION ANALYSIS:
- Proposed: [X]
- Intended effect: [Y]
- Unintended: [which loop pushes back]
- Recommended: [attack the balancing loop directly, or accept tradeoff]
```

## Worked Example — Team Growth Paradox

```
QUESTION: Why does engineering velocity plateau past team size 12-15?

VARIABLES:
- Team size
- Output (features shipped/week)
- Hiring budget
- Pending features backlog
- Coordination cost per engineer
- Per-engineer output
- Onboarding load

ARROWS:
- Team size →(+) Total output
- Total output →(+) Revenue/success
- Revenue →(+) Hiring budget
- Hiring budget →(+) Team size  (delay: hiring pipeline)
- Pending features →(+) Hiring budget
- Team size →(+) Coordination cost per engineer
- Coordination cost →(−) Per-engineer output
- Per-engineer output →(+) Total output
- Team size →(+) Onboarding load
- Onboarding load →(−) Per-engineer output (delay: ramp-up period)

LOOPS:
- R1 "Success → hiring → output": Team size → Total output → Revenue → Hiring budget → Team size (reinforcing; drives growth)
- B1 "Coordination tax": Team size → Coordination cost → Per-engineer output → Total output → (pulls back against R1 via less hiring demand pressure)
- B2 "Onboarding drag": Team size → Onboarding load → Per-engineer output → Total output (balancing, delayed)

DOMINANT LOOP: R1 dominant early; B1 and B2 dominant once team > 12.

INTERVENTION ANALYSIS:
- Proposed: hire more engineers to ship more features.
- Intended: Total output ↑
- Unintended: Coordination cost ↑ faster than Total output; at some point Total output flat-lines or declines (policy resistance)
- Recommended: Don't attack R1 (slowing hiring just slows the dynamic). Attack B1 directly: invest in coordination mechanisms (async docs, modular architecture, team topology) that break the "team size → coordination cost" arrow.
```

This is Meadows' **"Limits to Growth"** archetype — see `FindArchetype` workflow for the canonical intervention template.

## CLD Conventions

- **Horizontal layout** when possible; feedback loops naturally form ovals
- **Reinforcing loops** often drawn with circular arrow symbol ↻ in center with "R"
- **Balancing loops** often drawn with "=" or scales symbol with "B"
- **Delays** drawn with double lines on the arrow ═══ or `||`
- **Exogenous variables** (outside the model) drawn without incoming arrows, in a distinct color/shape
- **Stocks** (accumulations) vs **Flows** (rates) — advanced stock-and-flow notation; use when the CLD underdetermines behavior

## Rendering via Art Skill

To render a CLD as an actual diagram:

```bash
# Use Art skill with Mermaid or diagram rendering
Skill("Art", "Mermaid flowchart showing causal loop diagram with R1 and B1 loops, variables: [list], arrows with polarity: [list]")
```

## Common Mistakes

- **Too many variables.** A 20-variable CLD is illegible. Start with 5-7; add only if the loops don't reproduce observed behavior.
- **Correlation drawn as causation.** Every arrow needs a mechanism. "They move together" isn't enough.
- **Missing delays.** Most "surprise" dynamics come from unacknowledged delays. When behavior oscillates or overshoots, look for a delay you didn't mark.
- **Drawing only reinforcing loops.** Real systems always have balancing loops somewhere. If your CLD has none, you've missed something.
- **Static snapshot, not dynamic.** The CLD is a generator of behavior over time, not a state diagram.
- **Confusing event causation with structural causation.** "The deploy caused the outage" is event-level; the CLD should show why the deploy *process* causes outages repeatedly.

## Integration

- Feeds **FindLeverage** — once the CLD is drawn, Meadows' leverage points apply (which variable, arrow, loop, or boundary gives the most leverage).
- Feeds **FindArchetype** — many CLDs match a named archetype; if so, use the canonical intervention.
- Called from **Iceberg** when Layer 3 structure is a feedback loop.
- Renderable via **Art** — Mermaid / diagram output.

## Attribution

Causal Loop Diagrams: Jay Forrester (*Industrial Dynamics*, 1961), Dennis Meadows et al. (*Limits to Growth*, 1972), Peter Senge (*The Fifth Discipline*, 1990). Modern reference: John Sterman, *Business Dynamics* (2000).
