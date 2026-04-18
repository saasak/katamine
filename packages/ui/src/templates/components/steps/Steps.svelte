<script lang="ts">
	import { Steps, type StepsStepChangeDetails } from '@ark-ui/svelte/steps';
	import { Check, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface StepDefinition {
		label: string;
		description?: string;
	}

	interface Props {
		items: StepDefinition[];
		step?: number;
		defaultStep?: number;
		linear?: boolean;
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		class?: string;

		onStepChange?: (details: StepsStepChangeDetails) => void;
		onStepComplete?: () => void;

		content?: Snippet<[number]>;
		completed?: Snippet;
	}

	let {
		items,
		step = $bindable(0),
		defaultStep,
		linear = false,
		orientation = 'horizontal',
		disabled = false,
		class: className,
		onStepChange,
		onStepComplete,
		content,
		completed
	}: Props = $props();
</script>

<Steps.Root
	count={items.length}
	bind:step
	{defaultStep}
	{linear}
	{orientation}
	{onStepChange}
	{onStepComplete}
	class="flex flex-col gap-4 {className ?? ''}"
>
	<Steps.List
		class="flex items-center gap-0 {orientation === 'vertical' ? 'flex-col items-stretch' : ''}"
	>
		{#each items as item, i}
			<Steps.Item index={i} class="flex items-center gap-2 {i < items.length - 1 ? 'flex-1' : ''}">
				<Steps.Trigger
					{disabled}
					class="rounded-km-field text-km-muted-content data-[current]:text-km-primary data-[complete]:text-km-primary hover:text-km-base-content flex items-center gap-2 px-2 py-1.5
            text-sm
            font-medium
            transition-colors
            duration-150
            disabled:pointer-events-none disabled:opacity-50"
				>
					<Steps.Indicator
						class="border-km-base-300 bg-km-base-100 text-km-muted-content data-[current]:border-km-primary data-[current]:bg-km-primary data-[current]:text-km-primary-content data-[complete]:border-km-primary data-[complete]:bg-km-primary data-[complete]:text-km-primary-content flex h-8 w-8
              shrink-0 items-center justify-center
              rounded-full border-2 text-xs
              font-semibold transition-colors duration-150"
					>
						<Steps.ItemContext>
							{#snippet render(context)}
								{#if context.completed}
									<Check size={14} />
								{:else}
									{i + 1}
								{/if}
							{/snippet}
						</Steps.ItemContext>
					</Steps.Indicator>
					<span class="hidden sm:inline">
						{item.label}
						{#if item.description}
							<span class="text-km-muted-content block text-xs font-normal">{item.description}</span
							>
						{/if}
					</span>
				</Steps.Trigger>
				{#if i < items.length - 1}
					<Steps.Separator
						class="bg-km-base-300 data-[complete]:bg-km-primary mx-1 h-0.5 flex-1 rounded transition-colors
              duration-150"
					/>
				{/if}
			</Steps.Item>
		{/each}
	</Steps.List>

	{#each items as _, i}
		<Steps.Content index={i} class="rounded-km-box border-km-base-300 bg-km-base-100 border p-4">
			{#if content}
				{@render content(i)}
			{/if}
		</Steps.Content>
	{/each}

	<Steps.CompletedContent class="rounded-km-box border-km-base-300 bg-km-base-100 border p-4">
		{#if completed}
			{@render completed()}
		{:else}
			<div class="text-km-base-content flex items-center gap-2 text-sm">
				<Check size={16} class="text-km-primary" />
				All steps completed!
			</div>
		{/if}
	</Steps.CompletedContent>

	<div class="flex items-center justify-between">
		<Steps.PrevTrigger
			{disabled}
			class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content hover:bg-km-base-200 inline-flex items-center gap-1.5 border px-3 py-2 text-sm font-medium transition-colors
        duration-150
        disabled:pointer-events-none disabled:opacity-50"
		>
			<ChevronLeft size={16} />
			Previous
		</Steps.PrevTrigger>
		<Steps.NextTrigger
			{disabled}
			class="rounded-km-field bg-km-primary text-km-primary-content inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-150
        hover:opacity-90
        disabled:pointer-events-none disabled:opacity-50"
		>
			Next
			<ChevronRight size={16} />
		</Steps.NextTrigger>
	</div>
</Steps.Root>
