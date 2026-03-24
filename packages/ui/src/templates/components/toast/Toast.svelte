<script lang="ts">
  import { Toaster, Toast, type CreateToasterReturn } from "@ark-ui/svelte/toast";
  import { X, CheckCircle, AlertCircle, Info, Loader2 } from "lucide-svelte";

  interface Props {
    toaster: CreateToasterReturn;
    class?: string;
  }

  let {
    toaster,
    class: className,
  }: Props = $props();

  function iconForType(type: string | undefined) {
    switch (type) {
      case "success": return CheckCircle;
      case "error": return AlertCircle;
      case "loading": return Loader2;
      default: return Info;
    }
  }

  function colorForType(type: string | undefined) {
    switch (type) {
      case "success": return "text-km-success";
      case "error": return "text-km-error";
      case "loading": return "text-km-muted-content animate-spin";
      default: return "text-km-info";
    }
  }
</script>

<Toaster {toaster} class={className ?? ""}>
  {#snippet children(toast)}
    <Toast.Root
      class="flex w-80 items-start gap-3 rounded-km-box border border-km-base-300 bg-km-base-100 p-4 shadow-km-lg transition-all duration-300 ease-out data-[state=open]:translate-x-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100 data-[state=closed]:translate-x-2 data-[state=closed]:opacity-0"
    >
      {@const Icon = iconForType(toast().type)}
      <span class="mt-0.5 flex-shrink-0 {colorForType(toast().type)}">
        <Icon size={18} />
      </span>

      <div class="min-w-0 flex-1">
        <Toast.Title class="text-sm font-semibold text-km-base-content" />
        <Toast.Description class="mt-0.5 text-sm text-km-muted-content" />
        {#if toast().action}
          <Toast.ActionTrigger
            class="mt-2 cursor-pointer text-sm font-medium text-km-primary transition-colors duration-150 hover:underline"
          >
            {toast().action?.label}
          </Toast.ActionTrigger>
        {/if}
      </div>

      {#if toast().closable !== false}
        <Toast.CloseTrigger
          class="flex-shrink-0 cursor-pointer rounded-km-selector p-0.5 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content"
        >
          <X size={14} />
        </Toast.CloseTrigger>
      {/if}
    </Toast.Root>
  {/snippet}
</Toaster>
