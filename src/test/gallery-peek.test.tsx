import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { GalleryPeek } from "@/components/site/GalleryPeek";

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

describe("photo stack", () => {
  it("moves a selected side photo to the front and resets on reopening", () => {
    render(<GalleryPeek />);
    const trigger = screen.getByRole("button", { name: "Open a few photos" });
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector('[aria-live="polite"]')).toHaveTextContent("Showing just curious:");
    fireEvent.click(screen.getByRole("button", { name: 'Bring "a good laugh" to the front' }));
    expect(dialog.querySelector('[aria-live="polite"]')).toHaveTextContent("Showing a good laugh:");
    fireEvent.click(screen.getByRole("button", { name: "Close photos" }));
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog").querySelector('[aria-live="polite"]')).toHaveTextContent(
      "Showing just curious:",
    );
  });

  it("restores focus and the previous scroll setting when closed", () => {
    document.body.style.overflow = "auto";
    render(<GalleryPeek />);
    const trigger = screen.getByRole("button", { name: "Open a few photos" });
    fireEvent.click(trigger);
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "Close photos" })).toHaveFocus();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("auto");
  });
});
