"use client";
import { useEffect, useState } from "react";
import {
  Activity,
  Heart,
  Apple,
  FlaskConical,
  Pill,
  Stethoscope,
  ClipboardList,
  FileText,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { FreshnessIndicator, type FreshnessData } from "@/components/FreshnessIndicator";
import EmptyStateGuide from "@/components/EmptyStateGuide";

interface HealthFile {
  name: string;
  sections: string[];
}

interface HealthData {
  files?: HealthFile[];
  freshness?: FreshnessData;
}

interface FileMeta {
  icon: LucideIcon;
  label: string;
  priority: number;
}

const FILE_META: Record<string, FileMeta> = {
  METRICS: { icon: Activity, label: "Metrics", priority: 1 },
  FITNESS: { icon: Heart, label: "Fitness", priority: 2 },
  NUTRITION: { icon: Apple, label: "Nutrition", priority: 3 },
  CONDITIONS: { icon: ClipboardList, label: "Conditions", priority: 4 },
  MEDICATIONS: { icon: Pill, label: "Medications", priority: 5 },
  PROVIDERS: { icon: Stethoscope, label: "Providers", priority: 6 },
  HISTORY: { icon: FileText, label: "History", priority: 7 },
};

function fileMeta(name: string): FileMeta {
  if (name.startsWith("lab_results")) {
    return {
      icon: FlaskConical,
      label: name.replace(/^lab_results_/, "Labs — "),
      priority: 0,
    };
  }
  return FILE_META[name.toUpperCase()] || { icon: FileText, label: name, priority: 99 };
}

function Banner({
  fileCount,
  labCount,
  freshness,
}: {
  fileCount: number;
  labCount: number;
  freshness?: FreshnessData;
}) {
  return (
    <section className="telos-card mission-card relative" style={{ cursor: "default" }}>
      <div className="absolute top-5 right-5 md:top-6 md:right-6 z-10">
        <FreshnessIndicator freshness={freshness} />
      </div>
      <div className="flex items-start gap-6 flex-wrap">
        <Activity className="w-10 h-10 shrink-0" color="#34D399" />
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest muted mb-2" style={{ color: "#34D399" }}>Health</div>
          <p className="text-2xl lg:text-3xl font-medium leading-snug">
            <span data-sensitive className="tabular-nums" style={{ color: "#34D399" }}>
              {fileCount}
            </span>{" "}
            tracked sources ·{" "}
            <span className="tabular-nums" style={{ color: "#2DD4BF" }} data-sensitive>
              {labCount}
            </span>{" "}
            lab panel{labCount === 1 ? "" : "s"}.
          </p>
          <p className="text-sm mt-2 flex items-center gap-2 muted">
            <Lock className="w-3.5 h-3.5" /> Fully private. Observer mode blurs all data below.
          </p>
        </div>
      </div>
    </section>
  );
}

function FileCard({ file }: { file: HealthFile }) {
  const meta = fileMeta(file.name);
  const Icon = meta.icon;
  return (
    <div
      className="telos-card dim-health"
      style={{ cursor: "default", borderLeft: "3px solid #34D399" }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="w-4 h-4 shrink-0" color="#34D399" />
          <h3 className="text-sm font-medium uppercase tracking-wider truncate">
            {meta.label}
          </h3>
        </div>
        <span className="pill pill-health shrink-0 tabular-nums">
          {file.sections.length} section{file.sections.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="space-y-1.5" data-sensitive>
        {file.sections.slice(0, 8).map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-xs muted">
            <span
              className="w-1 h-1 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: "#2DD4BF", opacity: 0.6 }}
            />
            <span className="line-clamp-2">{s}</span>
          </div>
        ))}
        {file.sections.length > 8 && (
          <div className="text-[10px] italic pt-1 muted">
            + {file.sections.length - 8} more
          </div>
        )}
      </div>
    </div>
  );
}

export default function HealthPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/life/health")
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);
  if (error) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div
          className="telos-card"
          style={{ cursor: "default", borderLeft: "3px solid #F87171" }}
        >
          <h2 className="font-medium" style={{ color: "#F87171" }}>Failed to load health</h2>
          <p className="text-sm" style={{ color: "#FCA5A5" }}>{error}</p>
        </div>
      </div>
    );
  }
  if (!data) return <div className="p-8 text-sm muted">Loading Health...</div>;

  const files = (data.files || [])
    .slice()
    .sort((a, b) => fileMeta(a.name).priority - fileMeta(b.name).priority);
  const labs = files.filter((f) => f.name.startsWith("lab_results"));
  const nonLabs = files.filter((f) => !f.name.startsWith("lab_results"));
  const isFreshInstall = files.length === 0;

  return (
    <div className="p-6 lg:p-8 max-w-[1920px] mx-auto space-y-6">
      {isFreshInstall && (
        <EmptyStateGuide
          section="Health Snapshots"
          description="Lab results, fitness data, nutrition tracking, and trends over time."
          userDir="HEALTH"
          daPromptExample="help me set up where my health data lives"
        />
      )}
      <Banner fileCount={files.length} labCount={labs.length} freshness={data.freshness} />
      {labs.length > 0 && (
        <section>
          <h2 className="text-sm font-medium uppercase tracking-widest muted mb-4 flex items-center gap-2">
            <FlaskConical className="w-4 h-4" color="#7DD3FC" /> Lab Panels
          </h2>
          <div className="prob-grid">
            {labs.map((f) => (
              <FileCard key={f.name} file={f} />
            ))}
          </div>
        </section>
      )}
      {nonLabs.length > 0 && (
        <section>
          <h2 className="text-sm font-medium uppercase tracking-widest muted mb-4" style={{ color: "#34D399" }}>
            Core Files
          </h2>
          <div className="prob-grid">
            {nonLabs.map((f) => (
              <FileCard key={f.name} file={f} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
