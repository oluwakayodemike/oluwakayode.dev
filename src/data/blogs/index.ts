import type { Post } from "@/data/portfolio";
import { parsePostFile, sortPosts } from "@/lib/post-file";

// every .md file in this folder is a post; the file name becomes its url slug.
const files = import.meta.glob<string>("./*.md", { query: "?raw", import: "default", eager: true });

export const posts: Post[] = sortPosts(
  Object.entries(files).map(([file, source]) =>
    parsePostFile(file.replace(/^\.\/|\.md$/g, ""), source),
  ),
);
