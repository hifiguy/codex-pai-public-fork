"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import UnifiedWorkDashboard from "@/components/activity/UnifiedWorkDashboard";
import ObservabilityDashboard from "@/components/activity/ObservabilityDashboard";
import NativeDashboard from "@/components/activity/NativeDashboard";
import OptimizeDashboard from "@/components/activity/OptimizeDashboard";
import LoopDashboard from "@/components/activity/LoopDashboard";
import SystemHealthVitals from "@/components/activity/insights/SystemHealthVitals";
import { Repeat, TrendingUp, Lightbulb, Terminal, RefreshCw, Zap, Layers } from "lucide-react";

const NoveltyPage = dynamic(() => import("../novelty/page"), { ssr: false });
const LadderPage = dynamic(() => import("../ladder/page"), { ssr: false });

// ─── Main Agents Page ───
// Tabs: Iterate | Optimize | Ideate | Loop | Native | Ladder (left) | Actions (right)
// System Health Vitals bar persists across all tabs

type Tab = "iterate" | "optimize" | "ideate" | "loop" | "native" | "ladder" | "actions";
type Dimension = "health" | "money" | "freedom" | "creative" | "relationships" | "rhythms";

const modeTabs: { id: Tab; label: string; icon: typeof Repeat }[] = [
  { id: "iterate", label: "Iterate", icon: Repeat },
  { id: "optimize", label: "Optimize", icon: TrendingUp },
  { id: "ideate", label: "Ideate", icon: Lightbulb },
  { id: "loop", label: "Loop", icon: RefreshCw },
  { id: "native", label: "Native", icon: Terminal },
  { id: "ladder", label: "Ladder", icon: Layers },
];

const tabDimensions: Record<Tab, Dimension> = {
  iterate: "creative",
  optimize: "rhythms",
  ideate: "freedom",
  loop: "relationships",
  native: "money",
  ladder: "health",
  actions: "creative",
};

const dimColors: Record<Dimension, string> = {
  health: "var(--health)",
  money: "var(--money)",
  freedom: "var(--freedom)",
  creative: "var(--creative)",
  relationships: "var(--relationships)",
  rhythms: "var(--rhythms)",
};

const dimTints: Record<Dimension, string> = {
  health: "rgba(52,211,153,0.16)",
  money: "rgba(224,164,88,0.16)",
  freedom: "rgba(125,211,252,0.16)",
  creative: "rgba(248,123,123,0.16)",
  relationships: "rgba(183,148,244,0.16)",
  rhythms: "rgba(45,212,191,0.16)",
};

export default function AgentsPage() {
  const [tab, setTab] = useState<Tab>("iterate");

  const pillStyle = (active: boolean, dimension: Dimension) => ({
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer" as const,
    background: active ? dimTints[dimension] : "rgba(168,165,200,0.08)",
    color: active ? "#E8EFFF" : dimColors[dimension],
    border: active ? `1px solid ${dimColors[dimension]}` : "1px solid rgba(168,165,200,0.22)",
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <SystemHealthVitals />

      {/* Tab bar: mode tabs left, Actions right */}
      <div
        className="flex items-center px-4 py-2 shrink-0"
        style={{ borderBottom: "1px solid #1A2A4D", background: "#0F1A33" }}
      >
        <div className="flex items-center gap-1.5">
          {modeTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`pill pill-${tabDimensions[id]} flex items-center gap-1.5`}
              style={pillStyle(tab === id, tabDimensions[id])}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setTab("actions")}
            className="pill pill-creative flex items-center gap-1.5"
            style={pillStyle(tab === "actions", tabDimensions.actions)}
          >
            <Zap className="w-4 h-4" />
            Actions
          </button>
        </div>
      </div>

      {/* Tab content */}
      {tab === "iterate" && <UnifiedWorkDashboard />}
      {tab === "optimize" && <OptimizeDashboard />}
      {tab === "ideate" && <NoveltyPage />}
      {tab === "loop" && <LoopDashboard />}
      {tab === "native" && <NativeDashboard />}
      {tab === "ladder" && <LadderPage />}
      {tab === "actions" && <ObservabilityDashboard />}
    </div>
  );
}
