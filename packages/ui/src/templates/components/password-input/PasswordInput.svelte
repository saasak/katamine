<script lang="ts">
  import { PasswordInput } from "@ark-ui/svelte/password-input";
  import { Eye, EyeOff } from "lucide-svelte";

  interface Props {
    /** Controlled input value. Supports bind:value */
    value?: string;
    /** Controlled visibility state. Supports bind:visible */
    visible?: boolean;
    /** Initial visibility for uncontrolled mode */
    defaultVisible?: boolean;
    /** Input placeholder text */
    placeholder?: string;
    /** Form field name for native submission */
    name?: string;
    /** Disable the input */
    disabled?: boolean;
    /** Mark the input as invalid */
    invalid?: boolean;
    /** Mark the input as required */
    required?: boolean;
    /** Callback when visibility state changes */
    onVisibilityChange?: (details: { visible: boolean }) => void;
    /** Additional CSS classes on the root element */
    class?: string;
  }

  let {
    value = $bindable(),
    visible = $bindable(),
    defaultVisible = false,
    placeholder,
    name,
    disabled = false,
    invalid = false,
    required = false,
    onVisibilityChange,
    class: className,
  }: Props = $props();
</script>

<PasswordInput.Root
  bind:visible
  {defaultVisible}
  {name}
  {disabled}
  {invalid}
  {required}
  {onVisibilityChange}
  class="relative w-full {className ?? ''}"
>
  <PasswordInput.Control
    class="flex items-center rounded-km-field border bg-km-base-100 transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1 data-[invalid]:focus-within:outline-km-error data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 {invalid ? 'border-km-error' : 'border-km-base-300 focus-within:border-km-primary focus-within:outline-km-primary'}"
  >
    <PasswordInput.Input
      bind:value
      {placeholder}
      class="min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm text-km-base-content outline-none placeholder:text-km-muted-content"
    />
    <PasswordInput.VisibilityTrigger
      class="flex cursor-pointer items-center justify-center pr-2.5 pl-1 py-2 text-km-muted-content transition-colors duration-150 hover:text-km-base-content"
    >
      <PasswordInput.Indicator>
        {#snippet fallback()}<Eye size={16} />{/snippet}
        <EyeOff size={16} />
      </PasswordInput.Indicator>
    </PasswordInput.VisibilityTrigger>
  </PasswordInput.Control>
</PasswordInput.Root>
