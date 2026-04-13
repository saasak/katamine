import { Command } from "commander";
import { execSync } from "node:child_process";
import * as logger from "../utils/logger.js";
import { isKatamineInitialized } from "../utils/detect.js";

const REGISTRY = "github/saasak/katamine";

export const updateCommand = new Command("update")
	.description("Update previously added components with interactive diffs")
	.option("--overwrite", "Overwrite files without prompting")
	.option("-E, --expand", "Show full file diffs instead of collapsed")
	.action(async (opts: { overwrite?: boolean; expand?: boolean }) => {
		logger.intro();
		const cwd = process.cwd();

		if (!isKatamineInitialized(cwd)) {
			logger.warn("Katamine not initialized. Run `katamine init` first.");
			process.exit(1);
		}

		const flags = [
			opts.overwrite ? "--overwrite" : "",
			opts.expand ? "--expand" : "",
			`--cwd ${cwd}`,
		]
			.filter(Boolean)
			.join(" ");

		const cmd = `npx jsrepo update ${REGISTRY} ${flags}`.trim();

		try {
			execSync(cmd, { stdio: "inherit", cwd });
		} catch {
			logger.error("Failed to update components. See errors above.");
			process.exit(1);
		}

		logger.outro("Done!");
	});
