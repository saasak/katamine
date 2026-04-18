<script lang="ts">
	import { Editable } from '@ark-ui/svelte/editable';
	import { Pencil, Check, X } from 'lucide-svelte';

	interface Props {
		/** Optional label rendered above the field */
		label?: string;
		/** Controlled value. Supports bind:value */
		value?: string;
		/** Initial value for uncontrolled mode */
		defaultValue?: string;
		/** Placeholder shown when empty */
		placeholder?: string;
		/** Form field name for native submission */
		name?: string;
		/** Disable the field */
		disabled?: boolean;
		/** Prevent editing */
		readOnly?: boolean;
		/** How the user enters edit mode */
		activationMode?: 'focus' | 'dblclick' | 'click' | 'none';
		/** What triggers saving the value */
		submitMode?: 'enter' | 'blur' | 'none' | 'both';
		/** Auto-expand input width with content */
		autoResize?: boolean;
		/** Select all text when entering edit mode */
		selectOnFocus?: boolean;
		/** Maximum character count */
		maxLength?: number;
		/** Mark the field as invalid */
		invalid?: boolean;
		/** Callback when value changes */
		onValueChange?: (details: Editable.ValueChangeDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		value = $bindable(),
		defaultValue,
		placeholder = 'Click to edit',
		name,
		disabled = false,
		readOnly = false,
		invalid = false,
		activationMode = 'focus',
		submitMode = 'both',
		autoResize = false,
		selectOnFocus = true,
		maxLength,
		onValueChange,
		class: className
	}: Props = $props();
</script>

<Editable.Root
	bind:value
	{defaultValue}
	{placeholder}
	{name}
	{disabled}
	{readOnly}
	{invalid}
	{activationMode}
	{submitMode}
	{autoResize}
	{selectOnFocus}
	{maxLength}
	{onValueChange}
	class="inline-flex w-full flex-col gap-1.5 {className ?? ''}"
>
	{#if label}
		<Editable.Label class="text-km-base-content text-sm font-medium">{label}</Editable.Label>
	{/if}

	<div class="flex items-center gap-1.5">
		<Editable.Area class="relative flex min-w-0 flex-1 items-center">
			<Editable.Input
				class="rounded-km-field bg-km-base-100 text-km-base-content placeholder:text-km-muted-content w-full border px-3 py-1.5 text-sm ring-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 {invalid
					? 'border-km-error ring-km-error/20'
					: 'border-km-primary ring-km-primary/20'}"
			/>
			<Editable.Preview
				class="rounded-km-field text-km-base-content hover:bg-km-base-200 data-[placeholder-shown]:text-km-muted-content w-full cursor-text truncate border border-transparent px-3 py-1.5 text-sm transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60 data-[readonly]:cursor-default"
			/>
		</Editable.Area>

		<Editable.Control class="flex shrink-0 items-center gap-0.5">
			<Editable.EditTrigger
				class="rounded-km-selector text-km-muted-content hover:bg-km-base-200 hover:text-km-base-content flex cursor-pointer items-center justify-center p-1.5 transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
			>
				<Pencil size={14} />
			</Editable.EditTrigger>
			<Editable.SubmitTrigger
				class="rounded-km-selector text-km-primary hover:bg-km-base-200 flex cursor-pointer items-center justify-center p-1.5 transition-colors duration-150"
			>
				<Check size={14} />
			</Editable.SubmitTrigger>
			<Editable.CancelTrigger
				class="rounded-km-selector text-km-muted-content hover:bg-km-base-200 hover:text-km-base-content flex cursor-pointer items-center justify-center p-1.5 transition-colors duration-150"
			>
				<X size={14} />
			</Editable.CancelTrigger>
		</Editable.Control>
	</div>
</Editable.Root>
