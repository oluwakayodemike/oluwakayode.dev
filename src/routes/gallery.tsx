import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { galleryPhotos } from "@/data/gallery";
import { profile } from "@/data/portfolio";
import { SITE_ORIGIN } from "@/lib/site";

const title = `Gallery | ${profile.metaName} (${profile.brand.replace(/\.$/, "")})`;
const description =
  "Random images go here. Ink drawings of trees, streets, doors, and water, whatever I find amusing.";

export const Route = createFileRoute("/gallery")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/gallery` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/gallery` }],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <Shell>
      <p className="font-mono text-xs text-muted-foreground">you found it</p>
      <h1 className="mt-3 font-display text-[2.6rem] leading-[1.1] md:text-[2.6rem]">
        A small <em>gallery.</em>
      </h1>
      <p className="mt-8 max-w-[34rem] text-[1.02rem] leading-[1.75] text-muted-foreground md:mt-5 md:max-w-[30rem] md:text-[0.9rem] md:leading-relaxed">
        Random images go here. Trees, streets, doors, water, whatever I find amusing.
      </p>
      <div className="mt-10 columns-2 gap-3 md:mt-8 md:columns-3 [&>figure]:mb-3">
        {galleryPhotos.map((p) => (
          <figure key={p.src} className="break-inside-avoid">
            <img
              src={p.src}
              srcSet={p.srcSet}
              sizes="(min-width: 768px) 14.5rem, (min-width: 640px) 16.5rem, 44vw"
              alt={p.alt}
              width={p.w}
              height={p.h}
              loading="lazy"
              decoding="async"
              className="w-full"
            />
            <figcaption className="mt-1.5 font-mono text-[11px] text-muted-foreground">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <Link
        to="/"
        className="mt-10 inline-block font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        ← Back home
      </Link>
    </Shell>
  );
}
