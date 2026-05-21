# Oscillate Workflow — Aperture Oscillation

## Purpose

Run 3 structured passes over the same question at different scope levels — narrow tactical, wide strategic, and divergence synthesis — to surface design tensions invisible at any single scope.

## Invocation

This workflow is invoked:
1. **Directly** by the user: "use aperture oscillation on this", "oscillate scope on this"
2. **By the Algorithm** during OBSERVE or THINK when ApertureOscillation capability is selected
3. **By other skills** that need scope-coherence analysis before committing to an approach

## Inputs

- **Tactical Target:** The specific thing being built, designed, or decided. The narrow, concrete question.
- **Strategic Context:** The bigger-picture goal, system vision, or purpose the tactical target serves.
- **Current State (optional):** Any existing ISC criteria, approach decisions, or constraints already established.

If invoked without explicit inputs, extract them from the conversation:
- Tactical = the specific ask or task being worked on
- Strategic = the broader goal, system, or vision mentioned in context (AGENTS.md, TELOS, project context)

## Execution

### Step 1: Frame the Inputs

Clearly state both inputs before beginning passes:

```
🔭 APERTURE OSCILLATION
 🎯 Tactical Target: [the specific thing — 1-2 sentences]
 🌐 Strategic Context: [the bigger picture — 1-2 sentences]
```

If the tactical target and strategic context are essentially the same thing (no meaningful scope difference), abort and recommend IterativeDepth instead.

### Step 2: Pass 1 — Narrow Aperture (Tactical-First)

Frame the tactical target as the primary question. The strategic context is mentioned briefly as background but does not drive the analysis.

**Prompt framing:** "We need to build [tactical target]. For context, this lives inside [strategic context]. What should [tactical target] look like?"

Focus on:
- What the component's own logic demands
- Natural shape, patterns, and conventions for this type of thing
- Local constraints, dependencies, and interfaces
- What a good implementation looks like in isolation

```
┌─────────────────────────────────────────────┐
│ 🔬 PASS 1/3 — NARROW APERTURE (Tactical)   │
│                                              │
│ Framing: "[tactical target] is primary.      │
│ [strategic context] is background."          │
│                                              │
│ Component Logic:                             │
│ - [What this thing naturally wants to be]    │
│ - [Local patterns and conventions]           │
│ - [Natural interfaces and boundaries]        │
│                                              │
│ Tactical Findings:                           │
│ - [Finding 1]                                │
│ - [Finding 2]                                │
│ - [Finding 3]                                │
└─────────────────────────────────────────────┘
```

### Step 3: Pass 2 — Wide Aperture (Strategic-First)

Invert the framing. The strategic context is now primary. The tactical target is derived from it.

**Prompt framing:** "We're trying to accomplish [strategic context]. Given that, how should [tactical target] be implemented?"

Focus on:
- What the system needs from this component
- Coherence with adjacent components and overall architecture
- Constraints that the bigger picture imposes
- What gets prioritized differently when the system vision leads

```
┌─────────────────────────────────────────────┐
│ 🔭 PASS 2/3 — WIDE APERTURE (Strategic)    │
│                                              │
│ Framing: "[strategic context] is primary.    │
│ [tactical target] is derived."              │
│                                              │
│ System Requirements:                         │
│ - [What the system needs from this piece]    │
│ - [Coherence constraints]                    │
│ - [Alignment demands]                        │
│                                              │
│ Strategic Findings:                          │
│ - [Finding 1]                                │
│ - [Finding 2]                                │
│ - [Finding 3]                                │
└─────────────────────────────────────────────┘
```

### Step 4: Pass 3 — Oscillation (Synthesis)

Feed the outputs of both passes. Explicitly compare them. Ask: where do the tactical and strategic views diverge? What did each frame reveal that the other missed? What tensions exist?

**Prompt framing:** "Pass 1 said [tactical findings]. Pass 2 said [strategic findings]. Where do these views diverge? What does each miss? What tensions exist between local logic and system coherence?"

Focus on:
- Points of divergence between the two framings
- Tensions between component autonomy and system alignment
- What each pass revealed that the other couldn't see
- Recommended resolution for each tension

```
┌─────────────────────────────────────────────┐
│ ⚡ PASS 3/3 — OSCILLATION (Synthesis)       │
│                                              │
│ Divergences Found:                           │
│ - [Where tactical and strategic disagree]    │
│ - [What narrow aperture missed]              │
│ - [What wide aperture missed]                │
│                                              │
│ Design Tensions:                             │
│ ⚡ [Tension 1: description + resolution]     │
│ ⚡ [Tension 2: description + resolution]     │
│                                              │
│ Alignment Status:                            │
│ [ALIGNED | DIVERGENT — summary]              │
└─────────────────────────────────────────────┘
```

### Step 5: Output

```
🔭 APERTURE OSCILLATION COMPLETE (3 passes)

📊 Results:
- Tactical findings: {count}
- Strategic findings: {count}
- Divergences found: {count}
- Design tensions: {count}
- Alignment: [ALIGNED | DIVERGENT]

⚡ DESIGN TENSIONS:
[Each tension with resolution recommendation]

📋 ISC IMPLICATIONS:
[New criteria, refined criteria, or anti-criteria surfaced by the oscillation]

💡 Key Insight: [The most important thing that single-scope analysis would have missed]
```

## Integration with Algorithm Phases

When the Algorithm selects ApertureOscillation, it runs at one of two integration points:

**During OBSERVE (before ISC):**
```
OBSERVE Phase:
1. Reverse Engineering (standard)
2. Capability Audit
3. >>> APERTURE OSCILLATION (if selected) <<<
   - Takes tactical target from the user's request
   - Takes strategic context from project/TELOS/conversation context
   - Surfaces design tensions before ISC criteria are written
4. ISC CREATION (now informed by scope oscillation)
```

**During THINK (before approach commitment):**
```
THINK Phase:
1. Riskiest Assumptions
2. >>> APERTURE OSCILLATION (if selected) <<<
   - Takes proposed approach as tactical target
   - Takes broader system/project goals as strategic context
   - Validates that the approach serves both local and system needs
3. Approach commitment
```

## Combining with IterativeDepth

ApertureOscillation and IterativeDepth are complementary, not competing:

- **IterativeDepth first** — understand the problem from multiple analytical angles
- **ApertureOscillation second** — validate that the proposed solution serves both local and system needs

At Deep (E4) or Comprehensive (E5) effort, using both in sequence produces the richest requirement set: IterativeDepth discovers the full problem space, ApertureOscillation ensures the solution fits the system.

## Agent Mode (for Algorithm delegation)

When spawning an agent to run ApertureOscillation:

```
CONTEXT: You are performing Aperture Oscillation — examining a question at 
different scope levels to surface design tensions between local component logic 
and system-level coherence.

TACTICAL TARGET: {specific thing being built}
STRATEGIC CONTEXT: {bigger-picture goal or system vision}

TASK: Run 3 passes:
1. NARROW — frame the tactical target as primary, strategic as background
2. WIDE — frame the strategic context as primary, tactical as derived  
3. SYNTHESIS — compare the two framings, identify divergences and tensions

OUTPUT: Design tensions found, alignment status, ISC implications.
SLA: Complete within 45 seconds.
```
