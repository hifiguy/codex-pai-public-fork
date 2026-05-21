# DATA

`DATA/` holds structured datasets that the system queries, analyzes, or reports on — economic indicators, public-data snapshots, custom JSON corpora, and similar tabular or document collections. Skills that pull from external data APIs land their canonical local copies here.

Where `RAW/` is unstructured source material, `DATA/` is curated, schema-stable data ready for query and analysis. Think of it as the system's local data warehouse.

Empty in fresh installs. Populates when you run any skill that maintains a local dataset. Schema discipline matters here — keep files versioned and document their shape.
