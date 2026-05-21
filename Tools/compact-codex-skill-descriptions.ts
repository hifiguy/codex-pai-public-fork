#!/usr/bin/env bun

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const checkOnly = process.argv.includes("--check");
const root = process.argv.find((arg, index) => index > 1 && arg !== "--check")
  ?? "Releases/v5.0.0/.codex/skills";
const maxDescriptionLength = 1024;

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.name === "SKILL.md" ? [fullPath] : [];
  });
}

function parseDescription(raw: string): string {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed.replace(/^["']|["']$/g, "");
  }
}

function trimAtWord(value: string, limit: number): string {
  if (value.length <= limit) return value;
  const clipped = value.slice(0, limit);
  const wordBoundary = clipped.lastIndexOf(" ");
  return clipped.slice(0, wordBoundary > 120 ? wordBoundary : limit).trim();
}

function compactDescription(description: string): string {
  const normalized = description.replace(/\s+/g, " ").trim();
  const useWhen = normalized.match(/\bUSE WHEN:?\s*([^.]*)/i)?.[1]?.trim();
  const notFor = normalized.match(/\bNOT FOR:?\s*([^.]*)/i)?.[1]?.trim();

  let lead = normalized.split(/\bUSE WHEN:?/i)[0].trim();
  if (lead.length > 560) {
    const clipped = lead.slice(0, 560);
    const sentence = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("; "));
    lead = clipped.slice(0, sentence > 240 ? sentence + 1 : clipped.lastIndexOf(" ")).trim();
  }

  const parts = [lead];
  if (useWhen) parts.push(`USE WHEN: ${trimAtWord(useWhen, 300)}.`);
  if (notFor) parts.push(`NOT FOR: ${trimAtWord(notFor, 140)}.`);

  let next = parts.join(" ").replace(/\s+\./g, ".").trim();
  if (next.length > 980) next = `${trimAtWord(next, 978)}.`;
  return next;
}

let changed = 0;

for (const file of walk(root)) {
  let content = readFileSync(file, "utf8");
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) continue;

  const descriptionLine = frontmatter[1].match(/^description:\s*(.*)$/m);
  if (!descriptionLine) continue;

  const currentDescription = parseDescription(descriptionLine[1]);
  if (currentDescription.length <= maxDescriptionLength) continue;

  if (checkOnly) {
    console.error(`${file}: description length ${currentDescription.length} exceeds ${maxDescriptionLength}`);
    changed++;
    continue;
  }

  const nextDescription = compactDescription(currentDescription);
  const nextFrontmatter = frontmatter[1].replace(
    /^description:\s*.*$/m,
    `description: ${JSON.stringify(nextDescription)}`,
  );

  content = content.replace(/^---\n[\s\S]*?\n---\n/, `---\n${nextFrontmatter}\n---\n`);
  writeFileSync(file, content);

  changed++;
  console.log(`${file}: ${currentDescription.length} -> ${nextDescription.length}`);
}

if (checkOnly) {
  if (changed > 0) process.exit(1);
  console.log(`all skill descriptions <= ${maxDescriptionLength}`);
} else {
  console.log(`changed=${changed}`);
}
