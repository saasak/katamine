<script lang="ts">
	import {
		DatePicker,
		type DatePickerValueChangeDetails,
		type DateValue
	} from '@ark-ui/svelte/date-picker';
	import { Portal } from '@ark-ui/svelte/portal';
	import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-svelte';

	interface Props {
		/** Controlled selected date(s). Supports bind:value */
		value?: DateValue[];
		/** Initial value for uncontrolled mode */
		defaultValue?: DateValue[];
		/** Form field name for native submission */
		name?: string;
		/** Placeholder text in the input */
		placeholder?: string;
		/** Selection mode: single date, multiple, or range */
		selectionMode?: 'single' | 'multiple' | 'range';
		/** Disable the date picker */
		disabled?: boolean;
		/** Mark as read-only */
		readOnly?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Close calendar after selection (ignored for multiple mode) */
		closeOnSelect?: boolean;
		/** Minimum selectable date */
		min?: DateValue;
		/** Maximum selectable date */
		max?: DateValue;
		/** Number of months to display */
		numOfMonths?: number;
		/** First day of the week (0=Sun, 1=Mon, ..., 6=Sat) */
		startOfWeek?: number;
		/** Function to check if a date is unavailable */
		isDateUnavailable?: (date: DateValue, locale: string) => boolean;
		/** Locale for date formatting (BCP 47 tag) */
		locale?: string;
		/** Custom date format function */
		format?: (date: DateValue, details: { locale: string; timeZone: string }) => string;
		/** Callback when selected value changes */
		onValueChange?: (details: DatePickerValueChangeDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		value = $bindable(),
		defaultValue,
		name,
		placeholder,
		selectionMode = 'single',
		disabled = false,
		readOnly = false,
		invalid = false,
		required = false,
		closeOnSelect,
		min,
		max,
		numOfMonths,
		startOfWeek,
		isDateUnavailable,
		locale,
		format: formatFn,
		onValueChange,
		class: className
	}: Props = $props();
</script>

<DatePicker.Root
	bind:value
	{defaultValue}
	{name}
	{placeholder}
	{selectionMode}
	{disabled}
	{readOnly}
	{invalid}
	{required}
	closeOnSelect={closeOnSelect ?? selectionMode !== 'multiple'}
	{min}
	{max}
	{numOfMonths}
	{startOfWeek}
	{isDateUnavailable}
	{locale}
	format={formatFn}
	{onValueChange}
	class="relative w-full {className ?? ''}"
>
	<DatePicker.Control
		class="border-km-base-300 rounded-km-field bg-km-base-100 focus-within:border-km-primary focus-within:outline-km-primary data-[invalid]:border-km-error flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
	>
		<DatePicker.Input
			class="text-km-base-content placeholder:text-km-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none"
		/>
		{#if selectionMode === 'range'}
			<span class="text-km-muted-content text-sm">–</span>
			<DatePicker.Input
				index={1}
				class="text-km-base-content placeholder:text-km-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none"
			/>
		{/if}
		<div class="flex items-center gap-0.5 pr-1.5">
			<DatePicker.ClearTrigger
				class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
			>
				<X size={16} />
			</DatePicker.ClearTrigger>
			<DatePicker.Trigger
				class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
			>
				<Calendar size={16} />
			</DatePicker.Trigger>
		</div>
	</DatePicker.Control>

	<Portal>
		<DatePicker.Positioner class="z-[var(--km-z-dropdown)]">
			<DatePicker.Content
				class="rounded-km-box border-km-base-300 bg-km-base-100 shadow-km-md mt-1 border p-3"
			>
				<!-- Day view -->
				<DatePicker.View view="day">
					<DatePicker.Context>
						{#snippet render(ctx)}
							<DatePicker.ViewControl class="mb-2 flex items-center justify-between">
								<DatePicker.PrevTrigger
									class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
								>
									<ChevronLeft size={16} />
								</DatePicker.PrevTrigger>
								<DatePicker.ViewTrigger
									class="rounded-km-selector text-km-base-content hover:bg-km-muted cursor-pointer border-none bg-transparent px-2 py-1 text-sm font-medium transition-colors duration-150"
								>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger
									class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
								>
									<ChevronRight size={16} />
								</DatePicker.NextTrigger>
							</DatePicker.ViewControl>
							<DatePicker.Table class="w-full border-collapse">
								<DatePicker.TableHead>
									<DatePicker.TableRow>
										{#each ctx().weekDays as weekDay}
											<DatePicker.TableHeader
												class="text-km-muted-content pb-1 text-center text-xs font-medium"
											>
												{weekDay.short}
											</DatePicker.TableHeader>
										{/each}
									</DatePicker.TableRow>
								</DatePicker.TableHead>
								<DatePicker.TableBody>
									{#each ctx().weeks as week}
										<DatePicker.TableRow>
											{#each week as day}
												<DatePicker.TableCell value={day} class="p-0 text-center">
													<DatePicker.TableCellTrigger
														class="rounded-km-selector text-km-base-content hover:bg-km-base-200 data-[selected]:bg-km-primary data-[selected]:text-km-primary-content data-[outside-range]:text-km-muted-content data-[unavailable]:text-km-muted-content data-[in-range]:bg-km-primary/10 inline-flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[today]:font-semibold data-[unavailable]:line-through"
													>
														{day.day}
													</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>

				<!-- Month view -->
				<DatePicker.View view="month">
					<DatePicker.Context>
						{#snippet render(ctx)}
							<DatePicker.ViewControl class="mb-2 flex items-center justify-between">
								<DatePicker.PrevTrigger
									class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
								>
									<ChevronLeft size={16} />
								</DatePicker.PrevTrigger>
								<DatePicker.ViewTrigger
									class="rounded-km-selector text-km-base-content hover:bg-km-muted cursor-pointer border-none bg-transparent px-2 py-1 text-sm font-medium transition-colors duration-150"
								>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger
									class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
								>
									<ChevronRight size={16} />
								</DatePicker.NextTrigger>
							</DatePicker.ViewControl>
							<DatePicker.Table class="w-full border-collapse">
								<DatePicker.TableBody>
									{#each ctx().getMonthsGrid({ columns: 4, format: 'short' }) as months}
										<DatePicker.TableRow>
											{#each months as month}
												<DatePicker.TableCell value={month.value} class="p-0 text-center">
													<DatePicker.TableCellTrigger
														class="rounded-km-selector text-km-base-content hover:bg-km-base-200 data-[selected]:bg-km-primary data-[selected]:text-km-primary-content inline-flex h-8 w-full cursor-pointer items-center justify-center border-none bg-transparent text-sm transition-colors duration-150"
													>
														{month.label}
													</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>

				<!-- Year view -->
				<DatePicker.View view="year">
					<DatePicker.Context>
						{#snippet render(ctx)}
							<DatePicker.ViewControl class="mb-2 flex items-center justify-between">
								<DatePicker.PrevTrigger
									class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
								>
									<ChevronLeft size={16} />
								</DatePicker.PrevTrigger>
								<DatePicker.ViewTrigger
									class="rounded-km-selector text-km-base-content hover:bg-km-muted cursor-pointer border-none bg-transparent px-2 py-1 text-sm font-medium transition-colors duration-150"
								>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger
									class="rounded-km-selector text-km-muted-content hover:bg-km-muted hover:text-km-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
								>
									<ChevronRight size={16} />
								</DatePicker.NextTrigger>
							</DatePicker.ViewControl>
							<DatePicker.Table class="w-full border-collapse">
								<DatePicker.TableBody>
									{#each ctx().getYearsGrid({ columns: 4 }) as years}
										<DatePicker.TableRow>
											{#each years as year}
												<DatePicker.TableCell value={year.value} class="p-0 text-center">
													<DatePicker.TableCellTrigger
														class="rounded-km-selector text-km-base-content hover:bg-km-base-200 data-[selected]:bg-km-primary data-[selected]:text-km-primary-content inline-flex h-8 w-full cursor-pointer items-center justify-center border-none bg-transparent text-sm transition-colors duration-150"
													>
														{year.label}
													</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker.Root>
