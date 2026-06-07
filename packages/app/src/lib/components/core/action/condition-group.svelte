<script lang="ts">
	import type { ConditionEditor } from '$lib/core/action/condition-editor';
	import type {
		ConditionDefinition,
		ConditionGroupNode,
		ConditionLeafNode,
		ConditionNode
	} from '$lib/core/action/trigger';
	import type { TriggerFormErrors } from '$lib/core/action/validate-form';
	import type { FormEventHandler } from 'svelte/elements';

	import { tooltip } from '$lib/attachments';
	import { Button } from '$lib/components/ui/button';
	import * as Dropdown from '$lib/components/ui/dropdown';
	import {
		InputCheckbox,
		InputSelect,
		InputSelectText,
		InputText,
		InputTextVariables,
		Label
	} from '$lib/components/ui/input';
	import { cn } from '$lib/utils';

	import Self from './condition-group.svelte';

	type Props = {
		editor: ConditionEditor;
		group: ConditionGroupNode;
		fieldErrors?: TriggerFormErrors;
		root?: boolean;
	};

	let { editor, group, fieldErrors, root = false }: Props = $props();

	const operatorItems = [
		{ value: 'and', label: 'AND' },
		{ value: 'or', label: 'OR' }
	];

	const onConditionTextInput =
		(node: ConditionLeafNode): FormEventHandler<HTMLInputElement> =>
		(event) => {
			node.value = event.currentTarget.value;
		};
</script>

{#snippet conditionField(config: ConditionDefinition, node: ConditionLeafNode, error?: string)}
	{#if config.type === 'text'}
		{#if config.variables && config.variables.length > 0}
			<InputTextVariables
				placeholder={config.placeholder}
				required={config.required}
				variables={config.variables}
				bind:value={() => (node.value as string) ?? '', (next) => (node.value = next)}
				{error}
			/>
		{:else}
			<InputText
				placeholder={config.placeholder}
				required={config.required}
				value={(node.value as string) ?? ''}
				{error}
				oninput={onConditionTextInput(node)}
			/>
		{/if}
	{:else if config.type === 'checkbox'}
		<div
			class={cn(
				'flex h-10 w-full items-center rounded-xl border bg-transparent px-4 text-primary-100',
				'font-mono text-sm lowercase',
				error ? 'border-red-500' : 'border-transparent'
			)}
		>
			<span class="truncate">{config.name}</span>
		</div>
		{#if error}
			<p class="text-sm text-red-400">{error}</p>
		{/if}
	{:else if config.type === 'select'}
		<InputSelect
			type="single"
			placeholder={config.placeholder}
			loadingPlaceholder={config.loadingPlaceholder}
			items={config.items}
			{error}
			bind:value={node.value as string}
		/>
	{:else if config.type === 'select-text'}
		<InputSelectText
			items={config.items}
			placeholder={config.placeholder}
			loadingPlaceholder={config.loadingPlaceholder}
			selectPlaceholder={config.selectPlaceholder}
			variables={config.variables}
			selectClass="w-32"
			contentProps={{ align: 'start' }}
			{error}
			bind:value={node.value as { type: string; value: string }}
		/>
	{/if}
{/snippet}

{#snippet operatorSelect(node: ConditionNode)}
	<div class="max-w-24 min-w-24 shrink-0">
		<InputSelect
			type="single"
			items={operatorItems}
			bind:value={() => node.operator ?? 'and', (next) => editor.setOperator(node, next)}
		/>
	</div>
{/snippet}

<div class={cn('grid gap-4', !root && 'rounded-xl border border-dark-600 p-3')}>
	{#each group.children as child, index (child.id)}
		{#if child.kind === 'condition'}
			{@const config = editor.getConditionDefinition(child.key)}
			{#if config}
				<div class="grid gap-2">
					<Label class="flex flex-wrap items-baseline gap-x-1.5 font-mono text-base">
						<span class="text-green-500">{child.operator ? child.operator : 'if'}</span>
						<span class="text-primary-100 italic">{config.name.toLowerCase()}</span>
						{#if child.negate}
							<span class="text-red-400">not</span>
						{/if}
						{#if config.required}
							<span class="text-red-400">*</span>
						{/if}
					</Label>
					<div class="flex items-start gap-2">
						{#if index > 0}
							<div class="flex h-10 w-24 shrink-0 items-center">
								{@render operatorSelect(child)}
							</div>
						{/if}
						<div class="min-w-0 flex-1">
							{@render conditionField(
								config,
								child,
								editor.getFieldError(child.id, fieldErrors)
							)}
						</div>
						<div class="flex h-10 shrink-0 items-center gap-2">
							<span
								{@attach tooltip(
									'Negate this condition. Enable to reverse: Passes if NOT matched.'
								)}
							>
								<InputCheckbox
									inline
									label="Not"
									bind:checked={
										() => child.negate ?? false,
										(value) => (child.negate = value)
									}
								/>
							</span>
							<Button
								variant="ghost"
								size="icon"
								icon="ri:close-line"
								aria-label="Remove"
								onclick={() => editor.removeChild(group, index)}
							/>
						</div>
					</div>
				</div>
			{/if}
		{:else}
			{#if index > 0}
				<div class="flex items-center">
					{@render operatorSelect(child)}
				</div>
			{/if}
			<div class="flex items-center gap-2">
				<div class="min-w-0 flex-1">
					<Self {editor} group={child} {fieldErrors} />
				</div>
				<Button
					variant="ghost"
					size="icon"
					icon="ri:close-line"
					aria-label="Remove"
					class="shrink-0 text-red-400"
					onclick={() => editor.removeChild(group, index)}
				/>
			</div>
		{/if}
	{/each}

	<div class="flex flex-wrap items-center gap-2">
		<Dropdown.Root>
			{#snippet trigger({ props })}
				<Button variant="ghost" size="sm" icon="ri:add-line" {...props}
					>Add Condition</Button
				>
			{/snippet}
			<Dropdown.Content>
				{#each editor.conditionDefinitions ?? [] as condition (condition.key)}
					<Dropdown.Item onclick={() => editor.addCondition(group, condition.key)}>
						{condition.name}{#if condition.required}<span class="text-red-400">
								*</span
							>{/if}
					</Dropdown.Item>
				{/each}
			</Dropdown.Content>
		</Dropdown.Root>
		{#if root}
			<Button
				variant="ghost"
				size="sm"
				icon="ri:node-tree"
				onclick={() => editor.addGroup(group)}
			>
				Add Group
			</Button>
		{/if}
	</div>
</div>
