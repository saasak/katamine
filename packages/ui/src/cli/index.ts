import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";

const program = new Command();

program
  .name("katamine")
  .description(
    "Copy ready-to-use, themed SvelteKit components into your project"
  )
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(addCommand);

program.parse();
