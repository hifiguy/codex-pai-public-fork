"use client";

import { useState } from "react";
import type { AlgorithmState } from "@/types/algorithm";
import ModeBadge from "./ModeBadge";
import ModeTimeline from "./ModeTimeline";
import EffortBadge from "./EffortBadge";

function formatElapsed(ms: number): string {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return `${h}h ${rm}m`;
}

interface NativeSessionRowProps {
  session: AlgorithmState;
}

export default function NativeSessionRow({ session }: NativeSessionRowProps) {
  const [expanded, setExpanded] = useState(false);

  const elapsed = session.algorithmStartedAt
    ? formatElapsed(Date.now() - session.algorithmStartedAt)
    : "";

  const isStale = session.algorithmStartedAt
    ? Date.now() - session.algorithmStartedAt > 15 * 60 * 1000
    : false;

  const taskText = session.rawTask || session.taskDescription || "";
  const sessionName = session.taskDescription
    ? session.taskDescription.replace(/^\[Telegram\]\s*/, "")
    : session.sessionId?.slice(0, 8) || "Session";

  return (
    <div
      className={`border-b transition-opacity ${
        isStale ? "border-amber-500/10 opacity-60" : "border-blue-500/10"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-blue-500/[0.03] transition-colors text-left"
      >
        {/* Activity indicator */}
        {isStale ? (
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
        ) : (
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        )}

        <ModeBadge mode="native" size="compact" />

        <span className="text-base font-medium text-zinc-200 truncate flex-1 uppercase tracking-wide">
          {sessionName}
        </span>

        {taskText && taskText !== sessionName && (
          <span className="text-sm text-zinc-500 truncate max-w-64">
            {taskText.length > 80 ? taskText.slice(0, 80) + "..." : taskText}
          </span>
        )}

        {/* Current action inline */}
        {session.currentAction && !expanded && (
          <span className="text-xs text-emerald-400/60 font-mono truncate max-w-48 shrink-0">
            {session.currentAction}
          </span>
        )}

        <span className="text-sm text-zinc-600 font-mono shrink-0 tabular-nums">
          {elapsed}
        </span>

        {/* Effort level */}
        {(session.effortLevel || session.sla) && (
          <EffortBadge effort={session.effortLevel || session.sla || ""} />
        )}

        {/* Criteria count */}
        {session.criteria && session.criteria.length > 0 && (
          <span className="text-xs font-mono text-zinc-500 shrink-0">
            {session.criteria.filter(c => c.status === "completed").length}/{session.criteria.length}
          </span>
        )}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-3 space-y-2">
          {session.modeHistory && session.modeHistory.length > 1 && (
            <div className="px-2">
              <ModeTimeline
                modeHistory={session.modeHistory}
                currentMode={session.currentMode || "native"}
                isActive={session.active}
              />
            </div>
          )}
          {taskText && (
            <p className="text-sm text-zinc-400 leading-relaxed pl-2">
              {taskText}
            </p>
          )}
          {session.currentAction && (
            <div className="flex items-center gap-2 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-sm text-emerald-400/80 font-mono truncate">
                {session.currentAction}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
