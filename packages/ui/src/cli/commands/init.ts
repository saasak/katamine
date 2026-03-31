import { Command } from "commander";
import path from "node:path";
import { detectPackageManager, addDependency } from "nypm";
import * as logger from "../utils/logger.js";
import { isSvelteKit, findAppCss } from "../utils/detect.js";
import { writeFile, readFile } from "../utils/fs.js";
import { templates } from "../generated/templates.js";

export const initCommand = new Command("init")
  .description("Initialize Katamine in your SvelteKit project")
  .action(async () => {
    logger.intro();
    const cwd = process.cwd();

    // 1. Verify SvelteKit
    if (!isSvelteKit(cwd)) {
      logger.error(
        "No svelte.config.js/ts found. Run this inside a SvelteKit project."
      );
      process.exit(1);
    }

    const pm = await detectPackageManager(cwd);
    logger.log(`Detected package manager: ${pm.name}`);

    // 2. Install peer deps
    const s = logger.spinner();
    s.start("Installing dependencies");

    try {
      await addDependency("@ark-ui/svelte", { cwd, packageManager: pm });
      await addDependency("lucide-svelte", { cwd, packageManager: pm });
      s.stop("Dependencies installed");
    } catch {
      s.stop("Failed to install dependencies");
      logger.error(
        "Could not install dependencies. Install manually: @ark-ui/svelte lucide-svelte"
      );
      process.exit(1);
    }

    // 3. Copy katamine.css
    const cssContent = templates["base"]?.["katamine.css"];
    if (!cssContent) {
      logger.error("Base theme template not found. This is a bug.");
      process.exit(1);
    }

    const cssPath = path.join(cwd, "src/lib/styles/katamine.css");
    writeFile(cssPath, cssContent);
    logger.success("Created src/lib/styles/katamine.css");

    // 4. Auto-configure Tailwind: inject @import into app.css
    const appCss = findAppCss(cwd);
    if (appCss) {
      const appCssPath = path.join(cwd, appCss);
      let content = readFile(appCssPath);
      const importLine = `@import "$lib/styles/katamine.css";`;

      if (!content.includes(importLine)) {
        content = importLine + "\n" + content;
        writeFile(appCssPath, content);
        logger.success(`Added katamine.css import to ${appCss}`);
      } else {
        logger.log("katamine.css import already present");
      }
    } else {
      logger.warn(
        "No app.css found. Manually add: @import '$lib/styles/katamine.css' to your global CSS."
      );
    }

    logger.outro("Katamine initialized! Run `katamine add combobox` to add your first component.");
  });
