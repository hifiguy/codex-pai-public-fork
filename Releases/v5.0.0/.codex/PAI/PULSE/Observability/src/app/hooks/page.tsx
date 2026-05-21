"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Webhook, ArrowLeft, FileCode, Globe } from "lucide-react";
import Link from "next/link";
import EmptyStateGuide from "@/components/EmptyStateGuide";

interface HookEntry {
  event: string;
  matcher: string;
  type: string;
  command: string;
  fileName: string;
}

interface HookDetail {
  name: string;
  content: string;
  filePath: string;
  lastModified: string;
  size: number;
}

type Dimension = "health" | "money" | "freedom" | "creative" | "relationships" | "rhythms";

const DIM_COLORS: Record<Dimension, string> = {
  health: "var(--health)",
  money: "var(--money)",
  freedom: "var(--freedom)",
  creative: "var(--creative)",
  relationships: "var(--relationships)",
  rhythms: "var(--rhythms)",
};

const EVENT_DIMENSIONS: Record<string, Dimension> = {
  PreToolUse: "creative",
  PostToolUse: "rhythms",
  PostToolUseFailure: "creative",
  UserPromptSubmit: "creative",
  Notification: "freedom",
  PreCompact: "relationships",
  PostCompact: "rhythms",
  SessionStart: "freedom",
  SessionEnd: "relationships",
  SubagentStart: "health",
  SubagentStop: "relationships",
  Stop: "relationships",
  StopFailure: "creative",
  TaskCreated: "money",
  TaskCompleted: "health",
  TeammateIdle: "rhythms",
  ConfigChange: "money",
  PermissionRequest: "creative",
  FileChanged: "freedom",
  CwdChanged: "rhythms",
  InstructionsLoaded: "relationships",
  Elicitation: "freedom",
  ElicitationResult: "relationships",
};

function eventDimension(event: string): Dimension {
  return EVENT_DIMENSIONS[event] || "money";
}

function eventCardClass(event: string): string {
  if (event.includes("Failure") || event.includes("Error")) return "telos-card rec rec-high";
  if (event.includes("Completed") || event === "PostToolUse") return "telos-card rec rec-low";
  return "telos-card";
}

function HooksLanding({ hooks, events }: { hooks: HookEntry[]; events: string[] }) {
  const grouped = new Map<string, HookEntry[]>();
  for (const hook of hooks) {
    const list = grouped.get(hook.event) || [];
    list.push(hook);
    grouped.set(hook.event, list);
  }

  for (const event of events) {
    if (!grouped.has(event)) {
      grouped.set(event, []);
    }
  }

  const sortedEvents = [...grouped.keys()].sort();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {hooks.length === 0 && (
        <EmptyStateGuide
          section="Hook Activity"
          description="Per-hook health, latency, and recent invocations. Populates as hooks fire during your sessions."
          hideInterview
          daPromptExample="show me which hooks fired in this session"
        />
      )}
      <div className="telos-card goal-card dim-money" style={{ cursor: "default" }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "#E8EFFF" }}>
          Hooks
        </h1>
        <p className="mt-1 max-w-3xl" style={{ color: "#9BB0D6", fontSize: 14 }}>
          Lifecycle event handlers that run shell commands or HTTP requests in response to
          ChatGPT Codex events. Configured in settings.json; hooks intercept tool calls,
          session events, and system changes.
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "70%" }} />
        </div>
        <div className="goal-foot">
          <div className="goal-dims">
            <span className="pill pill-money">money</span>
            <span className="pill pill-creative">PreToolUse</span>
            <span className="pill pill-rhythms">PostToolUse</span>
          </div>
          <span className="goal-delta flat-muted">event layer</span>
        </div>
      </div>

      <div className="metric-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", maxWidth: 460 }}>
        <div className="telos-card metric" style={{ cursor: "default" }}>
          <div className="metric-top">
            <Webhook className="w-4 h-4" style={{ color: "var(--money)" }} />
            <span className="metric-label muted">Hooks</span>
          </div>
          <div className="metric-row">
            <span className="metric-val mono">{hooks.length}</span>
          </div>
        </div>
        <div className="telos-card metric" style={{ cursor: "default" }}>
          <div className="metric-top">
            <FileCode className="w-4 h-4" style={{ color: "var(--freedom)" }} />
            <span className="metric-label muted">Events</span>
          </div>
          <div className="metric-row">
            <span className="metric-val mono">{events.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {sortedEvents.map((event) => {
          const eventHooks = grouped.get(event) || [];
          const dimension = eventDimension(event);
          const eventColor = DIM_COLORS[dimension];

          return (
            <div key={event}>
              <h2
                className="text-sm font-medium uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: eventColor }}
              >
                <span
                  className={`pill pill-${dimension}`}
                  style={{
                    color: eventColor,
                    letterSpacing: 1.2,
                  }}
                >
                  {event}
                </span>
                <span className="muted" style={{ fontSize: 12 }}>({eventHooks.length})</span>
              </h2>
              {eventHooks.length === 0 ? (
                <p className="pl-3 muted" style={{ fontSize: 13, fontStyle: "italic" }}>
                  No hooks registered
                </p>
              ) : (
                <div className="space-y-2">
                  {eventHooks.map((hook, i) => (
                    <Link
                      key={`${hook.event}-${hook.matcher}-${i}`}
                      href={`/hooks?name=${encodeURIComponent(hook.fileName)}`}
                      className={eventCardClass(event)}
                      style={{ padding: "12px 18px", cursor: "pointer" }}
                    >
                      <div className="flex items-center gap-3 flex-wrap">
                        {hook.type === "http" ? (
                          <Globe className="w-4 h-4 shrink-0" style={{ color: "var(--freedom)" }} />
                        ) : (
                          <FileCode className="w-4 h-4 shrink-0" style={{ color: "var(--money)" }} />
                        )}
                        <span className="mono" style={{ color: "#E8EFFF", fontSize: 13 }}>
                          {hook.fileName}
                        </span>
                        <span className="muted" style={{ fontSize: 12 }}>
                          matcher:{" "}
                          <span className="mono" style={{ color: "#D6E1F5" }}>{hook.matcher}</span>
                        </span>
                        <span className={`pill ${hook.type === "http" ? "pill-freedom" : "pill-money"} ml-auto shrink-0`}>
                          {hook.type}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HookDetailView({ hook }: { hook: HookDetail }) {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/hooks" style={{ color: "#9BB0D6" }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "#E8EFFF" }}>
            {hook.name}
          </h1>
          <p className="mt-0.5" style={{ color: "#9BB0D6", fontSize: 13 }}>
            {(hook.size / 1024).toFixed(1)} KB ·{" "}
            {new Date(hook.lastModified).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="telos-card" style={{ cursor: "default", padding: 0, overflow: "hidden" }}>
        <pre
          className="text-xs mono overflow-x-auto max-h-[700px] overflow-y-auto leading-relaxed p-4"
          style={{ background: "#060B1A", color: "#D6E1F5", margin: 0 }}
        >
          <code>{hook.content}</code>
        </pre>
      </div>
    </div>
  );
}

function HooksPageInner() {
  const searchParams = useSearchParams();
  const hookName = searchParams.get("name");
  const isViewing = !!hookName;

  const { data: listData } = useQuery<{ hooks: HookEntry[]; total: number; events: string[] }>({
    queryKey: ["hooks-list"],
    queryFn: async () => {
      const res = await fetch("/api/wiki/hooks");
      if (!res.ok) throw new Error("Failed to fetch hooks");
      return res.json();
    },
    staleTime: 30_000,
    enabled: !isViewing,
  });

  const { data: detailData } = useQuery<HookDetail>({
    queryKey: ["hook-detail", hookName],
    queryFn: async () => {
      const res = await fetch(`/api/wiki/hooks/${encodeURIComponent(hookName!)}`);
      if (!res.ok) throw new Error("Failed to fetch hook");
      return res.json();
    },
    enabled: isViewing,
  });

  if (isViewing && detailData) {
    return <HookDetailView hook={detailData} />;
  }

  if (!isViewing && listData) {
    return <HooksLanding hooks={listData.hooks} events={listData.events} />;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div style={{ color: "#6B80AB", fontSize: 14 }}>Loading...</div>
    </div>
  );
}

export default function HooksPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div style={{ color: "#6B80AB", fontSize: 14 }}>Loading...</div>
        </div>
      }
    >
      <HooksPageInner />
    </Suspense>
  );
}
