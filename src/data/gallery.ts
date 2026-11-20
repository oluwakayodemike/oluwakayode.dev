// generated artwork only. personal reference photos are never served by the app.
const art0_320 = { url: "/media/gallery/avatar-laugh-320.webp" };
const art0_560 = { url: "/media/gallery/avatar-laugh-560.webp" };
const art0_768 = { url: "/media/gallery/avatar-laugh-768.webp" };
const art0_1024 = { url: "/media/gallery/avatar-laugh-1024.webp" };
const art1_320 = { url: "/media/gallery/avatar-curious-320.webp" };
const art1_560 = { url: "/media/gallery/avatar-curious-560.webp" };
const art1_768 = { url: "/media/gallery/avatar-curious-768.webp" };
const art1_1024 = { url: "/media/gallery/avatar-curious-1024.webp" };
const art2_320 = { url: "/media/gallery/avatar-ink-320.webp" };
const art2_560 = { url: "/media/gallery/avatar-ink-560.webp" };
const art2_768 = { url: "/media/gallery/avatar-ink-768.webp" };
const art2_1024 = { url: "/media/gallery/avatar-ink-1024.webp" };
const art3_320 = { url: "/media/gallery/line-waterfront-320.webp" };
const art3_560 = { url: "/media/gallery/line-waterfront-560.webp" };
const art3_768 = { url: "/media/gallery/line-waterfront-768.webp" };
const art3_1536 = { url: "/media/gallery/line-waterfront-1536.webp" };
const art4_320 = { url: "/media/gallery/line-bamboo-320.webp" };
const art4_560 = { url: "/media/gallery/line-bamboo-560.webp" };
const art4_768 = { url: "/media/gallery/line-bamboo-768.webp" };
const art4_1024 = { url: "/media/gallery/line-bamboo-1024.webp" };
const art5_320 = { url: "/media/gallery/line-bookshop-320.webp" };
const art5_560 = { url: "/media/gallery/line-bookshop-560.webp" };
const art5_768 = { url: "/media/gallery/line-bookshop-768.webp" };
const art5_1536 = { url: "/media/gallery/line-bookshop-1536.webp" };
const art6_320 = { url: "/media/gallery/line-rain-320.webp" };
const art6_560 = { url: "/media/gallery/line-rain-560.webp" };
const art6_768 = { url: "/media/gallery/line-rain-768.webp" };
const art6_1024 = { url: "/media/gallery/line-rain-1024.webp" };
const art7_320 = { url: "/media/gallery/line-bridge-320.webp" };
const art7_560 = { url: "/media/gallery/line-bridge-560.webp" };
const art7_768 = { url: "/media/gallery/line-bridge-768.webp" };
const art7_1536 = { url: "/media/gallery/line-bridge-1536.webp" };
const art8_320 = { url: "/media/gallery/line-courtyard-320.webp" };
const art8_560 = { url: "/media/gallery/line-courtyard-560.webp" };
const art8_768 = { url: "/media/gallery/line-courtyard-768.webp" };
const art8_1024 = { url: "/media/gallery/line-courtyard-1024.webp" };
const art9_320 = { url: "/media/gallery/line-cove-320.webp" };
const art9_560 = { url: "/media/gallery/line-cove-560.webp" };
const art9_768 = { url: "/media/gallery/line-cove-768.webp" };
const art9_1536 = { url: "/media/gallery/line-cove-1536.webp" };
const art10_320 = { url: "/media/gallery/line-window-320.webp" };
const art10_560 = { url: "/media/gallery/line-window-560.webp" };
const art10_768 = { url: "/media/gallery/line-window-768.webp" };
const art10_1024 = { url: "/media/gallery/line-window-1024.webp" };
const art11_320 = { url: "/media/gallery/line-rooftops-320.webp" };
const art11_560 = { url: "/media/gallery/line-rooftops-560.webp" };
const art11_768 = { url: "/media/gallery/line-rooftops-768.webp" };
const art11_1536 = { url: "/media/gallery/line-rooftops-1536.webp" };
const art12_320 = { url: "/media/gallery/line-tree-320.webp" };
const art12_560 = { url: "/media/gallery/line-tree-560.webp" };
const art12_768 = { url: "/media/gallery/line-tree-768.webp" };
const art12_1024 = { url: "/media/gallery/line-tree-1024.webp" };

export type Photo = {
  src: string;
  srcSet: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
};

// full-resolution variants stay available without making phones download them.
const set = (
  a: { url: string },
  b: { url: string },
  c: { url: string },
  hd: { url: string },
  width: number,
) => ({
  src: b.url,
  srcSet: `${a.url} 320w, ${b.url} 560w, ${c.url} 768w, ${hd.url} ${width}w`,
});

export const portraitPhotos: Photo[] = [
  {
    ...set(art0_320, art0_560, art0_768, art0_1024, 1024),
    alt: "Original curly-haired cartoon avatar with black glasses, laughing against mint",
    caption: "a good laugh",
    w: 1024,
    h: 1536,
  },
  {
    ...set(art1_320, art1_560, art1_768, art1_1024, 1024),
    alt: "The same signature avatar with a curious smile against dusty rose",
    caption: "just curious",
    w: 1024,
    h: 1536,
  },
  {
    ...set(art2_320, art2_560, art2_768, art2_1024, 1024),
    alt: "Minimal ink version of the signature avatar looking sideways",
    caption: "quiet thoughts",
    w: 1024,
    h: 1536,
  },
];

export const galleryPhotos: Photo[] = [
  {
    ...set(art3_320, art3_560, art3_768, art3_1536, 1536),
    alt: "Fine ink drawing of a waterfront with a canoe and coastal houses",
    caption: "somewhere quiet",
    w: 1536,
    h: 1024,
  },
  {
    ...set(art4_320, art4_560, art4_768, art4_1024, 1024),
    alt: "Delicate line drawing of stone steps through bamboo",
    caption: "the long way home",
    w: 1024,
    h: 1536,
  },
  {
    ...set(art5_320, art5_560, art5_768, art5_1536, 1536),
    alt: "Fine ink bookshop with a bicycle and sleeping cat",
    caption: "one more page",
    w: 1536,
    h: 1024,
  },
  {
    ...set(art6_320, art6_560, art6_768, art6_1024, 1024),
    alt: "Ink drawing of a rain-washed coastal street",
    caption: "after the rain",
    w: 1024,
    h: 1536,
  },
  {
    ...set(art7_320, art7_560, art7_768, art7_1536, 1536),
    alt: "Spacious line drawing of an arched canal bridge",
    caption: "room to breathe",
    w: 1536,
    h: 1024,
  },
  {
    ...set(art8_320, art8_560, art8_768, art8_1024, 1024),
    alt: "Fine ink courtyard with a pale blue door and flowering vines",
    caption: "behind the blue door",
    w: 1024,
    h: 1536,
  },
  {
    ...set(art9_320, art9_560, art9_768, art9_1536, 1536),
    alt: "Delicate ink seaside cove with palms and wooden boats",
    caption: "by the water",
    w: 1536,
    h: 1024,
  },
  {
    ...set(art10_320, art10_560, art10_768, art10_1024, 1024),
    alt: "Fine line drawing of a jasmine-lined reading window",
    caption: "the window stayed open",
    w: 1024,
    h: 1536,
  },
  {
    ...set(art11_320, art11_560, art11_768, art11_1536, 1536),
    alt: "Ink rooftop terrace overlooking a quiet coastal city",
    caption: "before the lights come on",
    w: 1536,
    h: 1024,
  },
  {
    ...set(art12_320, art12_560, art12_768, art12_1024, 1024),
    alt: "Delicate pen drawing of a bench beneath a broad tropical tree",
    caption: "stay a while",
    w: 1024,
    h: 1536,
  },
];
