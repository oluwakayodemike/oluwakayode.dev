import { describe, expect, it } from "vitest";
import { postsWithTag, projectsWithTag, tagIndex } from "@/lib/tags";

describe("tag counts", () => {
  it("counts python across writing and built work, not just one article", () => {
    const entry = tagIndex("python").find(([t]) => t.toLowerCase() === "python");
    expect(entry?.[1]).toBe(4);
    expect(postsWithTag("python").length).toBe(1);
    expect(projectsWithTag("python").length).toBe(3);
  });

  it("shows the same number in the tag index as the page header does", () => {
    tagIndex("python").forEach(([tag, count]) => {
      expect(count).toBe(postsWithTag(tag).length + projectsWithTag(tag).length);
    });
  });

  it("keeps the tag list writing-only but still marks the tag you are on", () => {
    const index = tagIndex("splunk");
    expect(index.some(([t]) => t.toLowerCase() === "splunk")).toBe(true);
    expect(index.some(([t]) => t.toLowerCase() === "fastapi")).toBe(false);
  });
});
