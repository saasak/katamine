<script lang="ts">
  import { ColorPicker } from "$ui/color-picker";
  import DemoCard from "$lib/components/DemoCard.svelte";
  import PropsTable from "$lib/components/PropsTable.svelte";

  const presets = [
    "#ff0000",
    "#ff8800",
    "#ffff00",
    "#00ff00",
    "#0088ff",
    "#0000ff",
    "#8800ff",
    "#ff00ff",
    "#000000",
    "#ffffff",
  ];

  let controlledValue = $state("#6366f1");
  let formResult = $state("");

  const propsData = [
    { name: "value", type: "string", default: "—", description: "Controlled color value (hex string). Supports bind:value" },
    { name: "defaultValue", type: "string", default: '"#000000"', description: "Initial color for uncontrolled mode" },
    { name: "name", type: "string", default: "—", description: "Form field name for native submission" },
    { name: "disabled", type: "boolean", default: "false", description: "Disable the color picker" },
    { name: "readOnly", type: "boolean", default: "false", description: "Make the picker read-only" },
    { name: "required", type: "boolean", default: "false", description: "Mark as required for form validation" },
    { name: "inline", type: "boolean", default: "false", description: "Render picker inline instead of as a popover" },
    { name: "format", type: '"rgba" | "hsla" | "hsba" | "hexa"', default: "—", description: "Controlled color format" },
    { name: "defaultFormat", type: '"rgba" | "hsla" | "hsba" | "hexa"', default: '"rgba"', description: "Initial color format" },
    { name: "closeOnSelect", type: "boolean", default: "false", description: "Close popover when a swatch is selected" },
    { name: "presets", type: "string[]", default: "—", description: "Array of preset color hex strings to display as swatches" },
    { name: "onValueChange", type: "(details) => void", default: "—", description: "Callback when color value changes" },
    { name: "onValueChangeEnd", type: "(details) => void", default: "—", description: "Callback when color adjustment completes" },
    { name: "onFormatChange", type: "(details) => void", default: "—", description: "Callback when color format changes" },
    { name: "onOpenChange", type: "(details) => void", default: "—", description: "Callback when popover open state changes" },
    { name: "class", type: "string", default: "—", description: "Additional CSS classes on the root element" },
  ];
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold">ColorPicker</h1>
    <p class="mt-2 text-km-muted-content">
      Interactive color selection with area picker, channel sliders, preset swatches, and eyedropper support. Built on Ark UI.
    </p>
  </div>

  <!-- Demos -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Examples</h2>

    <DemoCard
      title="Basic"
      description="Click the swatch trigger to open the color picker popover."
      code={`<ColorPicker defaultValue="#6366f1" />`}
    >
      <div class="max-w-sm">
        <ColorPicker defaultValue="#6366f1" />
      </div>
    </DemoCard>

    <DemoCard
      title="With presets"
      description="Provide preset color swatches for quick selection."
      code={`<ColorPicker
  defaultValue="#ff0000"
  presets={["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#0088ff", "#0000ff"]}
/>`}
    >
      <div class="max-w-sm">
        <ColorPicker defaultValue="#ff0000" {presets} />
      </div>
    </DemoCard>

    <DemoCard
      title="Inline"
      description="Render the picker inline without a popover trigger."
      code={`<ColorPicker defaultValue="#10b981" inline={true} />`}
    >
      <div class="max-w-xs">
        <ColorPicker defaultValue="#10b981" inline={true} {presets} />
      </div>
    </DemoCard>

    <DemoCard
      title="Controlled"
      description="Bind the value for two-way data flow."
      code={`<script>
  let color = $state("#6366f1");
</script>

<ColorPicker bind:value={color} />
<p>Selected: {color}</p>`}
    >
      <div class="max-w-sm space-y-3">
        <ColorPicker bind:value={controlledValue} />
        <p class="text-sm text-km-muted-content">
          Selected: <code class="rounded bg-km-base-200 px-1.5 py-0.5 font-mono text-xs">{controlledValue}</code>
        </p>
      </div>
    </DemoCard>

    <DemoCard
      title="Disabled"
      description="Color picker in disabled state."
      code={`<ColorPicker defaultValue="#6366f1" disabled={true} />`}
    >
      <div class="max-w-sm">
        <ColorPicker defaultValue="#6366f1" disabled={true} />
      </div>
    </DemoCard>

    <DemoCard
      title="Form integration"
      description="Native form submission with the name prop."
      code={`<form onsubmit={handleSubmit}>
  <ColorPicker name="color" defaultValue="#6366f1" />
  <button type="submit">Submit</button>
</form>`}
    >
      <div class="max-w-sm space-y-3">
        <form
          onsubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            formResult = data.get("color")?.toString() ?? "(empty)";
          }}
          class="space-y-3"
        >
          <ColorPicker name="color" defaultValue="#6366f1" />
          <button
            type="submit"
            class="rounded-km-field bg-km-primary px-4 py-2 text-sm font-medium text-km-primary-content transition-colors hover:opacity-90"
          >
            Submit
          </button>
        </form>
        {#if formResult}
          <p class="text-sm text-km-muted-content">
            Submitted: <code class="rounded bg-km-base-200 px-1.5 py-0.5 font-mono text-xs">{formResult}</code>
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
