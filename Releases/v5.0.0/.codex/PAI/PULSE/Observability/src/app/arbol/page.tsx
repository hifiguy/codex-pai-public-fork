"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Cloud, ArrowLeft, Box, GitBranch, Timer } from "lucide-react";
import Link from "next/link";
import EmptyStateGuide from "@/components/EmptyStateGuide";

interface ArbolWorker {
  name: string;
  type: "action" | "pipeline" | "flow";
  cfName: string | null;
  lastModified: string;
}

interface ArbolDetail {
  name: string;
  type: "action" | "pipeline" | "flow";
  wrangler: string | null;
  source: string | null;
  lastModified: string;
}

const TYPE_CONFIG = {
  action: { icon: Box, color: "var(--creative)", label: "Action", prefix: "A_", dim: "creative" },
  pipeline: { icon: GitBranch, color: "var(--freedom)", label: "Pipeline", prefix: "P_", dim: "freedom" },
  flow: { icon: Timer, color: "var(--rhythms)", label: "Flow", prefix: "F_", dim: "rhythms" },
} as const;

function ArbolLanding({
  workers,
  actions,
  pipelines,
  flows,
}: {
  workers: ArbolWorker[];
  actions: number;
  pipelines: number;
  flows: number;
}) {
  const grouped = {
    action: workers.filter((w) => w.type === "action"),
    pipeline: workers.filter((w) => w.type === "pipeline"),
    flow: workers.filter((w) => w.type === "flow"),
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {workers.length === 0 && (
        <EmptyStateGuide
          section="Arbol Pipelines"
          description="Cloud-side actions and pipelines that compose into multi-step workflows — think Unix pipes for cron-driven AI work."
          hideInterview
          daPromptExample="help me set up my first Arbol action"
        />
      )}
      <div className="telos-card goal-card dim-relationships" style={{ cursor: "default" }}>
        <div className="goal-title">
          <Cloud className="w-4 h-4 shrink-0" style={{ color: "var(--relationships)" }} />
          <span>Arbol</span>
          <span className="pill pill-relationships">relationships</span>
        </div>
        <p className="mt-1 max-w-3xl" style={{ color: "#D6E1F5", fontSize: 14 }}>
          Cloud execution layer on Cloudflare Workers. Three composable primitives: Actions
          (single units of work), Pipelines (chained action sequences), and Flows (scheduled
          source-to-destination systems).
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "100%" }} />
        </div>
        <div className="goal-foot">
          <div className="goal-dims">
            <span className="pill pill-creative">actions</span>
            <span className="pill pill-freedom">pipelines</span>
            <span className="pill pill-rhythms">flows</span>
          </div>
          <span className="goal-delta flat-muted">cloud mesh</span>
        </div>
      </div>

      <div className="metric-grid">
        <div className="telos-card metric" style={{ cursor: "default" }}>
          <div className="metric-top">
            <Cloud className="w-4 h-4" style={{ color: "var(--relationships)" }} />
            <span className="metric-label muted">Total</span>
          </div>
          <div className="metric-row">
            <span className="metric-val mono">{workers.length}</span>
          </div>
        </div>
        {(["action", "pipeline", "flow"] as const).map((type) => {
          const cfg = TYPE_CONFIG[type];
          const Icon = cfg.icon;
          const count = type === "action" ? actions : type === "pipeline" ? pipelines : flows;
          return (
            <div key={type} className="telos-card metric" style={{ cursor: "default" }}>
              <div className="metric-top">
                <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                <span className="metric-label muted">{cfg.label}s</span>
              </div>
              <div className="metric-row">
                <span className="metric-val mono">{count}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["action", "pipeline", "flow"] as const).map((type) => {
          const cfg = TYPE_CONFIG[type];
          const Icon = cfg.icon;
          const typeWorkers = grouped[type];

          return (
            <div key={type}>
              <h2
                className="text-sm font-medium uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: cfg.color }}
              >
                <Icon className="w-4 h-4" />
                {cfg.label}s
                <span className="muted" style={{ fontSize: 12 }}>({typeWorkers.length})</span>
              </h2>
              <div className="space-y-2">
                {typeWorkers.map((worker) => (
                  <Link
                    key={worker.name}
                    href={`/arbol?name=${encodeURIComponent(worker.name)}`}
                    className="telos-card"
                    style={{ padding: "10px 14px", cursor: "pointer", borderLeft: `3px solid ${cfg.color}` }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: cfg.color }} />
                      <span className="mono truncate" style={{ color: "#E8EFFF", fontSize: 13 }}>
                        {worker.name.replace(/^_(A|P|F)_/, "")}
                      </span>
                      <span className={`pill pill-${cfg.dim} ml-auto`}>{cfg.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArbolDetailView({ detail }: { detail: ArbolDetail }) {
  const cfg = TYPE_CONFIG[detail.type];
  const Icon = cfg.icon;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/arbol" style={{ color: "#9BB0D6" }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" style={{ color: cfg.color }} />
            <span
              className={`pill pill-${cfg.dim}`}
              style={{ letterSpacing: 1.5 }}
            >
              {cfg.label}
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mt-1" style={{ color: "#E8EFFF" }}>
            {detail.name}
          </h1>
          <p className="mt-0.5" style={{ color: "#9BB0D6", fontSize: 13 }}>
            {new Date(detail.lastModified).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {detail.wrangler && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--freedom)" }}>
            wrangler.jsonc
          </h2>
          <div className="telos-card" style={{ cursor: "default", padding: 0, overflow: "hidden" }}>
            <pre
              className="text-xs mono overflow-x-auto leading-relaxed p-4"
              style={{ background: "#060B1A", color: "#D6E1F5", margin: 0 }}
            >
              <code>{detail.wrangler}</code>
            </pre>
          </div>
        </div>
      )}

      {detail.source && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--creative)" }}>
            src/index.ts
          </h2>
          <div className="telos-card" style={{ cursor: "default", padding: 0, overflow: "hidden" }}>
            <pre
              className="text-xs mono overflow-x-auto max-h-[600px] overflow-y-auto leading-relaxed p-4"
              style={{ background: "#060B1A", color: "#D6E1F5", margin: 0 }}
            >
              <code>{detail.source}</code>
            </pre>
          </div>
        </div>
      )}

      {!detail.wrangler && !detail.source && (
        <p style={{ color: "#9BB0D6", fontSize: 14 }}>No readable files found in this worker.</p>
      )}
    </div>
  );
}

function ArbolPageInner() {
  const searchParams = useSearchParams();
  const workerName = searchParams.get("name");
  const isViewing = !!workerName;

  const { data: listData } = useQuery<{
    workers: ArbolWorker[];
    total: number;
    actions: number;
    pipelines: number;
    flows: number;
  }>({
    queryKey: ["arbol-list"],
    queryFn: async () => {
      const res = await fetch("/api/wiki/arbol");
      if (!res.ok) throw new Error("Failed to fetch arbol workers");
      return res.json();
    },
    staleTime: 30_000,
    enabled: !isViewing,
  });

  const { data: detailData } = useQuery<ArbolDetail>({
    queryKey: ["arbol-detail", workerName],
    queryFn: async () => {
      const res = await fetch(`/api/wiki/arbol/${encodeURIComponent(workerName!)}`);
      if (!res.ok) throw new Error("Failed to fetch worker");
      return res.json();
    },
    enabled: isViewing,
  });

  if (isViewing && detailData) {
    return <ArbolDetailView detail={detailData} />;
  }

  if (!isViewing && listData) {
    return (
      <ArbolLanding
        workers={listData.workers}
        actions={listData.actions}
        pipelines={listData.pipelines}
        flows={listData.flows}
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div style={{ color: "#6B80AB", fontSize: 14 }}>Loading...</div>
    </div>
  );
}

export default function ArbolPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div style={{ color: "#6B80AB", fontSize: 14 }}>Loading...</div>
        </div>
      }
    >
      <ArbolPageInner />
    </Suspense>
  );
}
