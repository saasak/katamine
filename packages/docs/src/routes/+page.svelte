<div class="flex flex-1 flex-col">
  <!-- Hero -->
  <section class="mx-auto max-w-2xl pt-20 text-center">
    <h1 class="text-5xl font-bold text-km-base-content">Katamine</h1>
    <p class="mt-4 text-lg text-km-muted-content">
      Ready-to-use SvelteKit components. Themed. Accessible. Yours to own.
    </p>
    <div class="mt-8 flex items-center justify-center gap-4">
      <a
        href="/getting-started"
        class="rounded-km-field bg-km-primary px-5 py-2.5 text-sm font-medium text-km-primary-content no-underline transition-colors hover:opacity-90"
      >
        Get Started
      </a>
      <a
        href="/components/combobox"
        class="rounded-km-field border border-km-base-300 bg-km-base-100 px-5 py-2.5 text-sm font-medium text-km-base-content no-underline transition-colors hover:bg-km-muted"
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
      <div class="rounded-km-box border border-km-base-300 p-6">
        <h3 class="text-lg font-semibold text-km-base-content">Themed</h3>
        <p class="mt-2 text-sm text-km-muted-content">
          CSS variables with OKLCH colors. DaisyUI-style theming with dark mode out of the box.
        </p>
      </div>
      <div class="rounded-km-box border border-km-base-300 p-6">
        <h3 class="text-lg font-semibold text-km-base-content">Accessible</h3>
        <p class="mt-2 text-sm text-km-muted-content">
          Built on Ark UI and Zag.JS. WAI-ARIA compliant with keyboard navigation and screen reader support.
        </p>
      </div>
      <div class="rounded-km-box border border-km-base-300 p-6">
        <h3 class="text-lg font-semibold text-km-base-content">You own it</h3>
        <p class="mt-2 text-sm text-km-muted-content">
          Components are copied into your project. No runtime dependency. Edit freely to fit your needs.
        </p>
      </div>
    </div>
  </section>
</div>
