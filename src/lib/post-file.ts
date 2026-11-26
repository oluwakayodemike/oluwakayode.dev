import type { Post } from "@/data/portfolio";

// reads a blog file: a small "key: value" header between --- lines, then markdown.
// quoted strings, arrays and booleans are json; anything else stays plain text.
export function parsePostFile(slug: string, source: string): Post {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`${slug}.md needs a --- header at the top`);
  const fields: Record<string, unknown> = {};
  for (const line of (match[1] ?? "").split(/\r?\n/)) {
    if (!line.trim()) continue;
    const split = line.indexOf(":");
    if (split < 1) throw new Error(`${slug}.md has an unreadable header line: ${line}`);
    const key = line.slice(0, split).trim();
    const raw = line.slice(split + 1).trim();
    fields[key] = /^["[]|^(true|false)$/.test(raw) ? JSON.parse(raw) : raw;
  }
  for (const key of ["title", "date", "excerpt"]) {
    if (typeof fields[key] !== "string") throw new Error(`${slug}.md is missing ${key}`);
  }
  return { ...(fields as Omit<Post, "slug" | "body">), slug, body: (match[2] ?? "").trim() };
}

// newest first, so lists and navigation read the same everywhere.
export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
