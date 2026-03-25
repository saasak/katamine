<script lang="ts">
  import { Tour } from "$ui/tour";
  import DemoCard from "$lib/components/DemoCard.svelte";
  import PropsTable from "$lib/components/PropsTable.svelte";

  const basicSteps = [
    {
      id: "welcome",
      title: "Welcome to Katamine",
      description: "This is a guided tour of the Katamine UI library. Let's explore the components together.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "components",
      title: "Browse Components",
      description: "Use the sidebar to navigate between available components. Each has live demos and a props table.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "done",
      title: "You're all set!",
      description: "You now know the basics. Start building with Katamine components.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ];

  const targetedSteps = [
    {
      id: "heading",
      title: "Component heading",
      description: "Every component page starts with a title and short description.",
      target: () => document.querySelector<HTMLElement>("#tour-demo-heading"),
      placement: "bottom" as const,
      backdrop: true,
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "demos",
      title: "Live demos",
      description: "Each component ships with interactive demos you can explore directly on the page.",
      target: () => document.querySelector<HTMLElement>("#tour-demo-section"),
      placement: "top" as const,
      backdrop: true,
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Done", action: "dismiss" as const },
      ],
    },
  ];

  const backdropSteps = [
    {
      id: "step1",
      title: "Step with backdrop",
      description: "A semi-transparent backdrop dims everything except the spotlight area.",
      backdrop: true,
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "step2",
      title: "Step without backdrop",
      description: "Steps can also be shown without a backdrop for a less intrusive experience.",
      backdrop: false,
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ];

  const propsData = [
    { name: "steps", type: "StepDetails[]", default: "—", description: "Tour steps defining content and target elements" },
    { name: "stepId", type: "string | null", default: "—", description: "Controlled step ID. Set to a step's id to open, null to close" },
    { name: "closeOnInteractOutside", type: "boolean", default: "true", description: "Close tour when clicking outside the content panel" },
    { name: "closeOnEscape", type: "boolean", default: "true", description: "Close tour on Escape key press" },
    { name: "keyboardNavigation", type: "boolean", default: "true", description: "Enable left/right arrow key navigation between steps" },
    { name: "preventInteraction", type: "boolean", default: "false", description: "Prevent interaction with the page while tour is open" },
    { name: "spotlightOffset", type: "{ x: number; y: number }", default: "{ x: 10, y: 10 }", description: "Spotlight padding around the target element (px)" },
    { name: "spotlightRadius", type: "number", default: "4", description: "Spotlight border-radius in pixels" },
    { name: "disabled", type: "boolean", default: "false", description: "Disable the tour (prevents starting)" },
    { name: "onStepChange", type: "(details: StepChangeDetails) => void", default: "—", description: "Callback when the current step changes" },
    { name: "onStatusChange", type: "(details: StatusChangeDetails) => void", default: "—", description: "Callback when tour status changes (started, dismissed, completed)" },
    { name: "class", type: "string", default: "—", description: "Additional CSS classes on the content panel" },
    { name: "children", type: "Snippet<[{ start: (id?: string) => void }]>", default: "—", description: "Render snippet for trigger content — receives { start } to programmatically begin the tour" },
  ];
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold">Tour</h1>
    <p class="mt-2 text-km-muted-content">
      Guided step-by-step walkthrough with spotlight, backdrop, and popper-positioned tooltips. Built on Ark UI.
    </p>
  </div>

  <!-- Demos -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Examples</h2>

    <DemoCard
      title="Basic (dialog steps)"
      description="Dialog-style steps without a target element — centered on screen."
      code={`const steps = [
  { id: "welcome", title: "Welcome", description: "...", actions: [{ label: "Next", action: "next" }] },
  { id: "done", title: "Done!", description: "...", actions: [{ label: "Finish", action: "dismiss" }] },
];

<Tour {steps}>
  {#snippet children({ start })}
    <button onclick={() => start()}>Start Tour</button>
  {/snippet}
</Tour>`}
    >
      <Tour steps={basicSteps}>
        {#snippet children({ start })}
          <button
            onclick={() => start()}
            class="rounded-km-field bg-km-primary px-4 py-2 text-sm font-medium text-km-primary-content transition-colors hover:opacity-90"
          >
            Start Tour
          </button>
        {/snippet}
      </Tour>
    </DemoCard>

    <DemoCard
      title="Targeted steps with backdrop"
      description="Steps that highlight specific elements on the page using the target prop."
      code={`const steps = [
  {
    id: "heading",
    title: "Component heading",
    description: "Every component page starts with a title.",
    target: () => document.querySelector("#tour-demo-heading"),
    placement: "bottom",
    backdrop: true,
    actions: [{ label: "Next", action: "next" }],
  },
  ...
];

<Tour {steps}>
  {#snippet children({ start })}
    <button onclick={() => start()}>Highlight Elements</button>
  {/snippet}
</Tour>`}
    >
      <div class="space-y-3">
        <p id="tour-demo-heading" class="text-sm font-semibold text-km-base-content">← This element gets highlighted</p>
        <p id="tour-demo-section" class="text-sm text-km-muted-content">← This one too</p>
        <Tour steps={targetedSteps}>
          {#snippet children({ start })}
            <button
              onclick={() => start()}
              class="rounded-km-field bg-km-primary px-4 py-2 text-sm font-medium text-km-primary-content transition-colors hover:opacity-90"
            >
              Highlight Elements
            </button>
          {/snippet}
        </Tour>
      </div>
    </DemoCard>

    <DemoCard
      title="Backdrop vs no backdrop"
      description="Individual steps control whether a backdrop is shown via the backdrop step property."
      code={`const steps = [
  { id: "step1", title: "With backdrop", description: "...", backdrop: true, actions: [...] },
  { id: "step2", title: "No backdrop", description: "...", backdrop: false, actions: [...] },
];

<Tour {steps}>
  {#snippet children({ start })}
    <button onclick={() => start()}>Start</button>
  {/snippet}
</Tour>`}
    >
      <Tour steps={backdropSteps}>
        {#snippet children({ start })}
          <button
            onclick={() => start()}
            class="rounded-km-field border border-km-base-300 px-4 py-2 text-sm font-medium text-km-base-content transition-colors hover:bg-km-base-200"
          >
            Toggle Backdrop
          </button>
        {/snippet}
      </Tour>
    </DemoCard>

    <DemoCard
      title="Start at specific step"
      description="Pass a step ID to start() to begin the tour at a specific point."
      code={`<Tour {steps}>
  {#snippet children({ start })}
    <div class="flex gap-2">
      <button onclick={() => start("step1")}>Start at Step 1</button>
      <button onclick={() => start("step2")}>Start at Step 2</button>
    </div>
  {/snippet}
</Tour>`}
    >
      <Tour steps={basicSteps}>
        {#snippet children({ start })}
          <div class="flex gap-2">
            <button
              onclick={() => start("welcome")}
              class="rounded-km-field bg-km-primary px-4 py-2 text-sm font-medium text-km-primary-content transition-colors hover:opacity-90"
            >
              Start from Step 1
            </button>
            <button
              onclick={() => start("components")}
              class="rounded-km-field border border-km-base-300 px-4 py-2 text-sm font-medium text-km-base-content transition-colors hover:bg-km-base-200"
            >
              Jump to Step 2
            </button>
          </div>
        {/snippet}
      </Tour>
    </DemoCard>

    <DemoCard
      title="Disabled"
      description="Disabled tour — the start callback is still exposed but the tour will not open."
      code={`<Tour {steps} disabled>
  {#snippet children({ start })}
    <button onclick={() => start()} disabled>Start Tour (Disabled)</button>
  {/snippet}
</Tour>`}
    >
      <Tour steps={basicSteps} disabled>
        {#snippet children({ start })}
          <button
            onclick={() => start()}
            disabled
            class="cursor-not-allowed rounded-km-field border border-km-base-300 px-4 py-2 text-sm font-medium text-km-muted-content opacity-50"
          >
            Start Tour (Disabled)
          </button>
        {/snippet}
      </Tour>
    </DemoCard>
  </section>

  <!-- Props table -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Props</h2>
    <PropsTable items={propsData} />
  </section>
</div>
