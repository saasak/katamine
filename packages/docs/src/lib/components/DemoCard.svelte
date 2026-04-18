<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		code,
		children
	}: {
		title: string;
		description?: string;
		code?: string;
		children: Snippet;
	} = $props();

	let showCode = $state(false);
</script>

<div class="rounded-km-box border-km-base-300 border">
	<div class="border-km-base-300 border-b px-4 py-3">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-km-base-content font-semibold">{title}</h3>
				{#if description}
					<p class="text-km-muted-content mt-1 text-sm">{description}</p>
				{/if}
			</div>
			{#if code}
				<button
					onclick={() => (showCode = !showCode)}
					class="rounded-km-field text-km-muted-content hover:bg-km-muted hover:text-km-base-content px-3 py-1.5 text-xs font-medium transition-colors"
				>
					{showCode ? 'Hide code' : 'Show code'}
				</button>
			{/if}
		</div>
	</div>

	<div class="p-4">
		{@render children()}
	</div>

	{#if code && showCode}
		<div class="border-km-base-300 border-t">
			<pre class="bg-km-base-200 overflow-x-auto p-4 font-mono text-sm">{code}</pre>
		</div>
	{/if}
</div>
