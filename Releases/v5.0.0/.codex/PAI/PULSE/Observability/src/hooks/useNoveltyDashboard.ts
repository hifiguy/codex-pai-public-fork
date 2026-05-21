"use client";

import { useQuery } from "@tanstack/react-query";
import { localApiCall } from "@/lib/local-api";

// ─── Types ───

export interface NoveltyPhase {
  name: string;
  status: "complete" | "running" | "pending";
}

export interface NoveltyCheckpoint {
  status: "PASS" | "FAIL";
  percentage?: number;
  currentAvg?: number;
  previousAvg?: number;
  cycle: number;
}

export interface FitnessPoint {
  cycle: number;
  avgScore: number;
  topScore: number;
  diversityIndex: number;
  ideasIn: number;
  ideasOut: number;
  survivalRate: number;
}

export interface NoveltyCandidate {
  rank: number;
  title: string;
  description: string;
  compositeScore: number;
  scores: {
    feasibility: number;
    novelty: number;
    impact: number;
    elegance: number;
  };
  confidence: number;
  lineage: string[];
  forIt: string;
  againstIt: string;
}

export interface DomainFertility {
  pairing: string;
  avgScore: number;
  count: number;
  multiplier: number;
}

export interface PhaseMetric {
  phase: string;
  durationSeconds: number;
  outputCount: number;
  agentCount: number;
}

export interface NoveltyRun {
  id: string;
  problem: string;
  status: "running" | "complete";
  startedAt: string;
  updatedAt: string;
  timeScale: string;
  currentPhase: string | null;
  currentCycle: number;
  maxCycles: number;
  budgetSecondsTotal: number;
  budgetSecondsRemaining: number;
  strategyPivotsUsed: number;
  strategyPivotsMax: number;
  phases: NoveltyPhase[];
  checkpoints: {
    a: NoveltyCheckpoint;
    b: NoveltyCheckpoint;
  };
  fitnessTrajectory: FitnessPoint[];
  phaseMetrics: PhaseMetric[];
  domainFertility: DomainFertility[];
  candidates: NoveltyCandidate[];
}

export interface NoveltyState {
  runs: NoveltyRun[];
}

// ─── Constants ───

const QUERY_KEY = ["novelty"] as const;
const REFETCH_INTERVAL_MS = 30_000;

// ─── Hook ───

export function useNoveltyDashboard() {
  const query = useQuery<NoveltyState>({
    queryKey: QUERY_KEY,
    queryFn: () => localApiCall<NoveltyState>("/api/novelty"),
    refetchInterval: REFETCH_INTERVAL_MS,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
  });

  return {
    runs: query.data?.runs ?? [],
    isLoading: query.status === "pending" && !query.data,
    refetch: query.refetch,
  };
}
