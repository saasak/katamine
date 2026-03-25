<script lang="ts">
  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import { Portal } from "@ark-ui/svelte/portal";
  import type { Snippet } from "svelte";

  interface Props {
    /** Controlled open state. Supports bind:open */
    open?: boolean;
    /** Initial open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Delay in ms before the hover card opens (default 600) */
    openDelay?: number;
    /** Delay in ms before the hover card closes (default 300) */
    closeDelay?: number;
    /** Prevent the hover card from opening */
    disabled?: boolean;
    /** Popper.js positioning options (placement, offset, etc.) */
    positioning?: import("@zag-js/popper").PositioningOptions;
    /** Callback when the hover card opens or closes */
    onOpenChange?: (details: HoverCard.OpenChangeDetails) => void;
    /** The trigger element */
    trigger: Snippet;
    /** The hover card content */
    children: Snippet;
    /** Show an arrow pointing to the trigger */
    arrow?: boolean;
    /** Additional CSS classes on the hover card content */
    class?: string;
  }

  let {
    open = $bindable(),
    defaultOpen,
    openDelay = 600,
    closeDelay = 300,
    disabled = false,
    positioning,
    onOpenChange,
    trigger,
    children,
    arrow = true,
    class: className,
  }: Props = $props();
</script>

<HoverCard.Root
  bind:open
  {defaultOpen}
  {openDelay}
  {closeDelay}
  {disabled}
  {positioning}
  {onOpenChange}
>
  <HoverCard.Trigger>
    {#snippet child(triggerProps)}
      <span {...triggerProps} class="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-km-primary focus-visible:outline-offset-2">
        {@render trigger()}
      </span>
    {/snippet}
  </HoverCard.Trigger>

  <Portal>
    <HoverCard.Positioner class="z-[var(--km-z-popover)]">
      <HoverCard.Content
        class="w-72 rounded-km-box border border-km-base-300 bg-km-base-100 p-4 text-sm text-km-base-content shadow-km-md transition-opacity duration-[var(--km-transition-fast)] data-[state=open]:opacity-100 data-[state=closed]:opacity-0 {className ?? ''}"
      >
        {#if arrow}
          <HoverCard.Arrow>
            <HoverCard.ArrowTip class="border-km-base-300" />
          </HoverCard.Arrow>
        {/if}
        {@render children()}
      </HoverCard.Content>
    </HoverCard.Positioner>
  </Portal>
</HoverCard.Root>
