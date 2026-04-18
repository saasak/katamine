<script lang="ts">
	import { Popover } from '@ark-ui/svelte/popover';
	import { Portal } from '@ark-ui/svelte/portal';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Initial open state for uncontrolled mode */
		defaultOpen?: boolean;
		/** Popover heading */
		title?: string;
		/** Popover description text */
		description?: string;
		/** Whether clicking outside closes the popover */
		closeOnInteractOutside?: boolean;
		/** Close on Escape key press */
		closeOnEscape?: boolean;
		/** Whether the popover is modal (traps focus) */
		modal?: boolean;
		/** Auto-focus the first focusable element when opened */
		autoFocus?: boolean;
		/** Popper.js positioning options (placement, offset, etc.) */
		positioning?: import('@zag-js/popper').PositioningOptions;
		/** Callback when open state changes */
		onOpenChange?: (details: Popover.OpenChangeDetails) => void;
		/** Trigger content */
		trigger?: Snippet;
		/** Popover body content */
		children?: Snippet;
		/** Additional CSS classes on the content panel */
		class?: string;
	}

	let {
		open = $bindable(),
		defaultOpen = false,
		title,
		description,
		closeOnInteractOutside = true,
		closeOnEscape = true,
		modal = false,
		autoFocus = true,
		positioning,
		onOpenChange,
		trigger,
		children,
		class: className
	}: Props = $props();
</script>

<Popover.Root
	bind:open
	{defaultOpen}
	{closeOnInteractOutside}
	{closeOnEscape}
	{modal}
	{autoFocus}
	{positioning}
	{onOpenChange}
>
	{#if trigger}
		<Popover.Trigger>
			{#snippet asChild(propsFn)}
				<span {...propsFn()} class="inline-flex">
					{@render trigger()}
				</span>
			{/snippet}
		</Popover.Trigger>
	{/if}

	<Portal>
		<Popover.Positioner class="z-[var(--km-z-popover)]">
			<Popover.Content
				class="rounded-km-box border-km-base-300 bg-km-base-100 shadow-km-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 w-72 border p-4 {className ??
					''}"
			>
				<Popover.Arrow>
					<Popover.ArrowTip class="border-km-base-300" />
				</Popover.Arrow>

				<div class="flex items-start justify-between gap-2">
					<div>
						{#if title}
							<Popover.Title class="text-km-base-content text-sm font-semibold">
								{title}
							</Popover.Title>
						{/if}

						{#if description}
							<Popover.Description class="text-km-muted-content mt-1 text-sm">
								{description}
							</Popover.Description>
						{/if}
					</div>

					<Popover.CloseTrigger
						class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex shrink-0 items-center justify-center p-1 transition-colors duration-150"
					>
						<X size={14} />
					</Popover.CloseTrigger>
				</div>

				{#if children}
					<div class="mt-3">
						{@render children()}
					</div>
				{/if}
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover.Root>
