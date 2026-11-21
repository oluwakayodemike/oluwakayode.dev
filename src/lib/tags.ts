import { posts, projects } from "@/data/portfolio";

export const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

export const sortedTags = (tags: readonly string[]) =>
  [...new Set(tags.map((tag) => tag.toLowerCase()))].sort((a, b) => a.localeCompare(b, "en"));

export const postsWithTag = (tag: string) => posts.filter((p) => p.tags?.some((t) => same(t, tag)));

export const projectsWithTag = (tag: string) =>
  projects.filter((p) => p.tags.some((t) => same(t, tag)));

// count each article or project once per tag, regardless of capitalization.
export const tagIndex = () => {
  const counts = new Map<string, number>();
  for (const item of [...posts, ...projects]) {
    for (const tag of sortedTags(item.tags ?? [])) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts].sort((a, b) => a[0].localeCompare(b[0], "en"));
};
