<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import * as Dropdown from '@stream-kit/ui/dropdown';

	import { tooltip } from '#lib/attachments/index.js';

	type DefinitionNode = {
		id: string;
		name: string;
		isGroup: boolean;
		isAvailable: boolean;
		children: { items: DefinitionNode[] };
	};

	type Props = {
		label: string;
		icon?: string;
		/** Compact icon button; `label` becomes the accessible name and tooltip. */
		iconOnly?: boolean;
		definitions: DefinitionNode[];
		onSelect: (definition: DefinitionNode) => void;
	};

	let { label, icon = 'ri:add-line', iconOnly = false, definitions, onSelect }: Props = $props();

	function getAvailableChildren(definition: DefinitionNode): DefinitionNode[] {
		return definition.children.items.filter(isSelectable);
	}

	function isSelectable(definition: DefinitionNode): boolean {
		if (!definition.isAvailable) {
			return false;
		}

		return !definition.isGroup || getAvailableChildren(definition).length > 0;
	}

	const selectableDefinitions = $derived(definitions.filter(isSelectable));
</script>

{#snippet node(definition: DefinitionNode)}
	{#if definition.isGroup}
		<Dropdown.Sub>
			<Dropdown.SubTrigger>{definition.name}</Dropdown.SubTrigger>
			<Dropdown.SubContent>
				{#each getAvailableChildren(definition) as item (item.id)}
					{@render node(item)}
				{/each}
			</Dropdown.SubContent>
		</Dropdown.Sub>
	{:else}
		<Dropdown.Item onclick={() => onSelect(definition)} {@attach tooltip(() => definition.id)}>
			{definition.name}
		</Dropdown.Item>
	{/if}
{/snippet}

<Dropdown.Root>
	{#snippet trigger({ props })}
		{#if iconOnly}
			<Button
				variant="ghost"
				size="icon-badge"
				{icon}
				aria-label={label}
				{...props}
				{@attach tooltip(() => label)}
			/>
		{:else}
			<Button variant="ghost" size="sm" {icon} {...props}>{label}</Button>
		{/if}
	{/snippet}
	<Dropdown.Content>
		{#each selectableDefinitions as definition (definition.id)}
			{@render node(definition)}
		{/each}
	</Dropdown.Content>
</Dropdown.Root>
