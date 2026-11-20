import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

// share images need absolute urls; derive the host from the request instead of hardcoding a domain.
const fetchRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const req = getRequest();
  const url = new URL(req.url);
  const sandboxHost = url.hostname === "localhost" ? req.headers.get("x-forwarded-host") : null;
  return sandboxHost ? `https://${sandboxHost}` : url.origin;
});

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// the origin is only ever used to build share image urls, so a single failed
// round trip, from a dev server reload or a blip in the connection, must not
// take the page down. retry once, then fall back to the address the browser is
// already on. on the server there is no network hop, so nothing changes there.
export const getRequestOrigin = async (): Promise<string> => {
  try {
    return await fetchRequestOrigin();
  } catch (error) {
    try {
      await wait(150);
      return await fetchRequestOrigin();
    } catch {
      if (typeof window !== "undefined") return window.location.origin;
      throw error;
    }
  }
};
