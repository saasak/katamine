import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ fallback: "404.html" }),
    alias: {
      "$ui": path.resolve("../ui/src/templates/components"),
      "$theme": path.resolve("../ui/src/templates/base"),
    },
  },
};
export default config;
