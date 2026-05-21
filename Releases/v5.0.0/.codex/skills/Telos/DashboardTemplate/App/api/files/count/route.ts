import { NextResponse } from "next/server"
import { getTelosFileCount, getTelosFileList } from "@/Lib/telos-data"
import { requireDashboardRequest } from "@/Lib/dashboard-security"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const authError = requireDashboardRequest(request)
    if (authError) return authError

    const count = getTelosFileCount()
    const files = getTelosFileList()

    return NextResponse.json({
      count,
      files,
    })
  } catch (error) {
    console.error("Error getting file count:", error)
    return NextResponse.json(
      { error: "Failed to get file count" },
      { status: 500 }
    )
  }
}
