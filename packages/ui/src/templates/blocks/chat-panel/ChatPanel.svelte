<script lang="ts">
	import { SendHorizontal } from 'lucide-svelte';
	import ChatBubble from './ChatBubble.svelte';
	import type { Snippet } from 'svelte';

	export interface ChatMessage {
		id: string;
		content: string;
		timestamp?: string;
		sender?: string;
		avatar?: string;
		sent?: boolean;
		status?: 'sending' | 'sent' | 'delivered' | 'read';
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
		placeholder = 'Type a message...',
		disabled = false,
		header,
		class: className
	}: Props = $props();

	let inputValue = $state('');
	let viewportEl: HTMLElement | undefined = $state();
	let textareaEl: HTMLTextAreaElement | undefined = $state();

	const showHeader = $derived(!!title || !!header);

	function scrollToBottom() {
		if (viewportEl) {
			viewportEl.scrollTop = viewportEl.scrollHeight;
		}
	}

	$effect(() => {
		void messages.length;
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
		inputValue = '';
		resetTextareaHeight();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}

	function autoResize(e: Event) {
		const el = e.target as HTMLTextAreaElement;
		el.style.height = 'auto';
		el.style.height = Math.min(el.scrollHeight, 120) + 'px';
	}

	function resetTextareaHeight() {
		if (textareaEl) {
			textareaEl.style.height = 'auto';
		}
	}
</script>

<div
	class="rounded-km-box border-km-base-300 bg-km-base-100 flex min-w-[350px] flex-col overflow-hidden border {className ??
		''}"
>
	<!-- Header -->
	{#if showHeader}
		<div class="border-km-base-300 bg-km-base-200 flex items-center gap-3 border-b px-4 py-3">
			{#if header}
				{@render header()}
			{:else}
				{#if headerAvatar}
					<div
						class="bg-km-primary text-km-primary-content flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium"
					>
						{headerAvatar}
					</div>
				{/if}
				<div class="min-w-0 flex-1">
					{#if title}
						<div class="text-km-base-content truncate text-sm font-semibold">{title}</div>
					{/if}
					{#if subtitle}
						<div class="text-km-muted-content truncate text-xs">{subtitle}</div>
					{/if}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Messages -->
	<div bind:this={viewportEl} class="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
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
	<form onsubmit={handleSubmit} class="border-km-base-300 flex items-end gap-2 border-t p-3">
		<textarea
			bind:this={textareaEl}
			bind:value={inputValue}
			onkeydown={handleKeydown}
			oninput={autoResize}
			{placeholder}
			{disabled}
			rows={1}
			class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content placeholder:text-km-muted-content focus:border-km-primary focus:ring-km-primary flex-1 resize-none border px-3 py-2 text-sm transition-colors duration-150 outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
		></textarea>
		<button
			type="submit"
			disabled={disabled || !inputValue.trim()}
			class="bg-km-primary text-km-primary-content flex aspect-square shrink-0 items-center justify-center
			self-stretch rounded-full p-1 transition-colors duration-150
			hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<SendHorizontal size={20} />
		</button>
	</form>
</div>
