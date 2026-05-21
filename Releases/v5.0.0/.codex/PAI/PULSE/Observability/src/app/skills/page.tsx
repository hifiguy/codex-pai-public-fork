"use client";

import { Suspense, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import MarkdownRenderer from "@/components/wiki/MarkdownRenderer";
import { Zap, ArrowLeft, Pencil, Check, X, Loader2 } from "lucide-react";
import Link from "next/link";

interface SkillMeta {
  name: string;
  description: string;
  effort: string;
  hasWorkflows: boolean;
  lastModified: string;
}

interface SkillDetail {
  name: string;
  description: string;
  effort: string;
  content: string;
  filePath: string;
  lastModified: string;
  wordCount: number;
}

function effortTone(effort: string): "green-up" | "flat-muted" | "coral-down" {
  if (effort === "easy" || effort === "low") return "green-up";
  if (effort === "hard" || effort === "high") return "coral-down";
  return "flat-muted";
}

function SkillsLanding({ skills }: { skills: SkillMeta[] }) {
  const privateSkills = skills.filter((s) => s.name.startsWith("_"));
  const publicSkills = skills.filter((s) => !s.name.startsWith("_"));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="telos-card goal-card dim-creative" style={{ cursor: "default" }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "#E8EFFF" }}>
          Skills
        </h1>
        <p className="mt-1 max-w-2xl" style={{ color: "#9BB0D6", fontSize: 14 }}>
          Domain-specific capabilities that activate on trigger phrases. Each skill bundles
          prompts, workflows, tools, and templates into a self-contained unit.
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "76%" }} />
        </div>
        <div className="goal-foot">
          <div className="goal-dims">
            <span className="pill pill-creative">creative</span>
            <span className="pill pill-health">easy</span>
            <span className="pill pill-relationships">workflows</span>
          </div>
          <span className="goal-delta flat-muted">skill library</span>
        </div>
      </div>

      <div className="metric-grid" style={{ gridTemplateColumns: "minmax(200px, 280px)" }}>
        <div className="telos-card metric" style={{ cursor: "default" }}>
          <div className="metric-top">
            <Zap className="w-4 h-4" style={{ color: "var(--creative)" }} />
            <span className="metric-label muted">Skills</span>
          </div>
          <div className="metric-row">
            <span className="metric-val mono">{skills.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2
            className="text-sm font-medium tracking-wider uppercase mb-3"
            style={{ color: "var(--creative)" }}
          >
            Public Skills ({publicSkills.length})
          </h2>
          <div className="goals-grid">
            {publicSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        <div>
          <h2
            className="text-sm font-medium tracking-wider uppercase mb-1"
            style={{ color: "var(--creative)" }}
          >
            Private Skills ({privateSkills.length})
          </h2>
          <p className="mb-3" style={{ color: "#6B80AB", fontSize: 13 }}>
            Prefixed with _ — personal integrations and platform-specific automations.
          </p>
          <div className="goals-grid">
            {privateSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: SkillMeta }) {
  const effortClass = effortTone(skill.effort);

  return (
    <Link
      href={`/skills?name=${encodeURIComponent(skill.name)}`}
      className="telos-card goal-card dim-creative"
    >
      <div className="goal-title">
        <Zap className="w-4 h-4 shrink-0" style={{ color: "var(--creative)" }} />
        <span style={{ color: "#E8EFFF" }}>{skill.name}</span>
      </div>
      <p style={{ color: "#9BB0D6", fontSize: 13, lineHeight: 1.5 }}>
        {skill.description.slice(0, 140)}
        {skill.description.length > 140 ? "…" : ""}
      </p>
      <div className="goal-foot">
        <div className="goal-dims">
          <span className={effortClass}>
            {skill.effort}
          </span>
          {skill.hasWorkflows && <span className="pill pill-relationships">workflows</span>}
        </div>
      </div>
    </Link>
  );
}

function SkillDetailView({ skill }: { skill: SkillDetail }) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(skill.content);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch(`/api/wiki/skills/${encodeURIComponent(skill.name)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skill-detail", skill.name] });
      setEditing(false);
    },
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href="/skills" style={{ color: "#9BB0D6" }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "#E8EFFF" }}>
              {skill.name}
            </h1>
            <p className="mt-0.5" style={{ color: "#9BB0D6", fontSize: 13 }}>
              {skill.wordCount} words ·{" "}
              {new Date(skill.lastModified).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button
                onClick={() => mutation.mutate(editContent)}
                disabled={mutation.isPending}
                className="pill flex items-center gap-1.5"
                style={{
                  padding: "6px 14px",
                  background: "rgba(52,211,153,0.18)",
                  color: "var(--health)",
                  border: "1px solid rgba(52,211,153,0.45)",
                  cursor: mutation.isPending ? "not-allowed" : "pointer",
                  opacity: mutation.isPending ? 0.6 : 1,
                }}
              >
                {mutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setEditContent(skill.content);
                }}
                className="pill flex items-center gap-1.5"
                style={{ padding: "6px 14px", cursor: "pointer" }}
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setEditing(true);
                setEditContent(skill.content);
              }}
              className="pill flex items-center gap-1.5"
              style={{ padding: "6px 14px", cursor: "pointer" }}
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {mutation.isError && (
        <div
          className="px-3 py-2 rounded-md"
          style={{
            background: "rgba(248,113,113,0.15)",
            border: "1px solid rgba(248,113,113,0.35)",
            color: "#F87171",
            fontSize: 13,
          }}
        >
          Failed to save changes.
        </div>
      )}

      {editing ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full h-[600px] rounded-lg p-4 text-sm mono resize-y"
          style={{ background: "#0F1A33", border: "1px solid #1A2A4D", color: "#E8EFFF", outline: "none" }}
          spellCheck={false}
        />
      ) : (
        <div className="telos-card" style={{ cursor: "default" }}>
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={skill.content} />
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsPageInner() {
  const searchParams = useSearchParams();
  const skillName = searchParams.get("name");
  const isViewing = !!skillName;

  const { data: listData } = useQuery<{ skills: SkillMeta[]; total: number }>({
    queryKey: ["skills-list"],
    queryFn: async () => {
      const res = await fetch("/api/wiki/skills");
      if (!res.ok) throw new Error("Failed to fetch skills");
      return res.json();
    },
    staleTime: 30_000,
    enabled: !isViewing,
  });

  const { data: detailData } = useQuery<SkillDetail>({
    queryKey: ["skill-detail", skillName],
    queryFn: async () => {
      const res = await fetch(`/api/wiki/skills/${encodeURIComponent(skillName!)}`);
      if (!res.ok) throw new Error("Failed to fetch skill");
      return res.json();
    },
    enabled: isViewing,
  });

  if (isViewing && detailData) {
    return <SkillDetailView skill={detailData} />;
  }

  if (!isViewing && listData) {
    return <SkillsLanding skills={listData.skills} />;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div style={{ color: "#6B80AB", fontSize: 14 }}>Loading...</div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div style={{ color: "#6B80AB", fontSize: 14 }}>Loading...</div>
        </div>
      }
    >
      <SkillsPageInner />
    </Suspense>
  );
}
