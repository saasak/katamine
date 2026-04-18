<script lang="ts">
	import { Toast, createToaster } from '$ui/toast';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const toaster = createToaster({ placement: 'bottom-end', overlap: true });

	const propsData = [
		{
			name: 'toaster',
			type: 'CreateToasterReturn',
			default: '—',
			description: 'Toaster instance created with createToaster()'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the toaster container'
		}
	];

	const createToasterPropsData = [
		{
			name: 'placement',
			type: 'Placement',
			default: '"bottom"',
			description: 'Where toasts appear: top, top-start, top-end, bottom, bottom-start, bottom-end'
		},
		{ name: 'max', type: 'number', default: '24', description: 'Maximum number of visible toasts' },
		{
			name: 'overlap',
			type: 'boolean',
			default: 'false',
			description: 'Stack toasts in an overlapping pile'
		},
		{
			name: 'duration',
			type: 'number',
			default: '5000',
			description: 'Default duration in ms before auto-dismiss'
		},
		{ name: 'gap', type: 'number', default: '16', description: 'Gap in px between toasts' },
		{
			name: 'removeDelay',
			type: 'number',
			default: '200',
			description: 'Delay in ms before removing dismissed toasts (for exit animations)'
		},
		{
			name: 'pauseOnPageIdle',
			type: 'boolean',
			default: 'false',
			description: 'Pause toast timers when the browser tab is inactive'
		}
	];

	const toastOptionsData = [
		{ name: 'title', type: 'string', default: '—', description: 'Toast title text' },
		{ name: 'description', type: 'string', default: '—', description: 'Toast description text' },
		{
			name: 'type',
			type: '"info" | "success" | "error" | "loading"',
			default: '"info"',
			description: 'Toast type — determines the icon and color'
		},
		{
			name: 'duration',
			type: 'number',
			default: '5000',
			description: 'Override default duration for this toast'
		},
		{ name: 'closable', type: 'boolean', default: 'true', description: 'Show the close button' },
		{
			name: 'action',
			type: '{ label: string; onClick: () => void }',
			default: '—',
			description: 'Action button with label and click handler'
		},
		{
			name: 'onStatusChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when toast status changes (visible, dismissing, unmounted)'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Toast</h1>
		<p class="text-km-muted-content mt-2">
			Non-intrusive notification toasts. Create an imperative toaster instance, place the container
			in your layout, and call toaster.create() to show toasts. Built on Ark UI.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Show a simple info toast with title and description."
			code={`const toaster = createToaster({ placement: "bottom-end" });

<Toast {toaster} />

<button onclick={() => toaster.create({
  title: "Hello",
  description: "This is a toast notification.",
})}>
  Show toast
</button>`}
		>
			<button
				class="rounded-km-field bg-km-primary text-km-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
				onclick={() =>
					toaster.create({ title: 'Hello', description: 'This is a toast notification.' })}
			>
				Show toast
			</button>
		</DemoCard>

		<DemoCard
			title="Toast types"
			description="Different types display different icons: info, success, error, and loading."
			code={`toaster.create({ title: "Success", type: "success" });
toaster.create({ title: "Error", type: "error" });
toaster.create({ title: "Loading", type: "loading" });`}
		>
			<div class="flex flex-wrap gap-2">
				<button
					class="rounded-km-field border-km-base-300 bg-km-base-100 border px-4 py-2 text-sm"
					onclick={() =>
						toaster.create({ title: 'Info', description: 'Informational message.', type: 'info' })}
				>
					Info
				</button>
				<button
					class="rounded-km-field border-km-base-300 bg-km-base-100 border px-4 py-2 text-sm"
					onclick={() =>
						toaster.create({
							title: 'Success!',
							description: 'Operation completed.',
							type: 'success'
						})}
				>
					Success
				</button>
				<button
					class="rounded-km-field border-km-base-300 bg-km-base-100 border px-4 py-2 text-sm"
					onclick={() =>
						toaster.create({ title: 'Error', description: 'Something went wrong.', type: 'error' })}
				>
					Error
				</button>
				<button
					class="rounded-km-field border-km-base-300 bg-km-base-100 border px-4 py-2 text-sm"
					onclick={() =>
						toaster.create({ title: 'Loading...', description: 'Please wait.', type: 'loading' })}
				>
					Loading
				</button>
			</div>
		</DemoCard>

		<DemoCard
			title="With action"
			description="Add an action button to the toast for user interaction."
			code={`toaster.create({
  title: "File deleted",
  description: "document.pdf was removed.",
  action: { label: "Undo", onClick: () => console.log("Undo!") },
});`}
		>
			<button
				class="rounded-km-field border-km-base-300 bg-km-base-100 border px-4 py-2 text-sm"
				onclick={() =>
					toaster.create({
						title: 'File deleted',
						description: 'document.pdf was removed.',
						type: 'info',
						action: {
							label: 'Undo',
							onClick: () => toaster.create({ title: 'Restored!', type: 'success' })
						}
					})}
			>
				Delete with undo
			</button>
		</DemoCard>

		<DemoCard
			title="Custom duration"
			description="Control how long each toast stays visible."
			code={`toaster.create({
  title: "Quick flash",
  duration: 1500,
});`}
		>
			<div class="flex gap-2">
				<button
					class="rounded-km-field border-km-base-300 bg-km-base-100 border px-4 py-2 text-sm"
					onclick={() =>
						toaster.create({ title: 'Quick flash', description: 'Gone in 1.5s.', duration: 1500 })}
				>
					1.5s toast
				</button>
				<button
					class="rounded-km-field border-km-base-300 bg-km-base-100 border px-4 py-2 text-sm"
					onclick={() =>
						toaster.create({ title: 'Long toast', description: 'Stays for 10s.', duration: 10000 })}
				>
					10s toast
				</button>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Toast Component Props</h2>
		<PropsTable items={propsData} />
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">createToaster Options</h2>
		<PropsTable items={createToasterPropsData} />
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">toaster.create() Options</h2>
		<PropsTable items={toastOptionsData} />
	</section>
</div>

<Toast {toaster} />
