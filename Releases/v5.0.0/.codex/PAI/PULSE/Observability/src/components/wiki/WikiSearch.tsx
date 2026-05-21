"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Users, Building2, Lightbulb, BookOpen, Bookmark, Newspaper } from "lucide-react";
import { wikiPageUrl } from "@/lib/wiki-links";

interface SearchResult {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  score: number;
  author?: string;
}

interface WikiSearchProps {
  open: boolean;
  onClose: () => void;
}

const CATEGORY_ICONS: Record<string, typeof FileText> = {
  "system-doc": BookOpen,
  person: Users,
  company: Building2,
  idea: Lightbulb,
  blog: Newspaper,
  bookmark: Bookmark,
};

const CATEGORY_LABELS: Record<string, string> = {
  "system-doc": "System",
  person: "People",
  company: "Companies",
  idea: "Ideas",
  blog: "Blogs",
  bookmark: "Bookmarks",
};

function resultLink(r: SearchResult): string {
  return wikiPageUrl(r.category, r.slug);
}

export default function WikiSearch({ open, onClose }: WikiSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Search debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/wiki/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setSelectedIndex(0);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        router.push(resultLink(results[selectedIndex]));
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, selectedIndex, router, onClose]
  );

  if (!open) return null;

  // Group results by category
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const cat = r.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(r);
    return acc;
  }, {});

  let globalIndex = 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-slate-950 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800/50">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation and knowledge..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
            style={{ fontFamily: "'concourse-t3', sans-serif" }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-500 hover:text-slate-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[13px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {loading && (
            <div className="px-4 py-8 text-center text-xs text-slate-600" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
              Searching...
            </div>
          )}
          {!loading && query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-xs text-slate-600" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
              No results for &quot;{query}&quot;
            </div>
          )}
          {!loading &&
            Object.entries(grouped).map(([cat, items]) => {
              const Icon = CATEGORY_ICONS[cat] || FileText;
              const label = CATEGORY_LABELS[cat] || cat;
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 px-4 py-2 text-[13px] text-slate-600 uppercase tracking-wider border-b border-slate-800/30"
                    style={{ fontFamily: "'advocate-c14', sans-serif" }}
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                  </div>
                  {items.map((r) => {
                    const idx = globalIndex++;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={r.slug}
                        onClick={() => {
                          router.push(resultLink(r));
                          onClose();
                        }}
                        className={`w-full text-left px-4 py-2.5 flex flex-col gap-0.5 transition-colors ${
                          isSelected ? "bg-sky-500/10" : "hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`flex-1 truncate text-xs font-medium ${isSelected ? "text-sky-400" : "text-slate-300"}`}
                            style={{ fontFamily: "'concourse-t3', sans-serif" }}
                          >
                            {r.title}
                          </span>
                          {r.author && (
                            <span className="shrink-0 truncate max-w-[160px] text-[13px] text-slate-500" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
                              {r.author}
                            </span>
                          )}
                        </div>
                        {r.excerpt && (
                          <span className="text-[14px] text-slate-600 line-clamp-1" style={{ fontFamily: "'concourse-t3', sans-serif" }}>
                            {r.excerpt}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
        </div>

        {/* Footer hints */}
        {results.length > 0 && (
          <div className="flex items-center gap-4 px-4 py-2 border-t border-slate-800/50 text-[13px] text-slate-600"
            style={{ fontFamily: "'concourse-t3', sans-serif" }}
          >
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span>esc close</span>
          </div>
        )}
      </div>
    </div>
  );
}
