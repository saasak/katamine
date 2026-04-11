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

export function getTheme(name: string): string | null {
  return templates["theme"]?.[`${name}.css`] ?? null;
}

export function listThemes(): string[] {
  const themeFiles = templates["theme"];
  if (!themeFiles) return [];
  return Object.keys(themeFiles)
    .filter((k) => k !== "katamine.css")
    .map((k) => k.replace(".css", ""));
}
