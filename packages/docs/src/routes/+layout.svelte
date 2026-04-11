<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import { Menu } from "lucide-svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
  import { sidebarState } from "$lib/sidebar-state.svelte";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();

  const isComponentPage = $derived($page.url.pathname.startsWith("/components"));
</script>

<div class="flex min-h-screen flex-col bg-km-base-100 text-km-base-content">
  <!-- Top bar -->
  <header class="flex h-14 items-center justify-between border-b border-km-base-300 bg-km-base-100 px-4">
    <div class="flex items-center gap-4">
      {#if isComponentPage}
        <button
          onclick={() => sidebarState.toggle()}
          class="flex items-center justify-center rounded-km-selector p-2 text-km-muted-content hover:bg-km-muted hover:text-km-base-content lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
      {/if}
      <a href="/" class="text-lg font-bold text-km-base-content no-underline">Katamine</a>
    </div>
    <div class="flex items-center gap-2">
      <a
        href="/getting-started"
        class="rounded-km-field px-3 py-1.5 text-sm text-km-base-content no-underline transition-colors hover:bg-km-muted"
      >
        Getting Started
      </a>
      <a
        href="/components/combobox"
        class="rounded-km-field px-3 py-1.5 text-sm text-km-base-content no-underline transition-colors hover:bg-km-muted"
      >
        Components
      </a>
      <ThemeSwitcher />
      <ThemeToggle />
    </div>
  </header>

  {@render children()}
</div>
