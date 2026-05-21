"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import WikiSidebar from "@/components/wiki/WikiSidebar";
import WikiSearch from "@/components/wiki/WikiSearch";

interface TreeNode {
  label: string;
  slug?: string;
  category?: string;
  children?: TreeNode[];
  count?: number;
}

function filterDocsTree(tree: TreeNode[]): TreeNode[] {
  return tree.filter((node) => {
    const label = node.label?.toLowerCase() ?? "";
    return label === "documentation";
  });
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  const { data } = useQuery<{ tree: TreeNode[] }>({
    queryKey: ["wiki-tree"],
    queryFn: async () => {
      const res = await fetch("/api/wiki");
      if (!res.ok) throw new Error("Failed to fetch wiki index");
      return res.json();
    },
    staleTime: 30_000,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const docsTree = data?.tree ? filterDocsTree(data.tree) : [];

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <WikiSidebar tree={docsTree} onSearchClick={() => setSearchOpen(true)} />
      <div className="flex-1 overflow-hidden">{children}</div>
      <WikiSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
