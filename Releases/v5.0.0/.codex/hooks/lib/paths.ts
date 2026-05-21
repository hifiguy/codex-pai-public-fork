/**
 * Centralized Path Resolution
 *
 * Two root directories:
 * - PAI_DIR (~/.codex/PAI) — PAI data: MEMORY, Algorithm, Tools, USER
 * - Codex home (~/.codex) — ChatGPT Codex: settings, skills, hooks, commands, agents
 *
 * Usage:
 *   import { getPaiDir, getCodexDir, paiPath } from '';
 */

import { homedir } from 'os';
import { join } from 'path';

/**
 * Expand shell variables in a path string
 * Supports: $HOME, ${HOME}, ~
 */
export function expandPath(path: string): string {
  const home = homedir();

  return path
    .replace(/^\$HOME(?=\/|$)/, home)
    .replace(/^\$\{HOME\}(?=\/|$)/, home)
    .replace(/^~(?=\/|$)/, home);
}

/**
 * Get the PAI data directory (expanded)
 * Priority: PAI_DIR env var (expanded) → ~/.codex/PAI
 */
export function getPaiDir(): string {
  const envPaiDir = process.env.PAI_DIR;

  if (envPaiDir) {
    return expandPath(envPaiDir);
  }

  return join(homedir(), '.codex', 'PAI');
}

/**
 * Get the ChatGPT Codex home directory (~/.codex)
 */
export function getCodexDir(): string {
  return join(homedir(), '.codex');
}

/**
 * Get the settings.json path (lives in Codex home)
 */
export function getSettingsPath(): string {
  return join(getCodexDir(), 'settings.json');
}

/**
 * Get the authoritative .env path (~/.codex/.env).
 * All credentials live here; PAI/.env is deprecated.
 */
export function getEnvPath(): string {
  return join(getCodexDir(), '.env');
}

/**
 * Get a path relative to PAI_DIR
 */
export function paiPath(...segments: string[]): string {
  return join(getPaiDir(), ...segments);
}

/**
 * Get the hooks directory (lives in Codex home)
 */
export function getHooksDir(): string {
  return join(getCodexDir(), 'hooks');
}

/**
 * Get the skills directory (lives in Codex home)
 */
export function getSkillsDir(): string {
  return join(getCodexDir(), 'skills');
}

/**
 * Get the MEMORY directory
 */
export function getMemoryDir(): string {
  return paiPath('MEMORY');
}
