<script lang="ts" generics="T extends Record<string, any>">
	import { Combobox, useListCollection, createListCollection } from '@ark-ui/svelte/combobox';
	import { useFilter } from '@ark-ui/svelte/locale';
	import { Portal } from '@ark-ui/svelte/portal';
	import { ChevronDown, X, Check, Loader2 } from 'lucide-svelte';

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
		filter?: 'contains' | 'startsWith' | ((item: string, input: string) => boolean);

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
		placeholder = '',
		name,
		disabled = false,
		closeOnSelect,
		onSearch,
		debounceMs = 300,
		filter: filterMode = 'contains',
		onValueChange,
		onInputValueChange,
		class: className
	}: Props = $props();

	// Intentional initial-value capture — async/sync mode is a design-time decision
	const isAsync = !!onSearch;

	// --- Sync mode ---
	const filters = useFilter({ sensitivity: 'base' });

	function getFilterFn() {
		if (typeof filterMode === 'function') return filterMode;
		if (filterMode === 'startsWith') return filters().startsWith;
		return filters().contains;
	}

	const syncCollection = !isAsync
		? useListCollection({
				get initialItems() {
					return items;
				},
				get itemToString() {
					return itemToLabel;
				},
				get itemToValue() {
					return itemToValue;
				},
				filter: getFilterFn()
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
					itemToValue: itemToValue
				})
			: undefined
	);

	$effect(() => () => clearTimeout(debounceTimer));

	function handleInputChange(details: Combobox.InputValueChangeDetails) {
		onInputValueChange?.(details);

		if (isAsync) {
			if (details.reason !== 'input-change') return;
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
				} catch {
					asyncItems = [];
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
	{onValueChange}
	onInputValueChange={handleInputChange}
	class="relative w-full {className ?? ''}"
>
	<Combobox.Control
		class="border-km-base-300 rounded-km-field bg-km-base-100 focus-within:border-km-primary focus-within:outline-km-primary flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1"
	>
		<Combobox.Input
			{placeholder}
			class="text-km-base-content placeholder:text-km-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none"
		/>
		<div class="flex items-center gap-0.5 pr-1.5">
			<Combobox.ClearTrigger
				class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
			>
				<X size={16} />
			</Combobox.ClearTrigger>
			<Combobox.Trigger
				class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
			>
				<ChevronDown size={16} />
			</Combobox.Trigger>
		</div>
	</Combobox.Control>

	<Portal>
		<Combobox.Positioner class="z-[var(--km-z-dropdown)]">
			<Combobox.Content
				class="rounded-km-box border-km-base-300 bg-km-base-100 shadow-km-md mt-1 max-h-60 overflow-y-auto border p-1"
			>
				{#if isAsync && asyncLoading}
					<div class="text-km-muted-content flex items-center justify-center gap-2 p-3 text-sm">
						<Loader2 size={16} class="animate-spin" />
						<span>Searching...</span>
					</div>
				{:else if getItems().length === 0}
					<Combobox.Empty
						class="text-km-muted-content flex items-center justify-center gap-2 p-3 text-sm"
						>No results found</Combobox.Empty
					>
				{:else}
					{#each getItems() as item (itemToValue(item))}
						<Combobox.Item
							{item}
							class="rounded-km-selector text-km-base-content data-[highlighted]:bg-km-base-200 data-[state=checked]:text-km-primary flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors duration-150"
						>
							<Combobox.ItemText>{itemToLabel(item)}</Combobox.ItemText>
							<Combobox.ItemIndicator class="text-km-primary flex items-center">
								<Check size={14} />
							</Combobox.ItemIndicator>
						</Combobox.Item>
					{/each}
				{/if}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox.Root>
