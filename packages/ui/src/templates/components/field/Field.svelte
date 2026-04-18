<script lang="ts">
	import { Field } from '@ark-ui/svelte/field';

	interface Props {
		/** Label text displayed above the input */
		label?: string;
		/** Helper text displayed below the input */
		helperText?: string;
		/** Error text displayed when invalid */
		errorText?: string;
		/** Render a textarea instead of an input */
		textarea?: boolean;
		/** Input type (text, email, password, etc.) — ignored when textarea is true */
		type?: string;
		/** Placeholder text */
		placeholder?: string;
		/** Form field name for native submission */
		name?: string;
		/** Controlled value. Supports bind:value */
		value?: string;
		/** Mark as required */
		required?: boolean;
		/** Disable the field */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Number of rows for textarea — ignored when textarea is false */
		rows?: number;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		helperText,
		errorText,
		textarea = false,
		type = 'text',
		placeholder,
		name,
		value = $bindable(),
		required = false,
		disabled = false,
		invalid = false,
		readOnly = false,
		rows = 3,
		class: className
	}: Props = $props();
</script>

<Field.Root
	{required}
	{disabled}
	{invalid}
	{readOnly}
	class="flex flex-col gap-1.5 {className ?? ''}"
>
	{#if label}
		<Field.Label
			class="text-km-base-content data-[disabled]:text-km-muted-content text-sm font-medium"
		>
			{label}
			{#if required}
				<Field.RequiredIndicator class="text-km-error">*</Field.RequiredIndicator>
			{/if}
		</Field.Label>
	{/if}

	{#if textarea}
		<Field.Textarea
			bind:value
			{name}
			{placeholder}
			{rows}
			class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content placeholder:text-km-muted-content focus:border-km-primary focus:ring-km-primary data-[invalid]:border-km-error data-[invalid]:focus:ring-km-error resize-y border px-3 py-2 text-sm transition-colors duration-150 outline-none focus:ring-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
		/>
	{:else}
		<Field.Input
			bind:value
			{name}
			{placeholder}
			{type}
			class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content placeholder:text-km-muted-content focus:border-km-primary focus:ring-km-primary data-[invalid]:border-km-error data-[invalid]:focus:ring-km-error h-10 border px-3 text-sm transition-colors duration-150 outline-none focus:ring-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
		/>
	{/if}

	{#if helperText && !invalid}
		<Field.HelperText class="text-km-muted-content text-xs">
			{helperText}
		</Field.HelperText>
	{/if}

	{#if errorText && invalid}
		<Field.ErrorText class="text-km-error text-xs">
			{errorText}
		</Field.ErrorText>
	{/if}
</Field.Root>
