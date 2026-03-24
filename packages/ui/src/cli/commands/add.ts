import { Command } from "commander";
import path from "node:path";
import * as logger from "../utils/logger.js";
import { getComponent, listComponents } from "../registry.js";
import { fileExists, readFile, writeFile, copyTemplateFiles } from "../utils/fs.js";

interface KatamineConfig {
  componentDir: string;
  installedComponents: string[];
}

function loadConfig(cwd: string): KatamineConfig | null {
  const configPath = path.join(cwd, ".katamine.json");
  if (!fileExists(configPath)) return null;
  return JSON.parse(readFile(configPath));
}

function saveConfig(cwd: string, config: KatamineConfig) {
  writeFile(
    path.join(cwd, ".katamine.json"),
    JSON.stringify(config, null, 2) + "\n"
  );
}

export const addCommand = new Command("add")
  .description("Add a component to your project")
  .argument("<component>", "Component name (e.g., combobox)")
  .action(async (componentName: string) => {
    logger.intro();
    const cwd = process.cwd();

    // 1. Load config
    const config = loadConfig(cwd);
    if (!config) {
      logger.error(
        "No .katamine.json found. Run `katamine init` first."
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
    const destDir = path.join(cwd, config.componentDir, componentName);
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

    // 5. Update config
    if (!config.installedComponents.includes(componentName)) {
      config.installedComponents.push(componentName);
      saveConfig(cwd, config);
    }

    const importPath = `$lib/components/${componentName}`;
    logger.success(`Added ${componentName}`);
    logger.log(`Import: import { ComboBox } from "${importPath}";`);

    logger.outro("Done!");
  });
