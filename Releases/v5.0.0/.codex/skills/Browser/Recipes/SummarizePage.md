---
name: Summarize Page
description: Navigate to a URL and extract a summary of the page content
tool: BrowserAgent
defaults:
  format: markdown
---

# Summarize Page

1. Open an agent-browser session
2. Navigate to: {URL}
3. Run `agent-browser snapshot` to get page content
4. Extract the main content area (ignore navigation, headers, footers)
5. Summarize in {format} format

**Output requirements:**
- Title of the page
- Main content summary (3-5 bullet points)
- Key links or calls to action found
- Word count estimate of main content

{PROMPT}
