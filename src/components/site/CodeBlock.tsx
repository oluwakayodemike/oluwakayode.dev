import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeBlock({ children }: { children: ReactNode }) {
  const code = Children.toArray(children).find((child) => isValidElement(child));
  const language = isValidElement<{ className?: string; "data-language"?: string }>(code)
    ? (code.props["data-language"] ?? code.props.className?.match(/(?:^|\s)language-([^\s]+)/)?.[1])
    : undefined;
  const codeRef = useRef<HTMLPreElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copyCode() {
    const text = codeRef.current?.querySelector("code")?.textContent;
    if (text === undefined || text === null) return;
    try {
      await navigator.clipboard.writeText(text);
      clearTimeout(resetTimer.current);
      setStatus("copied");
      resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      clearTimeout(resetTimer.current);
      setStatus("error");
    }
  }

  return (
    <div className="min-w-0 max-w-full">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border border-b-0 border-border bg-muted px-3 py-1">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          {language && <span>{language}</span>}
          <span role="status" aria-live="polite">
            {status === "copied"
              ? "Copied!"
              : status === "error"
                ? "Couldn't copy. Please try again."
                : ""}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyCode}
          className="shrink-0 rounded-none text-muted-foreground"
          aria-label={status === "copied" ? "Copy code again" : "Copy code"}
          title="Copy code"
        >
          {status === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </Button>
      </div>
      <pre
        ref={codeRef}
        className="article-code"
        tabIndex={0}
        aria-label="Code block, scroll horizontally to read long lines"
      >
        {children}
      </pre>
    </div>
  );
}
