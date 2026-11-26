export const profile = {
  name: "Michael Kayode Oluwasegun",
  metaName: "Michael K.O",
  brand: "mko.",
  alternateNames: ["mko", "Michael Oluwasegun"],
  short: "Michael",
  role: "Developer & Financial Analyst",
  location: "Lagos, NG",
  timezone: "Africa/Lagos",
  initials: "MKO",
  email: "michaelaykay@gmail.com",
  github: "oluwakayodemike",
  links: {
    github: "https://github.com/oluwakayodemike",
    linkedin: "https://www.linkedin.com/in/oluwakayodemike",
    x: "https://x.com/trulymko",
    medium: "https://medium.com/@michaelaykay",
    instagram: "https://www.instagram.com/oluwakayode.dev",
    resume: "#", // todo
  },
  quote: {
    text: "Compound interest is the eighth wonder of the world.",
    by: "Attributed to Albert Einstein",
  }, // todo
};

// intro paragraphs. "{{name}}" is swapped for profile.name when rendered.
export const intro = [
  "I'm {{name}}, a student at the Federal University of Technology, Akure. I split my time between building software and learning how money works.",
  "On the building side, I care about things that hold up: solid, scalable products that feel effortless to use and stay fast. Lately I've been exploring local-first tools and what they could change about how software gets made.",
  "On the money side, I do equity research. I dig through annual reports, keep up with business news, and try to work out what a company is actually worth. I get a little sharper with every one I read.",
  "Off the clock, I play chess, do sudoku, and doomscroll far more than I should.",
];

export type Category = "Dev" | "Finance" | "Both";
export type Project = {
  name: string;
  year: string;
  tagline: string;
  description: string;
  category: Category;
  tags: string[];
  metrics: { label: string; value: string }[];
  /** leave out to get a generated cover from the name and tagline. */
  image?: string;
  imageSrcSet?: string;
  live?: string;
  repo?: string;
  featured?: boolean;
  /** url of a demo video, e.g. a hackathon walkthrough. */
  demo?: string;
  /** shows a corner "wip" ribbon on the cover. */
  wip?: boolean;
};

const projectList: Project[] = [
  {
    name: "BIAD Store",
    year: "2026",
    tagline: "The official online store for a Lagos streetwear brand",
    category: "Dev",
    featured: true,
    live: "https://biad.store/",
    description:
      "A freelance build I took from zero to launch. It handles the whole journey: browsing the drops, paying securely through Paystack, and getting orders out the door.",
    tags: ["next.js", "typescript", "sanity", "paystack"],
    metrics: [],
  },
  {
    name: "ARIA",
    year: "2026",
    tagline: "An autonomous agent that finds and closes Splunk detection gaps",
    category: "Dev",
    featured: true,
    repo: "https://github.com/oluwakayodemike/ARIA",
    demo: "https://www.youtube.com/watch?v=e8mCmHSdUs0",
    description:
      "Built for the Splunk Agentic Ops Hackathon 2026. Security teams usually know their detection gaps but closing them is slow. ARIA audits Splunk coverage against MITRE ATT&CK, generates SPL detections with AI, validates them against Splunk, and stages them for human approval before deployment.",
    tags: ["python", "fastapi", "splunk", "gemini"],
    metrics: [],
  },
  {
    name: "ReuniteAI",
    year: "2025",
    tagline: "A campus lost-and-found platform that matches photos and checks ownership claims",
    category: "Dev",
    featured: true,
    repo: "https://github.com/oluwakayodemike/ReuniteAI",
    description:
      "I built ReuniteAI to help students find lost belongings without digging through campus group chats. It compares photos with CLIP embeddings and descriptions with TiDB search to find likely matches. Kimi reviews ownership claims, with Gemini as a fallback, and approved claims get a pickup code. Students can track their reports and get notifications when a possible match turns up.",
    tags: ["node.js", "express", "openai clip", "tidb"],
    metrics: [],
  },
  {
    name: "EnDe-Crypt",
    year: "2023",
    tagline: "A command-line tool that locks local files behind a key",
    category: "Dev",
    featured: true,
    repo: "https://github.com/oluwakayodemike/EnDe-Crypt",
    description:
      "One of the first things I built that I still stand by. You point it at a file, it encrypts the contents with Fernet and leaves the file format untouched, then hands you a key you have to look after yourself. Put the key back in and the file comes back exactly as it was.",
    tags: ["python", "fernet", "cli"],
    metrics: [],
  },
  {
    name: "Term Mail",
    year: "2026",
    tagline: "Gmail from the terminal, with AI drafts on the way",
    category: "Dev",
    featured: true,
    wip: true,
    repo: "https://github.com/oluwakayodemike/term-mail",
    description:
      "A work in progress. It talks to Gmail through the API, and I'm still building out the basics: viewing and reading mail properly from the command line, with a Textual interface you can move through with the keyboard. The part I'm most excited about is still ahead of me: telling an AI to draft a reply for you, right there in the terminal.",
    tags: ["python", "gmail api", "textual"],
    metrics: [],
  },
];

// curated order: newest first, with the oldest project last.
export const projects = [...projectList].sort((a, b) => {
  const order = ["BIAD Store", "ARIA", "Term Mail", "ReuniteAI", "EnDe-Crypt"];
  return order.indexOf(a.name) - order.indexOf(b.name);
});

export const toolkit = [
  { label: "Languages", icon: "braces", items: ["Python", "JavaScript", "TypeScript", "Go", "C"] },
  {
    label: "Frameworks",
    icon: "layers",
    items: ["Node.js", "Express", "Next.js", "React", "Tailwind CSS"],
  },
  { label: "Data", icon: "database", items: ["MySQL", "MongoDB", "Redis", "TiDB"] },
  {
    label: "Everyday tools",
    icon: "wrench",
    items: [
      "Git",
      "GitHub",
      "Zed",
      "VS Code",
      "Postman",
      "Figma",
      "Excalidraw",
      "Vercel",
      "Linux",
      "Excel",
    ],
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** markdown article text, read from src/data/blogs/<slug>.md. */
  body: string;
  /** url of this article's medium cross-post, when available. */
  mediumUrl?: string;
  /** optional handmade share card, e.g. "/og/my-post.jpg". leave out to use the automatic card. */
  ogImage?: string;
  /** small topic chips shown under the title, e.g. ["python", "rant"]. */
  tags?: string[];
  sample?: boolean;
};

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
