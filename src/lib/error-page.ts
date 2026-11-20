// a standalone html page for hard server failures: the react app cannot render, so this
// document carries the site's look on its own, with no imports that could fail the same way.

export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>500 | mko.</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon-32.png?v=mko-avatar" type="image/png" sizes="32x32" />
    <script>
      // stored theme wins; blocked or empty storage falls back to the system setting
      try {
        var t = localStorage.getItem("theme");
        if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches)) {
          document.documentElement.classList.add("dark");
        }
      } catch (e) {
        // storage can be blocked; the system setting still decides
      }
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=JetBrains+Mono:wght@400&family=Literata:ital,wght@0,400;1,400&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --background: oklch(0.966 0.008 85);
        --foreground: oklch(0.17 0 0);
        --muted-foreground: oklch(0.48 0.01 80);
        --border: oklch(0.82 0.012 80);
        --heading-accent: oklch(0.5 0.014 80);
        --ring: oklch(0.4 0 0);
        color-scheme: light;
      }
      .dark {
        --background: oklch(0.16 0.004 80);
        --foreground: oklch(0.94 0.008 85);
        --muted-foreground: oklch(0.68 0.008 80);
        --border: oklch(0.32 0.006 80);
        --heading-accent: oklch(0.7 0.01 85);
        --ring: oklch(0.7 0 0);
        color-scheme: dark;
      }
      html {
        font-size: 87.5%;
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
      }
      @media (min-width: 640px) {
        html { font-size: 93.75%; }
      }
      body {
        margin: 0;
        background: var(--background);
        color: var(--foreground);
        font-family: "Geist", system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .wrap { max-width: 36rem; margin: 0 auto; padding: 0 1.5rem; }
      @media (min-width: 640px) {
        .wrap { max-width: 48rem; }
      }
      header { border-bottom: 1px solid var(--border); }
      /* the brand mark is typed in here, not read from portfolio data, so this page
         cannot be taken down by a broken data import */
      .brand {
        display: inline-block;
        padding: 0.75rem 0 1rem;
        font-family: "Literata", Georgia, serif;
        font-weight: 400;
        font-size: 1.875rem;
        line-height: 1;
        color: var(--foreground);
        text-decoration: none;
      }
      .brand:focus-visible { outline: 2px solid var(--ring); outline-offset: 3px; }
      @media (min-width: 640px) {
        .brand { font-size: 1.5rem; padding: 0.75rem 0; }
      }
      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        min-height: 55vh;
        padding: 4rem 0;
      }
      .label {
        margin: 0;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        color: var(--muted-foreground);
      }
      h1 {
        margin: 1rem 0 0;
        font-family: "Literata", Georgia, serif;
        font-weight: 400;
        font-size: 2.6rem;
        line-height: 1.1;
        letter-spacing: 0;
      }
      h1 em { font-style: italic; color: var(--heading-accent); }
      @media (min-width: 640px) {
        h1 { font-size: 3.25rem; }
      }
      .copy {
        max-width: 26rem;
        margin: 1.25rem 0 0;
        line-height: 1.625;
        color: var(--muted-foreground);
        text-wrap: pretty;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
        margin-top: 2.25rem;
      }
      .pill {
        border-radius: 9999px;
        padding: 0.75rem 1.75rem;
        font: inherit;
        font-size: 0.875rem;
        letter-spacing: 0.025em;
        cursor: pointer;
        text-decoration: none;
        transition: background 150ms, color 150ms, opacity 150ms;
      }
      .pill:focus-visible { outline: 2px solid var(--ring); outline-offset: 3px; }
      .primary {
        background: var(--foreground);
        color: var(--background);
        border: 1px solid var(--foreground);
      }
      .primary:hover { opacity: 0.85; }
      .secondary {
        background: transparent;
        border: 1px solid var(--foreground);
        color: var(--foreground);
      }
      .secondary:hover { background: var(--foreground); color: var(--background); }
      .also {
        margin: 2rem 0 0;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .also a {
        color: inherit;
        text-decoration: underline;
        text-underline-offset: 4px;
        text-decoration-color: var(--border);
      }
      .also a:hover { color: var(--foreground); text-decoration-color: currentColor; }
    </style>
  </head>
  <body>
    <header>
      <div class="wrap">
        <a class="brand" href="/">mko.</a>
      </div>
    </header>
    <div class="wrap">
      <main>
        <p class="label">500</p>
        <h1>Something broke <em>here.</em></h1>
        <p class="copy">
          Something went wrong on my side, not yours. Give it another try, or head back home
          and start fresh.
        </p>
        <div class="actions">
          <button class="pill primary" onclick="location.reload()">Try again</button>
          <a class="pill secondary" href="/">← Back home</a>
        </div>
        <p class="also">
          or try <a href="/projects">projects</a> / <a href="/writings">writings</a>
        </p>
      </main>
    </div>
  </body>
</html>`;
}
