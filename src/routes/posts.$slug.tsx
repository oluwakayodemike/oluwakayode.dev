import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ArticleBody } from "@/components/site/ArticleBody";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatPostDate, posts, profile } from "@/data/portfolio";
import { articleStructuredData, jsonLdScript, ogImageMeta, postOgImagePath } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site";
import { sortedTags } from "@/lib/tags";

export const Route = createFileRoute("/posts/$slug")({
  staticData: { sitemap: true },
  loader: () => ({ origin: SITE_ORIGIN }),
  head: ({ params, loaderData }) => {
    const post = posts.find((p) => p.slug === params.slug);
    const title = `${post?.title ?? "Post not found"} | ${profile.metaName}`;
    const description = post?.excerpt ?? "This article could not be found.";
    const url = `${SITE_ORIGIN}/posts/${params.slug}`;
    const structuredData = post ? articleStructuredData(post) : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(post ? [{ property: "article:published_time", content: post.date }] : []),
        ...(post?.tags ?? []).map((t) => ({ property: "article:tag", content: t })),
        ...ogImageMeta(
          loaderData?.origin,
          post ? postOgImagePath(post) : "writings",
          post?.title ?? `Writing by ${profile.metaName}`,
        ),
        ...(!post || post.sample ? [{ name: "robots", content: "noindex" }] : []),
      ],
      links: post ? [{ rel: "canonical", href: url }] : [],
      scripts: structuredData ? [jsonLdScript(structuredData)] : [],
    };
  },
  component: Article,
  notFoundComponent: () => (
    <Shell>
      <h1 className="font-display text-4xl">That post isn't here.</h1>
      <Link
        to="/"
        className="link-soft mt-8 inline-block font-mono text-[0.8125rem] text-muted-foreground sm:text-[0.9rem]"
      >
        ← Back home
      </Link>
    </Shell>
  ),
});

function Article() {
  const { slug } = Route.useParams();
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];
  if (!post) throw notFound();
  // posts are newest first: "newer" is the entry before, "older" the one after.
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <Shell>
      <article>
        <header>
          <h1 className="break-words font-display text-[2rem] leading-[1.15] text-pretty sm:text-5xl md:text-[2.6rem]">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {sortedTags(post.tags).map((t) => (
                <Link
                  key={t}
                  to="/writings/tag/$tag"
                  params={{ tag: t }}
                  className="bg-tag px-3 py-1 font-sans text-[0.62rem] tracking-normal text-tag-foreground transition-opacity hover:opacity-75"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
            Published on{" "}
            <time dateTime={post.date} className="italic">
              {formatPostDate(post.date)}
            </time>
          </p>
          <div className="mt-2">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-none text-muted-foreground [&_svg]:h-5 [&_svg]:w-7"
                  >
                    <a
                      href={post.mediumUrl ?? "https://medium.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={post.mediumUrl ? "Read on Medium" : "Visit Medium"}
                    >
                      <svg viewBox="0 0 28 20" fill="currentColor" aria-hidden="true">
                        <circle cx="9" cy="10" r="8" />
                        <ellipse cx="21" cy="10" rx="4" ry="8" />
                        <ellipse cx="27" cy="10" rx="1" ry="7" />
                      </svg>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {post.mediumUrl ? "Read on Medium" : "Visit Medium"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>
        {post.sample && (
          <p className="mt-7 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
            Draft article, still being refined before publication.
          </p>
        )}
        <ArticleBody content={post.body ?? post.paragraphs.join("\n\n")} />
        {(newer || older) && (
          <nav className="mt-10 grid grid-cols-2 gap-6 sm:mt-16" aria-label="More writing">
            {newer ? (
              <Link
                to="/posts/$slug"
                params={{ slug: newer.slug }}
                className="group min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span className="font-mono text-[0.6875rem] text-muted-foreground">← newer</span>
                <span className="mt-1.5 block truncate font-display text-[1.15rem] leading-snug text-foreground decoration-border underline-offset-4 group-hover:underline sm:text-[1.3rem] md:text-[1.1rem]">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {older ? (
              <Link
                to="/posts/$slug"
                params={{ slug: older.slug }}
                className="group min-w-0 text-right outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span className="font-mono text-[0.6875rem] text-muted-foreground">older →</span>
                <span className="mt-1.5 block truncate font-display text-[1.15rem] leading-snug text-foreground decoration-border underline-offset-4 group-hover:underline sm:text-[1.3rem] md:text-[1.1rem]">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
        <aside className="mt-10 flex gap-4 sm:mt-14" aria-label="A note on this piece">
          <svg
            className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/70"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 3.5v17M4.6 7.8l14.8 8.4M19.4 7.8 4.6 16.2"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-base leading-relaxed text-muted-foreground text-pretty sm:text-[1.05rem]">
            Dated <span className="text-foreground">{formatPostDate(post.date)}</span> on purpose.
            Tools change, opinions change, and I'd rather leave the old thinking up than delete it.
            If you see it differently,{" "}
            <a href={`mailto:${profile.email}`} className="link-soft text-foreground">
              tell me
            </a>
            .
          </p>
        </aside>
      </article>
      <div className="mt-10 sm:mt-12">
        <Link
          to="/"
          className="link-soft font-mono text-[0.8125rem] text-muted-foreground sm:text-[0.9rem]"
        >
          ← Back home
        </Link>
      </div>
    </Shell>
  );
}
