import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { formatPostDate, profile } from "@/data/portfolio";
import { ogImageMeta } from "@/lib/seo";
import { getRequestOrigin } from "@/lib/origin.functions";
import { postsWithTag, projectsWithTag, same, tagIndex } from "@/lib/tags";

export const Route = createFileRoute("/writings_/tag/$tag")({
  staticData: { sitemap: true },
  loader: async ({ params }) => {
    if (postsWithTag(params.tag).length + projectsWithTag(params.tag).length === 0)
      throw notFound();
    return { origin: await getRequestOrigin() };
  },
  head: ({ params, loaderData }) => {
    const title = `Writing tagged ${params.tag} | ${profile.metaName}`;
    const description = `Everything I've written about ${params.tag}.`;
    const url = `/writings/tag/${encodeURIComponent(params.tag)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...ogImageMeta(loaderData?.origin, "writings", `Writings by ${profile.metaName}`),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: TagPage,
  errorComponent: () => (
    <Shell>
      <p>Something went wrong loading this tag.</p>
    </Shell>
  ),
  notFoundComponent: () => (
    <Shell>
      <div className="flex min-h-[45vh] flex-col items-center justify-center py-16 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">EMPTY TAG</p>
        <h1 className="mt-4 font-display text-[2.1rem] leading-[1.1] text-balance sm:text-5xl">
          Nothing tagged <em>that yet.</em>
        </h1>
        <p className="mt-5 max-w-[24rem] text-pretty leading-relaxed text-muted-foreground">
          I haven't written or built anything under this one. Maybe someday.
        </p>
        <Link
          to="/writings"
          className="mt-9 inline-block rounded-full border border-foreground px-7 py-3 text-sm tracking-wide transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          ← All writings
        </Link>
      </div>
    </Shell>
  ),
});

function TagPage() {
  const { tag } = Route.useParams();
  const list = postsWithTag(tag);
  const built = projectsWithTag(tag);
  const index = tagIndex(tag);
  return (
    <Shell>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
        Everything on
      </p>
      <h1 className="mt-3 font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl">
        <em>{tag}</em>
        <sup className="ml-2 align-super font-mono text-xs not-italic tracking-normal text-muted-foreground">
          {list.length + built.length}
        </sup>
      </h1>

      <nav
        aria-label="All tags"
        className="mt-8 flex flex-wrap items-baseline font-sans text-[0.72rem] tracking-normal leading-[2.1] text-muted-foreground"
      >
        {index.map(([t, n], i) => {
          const active = same(t, tag);
          return (
            <span key={t} className="whitespace-nowrap">
              <Link
                to="/writings/tag/$tag"
                params={{ tag: t }}
                aria-current={active ? "page" : undefined}
                className={active ? "bg-tag px-1.5 py-0.5 text-tag-foreground" : "link-soft"}
              >
                {t}
                <sup className="ml-0.5 text-[0.55rem] opacity-60">{n}</sup>
              </Link>
              {i < index.length - 1 && (
                <span aria-hidden="true" className="mx-2 opacity-40">
                  /
                </span>
              )}
            </span>
          );
        })}
      </nav>

      <section className="mt-14">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          Writing
        </h2>
        {list.length === 0 ? (
          <p className="mt-5 text-muted-foreground">Nothing written under this one yet.</p>
        ) : (
          <ul className="mt-6 space-y-10">
            {list.map((post) => (
              <li key={post.slug}>
                <Link to="/posts/$slug" params={{ slug: post.slug }} className="group block">
                  <time
                    dateTime={post.date}
                    className="font-mono text-[0.6875rem] text-muted-foreground"
                  >
                    {formatPostDate(post.date)}
                  </time>
                  <span className="mt-2 block font-display text-[1.6rem] leading-snug decoration-border underline-offset-4 group-hover:underline">
                    {post.title}
                  </span>
                  <span className="mt-2 block leading-relaxed text-muted-foreground text-pretty">
                    {post.excerpt}
                  </span>
                </Link>
                {post.tags && (
                  <p className="mt-3 font-sans text-[0.65rem] tracking-normal text-muted-foreground">
                    {post.tags.map((t, i) => (
                      <span key={t}>
                        <Link
                          to="/writings/tag/$tag"
                          params={{ tag: t }}
                          className={same(t, tag) ? "text-foreground" : "link-soft"}
                        >
                          {t}
                        </Link>
                        {i < (post.tags?.length ?? 0) - 1 && (
                          <span aria-hidden="true" className="mx-1.5 opacity-40">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {built.length > 0 && (
        <section className="mt-14">
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            Also built with it
          </h2>
          <ul className="mt-5 space-y-3">
            {built.map((p) => (
              <li key={p.name} className="flex items-baseline gap-3">
                <Link
                  to="/projects"
                  className="link-soft shrink-0 whitespace-nowrap font-display text-xl"
                >
                  {p.name}
                </Link>
                <span className="truncate text-sm text-muted-foreground">{p.tagline}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-14">
        <Link
          to="/writings"
          className="font-mono text-[0.8125rem] text-muted-foreground link-soft sm:text-[0.9rem]"
        >
          ← All writings
        </Link>
      </div>
    </Shell>
  );
}
