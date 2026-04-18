<script lang="ts" generics="T extends { value: string; label: string; disabled?: boolean }">
	import { Accordion } from '@ark-ui/svelte/accordion';
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Array of accordion items with value, label, and optional disabled */
		items: T[];
		/** Controlled expanded item value(s). Supports bind:value */
		value?: string[];
		/** Initial expanded item(s) for uncontrolled mode */
		defaultValue?: string[];
		/** Allow multiple items open at once */
		multiple?: boolean;
		/** Allow collapsing an open item by clicking its trigger again */
		collapsible?: boolean;
		/** Disable all accordion items */
		disabled?: boolean;
		/** Orientation of the accordion */
		orientation?: 'horizontal' | 'vertical';
		/** Callback when expanded items change */
		onValueChange?: (details: Accordion.ValueChangeDetails) => void;
		/** Callback when focused item changes */
		onFocusChange?: (details: Accordion.FocusChangeDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Content snippet — receives the current item */
		children: Snippet<[T]>;
	}

	let {
		items,
		value = $bindable(),
		defaultValue,
		multiple = false,
		collapsible = true,
		disabled = false,
		orientation = 'vertical',
		onValueChange,
		onFocusChange,
		class: className,
		children
	}: Props = $props();
</script>

<Accordion.Root
	{multiple}
	{collapsible}
	{disabled}
	bind:value
	{defaultValue}
	{onValueChange}
	{onFocusChange}
	{orientation}
	class="divide-km-base-300 rounded-km-box border-km-base-300 bg-km-base-100 w-full divide-y border {className ??
		''}"
>
	{#each items as item (item.value)}
		<Accordion.Item value={item.value} disabled={item.disabled}>
			<Accordion.ItemTrigger
				class="text-km-base-content hover:bg-km-base-200 flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-4 py-3 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<span>{item.label}</span>
				<Accordion.ItemIndicator
					class="text-km-muted-content transition-transform duration-150 data-[state=open]:rotate-180"
				>
					<ChevronDown size={16} />
				</Accordion.ItemIndicator>
			</Accordion.ItemTrigger>
			<Accordion.ItemContent class="overflow-hidden">
				<div class="text-km-base-content px-4 py-3 text-sm">
					{@render children(item)}
				</div>
			</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion.Root>
