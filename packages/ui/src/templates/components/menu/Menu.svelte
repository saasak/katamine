<script lang="ts">
	import { Menu } from '@ark-ui/svelte/menu';
	import { Portal } from '@ark-ui/svelte/portal';
	import type { Snippet } from 'svelte';

	type MenuItemDef = {
		label: string;
		value: string;
		disabled?: boolean;
	};

	type MenuSeparator = { type: 'separator' };

	type MenuGroupDef = {
		type: 'group';
		label: string;
		items: MenuItemDef[];
	};

	type MenuEntry = MenuItemDef | MenuSeparator | MenuGroupDef;

	interface Props {
		items: MenuEntry[];
		open?: boolean;
		defaultOpen?: boolean;
		disabled?: boolean;
		closeOnSelect?: boolean;
		loopFocus?: boolean;
		onSelect?: (details: Menu.SelectionDetails) => void;
		onOpenChange?: (details: Menu.OpenChangeDetails) => void;
		trigger: Snippet;
		class?: string;
	}

	let {
		items,
		open = $bindable(),
		defaultOpen,
		disabled = false,
		closeOnSelect = true,
		loopFocus = false,
		onSelect,
		onOpenChange,
		trigger,
		class: className
	}: Props = $props();

	function isSeparator(entry: MenuEntry): entry is MenuSeparator {
		return 'type' in entry && entry.type === 'separator';
	}

	function isGroup(entry: MenuEntry): entry is MenuGroupDef {
		return 'type' in entry && entry.type === 'group';
	}

	const itemClass =
		'flex cursor-pointer items-center rounded-km-selector px-3 py-2 text-sm text-km-base-content transition-colors duration-150 data-[highlighted]:bg-km-base-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50';
</script>

<Menu.Root bind:open {defaultOpen} {closeOnSelect} {loopFocus} {onSelect} {onOpenChange}>
	<Menu.Trigger
		{disabled}
		class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content hover:bg-km-base-200 focus-visible:border-km-primary focus-visible:outline-km-primary inline-flex cursor-pointer items-center gap-1.5 border px-3 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
	>
		{@render trigger()}
	</Menu.Trigger>

	<Portal>
		<Menu.Positioner class="z-[var(--km-z-dropdown)]">
			<Menu.Content
				class="rounded-km-box border-km-base-300 bg-km-base-100 shadow-km-md min-w-[8rem] border p-1 {className ??
					''}"
			>
				{#each items as entry}
					{#if isSeparator(entry)}
						<Menu.Separator class="bg-km-base-300 my-1 h-px" />
					{:else if isGroup(entry)}
						<Menu.ItemGroup id={entry.label}>
							<Menu.ItemGroupLabel
								htmlFor={entry.label}
								class="text-km-muted-content px-3 py-1.5 text-xs font-semibold"
							>
								{entry.label}
							</Menu.ItemGroupLabel>
							{#each entry.items as item}
								<Menu.Item value={item.value} disabled={item.disabled} class={itemClass}>
									{item.label}
								</Menu.Item>
							{/each}
						</Menu.ItemGroup>
					{:else}
						<Menu.Item value={entry.value} disabled={entry.disabled} class={itemClass}>
							{entry.label}
						</Menu.Item>
					{/if}
				{/each}
			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu.Root>
