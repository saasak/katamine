<script lang="ts">
  import { Sun, Moon } from "lucide-svelte";
  import { browser } from "$app/environment";

  let dark = $state(browser && document.documentElement.dataset.theme === "dark");

  function toggle() {
    dark = !dark;
    document.documentElement.dataset.theme = dark ? "dark" : "";
  }
</script>

<button
  onclick={toggle}
  class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-2 text-km-muted-content transition-colors hover:bg-km-muted hover:text-km-base-content"
  aria-label="Toggle theme"
>
  {#if dark}
    <Sun size={18} />
  {:else}
    <Moon size={18} />
  {/if}
</button>
