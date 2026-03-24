<script lang="ts">
  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import { ClipboardCopy, Check } from "lucide-svelte";

  interface Props {
    value?: string;
    defaultValue?: string;
    timeout?: number;
    label?: string;
    disabled?: boolean;

    // Events
    onValueChange?: (details: { value: string }) => void;
    onStatusChange?: (details: { copied: boolean }) => void;

    class?: string;
  }

  let {
    value = $bindable(),
    defaultValue,
    timeout = 3000,
    label,
    disabled = false,
    onValueChange,
    onStatusChange,
    class: className,
  }: Props = $props();
</script>

<Clipboard.Root
  bind:value
  {defaultValue}
  {timeout}
  {onValueChange}
  {onStatusChange}
  class="w-full {className ?? ''}"
>
  {#if label}
    <Clipboard.Label class="mb-1.5 block text-sm font-medium text-km-base-content">
      {label}
    </Clipboard.Label>
  {/if}

  <Clipboard.Control class="flex items-center border border-km-base-300 rounded-km-field bg-km-base-100 transition-colors duration-150 focus-within:border-km-primary focus-within:outline-2 focus-within:outline-km-primary focus-within:-outline-offset-1">
    <Clipboard.Input
      {disabled}
      class="flex-1 min-w-0 border-none bg-transparent px-3 py-2 text-sm text-km-base-content outline-none placeholder:text-km-muted-content disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Clipboard.Trigger
      {disabled}
      class="flex cursor-pointer items-center justify-center gap-1.5 rounded-km-selector border-none bg-transparent px-3 py-2 text-sm text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
    >
      <Clipboard.Indicator>
        <ClipboardCopy size={16} />
        {#snippet copied()}
          <Check size={16} class="text-km-primary" />
        {/snippet}
      </Clipboard.Indicator>
    </Clipboard.Trigger>
  </Clipboard.Control>
</Clipboard.Root>
