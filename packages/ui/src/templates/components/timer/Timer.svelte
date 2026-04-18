<script lang="ts">
	import { Timer } from '@ark-ui/svelte/timer';
	import { Play, Pause, RotateCcw } from 'lucide-svelte';
	import type { TimePart, TickDetails } from '@zag-js/timer';

	interface Props {
		/** Count down instead of up */
		countdown?: boolean;
		/** Start value in milliseconds */
		startMs?: number;
		/** Target/stop value in milliseconds */
		targetMs?: number;
		/** Auto-start on mount */
		autoStart?: boolean;
		/** Tick interval in milliseconds */
		interval?: number;
		/** Time segments to display */
		segments?: TimePart[];
		/** Show start, pause, resume, and reset controls */
		showControls?: boolean;
		/** Disable all interaction */
		disabled?: boolean;
		/** Callback on each tick */
		onTick?: (details: TickDetails) => void;
		/** Callback when the timer completes */
		onComplete?: () => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		countdown = false,
		startMs,
		targetMs,
		autoStart = false,
		interval = 1000,
		segments = ['hours', 'minutes', 'seconds'],
		showControls = true,
		disabled = false,
		onTick,
		onComplete,
		class: className
	}: Props = $props();
</script>

<div
	inert={disabled || undefined}
	class={disabled ? 'pointer-events-none opacity-50' : undefined}
	aria-disabled={disabled || undefined}
>
	<Timer.Root
		{countdown}
		{startMs}
		{targetMs}
		{autoStart}
		{interval}
		{onTick}
		{onComplete}
		class="inline-flex flex-col items-center gap-4{className ? ` ${className}` : ''}"
	>
		<Timer.Area class="flex items-center gap-0.5">
			{#each segments as seg, i (seg)}
				<Timer.Item
					type={seg}
					class="rounded-km-box bg-km-base-200 text-km-base-content flex h-16 w-14 items-center justify-center font-mono text-3xl font-bold tabular-nums"
				/>
				{#if i < segments.length - 1}
					<Timer.Separator class="text-km-muted-content px-0.5 text-2xl font-bold"
						>:</Timer.Separator
					>
				{/if}
			{/each}
		</Timer.Area>

		{#if showControls}
			<Timer.Control class="flex items-center gap-2">
				<Timer.Context>
					{#snippet api(timerCtx)}
						{#if !timerCtx().running && !timerCtx().paused}
							<Timer.ActionTrigger
								action="start"
								class="rounded-km-field bg-km-primary text-km-primary-content inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:opacity-90"
							>
								<Play size={14} />
								Start
							</Timer.ActionTrigger>
						{:else if timerCtx().running}
							<Timer.ActionTrigger
								action="pause"
								class="rounded-km-field border-km-base-300 bg-km-base-200 text-km-base-content hover:bg-km-muted inline-flex cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-sm font-medium transition-colors duration-150"
							>
								<Pause size={14} />
								Pause
							</Timer.ActionTrigger>
						{:else}
							<Timer.ActionTrigger
								action="resume"
								class="rounded-km-field bg-km-primary text-km-primary-content inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:opacity-90"
							>
								<Play size={14} />
								Resume
							</Timer.ActionTrigger>
						{/if}

						{#if timerCtx().running || timerCtx().paused}
							<Timer.ActionTrigger
								action="reset"
								class="rounded-km-field border-km-base-300 bg-km-base-200 text-km-base-content hover:bg-km-muted inline-flex cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-sm font-medium transition-colors duration-150"
							>
								<RotateCcw size={14} />
								Reset
							</Timer.ActionTrigger>
						{/if}
					{/snippet}
				</Timer.Context>
			</Timer.Control>
		{/if}
	</Timer.Root>
</div>
