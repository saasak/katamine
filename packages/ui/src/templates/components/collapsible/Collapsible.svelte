<script lang="ts">
	import { Collapsible } from '@ark-ui/svelte/collapsible';
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** The trigger label text */
		label: string;
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Initial open state for uncontrolled mode */
		defaultOpen?: boolean;
		/** Whether the collapsible is disabled */
		disabled?: boolean;
		/** Callback when open state changes */
		onOpenChange?: (details: Collapsible.OpenChangeDetails) => void;
		/** Lazy mount the content (only render when first opened) */
		lazyMount?: boolean;
		/** Unmount content DOM when collapsed */
		unmountOnExit?: boolean;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Trigger snippet for custom trigger content */
		trigger?: Snippet;
		/** Content to display when expanded */
		children: Snippet;
	}

	let {
		label,
		open = $bindable(),
		defaultOpen,
		disabled = false,
		onOpenChange,
		lazyMount = false,
		unmountOnExit = false,
		class: className,
		trigger,
		children
	}: Props = $props();
</script>

<Collapsible.Root
	bind:open
	{defaultOpen}
	{disabled}
	{onOpenChange}
	{lazyMount}
	{unmountOnExit}
	class="rounded-km-box border-km-base-300 bg-km-base-100 w-full border {className ?? ''}"
>
	<Collapsible.Trigger
		class="text-km-base-content hover:bg-km-base-200 flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-4 py-3 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
	>
		{#if trigger}
			{@render trigger()}
		{:else}
			<span>{label}</span>
		{/if}
		<Collapsible.Indicator
			class="text-km-muted-content transition-transform duration-150 data-[state=open]:rotate-180"
		>
			<ChevronDown size={16} />
		</Collapsible.Indicator>
	</Collapsible.Trigger>
	<Collapsible.Content class="overflow-hidden">
		<div class="border-km-base-300 text-km-base-content border-t px-4 py-3 text-sm">
			{@render children()}
		</div>
	</Collapsible.Content>
</Collapsible.Root>
