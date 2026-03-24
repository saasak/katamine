<script lang="ts" generics="T">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import { ChevronLeft, ChevronRight } from "lucide-svelte";
  import type { Snippet } from "svelte";

  interface Props {
    /** Array of slide data */
    items: T[];
    /** Controlled current page index. Supports bind:page */
    page?: number;
    /** Initial page for uncontrolled mode */
    defaultPage?: number;
    /** Layout direction */
    orientation?: "horizontal" | "vertical";
    /** Auto-advance slides */
    autoplay?: boolean;
    /** Autoplay interval in milliseconds */
    autoplayDelay?: number;
    /** Wrap around to first/last slide */
    loop?: boolean;
    /** Number of slides visible at once */
    slidesPerPage?: number;
    /** Gap between slides (CSS value) */
    spacing?: string;
    /** Show dot indicators */
    showIndicators?: boolean;
    /** Show prev/next arrow buttons */
    showControls?: boolean;
    /** Disable all interaction */
    disabled?: boolean;
    /** Callback when the active page changes */
    onPageChange?: (details: Carousel.PageChangeDetails) => void;
    /** Additional CSS classes on the root element */
    class?: string;
    /** Render snippet for each slide — receives the item and its index */
    children: Snippet<[T, number]>;
  }

  let {
    items,
    page = $bindable(),
    defaultPage,
    orientation = "horizontal",
    autoplay = false,
    autoplayDelay = 4000,
    loop = false,
    slidesPerPage = 1,
    spacing = "0px",
    showIndicators = true,
    showControls = true,
    disabled = false,
    onPageChange,
    class: className,
    children,
  }: Props = $props();

  const pageCount = $derived(Math.ceil(items.length / slidesPerPage));
</script>

<Carousel.Root
  slideCount={items.length}
  {orientation}
  autoplay={autoplay ? { delay: autoplayDelay } : false}
  {loop}
  {slidesPerPage}
  {spacing}
  bind:page
  {defaultPage}
  {onPageChange}
  class="relative w-full {className ?? ''}"
>
  <Carousel.ItemGroup class="flex">
    {#each items as item, index (index)}
      <Carousel.Item {index} class="min-w-0 flex-shrink-0">
        {@render children(item, index)}
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>

  {#if showControls}
    <Carousel.Control class="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
      <Carousel.PrevTrigger
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-km-selector border border-km-base-300 bg-km-base-100 text-km-base-content shadow-km-sm transition-colors duration-150 hover:bg-km-base-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </Carousel.PrevTrigger>
      <Carousel.NextTrigger
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-km-selector border border-km-base-300 bg-km-base-100 text-km-base-content shadow-km-sm transition-colors duration-150 hover:bg-km-base-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </Carousel.NextTrigger>
    </Carousel.Control>
  {/if}

  {#if showIndicators && pageCount > 1}
    <Carousel.IndicatorGroup class="mt-3 flex items-center justify-center gap-1.5">
      {#each { length: pageCount } as _, index (index)}
        <Carousel.Indicator
          {index}
          class="h-2 w-2 cursor-pointer rounded-km-selector border-none bg-km-base-300 transition-colors duration-150 hover:bg-km-muted-content data-[current]:bg-km-primary"
        />
      {/each}
    </Carousel.IndicatorGroup>
  {/if}
</Carousel.Root>
