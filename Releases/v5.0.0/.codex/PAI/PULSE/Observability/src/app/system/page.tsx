"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import MarkdownRenderer from "@/components/wiki/MarkdownRenderer";
import WikiMeta from "@/components/wiki/WikiMeta";
import { BookOpen, Clock, FileText, Users, Building2, Lightbulb, Bookmark, ExternalLink } from "lucide-react";
import Link from "next/link";
import { wikiPageUrl } from "@/lib/wiki-links";

interface WikiPage {
  slug: string;
  title: string;
  category: string;
  tags?: string[];
  quality?: number;
  lastModified: string;
  wordCount: number;
}

interface WikiIndex {
  tree: unknown[];
  recentChanges: WikiPage[];
  stats: {
    totalPages: number;
    totalSystem: number;
    totalPeople: number;
    totalCompanies: number;
    totalIdeas: number;
    totalBookmarks: number;
  };
}

interface PageDetail {
  slug: string;
  title: string;
  category: string;
  content: string;
  wordCount: number;
  lastModified: string;
  backlinks: Array<{ slug: string; title: string; category: string }>;
  wikilinks: string[];
  tags?: string[];
  quality?: number;
  filePath?: string;
}

interface BookmarkDetail {
  slug: string;
  id: string;
  title: string;
  category: "bookmark";
  url: string;
  excerpt: string;
  note: string;
  folder: string;
  tags: string[];
  created: string;
  cover: string;
  favorite: boolean;
  wordCount: number;
  lastModified: string;
}

const CATEGORY_ICONS: Record<string, typeof FileText> = {
  "system-doc": BookOpen,
  person: Users,
  company: Building2,
  idea: Lightbulb,
  bookmark: Bookmark,
};

const CATEGORY_COLORS: Record<string, string> = {
  "system-doc": "text-cyan-400",
  person: "text-sky-400",
  company: "text-amber-400",
  idea: "text-violet-400",
  bookmark: "text-rose-400",
};

const pageLink = wikiPageUrl;

function StatCard({ icon: Icon, label, count, color }: { icon: typeof FileText; label: string; count: number; color: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800/50">
      <Icon className={`w-5 h-5 ${color}`} />
      <div>
        <div className="text-lg font-semibold text-white" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
          {count}
        </div>
        <div className="text-[13px] text-slate-500 uppercase tracking-wider" style={{ fontFamily: "'advocate-c14', sans-serif" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// Landing page — shown when no doc/knowledge is selected
function WikiLanding({ data }: { data: WikiIndex }) {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold text-white tracking-wide"
          style={{ fontFamily: "'advocate-c14', sans-serif" }}
        >
          PAI WIKI
        </h1>
        <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
          System documentation & knowledge archive
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon={FileText} label="Total" count={data.stats.totalPages} color="text-white" />
        <StatCard icon={BookOpen} label="System" count={data.stats.totalSystem} color="text-cyan-400" />
        <StatCard icon={Users} label="People" count={data.stats.totalPeople} color="text-sky-400" />
        <StatCard icon={Building2} label="Companies" count={data.stats.totalCompanies} color="text-amber-400" />
        <StatCard icon={Lightbulb} label="Ideas" count={data.stats.totalIdeas} color="text-violet-400" />
        <StatCard icon={Bookmark} label="Bookmarks" count={data.stats.totalBookmarks} color="text-rose-400" />
      </div>

      {/* Recent changes */}
      <div>
        <h2
          className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3"
          style={{ fontFamily: "'advocate-c14', sans-serif" }}
        >
          <Clock className="w-3.5 h-3.5 inline mr-2" />
          Recent Changes
        </h2>
        <div className="space-y-1">
          {data.recentChanges.slice(0, 20).map((page) => {
            const Icon = CATEGORY_ICONS[page.category] || FileText;
            const color = CATEGORY_COLORS[page.category] || "text-slate-400";
            return (
              <Link
                key={page.slug + page.category}
                href={pageLink(page.category, page.slug)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
                <span
                  className="text-xs text-slate-400 group-hover:text-white transition-colors truncate"
                  style={{ fontFamily: "'concourse-t3', sans-serif" }}
                >
                  {page.title}
                </span>
                <span className="ml-auto text-[13px] text-slate-600 shrink-0 tabular-nums" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
                  {new Date(page.lastModified).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                {page.quality !== undefined && (
                  <span className={`text-[13px] shrink-0 ${page.quality >= 7 ? "text-emerald-500" : page.quality >= 4 ? "text-amber-500" : "text-red-500"}`}>
                    Q{page.quality}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Document viewer — shown when a doc or knowledge note is selected
function DocViewer({ detail }: { detail: PageDetail }) {
  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl">
        <MarkdownRenderer content={detail.content} />
      </div>
      <WikiMeta
        title={detail.title}
        category={detail.category}
        tags={detail.tags}
        quality={detail.quality}
        lastModified={detail.lastModified}
        wordCount={detail.wordCount}
        backlinks={detail.backlinks}
        filePath={detail.filePath}
      />
    </div>
  );
}

// Bookmark viewer — shown when a bookmark is selected
function BookmarkViewer({ detail }: { detail: BookmarkDetail }) {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Bookmark className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="text-[13px] text-rose-400 uppercase tracking-wider" style={{ fontFamily: "'advocate-c14', sans-serif" }}>
            Bookmark
          </span>
          {detail.favorite && (
            <span className="text-[13px] text-amber-400 ml-2">Favorite</span>
          )}
        </div>
        <h1
          className="text-xl font-bold text-white leading-tight"
          style={{ fontFamily: "'concourse-t3', sans-serif" }}
        >
          {detail.title}
        </h1>
      </div>

      {/* URL */}
      {detail.url && (
        <a
          href={detail.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors break-all"
          style={{ fontFamily: "'concourse-t3', sans-serif" }}
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          {detail.url.length > 80 ? detail.url.slice(0, 77) + "..." : detail.url}
        </a>
      )}

      {/* Cover image */}
      {detail.cover && (
        <div className="rounded-lg overflow-hidden border border-slate-800/50 bg-slate-900/50">
          <img
            src={detail.cover}
            alt={detail.title}
            className="w-full max-h-64 object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      )}

      {/* Excerpt */}
      {detail.excerpt && (
        <div className="rounded-lg bg-slate-900/50 border border-slate-800/50 p-4">
          <div className="text-[13px] text-slate-600 uppercase tracking-wider mb-2" style={{ fontFamily: "'advocate-c14', sans-serif" }}>
            Excerpt
          </div>
          <p className="text-sm text-slate-300 leading-relaxed" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
            {detail.excerpt}
          </p>
        </div>
      )}

      {/* Note */}
      {detail.note && (
        <div className="rounded-lg bg-slate-900/50 border border-slate-800/50 p-4">
          <div className="text-[13px] text-slate-600 uppercase tracking-wider mb-2" style={{ fontFamily: "'advocate-c14', sans-serif" }}>
            Note
          </div>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
            {detail.note}
          </p>
        </div>
      )}

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        {detail.folder && (
          <div>
            <span className="text-slate-600">Folder</span>
            <p className="text-slate-400 mt-0.5" style={{ fontFamily: "'concourse-t3', sans-serif" }}>{detail.folder}</p>
          </div>
        )}
        {detail.created && (
          <div>
            <span className="text-slate-600">Saved</span>
            <p className="text-slate-400 mt-0.5" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
              {new Date(detail.created).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        )}
        {detail.tags.length > 0 && (
          <div className="col-span-2">
            <span className="text-slate-600">Tags</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {detail.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[13px] rounded-full bg-slate-800 border border-slate-700/50 text-slate-400"
                  style={{ fontFamily: "'concourse-t3', sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PaiPageInner() {
  const searchParams = useSearchParams();
  const docSlug = searchParams.get("doc");
  const knowledgeCategory = searchParams.get("knowledge");
  const knowledgeSlug = searchParams.get("slug");
  const bookmarkSlug = searchParams.get("bookmark");

  const isViewingDoc = !!docSlug;
  const isViewingKnowledge = !!knowledgeCategory && !!knowledgeSlug;
  const isViewingBookmark = !!bookmarkSlug;
  const isViewing = isViewingDoc || isViewingKnowledge || isViewingBookmark;

  // Fetch wiki index (for landing page)
  const { data: indexData } = useQuery<WikiIndex>({
    queryKey: ["wiki-index"],
    queryFn: async () => {
      const res = await fetch("/api/wiki");
      if (!res.ok) throw new Error("Failed to fetch wiki index");
      return res.json();
    },
    staleTime: 30_000,
    enabled: !isViewing,
  });

  // Fetch individual doc
  const { data: docDetail, isError: docError, error: docErr } = useQuery<PageDetail>({
    queryKey: ["wiki-doc", docSlug],
    queryFn: async () => {
      const res = await fetch(`/api/wiki/doc/${docSlug}`);
      if (!res.ok) throw new Error(`Failed to fetch doc: ${res.status} ${res.statusText}`);
      return res.json();
    },
    enabled: isViewingDoc,
    retry: false,
  });

  // Fetch individual knowledge note
  const { data: knowledgeDetail, isError: knowledgeError, error: knowledgeErr } = useQuery<PageDetail>({
    queryKey: ["wiki-knowledge", knowledgeCategory, knowledgeSlug],
    queryFn: async () => {
      const res = await fetch(`/api/wiki/knowledge/${knowledgeCategory}/${knowledgeSlug}`);
      if (!res.ok) throw new Error(`Failed to fetch knowledge note: ${res.status} ${res.statusText}`);
      return res.json();
    },
    enabled: isViewingKnowledge,
    retry: false,
  });

  // Fetch individual bookmark
  const { data: bookmarkDetail, isError: bookmarkError, error: bookmarkErr } = useQuery<BookmarkDetail>({
    queryKey: ["wiki-bookmark", bookmarkSlug],
    queryFn: async () => {
      const res = await fetch(`/api/wiki/bookmark/${bookmarkSlug}`);
      if (!res.ok) throw new Error(`Failed to fetch bookmark: ${res.status} ${res.statusText}`);
      return res.json();
    },
    enabled: isViewingBookmark,
    retry: false,
  });

  const detail = docDetail || knowledgeDetail;
  const fetchError = docError || knowledgeError || bookmarkError;
  const errorMessage =
    (docErr as Error | null)?.message ||
    (knowledgeErr as Error | null)?.message ||
    (bookmarkErr as Error | null)?.message ||
    "Unknown error";

  if (isViewingBookmark && bookmarkDetail) {
    return <BookmarkViewer detail={bookmarkDetail} />;
  }

  if (isViewing && detail) {
    return <DocViewer detail={detail} />;
  }

  if (!isViewing && indexData) {
    return <WikiLanding data={indexData} />;
  }

  // Error state — fetch failed (e.g. 404 for an unknown slug)
  if (isViewing && fetchError) {
    const requestedSlug = docSlug || knowledgeSlug || bookmarkSlug || "";
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 max-w-md mx-auto text-center">
        <div className="text-sm text-rose-400 mb-2" style={{ fontFamily: "'advocate-c14', sans-serif" }}>
          Page not found
        </div>
        <div className="text-xs text-slate-500 mb-4 break-all" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
          {requestedSlug}
        </div>
        <div className="text-xs text-slate-600 mb-4" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
          {errorMessage}
        </div>
        <Link
          href="/system"
          className="text-xs text-sky-400 hover:text-sky-300 underline underline-offset-2"
          style={{ fontFamily: "'concourse-t3', sans-serif" }}
        >
          Back to wiki index
        </Link>
      </div>
    );
  }

  // Loading state
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-xs text-slate-600" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
        Loading...
      </div>
    </div>
  );
}

export default function PaiPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="text-xs text-slate-600" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
            Loading...
          </div>
        </div>
      }
    >
      <PaiPageInner />
    </Suspense>
  );
}
