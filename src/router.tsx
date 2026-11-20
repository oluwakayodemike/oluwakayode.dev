import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  // one client per request: a module-level queryclient leaks cached data between ssr requests.
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // lets query own freshness; set caching defaults on the queryclient, not the router.
    defaultPreloadStaleTime: 0,
  });

  return router;
};
