<script lang="ts">
	import { TagsInput } from '@ark-ui/svelte/tags-input';
	import { X } from 'lucide-svelte';

	interface Props {
		value?: string[];
		defaultValue?: string[];
		placeholder?: string;
		name?: string;
		disabled?: boolean;
		max?: number;
		delimiter?: string | RegExp;
		editable?: boolean;
		addOnPaste?: boolean;
		blurBehavior?: 'clear' | 'add';
		validate?: (details: { inputValue: string; value: string[] }) => boolean;
		onValueChange?: (details: TagsInput.ValueChangeDetails) => void;
		onValueInvalid?: (details: TagsInput.ValidityChangeDetails) => void;
		class?: string;
	}

	let {
		value = $bindable(),
		defaultValue,
		placeholder = '',
		name,
		disabled = false,
		max,
		delimiter = ',',
		editable = true,
		addOnPaste = false,
		blurBehavior,
		validate,
		onValueChange,
		onValueInvalid,
		class: className
	}: Props = $props();
</script>

<TagsInput.Root
	bind:value
	{defaultValue}
	{disabled}
	{max}
	{delimiter}
	{editable}
	{addOnPaste}
	{blurBehavior}
	{validate}
	{name}
	{onValueChange}
	{onValueInvalid}
	class="w-full {className ?? ''}"
>
	<TagsInput.Control
		class="rounded-km-field border-km-base-300 bg-km-base-100 focus-within:border-km-primary focus-within:outline-km-primary flex flex-wrap items-center gap-1.5 border px-3 py-2 transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
	>
		<TagsInput.Context>
			{#snippet render(context)}
				{#each context.value as tag, index (tag + index)}
					<TagsInput.Item
						{index}
						value={tag}
						class="rounded-km-selector bg-km-base-200 text-km-base-content data-[highlighted]:ring-km-primary inline-flex items-center gap-1 px-2 py-0.5 text-sm data-[highlighted]:ring-2"
					>
						<TagsInput.ItemPreview class="inline-flex items-center gap-1">
							<TagsInput.ItemText>{tag}</TagsInput.ItemText>
							<TagsInput.ItemDeleteTrigger
								class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content inline-flex cursor-pointer items-center justify-center p-0.5 transition-colors duration-150"
							>
								<X size={12} />
							</TagsInput.ItemDeleteTrigger>
						</TagsInput.ItemPreview>
						<TagsInput.ItemInput
							class="text-km-base-content min-w-0 border-none bg-transparent text-sm outline-none"
						/>
					</TagsInput.Item>
				{/each}
				<TagsInput.Input
					{placeholder}
					class="text-km-base-content placeholder:text-km-muted-content min-w-[4rem] flex-1 border-none bg-transparent text-sm outline-none"
				/>
				{#if context.value.length > 0}
					<TagsInput.ClearTrigger
						class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
					>
						<X size={14} />
					</TagsInput.ClearTrigger>
				{/if}
			{/snippet}
		</TagsInput.Context>
	</TagsInput.Control>
	<TagsInput.HiddenInput />
</TagsInput.Root>
