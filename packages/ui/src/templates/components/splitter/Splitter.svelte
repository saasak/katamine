<script lang="ts">
  import { Splitter } from "@ark-ui/svelte/splitter";
  import type { Snippet } from "svelte";
  import { GripVertical, GripHorizontal } from "lucide-svelte";

  interface PanelConfig {
    id: string;
    collapsible?: boolean;
    collapsedSize?: number;
    minSize?: number;
    maxSize?: number;
  }

  interface Props {
    panels: PanelConfig[];
    defaultSize?: number[];
    size?: number[];
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
    onResize?: (details: { previousSize: number[]; size: number[] }) => void;
    onResizeEnd?: (details: { size: number[] }) => void;
    panel: Snippet<[{ id: string; index: number }]>;
    class?: string;
  }

  let {
    panels,
    defaultSize,
    size = $bindable(),
    orientation = "horizontal",
    disabled = false,
    onResize,
    onResizeEnd,
    panel,
    class: className,
  }: Props = $props();

  const isVertical = $derived(orientation === "vertical");
</script>

<Splitter.Root
  {panels}
  {defaultSize}
  bind:size
  {orientation}
  {disabled}
  {onResize}
  {onResizeEnd}
  class="flex h-full w-full {isVertical ? 'flex-col' : ''} data-[disabled]:pointer-events-none data-[disabled]:opacity-50 {className ?? ''}"
>
  {#each panels as panelConfig, i}
    <Splitter.Panel id={panelConfig.id} class="overflow-auto">
      {@render panel({ id: panelConfig.id, index: i })}
    </Splitter.Panel>
    {#if i < panels.length - 1}
      <Splitter.ResizeTrigger
        id="{panelConfig.id}:{panels[i + 1].id}"
        aria-label="Resize between {panelConfig.id} and {panels[i + 1].id}"
        class="flex shrink-0 items-center justify-center border-none bg-km-base-200 transition-colors duration-150 hover:bg-km-base-300 focus-visible:outline-2 focus-visible:outline-km-primary {isVertical ? 'h-3 cursor-row-resize' : 'w-3 cursor-col-resize'}"
      >
        <Splitter.ResizeTriggerIndicator class="text-km-muted-content">
          {#if isVertical}
            <GripHorizontal size={12} />
          {:else}
            <GripVertical size={12} />
          {/if}
        </Splitter.ResizeTriggerIndicator>
      </Splitter.ResizeTrigger>
    {/if}
  {/each}
</Splitter.Root>
