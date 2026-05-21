"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Flame, Zap } from "lucide-react";

interface LifeCardData {
  oneSentence: string;
  current: {
    focus: string;
    energy: string;
    mood: string;
    topIntent: string;
  };
  nextActions: string[];
  sparks: string[];
  timelineBlockCount: number;
  files: {
    sparks: boolean;
    timeline: boolean;
    current: boolean;
  };
}

export default function LifeCard() {
  const [data, setData] = useState<LifeCardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/observability/life-card")
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-red-800/30 bg-red-950/20 p-6">
        <p className="text-red-400 text-sm">Life Card unavailable: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-slate-800/50 bg-slate-900/50 p-6 animate-pulse">
        <div className="h-6 bg-slate-800 rounded w-3/4 mb-4" />
        <div className="h-4 bg-slate-800 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 space-y-5">
      {/* One Sentence */}
      <div>
        <p className="text-xl text-white/90 font-serif leading-relaxed">
          {data.oneSentence}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Top intent: {data.current.topIntent}
        </p>
      </div>

      {/* Next Actions */}
      {data.nextActions.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            Next Moves
          </h3>
          <ul className="space-y-1.5">
            {data.nextActions.map((action, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-blue-400 shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sparks + 2036 Stats */}
      <div className="flex gap-4 pt-2 border-t border-slate-800/50">
        {data.sparks.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>
              {data.sparks.length} sparks:{" "}
              {data.sparks.slice(0, 3).join(", ")}
              {data.sparks.length > 3 && ` +${data.sparks.length - 3}`}
            </span>
          </div>
        )}
        {data.timelineBlockCount > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{data.timelineBlockCount} 2036 moments</span>
          </div>
        )}
      </div>

      {/* File Status */}
      <div className="flex gap-3 text-xs text-slate-500">
        {Object.entries(data.files).map(([name, exists]) => (
          <span key={name} className="flex items-center gap-1">
            <Zap
              className={`w-3 h-3 ${
                exists ? "text-green-500" : "text-slate-600"
              }`}
            />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
