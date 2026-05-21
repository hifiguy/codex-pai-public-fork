# RAW

`RAW/` stores unprocessed source material captured by the system before any parsing, classification, or summarization — raw HTML pulls, full API responses, transcript dumps, podcast audio metadata, original feed payloads, and similar inputs. Parsers and harvesters read from `RAW/` and write structured output elsewhere.

Keeping the raw form lets the system re-parse with improved logic later without re-fetching, and lets the user inspect the original data when a downstream artifact looks wrong.

Empty in fresh installs. Populates when any ingestion workflow runs (feed pulls, transcript captures, scrapes). Files can be large — periodic cleanup of items already processed downstream is reasonable.
