<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
  import { X } from "lucide-svelte";

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
    blurBehavior?: "clear" | "add";
    validate?: (details: { inputValue: string; value: string[] }) => boolean;
    onValueChange?: (details: TagsInput.ValueChangeDetails) => void;
    onValueInvalid?: (details: TagsInput.ValidityChangeDetails) => void;
    class?: string;
  }

  let {
    value = $bindable(),
    defaultValue,
    placeholder = "",
    name,
    disabled = false,
    max,
    delimiter = ",",
    editable = true,
    addOnPaste = false,
    blurBehavior,
    validate,
    onValueChange,
    onValueInvalid,
    class: className,
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
    class="flex flex-wrap items-center gap-1.5 rounded-km-field border border-km-base-300 bg-km-base-100 px-3 py-2 transition-colors duration-150 focus-within:border-km-primary focus-within:outline-2 focus-within:outline-km-primary focus-within:-outline-offset-1"
  >
    <TagsInput.Context>
      {#snippet children(context)}
        {#each context.value as tag, index (tag + index)}
          <TagsInput.Item {index} value={tag} class="inline-flex items-center gap-1 rounded-km-selector bg-km-base-200 px-2 py-0.5 text-sm text-km-base-content data-[highlighted]:ring-2 data-[highlighted]:ring-km-primary">
            <TagsInput.ItemPreview class="inline-flex items-center gap-1">
              <TagsInput.ItemText>{tag}</TagsInput.ItemText>
              <TagsInput.ItemDeleteTrigger class="inline-flex cursor-pointer items-center justify-center rounded-km-selector p-0.5 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
                <X size={12} />
              </TagsInput.ItemDeleteTrigger>
            </TagsInput.ItemPreview>
            <TagsInput.ItemInput class="min-w-0 border-none bg-transparent text-sm text-km-base-content outline-none" />
          </TagsInput.Item>
        {/each}
      {/snippet}
    </TagsInput.Context>
    <TagsInput.Input
      {placeholder}
      class="min-w-[4rem] flex-1 border-none bg-transparent text-sm text-km-base-content outline-none placeholder:text-km-muted-content"
    />
    <TagsInput.ClearTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
      <X size={14} />
    </TagsInput.ClearTrigger>
  </TagsInput.Control>
  <TagsInput.HiddenInput />
</TagsInput.Root>
