import { act, fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CodeBlock } from "@/components/site/CodeBlock";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("code clipboard", () => {
  it("resets copy confirmation after two seconds and restarts the timer on another copy", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    render(
      <CodeBlock>
        <code>package main</code>
      </CodeBlock>,
    );
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy code" })));
    act(() => vi.advanceTimersByTime(1500));
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy code again" })));
    act(() => vi.advanceTimersByTime(1999));
    expect(screen.getByRole("button", { name: "Copy code again" })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("copies complete code text without highlighted markup", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(
      <CodeBlock>
        <code>
          <span>package</span>
          {" main\n\nfunc main() {}\n"}
        </code>
      </CodeBlock>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("package main\n\nfunc main() {}\n"));
  });

  it("does not report success when the clipboard rejects the write", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    render(
      <CodeBlock>
        <code>package main</code>
      </CodeBlock>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Couldn't copy"));
  });
});
