# BOOKMARKS

`BOOKMARKS/` is where bookmark-pulling skills land their synced state and parsed entries — typically as JSON or Markdown files keyed by source platform. Each platform integration owns its own subdirectory or file convention here.

The system uses bookmarks as a signal of interest: items the user explicitly saved are higher-priority candidates for upgrade analysis, content harvesting, and follow-up workflows.

Empty in fresh installs. Populates the first time you run a bookmark-sync workflow. Re-running a sync is idempotent by design — state files track what has already been seen.
