"use client";
import { useEffect, useState } from "react";
import { Briefcase, FolderOpen, ExternalLink, GitBranch, Cpu } from "lucide-react";
import EmptyStateGuide from "@/components/EmptyStateGuide";

interface AlgorithmSession {
  slug: string;
  task: string;
  phase: string;
  progress?: string;
  effort?: string;
}

interface WorkData {
  projects?: Array<{ name: string; path: string; url: string }>;
  currentFocus?: string;
  currentProject?: string;
  activeWorkstreams?: string;
  algorithmSessions?: AlgorithmSession[];
}

// Algorithm phase hues use the v8 dimension palette.
const PHASE_COLOR: Record<string, string> = {
  OBSERVE: "#7DD3FC",
  THINK: "#7DD3FC",
  PLAN: "#B794F4",
  BUILD: "#F87B7B",
  EXECUTE: "#E0A458",
  VERIFY: "#2DD4BF",
  LEARN: "#34D399",
  COMPLETE: "#34D399",
  DEFERRED: "#A8A5C8",
};

// Effort pill accents use green for easy, gold for heavy, coral for heaviest.
const EFFORT_COLOR: Record<string, string> = {
  fast: "#34D399",
  standard: "#34D399",
  advanced: "#E0A458",
  deep: "#E0A458",
  extended: "#E0A458",
  comprehensive: "#F87B7B",
};

function progressPct(p?: string): number {
  if (!p) return 0;
  const m = p.match(/(\d+)\s*\/\s*(\d+)/);
  if (!m) return 0;
  const [, done, total] = m;
  const d = parseInt(done, 10);
  const t = parseInt(total, 10);
  return t > 0 ? Math.round((d / t) * 100) : 0;
}

function Banner({
  focus,
  current,
  streams,
  sessionCount,
  projectCount,
}: {
  focus?: string;
  current?: string;
  streams?: string;
  sessionCount: number;
  projectCount: number;
}) {
  return (
    <section className="telos-card pulse" style={{ cursor: "default", borderLeft: "3px solid #F87B7B" }}>
      <div className="flex items-start gap-6 flex-wrap">
        <Briefcase className="w-10 h-10 shrink-0" color="#F87B7B" />
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest muted mb-2" style={{ color: "#E0A458" }}>Current Focus</div>
          {focus ? (
            <p className="text-2xl lg:text-3xl font-medium leading-snug" data-sensitive>
              {focus}
            </p>
          ) : (
            <p className="text-xl italic muted">No current focus set in TELOS/CURRENT.md</p>
          )}
          {current && (
            <p className="text-sm mt-3 muted" data-sensitive>
              <span>Primary project:</span> {current}
            </p>
          )}
          {streams && (
            <p className="text-xs mt-2 muted" data-sensitive>
              Streams: {streams}
            </p>
          )}
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="pill pill-creative">{sessionCount} active sessions</span>
            <span className="pill pill-money">{projectCount} projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlgorithmSessions({ sessions }: { sessions?: AlgorithmSession[] }) {
  if (!sessions || sessions.length === 0) return null;
  return (
    <section>
      <h2 className="text-sm font-medium uppercase tracking-widest muted mb-4 flex items-center gap-2">
        <Cpu className="w-4 h-4" color="#7DD3FC" /> Algorithm Sessions
        <span className="text-xs muted font-normal">({sessions.length})</span>
      </h2>
      <div className="telos-card" style={{ cursor: "default", padding: 0 }}>
        <div>
          {sessions.slice(0, 10).map((s, i) => {
            const phase = (s.phase || "unknown").toUpperCase();
            const phaseColor = PHASE_COLOR[phase] ?? "#A8A5C8";
            const pct = progressPct(s.progress);
            const effort = s.effort?.toLowerCase();
            const effortColor = effort ? EFFORT_COLOR[effort] ?? "#A8A5C8" : null;
            return (
              <div
                key={s.slug}
                className="flex items-center gap-4 px-5 py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid #1A2A4D" }}
                data-sensitive
              >
                <span
                  className="pill shrink-0"
                  style={{
                    width: 90,
                    textAlign: "center",
                    color: phaseColor,
                    borderColor: phaseColor,
                  }}
                >
                  {phase}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate" title={s.task}>
                    {s.task}
                  </div>
                  <div className="text-[10px] font-mono mt-0.5 truncate muted">{s.slug}</div>
                </div>
                <div className="w-28 shrink-0">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: pct + "%" }} />
                  </div>
                  <div className="text-[10px] text-right tabular-nums mt-1 muted">{s.progress}</div>
                </div>
                {s.effort && effortColor && (
                  <span
                    className="pill shrink-0"
                    style={{ color: effortColor, borderColor: effortColor }}
                  >
                    {s.effort}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({ projects }: { projects?: Array<{ name: string; path: string; url: string }> }) {
  if (!projects || projects.length === 0) return null;
  return (
    <section>
      <h2 className="text-sm font-medium uppercase tracking-widest muted mb-4 flex items-center gap-2">
        <GitBranch className="w-4 h-4" color="#E0A458" /> Projects
        <span className="text-xs muted font-normal">({projects.length})</span>
      </h2>
      <div className="prob-grid">
        {projects.map((p) => {
          const isPublic = !p.url.toLowerCase().includes("private");
          const href = isPublic && p.url.startsWith("github.com") ? `https://${p.url}` : undefined;
          return (
            <div key={p.name} className="telos-card dim-creative" style={{ cursor: "default", borderLeft: "3px solid #F87B7B" }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FolderOpen className="w-4 h-4 shrink-0" color="#F87B7B" />
                  <h3 className="text-sm font-medium truncate">{p.name}</h3>
                </div>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0"
                    style={{ color: "#E0A458" }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="pill pill-creative shrink-0">private</span>
                )}
              </div>
              <div className="text-[11px] font-mono mt-1 truncate muted" data-sensitive title={p.path}>
                {p.path}
              </div>
              <div className="text-[11px] mt-1 truncate muted" data-sensitive title={p.url}>
                {p.url}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function WorkPage() {
  const [data, setData] = useState<WorkData | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/life/work")
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
          <h2 className="font-medium" style={{ color: "#F87171" }}>
            Failed to load work
          </h2>
          <p className="text-sm" style={{ color: "#FCA5A5" }}>{error}</p>
        </div>
      </div>
    );
  }
  if (!data) return <div className="p-8 text-sm muted">Loading Work...</div>;

  const sessionCount = data.algorithmSessions?.length ?? 0;
  const projectCount = data.projects?.length ?? 0;
  const showEmptyGuide = sessionCount === 0 && projectCount === 0 && !data.currentFocus && !data.currentProject;

  return (
    <div className="p-6 lg:p-8 max-w-[1920px] mx-auto space-y-6">
      {showEmptyGuide && (
        <EmptyStateGuide
          section="Work Hub"
          description="Active tasks, projects, and team work. Wire it up to GitHub Issues, Linear, ClickUp, or another PM tool to populate."
          hideInterview
          daPromptExample="set up my work hub against my project tracker"
        />
      )}
      <Banner
        focus={data.currentFocus}
        current={data.currentProject}
        streams={data.activeWorkstreams}
        sessionCount={data.algorithmSessions?.length ?? 0}
        projectCount={data.projects?.length ?? 0}
      />
      <AlgorithmSessions sessions={data.algorithmSessions} />
      <Projects projects={data.projects} />
    </div>
  );
}
