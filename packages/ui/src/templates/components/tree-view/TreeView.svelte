<script lang="ts">
  import { TreeView, createTreeCollection } from "@ark-ui/svelte/tree-view";
  import type {
    TreeViewSelectionChangeDetails,
    TreeViewExpandedChangeDetails,
  } from "@ark-ui/svelte/tree-view";
  import { ChevronRight } from "lucide-svelte";

  interface TreeNode {
    value: string;
    label: string;
    children?: TreeNode[];
    disabled?: boolean;
  }

  interface Props {
    nodes: TreeNode[];
    label?: string;
    selectedValue?: string[];
    defaultSelectedValue?: string[];
    expandedValue?: string[];
    defaultExpandedValue?: string[];
    selectionMode?: "single" | "multiple";
    onSelectionChange?: (details: TreeViewSelectionChangeDetails) => void;
    onExpandedChange?: (details: TreeViewExpandedChangeDetails) => void;
    class?: string;
  }

  let {
    nodes,
    label,
    selectedValue = $bindable(),
    defaultSelectedValue,
    expandedValue = $bindable(),
    defaultExpandedValue,
    selectionMode = "single",
    onSelectionChange,
    onExpandedChange,
    class: className,
  }: Props = $props();

  const collection = $derived(
    createTreeCollection({
      rootNode: { value: "__root__", label: "", children: nodes },
      nodeToValue: (node) => node.value,
      nodeToString: (node) => node.label,
      nodeToChildren: (node) => node.children ?? [],
      isNodeDisabled: (node) => !!node.disabled,
    })
  );
</script>

{#snippet renderNodes(nodeList: TreeNode[], parentPath: number[])}
  {#each nodeList as node, i (node.value)}
    <TreeView.NodeProvider {node} indexPath={[...parentPath, i]}>
      {#if node.children?.length}
        <TreeView.Branch class="relative">
          <TreeView.BranchControl class="flex w-full cursor-pointer items-center gap-1 rounded-km-selector px-2 py-1 text-sm text-km-base-content transition-colors duration-150 hover:bg-km-base-200 data-[selected]:bg-km-base-200 data-[selected]:text-km-primary data-[focus-visible]:outline-2 data-[focus-visible]:outline-km-primary data-[focus-visible]:-outline-offset-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50">
            <TreeView.BranchTrigger class="flex h-5 w-5 shrink-0 items-center justify-center rounded-km-selector text-km-muted-content transition-colors duration-150 hover:bg-km-muted hover:text-km-base-content data-[disabled]:pointer-events-none">
              <TreeView.BranchIndicator class="transition-transform duration-150 data-[state=open]:rotate-90">
                <ChevronRight size={14} />
              </TreeView.BranchIndicator>
            </TreeView.BranchTrigger>
            <TreeView.BranchText class="flex-1 select-none">{node.label}</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent class="pl-4">
            {@render renderNodes(node.children, [...parentPath, i])}
          </TreeView.BranchContent>
        </TreeView.Branch>
      {:else}
        <TreeView.Item class="flex w-full cursor-pointer items-center gap-1 rounded-km-selector px-2 py-1 text-sm text-km-base-content transition-colors duration-150 hover:bg-km-base-200 data-[selected]:bg-km-base-200 data-[selected]:text-km-primary data-[focus-visible]:outline-2 data-[focus-visible]:outline-km-primary data-[focus-visible]:-outline-offset-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50">
          <TreeView.ItemText class="flex-1 select-none pl-6">{node.label}</TreeView.ItemText>
        </TreeView.Item>
      {/if}
    </TreeView.NodeProvider>
  {/each}
{/snippet}

<TreeView.Root
  {collection}
  {selectionMode}
  bind:selectedValue
  {defaultSelectedValue}
  bind:expandedValue
  {defaultExpandedValue}
  {onSelectionChange}
  {onExpandedChange}
  class="w-full {className ?? ''}"
>
  {#if label}
    <TreeView.Label class="mb-1 block text-sm font-medium text-km-base-content">{label}</TreeView.Label>
  {/if}
  <TreeView.Tree class="rounded-km-box border border-km-base-300 bg-km-base-100 p-1">
    {@render renderNodes(nodes, [])}
  </TreeView.Tree>
</TreeView.Root>
