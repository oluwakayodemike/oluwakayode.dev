import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { formatClockTime } from "@/lib/clock";
import { profile } from "@/data/portfolio";
import { Shell } from "@/components/site/Shell";

function NotFoundComponent() {
  return (
    <Shell>
      <div className="flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">404</p>
        <h1 className="mt-4 font-display text-[2.6rem] leading-[1.1] sm:text-[3.25rem]">
          Nothing lives <em>here.</em>
        </h1>
        <p className="mt-5 max-w-[26rem] text-pretty leading-relaxed text-muted-foreground">
          The link might be old, or I moved things around. Everything I've made and written is still
          a click away.
        </p>
        <Link
          to="/"
          className="mt-9 inline-block rounded-full border border-foreground px-7 py-3 text-sm tracking-wide transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          ← Back home
        </Link>
        <p className="mt-8 font-mono text-[0.8125rem] text-muted-foreground">
          or try{" "}
          <Link to="/projects" className="link-soft">
            projects
          </Link>{" "}
          /{" "}
          <Link to="/writings" className="link-soft">
            writings
          </Link>
        </p>
      </div>
    </Shell>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <Shell>
      <div className="flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">500</p>
        <h1 className="mt-4 font-display text-[2.6rem] leading-[1.1] sm:text-[3.25rem]">
          Something broke <em>here.</em>
        </h1>
        <p className="mt-5 max-w-[26rem] text-pretty leading-relaxed text-muted-foreground">
          Something went wrong on my side, not yours. Give it another try, or head back home and start fresh.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-7 py-3 text-sm tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="rounded-full border border-foreground px-7 py-3 text-sm tracking-wide transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            ← Back home
          </Link>
        </div>
        <p className="mt-8 font-mono text-[0.8125rem] text-muted-foreground">
          or try{" "}
          <Link to="/projects" className="link-soft">
            projects
          </Link>{" "}
          /{" "}
          <Link to="/writings" className="link-soft">
            writings
          </Link>
        </p>
      </div>
    </Shell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  staticData: { sitemap: false },
  loader: () => ({ initialClockTime: formatClockTime() }),
  head: () => ({
    // share images belong to each page, not the shared document
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: profile.metaName },
      { property: "og:site_name", content: `${profile.brand} | ${profile.metaName}` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap",
      },
      { rel: "icon", href: "/favicon-32.png?v=mko-avatar", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon.png?v=mko-avatar", type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=mko-avatar", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
