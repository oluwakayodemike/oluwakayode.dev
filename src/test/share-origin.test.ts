import { describe, expect, it, vi } from "vitest";

let calls = 0;
let mode: "ok" | "always-fail" | "fail-once" = "ok";

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    handler: () => async () => {
      calls += 1;
      if (mode === "always-fail") throw new TypeError("Failed to fetch");
      if (mode === "fail-once" && calls === 1) throw new TypeError("Failed to fetch");
      return "https://preview.example";
    },
  }),
}));

vi.mock("@tanstack/react-start/server", () => ({
  getRequest: () => ({ url: "http://localhost:8080/" }),
}));

const load = async () => {
  vi.resetModules();
  calls = 0;
  const mod = await import("@/lib/origin.functions");
  return mod.getRequestOrigin;
};

describe("share origin lookup", () => {
  it("passes the server's answer through when the round trip works", async () => {
    mode = "ok";
    expect(await (await load())()).toBe("https://preview.example");
  });

  it("retries once instead of failing the page on a blip", async () => {
    mode = "fail-once";
    expect(await (await load())()).toBe("https://preview.example");
    expect(calls).toBe(2);
  });

  it("falls back to the browser's own address when the round trip keeps failing", async () => {
    mode = "always-fail";
    expect(await (await load())()).toBe(window.location.origin);
  });
});
