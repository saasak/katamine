<script lang="ts">
  import { RatingGroup } from "@ark-ui/svelte/rating-group";
  import { Star } from "lucide-svelte";

  interface Props {
    /** Controlled value. Supports bind:value */
    value?: number;
    /** Initial value for uncontrolled mode */
    defaultValue?: number;
    /** Total number of stars */
    count?: number;
    /** Display label */
    label?: string;
    /** Form field name for native submission */
    name?: string;
    /** Disable interaction */
    disabled?: boolean;
    /** Make read-only */
    readOnly?: boolean;
    /** Mark as required */
    required?: boolean;
    /** Allow half-star ratings */
    allowHalf?: boolean;
    /** Callback when value changes */
    onValueChange?: (details: RatingGroup.ValueChangeDetails) => void;
    /** Callback when hover changes */
    onHoverChange?: (details: RatingGroup.HoverChangeDetails) => void;
    /** Additional CSS classes on the root element */
    class?: string;
  }

  let {
    value = $bindable(),
    defaultValue,
    count = 5,
    label,
    name,
    disabled = false,
    readOnly = false,
    required = false,
    allowHalf = false,
    onValueChange,
    onHoverChange,
    class: className,
  }: Props = $props();
</script>

<RatingGroup.Root
  bind:value
  {defaultValue}
  {count}
  {name}
  {disabled}
  {readOnly}
  {required}
  {allowHalf}
  {onValueChange}
  {onHoverChange}
  class="inline-flex flex-col gap-1.5 {className ?? ''}"
>
  {#if label}
    <RatingGroup.Label class="text-sm font-medium text-km-base-content data-[disabled]:text-km-muted-content">
      {label}
    </RatingGroup.Label>
  {/if}
  <RatingGroup.Control class="flex items-center gap-0.5">
    <RatingGroup.Context>
      {#snippet render(context)}
        {#each context().items as index (index)}
          <RatingGroup.Item
            {index}
            class="cursor-pointer rounded-km-selector p-0.5 text-km-base-300 outline-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-km-primary focus-visible:outline-offset-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[readonly]:cursor-default"
          >
            <RatingGroup.ItemContext>
              {#snippet render(itemContext)}
                {@const state = itemContext()}
                <span class="relative inline-block leading-none">
                  <Star size={20} />
                  {#if state.highlighted || state.half}
                    <span
                      class="pointer-events-none absolute inset-0 overflow-hidden"
                      style={state.half ? "width: 50%" : ""}
                    >
                      <Star size={20} class="fill-km-primary text-km-primary" />
                    </span>
                  {/if}
                </span>
              {/snippet}
            </RatingGroup.ItemContext>
          </RatingGroup.Item>
        {/each}
      {/snippet}
    </RatingGroup.Context>
  </RatingGroup.Control>
  <RatingGroup.HiddenInput />
</RatingGroup.Root>
