import { profile, type Post, type Project } from "@/data/portfolio";

const personId = "/#person";
const websiteId = "/#website";
const searchName = profile.brand.replace(/\.$/, "");

export const homeTitle = `${profile.metaName} | Software & Equity Research`;
export const homeDescription = `I'm ${profile.metaName}, also known as ${searchName}. I study at FUTA, build backend software, explore local-first tools, and do equity research in Lagos.`;
export const projectsTitle = `Projects | ${profile.metaName}`;
export const projectsDescription = `Software projects by ${profile.metaName}, from a streetwear store to a security agent and a terminal email client. A closer look at what I've built.`;
export const writingsTitle = `Writings | ${profile.metaName}`;
export const writingsDescription = `Occasional writing by ${profile.metaName} on software, debugging, and the odd finance thought.`;

const person = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  alternateName: [profile.brand, ...profile.alternateNames],
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.x, profile.links.medium, profile.links.instagram],
  url: "/",
  description: homeDescription,
  homeLocation: { "@type": "Place", name: "Lagos, Nigeria" },
  knowsAbout: ["Backend development", "Local-first software", "Equity research"],
};

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  name: profile.brand,
  alternateName: [searchName, `${profile.metaName} Portfolio`],
  url: "/",
  inLanguage: "en",
  creator: { "@id": personId },
};

export function profileStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      {
        "@type": "ProfilePage",
        "@id": "/#webpage",
        url: "/",
        name: homeTitle,
        description: homeDescription,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

export function projectsStructuredData(items: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      {
        "@type": "CollectionPage",
        "@id": "/projects#webpage",
        url: "/projects",
        name: projectsTitle,
        description: projectsDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.name,
              description: project.tagline,
            },
          })),
        },
      },
    ],
  };
}

export function writingsStructuredData(items: Post[]) {
  const published = items.filter((post) => !post.sample);
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      {
        "@type": "CollectionPage",
        "@id": "/writings#webpage",
        url: "/writings",
        name: writingsTitle,
        description: writingsDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: published.length,
          itemListElement: published.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: post.title,
              description: post.excerpt,
            },
          })),
        },
      },
    ],
  };
}

export function articleStructuredData(post: Post) {
  // draft examples must not be advertised as published articles.
  if (post.sample) return undefined;
  const url = `/posts/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { "@id": personId },
        isPartOf: { "@id": websiteId },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
    ],
  };
}

export function jsonLdScript(data: object) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
/** share-card meta for a 1200x630 card in public/og/<key>.png. omitted when no absolute origin is known. */
/** handmade card if the post sets ogimage, otherwise the automatic one drawn at build time. */
export function postOgImagePath(post: Post) {
  return post.ogImage ?? `/og/posts/${post.slug}.png`;
}

export function ogImageMeta(origin: string | undefined, key: string, alt: string) {
  if (!origin || !origin.startsWith("http")) return [];
  const url = `${origin}${key.startsWith("/") ? key : `/og/${key}.png`}`;
  return [
    { property: "og:image", content: url },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:image", content: url },
    { name: "twitter:image:alt", content: alt },
  ];
}
