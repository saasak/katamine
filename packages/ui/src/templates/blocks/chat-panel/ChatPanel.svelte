<script lang="ts">
  import { SendHorizontal } from "lucide-svelte";
  import ChatBubble from "./ChatBubble.svelte";
  import type { Snippet } from "svelte";

  export interface ChatMessage {
    id: string;
    content: string;
    timestamp?: string;
    sender?: string;
    avatar?: string;
    sent?: boolean;
    status?: "sending" | "sent" | "delivered" | "read";
  }

  interface Props {
    /** Array of messages to display */
    messages?: ChatMessage[];
    /** Callback when a message is submitted */
    onSend?: (message: string) => void;
    /** Header title (e.g. contact name) */
    title?: string;
    /** Header subtitle (e.g. "Online") */
    subtitle?: string;
    /** Header avatar initials */
    headerAvatar?: string;
    /** Placeholder text for the input */
    placeholder?: string;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Custom header snippet (overrides title/subtitle/headerAvatar) */
    header?: Snippet;
    /** Additional CSS classes on the root container */
    class?: string;
  }

  let {
    messages = [],
    onSend,
    title,
    subtitle,
    headerAvatar,
    placeholder = "Type a message...",
    disabled = false,
    header,
    class: className,
  }: Props = $props();

  let inputValue = $state("");
  let viewportEl: HTMLElement | undefined = $state();
  let textareaEl: HTMLTextAreaElement | undefined = $state();

  const showHeader = $derived(!!title || !!header);

  function scrollToBottom() {
    if (viewportEl) {
      viewportEl.scrollTop = viewportEl.scrollHeight;
    }
  }

  $effect(() => {
    messages.length;
    // Tick to let DOM update before scrolling
    requestAnimationFrame(scrollToBottom);
  });

  function handleSubmit(e: Event) {
    e.preventDefault();
    send();
  }

  function send() {
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    inputValue = "";
    resetTextareaHeight();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function autoResize(e: Event) {
    const el = e.target as HTMLTextAreaElement;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }

  function resetTextareaHeight() {
    if (textareaEl) {
      textareaEl.style.height = "auto";
    }
  }
</script>

<div
  class="flex min-w-[350px] flex-col overflow-hidden rounded-km-box border border-km-base-300 bg-km-base-100 {className ?? ''}"
>
  <!-- Header -->
  {#if showHeader}
    <div class="flex items-center gap-3 border-b border-km-base-300 bg-km-base-200 px-4 py-3">
      {#if header}
        {@render header()}
      {:else}
        {#if headerAvatar}
          <div
            class="flex size-10 shrink-0 items-center justify-center rounded-full bg-km-primary text-sm font-medium text-km-primary-content"
          >
            {headerAvatar}
          </div>
        {/if}
        <div class="min-w-0 flex-1">
          {#if title}
            <div class="truncate text-sm font-semibold text-km-base-content">{title}</div>
          {/if}
          {#if subtitle}
            <div class="truncate text-xs text-km-muted-content">{subtitle}</div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}

  <!-- Messages -->
  <div
    bind:this={viewportEl}
    class="flex flex-1 flex-col gap-3 overflow-y-auto p-4"
  >
    {#each messages as msg (msg.id)}
      <ChatBubble
        content={msg.content}
        timestamp={msg.timestamp}
        sender={msg.sender}
        avatar={msg.avatar}
        sent={msg.sent}
        status={msg.status}
      />
    {/each}
  </div>

  <!-- Input -->
  <form
    onsubmit={handleSubmit}
    class="flex items-end gap-2 border-t border-km-base-300 p-3"
  >
    <textarea
      bind:this={textareaEl}
      bind:value={inputValue}
      onkeydown={handleKeydown}
      oninput={autoResize}
      {placeholder}
      {disabled}
      rows={1}
      class="flex-1 resize-none rounded-km-field border border-km-base-300 bg-km-base-100 px-3 py-2 text-sm text-km-base-content placeholder:text-km-muted-content outline-none transition-colors duration-150 focus:border-km-primary focus:ring-1 focus:ring-km-primary disabled:cursor-not-allowed disabled:opacity-50"
    ></textarea>
    <button
      type="submit"
      disabled={disabled || !inputValue.trim()}
      class="flex aspect-square self-stretch shrink-0 items-center justify-center rounded-full
			bg-km-primary text-km-primary-content transition-colors duration-150 hover:opacity-90
			disabled:cursor-not-allowed disabled:opacity-50 p-1"
    >
      <SendHorizontal size={20} />
    </button>
  </form>
</div>
