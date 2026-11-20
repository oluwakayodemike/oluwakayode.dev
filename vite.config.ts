import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { generateOgCards } from "./scripts/og-cards";

// draws each article's share card from its title and date before dev or build starts.
const ogCards = {
  name: "mko-og-cards",
  async buildStart() {
    await generateOgCards();
  },
};

export default defineConfig({
  plugins: [
    ogCards,
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
  ],
});
