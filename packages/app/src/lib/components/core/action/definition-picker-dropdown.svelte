<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dropdown from '$lib/components/ui/dropdown';

	type DefinitionNode = {
		id: string;
		name: string;
		isGroup: boolean;
		children: { items: DefinitionNode[] };
	};

	type Props = {
		label: string;
		icon?: string;
		definitions: DefinitionNode[];
		onSelect: (definition: DefinitionNode) => void;
	};

	let { label, icon = 'ri:add-line', definitions, onSelect }: Props = $props();
</script>

{#snippet node(definition: DefinitionNode)}
	{#if definition.isGroup}
		<Dropdown.Sub>
			<Dropdown.SubTrigger>{definition.name}</Dropdown.SubTrigger>
			<Dropdown.SubContent>
				{#each definition.children.items as item (item.id)}
					{@render node(item)}
				{/each}
			</Dropdown.SubContent>
		</Dropdown.Sub>
	{:else}
		<Dropdown.Item onclick={() => onSelect(definition)}>
			{definition.name}
		</Dropdown.Item>
	{/if}
{/snippet}

<Dropdown.Root>
	{#snippet trigger({ props })}
		<Button variant="ghost" size="sm" {icon} {...props}>{label}</Button>
	{/snippet}
	<Dropdown.Content>
		{#each definitions as definition (definition.id)}
			{@render node(definition)}
		{/each}
	</Dropdown.Content>
</Dropdown.Root>
