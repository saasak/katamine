<script lang="ts">
	import { Tooltip } from '@ark-ui/svelte/tooltip';
	import { Portal } from '@ark-ui/svelte/portal';
	import type { Snippet } from 'svelte';

	interface Props {
		content: string;
		open?: boolean;
		defaultOpen?: boolean;
		openDelay?: number;
		closeDelay?: number;
		interactive?: boolean;
		disabled?: boolean;
		closeOnPointerDown?: boolean;
		closeOnEscape?: boolean;
		closeOnScroll?: boolean;
		positioning?: import('@zag-js/popper').PositioningOptions;
		onOpenChange?: (details: Tooltip.OpenChangeDetails) => void;
		children: Snippet;
		class?: string;
	}

	let {
		content,
		open = $bindable(),
		defaultOpen,
		openDelay = 400,
		closeDelay = 150,
		interactive = false,
		disabled = false,
		closeOnPointerDown = true,
		closeOnEscape = true,
		closeOnScroll = true,
		positioning,
		onOpenChange,
		children,
		class: className
	}: Props = $props();
</script>

<Tooltip.Root
	bind:open
	{defaultOpen}
	{openDelay}
	{closeDelay}
	{interactive}
	{disabled}
	{closeOnPointerDown}
	{closeOnEscape}
	{closeOnScroll}
	{positioning}
	{onOpenChange}
>
	<Tooltip.Trigger>
		{#snippet child(triggerProps)}
			<span {...triggerProps} class="inline-flex">
				{@render children()}
			</span>
		{/snippet}
	</Tooltip.Trigger>

	<Portal>
		<Tooltip.Positioner class="z-[var(--km-z-tooltip)]">
			<Tooltip.Content
				class="rounded-km-box bg-km-base-content text-km-base-100 shadow-km-sm px-3 py-1.5 text-xs {className ??
					''}"
			>
				<Tooltip.Arrow>
					<Tooltip.ArrowTip class="border-km-base-content" />
				</Tooltip.Arrow>
				{content}
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip.Root>
