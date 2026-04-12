<script lang="ts">
  import { Check, CheckCheck } from "lucide-svelte";

  interface Props {
    /** Message content */
    content: string;
    /** Timestamp string (e.g. "2:34 PM") */
    timestamp?: string;
    /** Sender name (shown for received messages) */
    sender?: string;
    /** Avatar initials (e.g. "JD") */
    avatar?: string;
    /** Whether this message was sent by the current user */
    sent?: boolean;
    /** Message status for sent messages */
    status?: "sending" | "sent" | "delivered" | "read";
    /** Additional CSS classes */
    class?: string;
  }

  let {
    content,
    timestamp,
    sender,
    avatar,
    sent = false,
    status,
    class: className,
  }: Props = $props();
</script>

<div class="flex gap-2 {sent ? 'flex-row-reverse justify-end' : 'flex-row'} {className ?? ''}">
  {#if !sent && avatar}
    <div
      class="flex size-8 shrink-0 items-center justify-center rounded-full bg-km-secondary text-xs font-medium text-km-secondary-content"
    >
      {avatar}
    </div>
  {/if}

  <div class="flex max-w-[75%] flex-col {sent ? 'items-end' : 'items-start'}">
    {#if !sent && sender}
      <span class="mb-1 text-xs font-medium text-km-muted-content">{sender}</span>
    {/if}

    <div
      class="rounded-km-box px-3 py-2 text-sm {sent
        ? 'rounded-br-sm bg-km-primary text-km-primary-content'
        : 'rounded-bl-sm bg-km-base-200 text-km-base-content'}"
    >
      {content}
    </div>

    {#if timestamp || (sent && status)}
      <div class="mt-1 flex items-center gap-1 text-xs text-km-muted-content">
        {#if timestamp}
          <span>{timestamp}</span>
        {/if}
        {#if sent && status}
          {#if status === "sending"}
            <span class="opacity-50">...</span>
          {:else if status === "sent"}
            <Check size={12} />
          {:else if status === "delivered"}
            <CheckCheck size={12} />
          {:else if status === "read"}
            <CheckCheck size={12} class="text-km-primary" />
          {/if}
        {/if}
      </div>
    {/if}
  </div>
</div>
