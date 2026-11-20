import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { Shell } from "@/components/site/Shell";

vi.mock("@tanstack/react-router", () => ({
  useLoaderData: () => undefined,
  Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
}));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it("keeps the page usable and starts the clock when existing router state has no root loader data", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-16T11:00:00Z"));
  render(
    <Shell>
      <h1>Projects</h1>
    </Shell>,
  );
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  expect(screen.getByText("12:00:00")).toBeInTheDocument();
});

it("keeps the page and theme toggle working when browser storage is blocked", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new DOMException("blocked", "SecurityError");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("blocked", "SecurityError");
  });
  render(
    <Shell>
      <h1>Projects</h1>
    </Shell>,
  );
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "dark" }));
  expect(document.documentElement).toHaveClass("dark");
  fireEvent.click(screen.getByRole("button", { name: "light" }));
  expect(document.documentElement).not.toHaveClass("dark");
});
