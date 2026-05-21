/**
 * PAI Installer v5.0 — CLI Interactive Prompts
 * readline-based input collection with proper cleanup.
 *
 * Non-interactive mode: when PAI_TEST_AUTOMATED=1 or stdin is not a TTY
 * (CI, ssh-without-tty, headless test harnesses), every prompt returns the
 * documented sensible default without ever touching readline. This keeps
 * the wizard runnable end-to-end from automation.
 */

import * as readline from "readline";
import { c, print, printError, printQuestion, printWarning } from "./display";

const ANSWER_PREFIX = `  ${c.green}❯ you:${c.reset} `;

type PromptChoiceOption = {
  label: string;
  value: string;
  description?: string;
  voiceId?: string;
};

function isAutomated(): boolean {
  return process.env.PAI_TEST_AUTOMATED === "1" || process.stdin.isTTY === false;
}

/**
 * Prompt for text input with optional default value.
 *
 * In automated mode we return an empty string and let the caller's own
 * fallback ("User", "PAI", etc.) take effect. The `defaultValue` here is
 * really a UI placeholder hint ("Your name", "e.g., Atlas, Nova, Sage"),
 * NOT a sensible install-time default — returning it as the answer
 * persisted those literal hint strings into settings.json on automated
 * runs.
 */
export async function promptText(
  question: string,
  defaultValue?: string,
  daName?: string
): Promise<string> {
  if (isAutomated()) return "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const defaultHint = defaultValue ? ` ${c.gray}(default: ${defaultValue})${c.reset}` : "";

  printQuestion(question + defaultHint, daName);
  return new Promise<string>((resolve) => {
    rl.question(ANSWER_PREFIX, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue || "");
    });
  });
}

/**
 * Prompt for a password/key (masked input).
 */
export async function promptSecret(
  question: string,
  placeholder?: string,
  daName?: string
): Promise<string> {
  if (isAutomated()) return "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const hint = placeholder ? ` ${c.gray}(${placeholder})${c.reset}` : "";

  printQuestion(question + hint + `\n${c.dim}(input will be visible — paste your key)${c.reset}`, daName);
  return new Promise<string>((resolve) => {
    rl.question(ANSWER_PREFIX, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Prompt for a choice from a list.
 */
export async function promptChoice(
  question: string,
  choices: PromptChoiceOption[],
  daName?: string
): Promise<string> {
  if (isAutomated()) return choices[0]?.value ?? "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  printQuestion(question, daName);
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    print(`  ${c.blue}${i + 1})${c.reset} ${c.bold}${choice.label}${c.reset}${choice.description ? ` ${c.gray}— ${choice.description}${c.reset}` : ""}`);
  }

  return new Promise<string>((resolve) => {
    rl.question(ANSWER_PREFIX, (answer) => {
      rl.close();
      const idx = parseInt(answer.trim()) - 1;
      if (idx >= 0 && idx < choices.length) {
        resolve(choices[idx].value);
      } else {
        // Default to first choice
        resolve(choices[0].value);
      }
    });
  });
}

export async function promptChoiceWithPreview(
  question: string,
  choices: { label: string; value: string; description?: string; voiceId?: string }[],
  onPreview: (choice: { label: string; value: string; voiceId?: string }) => Promise<void>,
  daName?: string,
): Promise<string> {
  if (isAutomated()) return choices[0]?.value ?? "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (prompt: string): Promise<string> => new Promise((resolve) => {
    rl.question(prompt, resolve);
  });

  printQuestion(question, daName);
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    print(`  ${c.lightBlue}┌────────────────────────────────────────────────────────────┐${c.reset}`);
    print(`  ${c.lightBlue}│${c.reset} ${c.blue}${i + 1})${c.reset} ${c.bold}${choice.label}${c.reset}${choice.voiceId ? ` ${c.gray}— ${choice.voiceId}${c.reset}` : ""}`);
    if (choice.description) {
      print(`  ${c.lightBlue}│${c.reset} ${c.gray}${choice.description}${c.reset}`);
    }
    print(`  ${c.lightBlue}│${c.reset} ${choice.voiceId ? `${c.lightBlue}▶ p${i + 1} to preview${c.reset}` : `${c.gray}No preview available${c.reset}`}`);
    print(`  ${c.lightBlue}└────────────────────────────────────────────────────────────┘${c.reset}`);
  }

  try {
    while (true) {
      const trimmed = (await ask(ANSWER_PREFIX)).trim();

      if (trimmed === "") {
        continue;
      }

      const selectedMatch = /^(\d+)$/.exec(trimmed);
      if (selectedMatch) {
        const idx = parseInt(selectedMatch[1], 10) - 1;
        if (idx >= 0 && idx < choices.length) {
          return choices[idx].value;
        }
        printWarning(`pick a number between 1 and ${choices.length}`);
        continue;
      }

      const previewMatch = /^p(\d+)$/i.exec(trimmed);
      if (previewMatch) {
        const idx = parseInt(previewMatch[1], 10) - 1;
        if (idx < 0 || idx >= choices.length) {
          printWarning(`preview number must be between 1 and ${choices.length}`);
          continue;
        }

        const choice = choices[idx];
        if (!choice.voiceId) {
          printWarning("no preview available");
          continue;
        }

        try {
          await onPreview({ label: choice.label, value: choice.value, voiceId: choice.voiceId });
        } catch (error) {
          const reason = error instanceof Error ? error.message : String(error);
          printError(`preview unavailable: ${reason}`);
        }
        continue;
      }

      printWarning(`didn't understand ${trimmed}`);
    }
  } finally {
    rl.close();
  }
}

/**
 * Prompt for yes/no confirmation.
 */
export async function promptConfirm(
  question: string,
  defaultYes: boolean = true,
  daName?: string
): Promise<boolean> {
  if (isAutomated()) return defaultYes;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const hint = defaultYes ? `${c.gray}(Y/n)${c.reset}` : `${c.gray}(y/N)${c.reset}`;

  printQuestion(`${question} ${hint}`, daName);
  return new Promise<boolean>((resolve) => {
    rl.question(ANSWER_PREFIX, (answer) => {
      rl.close();
      const val = answer.trim().toLowerCase();
      if (val === "") resolve(defaultYes);
      else resolve(val === "y" || val === "yes");
    });
  });
}
