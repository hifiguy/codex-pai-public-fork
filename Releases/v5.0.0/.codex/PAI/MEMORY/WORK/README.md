# WORK

`WORK/` holds one subdirectory per Algorithm run, named with a slug of the form `YYYYMMDD-HHMMSS_kebab-task-summary`. Inside each slug live the artifacts that session produced: the canonical `ISA.md` (Ideal State Artifact), any `PRD.md`, intermediate notes, generated outputs, and tool-specific event files such as `forge-events.jsonl` or `forge-final.txt`.

This is the operating record of every non-trivial task. The `ISASync` hook writes the ISA here, agent helpers stream their JSONL events here, and follow-up sessions resume by reading the slug directory of the prior run.

Empty in fresh installs. Populated automatically the first time you trigger Algorithm mode or any subagent that scopes its output by slug. Old slugs are safe to archive but should not be deleted while their work is still being referenced.
