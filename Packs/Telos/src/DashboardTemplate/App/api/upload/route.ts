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

    const formData = await request.formData()
    const fileEntry = formData.get('file')

    if (!(fileEntry instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    const file = fileEntry

    const target = resolveTelosFilePath(TELOS_DIR, file.name)
    if ("error" in target) {
      return NextResponse.json(
        { error: target.error },
        { status: target.status }
      )
    }

    // Read file content
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Ensure TELOS directory exists
    if (!fs.existsSync(TELOS_DIR)) {
      fs.mkdirSync(TELOS_DIR, { recursive: true })
    }

    // Determine save path
    if (target.isCSV) {
      // CSV files go in data subdirectory
      const csvDir = path.join(TELOS_DIR, 'data')
      if (!fs.existsSync(csvDir)) {
        fs.mkdirSync(csvDir, { recursive: true })
      }
    }

    // Check if file already exists
    if (fs.existsSync(target.filePath)) {
      return NextResponse.json(
        { error: `File ${target.filename} already exists. Please delete the existing file first or rename your file.` },
        { status: 409 }
      )
    }

    // Save file
    fs.writeFileSync(target.filePath, buffer)

    // Log the upload
    const timestamp = new Date().toISOString()
    const logMessage = `\n## ${timestamp}\n\n- **Action:** File uploaded via dashboard\n- **File:** ${target.filename}\n- **Type:** ${target.isCSV ? 'CSV' : 'Markdown'}\n- **Path:** ${target.filePath}\n`

    const updatesPath = path.join(TELOS_DIR, 'updates.md')
    if (fs.existsSync(updatesPath)) {
      fs.appendFileSync(updatesPath, logMessage)
    }

    return NextResponse.json({
      success: true,
      message: `${target.filename} uploaded successfully to ${target.isCSV ? 'data/' : ''}`,
      path: target.filePath,
    })
  } catch (error) {
    console.error("Error in upload API:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}
