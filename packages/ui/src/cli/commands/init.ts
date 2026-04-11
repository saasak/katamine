import { Command } from "commander";
import path from "node:path";
import { detectPackageManager, addDependency } from "nypm";
import * as logger from "../utils/logger.js";
import { isSvelteKit, findAppCss } from "../utils/detect.js";
import { writeFile, readFile } from "../utils/fs.js";
import { templates } from "../generated/templates.js";
import { listThemes, getTheme } from "../registry.js";

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
		logger.log(`Detected package manager: ${pm!.name}`);

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
		const cssContent = templates["theme"]?.["katamine.css"];
		if (!cssContent) {
			logger.error("Base theme template not found. This is a bug.");
			process.exit(1);
		}

		const cssPath = path.join(cwd, "src/lib/styles/katamine.css");
		writeFile(cssPath, cssContent);
		logger.success("Created src/lib/styles/katamine.css");

		// 3b. Copy all theme files
		const themes = listThemes();
		for (const name of themes) {
			const content = getTheme(name);
			if (content) {
				const themePath = path.join(cwd, `src/lib/styles/themes/${name}.css`);
				writeFile(themePath, content);
			}
		}
		if (themes.length > 0) {
			logger.success(`Copied ${themes.length} themes to src/lib/styles/themes/`);
		}

		// 4. Auto-configure Tailwind: inject @import into app.css
		const appCss = findAppCss(cwd);
		if (appCss) {
			const appCssPath = path.join(cwd, appCss);
			let content = readFile(appCssPath);
			const importLine = `@import "$lib/styles/katamine.css";`;

			if (!content.includes(importLine)) {
				const themeImports = themes
					.map((name) => `@import "$lib/styles/themes/${name}.css";`)
					.join("\n");
				content = importLine + "\n" + themeImports + "\n" + content;
				writeFile(appCssPath, content);
				logger.success(`Added katamine.css and theme imports to ${appCss}`);
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
