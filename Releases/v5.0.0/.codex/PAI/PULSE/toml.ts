/**
 * Minimal TOML parser for PAI Pulse configuration files.
 *
 * PULSE.toml uses a small TOML subset: sections, arrays of tables, strings,
 * booleans, numbers, and arrays of scalar values. Keeping this local avoids a
 * runtime package dependency for the daemon/CLI layer.
 */

type TomlObject = Record<string, unknown>;

function stripComment(line: string): string {
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === "\\" && inDouble) {
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === "#" && !inSingle && !inDouble) return line.slice(0, i).trim();
  }

  return line.trim();
}

function splitArrayItems(value: string): string[] {
  const items: string[] = [];
  let current = "";
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (let i = 0; i < value.length; i++) {
    const ch = value[i];

    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }
    if (ch === "\\" && inDouble) {
      current += ch;
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;

    if (ch === "," && !inSingle && !inDouble) {
      items.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }

  if (current.trim()) items.push(current.trim());
  return items;
}

function parseScalar(value: string): unknown {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^[+-]?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return splitArrayItems(inner).map(parseScalar);
  }

  return trimmed;
}

function bracketsBalanced(value: string): boolean {
  let inSingle = false;
  let inDouble = false;
  let escaped = false;
  let depth = 0;

  for (let i = 0; i < value.length; i++) {
    const ch = value[i];

    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === "\\" && inDouble) {
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (!inSingle && !inDouble) {
      if (ch === "[") depth++;
      else if (ch === "]") depth--;
    }
  }

  return depth <= 0;
}

function logicalLines(content: string): string[] {
  const lines: string[] = [];
  let pending = "";

  for (const rawLine of content.split("\n")) {
    const line = stripComment(rawLine);
    if (!line) continue;

    if (pending) {
      pending += ` ${line}`;
      const value = pending.slice(pending.indexOf("=") + 1).trim();
      if (bracketsBalanced(value)) {
        lines.push(pending);
        pending = "";
      }
      continue;
    }

    const eqIndex = line.indexOf("=");
    if (eqIndex !== -1) {
      const value = line.slice(eqIndex + 1).trim();
      if (value.startsWith("[") && !bracketsBalanced(value)) {
        pending = line;
        continue;
      }
    }

    lines.push(line);
  }

  if (pending) throw new Error(`Unclosed TOML array: ${pending}`);
  return lines;
}

function targetFor(root: TomlObject, path: string): TomlObject {
  return path.split(".").reduce<TomlObject>((target, part) => {
    const existing = target[part];
    if (!existing || typeof existing !== "object" || Array.isArray(existing)) {
      target[part] = {};
    }
    return target[part] as TomlObject;
  }, root);
}

export function parseToml(content: string): TomlObject {
  const root: TomlObject = {};
  let current: TomlObject = root;

  for (const line of logicalLines(content)) {
    const arrayTableMatch = line.match(/^\[\[([A-Za-z0-9_.-]+)\]\]$/);
    if (arrayTableMatch) {
      const path = arrayTableMatch[1].split(".");
      const tableName = path.pop();
      if (!tableName) throw new Error(`Invalid TOML array table: ${line}`);
      const parent = path.length > 0 ? targetFor(root, path.join(".")) : root;
      const existing = parent[tableName];
      if (existing !== undefined && !Array.isArray(existing)) {
        throw new Error(`TOML key already exists and is not an array: ${arrayTableMatch[1]}`);
      }
      const table: TomlObject = {};
      parent[tableName] = [...((existing as TomlObject[] | undefined) ?? []), table];
      current = table;
      continue;
    }

    const tableMatch = line.match(/^\[([A-Za-z0-9_.-]+)\]$/);
    if (tableMatch) {
      current = targetFor(root, tableMatch[1]);
      continue;
    }

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) throw new Error(`Invalid TOML assignment: ${line}`);

    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();
    current[key] = parseScalar(value);
  }

  return root;
}
