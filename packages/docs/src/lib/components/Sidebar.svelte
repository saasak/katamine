<script lang="ts">
  import { page } from "$app/stores";
  import { componentNav, blockNav } from "$lib/nav";
  import { sidebarState } from "$lib/sidebar-state.svelte";
  import { X } from "lucide-svelte";

  function close() {
    sidebarState.open = false;
  }
</script>

<!-- Desktop sidebar -->
<aside class="hidden lg:flex w-64 shrink-0 flex-col border-r border-km-base-300 bg-km-base-200 p-4">
  <h2 class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-km-muted-content">Components</h2>
  <nav class="flex flex-col gap-0.5">
    {#each componentNav as item}
      <a
        href={item.href}
        class="rounded-km-field px-3 py-1.5 text-sm transition-colors {$page.url.pathname === item.href
          ? 'bg-km-primary text-km-primary-content'
          : 'text-km-base-content hover:bg-km-muted'}"
      >
        {item.label}
      </a>
    {/each}
  </nav>
  <h2 class="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-km-muted-content">Blocks</h2>
  <nav class="flex flex-col gap-0.5">
    {#each blockNav as item}
      <a
        href={item.href}
        class="rounded-km-field px-3 py-1.5 text-sm transition-colors {$page.url.pathname === item.href
          ? 'bg-km-primary text-km-primary-content'
          : 'text-km-base-content hover:bg-km-muted'}"
      >
        {item.label}
      </a>
    {/each}
  </nav>
</aside>

<!-- Mobile overlay -->
{#if sidebarState.open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-40 lg:hidden"
    onclick={close}
    onkeydown={(e) => e.key === "Escape" && close()}
  >
    <div class="absolute inset-0 bg-km-base-100/80"></div>
    <!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
    <aside
      class="absolute left-0 top-0 flex h-full w-64 flex-col bg-km-base-200 p-4 shadow-km-lg"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-km-muted-content">Components</h2>
        <button
          onclick={close}
          class="flex items-center justify-center rounded-km-selector p-1 text-km-muted-content hover:bg-km-muted hover:text-km-base-content"
        >
          <X size={18} />
        </button>
      </div>
      <nav class="flex flex-col gap-0.5">
        {#each componentNav as item}
          <a
            href={item.href}
            onclick={close}
            class="rounded-km-field px-3 py-1.5 text-sm transition-colors {$page.url.pathname === item.href
              ? 'bg-km-primary text-km-primary-content'
              : 'text-km-base-content hover:bg-km-muted'}"
          >
            {item.label}
          </a>
        {/each}
      </nav>
      <h2 class="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-km-muted-content">Blocks</h2>
      <nav class="flex flex-col gap-0.5">
        {#each blockNav as item}
          <a
            href={item.href}
            onclick={close}
            class="rounded-km-field px-3 py-1.5 text-sm transition-colors {$page.url.pathname === item.href
              ? 'bg-km-primary text-km-primary-content'
              : 'text-km-base-content hover:bg-km-muted'}"
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </aside>
  </div>
{/if}
