---
name: ArXiv
description: "Search and retrieve arXiv academic papers by topic, category, or paper ID — with AlphaXiv-enriched AI-generated overviews. Uses arXiv Atom API (no auth) for discovery and search across cs.AI, cs.LG, cs.CL (NLP/LLMs), cs.CR (security), cs.MA (multi-agent), cs.SE, and cs.IR. Supports title (ti:), abstract (abs:), author (au:), and category (cat:) search fields with boolean operators (AND, OR, ANDNOT); sorts by lastUpdatedDate or relevance; paginates up to 2,000 results per call with 3s rate limit between calls. USE WHEN: arxiv, papers, latest papers, research papers, new papers, what's new in AI research, recent ML papers, paper lookup, arxiv search, find paper by ID, summarize paper, latest NLP research, latest LLM papers, multi-agent papers, cs. NOT FOR: general web research (use Research), extracting content from arbitrary URLs (use Parser), or cybersecurity annual report analysis (use."
effort: low
---

## Customization

**Before executing, check for user customizations at:**
`~/.codex/PAI/USER/SKILLCUSTOMIZATIONS/ArXiv/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

# ArXiv

Search arXiv for latest papers by topic or category. Uses arXiv's Atom API for search/discovery and AlphaXiv's markdown endpoint for enriched paper overviews. No API keys needed.

## Workflow Routing

| Trigger | Workflow |
|---------|----------|
| "latest papers in X", "new papers on X", "what's new in AI research" | `Workflows/Latest.md` |
| "search arxiv for X", "find papers about X", "arxiv papers on X" | `Workflows/Search.md` |
| arxiv URL, paper ID like `2401.12345`, "explain this paper" | `Workflows/Paper.md` |

## Quick Reference

**arXiv API** (no auth):
- Base: `https://export.arxiv.org/api/query`
- Search fields: `ti:` (title), `au:` (author), `abs:` (abstract), `cat:` (category), `all:` (everything)
- Booleans: `AND`, `OR`, `ANDNOT`
- Sort: `sortBy=lastUpdatedDate&sortOrder=descending` for latest
- Pagination: `start=0&max_results=10` (max 2000 per call)
- Rate limit: 3s between calls

**AlphaXiv enrichment** (no auth):
- Overview: `curl -s "https://alphaxiv.org/overview/{PAPER_ID}.md"`
- Full text: `curl -s "https://alphaxiv.org/abs/{PAPER_ID}.md"` (fallback)
- Not all papers have overviews — 404 means analysis not yet generated

**Key categories for our work:**
- `cs.AI` — Artificial Intelligence
- `cs.LG` — Machine Learning
- `cs.CL` — Computation and Language (NLP/LLMs)
- `cs.CR` — Cryptography and Security
- `cs.SE` — Software Engineering
- `cs.MA` — Multi-Agent Systems
- `cs.IR` — Information Retrieval

## Gotchas

- arXiv API **requires HTTPS** and `-L` (follows redirects). HTTP 301s to HTTPS silently.
- arXiv API returns Atom XML, not JSON. Parse with text processing, not `jq`.
- `lastUpdatedDate` includes edits to old papers. For truly new submissions, check `<published>` dates.
- AlphaXiv overviews are AI-generated summaries. Great for quick understanding, but verify claims against the actual paper for anything you'd cite.
- arXiv API rate limit is 3 seconds between calls. Batch your queries.
- `max_results` caps at 2000. For broader sweeps, paginate with `start`.
- Category search (`cat:cs.AI`) returns papers with that as primary OR cross-listed category.

## Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"ArXiv","workflow":"WORKFLOW_USED","input":"8_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.codex/PAI/MEMORY/SKILLS/execution.jsonl
```
