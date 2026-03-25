<script lang="ts">
  import { Fieldset } from "@ark-ui/svelte/fieldset";
  import type { Snippet } from "svelte";

  interface Props {
    /** Legend text displayed at the top of the fieldset */
    legend?: string;
    /** Helper text displayed below the grouped fields */
    helperText?: string;
    /** Error text displayed when invalid */
    errorText?: string;
    /** Disable all fields in the fieldset */
    disabled?: boolean;
    /** Mark the fieldset as invalid */
    invalid?: boolean;
    /** Additional CSS classes on the root element */
    class?: string;
    /** Fieldset content (grouped form fields) */
    children?: Snippet;
  }

  let {
    legend,
    helperText,
    errorText,
    disabled = false,
    invalid = false,
    class: className,
    children,
  }: Props = $props();
</script>

<Fieldset.Root
  {disabled}
  {invalid}
  class="flex flex-col gap-3 {className ?? ''}"
>
  {#if legend}
    <Fieldset.Legend class="text-sm font-semibold text-km-base-content data-[disabled]:text-km-muted-content">
      {legend}
    </Fieldset.Legend>
  {/if}

  {@render children?.()}

  {#if helperText && !invalid}
    <Fieldset.HelperText class="text-xs text-km-muted-content">
      {helperText}
    </Fieldset.HelperText>
  {/if}

  {#if errorText && invalid}
    <Fieldset.ErrorText class="text-xs text-km-error">
      {errorText}
    </Fieldset.ErrorText>
  {/if}
</Fieldset.Root>
