<script lang="ts">
  import { ChevronRight, Ellipsis } from "lucide-svelte";
  import type { Snippet } from "svelte";

  interface BreadcrumbItem {
    label: string;
    href?: string;
    disabled?: boolean;
    icon?: Snippet;
  }

  interface Props {
    /** Breadcrumb items from root to current page */
    items: BreadcrumbItem[];
    /** Custom separator snippet. Defaults to ChevronRight icon */
    separator?: Snippet;
    /** Max visible items before truncation. 0 = no truncation */
    maxItems?: number;
    /** Accessible label for the nav element */
    label?: string;
    /** Additional CSS classes on the root nav element */
    class?: string;
  }

  let {
    items,
    separator,
    maxItems = 0,
    label = "Breadcrumb",
    class: className,
  }: Props = $props();

  const visibleItems = $derived.by(() => {
    if (maxItems <= 0 || items.length <= maxItems) return items;
    const tail = maxItems - 1;
    return [items[0], ...items.slice(-tail)];
  });

  const isTruncated = $derived(maxItems > 0 && items.length > maxItems);
</script>

<nav aria-label={label} class={className}>
  <ol class="flex flex-wrap items-center gap-1.5 text-sm">
    {#each visibleItems as item, i}
      {#if i === 1 && isTruncated}
        <li class="flex items-center gap-1.5">
          <span class="text-km-muted-content" aria-hidden="true">
            {#if separator}{@render separator()}{:else}<ChevronRight size={14} />{/if}
          </span>
          <span class="text-km-muted-content" role="presentation">
            <Ellipsis size={14} />
          </span>
        </li>
      {/if}
      <li class="flex items-center gap-1.5">
        {#if i > 0}
          <span class="text-km-muted-content" aria-hidden="true">
            {#if separator}{@render separator()}{:else}<ChevronRight size={14} />{/if}
          </span>
        {/if}
        {#if i === visibleItems.length - 1}
          <span
            class="inline-flex items-center gap-1 font-medium text-km-base-content"
            aria-current="page"
          >
            {#if item.icon}{@render item.icon()}{/if}
            {item.label}
          </span>
        {:else if item.href && !item.disabled}
          <a
            href={item.href}
            class="inline-flex items-center gap-1 text-km-muted-content transition-colors duration-150 hover:text-km-base-content"
          >
            {#if item.icon}{@render item.icon()}{/if}
            {item.label}
          </a>
        {:else}
          <span
            class="inline-flex items-center gap-1 text-km-muted-content {item.disabled ? 'opacity-50' : ''}"
            aria-disabled={item.disabled || undefined}
          >
            {#if item.icon}{@render item.icon()}{/if}
            {item.label}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
