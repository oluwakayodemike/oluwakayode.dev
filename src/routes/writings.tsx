import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { WritingList } from "@/components/site/WritingList";
import { profile } from "@/data/portfolio";
import { posts } from "@/data/blogs";
import {
  jsonLdScript,
  writingsDescription,
  writingsStructuredData,
  writingsTitle,
  ogImageMeta,
} from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site";

export const Route = createFileRoute("/writings")({
  staticData: { sitemap: true },
  loader: () => ({ origin: SITE_ORIGIN }),
  head: ({ loaderData }) => ({
    meta: [
      { title: writingsTitle },
      { name: "description", content: writingsDescription },
      { property: "og:title", content: writingsTitle },
      { property: "og:description", content: writingsDescription },
      { property: "og:url", content: `${SITE_ORIGIN}/writings` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...ogImageMeta(loaderData?.origin, "writings", `Writings by ${profile.metaName}`),
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/writings` }],
    scripts: [jsonLdScript(writingsStructuredData(posts))],
  }),
  component: Writings,
});

function Writings() {
  return (
    <Shell>
      <h1 className="font-display text-[2.4rem] leading-[1.1] tracking-tight sm:text-5xl md:text-[2.6rem]">
        Pull up a chair,
        <br />
        I'm thinking <em>out loud.</em>
      </h1>
      <p className="mt-6 max-w-[30rem] leading-relaxed text-muted-foreground text-pretty md:max-w-none">
        I don't write often, but when I do, it's about whatever has my attention. Sometimes that's
        tech, sometimes it isn't. Things I'm learning, things I'm working on, side notes, random
        thoughts that won't leave me alone, or just life.
      </p>

      <div className="mt-14">
        <WritingList posts={posts} showTags />
      </div>

      <div className="mt-12">
        <Link
          to="/"
          className="font-mono text-[0.8125rem] text-muted-foreground link-soft sm:text-[0.9rem]"
        >
          ← Back home
        </Link>
      </div>
    </Shell>
  );
}
