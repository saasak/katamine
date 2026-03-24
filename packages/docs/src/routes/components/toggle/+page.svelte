<script lang="ts">
  import { Toggle } from "$ui/toggle";
  import DemoCard from "$lib/components/DemoCard.svelte";
  import PropsTable from "$lib/components/PropsTable.svelte";
  import { Bold, Italic, Underline } from "lucide-svelte";

  let controlled = $state(false);
  let formResult = $state("");

  const propsData = [
    { name: "pressed", type: "boolean", default: "—", description: "Controlled pressed state. Supports bind:pressed" },
    { name: "defaultPressed", type: "boolean", default: "—", description: "Initial state for uncontrolled mode" },
    { name: "name", type: "string", default: "—", description: "Form field name" },
    { name: "disabled", type: "boolean", default: "false", description: "Disable the toggle" },
    { name: "onPressedChange", type: "(pressed: boolean) => void", default: "—", description: "Callback when pressed state changes" },
    { name: "class", type: "string", default: "—", description: "Additional CSS classes on the root element" },
    { name: "children", type: "Snippet", default: "—", description: "Button content (label, icons, etc.)" },
  ];
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold">Toggle</h1>
    <p class="mt-2 text-km-muted-content">
      A two-state button that can be either on or off. Built on Ark UI.
    </p>
  </div>

  <!-- Demos -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Examples</h2>

    <DemoCard
      title="Basic"
      description="A simple toggle with a text label."
      code={`<Toggle>Bold</Toggle>`}
    >
      <Toggle>Bold</Toggle>
    </DemoCard>

    <DemoCard
      title="With icons"
      description="Toggles with icons for formatting actions."
      code={`<script>
  import { Bold, Italic, Underline } from "lucide-svelte";
<\/script>

<div class="flex gap-2">
  <Toggle><Bold size={16} /> Bold</Toggle>
  <Toggle><Italic size={16} /> Italic</Toggle>
  <Toggle><Underline size={16} /> Underline</Toggle>
</div>`}
    >
      <div class="flex gap-2">
        <Toggle><Bold size={16} /> Bold</Toggle>
        <Toggle><Italic size={16} /> Italic</Toggle>
        <Toggle><Underline size={16} /> Underline</Toggle>
      </div>
    </DemoCard>

    <DemoCard
      title="Controlled"
      description="Bind to external state with bind:pressed."
      code={`<script>
  let pressed = $state(false);
<\/script>

<Toggle bind:pressed>
  {pressed ? "On" : "Off"}
</Toggle>
<p class="text-sm text-km-muted-content">State: {pressed}</p>`}
    >
      <div class="space-y-2">
        <Toggle bind:pressed={controlled}>
          {controlled ? "On" : "Off"}
        </Toggle>
        <p class="text-sm text-km-muted-content">State: {controlled}</p>
      </div>
    </DemoCard>

    <DemoCard
      title="Disabled"
      description="Toggle in disabled state."
      code={`<div class="flex gap-2">
  <Toggle disabled>Disabled off</Toggle>
  <Toggle disabled defaultPressed>Disabled on</Toggle>
</div>`}
    >
      <div class="flex gap-2">
        <Toggle disabled>Disabled off</Toggle>
        <Toggle disabled defaultPressed>Disabled on</Toggle>
      </div>
    </DemoCard>

    <DemoCard
      title="Form integration"
      description="Use the name prop to include the toggle in native form submission."
      code={`<form onsubmit={handleSubmit}>
  <Toggle name="bold" defaultPressed>Bold</Toggle>
  <button type="submit">Submit</button>
</form>`}
    >
      <div class="space-y-3">
        <form
          onsubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            formResult = data.get("bold") != null ? "bold=on" : "bold=(not set)";
          }}
          class="flex items-center gap-3"
        >
          <Toggle name="bold"><Bold size={16} /> Bold</Toggle>
          <button
            type="submit"
            class="rounded-km-field bg-km-primary px-4 py-1.5 text-sm font-medium text-km-primary-content transition-colors hover:opacity-90"
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
