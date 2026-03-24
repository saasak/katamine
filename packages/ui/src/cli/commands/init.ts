import { Command } from "commander";
import { execSync } from "node:child_process";
import path from "node:path";
import * as logger from "../utils/logger.js";
import { isSvelteKit, detectPackageManager, findAppCss } from "../utils/detect.js";
import { writeFile, fileExists, readFile } from "../utils/fs.js";
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

    const pm = detectPackageManager(cwd);
    logger.log(`Detected package manager: ${pm}`);

    // 2. Install peer deps
    const s = logger.spinner();
    s.start("Installing dependencies");
    const installCmd =
      pm === "npm"
        ? "npm install"
        : pm === "yarn"
          ? "yarn add"
          : pm === "bun"
            ? "bun add"
            : "pnpm add";

    try {
      execSync(`${installCmd} @ark-ui/svelte lucide-svelte`, {
        cwd,
        stdio: "pipe",
      });
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

    // 5. Write .katamine.json config
    const configPath = path.join(cwd, ".katamine.json");
    if (!fileExists(configPath)) {
      writeFile(
        configPath,
        JSON.stringify(
          {
            componentDir: "src/lib/components",
            installedComponents: [],
          },
          null,
          2
        ) + "\n"
      );
      logger.success("Created .katamine.json");
    }

    logger.outro("Katamine initialized! Run `katamine add combobox` to add your first component.");
  });
