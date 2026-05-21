"use client";

import { useCallback, useState } from "react";
import { TELOS as FALLBACK, type Telos } from "./data";

export function useTelosData(): { telos: Telos | null; refetch: () => void; error: string | null } {
  const [version, setVersion] = useState<number>(0);

  const refetch = useCallback(() => {
    setVersion((value) => value + 1);
  }, []);

  void version;
  return { telos: FALLBACK, refetch, error: null };
}
