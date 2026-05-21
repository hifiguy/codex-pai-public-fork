"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Lightbulb,
  FlaskConical,
  Beaker,
  Trophy,
  Cpu,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import EmptyStateGuide from "@/components/EmptyStateGuide";

// ─── Types ───

interface LadderEntry {
  id: string;
  title: string;
  status: string;
  created: string;
}

interface PipelineData {
  sources: LadderEntry[];
  ideas: LadderEntry[];
  hypotheses: LadderEntry[];
  experiments: LadderEntry[];
  algorithms: LadderEntry[];
  results: LadderEntry[];
}

// ─── Helpers ───

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-zinc-500",
  active: "bg-emerald-500",
  testing: "bg-amber-500",
  complete: "bg-cyan-500",
  archived: "bg-zinc-600",
};

function statusDot(status: string) {
  const color = STATUS_COLORS[status] || "bg-red-500";
  return <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />;
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.substring(0, idx).trim();
    const value = line.substring(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (key && value && !key.startsWith(" ")) {
      result[key] = value;
    }
  }
  return result;
}

// ─── Data Loading ───

async function loadLadderData(): Promise<PipelineData | null> {
  try {
    const resp = await fetch("/api/ladder");
    if (resp.ok) return resp.json();
  } catch {
    // API not available, return null
  }
  return null;
}

// ─── Pipeline Stage Card ───

function StageCard({
  icon: Icon,
  label,
  prefix,
  entries,
  color,
}: {
  icon: typeof BookOpen;
  label: string;
  prefix: string;
  entries: LadderEntry[];
  color: string;
}) {
  const byStatus = entries.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={16} className="text-white" />
        </div>
        <div>
          <div className="text-sm font-medium text-zinc-200">{label}</div>
          <div className="text-xs text-zinc-500">{prefix}-</div>
        </div>
        <div className="ml-auto text-2xl font-bold text-zinc-300 tabular-nums">
          {entries.length}
        </div>
      </div>

      {/* Status breakdown */}
      {Object.keys(byStatus).length > 0 && (
        <div className="flex gap-3">
          {Object.entries(byStatus).map(([status, count]) => (
            <div key={status} className="flex items-center gap-1.5">
              {statusDot(status)}
              <span className="text-xs text-zinc-500">
                {count} {status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Recent entries */}
      {entries.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-white/[0.04]">
          {entries.slice(0, 3).map((e) => (
            <div key={e.id} className="flex items-center gap-2">
              {statusDot(e.status)}
              <span className="text-xs text-zinc-500 font-mono">{e.id}</span>
              <span className="text-sm text-zinc-400 truncate">{e.title}</span>
            </div>
          ))}
          {entries.length > 3 && (
            <div className="text-xs text-zinc-600 pl-4">
              +{entries.length - 3} more
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Pipeline Flow Arrow ───

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-1">
      <ArrowRight size={16} className="text-zinc-600" />
    </div>
  );
}

// ─── Main Page ───

export default function LadderPage() {
  const [data, setData] = useState<PipelineData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    async function poll() {
      const result = await loadLadderData();
      if (result) {
        setData(result);
        setError(null);
      } else {
        setError("Ladder API not available");
      }
      setIsLoading(false);
    }

    poll();
    timer = setInterval(poll, 5000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500 text-sm">
          Loading Ladder pipeline...
        </div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <EmptyStateGuide
          section="Ladder"
          description="The improvement pipeline — code suggestions evaluated, ranked, and shipped. Populates as Ladder runs against your repos."
          hideInterview
          daPromptExample="help me run Ladder on a repo"
        />
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-white/[0.03] p-6 rounded-2xl mb-4 inline-block">
            <RefreshCw size={40} className="text-zinc-600" />
          </div>
          <p className="text-base font-medium text-zinc-400 mb-1">
            Ladder pipeline not connected
          </p>
          <p className="text-sm text-zinc-600">
            Start the Ladder API or add entries to your Ladder repo
          </p>
        </div>
      </div>
    );
  }

  const totalEntries =
    data.sources.length +
    data.ideas.length +
    data.hypotheses.length +
    data.experiments.length +
    data.algorithms.length +
    data.results.length;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-200">
            Ladder Pipeline
          </h2>
          <p className="text-sm text-zinc-500">
            {totalEntries} total entries across {6} stages
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <RefreshCw size={12} />
          Polling every 5s
        </div>
      </div>

      {/* Pipeline Flow Visualization */}
      <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-4">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3 uppercase tracking-wide font-medium">
          <span>Pipeline Flow</span>
          <span className="flex items-center gap-1">
            <RefreshCw size={10} />
            Loop
          </span>
        </div>

        {/* Flow: Sources → Ideas → Hypotheses → Experiments → Results */}
        <div className="grid grid-cols-9 items-center gap-1">
          <div className="col-span-1 text-center">
            <div className="bg-blue-500/20 text-blue-400 rounded-lg p-2 text-xs font-medium">
              Sources
              <div className="text-lg font-bold">{data.sources.length}</div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <ArrowRight size={14} className="text-zinc-600" />
          </div>
          <div className="col-span-1 text-center">
            <div className="bg-amber-500/20 text-amber-400 rounded-lg p-2 text-xs font-medium">
              Ideas
              <div className="text-lg font-bold">{data.ideas.length}</div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <ArrowRight size={14} className="text-zinc-600" />
          </div>
          <div className="col-span-1 text-center">
            <div className="bg-purple-500/20 text-purple-400 rounded-lg p-2 text-xs font-medium">
              Hypotheses
              <div className="text-lg font-bold">{data.hypotheses.length}</div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <ArrowRight size={14} className="text-zinc-600" />
          </div>
          <div className="col-span-1 text-center">
            <div className="bg-emerald-500/20 text-emerald-400 rounded-lg p-2 text-xs font-medium">
              Experiments
              <div className="text-lg font-bold">
                {data.experiments.length}
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <ArrowRight size={14} className="text-zinc-600" />
          </div>
          <div className="col-span-1 text-center">
            <div className="bg-cyan-500/20 text-cyan-400 rounded-lg p-2 text-xs font-medium">
              Results
              <div className="text-lg font-bold">{data.results.length}</div>
            </div>
          </div>
        </div>

        {/* Loop arrow */}
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center gap-1 text-xs text-zinc-600">
            <RefreshCw size={10} />
            Results feed back as Sources
          </div>
        </div>
      </div>

      {/* Stage Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StageCard
          icon={BookOpen}
          label="Sources"
          prefix="SR"
          entries={data.sources}
          color="bg-blue-500/30"
        />
        <StageCard
          icon={Lightbulb}
          label="Ideas"
          prefix="ID"
          entries={data.ideas}
          color="bg-amber-500/30"
        />
        <StageCard
          icon={Beaker}
          label="Hypotheses"
          prefix="HY"
          entries={data.hypotheses}
          color="bg-purple-500/30"
        />
        <StageCard
          icon={FlaskConical}
          label="Experiments"
          prefix="EX"
          entries={data.experiments}
          color="bg-emerald-500/30"
        />
        <StageCard
          icon={Cpu}
          label="Algorithms"
          prefix="AL"
          entries={data.algorithms}
          color="bg-orange-500/30"
        />
        <StageCard
          icon={Trophy}
          label="Results"
          prefix="RE"
          entries={data.results}
          color="bg-cyan-500/30"
        />
      </div>
    </div>
  );
}
