"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { AlgorithmState, AlgorithmApiResponse, RatingPulse, SessionMode } from "@/types/algorithm";
import { localOnlyApiCall } from "@/lib/local-api";

const POLL_INTERVAL = 2000; // 2s refresh for responsive phase visualization

/** Infer currentMode from legacy mode field if new fields are missing */
function inferMode(state: AlgorithmState): SessionMode {
  if (state.currentMode) return state.currentMode;
  if (state.mode === "native") return "native";
  if (state.mode === "interactive" || state.mode === "starting") return "algorithm";
  if (state.criteria?.length > 0 || state.phaseHistory?.length > 0) return "algorithm";
  return "native";
}

/** Normalize API response to ensure new fields have defaults */
function normalizeState(state: AlgorithmState): AlgorithmState {
  return {
    ...state,
    currentMode: inferMode(state),
    modeHistory: state.modeHistory ?? [{ mode: inferMode(state), startedAt: state.algorithmStartedAt }],
    ratings: state.ratings ?? [],
    minimalCount: state.minimalCount ?? 0,
  };
}

export function useAlgorithmState() {
  const [algorithmStates, setAlgorithmStates] = useState<AlgorithmState[]>([]);
  const [pulseStrip, setPulseStrip] = useState<RatingPulse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const data = await localOnlyApiCall<AlgorithmApiResponse>("/api/algorithm");

      if (data.algorithms && Array.isArray(data.algorithms)) {
        setAlgorithmStates(data.algorithms.map(normalizeState));
      } else if (data.active !== false && (data as unknown as AlgorithmState).sessionId) {
        // Legacy single-state format (backward compatibility)
        setAlgorithmStates([normalizeState(data as unknown as AlgorithmState)]);
      } else {
        setAlgorithmStates([]);
      }

      // Parse pulseStrip from response
      setPulseStrip(data.pulseStrip ?? []);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch algorithm state");
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

  // Backward-compatible: also expose first state as algorithmState
  const algorithmState = algorithmStates.length > 0 ? algorithmStates[0] : null;

  return { algorithmState, algorithmStates, pulseStrip, isLoading, error };
}
