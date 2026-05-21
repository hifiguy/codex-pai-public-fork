# Council Members

Council members are ALWAYS custom-composed agents created via the Agents skill's ComposeAgent tool. They are NEVER built-in agent types.

## CRITICAL: No Built-In Agent Types

**NEVER use built-in agent types (Architect, Designer, Engineer, PerplexityResearcher, Silas, etc.) for council members.** Built-in types are generic — they have no knowledge of the debate topic and produce shallow, generic perspectives.

Council members MUST be composed using ComposeAgent with topic-specific traits so they have:
- Unique personalities and voices matched to the debate
- Domain expertise relevant to the specific topic
- Distinct analytical approaches that create genuine friction

## How to Create Council Members

### Step 1: Analyze the Topic

Before composing agents, determine what perspectives would create the most productive friction for THIS specific debate. Don't use generic roles — design roles around the topic.

**Example — "Should we use WebSockets or SSE?"**
- Agent 1: Real-time systems architect (traits: `technical,analytical,systematic`)
- Agent 2: Frontend DX advocate (traits: `ux,enthusiastic,pragmatic`)
- Agent 3: Ops/reliability skeptic (traits: `technical,skeptical,cautious`)
- Agent 4: Industry researcher (traits: `research,comparative,thorough`)

**Example — "Is AI overhyped?"**
- Agent 1: AI infrastructure builder (traits: `technical,enthusiastic,systematic`)
- Agent 2: Security practitioner skeptic (traits: `security,skeptical,meticulous`)
- Agent 3: Pragmatic engineer (traits: `technical,pragmatic,analytical`)
- Agent 4: Evidence-based researcher (traits: `research,analytical,comparative`)

### Step 2: Compose Each Agent via ComposeAgent

```bash
bun run ~/.codex/skills/Agents/Tools/ComposeAgent.ts \
  --traits "technical,analytical,systematic" \
  --task "Debate: Should we use WebSockets or SSE?" \
  --output json
```

Each call returns: name, voice, voice_id, color, traits, and a full prompt with unique personality.

### Step 3: Launch with general-purpose

**ALWAYS use `agent_type: "general-purpose"` — NEVER use static types.**

```typescript
spawn_agent({
  description: "Council member 1 - systems architect",
  prompt: <composedAgentPrompt + round instructions + topic context>,
  agent_type: "general-purpose",
  model: "sonnet"
})
```

## Default Perspective Slots

When the user doesn't specify council members, compose 4 agents covering these perspective types (but with topic-specific traits):

| Slot | Purpose | Example Trait Combos |
|------|---------|---------------------|
| **Builder** | Has built things in this domain | `technical,enthusiastic,systematic` |
| **Skeptic** | Challenges assumptions, finds flaws | `[domain],skeptical,meticulous` |
| **Pragmatist** | Implementation reality, trade-offs | `technical,pragmatic,analytical` |
| **Analyst** | Data, precedent, external evidence | `research,analytical,comparative` |

The specific traits should be tailored to the topic, not generic.

## Anti-Patterns

| Scenario | WRONG | RIGHT |
|----------|-------|-------|
| Any council debate | `spawn_agent(agent_type="Architect")` | ComposeAgent → `spawn_agent(agent_type="general-purpose")` |
| Security topic | `spawn_agent(agent_type="Silas")` | ComposeAgent with `security,adversarial,bold` traits |
| Design question | `spawn_agent(agent_type="Designer")` | ComposeAgent with `ux,enthusiastic,exploratory` traits |
| Research needed | `spawn_agent(agent_type="PerplexityResearcher")` | ComposeAgent with `research,thorough,comparative` traits |
