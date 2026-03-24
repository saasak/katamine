# Katamine

An opinionated, ready-to-use UI component library for SvelteKit built on [Ark UI](https://ark-ui.com/) / [Zag.JS](https://zagjs.com/) primitives.

## Philosophy

ShadCN gives you primitives — you still have to compose 7+ sub-components every time you need a ComboBox. Katamine wraps those primitives into **single, ready-to-use components** with clean interfaces, while keeping the source in your project so you own it completely.

Think of it as ShadCN + DaisyUI: copy-paste ownership with batteries included.

```svelte
<!-- ShadCN way: 7 primitives to compose yourself -->
<Combobox.Root>
  <Combobox.Control>
    <Combobox.Input />
    <Combobox.Trigger />
  </Combobox.Control>
  <Combobox.Content>...</Combobox.Content>
</Combobox.Root>

<!-- Katamine way: one component, done -->
<ComboBox {items} bind:value placeholder="Pick a fruit" />
```

## How it works

Katamine is a **CLI tool**. Components are copied into your project — you own the source.

```bash
# Setup Katamine in your SvelteKit project (installs deps, base theme, CSS variables)
npx katamine init

# Add components
npx katamine add combobox
```

Components land in `src/lib/components/` and can be modified freely.

## Theming

DaisyUI-inspired theming system built on CSS variables:

- **Base tokens**: radius, colors, shadows — all configurable via CSS variables
- **Multiple themes**: applied via `data-theme` attribute on the HTML element
- **Styled by default**: every component ships with a polished default look
- **Full control**: tweak global CSS variables for broad changes, or edit the component source directly for deeper customization

```html
<html data-theme="dark">
```

## Component design

- **Full Ark UI catalog** — priority on user-input components (ComboBox, Select, DatePicker, etc.)
- **Async-ready** — components like ComboBox support async data fetching out of the box
- **Form-ready** — `name` prop forwarded to the native input for proper form submission
- **Controlled & uncontrolled** — supports both `bind:value` and `onValueChange` callbacks
- **Accessible** — inherits Ark/Zag's full WAI-ARIA compliance
- **Slots where it makes sense** — some components expose Svelte 5 snippets for custom rendering

## Project structure

pnpm monorepo:

- **`packages/ui`** — CLI + component templates (published to npm as `katamine`)
- **`packages/docs`** — SvelteKit docs site importing components directly from ui source

## Development

```bash
# Install dependencies
pnpm install

# Build everything
pnpm build

# Run docs dev server
pnpm dev:docs

# Build CLI only
pnpm build:ui
```

## Stack

- **SvelteKit** (Svelte 5)
- **Ark UI / Zag.JS** — headless primitives & accessibility
- **Tailwind 4** — styling
- **Vite 8** — build
- **Mise** — runtime version management (node, pnpm)

## Testing

Visual regression testing to ensure components render correctly across themes and states.
