<script lang="ts">
	import { FloatingPanel } from '$ui/floating-panel';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	let controlledOpen = $state(false);
	let lastPosition = $state('');
	let lastSize = $state('');

	const propsData = [
		{
			name: 'open',
			type: 'boolean',
			default: '—',
			description: 'Controlled open state. Supports bind:open'
		},
		{
			name: 'defaultOpen',
			type: 'boolean',
			default: 'false',
			description: 'Initial open state for uncontrolled mode'
		},
		{
			name: 'title',
			type: 'string',
			default: '—',
			description: 'Panel title displayed in the header'
		},
		{
			name: 'draggable',
			type: 'boolean',
			default: 'true',
			description: 'Whether the panel can be dragged'
		},
		{
			name: 'resizable',
			type: 'boolean',
			default: 'true',
			description: 'Whether the panel can be resized'
		},
		{
			name: 'defaultSize',
			type: '{ width: number; height: number }',
			default: '{ width: 320, height: 240 }',
			description: 'Initial size of the panel'
		},
		{
			name: 'minSize',
			type: '{ width: number; height: number }',
			default: '—',
			description: 'Minimum size constraints'
		},
		{
			name: 'maxSize',
			type: '{ width: number; height: number }',
			default: '—',
			description: 'Maximum size constraints'
		},
		{
			name: 'defaultPosition',
			type: '{ x: number; y: number }',
			default: '—',
			description: 'Initial position of the panel'
		},
		{
			name: 'closeOnEscape',
			type: 'boolean',
			default: 'true',
			description: 'Close the panel when Escape is pressed'
		},
		{
			name: 'persistRect',
			type: 'boolean',
			default: 'false',
			description: 'Preserve panel size and position when closed'
		},
		{
			name: 'gridSize',
			type: 'number',
			default: '1',
			description: 'Snap grid size in pixels for drag and resize'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable all panel interactions'
		},
		{
			name: 'onOpenChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when the panel opens or closes'
		},
		{
			name: 'onPositionChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when the panel is moved via dragging'
		},
		{
			name: 'onSizeChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when the panel is resized'
		},
		{
			name: 'onStageChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when stage changes (minimized/maximized/default)'
		},
		{
			name: 'trigger',
			type: 'Snippet',
			default: '—',
			description: 'Content rendered inside the trigger button'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Content rendered inside the panel body'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the panel content element'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">FloatingPanel</h1>
		<p class="text-km-muted-content mt-2">
			A draggable, resizable floating panel that can be minimized and maximized. Built on Ark UI.
			The panel is portalled to <code class="bg-km-base-200 rounded px-1 font-mono text-xs"
				>&lt;body&gt;</code
			>, so parent overflow or stacking-context CSS does not affect its position or z-index.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A floating panel with a trigger button, drag header, and body content."
			code={`<FloatingPanel title="Notes" defaultOpen={true} defaultPosition={{ x: 40, y: 40 }}>
  {#snippet trigger()}
    Open Panel
  {/snippet}
  {#snippet children()}
    <p>Drag the header to move me around.</p>
  {/snippet}
</FloatingPanel>`}
		>
			<FloatingPanel title="Notes" defaultOpen={true} defaultPosition={{ x: 40, y: 40 }}>
				{#snippet trigger()}
					Open Panel
				{/snippet}
				<p class="text-km-muted-content">
					Drag the header to move me around. Resize from any edge.
				</p>
			</FloatingPanel>
		</DemoCard>

		<DemoCard
			title="Fixed size, not resizable"
			description="Panel with a fixed size and no resize handles."
			code={`<FloatingPanel
  title="Fixed Panel"
  resizable={false}
  defaultSize={{ width: 280, height: 160 }}
  defaultOpen={true}
  defaultPosition={{ x: 40, y: 40 }}
>
  {#snippet trigger()}Toggle{/snippet}
  {#snippet children()}
    <p>This panel cannot be resized.</p>
  {/snippet}
</FloatingPanel>`}
		>
			<FloatingPanel
				title="Fixed Panel"
				resizable={false}
				defaultSize={{ width: 280, height: 160 }}
				defaultOpen={true}
				defaultPosition={{ x: 40, y: 40 }}
			>
				{#snippet trigger()}Toggle{/snippet}
				<p class="text-km-muted-content">This panel cannot be resized.</p>
			</FloatingPanel>
		</DemoCard>

		<DemoCard
			title="Controlled open state"
			description="Manage the open state externally with bind:open."
			code={`<button onclick={() => (open = !open)}>
  {open ? 'Close' : 'Open'} Panel
</button>
<FloatingPanel title="Controlled" bind:open defaultPosition={{ x: 40, y: 40 }}>
  <p>Controlled via external state.</p>
</FloatingPanel>`}
		>
			<div class="space-y-3">
				<button
					onclick={() => (controlledOpen = !controlledOpen)}
					class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content hover:bg-km-base-200 border px-3 py-2 text-sm font-medium transition-colors duration-150"
				>
					{controlledOpen ? 'Close' : 'Open'} Panel
				</button>
				<FloatingPanel
					title="Controlled"
					bind:open={controlledOpen}
					defaultPosition={{ x: 40, y: 40 }}
				>
					<p class="text-km-muted-content">Controlled via external button.</p>
				</FloatingPanel>
			</div>
		</DemoCard>

		<DemoCard
			title="Event callbacks"
			description="Listen to position and size change events."
			code={`<FloatingPanel
  title="Events"
  defaultOpen={true}
  defaultPosition={{ x: 40, y: 40 }}
  onPositionChange={(d) => console.log('position', d.position)}
  onSizeChange={(d) => console.log('size', d.size)}
>
  {#snippet trigger()}Open{/snippet}
  {#snippet children()}
    <p>Move or resize to fire events.</p>
  {/snippet}
</FloatingPanel>`}
		>
			<FloatingPanel
				title="Events"
				defaultOpen={true}
				defaultPosition={{ x: 40, y: 40 }}
				onPositionChange={(d) =>
					(lastPosition = `x: ${Math.round(d.position.x)}, y: ${Math.round(d.position.y)}`)}
				onSizeChange={(d) =>
					(lastSize = `${Math.round(d.size.width)} × ${Math.round(d.size.height)}`)}
			>
				{#snippet trigger()}Open{/snippet}
				<div class="text-km-muted-content space-y-1 text-xs">
					<p>Drag or resize to see events.</p>
					{#if lastPosition}<p>
							Position: <code class="bg-km-base-200 rounded px-1">{lastPosition}</code>
						</p>{/if}
					{#if lastSize}<p>
							Size: <code class="bg-km-base-200 rounded px-1">{lastSize}</code>
						</p>{/if}
				</div>
			</FloatingPanel>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Panel with all interactions disabled."
			code={`<FloatingPanel title="Disabled" disabled={true} defaultOpen={true} defaultPosition={{ x: 40, y: 40 }}>
  {#snippet trigger()}Open{/snippet}
  {#snippet children()}
    <p>Cannot be moved or resized.</p>
  {/snippet}
</FloatingPanel>`}
		>
			<FloatingPanel
				title="Disabled"
				disabled={true}
				defaultOpen={true}
				defaultPosition={{ x: 40, y: 40 }}
			>
				{#snippet trigger()}Open{/snippet}
				<p class="text-km-muted-content">Interactions are disabled.</p>
			</FloatingPanel>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
