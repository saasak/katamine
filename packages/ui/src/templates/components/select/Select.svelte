<script lang="ts" generics="T extends Record<string, any>">
	import { Select, createListCollection } from '@ark-ui/svelte/select';
	import { Portal } from '@ark-ui/svelte/portal';
	import { ChevronDown, X, Check } from 'lucide-svelte';

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
		placeholder = 'Select...',
		name,
		disabled = false,
		closeOnSelect,
		label,
		onValueChange,
		onOpenChange,
		class: className
	}: Props = $props();

	const collection = $derived(
		createListCollection({
			items,
			itemToString: itemToLabel,
			itemToValue: itemToValue
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
		<Select.Label class="text-km-base-content mb-1.5 block text-sm font-medium">
			{label}
		</Select.Label>
	{/if}

	<Select.Control
		class="border-km-base-300 rounded-km-field bg-km-base-100 focus-within:border-km-primary focus-within:outline-km-primary flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1"
	>
		<Select.Trigger
			class="text-km-base-content flex flex-1 cursor-pointer items-center justify-between gap-2 border-none bg-transparent px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
		>
			<Select.ValueText
				{placeholder}
				class="data-[placeholder]:text-km-muted-content truncate text-left"
			/>
			<Select.Indicator
				class="text-km-muted-content flex items-center transition-transform duration-150 data-[state=open]:rotate-180"
			>
				<ChevronDown size={16} />
			</Select.Indicator>
		</Select.Trigger>
		{#if value?.length}
			<Select.ClearTrigger
				class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content mr-1.5 flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
			>
				<X size={16} />
			</Select.ClearTrigger>
		{/if}
	</Select.Control>

	<Select.HiddenSelect />

	<Portal>
		<Select.Positioner class="z-[var(--km-z-dropdown)]">
			<Select.Content
				class="rounded-km-box border-km-base-300 bg-km-base-100 shadow-km-md mt-1 max-h-60 overflow-y-auto border p-1"
			>
				{#if collection.items.length === 0}
					<div class="text-km-muted-content flex items-center justify-center p-3 text-sm">
						No options available
					</div>
				{:else}
					{#each collection.items as item (itemToValue(item))}
						<Select.Item
							{item}
							class="rounded-km-selector text-km-base-content data-[highlighted]:bg-km-base-200 data-[state=checked]:text-km-primary flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors duration-150"
						>
							<Select.ItemText>{itemToLabel(item)}</Select.ItemText>
							<Select.ItemIndicator class="text-km-primary flex items-center">
								<Check size={14} />
							</Select.ItemIndicator>
						</Select.Item>
					{/each}
				{/if}
			</Select.Content>
		</Select.Positioner>
	</Portal>
</Select.Root>
