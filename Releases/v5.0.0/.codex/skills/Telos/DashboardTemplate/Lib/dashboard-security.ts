import { NextResponse } from "next/server"
import path from "path"

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"])

type TelosPathResult =
  | { filePath: string; filename: string; isCSV: boolean; isMarkdown: boolean }
  | { error: string; status: number }

function hostNameFromHostHeader(host: string): string {
  if (host.startsWith("[")) {
    const end = host.indexOf("]")
    return end === -1 ? host.toLowerCase() : host.slice(1, end).toLowerCase()
  }

  return host.split(":")[0]?.toLowerCase() ?? ""
}

function isLoopbackSameOriginRequest(request: Request): boolean {
  const requestUrl = new URL(request.url)
  const host = request.headers.get("host") ?? requestUrl.host
  const hostname = hostNameFromHostHeader(host)

  if (!LOOPBACK_HOSTS.has(hostname)) {
    return false
  }

  const origin = request.headers.get("origin")
  if (!origin) {
    return true
  }

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export function requireDashboardRequest(request: Request): NextResponse | null {
  const token = process.env.TELOS_DASHBOARD_TOKEN?.trim()
  const tokenRequired = process.env.TELOS_DASHBOARD_REQUIRE_TOKEN === "1"

  if (token || tokenRequired) {
    if (!token) {
      return NextResponse.json(
        { error: "TELOS_DASHBOARD_TOKEN is required for dashboard API access" },
        { status: 503 }
      )
    }

    const auth = request.headers.get("authorization") ?? ""
    const bearerToken = auth.match(/^Bearer\s+(.+)$/i)?.[1]
    const headerToken = request.headers.get("x-telos-dashboard-token")

    if (bearerToken === token || headerToken === token) {
      return null
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (isLoopbackSameOriginRequest(request)) {
    return null
  }

  return NextResponse.json(
    { error: "Dashboard API access is restricted to same-origin localhost requests" },
    { status: 403 }
  )
}

export function resolveTelosFilePath(rootDir: string, filename: unknown): TelosPathResult {
  if (typeof filename !== "string" || filename.length === 0) {
    return { error: "Filename is required", status: 400 }
  }

  if (
    filename.includes("\0") ||
    filename.includes("/") ||
    filename.includes("\\") ||
    filename === "." ||
    filename === ".." ||
    path.basename(filename) !== filename
  ) {
    return { error: "Invalid filename", status: 400 }
  }

  const isCSV = filename.endsWith(".csv")
  const isMarkdown = filename.endsWith(".md")

  if (!isCSV && !isMarkdown) {
    return { error: "Only .md and .csv files are allowed", status: 400 }
  }

  const baseDir = isCSV ? path.join(rootDir, "data") : rootDir
  const resolvedBase = path.resolve(baseDir)
  const filePath = path.resolve(resolvedBase, filename)

  if (!filePath.startsWith(resolvedBase + path.sep)) {
    return { error: "Invalid filename", status: 400 }
  }

  return { filePath, filename, isCSV, isMarkdown }
}
