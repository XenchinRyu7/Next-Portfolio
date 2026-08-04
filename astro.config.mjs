import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://www.saefulrohman.dev",
  integrations: [
    react(),
    tailwind({
      configFile: "./tailwind.config.ts",
    }),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        "next/link": path.resolve("./src/shims/next-link.tsx"),
        "next/image": path.resolve("./src/shims/next-image.tsx"),
        "next/navigation": path.resolve("./src/shims/next-navigation.ts"),
        "next/dynamic": path.resolve("./src/shims/next-dynamic.tsx"),
      },
    },
  },
});
