<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    description,
    code,
    children,
  }: {
    title: string;
    description?: string;
    code?: string;
    children: Snippet;
  } = $props();

  let showCode = $state(false);
</script>

<div class="rounded-km-box border border-km-base-300">
  <div class="border-b border-km-base-300 px-4 py-3">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-semibold text-km-base-content">{title}</h3>
        {#if description}
          <p class="mt-1 text-sm text-km-muted-content">{description}</p>
        {/if}
      </div>
      {#if code}
        <button
          onclick={() => (showCode = !showCode)}
          class="rounded-km-field px-3 py-1.5 text-xs font-medium text-km-muted-content transition-colors hover:bg-km-muted hover:text-km-base-content"
        >
          {showCode ? "Hide code" : "Show code"}
        </button>
      {/if}
    </div>
  </div>

  <div class="p-4">
    {@render children()}
  </div>

  {#if code && showCode}
    <div class="border-t border-km-base-300">
      <pre class="overflow-x-auto bg-km-base-200 p-4 font-mono text-sm">{code}</pre>
    </div>
  {/if}
</div>
