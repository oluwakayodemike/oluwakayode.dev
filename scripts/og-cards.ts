// build-time share card generator. runs in node via the vite plugin, never in the worker.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const root = path.resolve(import.meta.dirname, "..");
const fontDir = path.join(root, "scripts/og-fonts");
const outDir = path.join(root, "public/og/posts");

const paper = "#f4efe8",
  ink = "#1f1c17",
  muted = "#6f675c",
  rule = "#cfc6b8";

type Post = { slug: string; title: string; date: string };

async function loadPosts(): Promise<{ posts: Post[]; name: string }> {
  const result = await build({
    entryPoints: [path.join(root, "src/data/portfolio.ts")],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    alias: { "@": path.join(root, "src") },
    loader: { ".json": "json" },
    logLevel: "silent",
  });
  const output = result.outputFiles[0];
  if (!output) throw new Error("Portfolio content could not be loaded for share cards.");
  const code = output.text;
  const mod = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
  return { posts: mod.posts, name: mod.profile.name };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style, children },
});

function card(post: Post, name: string, label = "WRITING", showDate = true) {
  const title = post.title
    .trim()
    .replace(/(^|\s)'/g, "$1\u2018")
    .replace(/'/g, "\u2019");
  const len = post.title.length;
  const size = len <= 32 ? 88 : len <= 52 ? 76 : len <= 75 ? 62 : 50;
  return el(
    "div",
    { width: 1200, height: 630, display: "flex", background: paper, position: "relative" },
    el(
      "div",
      {
        position: "absolute",
        left: 36,
        top: 36,
        width: 1128,
        height: 558,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        border: `1.5px solid ${rule}`,
        padding: "58px 64px 52px",
      },
      [
        el("div", { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, [
          el(
            "div",
            { fontFamily: "Display", fontWeight: 400, fontSize: 40, color: ink, letterSpacing: 0 },
            "mko.",
          ),
          el(
            "div",
            { fontFamily: "Mono", fontSize: 19, color: muted, letterSpacing: 0, marginTop: 8 },
            label,
          ),
        ]),
        el(
          "div",
          { flex: 1, display: "flex", alignItems: "center" },
          el(
            "div",
            {
              fontFamily: "Display",
              fontWeight: 400,
              fontSize: size,
              lineHeight: 1.08,
              color: ink,
              letterSpacing: 0,
              maxWidth: 1000,
            },
            title,
          ),
        ),
        el(
          "div",
          {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Mono",
            fontSize: 18,
            color: muted,
            letterSpacing: 0,
          },
          [
            el(
              "div",
              {},
              showDate
                ? `${name.toUpperCase()} · ${formatDate(post.date).toUpperCase()}`
                : name.toUpperCase(),
            ),
            {
              type: "svg",
              props: {
                width: 24,
                height: 24,
                viewBox: "0 0 24 24",
                children: [0, 45, 90, 135].map((r) => ({
                  type: "line",
                  props: {
                    x1: 12,
                    y1: 2,
                    x2: 12,
                    y2: 22,
                    stroke: muted,
                    strokeWidth: 1.6,
                    transform: `rotate(${r} 12 12)`,
                  },
                })),
              },
            },
          ],
        ),
      ],
    ),
  );
}

export async function generateOgCards() {
  const [display, mono] = await Promise.all([
    readFile(
      path.join(root, "node_modules/@fontsource/literata/files/literata-latin-400-normal.woff"),
    ),
    readFile(path.join(fontDir, "GeistMono.ttf")),
  ]);
  const fonts = [
    { name: "Display", data: display, style: "normal" as const, weight: 400 as const },
    { name: "Mono", data: mono, style: "normal" as const, weight: 400 as const },
  ];
  const { posts, name } = await loadPosts();
  await mkdir(outDir, { recursive: true });
  for (const post of posts) {
    const svg = await satori(card(post, name) as never, { width: 1200, height: 630, fonts });
    const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
    const file = path.join(outDir, `${post.slug}.png`);
    if (existsSync(file) && Buffer.compare(await readFile(file), png) === 0) continue;
    await writeFile(file, png);
  }
  for (const [slug, title, label] of [
    ["home", "I write code and read balance sheets.", "PORTFOLIO"],
    ["projects", "Things I enjoyed working on.", "PROJECTS"],
    ["writings", "Pull up a chair, I'm thinking out loud.", "WRITINGS"],
  ] as const) {
    const svg = await satori(card({ slug, title, date: "" }, name, label, false) as never, {
      width: 1200,
      height: 630,
      fonts,
    });
    const png = new Resvg(svg).render().asPng();
    const file = path.join(root, "public/og", `${slug}.png`);
    if (existsSync(file) && Buffer.compare(await readFile(file), png) === 0) continue;
    await writeFile(file, png);
  }
}
