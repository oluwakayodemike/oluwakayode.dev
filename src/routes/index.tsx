import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectItem, ScribbleFrame, Section, Shell } from "@/components/site/Shell";
import { WritingList } from "@/components/site/WritingList";
import { GalleryPeek } from "@/components/site/GalleryPeek";
import { Toolkit } from "@/components/site/Toolkit";
import { intro, posts, profile, projects } from "@/data/portfolio";
import {
  homeDescription,
  homeTitle,
  jsonLdScript,
  profileStructuredData,
  ogImageMeta,
} from "@/lib/seo";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => ({
    meta: [
      { title: homeTitle },
      { name: "description", content: homeDescription },
      { property: "og:title", content: homeTitle },
      { property: "og:description", content: homeDescription },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...ogImageMeta(loaderData?.origin, "home", "mko. I write code and read balance sheets."),
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [jsonLdScript(profileStructuredData())],
  }),
  component: Index,
});

const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);

function withName(text: string) {
  const marker = "{{name}}";
  const i = text.indexOf(marker);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-foreground">{profile.name}</span> <GalleryPeek />
      {text.slice(i + marker.length)}
    </>
  );
}

function Index() {
  return (
    <Shell>
      <h1 className="font-display text-[2.3rem] leading-[1.15] text-pretty sm:text-[2.75rem] md:text-[2.4rem]">
        I write code and read <em>balance sheets</em>.
      </h1>

      <div className="mt-10 max-w-[34rem] md:max-w-none space-y-5 text-[1.02rem] leading-[1.75] text-pretty text-muted-foreground sm:mt-12 sm:space-y-6 sm:text-[1.08rem] md:mt-10 md:space-y-5 md:text-[0.95rem]">
        {intro.map((p) => (
          <p key={p.slice(0, 24)}>{withName(p)}</p>
        ))}
      </div>

      <p className="mt-10 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <span className="pulse-dot" /> Open to internships in tech & finance
      </p>

      <section className="mt-12 md:mt-20">
        <Section label="Projects">
          {featuredProjects.map((p) => (
            <ProjectItem
              key={p.name}
              year={p.year}
              field={p.category}
              name={p.name}
              tagline={p.tagline}
              blurb={p.tagline}
              image={p.image}
              imageSrcSet={p.imageSrcSet}
              tags={p.tags}
              live={p.live}
              repo={p.repo}
              demo={p.demo}
              wip={p.wip}
            />
          ))}
          <Link
            to="/projects"
            className="mt-3 inline-block font-mono text-[0.8125rem] text-muted-foreground link-soft sm:text-[0.9rem]"
          >
            View all projects →
          </Link>
        </Section>
      </section>

      <div className="defer-toolkit mt-12 md:mt-20">
        <Section label="Toolkit">
          <Toolkit />
        </Section>
      </div>

      <div className="defer-section mt-12 md:mt-20">
        <Section label={posts.length > 1 ? "Writings" : "Writing"}>
          <WritingList posts={posts} />
          <div className="mt-10 sm:mt-12">
            <Link
              to="/writings"
              className="inline-block font-mono text-[0.8125rem] text-muted-foreground link-soft sm:text-[0.9rem]"
            >
              View all writings →
            </Link>
          </div>
        </Section>
      </div>

      <section className="defer-section mt-16 text-center md:mt-24">
        <ScribbleFrame>
          <p className="font-display text-[1.75rem] leading-snug sm:text-4xl">
            Let's build something
            <br />
            <em>worth compounding.</em>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block rounded-full border border-foreground px-7 py-3 text-sm tracking-wide transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Say hello →
          </a>
        </ScribbleFrame>
      </section>
    </Shell>
  );
}
