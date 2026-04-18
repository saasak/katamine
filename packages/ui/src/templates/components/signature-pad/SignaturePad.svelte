<script lang="ts">
	import {
		SignaturePad,
		type SignaturePadDrawDetails,
		type SignaturePadDrawEndDetails,
		type SignaturePadDrawingOptions
	} from '@ark-ui/svelte/signature-pad';
	import { Eraser } from 'lucide-svelte';

	interface Props {
		/** Controlled paths (drawn strokes). Supports bind:paths */
		paths?: string[];
		/** Initial paths for uncontrolled mode */
		defaultPaths?: string[];
		/** Label text displayed above the pad */
		label?: string;
		/** Form field name for native submission */
		name?: string;
		/** Whether the signature pad is disabled */
		disabled?: boolean;
		/** Whether the signature pad is required */
		required?: boolean;
		/** Whether the signature pad is read-only */
		readOnly?: boolean;
		/** Drawing options (stroke size, color, pressure simulation) */
		drawing?: SignaturePadDrawingOptions;
		/** Callback fired while drawing */
		onDraw?: (details: SignaturePadDrawDetails) => void;
		/** Callback fired when a stroke ends (includes getDataUrl) */
		onDrawEnd?: (details: SignaturePadDrawEndDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		paths = $bindable(),
		defaultPaths,
		label = 'Signature',
		name,
		disabled = false,
		required = false,
		readOnly = false,
		drawing,
		onDraw,
		onDrawEnd,
		class: className
	}: Props = $props();
</script>

<SignaturePad.Root
	{disabled}
	{required}
	{readOnly}
	{name}
	{drawing}
	bind:paths
	{defaultPaths}
	{onDraw}
	{onDrawEnd}
	class="flex w-full flex-col gap-1.5 {className ?? ''}"
>
	<SignaturePad.Label class="text-km-base-content text-sm font-medium">
		{label}
	</SignaturePad.Label>

	<SignaturePad.Control
		class="rounded-km-box border-km-base-300 bg-km-base-100 data-[focus]:outline-km-primary relative h-52 border transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus]:outline-2 data-[focus]:outline-offset-2"
	>
		<SignaturePad.Segment class="h-full w-full" />
		<SignaturePad.Guide class="border-km-base-300 border-b border-dashed" />
	</SignaturePad.Control>

	{#if !readOnly}
		<SignaturePad.ClearTrigger
			class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-muted-content hover:bg-km-muted hover:text-km-base-content inline-flex w-fit cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-sm transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<Eraser size={14} />
			Clear
		</SignaturePad.ClearTrigger>
	{/if}

	{#if name}
		<SignaturePad.HiddenInput />
	{/if}
</SignaturePad.Root>
