<script lang="ts">
	import { RadioGroup } from '@ark-ui/svelte/radio-group';

	export interface Item {
		/** Value submitted with the form */
		value: string;
		/** Display label */
		label: string;
		/** Disable this option */
		disabled?: boolean;
	}

	interface Props {
		/** Radio options to render */
		items: Item[];
		/** Controlled selected value. Supports bind:value */
		value?: string;
		/** Initial value for uncontrolled mode */
		defaultValue?: string;
		/** Display label for the group */
		label?: string;
		/** Form field name for native submission */
		name?: string;
		/** Disable all options */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Orientation of the group */
		orientation?: 'horizontal' | 'vertical';
		/** Callback when value changes */
		onValueChange?: (details: RadioGroup.ValueChangeDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		items,
		value = $bindable(),
		defaultValue,
		label,
		name,
		disabled = false,
		invalid = false,
		required = false,
		readOnly = false,
		orientation = 'vertical',
		onValueChange,
		class: className
	}: Props = $props();
</script>

<RadioGroup.Root
	bind:value
	{defaultValue}
	{name}
	{disabled}
	{invalid}
	{required}
	{readOnly}
	{orientation}
	{onValueChange}
	class="flex {orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'}{className
		? ` ${className}`
		: ''}"
>
	{#if label}
		<RadioGroup.Label
			class="text-km-base-content data-[disabled]:text-km-muted-content text-sm font-medium"
		>
			{label}
		</RadioGroup.Label>
	{/if}
	{#each items as item (item.value)}
		<RadioGroup.Item
			value={item.value}
			disabled={item.disabled}
			class="flex cursor-pointer items-center gap-2 select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
		>
			<RadioGroup.ItemControl
				class="border-km-base-300 bg-km-base-100 data-[state=checked]:border-km-primary data-[focus]:border-km-primary data-[focus]:outline-km-primary data-[invalid]:border-km-error flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-150 data-[focus]:outline-2 data-[focus]:-outline-offset-1"
			>
				<span
					class="bg-km-primary h-2.5 w-2.5 rounded-full opacity-0 transition-opacity duration-150 [[data-state=checked]>&]:opacity-100"
				></span>
			</RadioGroup.ItemControl>
			<RadioGroup.ItemText
				class="text-km-base-content data-[disabled]:text-km-muted-content text-sm"
			>
				{item.label}
			</RadioGroup.ItemText>
			<RadioGroup.ItemHiddenInput />
		</RadioGroup.Item>
	{/each}
</RadioGroup.Root>
