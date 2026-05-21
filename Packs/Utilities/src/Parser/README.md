# System Parser

Universal content parser for {YOUR_BUSINESS_NAME} newsletter database. Extracts deterministic JSON from any content type (YouTube videos, articles, PDFs, newsletters, Twitter threads) with comprehensive metadata including people, companies, links, topics, sources, and analysis.

## Features

- **Universal Schema**: Single deterministic JSON structure for all content types
- **Multi-Format Support**: YouTube, articles, PDFs, newsletters, Twitter threads, generic web pages
- **Entity Extraction**: Comprehensive people and company extraction with context
- **Topic Classification**: Multi-level categorization, tags, keywords, themes
- **Link Analysis**: All links with context and classification
- **High-Quality Summaries**: Short, medium, and long summaries for every piece of content
- **Confidence Scoring**: Quality assessment for every extraction
- **Batch Processing**: Process multiple URLs at once

## Quick Start

```bash
# Parse a single URL
bun run lib/parser.ts https://example.com/article

# Parse multiple URLs (batch mode)
bun run lib/parser.ts https://url1.com https://url2.com https://url3.com
```

## Directory Structure

```
parser/
├── SKILL.md                      # Skill definition and routing
├── README.md                     # This file
├── schema/
│   ├── content-schema.json       # Canonical JSON schema
│   └── schema.ts                 # TypeScript types
├── Workflows/
│   ├── parse-content.md          # Main orchestration workflow
│   ├── detect-content-type.md    # Content type detection logic
│   └── extract/                  # Specialized extractors
│       ├── youtube.md
│       ├── article.md
│       ├── pdf.md
│       ├── newsletter.md
│       └── twitter.md
├── prompts/
│   ├── entity-extraction.md      # Gemini prompt for people/companies
│   ├── summarization.md          # Multi-level summary generation
│   ├── topic-classification.md   # Categorization and tagging
│   └── link-analysis.md          # Link context and relevance
├── lib/
│   ├── parser.ts                 # Main parser script
│   └── validators.ts             # Schema validation utilities
└── tests/
    └── fixtures/                 # Test inputs and expected outputs
```

## Schema Overview

The canonical schema has 9 major sections:

1. **content**: Core content data (title, summaries, full text, metadata)
2. **people**: Extracted people with roles, affiliations, social handles
3. **companies**: Mentioned companies with context and sentiment
4. **topics**: Categories, tags, keywords, themes, newsletter sections
5. **links**: All URLs with context, type, and position
6. **sources**: Original sources and citations
7. **newsletter_metadata**: Newsletter-specific fields (section, scheduling, notes)
8. **analysis**: Sentiment, scores, insights, trending potential
9. **extraction_metadata**: Processing info, confidence, warnings

**Schema Invariants:**
- All fields always present (null/empty for missing data)
- Deterministic structure regardless of content type
- ISO 8601 dates throughout
- Confidence scores for uncertain extractions
- Version field for schema evolution

## Supported Content Types

| Type | Detection | Extraction Method |
|------|-----------|-------------------|
| YouTube Videos | Domain: youtube.com, youtu.be | Fabric transcript + metadata scraping |
| Web Articles | Generic HTML | Gemini Researcher full scraping |
| PDF Documents | Extension: .pdf, arxiv.org | Text extraction + Gemini analysis |
| Newsletters | Substack, Beehiiv, etc. | HTML parsing + section extraction |
| Twitter Threads | Domain: twitter.com, x.com | Thread reconstruction + analysis |
| Generic Pages | Fallback | Metadata extraction + Gemini |

## Processing Pipeline

1. **Input Validation**: Check URL accessibility and format
2. **Content Type Detection**: Auto-detect based on domain/extension/headers
3. **Specialized Extraction**: Route to appropriate extractor
4. **Gemini Analysis**: Entity extraction, summarization, topic classification
5. **Schema Population**: Fill all fields with extracted data
6. **Validation**: Verify against JSON schema
7. **Output Generation**: Write pretty-printed JSON file

## Configuration

### Environment Variables

None required currently. Future integrations may need:
- `GEMINI_API_KEY`: For Gemini API access
- `FABRIC_PATH`: Path to Fabric installation

### Schema Version

Current version: **1.0.0**

Tracked in `extraction_metadata.version` field.

## Usage Examples

### Single Article
```bash
bun run lib/parser.ts https://anthropic.com/news/codex-3

# Output:
# ✅ Parsed: Claude 3 Model Family Announcement
# 📄 Output: 20251114-153045_claude-3-announcement.json
# 📊 Stats: 2,500 words, 5 people, 3 companies, 12 links
# 🎯 Confidence: 0.92
```

### YouTube Video
```bash
bun run lib/parser.ts https://youtube.com/watch?v=abc123

# Output:
# ✅ Parsed: AI Safety Interview with Anthropic CEO
# 📄 Output: 20251114-153120_ai-safety-interview.json
# 📊 Stats: 8,000 words (transcript), 3 people, 5 companies, 7 links
# 🎯 Confidence: 0.88
```

### Batch Processing
```bash
bun run lib/parser.ts \
  https://arxiv.org/pdf/2401.12345 \
  https://twitter.com/user/status/123 \
  https://newsletter.substack.com/p/issue-42

# Output:
# 📊 Batch Processing Complete
# ✅ Successful: 3/3
# Output files:
# - 20251114-153215_attention-all-you-need.json (PDF)
# - 20251114-153340_ai-breakthrough-thread.json (Twitter)
# - 20251114-153425_weekly-ai-news.json (Newsletter)
```

## Development

### Running Tests
```bash
bun test
```

### Validation
```typescript
import { validateContentSchema } from "./lib/validators.ts";
import schema from "./output.json";

const result = validateContentSchema(schema);
if (!result.valid) {
  console.error("Validation errors:", result.errors);
}
console.log("Warnings:", result.warnings);
```

### TypeScript Types
```typescript
import type { ContentSchema, Person, Company } from "./schema/schema.ts";

const schema: ContentSchema = {
  // ... fully typed schema object
};
```

## Error Handling

The parser handles errors gracefully:

- **Network errors**: Retry with exponential backoff
- **Paywall content**: Extract preview, lower confidence
- **403/401 errors**: Try archive.org fallback
- **Parsing errors**: Populate partial data, flag in warnings
- **Unsupported content**: Default to generic extraction

**Never fails completely** - always outputs valid JSON with whatever data could be extracted.

## Integration

### With Newsletter Workflow

Parsed JSON can be imported directly into newsletter database:

```bash
# Parse URL
bun run lib/parser.ts https://example.com/article

# Import to database (future feature)
bun run import-to-database.ts output.json
```

### With Gemini Researcher

The parser uses the `GeminiResearcher` agent for heavy lifting:

```bash
# Launched via Codex subagent tooling
spawn_agent(
  agent_type: "GeminiResearcher",
  prompt: "Extract entities from: [content]"
)
```

## Roadmap

- [ ] Implement actual Gemini integration
- [ ] Implement Fabric integration for YouTube
- [ ] Add PDF extraction (PyPDF2, pdftotext)
- [ ] Add Twitter scraping (Bright Data MCP)
- [ ] Database import utilities
- [ ] Multi-item mode for newsletters
- [ ] Deduplication detection
- [ ] Related content linking

## License

Private - Part of PAI infrastructure
