<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
  import { Portal } from "@ark-ui/svelte/portal";
  import { X } from "lucide-svelte";
  import type { Snippet } from "svelte";

  interface Props {
    /** Controlled open state. Supports bind:open */
    open?: boolean;
    /** Initial open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Dialog heading */
    title?: string;
    /** Dialog description text */
    description?: string;
    /** Whether the dialog is modal (blocks outside interaction) */
    modal?: boolean;
    /** Close on Escape key press */
    closeOnEscape?: boolean;
    /** Close when clicking outside */
    closeOnInteractOutside?: boolean;
    /** Prevent background scrolling when open */
    preventScroll?: boolean;
    /** Semantic role */
    role?: "dialog" | "alertdialog";
    /** Disable the dialog trigger */
    disabled?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (details: Dialog.OpenChangeDetails) => void;
    /** Trigger button content */
    trigger?: Snippet;
    /** Footer content (e.g. action buttons) */
    footer?: Snippet;
    /** Dialog body content */
    children?: Snippet;
    /** Additional CSS classes on the content panel */
    class?: string;
  }

  let {
    open = $bindable(),
    defaultOpen = false,
    title,
    description,
    modal = true,
    closeOnEscape = true,
    closeOnInteractOutside = true,
    preventScroll = true,
    role = "dialog",
    disabled = false,
    onOpenChange,
    trigger,
    footer,
    children,
    class: className,
  }: Props = $props();
</script>

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
      {#snippet child(triggerProps)}
        <span {...triggerProps} class="inline-flex">
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
