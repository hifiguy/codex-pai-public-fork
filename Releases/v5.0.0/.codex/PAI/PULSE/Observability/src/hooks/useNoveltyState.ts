"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { localOnlyApiCall } from "@/lib/local-api";

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

export interface FitnessEntry {
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
  scores: { feasibility: number; novelty: number; impact: number; elegance: number };
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
  status: "running" | "complete" | "failed";
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
  checkpoints: { a: NoveltyCheckpoint; b: NoveltyCheckpoint };
  fitnessTrajectory: FitnessEntry[];
  phaseMetrics: PhaseMetric[];
  domainFertility: DomainFertility[];
  candidates: NoveltyCandidate[];
  algorithmConfig?: {
    preset: string | null;
    focus: number | null;
    params: Record<string, number | string>;
    mode: string;
  };
}

export interface NoveltyState {
  runs: NoveltyRun[];
}

// ─── Constants ───

const POLL_INTERVAL = 3000; // 3s refresh

// ─── Hook ───

export function useNoveltyState() {
  const [data, setData] = useState<NoveltyState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const result = await localOnlyApiCall<NoveltyState>("/api/novelty");
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch novelty state");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();

    const startPolling = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(fetchState, POLL_INTERVAL);
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        fetchState();
        startPolling();
      }
    };

    startPolling();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchState]);

  return { data, isLoading, error };
}
