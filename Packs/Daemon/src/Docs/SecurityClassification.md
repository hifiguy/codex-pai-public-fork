# Daemon Security Classification

Defines what data is public vs private for daemon aggregation. The aggregator uses this as its allowlist — only explicitly public content passes through.

## Core Principle

**Private by default. Promote known-safe.** Every field must be explicitly classified as public before the aggregator includes it. Unknown data is excluded.

## Source Classification

### ALWAYS PUBLIC (safe to publish verbatim)

| Source | Fields | Notes |
|--------|--------|-------|
| TELOS/BOOKS.md | All titles | Book preferences are public |
| TELOS/MOVIES.md | All titles | Movie preferences are public |
| TELOS/WISDOM.md | All quotes | Philosophical quotes, no PII |
| TELOS/MISSION.md | M1, M2 | Philosophical missions |
| daemon data: predictions | All | Public predictions with confidence |
| daemon data: daily_routine | All | Generic routine, no locations |
| daemon data: podcasts | All | Public preferences |

### PUBLIC WITH FILTERING (safe after security filter applied)

| Source | Public Fields | Filtered Out |
|--------|--------------|-------------|
| TELOS/GOALS.md | Public project goals (G0, G1, G9-G14) | Revenue targets, follower counts, private repos |
| TELOS/MISSION.md | M1, M2 | M3 (references partner) |
| TELOS/CHALLENGES.md | C0-C2 (general self-improvement) | Any referencing private people |
| PRINCIPAL_IDENTITY.md | Role, focus, career, interests, worldview | Partner name, private contacts |
| PROJECTS.md | Public repos and sites only | Private repos, internal tools |
| KNOWLEDGE/Ideas/ | Title + thesis only | Evidence, implications, internal refs |
| MEMORY/WORK/ | Abstracted topic themes | ISA details, task slugs, client info |
| daemon data: preferences | Generic preferences | Internal tooling specifics |
| daemon data: about | Bio text | Private names, internal paths |

### STRUCTURALLY EXCLUDED (aggregator never reads these)

| Source | Reason |
|--------|--------|
| PAI/USER/CONTACTS.md | Contains real names, emails, phones |
| PAI/USER/FINANCES/ | Financial data |
| PAI/USER/HEALTH/ | Health data |
| PAI/USER/TELOS/TRAUMAS.md | Deeply personal |
| PAI/USER/BUSINESS/ | Business confidential |
| MEMORY/KNOWLEDGE/People/ | OSINT dossiers, consent not given |
| MEMORY/KNOWLEDGE/Companies/ | May contain proprietary intel |
| PAI/USER/OUR_STORY.md | Private relationship context |
| PAI/USER/OPINIONS.md | Internal operational opinions |
| Any .env, .key, .pem file | Credentials |

### PROJECTS PUBLIC/PRIVATE CLASSIFICATION

Public projects (include in daemon):
- Website (example.com)
- Fabric (open source, 30K+ stars)
- SecLists (open source, in Kali)
- PAI (public repo)
- (your public products — list here)


- Daemon (daemon.example.com)
- Substrate (public repo)
- Telos (public repo)
- TheAlgorithm (public repo)
- FoundryServices (public repo)
- Ladder (public repo)

Private projects (exclude from daemon):
- (your internal dashboards — list here)
- (your private infrastructure — list here)
- Feed (private infrastructure)
- the DA (private, is the PAI system itself)
- PAI Observatory (internal)
- iMessage Bot (private)
- (your private workers — list here)
- Backups (private)
- NewarkCrimeData (side project, not core)

## Entity Blocklist

These strings must never appear in public output. The SecurityFilter enforces this deterministically.

### Names (from CONTACTS.md + known references)
- (partner references — list in SecurityOverrides.md)
- Angela, Kaleigh, Sasa, Saša
- Jason Haddix, Chad Lynch, Greg Reindel
- Olivia Gallucci, Andrew Ringlein, Bryan Solari
- Chuck Keith, Dave Goldsmith, Maria Ringlein
- Brooks Garrett, Mark Cunningham

### Aliases and Abbreviations
- "B" when used as a person reference (e.g., "B's minds", "me and B")
- "my partner", "my girlfriend" (when followed by identifying context)

### Paths
- /Users/(your-user)/
- ~/.codex/
- ~/Cloud/
- ~/LocalProjects/

### Credentials
- Any string matching: sk-*, ghp_*, CLOUDFLARE_API_TOKEN, OPENAI_API_KEY
- Any string matching: *_API_KEY, *_TOKEN, *_SECRET

### Internal Architecture
- PAI internal system names when used as implementation details
- Hook filenames, tool paths, internal pipeline names
- Pulse port numbers, internal API endpoints

## Customization

Users customize this classification by placing overrides in:


Override format:
```markdown
## Additional Blocked Names
- Name1
- Name2

## Additional Public Projects
- ProjectName

## Additional Excluded Paths
- /path/to/exclude
```
