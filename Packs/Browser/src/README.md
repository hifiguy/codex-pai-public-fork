# Browser — Browser Automation

**Primary:** `agent-browser` — headless Rust CLI daemon with persistent auth profiles.
**Fallback:** `interceptor` — Chrome extension CLI, zero bot-detection fingerprints. Use when agent-browser is down or site has aggressive bot detection.

| Need | Primary (agent-browser) | Fallback (interceptor) |
|------|------------------------|-----------------|
| **Anonymous** | `agent-browser open URL` | `interceptor open URL` |
| **Auth** | `--profile ~/.agent-browser/profiles/<site>` | Uses Chrome's own profiles |
| **Bot evasion** | Standard headless | Zero CDP fingerprint — passes all checks |

## Quick Start

```bash
# One-shot screenshot
agent-browser open https://example.com && agent-browser screenshot /tmp/shot.png

# Multi-step session
agent-browser --session demo open https://example.com
agent-browser --session demo snapshot
agent-browser --session demo click @e6

# Authenticated session (log in once headed, then headless forever)
agent-browser --profile ~/.agent-browser/profiles/mysite open https://mysite.com
agent-browser snapshot
```

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Full skill documentation |
| `Stories/` | YAML user story definitions for UIReviewer validation |
| `Recipes/` | Parameterized Markdown workflow templates |
| `Workflows/ReviewStories.md` | Fan out stories to parallel UIReviewers |
| `Workflows/Automate.md` | Load and execute recipe templates |
| `Workflows/Update.md` | Verify browser tools are current |

## Related

- [BrowserAgent](~/.codex/agents/BrowserAgent.md) — AI-driven agent-browser automation
- [UIReviewer](~/.codex/agents/UIReviewer.md) — Structured story validation
