// @ts-check
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify({}),
  integrations: [preact()],
});
