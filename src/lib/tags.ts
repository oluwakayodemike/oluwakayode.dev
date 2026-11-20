import { posts, projects } from "@/data/portfolio";

export const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

export const postsWithTag = (tag: string) => posts.filter((p) => p.tags?.some((t) => same(t, tag)));

export const projectsWithTag = (tag: string) =>
  projects.filter((p) => p.tags.some((t) => same(t, tag)));

// every writing tag with how many things carry it, writing and built together,
// most used first, then a to z. the tag list itself stays writing-only so it
// doesn't fill up with project-only tags.
export const tagIndex = (active: string) => {
  const counts = new Map<string, number>();
  const bump = (k: string) => counts.set(k, (counts.get(k) ?? 0) + 1);
  posts.forEach((p) => p.tags?.forEach(bump));
  projects.forEach((p) =>
    p.tags.forEach((t) => {
      const key = [...counts.keys()].find((k) => same(k, t));
      if (key) bump(key);
      else if (same(t, active)) bump(active);
    }),
  );
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
};
