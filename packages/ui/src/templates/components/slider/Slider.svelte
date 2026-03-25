<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
  import type {
    ValueChangeDetails,
    FocusChangeDetails,
    ValueTextDetails,
  } from "@zag-js/slider";

  interface Props {
    /** Label text displayed above the slider */
    label?: string;
    /** Form field name for native submission */
    name?: string;
    /** Controlled value (array for range mode). Supports bind:value */
    value?: number[];
    /** Default value for uncontrolled mode */
    defaultValue?: number[];
    /** Minimum value @default 0 */
    min?: number;
    /** Maximum value @default 100 */
    max?: number;
    /** Step increment @default 1 */
    step?: number;
    /** Slider orientation @default "horizontal" */
    orientation?: "horizontal" | "vertical";
    /** Origin of the filled range @default "start" */
    origin?: "start" | "center" | "end";
    /** Whether the slider is disabled */
    disabled?: boolean;
    /** Whether the slider is read-only */
    readOnly?: boolean;
    /** Whether the slider is invalid */
    invalid?: boolean;
    /** Show the current value as text */
    showValue?: boolean;
    /** Show step markers at given values */
    markers?: number[];
    /** Minimum steps between thumbs in range mode @default 0 */
    minStepsBetweenThumbs?: number;
    /** Function to format the displayed value text */
    getAriaValueText?: (details: ValueTextDetails) => string;
    /** Callback when value changes */
    onValueChange?: (details: ValueChangeDetails) => void;
    /** Callback when dragging ends */
    onValueChangeEnd?: (details: ValueChangeDetails) => void;
    /** Callback when focused thumb changes */
    onFocusChange?: (details: FocusChangeDetails) => void;
    /** Additional CSS classes on the root element */
    class?: string;
  }

  let {
    label,
    name,
    value = $bindable(),
    defaultValue = [50],
    min = 0,
    max = 100,
    step = 1,
    orientation = "horizontal",
    origin = "start",
    disabled = false,
    readOnly = false,
    invalid = false,
    showValue = false,
    markers,
    minStepsBetweenThumbs = 0,
    getAriaValueText,
    onValueChange,
    onValueChangeEnd,
    onFocusChange,
    class: className,
  }: Props = $props();

  const isVertical = $derived(orientation === "vertical");
</script>

<Slider.Root
  bind:value
  {defaultValue}
  {name}
  {min}
  {max}
  {step}
  {orientation}
  {origin}
  {disabled}
  {readOnly}
  {invalid}
  {minStepsBetweenThumbs}
  {getAriaValueText}
  {onValueChange}
  {onValueChangeEnd}
  {onFocusChange}
  class="flex {isVertical ? 'h-48 flex-col items-center' : 'w-full flex-col'} gap-2 {className ?? ''}"
>
  {#if label || showValue}
    <div class="flex items-center justify-between text-sm">
      {#if label}
        <Slider.Label
          class="font-medium text-km-base-content data-[disabled]:text-km-muted-content"
        >
          {label}
        </Slider.Label>
      {/if}
      {#if showValue}
        <Slider.ValueText
          class="tabular-nums text-km-muted-content"
        />
      {/if}
    </div>
  {/if}

  <Slider.Control
    class="flex {isVertical ? 'h-full flex-col' : 'w-full'} items-center"
  >
    <Slider.Track
      class="relative {isVertical ? 'h-full w-2' : 'h-2 w-full'} rounded-full bg-km-base-300 data-[disabled]:opacity-50"
    >
      <Slider.Range
        class="absolute {isVertical ? 'w-full' : 'h-full'} rounded-full bg-km-primary data-[invalid]:bg-km-error"
      />
    </Slider.Track>

    <Slider.Context>
      {#snippet children(context)}
        {#each context.value as _, index}
          <Slider.Thumb
            {index}
            class="size-5 rounded-full border-2 border-km-primary bg-km-base-100 shadow-km-sm transition-shadow outline-none hover:shadow-km-md focus-visible:ring-2 focus-visible:ring-km-primary/40 data-[disabled]:cursor-not-allowed data-[disabled]:border-km-muted data-[invalid]:border-km-error"
          >
            <Slider.HiddenInput {index} />
          </Slider.Thumb>
        {/each}
      {/snippet}
    </Slider.Context>
  </Slider.Control>

  {#if markers?.length}
    <Slider.MarkerGroup class="relative {isVertical ? 'h-full' : 'w-full'}">
      {#each markers as markerValue}
        <Slider.Marker
          value={markerValue}
          class="text-xs text-km-muted-content before:block before:size-1 before:rounded-full before:bg-km-base-300 data-[state=under-value]:before:bg-km-primary"
        >
          {markerValue}
        </Slider.Marker>
      {/each}
    </Slider.MarkerGroup>
  {/if}
</Slider.Root>
