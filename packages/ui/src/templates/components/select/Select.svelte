<script lang="ts" generics="T extends Record<string, any>">
  import { Select, createListCollection } from "@ark-ui/svelte/select";
  import { Portal } from "@ark-ui/svelte/portal";
  import { ChevronDown, X, Check } from "lucide-svelte";

  interface Props {
    items: T[];
    itemToLabel?: (item: T) => string;
    itemToValue?: (item: T) => string;
    value?: string[];
    defaultValue?: string[];
    multiple?: boolean;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
    closeOnSelect?: boolean;
    label?: string;

    // Events
    onValueChange?: (details: Select.ValueChangeDetails) => void;
    onOpenChange?: (details: Select.OpenChangeDetails) => void;

    class?: string;
  }

  let {
    items,
    itemToLabel = (item: T) => (item as any).label ?? String(item),
    itemToValue = (item: T) => (item as any).value ?? String(item),
    value = $bindable(),
    defaultValue,
    multiple = false,
    placeholder = "Select...",
    name,
    disabled = false,
    closeOnSelect,
    label,
    onValueChange,
    onOpenChange,
    class: className,
  }: Props = $props();

  const collection = $derived(
    createListCollection({
      items,
      itemToString: itemToLabel,
      itemToValue: itemToValue,
    })
  );
</script>

<Select.Root
  {collection}
  {multiple}
  {disabled}
  {name}
  closeOnSelect={closeOnSelect ?? !multiple}
  bind:value
  {defaultValue}
  {onValueChange}
  {onOpenChange}
  class="relative w-full {className ?? ''}"
>
  {#if label}
    <Select.Label class="mb-1.5 block text-sm font-medium text-km-base-content">
      {label}
    </Select.Label>
  {/if}

  <Select.Control class="flex items-center border border-km-base-300 rounded-km-field bg-km-base-100 transition-colors duration-150 focus-within:border-km-primary focus-within:outline-2 focus-within:outline-km-primary focus-within:-outline-offset-1">
    <Select.Trigger class="flex flex-1 cursor-pointer items-center justify-between gap-2 border-none bg-transparent px-3 py-2 text-sm text-km-base-content outline-none disabled:cursor-not-allowed disabled:opacity-50">
      <Select.ValueText {placeholder} class="truncate text-left data-[placeholder]:text-km-muted-content" />
      <Select.Indicator class="flex items-center text-km-muted-content transition-transform duration-150 data-[state=open]:rotate-180">
        <ChevronDown size={16} />
      </Select.Indicator>
    </Select.Trigger>
    {#if multiple}
      <Select.ClearTrigger class="mr-1.5 flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
        <X size={16} />
      </Select.ClearTrigger>
    {/if}
  </Select.Control>

  <Select.HiddenSelect />

  <Portal>
    <Select.Positioner class="z-[var(--km-z-dropdown)]">
      <Select.Content class="mt-1 max-h-60 overflow-y-auto rounded-km-box border border-km-base-300 bg-km-base-100 p-1 shadow-km-md">
        {#each collection.items as item (itemToValue(item))}
          <Select.Item {item} class="flex cursor-pointer items-center justify-between rounded-km-selector px-3 py-2 text-sm text-km-base-content transition-colors duration-150 data-[highlighted]:bg-km-base-200 data-[state=checked]:text-km-primary">
            <Select.ItemText>{itemToLabel(item)}</Select.ItemText>
            <Select.ItemIndicator class="flex items-center text-km-primary">
              <Check size={14} />
            </Select.ItemIndicator>
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Positioner>
  </Portal>
</Select.Root>
