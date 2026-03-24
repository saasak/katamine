<script lang="ts">
  interface PropItem {
    name: string;
    type: string;
    default: string;
    description: string;
  }

  let { items }: { items: PropItem[] } = $props();
</script>

<div class="overflow-x-auto rounded-km-box border border-km-base-300">
  <table class="w-full text-left text-sm">
    <thead>
      <tr class="bg-km-base-200">
        <th class="border-b border-km-base-300 px-4 py-2 font-semibold">Prop</th>
        <th class="border-b border-km-base-300 px-4 py-2 font-semibold">Type</th>
        <th class="border-b border-km-base-300 px-4 py-2 font-semibold">Default</th>
        <th class="border-b border-km-base-300 px-4 py-2 font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each items as prop}
        <tr class="border-b border-km-base-300 last:border-b-0">
          <td class="px-4 py-2 font-mono text-sm text-km-primary">{prop.name}</td>
          <td class="px-4 py-2 font-mono text-sm">{prop.type}</td>
          <td class="px-4 py-2 font-mono text-sm text-km-muted-content">{prop.default}</td>
          <td class="px-4 py-2">{prop.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
