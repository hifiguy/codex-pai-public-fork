---
name: Remotion
description: "Creates programmatic video with React via Remotion — builds compositions, sequences, and motion graphics rendered to MP4. Uses useCurrentFrame() for all animation (no CSS animations). Integrates PAI_THEME constants from Theme.ts and Art skill aesthetic preferences for visual consistency. Render command: bunx remotion render {composition-id} ~/Downloads/{name}.mp4. Output always to ~/Downloads/ for preview first. Tools: Render.ts (render, list compositions, create projects) and Theme.ts (PAI theme constants derived from Art). USE WHEN: video, animation, motion graphics, video rendering, React video, render video, animate content, make a short, create animations, video overlay, explainer video, animated explainer, content to video, programmatic video. NOT FOR: static images, diagrams, or illustrations (use Art)."
effort: medium
---

## 🚨 MANDATORY: Voice Notification (REQUIRED BEFORE ANY ACTION)

**You MUST send this notification BEFORE doing anything else when this skill is invoked.**

1. **Send voice notification**:
   ```bash
   curl -s -X POST http://localhost:31337/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Running the WORKFLOWNAME workflow in the Remotion skill to ACTION"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification**:
   ```
   Running the **WorkflowName** workflow in the **Remotion** skill to ACTION...
   ```

**This is not optional. Execute this curl command immediately upon skill invocation.**

# Remotion

Create professional videos programmatically with React.

## Customization

**Before executing, check for user customizations at:**
`~/.codex/PAI/USER/SKILLCUSTOMIZATIONS/Remotion/`

## Workflow Routing

| Trigger | Workflow |
|---------|----------|
| "animate this", "create animations for", "video overlay" | `Workflows/ContentToAnimation.md` |
| "generate video", "AI video", "content to video", "make a short" | `Workflows/GeneratedContentVideo.md` |

## Quick Reference

- **Theme:** Always use PAI_THEME from `Tools/Theme.ts`
- **Art Integration:** Load Art preferences before creating content
- **Critical:** NO CSS animations - use `useCurrentFrame()` only
- **Output:** Always to `~/Downloads/` first
- **CLI:** `bunx` always (never `npx`)

**Render command:**
```bash
bunx remotion render {composition-id} ~/Downloads/{name}.mp4
```

## Full Documentation

- **Art integration:** `ArtIntegration.md` - theme constants, color mapping
- **Common patterns:** `Patterns.md` - code examples, presets
- **Critical rules:** `CriticalRules.md` - what NOT to do
- **Detailed reference:** `Tools/Ref-*.md` - 31 pattern files covering core Remotion + Lambda + ElevenLabs captions + AI pipeline

## Tools

| Tool | Purpose |
|------|---------|
| `Tools/Render.ts` | Render, list compositions, create projects |
| `Tools/Theme.ts` | PAI theme constants derived from Art |

## Links

- Remotion Docs: https://remotion.dev/docs
- GitHub: https://github.com/remotion-dev/remotion

## Gotchas

- **React-based video — component patterns differ from web React.** Remotion has specific composition, sequence, and timing APIs.
- **Rendering is CPU-intensive.** Use `run_in_background: true` for render commands.
- **Output goes to ~/Downloads/ first** for preview. Same as images.
- **NOT for static images** — use Art skill for illustrations, diagrams, thumbnails.

## Examples

**Example 1: Create animated explainer**
```
User: "create a video showing how the Algorithm works"
→ Builds React composition with Remotion
→ Defines sequences, animations, timing
→ Renders to MP4 in background
→ Output to ~/Downloads/ for preview
```

## Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"Remotion","workflow":"WORKFLOW_USED","input":"8_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.codex/PAI/MEMORY/SKILLS/execution.jsonl
```

Replace `WORKFLOW_USED` with the workflow executed, `8_WORD_SUMMARY` with a brief input description, and `SECONDS` with approximate wall-clock time. Log `status: "error"` if the workflow failed.
