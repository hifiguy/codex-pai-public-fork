# llcli Quick Start

**The 30-second guide to using llcli**

## Installation

Already done! Located at: `~/.codex/Bin/llcli/`

## Usage

```bash
# Get help
~/.codex/Bin/llcli/llcli.ts --help

# Today's recordings
~/.codex/Bin/llcli/llcli.ts today

# Specific date
~/.codex/Bin/llcli/llcli.ts date 2025-11-17

# Search
~/.codex/Bin/llcli/llcli.ts search "consulting"

# With custom limit
~/.codex/Bin/llcli/llcli.ts today --limit 50
```

## Piping to jq

```bash
# Just titles
~/.codex/Bin/llcli/llcli.ts today | jq -r '.data.lifelogs[].title'

# Count recordings
~/.codex/Bin/llcli/llcli.ts date 2025-11-17 | jq '.data.lifelogs | length'

# Long recordings (>30 min)
~/.codex/Bin/llcli/llcli.ts today | jq '.data.lifelogs[] | select(
  ((.endTime | fromdateiso8601) - (.startTime | fromdateiso8601)) > 1800
)'
```

## Configuration

API key already configured in `~/.codex/.env`:
```bash
LIMITLESS_API_KEY=your_key
```

## Full Documentation

See: `~/.codex/Bin/llcli/README.md`
