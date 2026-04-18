<script lang="ts">
	import { Tabs } from '@ark-ui/svelte/tabs';
	import type { Snippet } from 'svelte';

	interface TabItem {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		items: TabItem[];
		value?: string;
		defaultValue?: string;
		orientation?: 'horizontal' | 'vertical';
		activationMode?: 'manual' | 'automatic';
		loopFocus?: boolean;
		deselectable?: boolean;
		disabled?: boolean;
		onValueChange?: (details: Tabs.ValueChangeDetails) => void;
		onFocusChange?: (details: Tabs.FocusChangeDetails) => void;
		content?: Snippet<[string]>;
		name?: string;
		class?: string;
	}

	let {
		items,
		value = $bindable(),
		defaultValue,
		orientation = 'horizontal',
		activationMode = 'automatic',
		loopFocus = true,
		deselectable = false,
		disabled = false,
		onValueChange,
		onFocusChange,
		content,
		name,
		class: className
	}: Props = $props();
</script>

<Tabs.Root
	bind:value
	{defaultValue}
	{orientation}
	{activationMode}
	{loopFocus}
	{deselectable}
	{onValueChange}
	{onFocusChange}
	class="w-full {className ?? ''}"
>
	<Tabs.List
		class="border-km-base-300 flex border-b {orientation === 'vertical'
			? 'flex-col border-r border-b-0'
			: ''}"
	>
		{#each items as tab (tab.value)}
			<Tabs.Trigger
				value={tab.value}
				disabled={disabled || tab.disabled}
				class="text-km-muted-content hover:text-km-base-content data-[selected]:text-km-primary relative cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
			>
				{tab.label}
			</Tabs.Trigger>
		{/each}
		<Tabs.Indicator
			class="bg-km-primary transition-all duration-150 {orientation === 'vertical'
				? 'right-0 w-0.5'
				: 'bottom-0 h-0.5'}"
		/>
	</Tabs.List>

	{#each items as tab (tab.value)}
		<Tabs.Content value={tab.value} class="pt-4">
			{#if content}
				{@render content(tab.value)}
			{/if}
		</Tabs.Content>
	{/each}

	{#if name}
		<input type="hidden" {name} value={value ?? ''} />
	{/if}
</Tabs.Root>
