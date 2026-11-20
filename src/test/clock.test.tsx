import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Clock } from "@/components/site/Clock";
import { formatClockTime } from "@/lib/clock";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Lagos clock", () => {
  it("includes the actual initial time in the first HTML, without waiting for JavaScript", () => {
    const html = renderToString(<Clock initialTime="12:00:00" />);
    expect(html).toContain("12:00:00");
    expect(html).not.toContain("--:--:--");
  });

  it("formats UTC time in Lagos", () => {
    expect(formatClockTime(new Date("2026-11-16T11:00:00Z"))).toBe("12:00:00");
  });

  it("updates immediately on mount and keeps ticking every second", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-16T11:00:00Z"));
    render(<Clock initialTime="11:59:59" />);
    expect(screen.getByText("12:00:00")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("12:00:01")).toBeInTheDocument();
  });
});
