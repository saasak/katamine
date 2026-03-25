<script lang="ts">
  import { ImageCropper } from "@ark-ui/svelte/image-cropper";
  import type {
    CropChangeDetails,
    ZoomChangeDetails,
    RotationChangeDetails,
    FlipChangeDetails,
    FlipState,
  } from "@zag-js/image-cropper";
  import {
    ZoomIn,
    ZoomOut,
    RotateCcw,
    RotateCw,
    FlipHorizontal2,
    FlipVertical2,
    Crop,
    RefreshCcw,
  } from "lucide-svelte";

  interface Props {
    /** Source URL of the image to crop */
    src: string;
    /** Alt text for the image */
    alt?: string;
    /** Shape of the crop area @default "rectangle" */
    cropShape?: "rectangle" | "circle";
    /** Aspect ratio to maintain (width/height) */
    aspectRatio?: number;
    /** Controlled zoom level. Supports bind:zoom */
    zoom?: number;
    /** Initial zoom level for uncontrolled mode @default 1 */
    defaultZoom?: number;
    /** Controlled rotation in degrees. Supports bind:rotation */
    rotation?: number;
    /** Initial rotation for uncontrolled mode @default 0 */
    defaultRotation?: number;
    /** Controlled flip state. Supports bind:flip */
    flip?: FlipState;
    /** Initial flip state for uncontrolled mode */
    defaultFlip?: FlipState;
    /** Minimum zoom level @default 1 */
    minZoom?: number;
    /** Maximum zoom level @default 5 */
    maxZoom?: number;
    /** Lock the crop area position @default false */
    fixedCropArea?: boolean;
    /** Callback when crop area changes */
    onCropChange?: (details: CropChangeDetails) => void;
    /** Callback when zoom changes */
    onZoomChange?: (details: ZoomChangeDetails) => void;
    /** Callback when rotation changes */
    onRotationChange?: (details: RotationChangeDetails) => void;
    /** Callback when flip state changes */
    onFlipChange?: (details: FlipChangeDetails) => void;
    /** Called with the cropped image result when Crop button is clicked */
    oncrop?: (result: Blob | string | null) => void;
    /** Additional CSS classes on the root element */
    class?: string;
  }

  let {
    src,
    alt = "",
    cropShape = "rectangle",
    aspectRatio,
    zoom = $bindable(),
    defaultZoom,
    rotation = $bindable(),
    defaultRotation,
    flip = $bindable(),
    defaultFlip,
    minZoom,
    maxZoom,
    fixedCropArea,
    onCropChange,
    onZoomChange,
    onRotationChange,
    onFlipChange,
    oncrop,
    class: className,
  }: Props = $props();
</script>

<ImageCropper.Root
  bind:zoom
  bind:rotation
  bind:flip
  {defaultZoom}
  {defaultRotation}
  {defaultFlip}
  {cropShape}
  {aspectRatio}
  {minZoom}
  {maxZoom}
  {fixedCropArea}
  {onCropChange}
  {onZoomChange}
  {onRotationChange}
  {onFlipChange}
  class="flex flex-col gap-3 {className ?? ''}"
>
  <ImageCropper.Viewport
    class="relative h-72 w-full overflow-hidden rounded-km-box bg-km-base-200"
  >
    <ImageCropper.Image {src} {alt} class="absolute max-w-none" />
    <ImageCropper.Selection
      class="absolute border-2 border-white/90 outline outline-[9999px] outline-black/50"
    >
      {#each ImageCropper.handles as position}
        <ImageCropper.Handle
          {position}
          class="absolute flex items-center justify-center"
        >
          <div class="size-2.5 rounded-sm border border-white/50 bg-white shadow-sm"></div>
        </ImageCropper.Handle>
      {/each}
      <ImageCropper.Grid
        axis="horizontal"
        class="pointer-events-none absolute inset-0"
      />
      <ImageCropper.Grid
        axis="vertical"
        class="pointer-events-none absolute inset-0"
      />
    </ImageCropper.Selection>
  </ImageCropper.Viewport>

  <ImageCropper.Context>
    {#snippet children(api)}
      <div class="flex flex-wrap items-center gap-1.5">
        <!-- Zoom controls -->
        <div class="flex items-center gap-1 rounded-km-field border border-km-base-300 bg-km-base-100 p-1">
          <button
            type="button"
            onclick={() => api().zoomBy(-0.1)}
            class="flex size-7 cursor-pointer items-center justify-center rounded-km-selector text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
            aria-label="Zoom out"
          >
            <ZoomOut size={15} />
          </button>
          <span class="min-w-10 text-center text-xs tabular-nums text-km-muted-content">
            {api().zoom.toFixed(1)}×
          </span>
          <button
            type="button"
            onclick={() => api().zoomBy(0.1)}
            class="flex size-7 cursor-pointer items-center justify-center rounded-km-selector text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
            aria-label="Zoom in"
          >
            <ZoomIn size={15} />
          </button>
        </div>

        <!-- Rotation controls -->
        <div class="flex items-center gap-1 rounded-km-field border border-km-base-300 bg-km-base-100 p-1">
          <button
            type="button"
            onclick={() => api().rotateBy(-90)}
            class="flex size-7 cursor-pointer items-center justify-center rounded-km-selector text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
            aria-label="Rotate 90° counter-clockwise"
          >
            <RotateCcw size={15} />
          </button>
          <span class="min-w-10 text-center text-xs tabular-nums text-km-muted-content">
            {api().rotation}°
          </span>
          <button
            type="button"
            onclick={() => api().rotateBy(90)}
            class="flex size-7 cursor-pointer items-center justify-center rounded-km-selector text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
            aria-label="Rotate 90° clockwise"
          >
            <RotateCw size={15} />
          </button>
        </div>

        <!-- Flip controls -->
        <div class="flex items-center gap-1 rounded-km-field border border-km-base-300 bg-km-base-100 p-1">
          <button
            type="button"
            onclick={() => api().flipHorizontally()}
            class="flex size-7 cursor-pointer items-center justify-center rounded-km-selector transition-colors duration-150 {api().flip.horizontal ? 'bg-km-primary text-km-primary-content' : 'text-km-muted-content hover:bg-km-muted hover:text-km-base-content'}"
            aria-label="Flip horizontal"
            aria-pressed={api().flip.horizontal}
          >
            <FlipHorizontal2 size={15} />
          </button>
          <button
            type="button"
            onclick={() => api().flipVertically()}
            class="flex size-7 cursor-pointer items-center justify-center rounded-km-selector transition-colors duration-150 {api().flip.vertical ? 'bg-km-primary text-km-primary-content' : 'text-km-muted-content hover:bg-km-muted hover:text-km-base-content'}"
            aria-label="Flip vertical"
            aria-pressed={api().flip.vertical}
          >
            <FlipVertical2 size={15} />
          </button>
        </div>

        <div class="ml-auto flex items-center gap-1.5">
          <!-- Reset -->
          <button
            type="button"
            onclick={() => api().reset()}
            class="flex size-8 cursor-pointer items-center justify-center rounded-km-selector border border-km-base-300 bg-km-base-100 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
            aria-label="Reset"
          >
            <RefreshCcw size={15} />
          </button>

          <!-- Crop -->
          {#if oncrop}
            <button
              type="button"
              onclick={async () => oncrop!(await api().getCroppedImage())}
              class="flex cursor-pointer items-center gap-1.5 rounded-km-field bg-km-primary px-3 py-1.5 text-sm font-medium text-km-primary-content transition-opacity duration-150 hover:opacity-90"
            >
              <Crop size={14} />
              Crop
            </button>
          {/if}
        </div>
      </div>
    {/snippet}
  </ImageCropper.Context>
</ImageCropper.Root>
