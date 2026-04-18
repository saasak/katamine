<script lang="ts">
	import { Pagination } from '@ark-ui/svelte/pagination';
	import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-svelte';

	interface Props {
		/** Total number of data items */
		count: number;
		/** Controlled current page. Supports bind:page */
		page?: number;
		/** Initial page for uncontrolled mode */
		defaultPage?: number;
		/** Controlled items per page. Supports bind:pageSize */
		pageSize?: number;
		/** Initial page size for uncontrolled mode */
		defaultPageSize?: number;
		/** Number of pages shown beside the active page */
		siblingCount?: number;
		/** Whether the pagination triggers render as links */
		type?: 'button' | 'link';
		/** Href generator when type is "link" */
		getPageUrl?: (details: { page: number }) => string;
		/** Callback when the current page changes */
		onPageChange?: (details: Pagination.PageChangeDetails) => void;
		/** Callback when the page size changes */
		onPageSizeChange?: (details: Pagination.PageSizeChangeDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		count,
		page = $bindable(),
		defaultPage,
		pageSize = $bindable(),
		defaultPageSize = 10,
		siblingCount = 1,
		type = 'button',
		getPageUrl,
		onPageChange,
		onPageSizeChange,
		class: className
	}: Props = $props();
</script>

<Pagination.Root
	{count}
	bind:page
	{defaultPage}
	bind:pageSize
	{defaultPageSize}
	{siblingCount}
	{type}
	{getPageUrl}
	{onPageChange}
	{onPageSizeChange}
	class="flex items-center gap-1 {className ?? ''}"
>
	<Pagination.PrevTrigger
		class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content hover:bg-km-base-200 inline-flex h-9 w-9 cursor-pointer items-center justify-center border transition-colors duration-[var(--km-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
	>
		<ChevronLeft size={16} />
	</Pagination.PrevTrigger>

	<Pagination.Context>
		{#snippet render(context)}
			{#each context.pages as p}
				{#if p.type === 'page'}
					<Pagination.Item
						{type}
						value={p.value}
						class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content hover:bg-km-base-200 data-[selected]:border-km-primary data-[selected]:bg-km-primary data-[selected]:text-km-primary-content inline-flex h-9 w-9 cursor-pointer items-center justify-center border text-sm font-medium transition-colors duration-[var(--km-transition-fast)]"
					>
						{p.value}
					</Pagination.Item>
				{:else}
					<Pagination.Ellipsis
						index={context.pages.indexOf(p)}
						class="text-km-muted-content inline-flex h-9 w-9 items-center justify-center"
					>
						<Ellipsis size={16} />
					</Pagination.Ellipsis>
				{/if}
			{/each}
		{/snippet}
	</Pagination.Context>

	<Pagination.NextTrigger
		class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content hover:bg-km-base-200 inline-flex h-9 w-9 cursor-pointer items-center justify-center border transition-colors duration-[var(--km-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
	>
		<ChevronRight size={16} />
	</Pagination.NextTrigger>
</Pagination.Root>
