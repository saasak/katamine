<script lang="ts">
	import { NumberInput } from '@ark-ui/svelte/number-input';
	import { ChevronUp, ChevronDown } from 'lucide-svelte';

	interface Props {
		/** Display label */
		label?: string;
		/** Controlled value (string). Supports bind:value */
		value?: string;
		/** Initial value for uncontrolled mode */
		defaultValue?: string;
		/** Form field name for native submission */
		name?: string;
		/** Minimum allowed value */
		min?: number;
		/** Maximum allowed value */
		max?: number;
		/** Increment/decrement step */
		step?: number;
		/** Disable the input */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Allow mouse wheel to change value */
		allowMouseWheel?: boolean;
		/** Clamp value to min/max on blur */
		clampValueOnBlur?: boolean;
		/** Intl.NumberFormat options for formatting */
		formatOptions?: Intl.NumberFormatOptions;
		/** Placeholder text */
		placeholder?: string;
		/** Callback when value changes */
		onValueChange?: (details: NumberInput.ValueChangeDetails) => void;
		/** Callback when value is outside min/max range */
		onValueInvalid?: (details: NumberInput.ValueInvalidDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		value = $bindable(),
		defaultValue,
		name,
		min,
		max,
		step = 1,
		disabled = false,
		invalid = false,
		required = false,
		readOnly = false,
		allowMouseWheel = false,
		clampValueOnBlur = true,
		formatOptions,
		placeholder,
		onValueChange,
		onValueInvalid,
		class: className
	}: Props = $props();
</script>

<NumberInput.Root
	bind:value
	{defaultValue}
	{name}
	{min}
	{max}
	{step}
	{disabled}
	{invalid}
	{required}
	{readOnly}
	{allowMouseWheel}
	{clampValueOnBlur}
	{formatOptions}
	{onValueChange}
	{onValueInvalid}
	class="flex flex-col gap-1.5 {className ?? ''}"
>
	{#if label}
		<NumberInput.Label
			class="text-km-base-content data-[disabled]:text-km-muted-content text-sm font-medium"
		>
			{label}
		</NumberInput.Label>
	{/if}

	<NumberInput.Control
		class="rounded-km-field border-km-base-300 bg-km-base-100 data-[focus]:border-km-primary data-[focus]:outline-km-primary data-[invalid]:border-km-error flex border transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus]:outline-2 data-[focus]:-outline-offset-1"
	>
		<NumberInput.Input
			{placeholder}
			class="text-km-base-content placeholder:text-km-muted-content min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
		/>

		<div class="border-km-base-300 flex flex-col border-l">
			<NumberInput.IncrementTrigger
				class="text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex h-1/2 items-center justify-center px-2 transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50"
			>
				<ChevronUp size={14} />
			</NumberInput.IncrementTrigger>

			<div class="border-km-base-300 border-t"></div>

			<NumberInput.DecrementTrigger
				class="text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex h-1/2 items-center justify-center px-2 transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50"
			>
				<ChevronDown size={14} />
			</NumberInput.DecrementTrigger>
		</div>
	</NumberInput.Control>
</NumberInput.Root>
