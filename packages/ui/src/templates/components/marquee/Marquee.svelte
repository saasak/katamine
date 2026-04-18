<script lang="ts" generics="T">
	import { Marquee, type MarqueePauseStatusDetails } from '@ark-ui/svelte/marquee';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Items to scroll through the marquee */
		items: T[];
		/** Scroll direction */
		side?: 'start' | 'end' | 'top' | 'bottom';
		/** Scroll speed in pixels per second */
		speed?: number;
		/** Delay before animation starts (seconds) */
		delay?: number;
		/** Number of loops (0 = infinite) */
		loopCount?: number;
		/** Gap between items (CSS value) */
		spacing?: string;
		/** Auto-duplicate items to fill container */
		autoFill?: boolean;
		/** Pause scrolling on hover or focus */
		pauseOnInteraction?: boolean;
		/** Reverse the scroll direction */
		reverse?: boolean;
		/** Controlled paused state */
		paused?: boolean;
		/** Initial paused state for uncontrolled mode */
		defaultPaused?: boolean;
		/** Show gradient fade overlays at the leading and trailing edges */
		showEdges?: boolean;
		/** Accessible label describing the scrolling content */
		label?: string;
		/** Disable the marquee */
		disabled?: boolean;
		/** Callback when pause state changes */
		onPauseChange?: (details: MarqueePauseStatusDetails) => void;
		/** Callback on each loop iteration */
		onLoopComplete?: () => void;
		/** Callback when all loops complete (finite loops only) */
		onComplete?: () => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Render snippet for each item — receives item and its index */
		children: Snippet<[T, number]>;
	}

	let {
		items,
		side = 'start',
		speed = 50,
		delay = 0,
		loopCount = 0,
		spacing = '1rem',
		autoFill = false,
		pauseOnInteraction = false,
		reverse = false,
		paused,
		defaultPaused = false,
		showEdges = false,
		label,
		disabled = false,
		onPauseChange,
		onLoopComplete,
		onComplete,
		class: className,
		children: renderItem
	}: Props = $props();

	const isVertical = $derived(side === 'top' || side === 'bottom');
</script>

<div
	class={disabled ? 'pointer-events-none opacity-50' : undefined}
	aria-disabled={disabled || undefined}
>
	<Marquee.Root
		{side}
		{speed}
		{delay}
		{loopCount}
		{spacing}
		{autoFill}
		{pauseOnInteraction}
		{reverse}
		{paused}
		{defaultPaused}
		translations={label ? { root: label } : undefined}
		{onPauseChange}
		{onLoopComplete}
		{onComplete}
		class={className}
	>
		<Marquee.Viewport>
			<Marquee.Content>
				{#each items as item, index (index)}
					<Marquee.Item>
						{@render renderItem(item, index)}
					</Marquee.Item>
				{/each}
			</Marquee.Content>
		</Marquee.Viewport>

		{#if showEdges}
			{#if isVertical}
				<Marquee.Edge side="top" class="from-km-base-100 h-16 bg-gradient-to-b to-transparent" />
				<Marquee.Edge side="bottom" class="from-km-base-100 h-16 bg-gradient-to-t to-transparent" />
			{:else}
				<Marquee.Edge side="start" class="from-km-base-100 w-16 bg-gradient-to-r to-transparent" />
				<Marquee.Edge side="end" class="from-km-base-100 w-16 bg-gradient-to-l to-transparent" />
			{/if}
		{/if}
	</Marquee.Root>
</div>
