import { describe, expect, it } from "vitest";
import { projects } from "@/data/portfolio";

describe("project order and home page visibility", () => {
  it("leads with the newest project and ends with the oldest", () => {
    expect(projects[0]?.name).toBe("BIAD Store");
    expect(projects[projects.length - 1]?.name).toBe("EnDe-Crypt");
  });

  it("places Term Mail directly after ARIA, then ReuniteAI", () => {
    const ariaIndex = projects.findIndex((p) => p.name === "ARIA");
    expect(ariaIndex).toBeGreaterThanOrEqual(0);
    expect(projects[ariaIndex + 1]?.name).toBe("Term Mail");
    expect(projects[ariaIndex + 1]?.year).toBe("2026");
    expect(projects[ariaIndex + 2]?.name).toBe("ReuniteAI");
    expect(projects[ariaIndex + 2]?.repo).toBe("https://github.com/oluwakayodemike/ReuniteAI");
  });

  it("shows every project on the home page while there are five or fewer", () => {
    expect(projects.length).toBeLessThanOrEqual(5);
    expect(projects.every((p) => p.featured)).toBe(true);
  });
});
