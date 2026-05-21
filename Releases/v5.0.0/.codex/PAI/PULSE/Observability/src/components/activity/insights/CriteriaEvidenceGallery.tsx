"use client";

import { useState, useMemo } from "react";
import { useAlgorithmState } from "@/hooks/useAlgorithmState";
import { Search } from "lucide-react";
import type {
  AlgorithmCriterion,
  AlgorithmState,
  EffortLevel,
} from "@/types/algorithm";

// ─── Widget 15: Criteria Evidence Gallery ───
// Grid of completed ISC criteria cards showing criterion + evidence.
// Aggregates criteria across all sessions (active + work history).

interface CriterionWithContext {
  criterion: AlgorithmCriterion;
  sessionName: string;
  effortLevel: EffortLevel;
}

const PHASE_COLORS: Record<string, string> = {
  OBSERVE: "border-l-[#7dcfff]",
  THINK: "border-l-[#bb9af7]",
  PLAN: "border-l-[#7aa2f7]",
  BUILD: "border-l-[#ff9e64]",
  EXECUTE: "border-l-[#9ece6a]",
  VERIFY: "border-l-[#73daca]",
  LEARN: "border-l-[#e0af68]",
  IDLE: "border-l-zinc-600",
  COMPLETE: "border-l-zinc-600",
};

const EFFORT_COLORS: Record<string, string> = {
  Standard: "bg-blue-400/20 text-blue-400",
  Extended: "bg-violet-400/20 text-violet-400",
  Advanced: "bg-purple-400/20 text-purple-400",
  Deep: "bg-indigo-400/20 text-indigo-400",
  Comprehensive: "bg-fuchsia-400/20 text-fuchsia-400",
  Native: "bg-zinc-400/20 text-zinc-400",
};

const PHASE_BADGE_COLORS: Record<string, string> = {
  OBSERVE: "text-[#7dcfff]",
  THINK: "text-[#bb9af7]",
  PLAN: "text-[#7aa2f7]",
  BUILD: "text-[#ff9e64]",
  EXECUTE: "text-[#9ece6a]",
  VERIFY: "text-[#73daca]",
  LEARN: "text-[#e0af68]",
  IDLE: "text-zinc-500",
  COMPLETE: "text-zinc-500",
};

const INITIAL_VISIBLE = 30;
const LOAD_MORE_COUNT = 30;

function collectCompletedCriteria(states: AlgorithmState[]): CriterionWithContext[] {
  const results: CriterionWithContext[] = [];

  for (const session of states) {
    const sessionName = session.taskDescription || session.sessionId;
    const effortLevel = session.effortLevel ?? session.sla ?? "Standard";

    // Active session criteria
    for (const c of session.criteria) {
      if (c.status === "completed") {
        results.push({ criterion: c, sessionName, effortLevel });
      }
    }

    // Work history criteria
    if (session.workHistory) {
      for (const work of session.workHistory) {
        const workName = work.taskDescription || sessionName;
        const workEffort = work.effortLevel ?? effortLevel;
        for (const c of work.criteria) {
          if (c.status === "completed") {
            results.push({ criterion: c, sessionName: workName, effortLevel: workEffort });
          }
        }
      }
    }

    // Rework history criteria
    if (session.reworkHistory) {
      for (const cycle of session.reworkHistory) {
        const cycleEffort = (cycle.effortLevel as EffortLevel) ?? effortLevel;
        for (const c of cycle.criteria) {
          if (c.status === "completed") {
            results.push({ criterion: c, sessionName, effortLevel: cycleEffort });
          }
        }
      }
    }
  }

  return results;
}

export default function CriteriaEvidenceGallery() {
  const { algorithmStates, isLoading, error } = useAlgorithmState();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const allCompleted = useMemo(
    () => collectCompletedCriteria(algorithmStates),
    [algorithmStates]
  );

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return allCompleted;
    const q = searchQuery.toLowerCase();
    return allCompleted.filter(
      (item) =>
        item.criterion.description.toLowerCase().includes(q) ||
        item.criterion.id.toLowerCase().includes(q)
    );
  }, [allCompleted, searchQuery]);

  const sessionCount = useMemo(() => {
    const names = new Set(allCompleted.map((item) => item.sessionName));
    return names.size;
  }, [allCompleted]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-zinc-600 text-xs">
        Loading criteria...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-rose-400 text-xs">
        Error: {error}
      </div>
    );
  }

  if (allCompleted.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-zinc-500 text-xs">
        No completed criteria yet
      </div>
    );
  }

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="text-xs text-zinc-400">
        <span className="font-mono font-medium text-zinc-200">
          {allCompleted.length}
        </span>{" "}
        criteria completed across{" "}
        <span className="font-mono font-medium text-zinc-200">
          {sessionCount}
        </span>{" "}
        sessions
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
        <input
          type="text"
          placeholder="Filter criteria..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setVisibleCount(INITIAL_VISIBLE);
          }}
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-800/50 border border-white/[0.06] rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.12] transition-colors"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {visible.map((item, i) => (
          <CriterionCard key={`${item.criterion.id}-${item.sessionName}-${i}`} item={item} />
        ))}
      </div>

      {/* Show more */}
      {hasMore && (
        <button
          onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
          className="w-full py-2 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/30 rounded-lg border border-white/[0.04] transition-colors"
        >
          Show more ({filtered.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}

function CriterionCard({ item }: { item: CriterionWithContext }) {
  const { criterion, sessionName, effortLevel } = item;
  const phaseColorClass = PHASE_COLORS[criterion.createdInPhase] ?? "border-l-zinc-600";
  const effortColorClass = EFFORT_COLORS[effortLevel] ?? EFFORT_COLORS.Standard;
  const phaseBadgeColor = PHASE_BADGE_COLORS[criterion.createdInPhase] ?? "text-zinc-500";

  return (
    <div
      className={`min-h-[100px] bg-zinc-800/40 border border-white/[0.04] rounded-lg p-3 border-l-2 ${phaseColorClass} space-y-2`}
    >
      {/* ID badge */}
      <span
        className={`inline-block text-[13px] font-mono font-medium px-1.5 py-0.5 rounded-full ${effortColorClass}`}
      >
        {criterion.id}
      </span>

      {/* Description */}
      <p className="text-[15px] text-zinc-200 leading-relaxed">
        {criterion.description}
      </p>

      {/* Evidence */}
      {criterion.evidence && (
        <p className="text-[14px] text-zinc-400 italic leading-relaxed">
          {criterion.evidence}
        </p>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[13px] text-zinc-500 truncate max-w-[70%]">
          {sessionName}
        </span>
        <span className={`text-[13px] font-mono ${phaseBadgeColor}`}>
          {criterion.createdInPhase}
        </span>
      </div>
    </div>
  );
}
