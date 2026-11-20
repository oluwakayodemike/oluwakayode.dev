import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectItem } from "@/components/site/Shell";
import { projects } from "@/data/portfolio";

const DEMO_URL = "https://www.youtube.com/watch?v=e8mCmHSdUs0";

describe("ARIA demo video", () => {
  it("keeps the hackathon demo link alongside the repository link", () => {
    const aria = projects.find((p) => p.name === "ARIA");
    expect(aria?.demo).toBe(DEMO_URL);
    expect(aria?.repo).toBe("https://github.com/oluwakayodemike/ARIA");
  });

  it("marks the cover without turning the mark into a link", () => {
    const aria = projects.find((p) => p.name === "ARIA");
    render(
      <ProjectItem
        year="2026"
        field="Dev"
        name="ARIA"
        blurb="An agent that closes Splunk detection gaps"
        repo={aria?.repo}
        demo={aria?.demo}
      />,
    );
    const mark = screen.getByText("demo");
    expect(mark.closest("a")).toBeNull();
    expect(screen.getByText("Demo video available")).toBeInTheDocument();
  });

  it("links to the demo only from the links row", () => {
    const aria = projects.find((p) => p.name === "ARIA");
    render(
      <ProjectItem
        year="2026"
        field="Dev"
        name="ARIA"
        blurb="An agent that closes Splunk detection gaps"
        repo={aria?.repo}
        demo={aria?.demo}
      />,
    );
    expect(screen.queryByRole("link", { name: "Watch the ARIA demo video" })).toBeNull();
    expect(screen.getByRole("link", { name: "Demo ↗" })).toHaveAttribute("href", DEMO_URL);
    expect(screen.getByRole("link", { name: "GitHub ↗" })).toHaveAttribute(
      "href",
      "https://github.com/oluwakayodemike/ARIA",
    );
  });
});
