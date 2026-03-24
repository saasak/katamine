<script lang="ts">
  import { Tabs } from "$ui/tabs";
  import DemoCard from "$lib/components/DemoCard.svelte";
  import PropsTable from "$lib/components/PropsTable.svelte";

  const basicTabs = [
    { value: "account", label: "Account" },
    { value: "password", label: "Password" },
    { value: "notifications", label: "Notifications" },
  ];

  const withDisabled = [
    { value: "general", label: "General" },
    { value: "security", label: "Security", disabled: true },
    { value: "billing", label: "Billing" },
  ];

  let formResult = $state("");

  const propsData = [
    { name: "items", type: "TabItem[]", default: "—", description: "Array of tab definitions with value, label, and optional disabled" },
    { name: "value", type: "string", default: "—", description: "Controlled selected tab value. Supports bind:value" },
    { name: "defaultValue", type: "string", default: "—", description: "Initial tab value for uncontrolled mode" },
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction of the tab list" },
    { name: "activationMode", type: '"manual" | "automatic"', default: '"automatic"', description: "Whether tabs activate on focus (automatic) or on click (manual)" },
    { name: "loopFocus", type: "boolean", default: "true", description: "Loop keyboard navigation at list boundaries" },
    { name: "deselectable", type: "boolean", default: "false", description: "Allow deselecting the active tab by clicking it again" },
    { name: "disabled", type: "boolean", default: "false", description: "Disable all tabs" },
    { name: "onValueChange", type: "(details: { value: string }) => void", default: "—", description: "Callback when the selected tab changes" },
    { name: "onFocusChange", type: "(details: { focusedValue: string }) => void", default: "—", description: "Callback when the focused tab changes" },
    { name: "content", type: "Snippet<[string]>", default: "—", description: "Render function for tab panel content. Receives the tab value" },
    { name: "name", type: "string", default: "—", description: "Hidden input name for form submission" },
    { name: "class", type: "string", default: "—", description: "Additional CSS classes on the root element" },
  ];
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold">Tabs</h1>
    <p class="mt-2 text-km-muted-content">
      Tabbed interface for organizing content into panels. Supports keyboard navigation, vertical layout, and form integration. Built on Ark UI.
    </p>
  </div>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Examples</h2>

    <DemoCard
      title="Basic"
      description="Horizontal tabs with automatic activation on focus."
      code={`<Tabs
  items={[
    { value: "account", label: "Account" },
    { value: "password", label: "Password" },
    { value: "notifications", label: "Notifications" },
  ]}
  defaultValue="account"
>
  {#snippet content(value)}
    {#if value === "account"}Account settings here.{/if}
    {#if value === "password"}Password settings here.{/if}
    {#if value === "notifications"}Notification preferences.{/if}
  {/snippet}
</Tabs>`}
    >
      <Tabs items={basicTabs} defaultValue="account">
        {#snippet content(value)}
          {#if value === "account"}
            <p class="text-sm text-km-base-content">Manage your account details and preferences.</p>
          {/if}
          {#if value === "password"}
            <p class="text-sm text-km-base-content">Update your password and security settings.</p>
          {/if}
          {#if value === "notifications"}
            <p class="text-sm text-km-base-content">Configure email and push notification preferences.</p>
          {/if}
        {/snippet}
      </Tabs>
    </DemoCard>

    <DemoCard
      title="Vertical orientation"
      description="Tabs laid out vertically with up/down arrow navigation."
      code={`<Tabs items={tabs} orientation="vertical" defaultValue="account">
  {#snippet content(value)}...{/snippet}
</Tabs>`}
    >
      <div class="flex">
        <Tabs items={basicTabs} orientation="vertical" defaultValue="account">
          {#snippet content(value)}
            {#if value === "account"}
              <p class="pl-4 text-sm text-km-base-content">Account panel content.</p>
            {/if}
            {#if value === "password"}
              <p class="pl-4 text-sm text-km-base-content">Password panel content.</p>
            {/if}
            {#if value === "notifications"}
              <p class="pl-4 text-sm text-km-base-content">Notifications panel content.</p>
            {/if}
          {/snippet}
        </Tabs>
      </div>
    </DemoCard>

    <DemoCard
      title="Manual activation"
      description="Tabs only activate on click or Enter, not on focus."
      code={`<Tabs items={tabs} activationMode="manual" defaultValue="account">
  {#snippet content(value)}...{/snippet}
</Tabs>`}
    >
      <Tabs items={basicTabs} activationMode="manual" defaultValue="account">
        {#snippet content(value)}
          {#if value === "account"}
            <p class="text-sm text-km-base-content">Account — activated manually.</p>
          {/if}
          {#if value === "password"}
            <p class="text-sm text-km-base-content">Password — activated manually.</p>
          {/if}
          {#if value === "notifications"}
            <p class="text-sm text-km-base-content">Notifications — activated manually.</p>
          {/if}
        {/snippet}
      </Tabs>
    </DemoCard>

    <DemoCard
      title="Disabled tabs"
      description="Individual tabs can be disabled while others remain interactive."
      code={`<Tabs
  items={[
    { value: "general", label: "General" },
    { value: "security", label: "Security", disabled: true },
    { value: "billing", label: "Billing" },
  ]}
  defaultValue="general"
>
  {#snippet content(value)}...{/snippet}
</Tabs>`}
    >
      <Tabs items={withDisabled} defaultValue="general">
        {#snippet content(value)}
          {#if value === "general"}
            <p class="text-sm text-km-base-content">General settings.</p>
          {/if}
          {#if value === "security"}
            <p class="text-sm text-km-base-content">Security settings (unreachable).</p>
          {/if}
          {#if value === "billing"}
            <p class="text-sm text-km-base-content">Billing and payment info.</p>
          {/if}
        {/snippet}
      </Tabs>
    </DemoCard>

    <DemoCard
      title="Form integration"
      description="Hidden input submits the selected tab value with the form."
      code={`<form onsubmit={handleSubmit}>
  <Tabs items={tabs} name="tab" defaultValue="account">
    {#snippet content(value)}...{/snippet}
  </Tabs>
  <button type="submit">Submit</button>
</form>`}
    >
      <div class="space-y-3">
        <form
          onsubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            formResult = data.get("tab")?.toString() ?? "(empty)";
          }}
          class="space-y-3"
        >
          <Tabs items={basicTabs} name="tab" defaultValue="account">
            {#snippet content(value)}
              {#if value === "account"}
                <p class="text-sm text-km-base-content">Account tab selected.</p>
              {/if}
              {#if value === "password"}
                <p class="text-sm text-km-base-content">Password tab selected.</p>
              {/if}
              {#if value === "notifications"}
                <p class="text-sm text-km-base-content">Notifications tab selected.</p>
              {/if}
            {/snippet}
          </Tabs>
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

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Props</h2>
    <PropsTable items={propsData} />
  </section>
</div>
