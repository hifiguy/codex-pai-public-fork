# AUTO

`AUTO/` collects outputs from automated, unattended workflows — scheduled jobs, cron-driven scans, periodic syncs, and any agent that runs without an interactive session. Where `WORK/` corresponds to user-initiated Algorithm runs, `AUTO/` corresponds to background runs.

Files here are typically timestamped reports, scan results, and digest artifacts. The user reads them on their own schedule rather than at execution time.

Empty in fresh installs. Populates the first time a scheduled or background workflow completes. Older entries can be archived or pruned without affecting live behavior.
