<div class="flex flex-1 flex-col">
	<!-- Hero -->
	<section class="mx-auto max-w-2xl pt-20 text-center">
		<h1 class="text-km-base-content text-5xl font-bold">Katamine</h1>
		<p class="text-km-muted-content mt-4 text-lg">
			Ready-to-use SvelteKit components. Themed. Accessible. Yours to own.
		</p>
		<div class="mt-8 flex items-center justify-center gap-4">
			<a
				href="/getting-started"
				class="rounded-km-field bg-km-primary text-km-primary-content px-5 py-2.5 text-sm font-medium no-underline transition-colors hover:opacity-90"
			>
				Get Started
			</a>
			<a
				href="/components/combobox"
				class="rounded-km-field border-km-base-300 bg-km-base-100 text-km-base-content hover:bg-km-muted border px-5 py-2.5 text-sm font-medium no-underline transition-colors"
			>
				Browse Components
			</a>
		</div>
	</section>

	<!-- Install snippet -->
	<section class="mx-auto mt-16 max-w-md">
		<pre class="rounded-km-box bg-km-base-200 p-4 font-mono text-sm">npx katamine init
npx katamine add combobox</pre>
	</section>

	<!-- Features -->
	<section class="mx-auto mt-20 max-w-4xl px-6 pb-20">
		<div class="grid gap-6 lg:grid-cols-3">
			<div class="rounded-km-box border-km-base-300 border p-6">
				<h3 class="text-km-base-content text-lg font-semibold">Themed</h3>
				<p class="text-km-muted-content mt-2 text-sm">
					CSS variables with OKLCH colors. DaisyUI-style theming with dark mode out of the box.
				</p>
			</div>
			<div class="rounded-km-box border-km-base-300 border p-6">
				<h3 class="text-km-base-content text-lg font-semibold">Accessible</h3>
				<p class="text-km-muted-content mt-2 text-sm">
					Built on Ark UI and Zag.JS. WAI-ARIA compliant with keyboard navigation and screen reader
					support.
				</p>
			</div>
			<div class="rounded-km-box border-km-base-300 border p-6">
				<h3 class="text-km-base-content text-lg font-semibold">You own it</h3>
				<p class="text-km-muted-content mt-2 text-sm">
					Components are copied into your project. No runtime dependency. Edit freely to fit your
					needs.
				</p>
			</div>
		</div>
	</section>
</div>
