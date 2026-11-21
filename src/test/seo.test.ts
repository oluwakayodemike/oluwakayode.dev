import { describe, expect, it } from "vitest";
import { posts, projects } from "@/data/portfolio";
import {
  articleStructuredData,
  jsonLdScript,
  profileStructuredData,
  projectsStructuredData,
  writingsStructuredData,
  homeTitle,
  homeDescription,
} from "@/lib/seo";

describe("portfolio structured data", () => {
  it("links the profile page to the correct person", () => {
    const graph = profileStructuredData()["@graph"];
    expect(graph[0]).toMatchObject({
      "@type": "Person",
      "@id": "/#person",
      name: "Michael Kayode Oluwasegun",
    });
    expect(graph[2]).toMatchObject({ "@type": "ProfilePage", mainEntity: { "@id": "/#person" } });
    expect(graph[0]).toMatchObject({
      alternateName: ["mko.", "mko", "Michael Oluwasegun"],
      sameAs: [
        "https://github.com/oluwakayodemike",
        "https://www.linkedin.com/in/oluwakayodemike",
        "https://x.com/trulymko",
        "https://medium.com/@michaelaykay",
        "https://www.instagram.com/oluwakayode.dev",
      ],
    });
  });

  it("identifies both mko and the short name in homepage search metadata", () => {
    expect(homeTitle).toContain("Michael K.O | Software & Equity Research");
    expect(homeDescription).toContain("Michael K.O, also known as mko");
  });

  it("keeps draft posts out of the public writing collection schema", () => {
    const draft = {
      slug: "not-published",
      title: "Draft",
      date: "2026-11-20",
      excerpt: "Not public",
      paragraphs: [],
      sample: true,
    };
    const page = writingsStructuredData([draft])["@graph"][2];
    expect(page).toHaveProperty("mainEntity.numberOfItems", 0);
    expect(page).toHaveProperty("mainEntity.itemListElement", []);
  });

  it("lists every project in order without claiming placeholder authorship", () => {
    const page = projectsStructuredData(projects)["@graph"][2];
    expect(page).toMatchObject({ "@type": "CollectionPage", url: "/projects" });
    expect(page).toHaveProperty("mainEntity.numberOfItems", projects.length);
    expect(page).toHaveProperty("mainEntity.itemListElement.0.item.name", projects[0]?.name);
    expect(JSON.stringify(page)).not.toContain('"creator"');
  });

  it("does not promote sample writing as published articles", () => {
    for (const post of posts.filter((item) => item.sample)) {
      expect(articleStructuredData(post)).toBeUndefined();
    }
  });

  it("attributes real articles and preserves their publication date", () => {
    const post = {
      slug: "real-post",
      title: "A real post",
      date: "2026-11-16",
      excerpt: "My notes",
      paragraphs: [],
    };
    expect(articleStructuredData(post)?.["@graph"][2]).toMatchObject({
      "@type": "BlogPosting",
      datePublished: "2026-11-16",
      url: "/posts/real-post",
      author: { "@id": "/#person" },
    });
  });

  it("safely serializes content that could close a script", () => {
    const data = { name: "</script><script>bad</script>" };
    const script = jsonLdScript(data);
    expect(script.children).not.toContain("<");
    expect(JSON.parse(script.children)).toEqual(data);
  });
});
