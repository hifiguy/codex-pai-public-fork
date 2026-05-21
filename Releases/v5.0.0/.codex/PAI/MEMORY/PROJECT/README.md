# PROJECT

`PROJECT/` is the per-project memory store — one subdirectory per project the user works on, holding project-scoped notes, decisions, conventions, and accumulated context that should not pollute the global `MEMORY/` namespace. Skills targeting a specific project read and write here.

This pattern lets PAI carry distinct memory for each codebase or initiative without the user managing project-specific config. Each project subdirectory can grow its own internal structure as needed.

Empty in fresh installs. Populates the first time a project-aware skill records project-specific context. Treat each project subdirectory as that project's working journal.
