# PrivateInvestigator — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the PrivateInvestigator skill from the PAI v5.0.0 release.

Ethical people-finding and identity verification using 15 parallel research agents (5 types x 3 each = 45 concurrent search threads) across people search aggregators, social media, public records, and reverse lookups. Covers TruePeopleSearch, FastPeopleSearch, Spokeo, voter registration, county property records, court portals (PACER, CourtListener), professional licenses, Facebook/LinkedIn/Instagram x-ray searches, and username enumeration (Sherlock, WhatsMyName). Phone reverse lookup via CallerID, NumLookup, carrier lookup. Email reverse lookup via Epieos, Holehe, Hunter.io. Image reverse search via PimEyes, TinEye, Google/Yandex Images. Google dorking (site:linkedin.com, filetype:pdf resume) across foundation, primary, deep, and verification tiers. Produces confidence-scored results (HIGH/MEDIUM/LOW/POSSIBLE) requiring 3+ matching identifiers before acting. Workflows: FindPerson, SocialMediaSearch, PublicRecordsSearch, ReverseLookup, VerifyIdentity. Stops immediately if purpose shifts toward harassment or stalking.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/PrivateInvestigator"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING PrivateInvestigator skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing PrivateInvestigator skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `PrivateInvestigator` into `~/.codex/skills/PrivateInvestigator/`? (yes/no)"
2. If existing skill found: "Back up the existing `PrivateInvestigator` to `~/.codex/skills/PrivateInvestigator.backup-{timestamp}/` first? (yes/no — recommend yes)"

---

## Phase 3: Backup (only if existing)

```bash
if [ -d "$SKILL_DIR" ]; then
  BACKUP="$SKILL_DIR.backup-$(date +%Y%m%d-%H%M%S)"
  mv "$SKILL_DIR" "$BACKUP"
  echo "Backed up to $BACKUP"
fi
```

---

## Phase 4: Install

```bash
mkdir -p "$ENGINE_DIR/skills"
cp -R src/ "$SKILL_DIR/"
echo "Installed to $SKILL_DIR"
```

---

## Phase 5: Verify

Run the file and functional checks in [VERIFY.md](VERIFY.md). Confirm to the user when all checks pass.
