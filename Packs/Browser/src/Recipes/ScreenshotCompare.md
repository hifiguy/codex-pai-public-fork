---
name: Screenshot Compare
description: Take before and after screenshots of a URL for visual comparison
tool: agent-browser
defaults:
  viewport: 1440x900
  wait: 2000
---

# Screenshot Compare

1. Set viewport to {viewport}
2. Open an agent-browser session named `compare-before`
3. Navigate to: {URL}
4. Wait {wait}ms for page to settle
5. Take screenshot: `/tmp/pai-browser/compare/before.png`

6. **Make the change** (user provides instructions via PROMPT)

7. Open a new agent-browser session named `compare-after`
8. Navigate to: {URL}
9. Wait {wait}ms for page to settle
10. Take screenshot: `/tmp/pai-browser/compare/after.png`

11. Present both screenshots side by side for comparison

**Output:**
- Before screenshot path
- After screenshot path
- Summary of visible differences

{PROMPT}
