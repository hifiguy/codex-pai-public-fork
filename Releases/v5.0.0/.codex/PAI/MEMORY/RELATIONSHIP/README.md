# RELATIONSHIP

`RELATIONSHIP/` stores the evolving record of how the user and their DA interact — communication patterns, preferences observed over time, agreements made, recurring frictions, and shared context that does not belong in static identity files. The `RelationshipMemory.hook.ts` hook writes here.

Where `USER/` holds declared identity and preferences, `RELATIONSHIP/` holds learned ones. The system uses these notes to adjust tone, anticipate needs, and avoid repeating mistakes the user has already corrected.

Empty in fresh installs. Begins accumulating once the relationship-memory hook fires for the first time. Sensitive by nature; treat it like any other personal data store.
