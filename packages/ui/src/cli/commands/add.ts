import { Command } from "commander";
import path from "node:path";
import * as logger from "../utils/logger.js";
import { isKatamineInitialized } from "../utils/detect.js";
import {
  getComponent,
  listComponents,
  getBlock,
  listBlocks,
} from "../registry.js";
import { fileExists, copyTemplateFiles } from "../utils/fs.js";

const COMPONENT_DIR = "src/lib/components";
const BLOCK_DIR = "src/lib/blocks";

function detectBlockDependencies(files: Record<string, string>): string[] {
  const deps = new Set<string>();
  const re = /from\s+["']\.\.\/\.\.\/components\/([^/"']+)/g;
  for (const content of Object.values(files)) {
    let match;
    while ((match = re.exec(content)) !== null) {
      deps.add(match[1]);
    }
  }
  return [...deps];
}

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

async function addBlock(
  cwd: string,
  blockName: string
): Promise<boolean> {
  const block = getBlock(blockName);
  if (!block) {
    return false;
  }

  // Auto-install component dependencies
  const deps = detectBlockDependencies(block.files);
  for (const dep of deps) {
    const depDir = path.join(cwd, COMPONENT_DIR, dep);
    if (!fileExists(depDir)) {
      const ok = await addComponent(cwd, dep);
      if (!ok) {
        logger.error(`Failed to install dependency "${dep}" for block "${blockName}"`);
        return false;
      }
      logger.success(`Auto-installed dependency: ${dep}`);
    }
  }

  const destDir = path.join(cwd, BLOCK_DIR, blockName);
  if (fileExists(destDir)) {
    const overwrite = await logger.confirm(
      `${blockName} already exists. Overwrite?`
    );
    if (!overwrite) {
      logger.log(`Skipped ${blockName}`);
      return true;
    }
  }

  copyTemplateFiles(block.files, destDir);
  logger.success(`Added block: ${blockName}`);
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
      const blocks = listBlocks();
      for (const name of blocks) {
        await addBlock(cwd, name);
      }
      logger.outro(
        `Done! Added ${components.length} components and ${blocks.length} blocks.`
      );
      return;
    }

    // Try component first, then block
    const component = getComponent(componentName);
    if (component) {
      const ok = await addComponent(cwd, componentName);
      if (!ok) process.exit(1);
      logger.outro("Done!");
      return;
    }

    const block = getBlock(componentName);
    if (block) {
      const ok = await addBlock(cwd, componentName);
      if (!ok) process.exit(1);
      logger.outro("Done!");
      return;
    }

    const available = [
      ...listComponents(),
      ...listBlocks(),
    ];
    logger.error(
      `Unknown component or block "${componentName}". Available: ${available.join(", ")}`
    );
    process.exit(1);
  });
