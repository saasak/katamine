import { Command } from "commander";
import path from "node:path";
import * as logger from "../utils/logger.js";
import { isKatamineInitialized } from "../utils/detect.js";
import { getComponent, listComponents } from "../registry.js";
import { fileExists, copyTemplateFiles } from "../utils/fs.js";

const COMPONENT_DIR = "src/lib/components";

export const addCommand = new Command("add")
  .description("Add a component to your project")
  .argument("<component>", "Component name (e.g., combobox)")
  .action(async (componentName: string) => {
    logger.intro();
    const cwd = process.cwd();

    // 1. Check initialization
    if (!isKatamineInitialized(cwd)) {
      logger.error(
        "Katamine not initialized. Run `katamine init` first."
      );
      process.exit(1);
    }

    // 2. Look up component
    const component = getComponent(componentName);
    if (!component) {
      const available = listComponents();
      logger.error(
        `Unknown component "${componentName}". Available: ${available.join(", ")}`
      );
      process.exit(1);
    }

    // 3. Check if already exists
    const destDir = path.join(cwd, COMPONENT_DIR, componentName);
    if (fileExists(destDir)) {
      const overwrite = await logger.confirm(
        `${componentName} already exists. Overwrite?`
      );
      if (!overwrite) {
        logger.cancel("Cancelled.");
        return;
      }
    }

    // 4. Copy files
    copyTemplateFiles(component.files, destDir);

    const importPath = `$lib/components/${componentName}`;
    logger.success(`Added ${componentName}`);
    logger.log(`Import: import { ComboBox } from "${importPath}";`);

    logger.outro("Done!");
  });
