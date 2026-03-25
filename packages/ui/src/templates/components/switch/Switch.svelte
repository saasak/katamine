<script lang="ts">
  import { Switch } from "@ark-ui/svelte/switch";

  interface Props {
    /** Display label */
    label?: string;
    /** Controlled checked state. Supports bind:checked */
    checked?: boolean;
    /** Initial state for uncontrolled mode */
    defaultChecked?: boolean;
    /** Form field name for native submission */
    name?: string;
    /** Form submission value when checked */
    value?: string;
    /** Disable the switch */
    disabled?: boolean;
    /** Mark as invalid */
    invalid?: boolean;
    /** Mark as required */
    required?: boolean;
    /** Make read-only */
    readOnly?: boolean;
    /** Callback when checked state changes */
    onCheckedChange?: (details: Switch.CheckedChangeDetails) => void;
    /** Additional CSS classes on the root element */
    class?: string;
  }

  let {
    label,
    checked = $bindable(),
    defaultChecked,
    name,
    value = "on",
    disabled = false,
    invalid = false,
    required = false,
    readOnly = false,
    onCheckedChange,
    class: className,
  }: Props = $props();
</script>

<Switch.Root
  bind:checked
  {defaultChecked}
  {name}
  {value}
  {disabled}
  {invalid}
  {required}
  {readOnly}
  {onCheckedChange}
  class="inline-flex cursor-pointer items-center gap-2 select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 {className ?? ''}"
>
  <Switch.Control
    class="inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent bg-km-base-300 transition-colors duration-150 data-[state=checked]:bg-km-primary data-[focus]:border-km-primary data-[focus]:outline-2 data-[focus]:outline-km-primary data-[focus]:outline-offset-2 data-[invalid]:border-km-error data-[invalid]:bg-km-error"
  >
    <Switch.Thumb
      class="pointer-events-none block h-5 w-5 rounded-full bg-km-base-100 shadow-km-sm transition-transform duration-150 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    />
  </Switch.Control>
  {#if label}
    <Switch.Label class="text-sm text-km-base-content data-[disabled]:text-km-muted-content">
      {label}
    </Switch.Label>
  {/if}
  <Switch.HiddenInput />
</Switch.Root>
