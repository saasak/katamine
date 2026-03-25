<script lang="ts">
  import { SignaturePad } from "$ui/signature-pad";
  import DemoCard from "$lib/components/DemoCard.svelte";
  import PropsTable from "$lib/components/PropsTable.svelte";

  let formResult = $state("");
  let previewUrl = $state("");

  const propsData = [
    { name: "paths", type: "string[]", default: "—", description: "Controlled paths (drawn strokes). Supports bind:paths" },
    { name: "defaultPaths", type: "string[]", default: "—", description: "Initial paths for uncontrolled mode" },
    { name: "label", type: "string", default: '"Signature"', description: "Label text displayed above the pad" },
    { name: "name", type: "string", default: "—", description: "Form field name for native submission" },
    { name: "disabled", type: "boolean", default: "false", description: "Whether the signature pad is disabled" },
    { name: "required", type: "boolean", default: "false", description: "Whether the signature pad is required" },
    { name: "readOnly", type: "boolean", default: "false", description: "Whether the signature pad is read-only" },
    { name: "drawing", type: "SignaturePadDrawingOptions", default: "—", description: "Drawing options (stroke size, color, pressure simulation)" },
    { name: "onDraw", type: "(details) => void", default: "—", description: "Callback fired while drawing" },
    { name: "onDrawEnd", type: "(details) => void", default: "—", description: "Callback fired when a stroke ends (includes getDataUrl)" },
    { name: "class", type: "string", default: "—", description: "Additional CSS classes on the root element" },
  ];
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold">SignaturePad</h1>
    <p class="mt-2 text-km-muted-content">
      A canvas-based signature input with pressure sensitivity and data export. Built on Ark UI.
    </p>
  </div>

  <!-- Demos -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Examples</h2>

    <DemoCard
      title="Basic"
      description="Draw a signature with the default settings."
      code={`<SignaturePad />`}
    >
      <div class="max-w-md">
        <SignaturePad />
      </div>
    </DemoCard>

    <DemoCard
      title="Custom drawing options"
      description="Thicker stroke with a custom color."
      code={`<SignaturePad
  label="Sign here"
  drawing={{ size: 4, fill: "navy" }}
/>`}
    >
      <div class="max-w-md">
        <SignaturePad label="Sign here" drawing={{ size: 4, fill: "navy" }} />
      </div>
    </DemoCard>

    <DemoCard
      title="Image preview on draw end"
      description="Export the signature as a PNG data URL when drawing ends."
      code={`<script>
  let previewUrl = $state("");
<\/script>

<SignaturePad
  onDrawEnd={async (details) => {
    previewUrl = await details.getDataUrl("image/png");
  }}
/>`}
    >
      <div class="max-w-md space-y-3">
        <SignaturePad
          onDrawEnd={async (details) => {
            previewUrl = await details.getDataUrl("image/png");
          }}
        />
        {#if previewUrl}
          <div class="rounded-km-box border border-km-base-300 p-2">
            <p class="mb-1 text-xs text-km-muted-content">Preview:</p>
            <img src={previewUrl} alt="Signature preview" class="h-20" />
          </div>
        {/if}
      </div>
    </DemoCard>

    <DemoCard
      title="Disabled"
      description="Signature pad in disabled state."
      code={`<SignaturePad disabled={true} />`}
    >
      <div class="max-w-md">
        <SignaturePad disabled={true} />
      </div>
    </DemoCard>

    <DemoCard
      title="Read-only"
      description="Displays existing paths without allowing edits."
      code={`<SignaturePad readOnly={true} />`}
    >
      <div class="max-w-md">
        <SignaturePad readOnly={true} />
      </div>
    </DemoCard>

    <DemoCard
      title="Form integration"
      description="Native form submission with the name prop."
      code={`<form onsubmit={(e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const sig = data.get("signature")?.toString() ?? "(empty)";
}}>
  <SignaturePad name="signature" />
  <button type="submit">Submit</button>
</form>`}
    >
      <div class="max-w-md space-y-3">
        <form
          onsubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            formResult = data.get("signature")?.toString() ?? "(empty)";
          }}
          class="space-y-3"
        >
          <SignaturePad name="signature" />
          <button
            type="submit"
            class="rounded-km-field bg-km-primary px-4 py-2 text-sm font-medium text-km-primary-content transition-colors hover:opacity-90"
          >
            Submit
          </button>
        </form>
        {#if formResult}
          <p class="text-sm text-km-muted-content">
            Submitted: <code class="rounded bg-km-base-200 px-1.5 py-0.5 font-mono text-xs">{formResult.slice(0, 60)}…</code>
          </p>
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
