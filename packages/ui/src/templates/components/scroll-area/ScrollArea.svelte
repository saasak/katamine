<script lang="ts">
  import { ScrollArea } from "@ark-ui/svelte/scroll-area";
  import type { Snippet } from "svelte";

  interface Props {
    dir?: "ltr" | "rtl";
    class?: string;
    children: Snippet;
  }

  let { dir, class: className, children }: Props = $props();
</script>

<ScrollArea.Root
  {dir}
  class="relative overflow-hidden {className ?? ''}"
>
  <ScrollArea.Viewport class="size-full">
    <ScrollArea.Content>
      {@render children()}
    </ScrollArea.Content>
  </ScrollArea.Viewport>

  <ScrollArea.Scrollbar
    orientation="vertical"
    class="flex touch-none select-none p-0.5 transition-colors duration-150 data-[orientation=vertical]:w-2.5"
  >
    <ScrollArea.Thumb class="relative flex-1 rounded-full bg-km-base-300 transition-colors duration-150 hover:bg-km-muted-content" />
  </ScrollArea.Scrollbar>

  <ScrollArea.Scrollbar
    orientation="horizontal"
    class="flex touch-none select-none p-0.5 transition-colors duration-150 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col"
  >
    <ScrollArea.Thumb class="relative flex-1 rounded-full bg-km-base-300 transition-colors duration-150 hover:bg-km-muted-content" />
  </ScrollArea.Scrollbar>

  <ScrollArea.Corner class="bg-km-base-200" />
</ScrollArea.Root>
