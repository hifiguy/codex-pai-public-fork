"use client";

import { useNoveltyState, type NoveltyRun, type NoveltyCandidate, type FitnessEntry, type DomainFertility } from "@/hooks/useNoveltyState";
import { Sparkles, CheckCircle2, XCircle, Clock, AlertTriangle, SlidersHorizontal } from "lucide-react";
import PresetBadge from "./PresetBadge";
import FocusIndicator from "./FocusIndicator";

// ─── Phase Pipeline ───

const PHASE_NAMES = [
  "CONSUME", "DREAM", "DAYDREAM", "CONTEMPLATE", "STEAL",
  "MATE", "TEST", "EVOLVE", "META-LEARN",
] as const;

function PhasePipeline({ run }: { run: NoveltyRun }) {
  const phaseMap = new Map(run.phases.map((p) => [p.name, p.status]));

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Phase Pipeline</h3>
      <div className="flex items-center gap-1.5 flex-wrap">
        {PHASE_NAMES.map((name) => {
          const status = phaseMap.get(name) ?? "pending";
          const isCurrent = status === "running";
          const isComplete = status === "complete";

          return (
            <div
              key={name}
              className={`relative flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                isCurrent
                  ? "bg-violet-500/20 text-violet-300 border border-violet-400/40 animate-pulse"
                  : isComplete
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-white/[0.03] text-zinc-600 border border-white/[0.05]"
              }`}
            >
              {isComplete && <CheckCircle2 className="w-3 h-3" />}
              {isCurrent && <Sparkles className="w-3 h-3" />}
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Run Overview ───

function RunOverview({ run }: { run: NoveltyRun }) {
  const budgetPct = run.budgetSecondsTotal > 0
    ? Math.round((run.budgetSecondsRemaining / run.budgetSecondsTotal) * 100)
    : 0;
  const isRunning = run.status === "running";
  const config = run.algorithmConfig;
  const params = config?.params;

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Run Overview</h3>
          {config && <PresetBadge preset={config.preset} mode={config.mode} />}
        </div>
        <div className="flex items-center gap-3">
          {config?.focus != null && (
            <FocusIndicator focus={config.focus} />
          )}
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            isRunning ? "bg-violet-500/20 text-violet-300" : "bg-emerald-500/15 text-emerald-400"
          }`}>
            {run.status}
          </span>
        </div>
      </div>
      <p className="text-sm text-zinc-200 mb-3">{run.problem}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Cycle" value={`${run.currentCycle} / ${run.maxCycles}`} />
        <Stat label="Budget" value={`${budgetPct}%`} sub={`${run.budgetSecondsRemaining}s left`} />
        <Stat label="Pivots" value={`${run.strategyPivotsUsed} / ${run.strategyPivotsMax}`} />
        <Stat label="Time Scale" value={run.timeScale} />
      </div>

      {/* Tunable parameter stats */}
      {params && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
          <ParamStat label="Problem Conn." param="problemConnection" value={params.problemConnection} />
          <ParamStat label="Selection" param="selectionPressure" value={params.selectionPressure} />
          <ParamStat label="Domain Div." param="domainDiversity" value={params.domainDiversity} />
          <ParamStat label="Gen. Temp." param="generativeTemperature" value={params.generativeTemperature} />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white/[0.03] rounded-lg p-2">
      <div className="text-[13px] text-zinc-500 uppercase tracking-wider">{label}</div>
      <div className="text-sm font-mono text-zinc-200">{value}</div>
      {sub && <div className="text-[13px] text-zinc-500">{sub}</div>}
    </div>
  );
}

function ParamStat({ label, param, value }: { label: string; param: string; value: number | string | undefined }) {
  if (value == null) return null;
  const num = typeof value === "number" ? value : parseFloat(String(value));
  const display = isNaN(num) ? String(value) : num.toFixed(2);

  // Color from violet (low) through zinc (mid) to amber (high) for 0-1 params
  const color = isNaN(num) ? "text-zinc-300"
    : num <= 0.3 ? "text-violet-400"
    : num <= 0.7 ? "text-zinc-300"
    : "text-amber-400";

  return (
    <div className="bg-white/[0.03] rounded-lg p-2">
      <div className="flex items-center gap-1">
        <SlidersHorizontal className="w-2.5 h-2.5 text-zinc-600" />
        <div className="text-[13px] text-zinc-500 uppercase tracking-wider truncate">{label}</div>
      </div>
      <div className={`text-sm font-mono ${color}`}>{display}</div>
    </div>
  );
}

// ─── Fitness Trajectory (HTML table) ───

function FitnessTrajectory({ trajectory }: { trajectory: FitnessEntry[] }) {
  if (!trajectory.length) return null;

  const maxTop = Math.max(...trajectory.map((t) => t.topScore));

  function scoreColor(score: number): string {
    if (score >= 80) return "#34d399"; // emerald-400
    if (score >= 60) return "#a78bfa"; // violet-400
    if (score >= 40) return "#fbbf24"; // amber-400
    return "#f87171"; // red-400
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Fitness Trajectory</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-zinc-500 border-b border-white/[0.06]">
              <th className="text-left py-1.5 pr-3 font-medium">Cycle</th>
              <th className="text-right py-1.5 px-2 font-medium">Avg</th>
              <th className="text-right py-1.5 px-2 font-medium">Top</th>
              <th className="text-right py-1.5 px-2 font-medium">Diversity</th>
              <th className="text-right py-1.5 px-2 font-medium">In</th>
              <th className="text-right py-1.5 px-2 font-medium">Out</th>
              <th className="text-right py-1.5 pl-2 font-medium">Survival</th>
            </tr>
          </thead>
          <tbody>
            {trajectory.map((row) => (
              <tr key={row.cycle} className="border-b border-white/[0.03]">
                <td className="py-1.5 pr-3 text-zinc-300 font-mono">{row.cycle}</td>
                <td className="py-1.5 px-2 text-right font-mono" style={{ color: scoreColor(row.avgScore) }}>
                  {row.avgScore.toFixed(1)}
                </td>
                <td className="py-1.5 px-2 text-right font-mono" style={{ color: scoreColor(row.topScore) }}>
                  <span className="inline-flex items-center gap-1">
                    {row.topScore.toFixed(1)}
                    {row.topScore === maxTop && <span className="text-amber-400">*</span>}
                  </span>
                </td>
                <td className="py-1.5 px-2 text-right font-mono text-zinc-400">{row.diversityIndex.toFixed(2)}</td>
                <td className="py-1.5 px-2 text-right font-mono text-zinc-400">{row.ideasIn}</td>
                <td className="py-1.5 px-2 text-right font-mono text-zinc-400">{row.ideasOut}</td>
                <td className="py-1.5 pl-2 text-right font-mono" style={{
                  color: row.survivalRate >= 0.5 ? "#34d399" : "#fbbf24",
                }}>
                  {(row.survivalRate * 100).toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Checkpoint Status ───

function CheckpointStatus({ run }: { run: NoveltyRun }) {
  const { a, b } = run.checkpoints;

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Checkpoints</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className={`rounded-lg p-3 border ${
          a.status === "PASS" ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"
        }`}>
          <div className="flex items-center gap-1.5 mb-1">
            {a.status === "PASS" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-red-400" />
            )}
            <span className="text-xs font-medium text-zinc-300">Checkpoint A</span>
          </div>
          <div className="text-lg font-mono text-zinc-200">{a.percentage?.toFixed(1)}%</div>
          <div className="text-[13px] text-zinc-500">Cycle {a.cycle}</div>
        </div>
        <div className={`rounded-lg p-3 border ${
          b.status === "PASS" ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"
        }`}>
          <div className="flex items-center gap-1.5 mb-1">
            {b.status === "PASS" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-red-400" />
            )}
            <span className="text-xs font-medium text-zinc-300">Checkpoint B</span>
          </div>
          <div className="text-lg font-mono text-zinc-200">
            {b.currentAvg?.toFixed(1)} <span className="text-xs text-zinc-500">vs</span> {b.previousAvg?.toFixed(1)}
          </div>
          <div className="text-[13px] text-zinc-500">Cycle {b.cycle}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Top Candidates ───

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color =
    value >= 85 ? "bg-emerald-400" :
    value >= 70 ? "bg-violet-400" :
    value >= 55 ? "bg-amber-400" : "bg-red-400";

  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-zinc-500 w-16 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[13px] font-mono text-zinc-400 w-6 text-right">{value}</span>
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: NoveltyCandidate }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold">
            {candidate.rank}
          </span>
          <h4 className="text-sm font-medium text-zinc-200">{candidate.title}</h4>
        </div>
        <span className="text-lg font-mono text-emerald-400">{candidate.compositeScore.toFixed(1)}</span>
      </div>
      <p className="text-xs text-zinc-400 mb-3 leading-relaxed">{candidate.description}</p>

      <div className="space-y-1.5 mb-3">
        <ScoreBar label="Feasibility" value={candidate.scores.feasibility} />
        <ScoreBar label="Novelty" value={candidate.scores.novelty} />
        <ScoreBar label="Impact" value={candidate.scores.impact} />
        <ScoreBar label="Elegance" value={candidate.scores.elegance} />
      </div>

      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {candidate.lineage.map((l, i) => (
          <span key={i} className="px-1.5 py-0.5 rounded bg-white/[0.05] text-[13px] font-mono text-zinc-500">
            {l}
          </span>
        ))}
        <span className="text-[13px] text-zinc-600 ml-1">conf {(candidate.confidence * 100).toFixed(0)}%</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[14px]">
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2">
          <div className="text-emerald-400 font-medium mb-0.5">For</div>
          <div className="text-zinc-400 leading-relaxed">{candidate.forIt}</div>
        </div>
        <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-2">
          <div className="text-red-400 font-medium mb-0.5">Against</div>
          <div className="text-zinc-400 leading-relaxed">{candidate.againstIt}</div>
        </div>
      </div>
    </div>
  );
}

function TopCandidates({ candidates }: { candidates: NoveltyCandidate[] }) {
  if (!candidates.length) return null;

  return (
    <div>
      <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Top Candidates</h3>
      <div className="space-y-3">
        {candidates.map((c) => (
          <CandidateCard key={c.rank} candidate={c} />
        ))}
      </div>
    </div>
  );
}

// ─── Domain Fertility ───

function DomainFertilityTable({ domains }: { domains: DomainFertility[] }) {
  if (!domains.length) return null;

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Domain Fertility</h3>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-zinc-500 border-b border-white/[0.06]">
            <th className="text-left py-1.5 pr-3 font-medium">Pairing</th>
            <th className="text-right py-1.5 px-2 font-medium">Avg Score</th>
            <th className="text-right py-1.5 px-2 font-medium">Count</th>
            <th className="text-right py-1.5 pl-2 font-medium">Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((d) => (
            <tr key={d.pairing} className="border-b border-white/[0.03]">
              <td className="py-1.5 pr-3 text-zinc-300 font-mono">{d.pairing}</td>
              <td className="py-1.5 px-2 text-right font-mono" style={{
                color: d.avgScore >= 70 ? "#34d399" : d.avgScore >= 50 ? "#a78bfa" : "#fbbf24",
              }}>
                {d.avgScore.toFixed(1)}
              </td>
              <td className="py-1.5 px-2 text-right font-mono text-zinc-400">{d.count}</td>
              <td className="py-1.5 pl-2 text-right font-mono" style={{
                color: d.multiplier >= 2.0 ? "#34d399" : d.multiplier >= 1.0 ? "#a78bfa" : "#f87171",
              }}>
                {d.multiplier.toFixed(1)}x
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Empty State ───

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Sparkles className="w-10 h-10 text-zinc-600 mb-4" />
      <h3 className="text-sm font-medium text-zinc-400 mb-1">No novelty runs yet</h3>
      <p className="text-xs text-zinc-600">
        Use <code className="px-1.5 py-0.5 rounded bg-white/[0.05] text-violet-400">/create-novelty</code> to start one.
      </p>
    </div>
  );
}

// ─── Single Run View ───

function NoveltyRunView({ run }: { run: NoveltyRun }) {
  return (
    <div className="space-y-4">
      <PhasePipeline run={run} />
      <RunOverview run={run} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FitnessTrajectory trajectory={run.fitnessTrajectory} />
        <CheckpointStatus run={run} />
      </div>
      <TopCandidates candidates={run.candidates} />
      <DomainFertilityTable domains={run.domainFertility} />
    </div>
  );
}

// ─── Main Dashboard ───

export default function NoveltyDashboard() {
  const { data, isLoading, error } = useNoveltyState();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-2 text-zinc-500 text-sm">
          <Clock className="w-4 h-4 animate-spin" />
          Loading novelty state...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-2 text-amber-400 text-sm">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      </div>
    );
  }

  const runs = data?.runs ?? [];

  if (runs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {runs.map((run) => (
        <NoveltyRunView key={run.id} run={run} />
      ))}
    </div>
  );
}
