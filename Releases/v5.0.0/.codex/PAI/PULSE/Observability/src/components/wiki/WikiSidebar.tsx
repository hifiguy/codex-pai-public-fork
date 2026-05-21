"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { wikiPageUrl, WIKI_GRAPH_URL } from "@/lib/wiki-links";
import {
  ChevronRight,
  BookOpen,
  Cpu,
  Layers,
  Server,
  FileText,
  Users,
  Building2,
  Lightbulb,
  Search,
  Network,
  Bookmark,
  Library,
  BookCopy,
  Folder,
  Compass,
  ShieldCheck,
  Webhook,
  TreePine,
  Zap,
  Bot,
  Heart,
  Database,
  Bell,
  Eye,
  Activity,
  Wrench,
  GitBranch,
  Radio,
} from "lucide-react";

interface TreeNode {
  label: string;
  slug?: string;
  category?: string;
  children?: TreeNode[];
  count?: number;
  icon?: string;
}

interface WikiSidebarProps {
  tree: TreeNode[];
  onSearchClick: () => void;
}

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
  // Top-level tree nodes
  "Knowledge Archive": Library,
  Documentation: BookCopy,
  // Documentation groups (one per PAI/DOCUMENTATION/ subfolder + Overview)
  Overview: Compass,
  Agents: Bot,
  Algorithm: Cpu,
  Arbol: TreePine,
  Config: Wrench,
  Delegation: GitBranch,
  Fabric: Layers,
  Feed: Radio,
  Hooks: Webhook,
  LifeOs: Heart,
  Memory: Database,
  Notifications: Bell,
  Observability: Eye,
  Pulse: Activity,
  Security: ShieldCheck,
  Skills: Zap,
  Tools: Server,
  // Knowledge Archive domains
  People: Users,
  Companies: Building2,
  Ideas: Lightbulb,
  Bookmarks: Bookmark,
  // Fallback
  Other: Folder,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Knowledge Archive": "text-emerald-400",
  Documentation: "text-cyan-400",
  Overview: "text-emerald-400",
  Agents: "text-violet-400",
  Algorithm: "text-cyan-400",
  Arbol: "text-emerald-400",
  Config: "text-slate-400",
  Delegation: "text-amber-400",
  Fabric: "text-violet-400",
  Feed: "text-sky-400",
  Hooks: "text-amber-400",
  LifeOs: "text-rose-400",
  Memory: "text-violet-400",
  Notifications: "text-amber-400",
  Observability: "text-sky-400",
  Pulse: "text-emerald-400",
  Security: "text-rose-400",
  Skills: "text-amber-400",
  Tools: "text-slate-400",
  People: "text-sky-400",
  Companies: "text-amber-400",
  Ideas: "text-violet-400",
  Bookmarks: "text-rose-400",
  Other: "text-slate-500",
};

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const pathname = usePathname();
  const hasChildren = node.children && node.children.length > 0;
  const Icon = CATEGORY_ICONS[node.label] || FileText;
  const color = CATEGORY_COLORS[node.label] || "text-slate-400";

  const linkPath = node.slug && node.category
    ? wikiPageUrl(node.category, node.slug)
    : undefined;

  const isActive = linkPath && pathname === linkPath;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded-md transition-colors group",
            "text-slate-400 hover:text-white hover:bg-white/5"
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px`, fontFamily: "'concourse-t3', sans-serif" }}
        >
          <ChevronRight
            className={cn(
              "w-3 h-3 transition-transform shrink-0",
              expanded && "rotate-90"
            )}
          />
          <Icon className={cn("w-3.5 h-3.5 shrink-0", color)} />
          <span className="truncate">{node.label}</span>
          {node.count !== undefined && (
            <span className="ml-auto text-[13px] text-slate-600 tabular-nums">{node.count}</span>
          )}
        </button>
        {expanded && (
          <div className="mt-0.5">
            {node.children!.map((child, i) => (
              <TreeItem key={child.slug || child.label + i} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Leaf node
  return (
    <Link
      href={linkPath || "#"}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors",
        isActive
          ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
      )}
      style={{ paddingLeft: `${depth * 12 + 8}px`, fontFamily: "'concourse-t3', sans-serif" }}
    >
      <span className="w-1 h-1 rounded-full bg-current shrink-0 opacity-40" />
      <span className="truncate">{node.label}</span>
    </Link>
  );
}

export default function WikiSidebar({ tree, onSearchClick }: WikiSidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/50 bg-slate-950/50 overflow-y-auto h-[calc(100vh-3.5rem)]">
      {/* Search trigger */}
      <div className="p-3 border-b border-slate-800/50">
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-500 rounded-lg border border-slate-800/50 bg-slate-900/50 hover:border-slate-700 hover:text-slate-400 transition-colors"
          style={{ fontFamily: "'concourse-t3', sans-serif" }}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="ml-auto text-[13px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-slate-500">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Graph link */}
      <div className="px-3 pt-3 pb-1">
        <Link
          href={WIKI_GRAPH_URL}
          className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-500 rounded-md hover:text-violet-400 hover:bg-violet-500/5 transition-colors"
          style={{ fontFamily: "'concourse-t3', sans-serif" }}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Knowledge Graph</span>
        </Link>
      </div>

      {/* Tree navigation */}
      <nav className="p-3 space-y-1">
        {/* Documentation section */}
        <div className="mb-3">
          <div
            className="text-[13px] font-medium tracking-[0.2em] text-slate-600 uppercase px-2 mb-2"
            style={{ fontFamily: "'advocate-c14', sans-serif" }}
          >
            Documentation
          </div>
          {tree
            .filter((n) => n.label === "Documentation")
            .map((node, i) => (
              <TreeItem key={node.label + i} node={node} />
            ))}
        </div>

        {/* Knowledge section */}
        <div>
          <div
            className="text-[13px] font-medium tracking-[0.2em] text-slate-600 uppercase px-2 mb-2 mt-4"
            style={{ fontFamily: "'advocate-c14', sans-serif" }}
          >
            Knowledge
          </div>
          {tree
            .filter((n) => n.label === "Knowledge Archive")
            .map((node, i) => (
              <TreeItem key={node.label + i} node={node} />
            ))}
        </div>

        {/* Bookmarks section */}
        {tree.some((n) => n.label === "Bookmarks") && (
          <div>
            <div
              className="text-[13px] font-medium tracking-[0.2em] text-slate-600 uppercase px-2 mb-2 mt-4"
              style={{ fontFamily: "'advocate-c14', sans-serif" }}
            >
              Bookmarks
            </div>
            {tree
              .filter((n) => n.label === "Bookmarks")
              .map((node, i) => (
                <TreeItem key={node.label + i} node={node} />
              ))}
          </div>
        )}
      </nav>
    </aside>
  );
}
