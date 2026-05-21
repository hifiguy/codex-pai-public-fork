# Claude Design Capabilities

Canonical reference for what Claude Design does, its access tiers, and its known limits. Source: the official Anthropic announcement at https://www.anthropic.com/news/codex-design-anthropic-labs (April 17, 2026) and related coverage.

## What It Is

Claude Design is an Anthropic Labs research-preview product accessed at **claude.ai/design**. It is not a CLI tool, plugin, or API. Users interact via natural conversation in a palette UI on claude.ai. Powered by **Claude Opus 4.7**, Anthropic's most capable vision model.

## What It Produces

- Interactive prototypes
- Product wireframes
- Design exploration artifacts
- Pitch decks and slides
- Marketing collateral and one-pagers
- Code-powered prototypes that can incorporate voice, video, shaders, 3D, and built-in AI
- Polished presentations
- Static visuals (not animated — no Lottie/Rive output)

## Accepted Inputs

- Text prompts describing the desired design
- Images and sketches (uploaded files)
- Documents: DOCX, PPTX, XLSX
- Codebase links or uploaded code folders
- Website captures (via claude.ai's built-in web tool)
- Existing designs for modification and iteration
- Brand folders containing logos, fonts, style references

## Export / Output Formats

| Format | Use case |
|--------|----------|
| Internal URL | Share within organization, view/edit permissions |
| Folder | Local file export |
| **Canva** | Collaborative editing, marketing refinement |
| PDF | Client deliverables, print |
| PPTX | Presentation decks |
| Standalone HTML | One-off static pages |
| **ChatGPT Codex handoff bundle** | Production code pipeline — structured for `frontend-design` plugin |
| ZIP | Bundled asset export |

## Key Capabilities

### Design System Extraction During Onboarding

"Claude builds a design system for your team by reading your codebase and design files. Every project after that uses your colors, typography, and components automatically."

- Multiple systems per team (e.g., marketing + dashboard)
- Refinable over time via conversational iteration

### Live Refinement

- Inline comments on specific elements
- Direct text editing in-place
- Adjustment knobs for spacing, color, layout (live, non-destructive)
- Conversational prompts for structural changes

### Organization-Scoped Sharing

- Private by default
- View-only share
- Edit-access share
- Enterprise admin gating

### ChatGPT Codex Handoff

> "Claude packages everything into a handoff bundle that you can pass to ChatGPT Codex with a single instruction."

This is the load-bearing integration point between Claude Design (concept/design) and ChatGPT Codex (production). The `frontend-design` plugin (installed via Anthropic's official plugins marketplace) auto-activates when the bundle lands in ChatGPT Codex.

## Access Tiers

| Tier | Access |
|------|--------|
| **Free / Starter** | No access |
| **Pro** | Included — standard usage limits (insufficient for sustained pro use) |
| **Max** | Included — recommended for daily professional use |
| **Team** | Included |
| **Enterprise** | OFF by default; admins enable in Organization settings. One-time credit (~20 typical prompts) expiring July 17, 2026 |

Claude Design has its own usage quota, separate from claude.ai chat.

## Known Limits (as of launch, April 2026)

- **No real-time multiplayer collaboration** (unlike Figma). Sharing is async via URL.
- **No animation output** — Lottie, Rive, WebGL shaders beyond declarative CSS/JS are not first-class outputs.
- **No precision print output** — professional designers have reported it misses pixel-level constraints for print work.
- **Generic aesthetic without a design system** — if onboarding is skipped, output drifts toward generic defaults.
- **Edge cases require explicit prompting** — responsive breakpoints, contrast ratios, dark-mode behavior all need to be called out.
- **High token burn** — Opus 4.7 powers the generation; heavy use can exhaust Pro-tier limits fast.

## Strategic Context

Mike Krieger (Anthropic CPO, ex-Instagram co-founder) led the product. He resigned from Figma's board three days before launch, and Figma stock fell ~7% on announcement day. The product is widely framed as a direct Figma competitor for early-stage design exploration, though Anthropic positions it as complementary rather than replacement.

## Relationship to `frontend-design` Plugin

These are two separate products that form a pipeline:

| Layer | Product | Surface | Role |
|-------|---------|---------|------|
| Concept + design | **Claude Design** | claude.ai/design | Visual exploration, prototypes, design system |
| Production code | **`frontend-design` plugin** | ChatGPT Codex (auto-activates) | Turns handoff bundles into production-grade code |

The Webdesign skill orchestrates both.
