<script lang="ts">
	import { QrCode } from '@ark-ui/svelte/qr-code';
	import type { QrCodeGenerateOptions } from '@ark-ui/svelte/qr-code';
	import type { Snippet } from 'svelte';

	interface Props {
		value?: string;
		defaultValue?: string;
		pixelSize?: number;
		encoding?: QrCodeGenerateOptions;
		onValueChange?: (details: { value: string }) => void;
		overlay?: Snippet;
		class?: string;
	}

	let {
		value = $bindable(),
		defaultValue,
		pixelSize = 200,
		encoding,
		onValueChange,
		overlay,
		class: className
	}: Props = $props();
</script>

<QrCode.Root
	bind:value
	{defaultValue}
	{pixelSize}
	{encoding}
	{onValueChange}
	class="rounded-km-box border-km-base-300 bg-km-base-100 shadow-km-sm inline-flex items-center justify-center border p-3 {className ??
		''}"
>
	<QrCode.Frame class="text-km-base-content">
		<QrCode.Pattern />
	</QrCode.Frame>
	{#if overlay}
		<QrCode.Overlay class="rounded-km-selector bg-km-base-100 flex items-center justify-center p-1">
			{@render overlay()}
		</QrCode.Overlay>
	{/if}
</QrCode.Root>
