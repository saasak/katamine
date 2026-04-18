<script lang="ts">
	interface PropItem {
		name: string;
		type: string;
		default: string;
		description: string;
	}

	let { items }: { items: PropItem[] } = $props();
</script>

<div class="rounded-km-box border-km-base-300 overflow-x-auto border">
	<table class="w-full text-left text-sm">
		<thead>
			<tr class="bg-km-base-200">
				<th class="border-km-base-300 border-b px-4 py-2 font-semibold">Prop</th>
				<th class="border-km-base-300 border-b px-4 py-2 font-semibold">Type</th>
				<th class="border-km-base-300 border-b px-4 py-2 font-semibold">Default</th>
				<th class="border-km-base-300 border-b px-4 py-2 font-semibold">Description</th>
			</tr>
		</thead>
		<tbody>
			{#each items as prop}
				<tr class="border-km-base-300 border-b last:border-b-0">
					<td class="text-km-primary px-4 py-2 font-mono text-sm">{prop.name}</td>
					<td class="px-4 py-2 font-mono text-sm">{prop.type}</td>
					<td class="text-km-muted-content px-4 py-2 font-mono text-sm">{prop.default}</td>
					<td class="px-4 py-2">{prop.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
