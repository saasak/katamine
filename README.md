# Katamine

## Intro 

This is an opiniated UI lib for Sveltekit which will use Ark/Zag.JS primitives to build ready to use
and themable low-level components

The Idea here is to create a ShadCN like lib, but with the addition of a ready to use Component each
time, effectively turning ShadCN into a full UI lib.
Think of it as exposing the "Example" for each component to be used directly.

For instance in ShadCN, you will have to create all your component yourself by combining the
primitives together.

Like an AutoComplete will force you to combine up to 7 primitives each time (Root, Input, Trigger,
Content, etc.)

I want to turn that back into ready to use component with a defined "interface".
(Which is almost something we do once we installed ShadCN components, we define our own
"higher-level" components)

To illustrate, taking the ComboBox as an example, we will often create an intermediate component

```html
<script lang="ts">
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'

	let { items } = $props<{
    items: { label: string, value: string }[]
	}>()

  const filters = useFilter({ sensitivity: 'base' })
  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Date', value: 'date' },
      { label: 'Elderberry', value: 'elderberry' },
      { label: 'Fig', value: 'fig' },
    ],
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Combobox.Root {collection} onInputValueChange={handleInputChange}>
  <Combobox.Label>Fruit</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input placeholder="e.g. Apple" />
    <div>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      <Combobox.Trigger>Open</Combobox.Trigger>
    </div>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content>
        <Combobox.Empty>No results found</Combobox.Empty>
        {#each collection().items as item (item.value)}
          <Combobox.Item {item}>
            <Combobox.ItemText>{item.label}</Combobox.ItemText>
            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
```

I still want to be able to create a complete family of styles by defining base css var (like shadCN
does.

## Overall guidelines

- use mise for managing node / pnpm / etc. versions
- use cutting edge version each time (vite 8, tailwind 4, ...)
