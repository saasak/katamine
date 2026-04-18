<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { browser } from '$app/environment';

	let dark = $state(browser && document.documentElement.dataset.mode === 'dark');

	function toggle() {
		dark = !dark;
		document.documentElement.dataset.mode = dark ? 'dark' : '';
		localStorage.setItem('km-mode', dark ? 'dark' : '');
	}
</script>

<button
	onclick={toggle}
	class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-2 transition-colors"
	aria-label="Toggle theme"
>
	{#if dark}
		<Sun size={18} />
	{:else}
		<Moon size={18} />
	{/if}
</button>
