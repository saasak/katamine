<script lang="ts">
  import { QrCode } from "@ark-ui/svelte/qr-code";
  import type { QrCodeGenerateOptions } from "@ark-ui/svelte/qr-code";
  import type { Snippet } from "svelte";

  interface Props {
    value?: string;
    defaultValue?: string;
    pixelSize?: number;
    encoding?: QrCodeGenerateOptions;
    onValueChange?: (details: { value: string }) => void;
    overlay?: Snippet;
    class?: string;
  }

  let {
    value = $bindable(),
    defaultValue,
    pixelSize = 200,
    encoding,
    onValueChange,
    overlay,
    class: className,
  }: Props = $props();
</script>

<QrCode.Root
  bind:value
  {defaultValue}
  {pixelSize}
  {encoding}
  {onValueChange}
  class="inline-flex items-center justify-center rounded-km-box border border-km-base-300 bg-km-base-100 p-3 shadow-km-sm {className ?? ''}"
>
  <QrCode.Frame class="text-km-base-content">
    <QrCode.Pattern />
  </QrCode.Frame>
  {#if overlay}
    <QrCode.Overlay class="flex items-center justify-center rounded-km-selector bg-km-base-100 p-1">
      {@render overlay()}
    </QrCode.Overlay>
  {/if}
</QrCode.Root>
