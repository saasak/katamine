<script lang="ts">
	import { Checkbox } from '@ark-ui/svelte/checkbox';
	import { Check, Minus } from 'lucide-svelte';

	type CheckedState = boolean | 'indeterminate';

	interface Props {
		/** Display label */
		label?: string;
		/** Controlled checked state. Supports bind:checked */
		checked?: CheckedState;
		/** Initial state for uncontrolled mode */
		defaultChecked?: CheckedState;
		/** Form field name for native submission */
		name?: string;
		/** Form submission value when checked */
		value?: string;
		/** Disable the checkbox */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Callback when checked state changes */
		onCheckedChange?: (details: Checkbox.CheckedChangeDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		checked = $bindable(),
		defaultChecked,
		name,
		value = 'on',
		disabled = false,
		invalid = false,
		required = false,
		readOnly = false,
		onCheckedChange,
		class: className
	}: Props = $props();
</script>

<Checkbox.Root
	bind:checked
	{defaultChecked}
	{name}
	{value}
	{disabled}
	{invalid}
	{required}
	{readOnly}
	{onCheckedChange}
	class="inline-flex cursor-pointer items-center gap-2 select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 {className ??
		''}"
>
	<Checkbox.Control
		class="rounded-km-selector border-km-base-300 bg-km-base-100 data-[state=checked]:border-km-primary data-[state=checked]:bg-km-primary data-[state=indeterminate]:border-km-primary data-[state=indeterminate]:bg-km-primary data-[focus]:border-km-primary data-[focus]:outline-km-primary data-[invalid]:border-km-error flex h-5 w-5 items-center justify-center border transition-colors duration-150 data-[focus]:outline-2 data-[focus]:-outline-offset-1"
	>
		<Checkbox.Indicator class="text-km-primary-content">
			<Check size={14} strokeWidth={3} />
		</Checkbox.Indicator>
		<Checkbox.Indicator indeterminate class="text-km-primary-content">
			<Minus size={14} strokeWidth={3} />
		</Checkbox.Indicator>
	</Checkbox.Control>
	{#if label}
		<Checkbox.Label class="text-km-base-content data-[disabled]:text-km-muted-content text-sm">
			{label}
		</Checkbox.Label>
	{/if}
	<Checkbox.HiddenInput />
</Checkbox.Root>
