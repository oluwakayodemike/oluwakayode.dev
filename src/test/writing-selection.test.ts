import { describe, expect, it } from "vitest";
import { posts } from "@/data/portfolio";

describe("retained writing", () => {
  it("keeps only the local-first and Michael's MongoDB articles", () => {
    expect(posts.map((post) => post.slug)).toEqual([
      "software-without-a-connection",
      "fixing-mongodb-querysrv-econnrefused",
    ]);
  });

  it("preserves the MongoDB publication date and real Medium cross-post", () => {
    expect(
      posts.find((post) => post.slug === "fixing-mongodb-querysrv-econnrefused"),
    ).toMatchObject({
      date: "2026-02-01",
      mediumUrl:
        "https://medium.com/@michaelaykay/fixing-the-mongodb-querysrv-econnrefused-nightmare-on-localhost-fe17bf7f1092",
    });
  });

  it("does not claim the local-first draft is already published on Medium", () => {
    const post = posts.find((item) => item.slug === "software-without-a-connection");
    expect(post?.sample).toBe(true);
    expect(post?.mediumUrl).toBeUndefined();
  });
});
