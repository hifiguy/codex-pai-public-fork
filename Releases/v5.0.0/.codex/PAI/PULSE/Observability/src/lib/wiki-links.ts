export function wikiPageUrl(category: string, slug: string): string {
  if (category === "system-doc") return `/docs?doc=${slug}`;
  if (category === "bookmark") return `/knowledge?bookmark=${slug}`;
  return `/knowledge?category=${category}&slug=${slug}`;
}

export const WIKI_GRAPH_URL = `/knowledge/graph`;
