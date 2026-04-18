# katamine

Ready-to-use, themed SvelteKit components built on [Ark UI](https://ark-ui.com) / [Zag.js](https://zagjs.com).

## Quick Start

```bash
# Initialize in a SvelteKit project
npx @saasak/katamine init

# Add a component
npx @saasak/katamine add combobox
```

## Commands

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `katamine init`       | Install dependencies and set up theming in your SvelteKit project |
| `katamine add <name>` | Copy a component into `src/lib/components/<name>`                 |

## Customizing the Theme

After running `katamine init`, you get a full set of `--km-*` CSS variables (OKLCH colors, radii, shadows, transitions). Override any of them in your `app.css` to tweak the theme:

```css
/* app.css — after the katamine theme import */

:root {
	/* Swap the primary color to a custom blue */
	--km-primary: oklch(0.55 0.25 260);
	--km-primary-content: oklch(0.98 0.01 260);

	/* Softer border radius */
	--km-radius-field: 0.375rem;
	--km-radius-box: 0.5rem;

	/* Subtler shadows */
	--km-shadow-md: 0 2px 8px oklch(0 0 0 / 0.08);
}

/* Override only in dark mode */
[data-mode='dark'] {
	--km-base-100: oklch(0.2 0.02 260);
	--km-base-200: oklch(0.25 0.02 260);
}

/* Override only for a specific theme */
[data-theme='ocean'] {
	--km-accent: oklch(0.7 0.18 190);
}
```

All components use these variables through Tailwind utilities (`bg-km-primary`, `rounded-km-field`, etc.), so overrides apply everywhere automatically.

## License

[MIT](LICENSE)
