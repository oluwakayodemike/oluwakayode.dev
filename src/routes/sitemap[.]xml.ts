import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { posts } from "@/data/portfolio";
import { SITE_ORIGIN } from "@/lib/site";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";

const BASE_URL = SITE_ORIGIN;

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        // drafts are noindex, so only published posts and their tags are listed
        const published = posts.filter((p) => !p.sample);
        for (const post of published) {
          const location = router.buildLocation({
            to: "/posts/$slug", params: { slug: post.slug }, search: () => ({}), hash: "",
          });
          const path = sitemapPathForLocation(router, location, "/posts/$slug");
          if (path) entries.push({ path });
        }
        const tags = new Set(published.flatMap((p) => p.tags ?? []).map((t) => t.toLowerCase()));
        for (const tag of tags) {
          const location = router.buildLocation({
            to: "/writings/tag/$tag", params: { tag }, search: () => ({}), hash: "",
          });
          const path = sitemapPathForLocation(router, location, "/writings_/tag/$tag");
          if (path) entries.push({ path });
        }

        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
