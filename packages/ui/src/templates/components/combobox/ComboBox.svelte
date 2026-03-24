<script lang="ts" generics="T extends Record<string, any>">
  import { Combobox, useListCollection, createListCollection } from "@ark-ui/svelte/combobox";
  import { useFilter } from "@ark-ui/svelte/locale";
  import { Portal } from "@ark-ui/svelte/portal";
  import { ChevronDown, X, Check, Loader2 } from "lucide-svelte";

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

    // Async
    onSearch?: (query: string) => Promise<T[]> | T[];
    debounceMs?: number;

    // Sync filtering
    filter?: "contains" | "startsWith" | ((item: string, input: string) => boolean);

    // Events
    onValueChange?: (details: Combobox.ValueChangeDetails) => void;
    onInputValueChange?: (details: Combobox.InputValueChangeDetails) => void;

    class?: string;
  }

  let {
    items,
    itemToLabel = (item: T) => (item as any).label ?? String(item),
    itemToValue = (item: T) => (item as any).value ?? String(item),
    value = $bindable(),
    defaultValue,
    multiple = false,
    placeholder = "",
    name,
    disabled = false,
    closeOnSelect,
    onSearch,
    debounceMs = 300,
    filter: filterMode = "contains",
    onValueChange,
    onInputValueChange,
    class: className,
  }: Props = $props();

  const isAsync = !!onSearch;

  // --- Sync mode ---
  const filters = useFilter({ sensitivity: "base" });

  function getFilterFn() {
    if (typeof filterMode === "function") return filterMode;
    if (filterMode === "startsWith") return filters().startsWith;
    return filters().contains;
  }

  const syncCollection = !isAsync
    ? useListCollection({
        get initialItems() { return items; },
        itemToString: itemToLabel,
        itemToValue,
        filter: getFilterFn(),
      })
    : undefined;

  // --- Async mode ---
  let asyncItems = $state<T[]>([]);
  let asyncLoading = $state(false);
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const asyncCollection = $derived(
    isAsync
      ? createListCollection({
          items: asyncItems,
          itemToString: itemToLabel,
          itemToValue,
        })
      : undefined
  );

  function handleInputChange(details: Combobox.InputValueChangeDetails) {
    onInputValueChange?.(details);

    if (isAsync) {
      if (details.reason !== "input-change") return;
      clearTimeout(debounceTimer);
      const query = details.inputValue;
      if (!query.trim()) {
        asyncItems = [];
        asyncLoading = false;
        return;
      }
      asyncLoading = true;
      debounceTimer = setTimeout(async () => {
        try {
          const result = await onSearch!(query);
          asyncItems = result;
        } finally {
          asyncLoading = false;
        }
      }, debounceMs);
    } else {
      syncCollection!.filter(details.inputValue);
    }
  }

  function getCollection() {
    if (isAsync) return asyncCollection!;
    return syncCollection!.collection();
  }

  function getItems() {
    if (isAsync) return asyncItems;
    return syncCollection!.collection().items;
  }
</script>

<Combobox.Root
  collection={getCollection()}
  {multiple}
  {disabled}
  {name}
  closeOnSelect={closeOnSelect ?? !multiple}
  bind:value
  {defaultValue}
  onValueChange={onValueChange}
  onInputValueChange={handleInputChange}
  class="relative w-full {className ?? ''}"
>
  <Combobox.Control class="flex items-center border border-km-base-300 rounded-km-field bg-km-base-100 transition-colors duration-150 focus-within:border-km-primary focus-within:outline-2 focus-within:outline-km-primary focus-within:-outline-offset-1">
    <Combobox.Input {placeholder} class="flex-1 min-w-0 border-none bg-transparent px-3 py-2 text-sm text-km-base-content outline-none placeholder:text-km-muted-content" />
    <div class="flex items-center gap-0.5 pr-1.5">
      <Combobox.ClearTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
        <X size={16} />
      </Combobox.ClearTrigger>
      <Combobox.Trigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
        <ChevronDown size={16} />
      </Combobox.Trigger>
    </div>
  </Combobox.Control>

  <Portal>
    <Combobox.Positioner class="z-[var(--km-z-dropdown)]">
      <Combobox.Content class="mt-1 max-h-60 overflow-y-auto rounded-km-box border border-km-base-300 bg-km-base-100 p-1 shadow-km-md">
        {#if isAsync && asyncLoading}
          <div class="flex items-center justify-center gap-2 p-3 text-sm text-km-muted-content">
            <Loader2 size={16} class="animate-spin" />
            <span>Searching...</span>
          </div>
        {:else if getItems().length === 0}
          <Combobox.Empty class="flex items-center justify-center gap-2 p-3 text-sm text-km-muted-content">No results found</Combobox.Empty>
        {:else}
          {#each getItems() as item (itemToValue(item))}
            <Combobox.Item {item} class="flex cursor-pointer items-center justify-between rounded-km-selector px-3 py-2 text-sm text-km-base-content transition-colors duration-150 data-[highlighted]:bg-km-base-200 data-[state=checked]:text-km-primary">
              <Combobox.ItemText>{itemToLabel(item)}</Combobox.ItemText>
              <Combobox.ItemIndicator class="flex items-center text-km-primary">
                <Check size={14} />
              </Combobox.ItemIndicator>
            </Combobox.Item>
          {/each}
        {/if}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
