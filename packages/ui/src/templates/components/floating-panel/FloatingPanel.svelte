<script lang="ts">
	import { FloatingPanel } from '@ark-ui/svelte/floating-panel';
	import { Portal } from '@ark-ui/svelte/portal';
	import { X, Minus, Maximize2, Minimize2, GripHorizontal } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Initial open state for uncontrolled mode */
		defaultOpen?: boolean;
		/** Panel title */
		title?: string;
		/** Whether the panel is draggable */
		draggable?: boolean;
		/** Whether the panel is resizable */
		resizable?: boolean;
		/** Initial size of the panel */
		defaultSize?: { width: number; height: number };
		/** Minimum size of the panel */
		minSize?: { width: number; height: number };
		/** Maximum size of the panel */
		maxSize?: { width: number; height: number };
		/** Initial position of the panel */
		defaultPosition?: { x: number; y: number };
		/** Close panel on Escape key press */
		closeOnEscape?: boolean;
		/** Preserve panel size and position when closed */
		persistRect?: boolean;
		/** Snap grid for dragging and resizing */
		gridSize?: number;
		/** Disable the panel */
		disabled?: boolean;
		/** Callback when open state changes */
		onOpenChange?: (details: FloatingPanel.OpenChangeDetails) => void;
		/** Callback when position changes via dragging */
		onPositionChange?: (details: FloatingPanel.PositionChangeDetails) => void;
		/** Callback when size changes via resizing */
		onSizeChange?: (details: FloatingPanel.SizeChangeDetails) => void;
		/** Callback when stage changes (minimized/maximized/default) */
		onStageChange?: (details: FloatingPanel.StageChangeDetails) => void;
		/** Trigger button content */
		trigger?: Snippet;
		/** Panel body content */
		children?: Snippet;
		/** Additional CSS classes on the panel content */
		class?: string;
	}

	let {
		open = $bindable(),
		defaultOpen = false,
		title,
		draggable = true,
		resizable = true,
		defaultSize = { width: 320, height: 240 },
		minSize,
		maxSize,
		defaultPosition,
		closeOnEscape = true,
		persistRect = false,
		gridSize = 1,
		disabled = false,
		onOpenChange,
		onPositionChange,
		onSizeChange,
		onStageChange,
		trigger,
		children,
		class: className
	}: Props = $props();
</script>

<FloatingPanel.Root
	bind:open
	{defaultOpen}
	{draggable}
	{resizable}
	{defaultSize}
	{minSize}
	{maxSize}
	{defaultPosition}
	{closeOnEscape}
	{persistRect}
	{gridSize}
	{disabled}
	{onOpenChange}
	{onPositionChange}
	{onSizeChange}
	{onStageChange}
>
	{#if trigger}
		<FloatingPanel.Trigger
			class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content hover:bg-km-base-200 inline-flex cursor-pointer items-center justify-center border px-3 py-2 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
		>
			{@render trigger()}
		</FloatingPanel.Trigger>
	{/if}

	<Portal>
		<FloatingPanel.Positioner class="z-[var(--km-z-modal)]">
			<FloatingPanel.Content
				class="rounded-km-box border-km-base-300 bg-km-base-100 shadow-km-lg flex flex-col overflow-hidden border {className ??
					''}"
			>
				<FloatingPanel.DragTrigger class="cursor-grab active:cursor-grabbing">
					<FloatingPanel.Header
						class="border-km-base-300 bg-km-base-200 flex shrink-0 items-center gap-2 border-b px-3 py-2"
					>
						{#if title}
							<FloatingPanel.Title
								class="text-km-base-content flex-1 text-sm font-medium select-none"
							>
								{title}
							</FloatingPanel.Title>
						{:else}
							<span class="flex-1">
								<GripHorizontal size={14} class="text-km-muted-content" />
							</span>
						{/if}

						<FloatingPanel.Control class="flex shrink-0 items-center gap-0.5">
							<FloatingPanel.StageTrigger
								stage="minimized"
								aria-label="Minimize"
								class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
							>
								<Minus size={14} />
							</FloatingPanel.StageTrigger>
							<FloatingPanel.StageTrigger
								stage="maximized"
								aria-label="Maximize"
								class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
							>
								<Maximize2 size={14} />
							</FloatingPanel.StageTrigger>
							<FloatingPanel.StageTrigger
								stage="default"
								aria-label="Restore"
								class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
							>
								<Minimize2 size={14} />
							</FloatingPanel.StageTrigger>
							<FloatingPanel.CloseTrigger
								aria-label="Close"
								class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
							>
								<X size={14} />
							</FloatingPanel.CloseTrigger>
						</FloatingPanel.Control>
					</FloatingPanel.Header>
				</FloatingPanel.DragTrigger>

				<FloatingPanel.Body class="text-km-base-content flex-1 overflow-auto p-4 text-sm">
					{@render children?.()}
				</FloatingPanel.Body>

				<FloatingPanel.ResizeTrigger
					axis="n"
					class="absolute inset-x-2 top-0 h-1 cursor-n-resize"
				/>
				<FloatingPanel.ResizeTrigger
					axis="s"
					class="absolute inset-x-2 bottom-0 h-1 cursor-s-resize"
				/>
				<FloatingPanel.ResizeTrigger
					axis="e"
					class="absolute inset-y-2 right-0 w-1 cursor-e-resize"
				/>
				<FloatingPanel.ResizeTrigger
					axis="w"
					class="absolute inset-y-2 left-0 w-1 cursor-w-resize"
				/>
				<FloatingPanel.ResizeTrigger
					axis="ne"
					class="absolute top-0 right-0 h-2 w-2 cursor-ne-resize"
				/>
				<FloatingPanel.ResizeTrigger
					axis="nw"
					class="absolute top-0 left-0 h-2 w-2 cursor-nw-resize"
				/>
				<FloatingPanel.ResizeTrigger
					axis="se"
					class="absolute right-0 bottom-0 h-2 w-2 cursor-se-resize"
				/>
				<FloatingPanel.ResizeTrigger
					axis="sw"
					class="absolute bottom-0 left-0 h-2 w-2 cursor-sw-resize"
				/>
			</FloatingPanel.Content>
		</FloatingPanel.Positioner>
	</Portal>
</FloatingPanel.Root>
