# Bug Bounty Tracker

Intelligent bug bounty program tracking with two-tier detection strategy using GitHub Compare API.

## 🎯 Overview

Automatically tracks new bug bounty programs across HackerOne, Bugcrowd, Intigriti, YesWeHack, and other platforms. Uses a smart two-tier detection system to minimize bandwidth while maximizing discovery speed.

## 🏗️ Architecture

### Two-Tier Detection Strategy

**Tier 1: Fast Detection**
- Checks `domains.txt` commits (500KB vs 10MB+ JSON)
- Zero changes = instant exit (sub-second)
- Changes detected = proceed to Tier 2

**Tier 2: Precise Analysis**
- Uses GitHub Compare API (gets ONLY the diff)
- Extracts new programs and scope changes
- Caches lightweight metadata (1-2KB per program)

### Data Sources

- **Primary**: `arkadiyt/bounty-targets-data` (updates every 30 minutes)
- **Platforms**: HackerOne, Bugcrowd, Intigriti, YesWeHack, Federacy
- **Update frequency**: Check as often as needed without hitting rate limits

## 📦 Installation

```bash
cd ~/.codex/skills/hacking/bug-bounties
bun install
./bounty.sh init
```

## 🚀 Usage

### Initialize (First Time)

```bash
./bounty.sh init
```

Establishes baseline by recording current commit SHAs for all tracked files.

### Update Programs

```bash
./bounty.sh update
```

Checks for:
- 🆕 New programs launched
- 📈 Scope expansions on existing programs
- 💰 VDP → Paid bounty upgrades

### Show Recent Discoveries

```bash
# Last 24 hours (default)
./bounty.sh show

# Last 7 days
./bounty.sh show --last 7d

# Last 48 hours
./bounty.sh show --last 48h

# All cached programs
./bounty.sh show --all
```

### Search Programs

```bash
# Search by name
./bounty.sh search "stripe"

# Search by platform
./bounty.sh search "hackerone"
```

## 📊 Output Examples

### Update Command

```
🔍 Checking for new bug bounty programs...

📊 TIER 1: Fast change detection
🆕 Changes detected! 3 commits since last check

🔬 TIER 2: Detailed analysis of platform changes
  Checking hackerone...
    🔄 2 commits found
  Checking bugcrowd...
    ✓ No changes
  Checking intigriti...
    🔄 1 commits found
  Checking yeswehack...
    ✓ No changes

⏱️  Completed in 2.3s

============================================================
📊 UPDATE SUMMARY
============================================================
🆕 New programs:        3
📈 Scope expansions:    2
💰 Upgraded to paid:    1
✅ Platforms checked:   5
⏱️  Duration:            2.3s
============================================================

🆕 NEW PROGRAMS:

1. [HACKERONE] Example Corp
   URL: https://hackerone.com/example
   Bounty: 💰 Yes
   Max Severity: critical
   Scopes: *.example.com, api.example.com, admin.example.com...
```

### Show Command

```
📋 Bug bounty programs discovered in the last 24h

1. [HACKERONE] Robinhood Markets (new_program)
   URL: https://hackerone.com/robinhood_markets
   Bounty: ❌ VDP only
   Max Severity: 🔴 CRITICAL
   Scopes (8):
     - *.robinhood.com
     - *.robinhood.net
     - *.1integrations.com
     ... and 5 more
   Discovered: 10/20/2025, 10:30:00 PM

2. [BUGCROWD] Acme Corp (upgraded_to_paid)
   URL: https://bugcrowd.com/acme
   Bounty: 💰 Paid
   Max Severity: 🟠 HIGH
   Scopes (3):
     - *.acme.com
     - api.acme.io
   Discovered: 10/20/2025, 6:15:00 PM

Total: 2 program(s)

💡 Tip: Use "initiate-recon <number>" to start testing a program
```

## 🗂️ File Structure

```
bug-bounties/
├── README.md                          # This file
├── package.json                       # Dependencies
├── bounty.sh                          # CLI wrapper
├── state.json                         # Tracking state
├── src/
│   ├── types.ts                       # TypeScript types
│   ├── config.ts                      # Configuration
│   ├── state.ts                       # State management
│   ├── github.ts                      # GitHub API client
│   ├── tracker.ts                     # Main tracker logic
│   ├── init.ts                        # Initialize command
│   ├── update.ts                      # Update command
│   └── show.ts                        # Show/search command
├── cache/
│   ├── programs_metadata.json         # Lightweight program cache
│   └── recent_changes.json            # Last 30 days of changes
└── logs/
    └── discovery.jsonl                # Audit trail
```

## 🎨 Integration with Hacking Skill

This system integrates with the main hacking skill to enable:

1. **Automatic Discovery**: "Update bug bounties" → finds new programs
2. **Quick Browsing**: "Show new bounties from last 24h" → instant results
3. **Automated Recon**: "Initiate recon on #2" → launches pentester agent

## 🔧 Technical Details

### API Usage

- **GitHub API rate limits**: 60/hour (unauth), 5000/hour (auth)
- **Our usage**: ~2-3 calls per update check
- **Check frequency**: Can check every 10-15 minutes without issues

### Caching Strategy

- **Metadata only**: ~1-2KB per program (vs 50-100KB in full JSON)
- **Auto-expiry**: Removes entries >30 days old
- **Total size**: <1MB for hundreds of programs

### Change Detection

Detects three types of changes:
1. **New programs**: Program didn't exist in cache
2. **Scope expansions**: More domains/scopes added
3. **Upgraded to paid**: `offers_bounties: false → true`

## 📝 State File Format

```json
{
  "last_check": "2025-10-20T22:00:00.000Z",
  "tracked_commits": {
    "domains_txt": "abc123...",
    "hackerone": "def456...",
    "bugcrowd": "ghi789...",
    "intigriti": "jkl012...",
    "yeswehack": "mno345..."
  },
  "initialized": true
}
```

## 🎯 Next Steps

After discovering interesting programs, you can:

1. **Review program details**: Check scopes, rules, and severity levels
2. **Initiate reconnaissance**: Launch automated recon workflow
3. **Set up monitoring**: Track changes to specific programs
4. **Start testing**: Begin systematic vulnerability assessment

## 🔗 Resources

- **Data source**: [arkadiyt/bounty-targets-data](https://github.com/arkadiyt/bounty-targets-data)
- **Alternative**: [projectdiscovery/public-bugbounty-programs](https://github.com/projectdiscovery/public-bugbounty-programs)
- **Platforms tracked**:
  - HackerOne: https://hackerone.com
  - Bugcrowd: https://bugcrowd.com
  - Intigriti: https://intigriti.com
  - YesWeHack: https://yeswehack.com

## 🎓 Design Philosophy

This system implements **Option D: Intelligent Two-Tier Hybrid** from the deep thinking analysis:

- **Speed**: Fastest for both "no changes" and "changes detected" cases
- **Efficiency**: Minimal bandwidth and storage
- **Precision**: Exact diffs without downloading full datasets
- **Scalability**: Handles all platforms effortlessly
- **Maintainability**: Clean architecture, easy to debug

---

**Version**: 1.0.0
**Last Updated**: 2025-10-20
**Maintained By**: PAI System
