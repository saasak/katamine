<script lang="ts">
  import { Tour, useTour } from "@ark-ui/svelte/tour";
  import { Portal } from "@ark-ui/svelte/portal";
  import { X } from "lucide-svelte";
  import type { Snippet } from "svelte";

  interface Props {
    /** Tour steps defining content and target elements */
    steps: Tour.StepDetails[];
    /** Controlled step ID. Set to a step's id to open that step, null to close */
    stepId?: string | null;
    /** Close tour when clicking outside the content panel */
    closeOnInteractOutside?: boolean;
    /** Close tour on Escape key press */
    closeOnEscape?: boolean;
    /** Enable left/right arrow key navigation */
    keyboardNavigation?: boolean;
    /** Prevent interaction with the page while tour is open */
    preventInteraction?: boolean;
    /** Spotlight padding around the target element (px) */
    spotlightOffset?: { x: number; y: number };
    /** Spotlight border-radius (px) */
    spotlightRadius?: number;
    /** Disable the tour (prevent starting) */
    disabled?: boolean;
    /** Callback when the current step changes */
    onStepChange?: (details: Tour.StepChangeDetails) => void;
    /** Callback when tour status changes (started, dismissed, completed) */
    onStatusChange?: (details: Tour.StatusChangeDetails) => void;
    /** Additional CSS classes on the content panel */
    class?: string;
    /** Render snippet for trigger/page content — receives { start } */
    children?: Snippet<[{ start: (id?: string) => void }]>;
  }

  let {
    steps,
    stepId,
    closeOnInteractOutside = true,
    closeOnEscape = true,
    keyboardNavigation = true,
    preventInteraction = false,
    spotlightOffset,
    spotlightRadius,
    disabled = false,
    onStepChange,
    onStatusChange,
    class: className,
    children,
  }: Props = $props();

  const tour = useTour(() => ({
    steps,
    stepId,
    closeOnInteractOutside,
    closeOnEscape,
    keyboardNavigation,
    preventInteraction,
    spotlightOffset,
    spotlightRadius,
    onStepChange,
    onStatusChange,
  }));

  function start(id?: string) {
    if (disabled) return;
    tour().start(id);
  }
</script>

<Tour.Root {tour}>
  <Portal>
    <div class="pointer-events-none fixed inset-0 z-[var(--km-z-modal)]">
      <Tour.Backdrop class="pointer-events-auto absolute inset-0 bg-black/40" />
      <Tour.Spotlight
        class="rounded border-2 border-km-primary"
      />
      <Tour.Positioner class="pointer-events-auto">
        <Tour.Content
          class="relative w-80 rounded-km-box border border-km-base-300 bg-km-base-100 p-4 shadow-km-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 {className ?? ''}"
        >
          <Tour.Arrow>
            <Tour.ArrowTip class="border-km-base-300" />
          </Tour.Arrow>

          <Tour.CloseTrigger
            aria-label="Close tour"
            class="absolute right-2 top-2 flex items-center justify-center rounded-km-selector p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
          >
            <X size={14} />
          </Tour.CloseTrigger>

          <Tour.Title class="pr-6 text-sm font-semibold text-km-base-content" />
          <Tour.Description class="mt-1 text-sm text-km-muted-content" />

          <div class="mt-4 flex items-center justify-between gap-2">
            <Tour.ProgressText class="text-xs text-km-muted-content" />
            <div class="flex items-center gap-2">
              {#each tour().step?.actions ?? [] as action}
                <Tour.ActionTrigger
                  {action}
                  class="rounded-km-field border border-km-base-300 bg-km-base-200 px-3 py-1.5 text-xs font-medium text-km-base-content transition-colors duration-150 hover:bg-km-muted disabled:cursor-not-allowed disabled:opacity-50 data-[type=next]:border-km-primary data-[type=next]:bg-km-primary data-[type=next]:text-km-primary-content data-[type=next]:hover:opacity-90"
                />
              {/each}
            </div>
          </div>
        </Tour.Content>
      </Tour.Positioner>
    </div>
  </Portal>

  {#if children}
    {@render children({ start })}
  {/if}
</Tour.Root>
