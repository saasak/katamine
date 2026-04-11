<script lang="ts">
  import { browser } from "$app/environment";
  import { Palette } from "lucide-svelte";

  const themes = [
    "default",
    "ocean",
    "forest",
    "sunset",
    "rose",
    "cyberpunk",
    "nord",
    "dracula",
    "emerald",
    "valentine",
    "autumn",
    "synthwave",
    "coffee",
  ] as const;

  let current = $state(
    browser ? (document.documentElement.dataset.theme || "default") : "default"
  );

  function select(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    current = value;
    if (value === "default") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = value;
    }
    localStorage.setItem("km-theme", value);
  }

  if (browser) {
    const saved = localStorage.getItem("km-theme");
    if (saved && saved !== "default") {
      document.documentElement.dataset.theme = saved;
      current = saved;
    }
  }
</script>

<div class="flex items-center gap-1.5">
  <Palette size={16} class="text-km-muted-content" />
  <select
    value={current}
    onchange={select}
    class="cursor-pointer rounded-km-field border border-km-base-300 bg-km-base-100 px-2 py-1 text-sm text-km-base-content transition-colors hover:border-km-base-content/30 focus:outline-none"
  >
    {#each themes as theme}
      <option value={theme} class="capitalize">{theme}</option>
    {/each}
  </select>
</div>
