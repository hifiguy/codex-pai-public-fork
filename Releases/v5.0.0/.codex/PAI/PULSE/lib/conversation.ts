/**
 * Conversation Persistence
 *
 * Adapted from PAI Monitor's ConversationStore.
 * Atomic writes (tmp + rename) to prevent corruption on crash.
 * Rolling window of last 40 messages (~20 exchanges).
 */

import { join } from "path"

export interface ConversationMessage {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export class ConversationStore {
  private messages: ConversationMessage[] = []
  private readonly path: string
  private readonly maxMessages: number

  constructor(path: string, maxMessages = 40) {
    this.path = path
    this.maxMessages = maxMessages
  }

  async load(): Promise<void> {
    try {
      const file = Bun.file(this.path)
      if (await file.exists()) {
        this.messages = await file.json() as ConversationMessage[]
      }
    } catch {
      this.messages = []
    }
  }

  getHistory(): Array<{ role: "user" | "assistant"; content: string }> {
    return this.messages.map(m => ({ role: m.role, content: m.content }))
  }

  async addExchange(userContent: string, assistantContent: string): Promise<void> {
    const now = Date.now()
    this.messages.push(
      { role: "user", content: userContent, timestamp: now },
      { role: "assistant", content: assistantContent, timestamp: now },
    )

    if (this.messages.length > this.maxMessages) {
      this.messages = this.messages.slice(-this.maxMessages)
    }

    await this.persist()
  }

  private async persist(): Promise<void> {
    const tmp = this.path + ".tmp"
    await Bun.write(tmp, JSON.stringify(this.messages, null, 2))
    const fs = await import("fs/promises")
    await fs.rename(tmp, this.path)
  }
}
