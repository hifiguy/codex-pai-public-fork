"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { Building2, Briefcase, TrendingUp, FileText, type LucideIcon } from "lucide-react";
import EmptyStateGuide from "@/components/EmptyStateGuide";

interface BusinessData {
  latestRevenueReport?: string;
  revenueSummary?: string;
  revenueByProduct?: string;
  revenueAllSections?: Array<{ heading: string; body: string }>;
  businessOverview?: Array<{ heading: string; body: string }>;
  ulOverview?: Array<{ heading: string; body: string }>;
}

interface RevenueMetrics {
  total?: string;
  deals?: string;
  accounts?: string;
  avgDeal?: string;
  largest?: string;
  smallest?: string;
}

interface ProductRow {
  product: string;
  revenue: number;
  pct: string;
  deals: string;
  avgPrice: string;
}

function parseMetrics(md?: string): RevenueMetrics {
  if (!md) return {};
  const out: Record<string, string> = {};
  for (const line of md.split("\n")) {
    const m = line.match(/\*\*([^*]+)\*\*\s*\|\s*([^|]+)\|/);
    if (m) out[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return {
    total: out["total revenue"],
    deals: out["deals closed"],
    accounts: out["unique accounts"],
    avgDeal: out["average deal (by line item)"],
    largest: out["largest single deal"],
    smallest: out["smallest single deal"],
  };
}

function parseProducts(md?: string): ProductRow[] {
  if (!md) return [];
  const out: ProductRow[] = [];
  const lines = md.split("\n").filter((l) => l.trim().startsWith("|") && l.includes("$"));
  for (const line of lines) {
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length < 4) continue;
    const name = cells[0].replace(/\*\*/g, "");
    const revenue = parseInt(cells[1].replace(/[$,]/g, ""), 10);
    if (isNaN(revenue)) continue;
    out.push({
      product: name,
      revenue,
      pct: cells[2] || "",
      deals: cells[3] || "",
      avgPrice: cells[4] || "",
    });
  }
  return out.sort((a, b) => b.revenue - a.revenue);
}

function Banner({
  metrics,
  latestReport,
}: {
  metrics: RevenueMetrics;
  latestReport?: string;
}) {
  return (
    <section className="telos-card" style={{ cursor: "default", borderLeft: "3px solid #E0A458" }}>
      <div className="flex items-start gap-6 flex-wrap">
        <Building2 className="w-10 h-10 shrink-0" color="#E0A458" />
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest muted mb-2" style={{ color: "#F87B7B" }}>Business</div>
          <div className="flex items-baseline gap-6 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-wider muted">Latest Revenue</div>
              <div
                className="text-4xl lg:text-5xl font-medium tabular-nums leading-tight"
                style={{ color: "#E0A458" }}
                data-sensitive
              >
                {metrics.total ?? "—"}
              </div>
              {latestReport && (
                <div className="text-xs mt-1 muted">Report: {latestReport}</div>
              )}
            </div>
            <div className="text-sm space-y-1 muted" data-sensitive>
              {metrics.deals && (
                <div>
                  {metrics.deals} deals · {metrics.accounts} accounts
                </div>
              )}
              {metrics.avgDeal && <div>Avg deal {metrics.avgDeal}</div>}
              {metrics.largest && <div className="text-xs">Largest {metrics.largest}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCT_COLORS = ["#34D399", "#E0A458", "#7DD3FC", "#F87B7B", "#B794F4", "#2DD4BF"];

function RevenueByProduct({ products }: { products: ProductRow[] }) {
  if (products.length === 0) return null;
  return (
    <section>
      <h2 className="text-sm font-medium uppercase tracking-widest muted mb-4" style={{ color: "#E0A458" }}>
        Revenue by Product
      </h2>
      <div className="telos-card dim-money" style={{ cursor: "default", borderLeft: "3px solid #E0A458" }}>
        <div data-sensitive style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={products} layout="vertical" margin={{ left: 20, right: 60 }}>
              <XAxis
                type="number"
                stroke="#6B80AB"
                fontSize={11}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="product"
                stroke="#6B80AB"
                fontSize={11}
                width={200}
              />
              <Tooltip
                contentStyle={{
                  background: "#0F1A33",
                  border: "1px solid #1A2A4D",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#E8EFFF",
                }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {products.map((_, i) => (
                  <Cell key={i} fill={PRODUCT_COLORS[i % PRODUCT_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4"
          style={{ borderTop: "1px solid #1A2A4D" }}
          data-sensitive
        >
          {products.map((p, i) => (
            <div key={p.product} className="flex items-center gap-3 text-xs">
              <span
                className="w-3 h-3 rounded shrink-0"
                style={{ background: PRODUCT_COLORS[i % PRODUCT_COLORS.length] }}
              />
              <span className="flex-1 truncate" title={p.product}>
                {p.product}
              </span>
              <span className="muted" style={{ color: PRODUCT_COLORS[i % PRODUCT_COLORS.length] }}>{p.pct}</span>
              <span className="tabular-nums muted">{p.deals}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionGrid({
  sections,
  icon: Icon,
  accent,
}: {
  sections?: Array<{ heading: string; body: string }>;
  icon: LucideIcon;
  accent: string;
}) {
  if (!sections || sections.length === 0) return null;
  return (
    <div className="prob-grid">
      {sections.map((s, i) => (
        <div key={i} className="telos-card" style={{ cursor: "default", borderLeft: `3px solid ${accent}` }}>
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4 shrink-0" color={accent} />
            <h3 className="text-sm font-medium">{s.heading}</h3>
          </div>
          <div
            className="text-xs whitespace-pre-wrap line-clamp-6 muted"
            data-sensitive
          >
            {s.body}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BusinessPage() {
  const [data, setData] = useState<BusinessData | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/life/business")
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);
  if (error) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div
          className="telos-card"
          style={{ cursor: "default", borderLeft: "3px solid #F87171" }}
        >
          <h2 className="font-medium" style={{ color: "#F87171" }}>
            Failed to load business
          </h2>
          <p className="text-sm" style={{ color: "#FCA5A5" }}>{error}</p>
        </div>
      </div>
    );
  }
  if (!data) return <div className="p-8 text-sm muted">Loading Business...</div>;

  const metrics = parseMetrics(data.revenueSummary);
  const products = parseProducts(data.revenueByProduct);
  const isFreshInstall =
    !data.revenueSummary &&
    !data.revenueByProduct &&
    (!data.businessOverview || data.businessOverview.length === 0) &&
    (!data.ulOverview || data.ulOverview.length === 0) &&
    (!data.revenueAllSections || data.revenueAllSections.length === 0);

  return (
    <div className="p-6 lg:p-8 max-w-[1920px] mx-auto space-y-6">
      {isFreshInstall && (
        <EmptyStateGuide
          section="Business Context"
          description="Your business operations data — revenue streams, customers, deals, pipeline."
          userDir="BUSINESS"
          daPromptExample="walk me through my business context"
        />
      )}
      <Banner metrics={metrics} latestReport={data.latestRevenueReport} />
      <RevenueByProduct products={products} />
      {data.businessOverview && data.businessOverview.length > 0 && (
        <section>
          <h2 className="text-sm font-medium uppercase tracking-widest muted mb-4">
            Business Overview
          </h2>
          <SectionGrid sections={data.businessOverview} icon={Briefcase} accent="#F87B7B" />
        </section>
      )}
      {data.ulOverview && data.ulOverview.length > 0 && (
        <section>
          <h2 className="text-sm font-medium uppercase tracking-widest muted mb-4">
            Company Overview
          </h2>
          <SectionGrid sections={data.ulOverview} icon={TrendingUp} accent="#7DD3FC" />
        </section>
      )}
      {data.revenueAllSections && data.revenueAllSections.length > 0 && (
        <section>
          <h2 className="text-sm font-medium uppercase tracking-widest muted mb-4">
            Revenue Details
          </h2>
          <SectionGrid sections={data.revenueAllSections} icon={FileText} accent="#B794F4" />
        </section>
      )}
    </div>
  );
}
