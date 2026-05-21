# SKILLS

`SKILLS/` holds runtime state owned by individual skills that does not fit neatly into `STATE/` or `DATA/` — skill-specific caches, accumulated user preferences for a given skill, evaluation histories, and per-skill working files. Each skill that needs persistent storage owns a subdirectory here.

Where the `skills/` tree (under `~/.codex/skills/`) is the code and definitions for skills, `MEMORY/SKILLS/` is the lived data those skills accumulate during use.

Empty in fresh installs. Populates as individual skills create their working subdirectories on first run. Inspect a skill's subdirectory to understand what state it is keeping.
