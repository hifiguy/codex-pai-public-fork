"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { wikiPageUrl } from "@/lib/wiki-links";
import KnowledgeGraph from "@/components/wiki/KnowledgeGraph";
import { Network } from "lucide-react";

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

export default function GraphPage() {
  const router = useRouter();

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

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xs text-slate-600" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
          Loading graph...
        </div>
      </div>
    );
  }

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
        <span className="text-[13px] text-slate-600 ml-2" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
          {data.nodes.length} nodes · {data.edges.length} edges
        </span>

        {/* Legend */}
        <div className="ml-auto flex items-center gap-4">
          {[
            { label: "System", color: "#22d3ee" },
            { label: "People", color: "#38bdf8" },
            { label: "Companies", color: "#fbbf24" },
            { label: "Ideas", color: "#a78bfa" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[13px] text-slate-500" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 overflow-hidden">
        <KnowledgeGraph
          nodes={data.nodes}
          edges={data.edges}
          onNodeClick={handleNodeClick}
        />
      </div>
    </div>
  );
}
