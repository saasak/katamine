import { templates } from "./generated/templates.js";

export interface ComponentEntry {
  name: string;
  category: string;
  files: Record<string, string>;
}

export function getComponent(name: string): ComponentEntry | null {
  const key = `components/${name}`;
  const files = templates[key];
  if (!files) return null;
  return { name, category: key, files };
}

export function listComponents(): string[] {
  return Object.keys(templates)
    .filter((k) => k.startsWith("components/"))
    .map((k) => k.replace("components/", ""));
}
