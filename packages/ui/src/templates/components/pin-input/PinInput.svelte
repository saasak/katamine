<script lang="ts">
	import { PinInput } from '@ark-ui/svelte/pin-input';

	interface Props {
		/** Label text displayed above the input */
		label?: string;
		/** Number of input fields */
		count?: number;
		/** Controlled value as an array of strings. Supports bind:value */
		value?: string[];
		/** Initial value for uncontrolled mode */
		defaultValue?: string[];
		/** Form field name for native submission */
		name?: string;
		/** Placeholder character for each input */
		placeholder?: string;
		/** Allowed input type */
		type?: 'alphanumeric' | 'numeric' | 'alphabetic';
		/** Mask input like a password field */
		mask?: boolean;
		/** Enable one-time-code autocomplete */
		otp?: boolean;
		/** Auto-focus the first input on mount */
		autoFocus?: boolean;
		/** Blur inputs when all fields are filled */
		blurOnComplete?: boolean;
		/** Select input value on focus */
		selectOnFocus?: boolean;
		/** Disable all inputs */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Regex pattern to validate input */
		pattern?: string;
		/** Callback when value changes */
		onValueChange?: (details: PinInput.ValueChangeDetails) => void;
		/** Callback when all inputs are filled */
		onValueComplete?: (details: PinInput.ValueChangeDetails) => void;
		/** Callback when an invalid value is entered */
		onValueInvalid?: (details: PinInput.ValueInvalidDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		count = 4,
		value = $bindable(),
		defaultValue,
		name,
		placeholder = '○',
		type = 'numeric',
		mask = false,
		otp = true,
		autoFocus = false,
		blurOnComplete = false,
		selectOnFocus = true,
		disabled = false,
		invalid = false,
		required = false,
		readOnly = false,
		pattern,
		onValueChange,
		onValueComplete,
		onValueInvalid,
		class: className
	}: Props = $props();
</script>

<PinInput.Root
	bind:value
	{defaultValue}
	{count}
	{name}
	{placeholder}
	{type}
	{mask}
	{otp}
	{autoFocus}
	{blurOnComplete}
	{selectOnFocus}
	{disabled}
	{invalid}
	{required}
	{readOnly}
	{pattern}
	{onValueChange}
	{onValueComplete}
	{onValueInvalid}
	class="flex flex-col gap-1.5 {className ?? ''}"
>
	{#if label}
		<PinInput.Label
			class="text-km-base-content data-[disabled]:text-km-muted-content text-sm font-medium"
		>
			{label}
		</PinInput.Label>
	{/if}

	<PinInput.Control class="flex gap-2">
		{#each Array.from({ length: count }) as _, index}
			<PinInput.Input
				{index}
				class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content placeholder:text-km-muted-content focus:border-km-primary focus:outline-km-primary data-[invalid]:border-km-error data-[invalid]:focus:outline-km-error h-11 w-11 border text-center text-base font-medium transition-colors duration-150 outline-none focus:outline-2 focus:-outline-offset-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
			/>
		{/each}
	</PinInput.Control>

	<PinInput.HiddenInput />
</PinInput.Root>
