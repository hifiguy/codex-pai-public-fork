"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { wikiPageUrl } from "@/lib/wiki-links";
import KnowledgeGraph from "@/components/wiki/KnowledgeGraph";
import { Network, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface GraphData {
  nodes: Array<{
    id: string;
    title: string;
    category: string;
    quality?: number;
    backlinkCount: number;
  }>;
  edges: Array<{
    source: string;
    target: string;
  }>;
}

const CATEGORIES = [
  { key: "system-doc", label: "System", color: "#22d3ee" },
  { key: "person", label: "People", color: "#38bdf8" },
  { key: "company", label: "Companies", color: "#fbbf24" },
  { key: "idea", label: "Ideas", color: "#a78bfa" },
];

export default function GraphPage() {
  const router = useRouter();
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery<GraphData>({
    queryKey: ["wiki-graph"],
    queryFn: async () => {
      const res = await fetch("/api/wiki/graph");
      if (!res.ok) throw new Error("Failed to fetch graph data");
      return res.json();
    },
    staleTime: 60_000,
  });

  const handleNodeClick = (slug: string, category: string) => {
    router.push(wikiPageUrl(category, slug));
  };

  const toggleCategory = (key: string) => {
    setHiddenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xs text-slate-600" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
          Loading graph...
        </div>
      </div>
    );
  }

  const visibleCount = data.nodes.filter((n) => !hiddenCategories.has(n.category)).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800/50 bg-slate-950/80 shrink-0">
        <Network className="w-4 h-4 text-violet-400" />
        <h1
          className="text-sm font-medium text-white tracking-wide"
          style={{ fontFamily: "'advocate-c14', sans-serif" }}
        >
          KNOWLEDGE GRAPH
        </h1>
        <span className="text-[13px] text-slate-600 ml-1" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
          {visibleCount} nodes · {data.edges.length} edges
        </span>

        {/* Search */}
        <div className="ml-4 relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes..."
            className="pl-7 pr-3 py-1 text-[14px] w-48 rounded-md bg-slate-900/80 border border-slate-800/50 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-slate-600"
            style={{ fontFamily: "'concourse-t3', sans-serif" }}
          />
        </div>

        {/* Category toggles */}
        <div className="ml-auto flex items-center gap-3">
          {CATEGORIES.map((cat) => {
            const hidden = hiddenCategories.has(cat.key);
            const count = data.nodes.filter((n) => n.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => toggleCategory(cat.key)}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-0.5 rounded transition-all",
                  hidden ? "opacity-30 hover:opacity-50" : "opacity-100 hover:bg-white/5"
                )}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{ backgroundColor: hidden ? "#475569" : cat.color }}
                />
                <span
                  className={cn("text-[13px]", hidden ? "text-slate-600" : "text-slate-400")}
                  style={{ fontFamily: "'concourse-t3', sans-serif" }}
                >
                  {cat.label}
                </span>
                <span
                  className="text-[13px] text-slate-600 tabular-nums"
                  style={{ fontFamily: "'concourse-t3', sans-serif" }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Help hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[13px] text-slate-600 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800/30 pointer-events-none" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
        click node to focus · click again to open · click background to reset · scroll to zoom
      </div>

      {/* Graph */}
      <div className="flex-1 overflow-hidden">
        <KnowledgeGraph
          nodes={data.nodes}
          edges={data.edges}
          onNodeClick={handleNodeClick}
          hiddenCategories={hiddenCategories}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
