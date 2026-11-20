import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GalleryMark } from "./GalleryMark";
import { portraitPhotos } from "@/data/gallery";

const fan = [
  "-rotate-[9deg] -translate-x-[58%]",
  "z-10 -translate-y-2",
  "rotate-[9deg] translate-x-[58%]",
];

export function GalleryPeek() {
  const [open, setOpen] = useState(false);
  // order[slot] = photo index; slot 1 is the front-centre card.
  const [order, setOrder] = useState([0, 1, 2]);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const back = trigger.current;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab" || !dialog.current) return;
      // keep tab inside the pop-up while it is open.
      const f = [...dialog.current.querySelectorAll<HTMLElement>("a, button, [tabindex='0']")];
      const first = f[0],
        last = f[f.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = previousOverflow;
      back?.focus();
    };
  }, [open]);
  const frontPhoto = portraitPhotos[order[1] ?? 1];
  function bringToFront(slot: number) {
    setOrder((previous) => {
      const front = previous[1];
      const selected = previous[slot];
      if (front === undefined || selected === undefined) return previous;
      const next = [...previous];
      next[1] = selected;
      next[slot] = front;
      return next;
    });
  }
  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          setOrder([0, 1, 2]);
          setOpen(true);
        }}
        aria-label="Open a few photos"
        className="relative -top-[0.1em] mx-0.5 inline-flex align-middle text-muted-foreground transition-transform hover:-rotate-6 motion-reduce:transition-none motion-reduce:hover:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:text-foreground"
      >
        <GalleryMark className="h-[1.25em] w-[1.25em]" />
      </button>
      {open &&
        createPortal(
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label="A few photos"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 motion-reduce:animate-none"
          >
            <p className="sr-only" aria-live="polite">
              {frontPhoto ? `Showing ${frontPhoto.caption}: ${frontPhoto.alt}` : ""}
            </p>
            <div
              role="group"
              aria-label="Photo stack. Choose a side photo to bring it to the front."
              className="relative flex h-[17rem] w-full items-center justify-center md:h-[16rem]"
              onClick={(e) => e.stopPropagation()}
            >
              {portraitPhotos.map((p, i) => {
                const slot = order.indexOf(i);
                const front = slot === 1;
                return (
                  <figure
                    key={p.src}
                    onClick={front ? undefined : () => bringToFront(slot)}
                    role={front ? undefined : "button"}
                    tabIndex={front ? undefined : 0}
                    aria-label={front ? undefined : `Bring "${p.caption}" to the front`}
                    aria-current={front ? "true" : undefined}
                    onKeyDown={
                      front
                        ? undefined
                        : (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              (e.currentTarget as HTMLElement).click();
                            }
                          }
                    }
                    className={`absolute w-[42vw] max-w-[13rem] border border-border bg-card p-1.5 pb-6 shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:max-w-[11rem] ${front ? "" : "cursor-pointer hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"} ${fan[slot]}`}
                  >
                    <img
                      src={p.src}
                      srcSet={p.srcSet}
                      sizes="(min-width: 768px) 11rem, (min-width: 640px) 13rem, 42vw"
                      alt={p.alt}
                      width={p.w}
                      height={p.h}
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover"
                    />
                    <figcaption className="absolute bottom-1 left-2 font-mono text-[10px] text-muted-foreground">
                      {p.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            <div
              className="flex items-center gap-5 font-mono text-xs text-muted-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-close
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close photos"
                className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                close
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
