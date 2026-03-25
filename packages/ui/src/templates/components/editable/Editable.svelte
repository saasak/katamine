<script lang="ts">
  import { Editable } from "@ark-ui/svelte/editable";
  import { Pencil, Check, X } from "lucide-svelte";

  interface Props {
    /** Optional label rendered above the field */
    label?: string;
    /** Controlled value. Supports bind:value */
    value?: string;
    /** Initial value for uncontrolled mode */
    defaultValue?: string;
    /** Placeholder shown when empty */
    placeholder?: string;
    /** Form field name for native submission */
    name?: string;
    /** Disable the field */
    disabled?: boolean;
    /** Prevent editing */
    readOnly?: boolean;
    /** How the user enters edit mode */
    activationMode?: "focus" | "dblclick" | "click" | "none";
    /** What triggers saving the value */
    submitMode?: "enter" | "blur" | "none" | "both";
    /** Auto-expand input width with content */
    autoResize?: boolean;
    /** Select all text when entering edit mode */
    selectOnFocus?: boolean;
    /** Maximum character count */
    maxLength?: number;
    /** Callback when value changes */
    onValueChange?: (details: Editable.ValueChangeDetails) => void;
    /** Additional CSS classes on the root element */
    class?: string;
  }

  let {
    label,
    value = $bindable(),
    defaultValue,
    placeholder = "Click to edit",
    name,
    disabled = false,
    readOnly = false,
    activationMode = "focus",
    submitMode = "both",
    autoResize = false,
    selectOnFocus = true,
    maxLength,
    onValueChange,
    class: className,
  }: Props = $props();
</script>

<Editable.Root
  bind:value
  {defaultValue}
  {placeholder}
  {name}
  {disabled}
  {readOnly}
  {activationMode}
  {submitMode}
  {autoResize}
  {selectOnFocus}
  {maxLength}
  {onValueChange}
  class="inline-flex w-full flex-col gap-1.5 {className ?? ''}"
>
  {#if label}
    <Editable.Label class="text-sm font-medium text-km-base-content">{label}</Editable.Label>
  {/if}

  <div class="flex items-center gap-1.5">
    <Editable.Area class="relative flex min-w-0 flex-1 items-center">
      <Editable.Input
        class="w-full rounded-km-field border border-km-primary bg-km-base-100 px-3 py-1.5 text-sm text-km-base-content outline-none ring-2 ring-km-primary/20 placeholder:text-km-muted-content disabled:cursor-not-allowed disabled:opacity-60"
      />
      <Editable.Preview
        class="w-full cursor-text truncate rounded-km-field border border-transparent px-3 py-1.5 text-sm text-km-base-content transition-colors duration-150 hover:bg-km-base-200 data-[placeholder]:text-km-muted-content data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60 data-[readonly]:cursor-default"
      />
    </Editable.Area>

    <Editable.Control class="flex shrink-0 items-center gap-0.5">
      <Editable.EditTrigger
        class="flex cursor-pointer items-center justify-center rounded-km-selector p-1.5 text-km-muted-content transition-colors duration-150 hover:bg-km-base-200 hover:text-km-base-content data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      >
        <Pencil size={14} />
      </Editable.EditTrigger>
      <Editable.SubmitTrigger
        class="flex cursor-pointer items-center justify-center rounded-km-selector p-1.5 text-km-primary transition-colors duration-150 hover:bg-km-base-200"
      >
        <Check size={14} />
      </Editable.SubmitTrigger>
      <Editable.CancelTrigger
        class="flex cursor-pointer items-center justify-center rounded-km-selector p-1.5 text-km-muted-content transition-colors duration-150 hover:bg-km-base-200 hover:text-km-base-content"
      >
        <X size={14} />
      </Editable.CancelTrigger>
    </Editable.Control>
  </div>
</Editable.Root>
