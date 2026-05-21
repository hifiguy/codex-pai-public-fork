#!/bin/bash
# Unlock keychain for headless access, then start Pulse
# Each installation should replace the password with their own
security unlock-keychain -p "${PULSE_KEYCHAIN_PASSWORD:-changeme}" ~/Library/Keychains/login.keychain-db 2>/dev/null
exec "${HOME}/.bun/bin/bun" run pulse.ts 2>/dev/null || exec /opt/homebrew/bin/bun run pulse.ts
