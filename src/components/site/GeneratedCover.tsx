/* deterministic, browser-safe artwork for projects without an uploaded image. */
const PALETTES = ["fern", "cobalt", "rose", "citron", "graphite"];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function GeneratedCover({
  name,
  tagline,
  year,
}: {
  name: string;
  tagline: string;
  year?: string;
}) {
  const h = hash(name);
  return (
    <div
      className="generated-cover"
      data-palette={PALETTES[h % PALETTES.length] ?? "fern"}
      data-long-name={name.length > 18 ? "true" : undefined}
      aria-label={`${name} cover`}
      role="img"
    >
      <div className="cover-rails" aria-hidden="true">
        <i className="cover-rail cover-rail-left" />
        <i className="cover-rail cover-rail-right" />
        <i className="cover-rule cover-rule-top" />
        <i className="cover-rule cover-rule-middle" />
        <i className="cover-rule cover-rule-bottom" />
      </div>
      <div className="cover-edition font-mono" aria-hidden="true">
        <span>mko.</span>
        <span>{year}</span>
      </div>
      <div className="cover-title-band">
        <p className="cover-title font-display">{name}</p>
      </div>
      <div className="cover-tagline-band">
        <p className="cover-tagline font-mono">{tagline}</p>
      </div>
      <span className="cover-colophon" aria-hidden="true">
        <svg
          className="inline-block h-[1em] w-[1em] align-top"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M12 3.5v17M4.6 7.8l14.8 8.4M19.4 7.8 4.6 16.2" />
        </svg>
      </span>
    </div>
  );
}
