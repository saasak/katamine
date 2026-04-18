<script lang="ts">
	import { Drawer } from '@ark-ui/svelte/drawer';
	import { Portal } from '@ark-ui/svelte/portal';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type Direction = 'left' | 'right' | 'top' | 'bottom';
	type SwipeDirection = 'left' | 'right' | 'up' | 'down';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Initial open state for uncontrolled mode */
		defaultOpen?: boolean;
		/** Drawer heading */
		title?: string;
		/** Drawer description text */
		description?: string;
		/** Side the drawer slides in from */
		direction?: Direction;
		/** Snap points as fractions (0–1) or pixel strings */
		snapPoints?: (number | string)[];
		/** Initial snap point when the drawer opens */
		defaultSnapPoint?: number | string;
		/** Callback when the active snap point changes */
		onSnapPointChange?: (details: { snapPoint: number | string | null }) => void;
		/** Force sequential snapping between snap points */
		snapToSequentialPoints?: boolean;
		/** Whether the drawer blocks outside interaction */
		modal?: boolean;
		/** Close on Escape key press */
		closeOnEscape?: boolean;
		/** Close when clicking outside */
		closeOnInteractOutside?: boolean;
		/** Prevent background scrolling when open */
		preventScroll?: boolean;
		/** Semantic role */
		role?: 'dialog' | 'alertdialog';
		/** Disable the trigger */
		disabled?: boolean;
		/** Callback when open state changes */
		onOpenChange?: (details: { open: boolean }) => void;
		/** Trigger button content */
		trigger?: Snippet;
		/** Footer content (e.g. action buttons) */
		footer?: Snippet;
		/** Drawer body content */
		children?: Snippet;
		/** Additional CSS classes on the content panel */
		class?: string;
	}

	let {
		open = $bindable(),
		defaultOpen = false,
		title,
		description,
		direction = 'bottom',
		snapPoints,
		defaultSnapPoint,
		onSnapPointChange,
		snapToSequentialPoints,
		modal = true,
		closeOnEscape = true,
		closeOnInteractOutside = true,
		preventScroll = true,
		role = 'dialog',
		disabled = false,
		onOpenChange,
		trigger,
		footer,
		children,
		class: className
	}: Props = $props();

	const swipeDirectionMap: Record<Direction, SwipeDirection> = {
		bottom: 'down',
		top: 'up',
		left: 'left',
		right: 'right'
	};

	let swipeDirection = $derived(swipeDirectionMap[direction]);
	let isVertical = $derived(direction === 'bottom' || direction === 'top');
	let showGrabber = $derived(isVertical);

	let positionerClass = $derived(
		{
			bottom: 'fixed inset-x-0 bottom-0 max-h-dvh',
			top: 'fixed inset-x-0 top-0 max-h-dvh',
			left: 'fixed inset-y-0 left-0 max-w-dvw',
			right: 'fixed inset-y-0 right-0 max-w-dvw'
		}[direction]
	);

	let contentClass = $derived(
		{
			bottom: 'w-full max-h-[85dvh] rounded-t-2xl border-t border-x',
			top: 'w-full max-h-[85dvh] rounded-b-2xl border-b border-x',
			left: 'h-full w-full max-w-sm rounded-r-2xl border-r border-y',
			right: 'h-full w-full max-w-sm rounded-l-2xl border-l border-y'
		}[direction]
	);

	let hasSnapPoints = $derived(snapPoints != null && snapPoints.length > 0);
</script>

<Drawer.Root
	bind:open
	{defaultOpen}
	{modal}
	{closeOnEscape}
	{closeOnInteractOutside}
	{preventScroll}
	{role}
	{onOpenChange}
	{swipeDirection}
	{snapPoints}
	{defaultSnapPoint}
	{onSnapPointChange}
	{snapToSequentialPoints}
>
	{#if trigger}
		<Drawer.Trigger {disabled}>
			{#snippet asChild(props)}
				<span {...props()} class="inline-flex">
					{@render trigger()}
				</span>
			{/snippet}
		</Drawer.Trigger>
	{/if}

	<Portal>
		<Drawer.Backdrop
			class="data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out fixed inset-0 z-[var(--km-z-overlay)] bg-black/50 backdrop-blur-sm"
		/>
		<Drawer.Positioner class="{positionerClass} z-[var(--km-z-modal)]">
			<Drawer.Content
				class="{contentClass} border-km-base-300 bg-km-base-100 shadow-km-lg relative {hasSnapPoints
					? ''
					: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out'} {className ??
					''}"
			>
				{#if showGrabber}
					<Drawer.Grabber class="flex justify-center pt-3 pb-1">
						<Drawer.GrabberIndicator class="bg-km-base-300 h-1.5 w-12 rounded-full" />
					</Drawer.Grabber>
				{/if}

				<Drawer.CloseTrigger
					class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content absolute top-4 right-4 z-10 flex items-center justify-center p-1 transition-colors duration-150"
				>
					<X size={16} />
				</Drawer.CloseTrigger>

				<div
					class="overflow-y-auto {isVertical
						? 'px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]'
						: 'h-full p-6'}"
				>
					{#if title}
						<Drawer.Title class="text-km-base-content pr-8 text-lg font-semibold">
							{title}
						</Drawer.Title>
					{/if}

					{#if description}
						<p class="text-km-muted-content mt-1 text-sm">
							{description}
						</p>
					{/if}

					{#if children}
						<div class="mt-4">
							{@render children()}
						</div>
					{/if}

					{#if footer}
						<div class="mt-6 flex items-center justify-end gap-2">
							{@render footer()}
						</div>
					{/if}
				</div>
			</Drawer.Content>
		</Drawer.Positioner>
	</Portal>
</Drawer.Root>
