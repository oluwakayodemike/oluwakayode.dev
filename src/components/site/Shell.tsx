import { Link, useLoaderData } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { GeneratedCover } from "./GeneratedCover";
import { Clock } from "./Clock";

export function Shell({ children }: { children: ReactNode }) {
  const initialClockTime = useLoaderData({ from: "__root__" })?.initialClockTime;
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      setDark(localStorage.getItem("theme") === "dark");
    } catch {
      // blocked storage should not prevent the page from loading
    }
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  const toggle = () => {
    const nextDark = !dark;
    setDark(nextDark);
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      // the theme still works when this browser cannot save the preference
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="mx-auto max-w-xl md:max-w-3xl px-6 pt-[12px] pb-4 sm:pt-4 sm:pb-5 md:pt-3 md:pb-3">
          <header className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-[4px] sm:gap-y-2 md:gap-y-1.5">
            <Link to="/" className="w-fit font-display text-3xl leading-none md:text-2xl">
              {profile.brand}
            </Link>
            <Button
              variant="link"
              onClick={toggle}
              className="row-span-2 -mt-0.5 self-center h-11 w-11 shrink-0 rounded-none p-0 font-mono text-xs font-normal text-muted-foreground hover:text-foreground sm:h-[1.875rem] sm:w-auto"
            >
              {dark ? "light" : "dark"}
            </Button>
            <p className="font-mono text-xs tracking-wide text-muted-foreground">
              <Clock initialTime={initialClockTime} /> · {profile.location}
            </p>
          </header>
        </div>
      </div>
      <div className="mx-auto max-w-xl md:max-w-3xl px-6">
        <main className="mt-8 sm:mt-10">{children}</main>
      </div>
      <footer className="defer-section mt-12 border-t border-border text-muted-foreground sm:mt-16">
        <div className="mx-auto max-w-xl md:max-w-3xl px-6 pt-7 pb-16 text-center sm:pt-9 sm:pb-24">
          <div className="flex flex-col items-center gap-5 sm:gap-6">
            <div className="min-w-0">
              <p className="font-display text-[1.65rem] leading-tight text-foreground">
                {profile.name}
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="link-soft mt-2 inline-block max-w-full break-all text-[0.8125rem] leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-sm"
              >
                {profile.email.replace("@", " [at] ").replaceAll(".", " [dot] ")}
              </a>
            </div>
            <nav
              aria-label="Social links"
              className="flex flex-wrap justify-center gap-x-5 gap-y-3 font-mono text-[0.75rem] leading-relaxed"
            >
              <a
                className="link-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                href={profile.links.github}
              >
                GitHub
              </a>
              <a
                className="link-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                href={profile.links.linkedin}
              >
                LinkedIn
              </a>
              <a
                className="link-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                href={profile.links.x}
              >
                X
              </a>
              <a
                className="link-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                href={profile.links.resume}
              >
                Résumé
              </a>
            </nav>
          </div>
          <p className="mt-7 font-mono text-[0.6875rem] leading-relaxed sm:mt-8">
            © {new Date().getFullYear()} {profile.name} | All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* a fine diagonal hatch strip, like the ruled bands at the edge of a ledger page. */
function HatchStrip({ side }: { side: "top" | "bottom" }) {
  return (
    <div
      className={`absolute left-0 right-0 h-5 border-y border-border/60 text-muted-foreground/40 dark:text-muted-foreground/30 ${side === "top" ? "top-0" : "bottom-0"}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 8px)",
      }}
      aria-hidden="true"
    />
  );
}

/* a hand-drawn ink frame: one smooth, gently wobbling outline with hatched bands above and below. */
export function ScribbleFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative py-14 sm:py-20 md:py-24">
      <HatchStrip side="top" />
      <HatchStrip side="bottom" />
      <svg
        className="pointer-events-none absolute inset-x-0 inset-y-5 h-[calc(100%-2.5rem)] w-full text-muted-foreground/60 dark:text-muted-foreground/50"
        viewBox="0 0 600 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M42 14 C 200 4, 400 4, 558 14 C 584 18, 590 118, 590 200 C 590 282, 584 382, 558 386 C 400 396, 200 396, 42 386 C 16 382, 10 282, 10 200 C 10 118, 16 18, 42 14 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="relative px-4 sm:px-10">{children}</div>
    </div>
  );
}

/* section heading: bold display lettering with the existing small ink underline. */
export function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-6 border-t border-border/70 md:hidden" aria-hidden="true" />
      <h2 className="font-display inline-block text-[1.9rem] tracking-tight sm:text-[2.1rem] md:text-[1.8rem]">
        {label}
        <svg
          className="-mt-1 block h-3 w-[calc(100%+0.25rem)] overflow-visible text-muted-foreground/60 dark:text-muted-foreground/80"
          viewBox="0 0 100 12"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M1.5 5 C 14 1.5, 24 7.5, 36 5 S 58 1.5, 70 5 S 90 7.5, 98.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M4 10 C 16 6.5, 26 11.5, 38 9 S 60 6.5, 72 9 S 91 11.5, 96 7.5"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.55"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

/* a project: a quiet cover image, then year and field, the name, what it is, small tags and links. */
export function ProjectItem({
  year,
  field,
  name,
  blurb,
  tagline,
  tags,
  image,
  imageSrcSet,
  live,
  repo,
  demo,
  wip,
}: {
  year: string;
  field: string;
  name: string;
  blurb: string;
  tagline?: string | undefined;
  image?: string | undefined;
  tags?: string[] | undefined;
  live?: string | undefined;
  repo?: string | undefined;
  imageSrcSet?: string | undefined;
  wip?: boolean | undefined;
  demo?: string | undefined;
}) {
  return (
    <article className="defer-project mb-7 last:mb-0 md:mb-8">
      <div className="relative overflow-hidden border border-border/70 md:hidden">
        {image ? (
          <img
            src={image}
            srcSet={imageSrcSet}
            sizes="(max-width: 575px) calc(100vw - 50px), 740px"
            alt={`${name} cover`}
            loading="lazy"
            decoding="async"
            width={1088}
            height={612}
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        ) : (
          <GeneratedCover name={name} tagline={tagline ?? blurb} year={year} />
        )}
        {demo && (
          <>
            <span className="sr-only">Demo video available</span>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-16 w-16 overflow-hidden"
            >
              <span className="absolute left-0 top-[0.45rem] w-24 rotate-45 bg-tag py-0.5 text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-tag-foreground">
                demo
              </span>
            </div>
          </>
        )}
        {wip && (
          <>
            <span className="sr-only">Work in progress</span>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-16 w-16 overflow-hidden"
            >
              <span className="absolute left-0 top-[0.45rem] w-24 rotate-45 bg-tag py-0.5 text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-tag-foreground">
                wip
              </span>
            </div>
          </>
        )}
      </div>
      <p className="mt-5 md:mt-0 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground tabular md:text-[0.56rem]">
        {year} · {field}
      </p>
      <h3 className="mt-2 font-display text-[1.6rem] leading-snug md:mt-1.5 md:text-[1.32rem]">
        {name}
        {(wip || demo) && (
          <sup
            aria-hidden="true"
            className="ml-1.5 hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground md:inline"
          >
            ({wip ? "wip" : "demo"})
          </sup>
        )}
      </h3>
      <p className="mt-1.5 leading-relaxed text-muted-foreground md:mt-1 md:text-[0.9rem]">
        {blurb}
      </p>
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 md:mt-3 md:gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="bg-tag px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-tag-foreground md:px-2.5 md:py-0.5 md:text-[0.56rem]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {(demo || live || repo) && (
        <p className="mt-4 flex gap-5 font-mono text-xs text-muted-foreground md:mt-3 md:gap-4 md:text-[0.7rem]">
          {demo && (
            <a className="link-soft" href={demo} target="_blank" rel="noopener noreferrer">
              Demo ↗
            </a>
          )}
          {live && (
            <a className="link-soft" href={live}>
              Live ↗
            </a>
          )}
          {repo && (
            <a className="link-soft" href={repo}>
              GitHub ↗
            </a>
          )}
        </p>
      )}
    </article>
  );
}
