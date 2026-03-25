<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import { Portal } from "@ark-ui/svelte/portal";
  import { X } from "lucide-svelte";
  import type { Snippet } from "svelte";

  interface Props {
    /** Controlled open state. Supports bind:open */
    open?: boolean;
    /** Initial open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Popover heading */
    title?: string;
    /** Popover description text */
    description?: string;
    /** Whether clicking outside closes the popover */
    closeOnInteractOutside?: boolean;
    /** Close on Escape key press */
    closeOnEscape?: boolean;
    /** Whether the popover is modal (traps focus) */
    modal?: boolean;
    /** Auto-focus the first focusable element when opened */
    autoFocus?: boolean;
    /** Popper.js positioning options (placement, offset, etc.) */
    positioning?: import("@zag-js/popper").PositioningOptions;
    /** Callback when open state changes */
    onOpenChange?: (details: Popover.OpenChangeDetails) => void;
    /** Trigger content */
    trigger?: Snippet;
    /** Popover body content */
    children?: Snippet;
    /** Additional CSS classes on the content panel */
    class?: string;
  }

  let {
    open = $bindable(),
    defaultOpen = false,
    title,
    description,
    closeOnInteractOutside = true,
    closeOnEscape = true,
    modal = false,
    autoFocus = true,
    positioning,
    onOpenChange,
    trigger,
    children,
    class: className,
  }: Props = $props();
</script>

<Popover.Root
  bind:open
  {defaultOpen}
  {closeOnInteractOutside}
  {closeOnEscape}
  {modal}
  {autoFocus}
  {positioning}
  {onOpenChange}
>
  {#if trigger}
    <Popover.Trigger>
      {#snippet asChild(propsFn)}
        <span {...propsFn()} class="inline-flex">
          {@render trigger()}
        </span>
      {/snippet}
    </Popover.Trigger>
  {/if}

  <Portal>
    <Popover.Positioner class="z-[var(--km-z-popover)]">
      <Popover.Content
        class="w-72 rounded-km-box border border-km-base-300 bg-km-base-100 p-4 shadow-km-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 {className ?? ''}"
      >
        <Popover.Arrow>
          <Popover.ArrowTip class="border-km-base-300" />
        </Popover.Arrow>

        <div class="flex items-start justify-between gap-2">
          <div>
            {#if title}
              <Popover.Title class="text-sm font-semibold text-km-base-content">
                {title}
              </Popover.Title>
            {/if}

            {#if description}
              <Popover.Description class="mt-1 text-sm text-km-muted-content">
                {description}
              </Popover.Description>
            {/if}
          </div>

          <Popover.CloseTrigger
            class="flex shrink-0 items-center justify-center rounded-km-selector p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
          >
            <X size={14} />
          </Popover.CloseTrigger>
        </div>

        {#if children}
          <div class="mt-3">
            {@render children()}
          </div>
        {/if}
      </Popover.Content>
    </Popover.Positioner>
  </Portal>
</Popover.Root>
