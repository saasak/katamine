<script lang="ts">
  import { ColorPicker, parseColor, type ColorPickerValueChangeDetails, type ColorPickerOpenChangeDetails, type ColorPickerFormatChangeDetails } from "@ark-ui/svelte/color-picker";
  import { Portal } from "@ark-ui/svelte/portal";
  import { Pipette, Check } from "lucide-svelte";

  interface Props {
    value?: string;
    defaultValue?: string;
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    inline?: boolean;
    format?: "rgba" | "hsla" | "hsba" | "hexa";
    defaultFormat?: "rgba" | "hsla" | "hsba" | "hexa";
    closeOnSelect?: boolean;
    presets?: string[];
    onValueChange?: (details: ColorPickerValueChangeDetails) => void;
    onValueChangeEnd?: (details: ColorPickerValueChangeDetails) => void;
    onFormatChange?: (details: ColorPickerFormatChangeDetails) => void;
    onOpenChange?: (details: ColorPickerOpenChangeDetails) => void;
    class?: string;
  }

  let {
    value = $bindable(),
    defaultValue = "#000000",
    name,
    disabled = false,
    readOnly = false,
    required = false,
    inline = false,
    format,
    defaultFormat = "rgba",
    closeOnSelect = false,
    presets,
    onValueChange,
    onValueChangeEnd,
    onFormatChange,
    onOpenChange,
    class: className,
  }: Props = $props();

  const parsedValue = $derived(parseColor(value ?? defaultValue));

  const channelInputClass = "border border-km-base-300 rounded-km-field bg-km-base-100 text-xs text-km-base-content text-center transition-colors duration-150 focus:border-km-primary focus:outline-2 focus:outline-km-primary focus:-outline-offset-1 data-[invalid]:border-km-error data-[readonly]:opacity-60 data-[readonly]:cursor-default";
</script>

{#snippet panelContent()}
  <ColorPicker.Area class="h-40 rounded-km-box overflow-hidden">
    <ColorPicker.AreaBackground class="size-full" />
    <ColorPicker.AreaThumb class="size-4 rounded-full border-2 border-white shadow-km-md" />
  </ColorPicker.Area>

  <div class="space-y-2">
    <ColorPicker.ChannelSlider channel="hue" class="relative h-3 rounded-full">
      <ColorPicker.ChannelSliderTrack class="size-full rounded-full" />
      <ColorPicker.ChannelSliderThumb class="size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-km-md" />
    </ColorPicker.ChannelSlider>

    <ColorPicker.ChannelSlider channel="alpha" class="relative h-3 rounded-full">
      <ColorPicker.TransparencyGrid size="8px" class="rounded-full" />
      <ColorPicker.ChannelSliderTrack class="size-full rounded-full" />
      <ColorPicker.ChannelSliderThumb class="size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-km-md" />
    </ColorPicker.ChannelSlider>
  </div>

  <div class="flex items-center gap-2">
    <ColorPicker.EyeDropperTrigger class="flex cursor-pointer items-center justify-center rounded-km-field border border-km-base-300 bg-km-base-100 p-2 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
      <Pipette size={16} />
    </ColorPicker.EyeDropperTrigger>
    <div class="flex flex-1 items-center gap-1">
      <ColorPicker.ChannelInput channel="hex" class="flex-1 min-w-0 px-2 py-1.5 {channelInputClass}" />
      <ColorPicker.ChannelInput channel="alpha" class="w-16 px-2 py-1.5 {channelInputClass}" />
    </div>
  </div>

  {#if presets?.length}
    <ColorPicker.SwatchGroup class="flex flex-wrap gap-1.5">
      {#each presets as preset (preset)}
        <ColorPicker.SwatchTrigger value={preset} class="relative cursor-pointer rounded-km-selector transition-transform duration-150 hover:scale-110">
          <ColorPicker.TransparencyGrid size="4px" class="rounded-km-selector" />
          <ColorPicker.Swatch value={preset} class="size-6 rounded-km-selector shadow-km-sm" />
          <ColorPicker.SwatchIndicator class="absolute inset-0 flex items-center justify-center">
            <Check size={12} class="text-white drop-shadow-md" />
          </ColorPicker.SwatchIndicator>
        </ColorPicker.SwatchTrigger>
      {/each}
    </ColorPicker.SwatchGroup>
  {/if}

  <ColorPicker.HiddenInput />
{/snippet}

<ColorPicker.Root
  value={parsedValue}
  {disabled}
  {readOnly}
  {required}
  {name}
  closeOnSelect={inline ? false : closeOnSelect}
  {format}
  {defaultFormat}
  onValueChange={(details) => {
    value = details.valueAsString;
    onValueChange?.(details);
  }}
  {onValueChangeEnd}
  {onFormatChange}
  onOpenChange={inline ? undefined : onOpenChange}
  class="relative w-full data-[readonly]:opacity-60 data-[readonly]:cursor-default {className ?? ''}"
>
  {#if !inline}
    <ColorPicker.Control class="flex items-center gap-2">
      <ColorPicker.ChannelInput
        channel="hex"
        class="flex-1 px-3 py-2 text-sm text-km-base-content placeholder:text-km-muted-content {channelInputClass}"
      />
      <ColorPicker.Trigger class="flex cursor-pointer items-center justify-center rounded-km-field border border-km-base-300 bg-km-base-100 p-2 transition-colors duration-150 hover:bg-km-muted">
        <ColorPicker.TransparencyGrid size="10px" class="rounded-km-selector" />
        <ColorPicker.ValueSwatch class="size-6 rounded-km-selector shadow-km-sm" />
      </ColorPicker.Trigger>
    </ColorPicker.Control>
  {/if}

  {#if inline}
    <div class="rounded-km-box border border-km-base-300 bg-km-base-100 p-3 shadow-km-md space-y-3">
      {@render panelContent()}
    </div>
  {:else}
    <Portal>
      <ColorPicker.Positioner class="z-[var(--km-z-dropdown)]">
        <ColorPicker.Content class="rounded-km-box border border-km-base-300 bg-km-base-100 p-3 shadow-km-md space-y-3">
          {@render panelContent()}
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </Portal>
  {/if}
</ColorPicker.Root>
