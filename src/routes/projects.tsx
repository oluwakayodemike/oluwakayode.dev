import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectItem, Shell } from "@/components/site/Shell";
import { profile, projects } from "@/data/portfolio";
import {
  jsonLdScript,
  projectsDescription,
  projectsStructuredData,
  projectsTitle,
  ogImageMeta,
} from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site";

export const Route = createFileRoute("/projects")({
  staticData: { sitemap: true },
  loader: () => ({ origin: SITE_ORIGIN }),
  head: ({ loaderData }) => ({
    meta: [
      { title: projectsTitle },
      { name: "description", content: projectsDescription },
      { property: "og:title", content: projectsTitle },
      { property: "og:description", content: projectsDescription },
      { property: "og:url", content: `${SITE_ORIGIN}/projects` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...ogImageMeta(loaderData?.origin, "projects", `Projects by ${profile.metaName}`),
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/projects` }],
    scripts: [jsonLdScript(projectsStructuredData(projects))],
  }),
  component: Projects,
});

function Projects() {
  return (
    <Shell>
      <h1 className="font-display text-[2.4rem] leading-[1.1] tracking-tight sm:text-5xl md:text-[2.6rem]">
        Things I enjoyed
        <br />
        <em>working on.</em>
      </h1>
      <p className="mt-6 max-w-[30rem] leading-relaxed text-muted-foreground text-pretty md:mt-5 md:text-[0.9rem]">
        Things I made to explore, to learn, or just because they seemed cool. If it's here, I'd use
        it myself.
      </p>

      <div className="mt-14 md:mt-10">
        {projects.map((p) => (
          <ProjectItem
            key={p.name}
            year={p.year}
            field={p.category}
            name={p.name}
            tagline={p.tagline}
            blurb={p.description}
            tags={p.tags}
            image={p.image}
            imageSrcSet={p.imageSrcSet}
            live={p.live}
            repo={p.repo}
            demo={p.demo}
            wip={p.wip}
          />
        ))}
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
