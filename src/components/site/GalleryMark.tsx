/** three stacked cards: one upright in front, two tilted behind. */
export function GalleryMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="2.6"
        y="6.4"
        width="9"
        height="11.6"
        rx="1.6"
        transform="rotate(-14 7.1 12.2)"
        className="fill-background"
      />
      <rect
        x="12.4"
        y="6.4"
        width="9"
        height="11.6"
        rx="1.6"
        transform="rotate(14 16.9 12.2)"
        className="fill-background"
      />
      <rect x="7.3" y="4.4" width="9.4" height="12.4" rx="1.6" className="fill-background" />
    </svg>
  );
}
