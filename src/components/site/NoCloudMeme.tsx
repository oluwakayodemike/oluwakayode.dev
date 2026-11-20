const meme320 = { url: "/media/no-cloud-meme-320.webp" };
const meme747 = { url: "/media/no-cloud-meme-747.webp" };

const SOURCE = "https://lnkd.in/p/emEstiy6";

// the meme the article quotes, with the post it came from credited in the caption.
export function NoCloudMeme() {
  return (
    <figure>
      <img
        src={meme747.url}
        srcSet={`${meme320.url} 320w, ${meme747.url} 747w`}
        sizes="(min-width: 640px) 34rem, 92vw"
        alt="Meme: a man typing on a laptop while sitting on a cloud in a blue sky, with the words there is no cloud, it is just someone else's computer"
        width={747}
        height={499}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="mt-2 font-mono text-[11px] leading-[1.6] text-muted-foreground">
        The meme itself, in case you have not seen it. Found it in{" "}
        <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="link-soft">
          this post
        </a>
        .
      </figcaption>
    </figure>
  );
}
