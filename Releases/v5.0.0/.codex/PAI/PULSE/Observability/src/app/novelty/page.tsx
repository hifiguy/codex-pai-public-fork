"use client";

import { useState } from "react";
import {
  useNoveltyDashboard,
  type NoveltyRun,
  type NoveltyCandidate,
} from "@/hooks/useNoveltyDashboard";
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Zap,
  Target,
  Lightbulb,
  Gem,
  Wrench,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";

// ─── Phase Constants ─────────────────────────────────────────────────

const PHASES = [
  "CONSUME",
  "DREAM",
  "DAYDREAM",
  "CONTEMPLATE",
  "STEAL",
  "MATE",
  "TEST",
  "EVOLVE",
  "META-LEARN",
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Score Bar Component ─────────────────────────────────────────────

function ScoreBar({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const color =
    value >= 80
      ? "bg-emerald-500"
      : value >= 60
        ? "bg-blue-500"
        : value >= 40
          ? "bg-yellow-500"
          : "bg-red-500";

  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
      <span className="text-xs text-muted-foreground w-16 flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-mono text-muted-foreground w-8 text-right">
        {value}
      </span>
    </div>
  );
}

// ─── Candidate Card Component ────────────────────────────────────────

function CandidateCard({ candidate }: { candidate: NoveltyCandidate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-blue-400">
            #{candidate.rank}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-medium text-foreground truncate">
              {candidate.title}
            </h4>
            <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-blue-500/20 text-blue-400 flex-shrink-0">
              {candidate.compositeScore.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {candidate.description}
          </p>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <ScoreBar label="Feasible" value={candidate.scores.feasibility} icon={Wrench} />
        <ScoreBar label="Novel" value={candidate.scores.novelty} icon={Lightbulb} />
        <ScoreBar label="Impact" value={candidate.scores.impact} icon={Target} />
        <ScoreBar label="Elegant" value={candidate.scores.elegance} icon={Gem} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span
          className={cn(
            "px-2 py-0.5 rounded-md text-xs font-medium",
            candidate.confidence >= 0.85
              ? "bg-emerald-500/20 text-emerald-400"
              : candidate.confidence >= 0.7
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          )}
        >
          {(candidate.confidence * 100).toFixed(0)}% confidence
        </span>
        {candidate.lineage.map((l) => (
          <span
            key={l}
            className="px-1.5 py-0.5 rounded text-[13px] bg-white/[0.05] text-muted-foreground"
          >
            {l}
          </span>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {expanded ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
        Arguments
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
            <span className="text-[13px] uppercase tracking-wider text-emerald-400 font-semibold">
              For
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              {candidate.forIt}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/10">
            <span className="text-[13px] uppercase tracking-wider text-red-400 font-semibold">
              Against
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              {candidate.againstIt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Run Panel Component ─────────────────────────────────────────────

function RunPanel({ run }: { run: NoveltyRun }) {
  const isRunning = run.status === "running";

  return (
    <div className="flex flex-col gap-4">
      {/* A. Header Panel */}
      <div className="glass-panel rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground">
              Novelty Run
            </span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-md text-xs font-medium",
                isRunning
                  ? "bg-blue-500/20 text-blue-400 animate-pulse"
                  : "bg-emerald-500/20 text-emerald-400"
              )}
            >
              {isRunning ? "Running" : "Complete"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              Cycle {run.currentCycle}/{run.maxCycles}
            </span>
            <span>
              Budget: {formatDuration(run.budgetSecondsTotal - run.budgetSecondsRemaining)}/
              {formatDuration(run.budgetSecondsTotal)}
            </span>
            <span>
              Pivots: {run.strategyPivotsUsed}/{run.strategyPivotsMax}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{run.problem}</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Started {formatDate(run.startedAt)}</span>
          <span className="opacity-40">|</span>
          <span>Updated {formatDate(run.updatedAt)}</span>
        </div>
      </div>

      {/* B. Phase Pipeline */}
      <div className="glass-panel rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Phase Pipeline
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PHASES.map((phaseName) => {
            const phase = run.phases.find((p) => p.name === phaseName);
            const status = phase?.status ?? "pending";
            const isCurrent = run.currentPhase === phaseName;

            return (
              <div
                key={phaseName}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[13px] font-semibold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 transition-all",
                  isCurrent && "bg-blue-500/20 text-blue-400 animate-pulse",
                  status === "complete" &&
                    !isCurrent &&
                    "bg-emerald-500/15 text-emerald-400",
                  status === "pending" &&
                    !isCurrent &&
                    "bg-white/[0.03] text-muted-foreground opacity-50"
                )}
              >
                {status === "complete" && (
                  <Check className="w-3 h-3" />
                )}
                {phaseName}
              </div>
            );
          })}
        </div>
      </div>

      {/* C. Fitness Trajectory Chart */}
      {run.fitnessTrajectory.length > 0 && (
        <div className="glass-panel rounded-2xl p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
            Fitness Trajectory
          </span>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={run.fitnessTrajectory}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="cycle"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  label={{
                    value: "Cycle",
                    position: "insideBottom",
                    offset: -5,
                    fill: "#94a3b8",
                    fontSize: 11,
                  }}
                />
                <YAxis
                  yAxisId="score"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  domain={[0, 100]}
                />
                <YAxis
                  yAxisId="diversity"
                  orientation="right"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  domain={[0, 1]}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelFormatter={(v) => `Cycle ${v}`}
                />
                <Area
                  yAxisId="diversity"
                  type="monotone"
                  dataKey="diversityIndex"
                  fill="rgba(168,85,247,0.15)"
                  stroke="rgba(168,85,247,0.4)"
                  name="Diversity"
                />
                <Line
                  yAxisId="score"
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  name="Avg Score"
                />
                <Line
                  yAxisId="score"
                  type="monotone"
                  dataKey="topScore"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                  name="Top Score"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* D. Checkpoint Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Checkpoint A
            </span>
            <span className="text-[13px] text-muted-foreground">
              CONTEMPLATE gate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2 py-0.5 rounded-md text-xs font-bold",
                run.checkpoints.a.status === "PASS"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {run.checkpoints.a.status}
            </span>
            <span className="text-sm font-mono text-foreground">
              {run.checkpoints.a.percentage?.toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              Cycle {run.checkpoints.a.cycle}
            </span>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Checkpoint B
            </span>
            <span className="text-[13px] text-muted-foreground">
              TEST gate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2 py-0.5 rounded-md text-xs font-bold",
                run.checkpoints.b.status === "PASS"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {run.checkpoints.b.status}
            </span>
            <span className="text-sm font-mono text-foreground">
              {run.checkpoints.b.currentAvg?.toFixed(1)}
            </span>
            {run.checkpoints.b.previousAvg != null && (
              <span className="text-xs text-muted-foreground">
                (prev: {run.checkpoints.b.previousAvg.toFixed(1)})
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              Cycle {run.checkpoints.b.cycle}
            </span>
          </div>
        </div>
      </div>

      {/* E. Top Candidates */}
      {run.candidates.length > 0 && (
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block px-1">
            Top Candidates
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {run.candidates.map((c) => (
              <CandidateCard key={c.rank} candidate={c} />
            ))}
          </div>
        </div>
      )}

      {/* F. Domain Fertility Table */}
      {run.domainFertility.length > 0 && (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Domain Fertility
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Pairing
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">
                  Avg Score
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">
                  Count
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">
                  Multiplier
                </th>
              </tr>
            </thead>
            <tbody>
              {run.domainFertility.map((d) => (
                <tr
                  key={d.pairing}
                  className="border-b border-white/[0.04] last:border-0"
                >
                  <td className="px-4 py-2 text-foreground">{d.pairing}</td>
                  <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                    {d.avgScore.toFixed(1)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                    {d.count}
                  </td>
                  <td
                    className={cn(
                      "px-4 py-2 text-right font-mono font-medium",
                      d.multiplier > 1.0
                        ? "text-emerald-400"
                        : "text-red-400"
                    )}
                  >
                    {d.multiplier.toFixed(1)}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* G. Phase Metrics */}
      {run.phaseMetrics.length > 0 && (
        <div className="glass-panel rounded-2xl p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
            Phase Metrics
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {run.phaseMetrics.map((pm) => (
              <div
                key={pm.phase}
                className="bg-white/[0.03] rounded-lg p-2 text-center"
              >
                <div className="text-[13px] uppercase tracking-wider text-muted-foreground mb-1 truncate">
                  {pm.phase}
                </div>
                <div className="text-xs font-mono text-foreground">
                  {formatDuration(pm.durationSeconds)}
                </div>
                <div className="text-[13px] text-muted-foreground">
                  {pm.outputCount} out / {pm.agentCount} agents
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────

export default function NoveltyPage() {
  const { runs, isLoading, refetch } = useNoveltyDashboard();

  return (
    <div className="flex flex-col gap-4 mx-4 mt-4 flex-1 overflow-y-auto pb-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h1
            className="text-lg tracking-[0.15em] text-white"
            style={{ fontFamily: "'concourse-t3', sans-serif" }}
          >
            NOVELTY
          </h1>
          <span className="text-xs text-muted-foreground">
            {runs.length} run{runs.length !== 1 ? "s" : ""}
          </span>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="glass-panel px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:bg-white/[0.05] transition-colors disabled:opacity-50"
        >
          <RefreshCw
            className={cn("w-4 h-4", isLoading && "animate-spin")}
          />
          Refresh
        </button>
      </div>

      {/* Empty State */}
      {runs.length === 0 && !isLoading && (
        <div className="glass-panel rounded-2xl flex-1 flex items-center justify-center min-h-[300px]">
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <Sparkles className="w-12 h-12 text-muted-foreground opacity-50" />
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No Novelty Runs Yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Use the{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  CreateNovelty
                </code>{" "}
                skill to generate ideas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Run Panels */}
      {runs.map((run) => (
        <RunPanel key={run.id} run={run} />
      ))}
    </div>
  );
}
