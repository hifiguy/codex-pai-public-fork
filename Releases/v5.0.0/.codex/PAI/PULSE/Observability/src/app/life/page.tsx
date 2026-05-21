"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  DollarSign,
  Briefcase,
  Building2,
  Target,
  Compass,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  CheckSquare,
  Square,
  AlertCircle,
  Wind,
  type LucideIcon,
} from "lucide-react";

// ────────── Types ──────────

interface HomeData {
  oneSentence: string;
  current: {
    mood?: string;
    energy?: string;
    focus?: string;
    location?: string;
    last_meal?: string;
    sleep_last_night?: string;
    calendar_load?: string;
    inbox?: string;
    top_intent?: string;
  };
  topGoals?: Array<{ id: string; text: string }>;
  nextActions?: string[];
  spark?: string;
  timelineBlockCount?: number;
}

interface UserIndexStats {
  total_files: number;
  avg_completeness: number;
  frontmatter_coverage: number;
  by_kind: Record<string, number>;
  by_publish: Record<string, number>;
}

interface UserIndex {
  files: unknown[];
  by_category: Record<string, unknown[]>;
  domains: unknown[];
  publish_feed: unknown[];
  stale_queue: unknown[];
  interview_gaps: unknown[];
  stats: UserIndexStats;
}

interface GoalsData {
  goals?: Array<{ id: string; text: string }>;
  mission?: Array<{ heading: string; body: string }>;
  problems?: Array<{ heading: string; body: string }>;
  status?: Array<{ heading: string; body: string }>;
}

interface BusinessData {
  revenueSummary?: string;
  latestRevenueReport?: string;
  businessOverview?: Array<{ heading: string; body: string }>;
  revenueByProduct?: string;
}

interface HealthData {
  files?: Array<{ name: string; sections: string[] }>;
}

interface FinancesData {
  accounts?: Array<{ heading: string; body: string }>;
}

interface WorkData {
  projects?: Array<{ name: string; path: string; url: string }>;
}

interface AirMonitor {
  id: number;
  name: string;
  pm25: number | null;
  co2: number | null;
  temp: number | null;
  rh: number | null;
  aqi: number | null;
  aqiLabel: string | null;
  type: string | null;
}

interface AirData {
  fetched_at: string | null;
  count: number;
  worst_aqi: number | null;
  worst_label: string | null;
  monitors: AirMonitor[];
  error?: string;
}

// ────────── Helpers ──────────

type Dimension = "health" | "money" | "freedom" | "creative" | "relationships" | "rhythms";

const DIMENSION_COLOR: Record<Dimension, string> = {
  health: "#34D399",
  money: "#E0A458",
  freedom: "#7DD3FC",
  creative: "#F87B7B",
  relationships: "#B794F4",
  rhythms: "#2DD4BF",
};

const RING_GRADIENT: Record<string, [string, string]> = {
  Mood: [DIMENSION_COLOR.relationships, DIMENSION_COLOR.health],
  Energy: [DIMENSION_COLOR.health, DIMENSION_COLOR.rhythms],
  Focus: [DIMENSION_COLOR.freedom, DIMENSION_COLOR.creative],
};

function parseRatio(value?: string): number | null {
  if (!value) return null;
  const m = value.match(/(\d+(?:\.\d+)?)\s*\/\s*10/);
  if (m) return Math.round(parseFloat(m[1]) * 10);
  const pct = value.match(/(\d+)%/);
  if (pct) return parseInt(pct[1], 10);
  return null;
}

function parseMoodToScore(mood?: string): number | null {
  if (!mood) return null;
  const text = mood.toLowerCase();
  if (/\b(energized|clear|focused|great|amazing)\b/.test(text)) return 85;
  if (/\b(good|solid|fine|ok)\b/.test(text)) return 70;
  if (/\b(tired|foggy|slow)\b/.test(text)) return 45;
  if (/\b(bad|stressed|anxious|overwhelmed)\b/.test(text)) return 30;
  return 60;
}

function parseRevenueSummary(md?: string): { total?: string; deals?: string; largest?: string } {
  if (!md) return {};
  const out: Record<string, string> = {};
  const lines = md.split("\n");
  for (const line of lines) {
    const m = line.match(/\*\*([^*]+)\*\*\s*\|\s*([^|]+)\|/);
    if (m) out[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return { total: out["total revenue"], deals: out["deals closed"], largest: out["largest single deal"] };
}

// ────────── Primitives ──────────

function RingMetric({ label, score, valueText }: { label: string; score: number | null; valueText?: string }) {
  const gradientId = `ring-${label.toLowerCase()}`;
  const [startColor, endColor] = RING_GRADIENT[label] ?? [DIMENSION_COLOR.relationships, DIMENSION_COLOR.health];
  if (score === null) return (
    <div className="flex flex-col items-center gap-1 muted">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-xs"
        style={{ border: "1px solid #1A2A4D", color: "#6B80AB" }}
      >
        —
      </div>
      <div className="text-[11px] uppercase tracking-wider">{label}</div>
    </div>
  );
  const data = [{ value: score }];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            </defs>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" fill={`url(#${gradientId})`} cornerRadius={10} background={{ fill: "#1A2A4D" }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-medium tabular-nums" style={{ color: "#E8EFFF" }}>{score}</span>
        </div>
      </div>
      <div className="text-[11px] uppercase tracking-wider muted">{label}</div>
      {valueText && <div className="text-[10px] muted text-center max-w-[120px] truncate" title={valueText}>{valueText}</div>}
    </div>
  );
}

function DomainCard({
  title, icon: Icon, href, headline, secondary, children, empty, dimension, pulse = false,
}: {
  title: string;
  icon: LucideIcon;
  href: string;
  headline?: string | null;
  secondary?: string | null;
  children?: React.ReactNode;
  empty?: string;
  dimension: Dimension;
  pulse?: boolean;
}) {
  const color = DIMENSION_COLOR[dimension];
  return (
    <Link href={href} className="h-full">
      <div className={`telos-card h-full group dim-${dimension}${pulse ? " pulse" : ""}`} style={{ borderLeft: `3px solid ${color}` }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" color={color} />
            <h2 className="text-sm font-medium uppercase tracking-wider" style={{ color }}>{title}</h2>
          </div>
          <ArrowUpRight className="w-4 h-4 muted transition-colors" />
        </div>
        {headline ? (
          <>
            <div className="text-2xl font-medium tabular-nums leading-tight" style={{ color }} data-sensitive>{headline}</div>
            {secondary && <div className="text-xs muted leading-relaxed line-clamp-2" data-sensitive>{secondary}</div>}
          </>
        ) : empty ? (
          <div className="text-xs muted italic py-2">{empty}</div>
        ) : null}
        {children}
      </div>
    </Link>
  );
}

// ────────── Sections ──────────

function NarrativeBanner({ home }: { home: HomeData | null }) {
  if (!home) return <div className="telos-card h-24 animate-pulse" style={{ cursor: "default" }} />;
  const mood = parseMoodToScore(home.current?.mood);
  const energy = parseRatio(home.current?.energy);
  const focus = home.current?.focus ? 70 : null; // focus depth is categorical — render existence as 70
  return (
    <section className="telos-card mission-card" style={{ cursor: "default" }}>
      <div className="flex items-start justify-between gap-8 flex-wrap">
        <div className="flex-1 min-w-0 max-w-3xl">
          <div className="text-xs uppercase tracking-widest muted mb-3" style={{ color: DIMENSION_COLOR.relationships }}>How is life going</div>
          <p className="text-2xl lg:text-3xl font-medium leading-snug" data-sensitive>
            {home.oneSentence}
          </p>
          {home.current?.top_intent && (
            <p className="mt-4 text-sm muted" data-sensitive>
              <span>Top intent:</span> {home.current.top_intent}
            </p>
          )}
        </div>
        <div className="flex items-center gap-6" data-sensitive>
          <RingMetric label="Mood" score={mood} valueText={home.current?.mood} />
          <RingMetric label="Energy" score={energy} valueText={home.current?.energy} />
          <RingMetric label="Focus" score={focus} valueText={home.current?.focus} />
        </div>
      </div>
      {(home.current?.location || home.current?.sleep_last_night || home.current?.calendar_load) && (
        <div
          className="mt-6 flex flex-wrap gap-2 text-xs pt-4"
          style={{ borderTop: "1px solid #1A2A4D" }}
          data-sensitive
        >
          {home.current?.location && <span className="pill pill-freedom">Location · {home.current.location}</span>}
          {home.current?.sleep_last_night && <span className="pill pill-rhythms">Sleep · {home.current.sleep_last_night}</span>}
          {home.current?.calendar_load && <span className="pill pill-creative">Calendar · {home.current.calendar_load}</span>}
          {home.current?.last_meal && <span className="pill pill-health">Meal · {home.current.last_meal}</span>}
        </div>
      )}
    </section>
  );
}

function DomainGrid({
  business, health, finances, work, goals, air,
}: {
  business: BusinessData | null;
  health: HealthData | null;
  finances: FinancesData | null;
  work: WorkData | null;
  goals: GoalsData | null;
  air: AirData | null;
}) {
  const rev = parseRevenueSummary(business?.revenueSummary);
  const healthFileCount = health?.files?.length ?? 0;
  const accountCount = finances?.accounts?.length ?? 0;
  const projectCount = work?.projects?.length ?? 0;
  const goalCount = goals?.goals?.length ?? 0;
  const airMonitorCount = air?.count ?? 0;
  const worstAqi = air?.worst_aqi ?? null;
  const indoorCo2 = air?.monitors
    ?.filter(m => m.type !== "outdoor" && m.name.toLowerCase() !== "backyard")
    ?.reduce((max, m) => m.co2 !== null && (max === null || m.co2 > max) ? m.co2 : max, null as number | null)
    ?? null;
  const airHeadline = worstAqi !== null ? `AQI ${worstAqi}` : null;
  const airSecondary = airMonitorCount > 0
    ? `${airMonitorCount} monitors${air?.worst_label ? ` · ${air.worst_label}` : ""}${indoorCo2 !== null ? ` · indoor CO₂ ${indoorCo2}ppm` : ""}`
    : null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium uppercase tracking-widest muted">Domains</h2>
      </div>
      <div className="prob-grid">
        <DomainCard title="Business" icon={Building2} href="/business"
          dimension="creative"
          headline={rev.total || null}
          secondary={rev.deals ? `${rev.deals} deals · largest ${rev.largest ?? "—"}` : null}
          empty={!rev.total ? "Wire finances pipeline to surface revenue" : undefined}
        />
        <DomainCard title="Health" icon={Activity} href="/health"
          dimension="health"
          headline={healthFileCount > 0 ? `${healthFileCount} sources` : null}
          secondary="Labs, fitness, nutrition tracked"
          empty={healthFileCount === 0 ? "Add health files to surface trends" : undefined}
        />
        <DomainCard title="Work" icon={Briefcase} href="/work"
          dimension="creative"
          pulse={projectCount > 0}
          headline={projectCount > 0 ? `${projectCount} active` : null}
          secondary="Projects in flight"
          empty={projectCount === 0 ? "No active projects tracked" : undefined}
        />
        <DomainCard title="Finances" icon={DollarSign} href="/finances"
          dimension="money"
          headline={accountCount > 0 ? `${accountCount} accounts` : null}
          secondary="Tracked accounts & categories"
          empty={accountCount === 0 ? "Add accounts to Finances/ domain" : undefined}
        />
        <DomainCard title="Telos Goals" icon={Target} href="/telos"
          dimension="relationships"
          headline={goalCount > 0 ? `${goalCount} active` : null}
          secondary={goals?.mission?.[0]?.body?.slice(0, 80) ?? "Telos mission & goals"}
          empty={goalCount === 0 ? "Define goals in Telos/" : undefined}
        />
        <DomainCard title="Telos" icon={Compass} href="/telos"
          dimension="freedom"
          headline={`${goals?.mission?.length ?? 0} missions`}
          secondary={goals?.problems?.length ? `${goals.problems.length} problems · ${goals?.status?.length ?? 0} status entries` : null}
        />
        <DomainCard title="Air Quality" icon={Wind} href="/air"
          dimension="rhythms"
          headline={airHeadline}
          secondary={airSecondary}
          empty={airMonitorCount === 0 ? "Run the AirGradient poller to prime cache" : undefined}
        />
      </div>
    </section>
  );
}

function ActiveGoals({ goals }: { goals: GoalsData | null }) {
  const items = goals?.goals?.slice(0, 8) ?? [];
  if (items.length === 0) return null;
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium uppercase tracking-widest muted">Active Goals</h2>
        <Link href="/telos" className="text-xs muted">see all →</Link>
      </div>
      <div className="telos-card pulse" style={{ cursor: "default", borderLeft: `3px solid ${DIMENSION_COLOR.relationships}` }}>
        <div className="space-y-3" data-sensitive>
          {items.map(g => (
            <div key={g.id} className="flex items-center gap-4">
              <span className="text-xs font-mono muted w-8 shrink-0">{g.id}</span>
              <span className="text-sm flex-1 truncate" title={g.text}>{g.text}</span>
              <span className="pill pill-relationships shrink-0">active</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 text-xs muted italic" style={{ borderTop: "1px solid #1A2A4D" }}>
          Progress tracking appears once each goal has a `progress` field in Telos/Goals.md
        </div>
      </div>
    </section>
  );
}

function NextActionsSpark({ home }: { home: HomeData | null }) {
  const actions = home?.nextActions ?? [];
  const spark = home?.spark;
  return (
    <section className="prob-grid">
      <div className="telos-card rec dim-rhythms" style={{ cursor: "default" }}>
        <div className="flex items-center gap-2 mb-1">
          <CheckSquare className="w-4 h-4" color={DIMENSION_COLOR.rhythms} />
          <h3 className="text-sm font-medium uppercase tracking-widest muted" style={{ color: DIMENSION_COLOR.rhythms }}>Next Actions</h3>
        </div>
        {actions.length > 0 ? (
          <ul className="space-y-2" data-sensitive>
            {actions.slice(0, 6).map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Square className="w-3 h-3 mt-1 shrink-0" color="#6B80AB" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs muted italic">No actions in `current.md` yet.</p>
        )}
      </div>
      <div className="telos-card rec dim-creative" style={{ cursor: "default" }}>
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="w-4 h-4" color={DIMENSION_COLOR.creative} />
          <h3 className="text-sm font-medium uppercase tracking-widest muted" style={{ color: DIMENSION_COLOR.creative }}>Spark</h3>
        </div>
        {spark ? (
          <p className="text-base font-serif italic leading-relaxed">{spark}</p>
        ) : (
          <p className="text-xs muted italic">Sparks surfaces random entries from Telos/Sparks.md</p>
        )}
      </div>
    </section>
  );
}

function SystemContextDrawer({ index }: { index: UserIndex | null }) {
  const [open, setOpen] = useState(false);
  if (!index) return null;
  const byCat = index.by_category;
  const daemonCount = (index.stats.by_publish.daemon || 0) + (index.stats.by_publish["daemon-summary"] || 0);

  return (
    <section>
      <button
        onClick={() => setOpen(o => !o)}
        className="telos-card w-full flex-row items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown className="w-4 h-4 muted" /> : <ChevronRight className="w-4 h-4 muted" />}
          <span className="text-xs font-medium uppercase tracking-widest muted">System Context</span>
          <span className="text-xs muted">
            {index.stats.total_files} files · {daemonCount} broadcast · {index.interview_gaps.length} gaps
          </span>
        </div>
        <span className="pill">
          {open ? "collapse" : "expand"}
        </span>
      </button>
      {open && (
        <div className="mt-3 metric-grid">
          {(["identity", "voice", "mind", "taste", "shape", "ops", "domain"] as const).map(cat => {
            const files = byCat[cat] ?? [];
            if (files.length === 0) return null;
            return (
              <div key={cat} className="telos-card metric" style={{ cursor: "default" }}>
                <div className="metric-label muted uppercase tracking-widest">{cat}</div>
                <div className="metric-val tabular-nums">{files.length}</div>
                <div className="metric-foot muted">files</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
// ────────── Page ──────────

export default function LifePage() {
  const [home, setHome] = useState<HomeData | null>(null);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [finances, setFinances] = useState<FinancesData | null>(null);
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [work, setWork] = useState<WorkData | null>(null);
  const [goals, setGoals] = useState<GoalsData | null>(null);
  const [index, setIndex] = useState<UserIndex | null>(null);
  const [air, setAir] = useState<AirData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJson = (path: string) => fetch(path).then(r => r.ok ? r.json() : null).catch(() => null);
    Promise.all([
      fetchJson("/api/life/home").then(setHome),
      fetchJson("/api/life/health").then(setHealth),
      fetchJson("/api/life/finances").then(setFinances),
      fetchJson("/api/life/business").then(setBusiness),
      fetchJson("/api/life/work").then(setWork),
      fetchJson("/api/life/goals").then(setGoals),
      fetchJson("/api/life/air").then(setAir),
      fetchJson("/api/user-index").then(setIndex),
    ]).catch(err => setError(String(err)));
  }, []);

  if (error) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="telos-card" style={{ cursor: "default", borderLeft: "3px solid #F87171" }}>
          <div className="flex items-center gap-2 mb-2" style={{ color: "#F87171" }}>
            <AlertCircle className="w-4 h-4" />
            <h2 className="font-medium">Dashboard unavailable</h2>
          </div>
          <p className="text-sm" style={{ color: "#FCA5A5" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1920px] mx-auto space-y-6">
      <NarrativeBanner home={home} />
      <DomainGrid business={business} health={health} finances={finances} work={work} goals={goals} air={air} />
      <ActiveGoals goals={goals} />
      <NextActionsSpark home={home} />
      <SystemContextDrawer index={index} />
    </div>
  );
}
