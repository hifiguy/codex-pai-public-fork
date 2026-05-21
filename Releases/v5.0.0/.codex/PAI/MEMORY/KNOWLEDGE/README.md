# KNOWLEDGE

`KNOWLEDGE/` is the curated knowledge graph — a typed network of notes across entity domains such as People, Companies, Ideas, and Research, with mandatory cross-links between related entries. The `Knowledge` skill manages add, search, and harvest operations against this directory.

Where `MEMORY/` overall is append-mostly raw record, `KNOWLEDGE/` is curated and structured. Entries follow a frontmatter contract, link to one another via wikilinks, and form the system's long-term semantic memory. Harvesters elsewhere in `MEMORY/` propose candidates that get promoted into here only after curation.

Empty in fresh installs. Populates as the user adds notes via the `Knowledge` skill or runs harvest workflows that pull from `LEARNING/`, `RESEARCH/`, and other source layers. Treat structure here as load-bearing — schema changes ripple through every consumer.
