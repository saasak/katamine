<script lang="ts">
  import { DatePicker, type DatePickerValueChangeDetails, type DateValue } from "@ark-ui/svelte/date-picker";
  import { Portal } from "@ark-ui/svelte/portal";
  import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-svelte";

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
    selectionMode?: "single" | "multiple" | "range";
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
    selectionMode = "single",
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
    class: className,
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
  closeOnSelect={closeOnSelect ?? (selectionMode !== "multiple")}
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
  <DatePicker.Control class="flex items-center border border-km-base-300 rounded-km-field bg-km-base-100 transition-colors duration-150 focus-within:border-km-primary focus-within:outline-2 focus-within:outline-km-primary focus-within:-outline-offset-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-km-error">
    <DatePicker.Input class="flex-1 min-w-0 border-none bg-transparent px-3 py-2 text-sm text-km-base-content outline-none placeholder:text-km-muted-content" />
    {#if selectionMode === "range"}
      <span class="text-km-muted-content text-sm">–</span>
      <DatePicker.Input index={1} class="flex-1 min-w-0 border-none bg-transparent px-3 py-2 text-sm text-km-base-content outline-none placeholder:text-km-muted-content" />
    {/if}
    <div class="flex items-center gap-0.5 pr-1.5">
      <DatePicker.ClearTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
        <X size={16} />
      </DatePicker.ClearTrigger>
      <DatePicker.Trigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
        <Calendar size={16} />
      </DatePicker.Trigger>
    </div>
  </DatePicker.Control>

  <Portal>
    <DatePicker.Positioner class="z-[var(--km-z-dropdown)]">
      <DatePicker.Content class="mt-1 rounded-km-box border border-km-base-300 bg-km-base-100 p-3 shadow-km-md">
        <!-- Day view -->
        <DatePicker.View view="day">
          <DatePicker.Context>
            {#snippet render(ctx)}
              <DatePicker.ViewControl class="mb-2 flex items-center justify-between">
                <DatePicker.PrevTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
                  <ChevronLeft size={16} />
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger class="cursor-pointer rounded-km-selector border-none bg-transparent px-2 py-1 text-sm font-medium text-km-base-content transition-colors duration-150 hover:bg-km-muted">
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
                  <ChevronRight size={16} />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table class="w-full border-collapse">
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {#each ctx().weekDays as weekDay}
                      <DatePicker.TableHeader class="pb-1 text-center text-xs font-medium text-km-muted-content">
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
                            class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent text-sm text-km-base-content transition-colors duration-150 hover:bg-km-base-200 data-[today]:font-semibold data-[selected]:bg-km-primary data-[selected]:text-km-primary-content data-[outside-range]:text-km-muted-content data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[unavailable]:line-through data-[unavailable]:text-km-muted-content data-[in-range]:bg-km-primary/10"
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
                <DatePicker.PrevTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
                  <ChevronLeft size={16} />
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger class="cursor-pointer rounded-km-selector border-none bg-transparent px-2 py-1 text-sm font-medium text-km-base-content transition-colors duration-150 hover:bg-km-muted">
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
                  <ChevronRight size={16} />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table class="w-full border-collapse">
                <DatePicker.TableBody>
                  {#each ctx().getMonthsGrid({ columns: 4, format: "short" }) as months}
                    <DatePicker.TableRow>
                      {#each months as month}
                        <DatePicker.TableCell value={month.value} class="p-0 text-center">
                          <DatePicker.TableCellTrigger
                            class="inline-flex h-8 w-full cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent text-sm text-km-base-content transition-colors duration-150 hover:bg-km-base-200 data-[selected]:bg-km-primary data-[selected]:text-km-primary-content"
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
                <DatePicker.PrevTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
                  <ChevronLeft size={16} />
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger class="cursor-pointer rounded-km-selector border-none bg-transparent px-2 py-1 text-sm font-medium text-km-base-content transition-colors duration-150 hover:bg-km-muted">
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger class="flex cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent p-1 text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content">
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
                            class="inline-flex h-8 w-full cursor-pointer items-center justify-center rounded-km-selector border-none bg-transparent text-sm text-km-base-content transition-colors duration-150 hover:bg-km-base-200 data-[selected]:bg-km-primary data-[selected]:text-km-primary-content"
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
