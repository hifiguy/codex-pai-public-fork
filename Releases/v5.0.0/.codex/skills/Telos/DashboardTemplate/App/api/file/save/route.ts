import { NextResponse } from "next/server"
import fs from 'fs'
import path from 'path'
import os from 'os'
import { requireDashboardRequest, resolveTelosFilePath } from "@/Lib/dashboard-security"

const TELOS_DIR = path.join(os.homedir(), '.codex/skills/Telos')

export async function POST(request: Request) {
  try {
    const authError = requireDashboardRequest(request)
    if (authError) return authError

    const { filename, content } = await request.json() as { filename?: unknown; content?: unknown }

    if (!filename || content === undefined) {
      return NextResponse.json(
        { error: "Filename and content are required" },
        { status: 400 }
      )
    }

    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Content must be a string" },
        { status: 400 }
      )
    }

    const target = resolveTelosFilePath(TELOS_DIR, filename)
    if ("error" in target) {
      return NextResponse.json(
        { error: target.error },
        { status: target.status }
      )
    }

    // Verify file exists before overwriting
    if (!fs.existsSync(target.filePath)) {
      return NextResponse.json(
        { error: `File ${target.filename} does not exist` },
        { status: 404 }
      )
    }

    // Save file
    fs.writeFileSync(target.filePath, content, 'utf-8')

    // Log the edit
    const timestamp = new Date().toISOString()
    const logMessage = `\n## ${timestamp}\n\n- **Action:** File edited via dashboard\n- **File:** ${target.filename}\n`

    const updatesPath = path.join(TELOS_DIR, 'updates.md')
    if (fs.existsSync(updatesPath)) {
      fs.appendFileSync(updatesPath, logMessage)
    }

    return NextResponse.json({
      success: true,
      message: `${target.filename} saved successfully`,
    })
  } catch (error) {
    console.error("Error saving file:", error)
    return NextResponse.json(
      { error: "Failed to save file" },
      { status: 500 }
    )
  }
}
