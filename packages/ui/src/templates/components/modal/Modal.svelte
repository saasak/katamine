<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
  import { Drawer } from "@ark-ui/svelte/drawer";
  import { Portal } from "@ark-ui/svelte/portal";
  import { X } from "lucide-svelte";
  import type { Snippet } from "svelte";

  interface Props {
    /** Controlled open state. Supports bind:open */
    open?: boolean;
    /** Initial open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Modal heading */
    title?: string;
    /** Modal description text */
    description?: string;
    /** Display mode: "responsive" auto-switches Dialog/Drawer, "drawer" always uses Drawer */
    variant?: "responsive" | "drawer";
    /** Breakpoint in px below which Drawer is used (only for variant="responsive") */
    breakpoint?: number;
    /** Whether the modal blocks outside interaction */
    modal?: boolean;
    /** Close on Escape key press */
    closeOnEscape?: boolean;
    /** Close when clicking outside */
    closeOnInteractOutside?: boolean;
    /** Prevent background scrolling when open */
    preventScroll?: boolean;
    /** Semantic role */
    role?: "dialog" | "alertdialog";
    /** Snap points for the drawer as fractions (0–1) or pixel strings. Ignored in dialog mode */
    snapPoints?: (number | string)[];
    /** Initial snap point when the drawer opens. Ignored in dialog mode */
    defaultSnapPoint?: number | string;
    /** Callback when the active snap point changes. Ignored in dialog mode */
    onSnapPointChange?: (details: { snapPoint: number | string | null }) => void;
    /** Force sequential snapping between snap points. Ignored in dialog mode */
    snapToSequentialPoints?: boolean;
    /** Disable the trigger */
    disabled?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (details: { open: boolean }) => void;
    /** Trigger button content */
    trigger?: Snippet;
    /** Footer content (e.g. action buttons) */
    footer?: Snippet;
    /** Modal body content */
    children?: Snippet;
    /** Additional CSS classes on the content panel */
    class?: string;
  }

  let {
    open = $bindable(),
    defaultOpen = false,
    title,
    description,
    variant = "responsive",
    breakpoint = 768,
    modal = true,
    closeOnEscape = true,
    closeOnInteractOutside = true,
    preventScroll = true,
    role = "dialog",
    snapPoints,
    defaultSnapPoint,
    onSnapPointChange,
    snapToSequentialPoints,
    disabled = false,
    onOpenChange,
    trigger,
    footer,
    children,
    class: className,
  }: Props = $props();

  let isMobile = $state(false);
  let showDrawer = $derived(variant === "drawer" || (variant === "responsive" && isMobile));
  let hasSnapPoints = $derived(snapPoints != null && snapPoints.length > 0);

  $effect(() => {
    if (variant !== "responsive") return;
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    isMobile = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      if (open && isMobile !== e.matches) {
        open = false;
      }
      isMobile = e.matches;
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  });
</script>

{#if showDrawer}
  <Drawer.Root
    bind:open
    {defaultOpen}
    {modal}
    {closeOnEscape}
    {closeOnInteractOutside}
    {preventScroll}
    {role}
    {onOpenChange}
    {snapPoints}
    {defaultSnapPoint}
    {onSnapPointChange}
    {snapToSequentialPoints}
  >
    {#if trigger}
      <Drawer.Trigger {disabled}>
        {#snippet asChild(props)}
          <span {...props()} class="inline-flex">
            {@render trigger()}
          </span>
        {/snippet}
      </Drawer.Trigger>
    {/if}

    <Portal>
      <Drawer.Backdrop
        class="fixed inset-0 z-[var(--km-z-overlay)] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
      />
      <Drawer.Positioner
        class="fixed inset-x-0 bottom-0 max-h-dvh z-[var(--km-z-modal)] overflow-hidden"
      >
        <Drawer.Content
          class="w-full max-h-[85dvh] rounded-t-2xl border-t border-x border-km-base-300 bg-km-base-100 shadow-km-lg {hasSnapPoints ? '' : 'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out'} {className ?? ''}"
        >
          <Drawer.Grabber class="flex justify-center pt-3 pb-1">
            <Drawer.GrabberIndicator
              class="h-1.5 w-12 rounded-full bg-km-base-300"
            />
          </Drawer.Grabber>

          <div class="overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <Drawer.CloseTrigger
              class="absolute right-4 top-4 flex items-center justify-center rounded-km-selector p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
            >
              <X size={16} />
            </Drawer.CloseTrigger>

            {#if title}
              <Drawer.Title class="text-lg font-semibold text-km-base-content">
                {title}
              </Drawer.Title>
            {/if}

            {#if description}
              <p class="mt-1 text-sm text-km-muted-content">
                {description}
              </p>
            {/if}

            {#if children}
              <div class="mt-4">
                {@render children()}
              </div>
            {/if}

            {#if footer}
              <div class="mt-6 flex items-center justify-end gap-2">
                {@render footer()}
              </div>
            {/if}
          </div>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  </Drawer.Root>
{:else}
  <Dialog.Root
    bind:open
    {defaultOpen}
    {modal}
    {closeOnEscape}
    {closeOnInteractOutside}
    {preventScroll}
    {role}
    {onOpenChange}
  >
    {#if trigger}
      <Dialog.Trigger {disabled}>
        {#snippet asChild(props)}
          <span {...props()} class="inline-flex">
            {@render trigger()}
          </span>
        {/snippet}
      </Dialog.Trigger>
    {/if}

    <Portal>
      <Dialog.Backdrop
        class="fixed inset-0 z-[var(--km-z-overlay)] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
      />
      <Dialog.Positioner
        class="fixed inset-0 z-[var(--km-z-modal)] flex items-center justify-center p-4"
      >
        <Dialog.Content
          class="relative w-full max-w-lg rounded-km-box border border-km-base-300 bg-km-base-100 p-6 shadow-km-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 {className ?? ''}"
        >
          <Dialog.CloseTrigger
            class="absolute right-4 top-4 flex items-center justify-center rounded-km-selector p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
          >
            <X size={16} />
          </Dialog.CloseTrigger>

          {#if title}
            <Dialog.Title class="text-lg font-semibold text-km-base-content">
              {title}
            </Dialog.Title>
          {/if}

          {#if description}
            <Dialog.Description class="mt-1 text-sm text-km-muted-content">
              {description}
            </Dialog.Description>
          {/if}

          {#if children}
            <div class="mt-4">
              {@render children()}
            </div>
          {/if}

          {#if footer}
            <div class="mt-6 flex items-center justify-end gap-2">
              {@render footer()}
            </div>
          {/if}
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
{/if}
