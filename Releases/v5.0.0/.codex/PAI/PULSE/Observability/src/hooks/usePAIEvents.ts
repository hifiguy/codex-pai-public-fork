"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { localOnlyApiCall } from "@/lib/local-api";

// ─── Types ───

export interface PAIEvent {
  timestamp: string;
  session_id: string;
  source: string;
  type: string;
  [key: string]: unknown;
}

// ─── Constants ───

const MAX_BUFFER = 200;
const POLL_INTERVAL = 3_000;

// ─── Hook ───

export function usePAIEvents() {
  const [events, setEvents] = useState<PAIEvent[]>([]);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastHashRef = useRef("");

  useEffect(() => {
    let active = true;
    const makeKey = (e: PAIEvent) => `${e.timestamp}|${e.session_id}|${e.type}|${e.source}`;

    const poll = async () => {
      try {
        const data = await localOnlyApiCall<PAIEvent[] | { events: PAIEvent[] }>("/api/events/recent");
        // Handle both {events: [...]} and flat [...] response formats
        const eventList = Array.isArray(data) ? data : data.events;
        if (active && eventList?.length) {
          setEvents(eventList.slice(-MAX_BUFFER));
        }
      } catch {
        // Polling errors are expected when data is unavailable
      }
      if (active) {
        pollTimerRef.current = setTimeout(poll, POLL_INTERVAL);
      }
    };

    poll();
    return () => {
      active = false;
      clearTimeout(pollTimerRef.current);
    };
  }, []);

  // ─── Filtering ───

  const filteredEvents = useCallback(
    (prefix: string): PAIEvent[] => {
      if (!prefix) return events;
      const cleanPrefix = prefix.endsWith(".*")
        ? prefix.slice(0, -2)
        : prefix.endsWith("*")
        ? prefix.slice(0, -1)
        : prefix;

      return events.filter((e) => {
        if (cleanPrefix !== prefix) {
          return e.type.startsWith(cleanPrefix);
        }
        return e.type === prefix;
      });
    },
    [events]
  );

  // ─── Clear ───

  const clearEvents = useCallback(() => {
    setEvents([]);
    lastHashRef.current = "";
  }, []);

  return { events, filteredEvents, clearEvents };
}
