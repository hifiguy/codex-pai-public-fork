---
name: PrivateInvestigator
pack-id: pai-privateinvestigator-v1.0.0
version: 1.0.0
author: danielmiessler
description: Ethical people-finding and identity verification using 15 parallel research agents (5 types x 3 each = 45 concurrent search threads) across people search aggregators, social media, public records, and reverse lookups. Covers TruePeopleSearch, FastPeopleSearch, Spokeo, voter registration, county property records, court portals (PACER, CourtListener), professional licenses, Facebook/LinkedIn/Instagram x-ray searches, and username enumeration (Sherlock, WhatsMyName). Phone reverse lookup via CallerID, NumLookup, carrier lookup. Email reverse lookup via Epieos, Holehe, Hunter.io. Image reverse search via PimEyes, TinEye, Google/Yandex Images. Google dorking (site:linkedin.com, filetype:pdf resume) across foundation, primary, deep, and verification tiers. Produces confidence-scored results (HIGH/MEDIUM/LOW/POSSIBLE) requiring 3+ matching identifiers before acting. Workflows: FindPerson, SocialMediaSearch, PublicRecordsSearch, ReverseLookup, VerifyIdentity. Stops immediately if purpose shifts toward harassment or stalking.
type: skill
platform: codex
source: PAI v5.0.0
---

# PrivateInvestigator

Ethical people-finding and identity verification using 15 parallel research agents (5 types x 3 each = 45 concurrent search threads) across people search aggregators, social media, public records, and reverse lookups. Covers TruePeopleSearch, FastPeopleSearch, Spokeo, voter registration, county property records, court portals (PACER, CourtListener), professional licenses, Facebook/LinkedIn/Instagram x-ray searches, and username enumeration (Sherlock, WhatsMyName). Phone reverse lookup via CallerID, NumLookup, carrier lookup. Email reverse lookup via Epieos, Holehe, Hunter.io. Image reverse search via PimEyes, TinEye, Google/Yandex Images. Google dorking (site:linkedin.com, filetype:pdf resume) across foundation, primary, deep, and verification tiers. Produces confidence-scored results (HIGH/MEDIUM/LOW/POSSIBLE) requiring 3+ matching identifiers before acting. Workflows: FindPerson, SocialMediaSearch, PublicRecordsSearch, ReverseLookup, VerifyIdentity. Stops immediately if purpose shifts toward harassment or stalking.

## Installation

This pack is designed for AI-assisted installation. Point your AI at this directory and ask it to install using `INSTALL.md`.

```
"Install the PrivateInvestigator pack from PAI/Packs/PrivateInvestigator/"
```

Your AI walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

## What's Included

```
  SKILL.md
  Workflows
```

The full skill source lives under `src/`. Read `src/SKILL.md` for detailed capabilities, workflows, and usage.

## Source

Built from the PAI v5.0.0 release skill at `Releases/v5.0.0/.codex/skills/PrivateInvestigator/`.

## License

MIT — see [PAI LICENSE](../../LICENSE).
