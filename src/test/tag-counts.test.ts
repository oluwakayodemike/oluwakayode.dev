import { describe, expect, it } from "vitest";
import { postsWithTag, projectsWithTag, sortedTags, tagIndex } from "@/lib/tags";

describe("tag counts", () => {
  it("counts python across writing and built work, not just one article", () => {
    const entry = tagIndex().find(([t]) => t === "python");
    expect(entry?.[1]).toBe(4);
    expect(postsWithTag("python").length).toBe(1);
    expect(projectsWithTag("python").length).toBe(3);
  });

  it("shows the same number in the tag index as the page header does", () => {
    tagIndex().forEach(([tag, count]) => {
      expect(count).toBe(postsWithTag(tag).length + projectsWithTag(tag).length);
    });
  });

  it("includes project-only and article-only tags together", () => {
    const index = tagIndex();
    expect(index.find(([tag]) => tag === "cli")?.[1]).toBe(1);
    expect(index.find(([tag]) => tag === "fastapi")?.[1]).toBe(1);
    expect(index.find(([tag]) => tag === "error")?.[1]).toBe(1);
  });

  it("orders the complete tag index alphabetically", () => {
    expect(tagIndex().map(([tag]) => tag)).toEqual([
      "cli",
      "error",
      "express",
      "fastapi",
      "fernet",
      "fix",
      "gemini",
      "gmail api",
      "local-first",
      "mongodb",
      "next.js",
      "node.js",
      "openai clip",
      "paystack",
      "python",
      "sanity",
      "splunk",
      "sqlite",
      "textual",
      "tidb",
      "typescript",
    ]);
  });

  it("sorts tag labels without mutating their source", () => {
    const tags = ["Python", "cli", "PYTHON", "fernet"];
    expect(sortedTags(tags)).toEqual(["cli", "fernet", "python"]);
    expect(tags).toEqual(["Python", "cli", "PYTHON", "fernet"]);
  });
});
