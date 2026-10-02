<script lang="ts">
	import type { ActionTrigger } from '$lib/core/action/action-trigger.svelte';
	import type { Action as ActionType } from '$lib/core/action/action.svelte';
	import type { FormEventHandler } from 'svelte/elements';

	import { getActionGroups } from '$db/repositories/actions';

	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputSelect, InputText, InputTextSelect, Label } from '@stream-kit/ui/input';
	import { VariablePopover } from '@stream-kit/ui/variable-popover';

	import { tooltip } from '$lib/attachments';
	import {
		getGlobalVariables,
		getTriggerVariables,
		mergeContextVariables
	} from '$lib/core/action/variable-helpers';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import ConditionGroup from './condition-group.svelte';
	import DefinitionIdPopover from './definition-id-popover.svelte';
	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import HandlerChainEditor from './handler-chain-editor.svelte';
	import { scrollChainItemIntoView } from './scroll-chain-item';
	import SortableChainList from './sortable-chain-list.svelte';
	import { StickyHeaderState } from './sticky-header.svelte';

	type Props = {
		action: ActionType;
	};

	let { action }: Props = $props();
	const { t } = useI18n();
	const triggersHeader = new StickyHeaderState();

	function addTrigger(definition: { id: string }) {
		const found = getApp().actions.triggers.find(definition.id);

		if (!found || found.isGroup || !found.isAvailable) {
			return;
		}

		action.addTrigger(found);

		const added = action.triggers[action.triggers.length - 1];
		if (added) {
			void scrollChainItemIntoView(added.id);
		}
	}

	function reorderTriggers(triggers: ActionTrigger[]): void {
		action.triggers = triggers;
	}

	function triggerLabel(trigger: ActionTrigger): string {
		return trigger.definition.name;
	}

	const onNameInput: FormEventHandler<HTMLInputElement> = (event) => {
		action.name = event.currentTarget.value;
	};

	const NO_QUEUE_VALUE = 'none';

	const queueItems = $derived([
		{ value: NO_QUEUE_VALUE, label: t('No queue') },
		...getApp().actionQueues.definitions.map((queue) => ({
			value: String(queue.id),
			label: queue.name
		}))
	]);

	const selectedQueueValue = $derived(
		action.queueId != null ? String(action.queueId) : NO_QUEUE_VALUE
	);

	function onQueueChange(value: string): void {
		action.queueId = value === NO_QUEUE_VALUE ? null : Number(value);
	}

	const globalVariables = $derived(getGlobalVariables(getApp()));
	const baseContextVariables = $derived(
		mergeContextVariables(
			globalVariables,
			...action.triggers.map((trigger) => getTriggerVariables(action, trigger))
		)
	);
</script>

<form
	class={cn('grid gap-6 rounded-xl transition-colors duration-200')}
	onsubmit={(event: SubmitEvent) => event.preventDefault()}
>
	<InputText
		label={t('Name')}
		required
		value={action.name}
		error={action.formErrors?.name}
		oninput={onNameInput}
	/>

	<InputTextSelect
		label={t('Group')}
		placeholder={t('Select or enter a group')}
		items={getActionGroups}
		bind:value={action.group}
	/>

	<InputSelect
		label={t('Queue')}
		items={queueItems}
		value={selectedQueueValue}
		onValueChange={onQueueChange}
	/>

	<section class="relative grid gap-3">
		<div
			bind:this={triggersHeader.sentinel}
			aria-hidden="true"
			class="pointer-events-none absolute inset-x-0 top-0 h-px"
		></div>
		<div
			class={cn(
				'sticky top-0 z-20 -mx-8 flex items-center gap-1 border-b border-transparent bg-dark-800 px-8 py-2',
				triggersHeader.isStuck && 'border-rule'
			)}
		>
			<Label>{t('Triggers')}</Label>
			<VariablePopover
				variables={globalVariables}
				title={t('Global variables')}
				emptyLabel={t('No global variables defined yet.')}
				ariaLabel={t('Show global variables')}
				copiedLabel={t('Copied')}
			/>
			<div class="ml-auto shrink-0">
				<DefinitionPickerDropdown
					label={t('Add Trigger')}
					definitions={getApp().actions.triggers.items}
					onSelect={addTrigger}
				/>
			</div>
		</div>

		<div class="grid gap-3">
			{#if action.formErrors?.triggers}
				<p class="text-sm text-destructive-50">{action.formErrors.triggers}</p>
			{/if}

			{#if action.triggers.length === 0}
				<EmptyState compact icon="ri:flashlight-line" title={t('No triggers added yet.')} />
			{/if}

			{#if action.triggers.length > 0}
				<SortableChainList
					items={action.triggers}
					getId={(trigger: ActionTrigger) => trigger.id}
					getLabel={triggerLabel}
					sortableType="trigger"
					onReorder={reorderTriggers}
				>
				{#snippet itemContent(trigger: ActionTrigger)}
					<div
						class={cn(
							'grid min-w-0 rounded-xl border px-4 pt-4 pb-4 transition-colors duration-200',
							{
								'border-success-200 ring-1 ring-success-200/50':
									trigger.definition.isAvailable &&
									action.execution.state.activeTriggerId === trigger.id,
								'border-rule':
									trigger.definition.isAvailable &&
									action.execution.state.activeTriggerId !== trigger.id,
								'border-destructive-500 bg-destructive-800':
									!trigger.definition.isAvailable
							}
						)}
					>
						<div class="relative top-2 flex items-center gap-2">
							{#if trigger.pluginName}
								<span class="font-mono text-primary italic">
									{trigger.pluginName}
								</span>
							{/if}
						</div>
						<div class="flex items-center justify-between gap-2">
							<span
								class="flex min-w-0 flex-1 items-center gap-2 font-mono font-medium text-dark-50"
							>
								<span class="flex min-w-0 items-center gap-2">
									<span class={'font-bold text-success-100'}>
										{t('ON')}
									</span>
									<DefinitionIdPopover
										id={trigger.definition.id}
										class="min-w-0 truncate text-dark-50 italic"
									>
										{trigger.definition.name.toLowerCase()}
									</DefinitionIdPopover>
								</span>
								<VariablePopover
									variables={getTriggerVariables(action, trigger)}
									title={t('Trigger variables')}
									emptyLabel={t('No variables available for this trigger.')}
									ariaLabel={t('Show trigger variables')}
									copiedLabel={t('Copied')}
								/>
							</span>
							<div class="flex shrink-0 items-center gap-1">
								<Button
									variant="ghost"
									size="icon"
									icon="ri:stack-line"
									aria-label={t('Clone trigger')}
									onclick={() => action.cloneTrigger(trigger.id)}
									{@attach tooltip(() => t('Clone trigger'))}
								/>
								<Button
									variant="ghost"
									size="icon"
									icon="ri:close-line"
									aria-label={t('Remove')}
									onclick={() => action.removeTrigger(trigger.id)}
									{@attach tooltip(() => t('Remove trigger'))}
								/>
							</div>
						</div>

						{#if !trigger.definition.isAvailable}
							<p class="text-sm text-destructive-50">
								{t(
									'This trigger is not available. The plugin may be disabled or missing.'
								)}
							</p>
						{/if}

						{#if action.formErrors?.triggerErrors[trigger.id]?.missingConditions.length}
							<ul class="grid gap-1 text-sm text-destructive-50">
								{#each action.formErrors.triggerErrors[trigger.id].missingConditions as name (name)}
									<li>{t('{field} is required', { field: name })}</li>
								{/each}
							</ul>
						{/if}

						{#if trigger.conditionDefinitions?.length}
							<ConditionGroup
								editor={trigger}
								group={trigger.conditions}
								fieldErrors={action.formErrors?.triggerErrors[trigger.id]}
								root
							/>
						{/if}
					</div>
				{/snippet}
				</SortableChainList>
			{/if}
		</div>
	</section>

	<HandlerChainEditor
		host={action}
		definitions={getApp().actions.actions.items}
		formErrors={action.formErrors}
		baseVariables={baseContextVariables}
		{globalVariables}
		showVariablePopover
	/>
</form>
