import fs from "node:fs";
import path from "node:path";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function isSvelteKit(cwd: string): boolean {
  return (
    fs.existsSync(path.join(cwd, "svelte.config.js")) ||
    fs.existsSync(path.join(cwd, "svelte.config.ts"))
  );
}

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock"))) return "bun";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

export function findAppCss(cwd: string): string | null {
  const candidates = [
    "src/app.css",
    "src/app.pcss",
    "src/app.postcss",
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(path.join(cwd, candidate))) {
      return candidate;
    }
  }
  return null;
}
