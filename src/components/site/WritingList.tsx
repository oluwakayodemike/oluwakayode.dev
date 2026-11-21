import { Link } from "@tanstack/react-router";
import { formatPostDate, type Post } from "@/data/portfolio";

export function WritingList({ posts, showTags = false }: { posts: Post[]; showTags?: boolean }) {
  return (
    <ul className="space-y-7">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            className="group grid grid-cols-1 gap-y-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="font-mono text-[0.6875rem] text-muted-foreground">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </span>
            <span className="font-display text-[1.5rem] leading-snug text-foreground decoration-border underline-offset-4 group-hover:underline md:text-[1.32rem]">
              {post.title}
            </span>
          </Link>
          {showTags && post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
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
        </li>
      ))}
    </ul>
  );
}
