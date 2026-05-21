# MEMORY

`MEMORY/` is the persistent state layer of PAI — the place where every session, learning, observation, and artifact accumulates over time. Where `KNOWLEDGE/` is curated and `USER/` is identity, `MEMORY/` is the lived record of what the system has actually done. It is segmented into typed subdirectories (WORK, LEARNING, OBSERVABILITY, RESEARCH, and so on) so each kind of artifact has a predictable home.

In a fresh PAI install this tree is empty by design. No personal data, no prior sessions, no historical bookmarks ship with the system. Each subdirectory contains only a `README.md` describing what belongs there. Content gets created automatically as you use PAI normally — running the Algorithm spawns ISAs in `WORK/`, hooks emit events to `OBSERVABILITY/`, the satisfaction-capture and learning hooks write to `LEARNING/`, and so on.

Treat `MEMORY/` as append-mostly. It is the substrate from which `KNOWLEDGE/` is harvested and the source of compounding context across sessions. If you are ever unsure where an artifact belongs, read the subdirectory READMEs — the taxonomy is intentional.
