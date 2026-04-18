# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Katamine distributes ready-to-use, themed SvelteKit components via jsrepo. Built on Ark UI/Zag.JS primitives. Like ShadCN but with fully composed components (not just primitives) and DaisyUI-style theming.

**Single user context**: this is for internal products — iterate fast, no backwards-compat concerns.

## Monorepo Structure

pnpm workspace with two packages:

- **`packages/ui`** (`katamine`) — jsrepo registry + thin init CLI + component templates. Published to npm.
- **`packages/docs`** (`@saasak/katamine-docs`) — SvelteKit app that imports components directly from ui source via `$ui`, `$blocks`, and `$theme` aliases.

Root scripts:

- `pnpm build` — build all packages
- `pnpm dev:docs` — run docs dev server
- `pnpm build:ui` / `pnpm build:docs` — build individual packages
- `pnpm code:lint` / `pnpm code:fix` — lint and format
- `pnpm docker:build` / `pnpm docker:run` — build and run docs Docker image

## Stack

- SvelteKit (Svelte 5), Ark UI / Zag.JS, Tailwind 4, Vite 8
- Mise for runtime versions (node >=22, pnpm)
- Always use cutting-edge dependency versions

## CLI & Component Distribution

Components are distributed via [jsrepo](https://jsrepo.dev). The registry config is `jsrepo.config.ts` at the monorepo root. `registry.json` (generated, committed) is also at the root.

- `npx katamine init` — scaffolds deps, base theme, CSS variables in a SvelteKit project
- `npx katamine add <component>` — copies component to user project with auto-resolved deps (wraps jsrepo)
- `npx katamine update` — update previously added components with interactive diffs (wraps jsrepo)
- `pnpm build` — builds all packages then runs `jsrepo build` (registry manifest) from root
- `pnpm build:registry` — rebuild `registry.json` only

## Ark UI Sources

- Component docs: https://ark-ui.com/docs/components/{componentName}
- Full LLM context: https://ark-ui.com/llms-full.txt
- Svelte LLM context: https://ark-ui.com/llms-svelte.txt
- Svelte source: https://github.com/chakra-ui/ark/tree/main/packages/svelte/src/lib/components

## Component design principles

- Wrap Ark/Zag primitives into single ready-to-use components with clean props interfaces
- Both controlled (`bind:value`) and uncontrolled (`onValueChange`) APIs
- Form submission handled natively by Ark/Zag (name prop forwarded to the visible input)
- Async-ready where applicable (e.g., ComboBox)
- A11y delegated entirely to Ark/Zag
- Svelte 5 snippets/slots used on a case-by-case basis
- Users own the source — no passthrough props system, edit the component directly for deep customization

## Theming

- Semantic `--km-*` CSS variables (OKLCH), mapped to Tailwind 4 via `@theme inline`
- Theme switching via `data-theme` attribute, dark mode via `data-mode="dark"` on `<html>`
- Default border color set to `--km-base-300` via `--default-border-color` (bare `border` utility is theme-aware)
- Components use Tailwind utility classes exclusively (no `:global()` CSS blocks)

### Token structure

**Radius** (DaisyUI v5 semantic): `--km-radius-selector` (checkboxes, toggles, badges), `--km-radius-field` (inputs, buttons, tabs), `--km-radius-box` (cards, modals, dropdowns). Tailwind: `rounded-km-selector`, `rounded-km-field`, `rounded-km-box`.

**Colors** (DaisyUI-inspired + ShadCN muted):

- Brand: `primary`, `secondary`, `accent` — each with `-content` suffix for contrast text
- Neutral: `neutral` / `neutral-content`
- Base surfaces (elevation model): `base-100` (page bg), `base-200` (elevated), `base-300` (borders/dividers), `base-content` (default text)
- Muted (ShadCN): `muted` / `muted-content` — subdued/disabled states
- Status: `info`, `success`, `warning`, `error` — each with `-content` suffix

Tailwind usage: `bg-km-base-100`, `text-km-base-content`, `border-km-base-300`, `bg-km-primary`, `text-km-primary-content`, etc.

**Shadows, transitions, z-index**: `--km-shadow-sm/md/lg`, `--km-transition-fast/base/slow`, `--km-z-*`. Z-index used as arbitrary values: `z-[var(--km-z-dropdown)]`.

## Docs

- SvelteKit app at `packages/docs/`
- Imports raw .svelte components from ui via `$ui` alias (e.g., `import { ComboBox } from "$ui/combobox"`)
- Imports blocks from ui via `$blocks` alias (e.g., `import { ChatPanel } from "$blocks/chat-panel"`)
- Imports theme CSS from ui via `$theme` alias in `app.css`
- Static adapter for deployment

## Svelte Code Quality

- Always run the `svelte-autofixer` MCP tool on any Svelte code you write or modify before presenting it to the user. Keep calling it until no issues or suggestions are returned.

## CI/CD

- GitHub Actions (`.github/workflows/build-registry.yml`) auto-rebuilds `registry.json` on push to `main` when templates or `jsrepo.config.ts` change

## Testing

- Visual regression testing only
