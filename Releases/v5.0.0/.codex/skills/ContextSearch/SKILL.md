---
name: ContextSearch
description: "2-phase context search across the PAI session registry, work directories, and ISAs for instant cold-start recovery. Phase 1 (always): parallel scan of work.json session registry, session-names.json, MEMORY/WORK/ directory names, and ISA title grep — returns 5 most recent matches per source, loads top-3 ISA summaries (first 10 lines only). Phase 2 (only if Phase 1 returns fewer than 3 matches): PAI git history + current project git history. Output: compact context block under 40 lines with session slugs, phases, progress, and ISA paths. USE WHEN: context search, prior work, browse sessions, recall, remember, previous sessions, context recovery, what did we do, find session, search history, what was that project, pick up where we left off, continue work, resume, look up old work, find previous session, cold start, what were we building. NOT FOR: searching published content (use _CONTENTSEARCH), the Knowledge Archive (use Knowledge), or people/company investigation."
argument-hint: [topic]
effort: low
---

# ContextSearch

Search prior work for: **$ARGUMENTS**

## Usage Modes

1. **Standalone** — Search, present findings, say: "Context loaded on [topic]. Most recent session: [X]. What would you like to do?"
2. **Paired with request** — Search first, then execute the request informed by context.

---

## Phase 1 — Fast Index Scan (ALL IN PARALLEL)

Run all four searches simultaneously in a single response:

**1A. Session Registry**
Read `~/.codex/PAI/MEMORY/STATE/work.json`. Match entries where `task`, slug (object key), or `sessionName` contains "$ARGUMENTS" (case-insensitive). Extract: task, phase, progress, effort. Limit to **5 most recent** matches.

**1B. Session Names**
Read `~/.codex/PAI/MEMORY/STATE/session-names.json`. Match entries where name contains "$ARGUMENTS" (case-insensitive). Extract: sessionId, name. Limit to **5 most recent**.

**1C. Work Directory Names**
```bash
fd -t d -i "$ARGUMENTS" ~/.codex/PAI/MEMORY/WORK/ --max-depth 1 | tail -10
```

**1D. ISA Title Grep**
Use Grep to search for "$ARGUMENTS" across `~/.codex/PAI/MEMORY/WORK/` with glob `**/ISA.md`. Use `files_with_matches` mode. Limit to **5 results**.

---

## Phase 2 — Conditional Deep Dive

**SKIP Phase 2 entirely if Phase 1 returned 3+ matches.** Phase 1 is usually sufficient.

Only if Phase 1 returned fewer than 3 total matches, run in parallel:

**2A. PAI Git History**
```bash
git -C ~/.codex log --oneline --all --grep="$ARGUMENTS" -i -10
```

**2B. Current Project Git History**
```bash
git log --oneline --all --grep="$ARGUMENTS" -i -10
```

---

## After Search: Load ISA Summaries (NOT full ISAs)

From Phase 1C/1D matches, identify the **3 most recent ISAs** (by directory date prefix). Read only the **first 10 lines** of each (title + summary). Do NOT read full ISAs — the main agent can request a full read if needed.

---

## Output Format

Compact single list. Omit sections with no results. **Keep total output under 40 lines.**

```
═══ CONTEXT: $ARGUMENTS ═══════════════════════

📋 SESSIONS (newest first, max 5):
  - [slug] — [task] | [phase] | [progress]

📂 ISA SUMMARIES (max 3):
  - [dir name]: [first heading from ISA]
    Path: ~/.codex/PAI/MEMORY/WORK/[dir]/ISA.md

🔗 COMMITS (if Phase 2 ran):
  - [hash] [message] ([repo])

════════════════════════════════════════════════
```

---

## After Results

**Standalone:** "Context loaded on [topic]. Most recent: [X]. What would you like to do?"

**Paired:** Proceed with the request. If deeper context is needed, Read the specific ISA path shown above.

## Gotchas

- **Searches PAI session registry, work directories, and ISAs** — not published content (use _CONTENTSEARCH for that).
- **Phase 1 (fast scan) may miss relevant sessions.** If results seem incomplete, use phase 2 (full search).
- **Session descriptions in work.json are AI-generated summaries.** They may not capture every topic discussed.

## Examples

**Example 1: Find prior work**
```
User: "what did we do with the Telegram bot?"
→ Phase 1: fast scan of session registry
→ Finds sessions: telegram-monitor-revival, fix-telegram-channels-plugin-broken
→ Returns session summaries with ISA links
```

**Example 2: Resume previous work**
```
User: "pick up where we left off on the feed system"
→ Searches work directories and ISAs
→ Finds latest ISA with phase/progress state
→ Provides context for cold-start recovery
```

## Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"ContextSearch","workflow":"WORKFLOW_USED","input":"8_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.codex/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `8_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
