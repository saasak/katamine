<script lang="ts">
  import { Toggle } from "@ark-ui/svelte/toggle";
  import type { Snippet } from "svelte";

  interface Props {
    /** Controlled pressed state. Supports bind:pressed */
    pressed?: boolean;
    /** Initial state for uncontrolled mode */
    defaultPressed?: boolean;
    /** Disable the toggle */
    disabled?: boolean;
    /** Callback when pressed state changes */
    onPressedChange?: (pressed: boolean) => void;
    /** Additional CSS classes on the root element */
    class?: string;
    /** Button content */
    children?: Snippet;
  }

  let {
    pressed = $bindable(),
    defaultPressed,
    disabled = false,
    onPressedChange,
    class: className,
    children,
  }: Props = $props();
</script>

<Toggle.Root
  bind:pressed
  {defaultPressed}
  {disabled}
  {onPressedChange}
  class="inline-flex cursor-pointer items-center gap-1.5 rounded-km-field border border-km-base-300 bg-km-base-100 px-3 py-1.5 text-sm font-medium text-km-base-content transition-colors duration-150 hover:bg-km-base-200 data-[state=on]:border-km-primary data-[state=on]:bg-km-primary data-[state=on]:text-km-primary-content data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus]:outline-2 data-[focus]:outline-km-primary data-[focus]:outline-offset-2 {className ?? ''}"
>
  {@render children?.()}
</Toggle.Root>
