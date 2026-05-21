"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  table: ({ children }) => (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-slate-700 bg-slate-800/30">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-slate-800/50">{children}</tbody>,
  tr: ({ children }) => (
    <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-sm text-slate-300">{children}</td>
  ),
  h1: ({ children }) => <h1 className="text-xl font-semibold text-white mt-4 mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-base font-medium text-white mt-3 mb-1">{children}</h3>,
  h4: ({ children }) => <h4 className="text-sm font-medium text-slate-200 mt-2 mb-1">{children}</h4>,
  p: ({ children }) => <p className="text-sm text-slate-300 leading-relaxed my-1.5">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 my-2 text-sm text-slate-300">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 my-2 text-sm text-slate-300">{children}</ol>,
  li: ({ children }) => <li className="text-sm text-slate-300">{children}</li>,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  em: ({ children }) => <em className="text-slate-400 italic">{children}</em>,
  a: ({ href, children }) => (
    <a href={href} className="text-blue-400 hover:text-blue-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer">{children}</a>
  ),
  hr: () => <hr className="border-slate-800/50 my-4" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-slate-700 pl-4 my-3 text-slate-400 italic">{children}</blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return <code className={`block bg-slate-800/50 rounded-lg p-3 text-xs font-mono text-slate-300 overflow-x-auto my-2 ${className || ""}`}>{children}</code>;
    }
    return <code className="bg-slate-800/50 rounded px-1.5 py-0.5 text-xs font-mono text-slate-300">{children}</code>;
  },
  pre: ({ children }) => <pre className="my-2">{children}</pre>,
};

export default function Md({ content, className = "" }: { content: string; className?: string }) {
  if (!content) return null;
  const clean = content.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  if (!clean) return null;

  return (
    <div className={`max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{clean}</ReactMarkdown>
    </div>
  );
}
