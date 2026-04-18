<script lang="ts">
	import { Clipboard } from '@ark-ui/svelte/clipboard';
	import { ClipboardCopy, Check } from 'lucide-svelte';

	interface Props {
		value?: string;
		defaultValue?: string;
		timeout?: number;
		label?: string;
		disabled?: boolean;

		// Events
		onValueChange?: (details: { value: string }) => void;
		onStatusChange?: (details: { copied: boolean }) => void;

		class?: string;
	}

	let {
		value = $bindable(),
		defaultValue,
		timeout = 3000,
		label,
		disabled = false,
		onValueChange,
		onStatusChange,
		class: className
	}: Props = $props();
</script>

<Clipboard.Root
	bind:value
	{defaultValue}
	{timeout}
	{onValueChange}
	{onStatusChange}
	class="w-full {className ?? ''}"
>
	{#if label}
		<Clipboard.Label class="text-km-base-content mb-1.5 block text-sm font-medium">
			{label}
		</Clipboard.Label>
	{/if}

	<Clipboard.Control
		class="border-km-base-300 rounded-km-field bg-km-base-100 focus-within:border-km-primary focus-within:outline-km-primary flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1"
	>
		<Clipboard.Input
			{disabled}
			class="text-km-base-content placeholder:text-km-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
		/>
		<Clipboard.Trigger
			{disabled}
			class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center gap-1.5 border-none bg-transparent px-3 py-2 text-sm transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
		>
			<Clipboard.Indicator>
				<ClipboardCopy size={16} />
				{#snippet copied()}
					<Check size={16} class="text-km-primary" />
				{/snippet}
			</Clipboard.Indicator>
		</Clipboard.Trigger>
	</Clipboard.Control>
</Clipboard.Root>
