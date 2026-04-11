import { Command } from "commander";
import path from "node:path";
import * as logger from "../utils/logger.js";
import { isKatamineInitialized } from "../utils/detect.js";
import { getComponent, listComponents } from "../registry.js";
import { fileExists, copyTemplateFiles } from "../utils/fs.js";

const COMPONENT_DIR = "src/lib/components";

async function addComponent(
  cwd: string,
  componentName: string
): Promise<boolean> {
  const component = getComponent(componentName);
  if (!component) {
    const available = listComponents();
    logger.error(
      `Unknown component "${componentName}". Available: ${available.join(", ")}`
    );
    return false;
  }

  const destDir = path.join(cwd, COMPONENT_DIR, componentName);
  if (fileExists(destDir)) {
    const overwrite = await logger.confirm(
      `${componentName} already exists. Overwrite?`
    );
    if (!overwrite) {
      logger.log(`Skipped ${componentName}`);
      return true;
    }
  }

  copyTemplateFiles(component.files, destDir);
  logger.success(`Added ${componentName}`);
  return true;
}

export const addCommand = new Command("add")
  .description("Add a component to your project")
  .argument("<component>", 'Component name (e.g., combobox) or "all"')
  .action(async (componentName: string) => {
    logger.intro();
    const cwd = process.cwd();

    if (!isKatamineInitialized(cwd)) {
      logger.error(
        "Katamine not initialized. Run `katamine init` first."
      );
      process.exit(1);
    }

    if (componentName === "all") {
      const components = listComponents();
      for (const name of components) {
        await addComponent(cwd, name);
      }
      logger.outro(`Done! Added ${components.length} components.`);
      return;
    }

    const ok = await addComponent(cwd, componentName);
    if (!ok) process.exit(1);

    logger.outro("Done!");
  });
