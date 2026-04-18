<script lang="ts">
	import { ImageCropper } from '$ui/image-cropper';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let croppedResult = $state<string | null>(null);
	let controlledZoom = $state(1.5);

	const propsData = [
		{ name: 'src', type: 'string', default: '—', description: 'Source URL of the image to crop' },
		{ name: 'alt', type: 'string', default: '""', description: 'Alt text for the image' },
		{
			name: 'cropShape',
			type: '"rectangle" | "circle"',
			default: '"rectangle"',
			description: 'Shape of the crop area'
		},
		{
			name: 'aspectRatio',
			type: 'number',
			default: '—',
			description: 'Aspect ratio to maintain (width/height). E.g. 16/9 or 1 for square'
		},
		{
			name: 'zoom',
			type: 'number',
			default: '—',
			description: 'Controlled zoom level. Supports bind:zoom'
		},
		{
			name: 'defaultZoom',
			type: 'number',
			default: '1',
			description: 'Initial zoom level for uncontrolled mode'
		},
		{
			name: 'rotation',
			type: 'number',
			default: '—',
			description: 'Controlled rotation in degrees. Supports bind:rotation'
		},
		{
			name: 'defaultRotation',
			type: 'number',
			default: '0',
			description: 'Initial rotation for uncontrolled mode'
		},
		{
			name: 'flip',
			type: 'FlipState',
			default: '—',
			description: 'Controlled flip state { horizontal, vertical }. Supports bind:flip'
		},
		{
			name: 'defaultFlip',
			type: 'FlipState',
			default: '—',
			description: 'Initial flip state for uncontrolled mode'
		},
		{ name: 'minZoom', type: 'number', default: '1', description: 'Minimum zoom level' },
		{ name: 'maxZoom', type: 'number', default: '5', description: 'Maximum zoom level' },
		{
			name: 'fixedCropArea',
			type: 'boolean',
			default: 'false',
			description: 'Lock the crop area size and position'
		},
		{
			name: 'onCropChange',
			type: '(details: CropChangeDetails) => void',
			default: '—',
			description: 'Callback when the crop area changes'
		},
		{
			name: 'onZoomChange',
			type: '(details: ZoomChangeDetails) => void',
			default: '—',
			description: 'Callback when zoom changes'
		},
		{
			name: 'onRotationChange',
			type: '(details: RotationChangeDetails) => void',
			default: '—',
			description: 'Callback when rotation changes'
		},
		{
			name: 'onFlipChange',
			type: '(details: FlipChangeDetails) => void',
			default: '—',
			description: 'Callback when flip state changes'
		},
		{
			name: 'oncrop',
			type: '(result: Blob | string | null) => void',
			default: '—',
			description: 'Called with the cropped image result when the Crop button is clicked'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];

	const demoSrc = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">ImageCropper</h1>
		<p class="text-km-muted-content mt-2">
			Interactive image editor with zoom, rotation, flip, and crop controls. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Default rectangle crop with built-in zoom, rotate, and flip controls."
			code="<ImageCropper src=&quot;https://example.com/photo.jpg&quot; alt=&quot;Mountain landscape&quot; />"
		>
			<ImageCropper src={demoSrc} alt="Mountain landscape" />
		</DemoCard>

		<DemoCard
			title="Circle crop"
			description="Circular crop shape, ideal for avatar cropping. Pair with aspectRatio={1} for a perfect circle."
			code={`<ImageCropper
  src="https://example.com/photo.jpg"
  cropShape="circle"
  aspectRatio={1}
/>`}
		>
			<ImageCropper src={demoSrc} alt="Avatar crop" cropShape="circle" aspectRatio={1} />
		</DemoCard>

		<DemoCard
			title="Fixed aspect ratio"
			description="Lock the crop area to a 16:9 ratio for consistent banner or thumbnail output."
			code={`<ImageCropper
  src="https://example.com/photo.jpg"
  aspectRatio={16 / 9}
/>`}
		>
			<ImageCropper src={demoSrc} alt="16:9 crop" aspectRatio={16 / 9} />
		</DemoCard>

		<DemoCard
			title="Controlled zoom"
			description="Bind to the zoom value externally to display or drive the zoom level from outside the component."
			code={`<p>Zoom: {zoom.toFixed(2)}×</p>
<ImageCropper
  src="https://example.com/photo.jpg"
  bind:zoom
/>`}
		>
			<div class="space-y-3">
				<p class="text-km-muted-content text-sm">
					Current zoom: <code class="bg-km-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledZoom.toFixed(2)}×</code
					>
				</p>
				<ImageCropper src={demoSrc} alt="Controlled zoom" bind:zoom={controlledZoom} />
			</div>
		</DemoCard>

		<DemoCard
			title="Crop callback"
			description="Pass oncrop to receive the cropped image as a data URL when the Crop button is clicked."
			code={`<ImageCropper
  src="https://example.com/photo.jpg"
  oncrop={async (blob) => {
    if (blob instanceof Blob) {
      result = await new Promise<string>((res) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.readAsDataURL(blob);
      });
    }
  }}
/>
{#if result}
  <img src={result} alt="Cropped result" class="mt-3 max-w-xs rounded" />
{/if}`}
		>
			<div class="space-y-3">
				<ImageCropper
					src={demoSrc}
					alt="Crop callback demo"
					aspectRatio={1}
					oncrop={async (blob) => {
						if (blob instanceof Blob) {
							croppedResult = await new Promise<string>((res) => {
								const reader = new FileReader();
								reader.onload = () => res(reader.result as string);
								reader.readAsDataURL(blob);
							});
						} else if (typeof blob === 'string') {
							croppedResult = blob;
						}
					}}
				/>
				{#if croppedResult}
					<div class="flex items-center gap-3">
						<img
							src={croppedResult}
							alt="Cropped result"
							class="rounded-km-box shadow-km-sm size-20 object-cover"
						/>
						<p class="text-km-muted-content text-sm">Cropped result</p>
					</div>
				{/if}
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
