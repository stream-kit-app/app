<script lang="ts">
	import type { ConditionEditor } from '$lib/core/action/condition-editor';
	import type {
		ConditionGroupNode,
		ConditionLeafNode,
		ConditionNode,
		ResolvedConditionDefinition
	} from '$lib/core/action/trigger';
	import type { SelectItemsSource } from '$lib/core/action/trigger/condition';
	import type { ConditionFormErrors } from '$lib/core/action/validate-form';
	import type { FormEventHandler } from 'svelte/elements';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Button } from '@stream-kit/ui/button';
	import * as Dropdown from '@stream-kit/ui/dropdown';
	import {
		InputCheckbox,
		InputCronExpression,
		InputSelect,
		InputSelectText,
		InputText,
		InputTextSelectText,
		InputTextVariables,
		Label
	} from '@stream-kit/ui/input';

	import { cn } from '$lib/utils';

	import Self from './condition-group.svelte';
	import ConditionSelectValueLabel from './condition-select-value-label.svelte';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';

	type Props = {
		editor: ConditionEditor;
		group: ConditionGroupNode;
		fieldErrors?: ConditionFormErrors;
		root?: boolean;
		t?: TranslateFn;
	};

	let { editor, group, fieldErrors, root = false, t: translateProp }: Props = $props();
	const t = $derived(resolveTranslate(translateProp));

	const operatorItems = $derived([
		{ value: 'and', label: t('AND') },
		{ value: 'or', label: t('OR') }
	]);

	const renderableChildCount = $derived(
		group.children.filter((child) => {
			if (child.kind === 'group') {
				return true;
			}

			return !!editor.getConditionDefinition(child.key);
		}).length
	);

	function renderableIndexAt(index: number): number {
		return (
			group.children.slice(0, index + 1).filter((child) => {
				if (child.kind === 'group') {
					return true;
				}

				return !!editor.getConditionDefinition(child.key);
			}).length - 1
		);
	}

	const onConditionTextInput =
		(node: ConditionLeafNode): FormEventHandler<HTMLInputElement> =>
		(event) => {
			node.value = event.currentTarget.value;
		};

	function translateSelectItems(items: SelectItemsSource): SelectItemsSource {
		if (typeof items === 'function') {
			return async () => {
				const resolved = await items();

				return resolved.map((item) => ({
					...item,
					label: t(item.label)
				}));
			};
		}

		return items.map((item) => ({
			...item,
			label: t(item.label)
		}));
	}
</script>

{#snippet conditionField(
	config: ResolvedConditionDefinition,
	node: ConditionLeafNode,
	error?: string
)}
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
	{:else if config.type === 'cron-expression'}
		<InputCronExpression
			placeholder={config.placeholder}
			required={config.required}
			presets={Array.isArray(config.presets)
				? config.presets.map((preset) => ({
						...preset,
						label: t(preset.label)
					}))
				: undefined}
			fieldLabels={{
				minute: t('Minute'),
				hour: t('Hour'),
				day: t('Day'),
				month: t('Month'),
				weekday: t('Weekday')
			}}
			validLabel={t('Valid expression')}
			invalidLabel={t('Invalid cron expression')}
			nextRunLabel={t('Next run')}
			presetsPlaceholder={t('Presets')}
			editorTitle={t('Cron expression')}
			emptyLabel={t('Configure cron expression')}
			editAriaLabel={t('Edit cron expression')}
			value={(node.value as string) ?? ''}
			error={error ? t(error) : undefined}
			oninput={onConditionTextInput(node)}
		/>
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
			<p class="text-sm text-red-400">{t(error)}</p>
		{/if}
	{:else if config.type === 'select'}
		<InputSelect
			type="single"
			placeholder={config.placeholder}
			loadingPlaceholder={config.loadingPlaceholder}
			searchPlaceholder={t('Search ...')}
			noResultsLabel={t('No matches found')}
			items={translateSelectItems(config.items)}
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
			contentProps={{ align: 'start', collisionPadding: 8 }}
			{error}
			bind:value={node.value as { type: string; value: string }}
		/>
	{:else if config.type === 'text-select-text'}
		<InputTextSelectText
			items={config.items}
			pathPlaceholder={config.pathPlaceholder}
			valuePlaceholder={config.valuePlaceholder}
			loadingPlaceholder={config.loadingPlaceholder}
			selectPlaceholder={config.selectPlaceholder}
			variables={config.variables}
			selectClass="w-32"
			contentProps={{ align: 'start', collisionPadding: 8 }}
			{error}
			bind:value={node.value as { path: string; type: string; value: string }}
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
				{@const renderableIndex = renderableIndexAt(index)}
				<div class="grid gap-2">
					<Label class="flex w-full min-w-0 items-baseline gap-x-1.5 font-mono text-base">
						<span class="shrink-0 font-bold text-green-500 uppercase">
							{renderableIndex === 0 ? t('if') : (child.operator ?? 'and')}
						</span>
						<span class="shrink-0 text-primary-100 italic">{config.name.toLowerCase()}</span>
						{#if config.type === 'select'}
							<ConditionSelectValueLabel
								items={translateSelectItems(config.items)}
								value={(child.value as string) ?? ''}
							/>
						{/if}
						{#if child.negate}
							<span class="font-bold text-red-400 uppercase">{t('not')}</span>
						{/if}
						{#if config.required}
							<span class="text-red-400">*</span>
						{/if}
					</Label>
					<div class="flex items-start gap-2">
						{#if renderableChildCount > 1 && renderableIndex > 0}
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
									t(
										'Negate this condition. Enable to reverse: Passes if NOT matched.'
									)
								)}
							>
								<InputCheckbox
									inline
									label={t('Not')}
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
								aria-label={t('Remove')}
								onclick={() => editor.removeChild(group, index)}
							/>
						</div>
					</div>
				</div>
			{/if}
		{:else}
			{@const renderableIndex = renderableIndexAt(index)}
			{#if renderableChildCount > 1 && renderableIndex > 0}
				<div class="flex items-center">
					{@render operatorSelect(child)}
				</div>
			{/if}
			<div class="flex items-center gap-2">
				<div class="min-w-0 flex-1">
					<Self {editor} group={child} {fieldErrors} {t} />
				</div>
				<Button
					variant="ghost"
					size="icon"
					icon="ri:close-line"
					aria-label={t('Remove')}
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
					>{t('Add Condition')}</Button
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
				{t('Add Group')}
			</Button>
		{/if}
	</div>
</div>
