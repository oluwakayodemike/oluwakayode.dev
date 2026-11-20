import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CodeBlock } from "@/components/site/CodeBlock";
import { LocalFirstDiagram } from "@/components/site/LocalFirstDiagram";
import { NoCloudMeme } from "@/components/site/NoCloudMeme";

// standalone paragraph tokens swap in custom blocks, e.g. [diagram:local-first-sync].
const DIAGRAMS: Record<string, () => React.ReactNode> = {
  "local-first-sync": () => <LocalFirstDiagram />,
};

// standalone [image:key] tokens swap in a figure with its own caption.
const IMAGES: Record<string, () => React.ReactNode> = {
  "no-cloud-meme": () => <NoCloudMeme />,
};

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="article-body mt-9 min-w-0 max-w-full text-[1.02rem] leading-[1.8] text-pretty sm:text-[1.08rem] md:text-[0.92rem]">
      <Markdown
        skipHtml
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={{
          a: ({ children, href }) => (
            <a
              href={href}
              className="link-soft break-words focus-visible:outline-2 focus-visible:outline-ring"
              target={
                href?.startsWith("https://") || href?.startsWith("http://") ? "_blank" : undefined
              }
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          p: ({ children }) => {
            const token = typeof children === "string" ? children.trim() : null;
            const diagram = token?.match(/^\[diagram:([a-z-]+)\]$/)?.[1];
            if (diagram && DIAGRAMS[diagram]) return <>{DIAGRAMS[diagram]()}</>;
            const image = token?.match(/^\[image:([a-z-]+)\]$/)?.[1];
            if (image && IMAGES[image]) return <>{IMAGES[image]()}</>;
            return <p>{children}</p>;
          },
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          code: ({ children, className }) => {
            const language = className?.match(/(?:^|\s)language-([^\s]+)/)?.[1];
            return (
              <code className={className} data-language={language}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
