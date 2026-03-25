<script lang="ts">
  import { QrCode } from "$ui/qr-code";
  import DemoCard from "$lib/components/DemoCard.svelte";
  import PropsTable from "$lib/components/PropsTable.svelte";

  let controlledValue = $state("https://katamine.dev");

  const propsData = [
    { name: "value", type: "string", default: "—", description: "Controlled value to encode. Supports bind:value" },
    { name: "defaultValue", type: "string", default: "—", description: "Initial value for uncontrolled mode" },
    { name: "pixelSize", type: "number", default: "200", description: "Pixel size of the rendered QR code" },
    { name: "encoding", type: "QrCodeGenerateOptions", default: "—", description: "Encoding options: ecc, maskPattern, boostEcc, minVersion, maxVersion, border, invert" },
    { name: "onValueChange", type: "(details: { value: string }) => void", default: "—", description: "Callback fired when the encoded value changes" },
    { name: "overlay", type: "Snippet", default: "—", description: "Optional snippet rendered centered over the QR code (e.g. a logo)" },
    { name: "class", type: "string", default: "—", description: "Additional CSS classes on the root element" },
  ];
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold">QrCode</h1>
    <p class="mt-2 text-km-muted-content">
      Generates and displays a QR code from any string value. Built on Ark UI and uqr.
    </p>
  </div>

  <!-- Examples -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Examples</h2>

    <DemoCard
      title="Basic"
      description="Encode a URL as a QR code."
      code={`<QrCode value="https://katamine.dev" />`}
    >
      <QrCode value="https://katamine.dev" />
    </DemoCard>

    <DemoCard
      title="Custom size"
      description="Use pixelSize to adjust the rendered dimensions."
      code={`<QrCode value="https://katamine.dev" pixelSize={120} />
<QrCode value="https://katamine.dev" pixelSize={240} />`}
    >
      <div class="flex items-end gap-6">
        <QrCode value="https://katamine.dev" pixelSize={120} />
        <QrCode value="https://katamine.dev" pixelSize={240} />
      </div>
    </DemoCard>

    <DemoCard
      title="High error correction"
      description="Use encoding.ecc='H' for 30% data recovery — required when adding a logo overlay."
      code={`<QrCode
  value="https://katamine.dev"
  encoding={{ ecc: "H" }}
>
  {#snippet overlay()}
    <span class="text-xl">K</span>
  {/snippet}
</QrCode>`}
    >
      <QrCode value="https://katamine.dev" encoding={{ ecc: "H" }}>
        {#snippet overlay()}
          <span class="text-xl font-bold text-km-primary">K</span>
        {/snippet}
      </QrCode>
    </DemoCard>

    <DemoCard
      title="Controlled value"
      description="Bind the encoded value to a reactive variable."
      code={`<script lang="ts">
  let url = $state("https://katamine.dev");
<\/script>

<input bind:value={url} />
<QrCode bind:value={url} />`}
    >
      <div class="flex flex-col gap-4">
        <input
          bind:value={controlledValue}
          class="rounded-km-field border border-km-base-300 bg-km-base-100 px-3 py-2 text-sm text-km-base-content outline-none focus:border-km-primary"
          placeholder="Enter a URL or text..."
        />
        <QrCode bind:value={controlledValue} />
      </div>
    </DemoCard>

    <DemoCard
      title="Plain text"
      description="QR codes work with any string, not just URLs."
      code={`<QrCode value="Hello, Katamine!" />`}
    >
      <QrCode value="Hello, Katamine!" />
    </DemoCard>
  </section>

  <!-- Props -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Props</h2>
    <PropsTable items={propsData} />
  </section>
</div>
