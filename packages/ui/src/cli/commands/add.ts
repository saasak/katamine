import { Command } from "commander";
import { execSync } from "node:child_process";
import * as logger from "../utils/logger.js";
import { isKatamineInitialized } from "../utils/detect.js";

const REGISTRY = "github/saasak/katamine";

export const addCommand = new Command("add")
	.description("Add a component to your project")
	.argument("<components...>", "Component names (e.g., combobox select)")
	.option("--overwrite", "Overwrite existing files without prompting")
	.action(async (components: string[], opts: { overwrite?: boolean }) => {
		logger.intro();
		const cwd = process.cwd();

		if (!isKatamineInitialized(cwd)) {
			logger.warn("Katamine not initialized. Run `katamine init` first.");
			process.exit(1);
		}

		const items = components
			.map((c) => `${REGISTRY}/${c}`)
			.join(" ");

		const flags = [
			"--yes",
			opts.overwrite ? "--overwrite" : "",
			`--cwd ${cwd}`,
		]
			.filter(Boolean)
			.join(" ");

		const cmd = `npx jsrepo add ${items} ${flags}`.trim();

		try {
			execSync(cmd, { stdio: "inherit", cwd });
		} catch {
			logger.error("Failed to add components. See errors above.");
			process.exit(1);
		}

		logger.outro("Done!");
	});
