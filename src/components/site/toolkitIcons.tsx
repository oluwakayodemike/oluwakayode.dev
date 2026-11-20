import {
  siC,
  siExcalidraw,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGo,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostman,
  siPython,
  siReact,
  siRedis,
  siTailwindcss,
  siTidb,
  siTypescript,
  siVercel,
  siZedindustries,
} from "simple-icons";
import { Code, Table, Terminal, type LucideIcon } from "lucide-react";

// brand marks are drawn in the current text colour, not their logo colours,
// so they stay quiet inside the paper and ink palette.
const BRAND: Record<string, string> = {
  Python: siPython.path,
  JavaScript: siJavascript.path,
  TypeScript: siTypescript.path,
  Go: siGo.path,
  C: siC.path,
  "Next.js": siNextdotjs.path,
  React: siReact.path,
  Git: siGit.path,
  Zed: siZedindustries.path,
  "Tailwind CSS": siTailwindcss.path,
  "Node.js": siNodedotjs.path,
  Express: siExpress.path,
  MySQL: siMysql.path,
  MongoDB: siMongodb.path,
  Redis: siRedis.path,
  TiDB: siTidb.path,
  GitHub: siGithub.path,
  Postman: siPostman.path,
  Figma: siFigma.path,
  Excalidraw: siExcalidraw.path,
  Vercel: siVercel.path,
};

// no brand mark available, or the official one collapses at this size,
// so a neutral line glyph stands in.
const FALLBACK: Record<string, LucideIcon> = {
  "VS Code": Code,
  Excel: Table,
  Linux: Terminal,
};

// a few marks carry far more or less ink than their neighbours at the same
// size, so they get a small nudge to sit evenly in the row.
const TWEAKS: Record<string, { size?: number; opacity?: number }> = {
  // the official c mark is one solid letter, so it is kept small and pale.
  C: { size: 13, opacity: 0.55 },
  Go: { size: 16, opacity: 1 },
  Express: { size: 15, opacity: 0.9 },
};

const DEFAULT_SIZE = 14;
const DEFAULT_OPACITY = 0.8;

export function ToolIcon({ name }: { name: string }) {
  const tweak = TWEAKS[name] ?? {};
  const size = tweak.size ?? DEFAULT_SIZE;
  const opacity = tweak.opacity ?? DEFAULT_OPACITY;

  const path = BRAND[name];
  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
        style={{ opacity }}
      >
        <path d={path} />
      </svg>
    );
  }

  const Fallback = FALLBACK[name];
  if (Fallback) {
    return (
      <Fallback
        size={size}
        strokeWidth={1.6}
        aria-hidden="true"
        className="shrink-0"
        style={{ opacity }}
      />
    );
  }

  return null;
}
