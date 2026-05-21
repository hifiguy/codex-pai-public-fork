const EFFORT_CONFIG: Record<string, { bg: string; border: string; text: string; eLevel: string }> = {
  standard: { bg: "bg-amber-500/15", border: "border-amber-500/30", text: "text-amber-400", eLevel: "E1" },
  extended: { bg: "bg-orange-500/15", border: "border-orange-500/30", text: "text-orange-400", eLevel: "E2" },
  advanced: { bg: "bg-rose-500/15", border: "border-rose-500/30", text: "text-rose-400", eLevel: "E3" },
  deep: { bg: "bg-purple-500/15", border: "border-purple-500/30", text: "text-purple-400", eLevel: "E4" },
  comprehensive: { bg: "bg-red-500/15", border: "border-red-500/30", text: "text-red-400", eLevel: "E5" },
};

interface EffortBadgeProps {
  effort: string;
}

export default function EffortBadge({ effort }: EffortBadgeProps) {
  const key = effort.toLowerCase();
  const config = EFFORT_CONFIG[key];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 h-6 px-2.5 text-xs font-bold uppercase tracking-widest border rounded shrink-0 ${config.bg} ${config.border} ${config.text}`}
    >
      <span className="opacity-70">{config.eLevel}</span>
      {effort.toUpperCase()}
    </span>
  );
}
