<script lang="ts">
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';
	import type { ActionTrigger } from '$lib/core/action/action-trigger.svelte';
	import type { Action } from '$lib/core/action/action.svelte';
	import type { FormEventHandler } from 'svelte/elements';

	import { getActionGroups } from '$db/repositories/actions';

	import { Button } from '@stream-kit/ui/button';
	import { InputText, InputTextSelect, Label } from '@stream-kit/ui/input';
	import { VariablePopover } from '@stream-kit/ui/variable-popover';

	import {
		getGlobalVariables,
		getPrecedingActionVariables,
		getTriggerVariables,
		mergeContextVariables
	} from '$lib/core/action/variable-helpers';
	import { isIfHandler } from '$lib/core/action/if-condition';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import ConditionGroup from './condition-group.svelte';
	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import HandlerFieldGroup from './handler-field-group.svelte';
	import IfConditionSummary from './if-condition-summary.svelte';
	import SortableChainList from './sortable-chain-list.svelte';

	type Props = {
		action: Action;
	};

	let { action }: Props = $props();
	const { t } = useI18n();

	async function handleSave() {
		await action.save();
	}

	function addTrigger(definition: { id: string }) {
		const found = getApp().actions.triggers.find(definition.id);

		if (!found || found.isGroup || !found.isAvailable) {
			return;
		}

		action.addTrigger(found);
	}

	function reorderTriggers(triggers: ActionTrigger[]): void {
		action.triggers = triggers;
	}

	function reorderHandlers(handlers: ActionHandler[]): void {
		action.handlers = handlers;
	}

	function triggerLabel(trigger: ActionTrigger): string {
		return trigger.definition.name;
	}

	function handlerLabel(handler: ActionHandler): string {
		return handler.definition.name;
	}

	function addHandler(definition: { id: string }) {
		const found = getApp().actions.actions.find(definition.id);

		if (!found || found.isGroup || !found.isAvailable) {
			return;
		}

		action.addHandler(found);
	}

	const onNameInput: FormEventHandler<HTMLInputElement> = (event) => {
		action.name = event.currentTarget.value;
	};

	async function handleDelete() {
		const confirmed = await getApp().confirm.ask({
			title: t('Delete action'),
			description: t('Are you sure you want to delete "{name}"? This cannot be undone.', {
				name: action.name.trim() || t('this action')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await action.delete();
		}
	}

	function handleCancel() {
		action.close();
	}

	async function handleTest() {
		await action.test();
	}

	const canTest = $derived(
		action.hasTestableTriggers &&
			!action.execution.state.isRunning &&
			action.handlers.length > 0
	);

	const globalVariables = $derived(getGlobalVariables(getApp()));
	const baseContextVariables = $derived(
		mergeContextVariables(
			globalVariables,
			...action.triggers.map((trigger) => getTriggerVariables(action, trigger))
		)
	);

	function contextVariablesForHandler(handler: ActionHandler): typeof baseContextVariables {
		const handlerIndex = action.handlers.findIndex((item) => item.id === handler.id);

		return mergeContextVariables(
			baseContextVariables,
			getPrecedingActionVariables(action.handlers, handlerIndex)
		);
	}
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

	<section class="grid gap-3">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<div class="flex items-center gap-1">
				<Label>{t('Triggers')}</Label>
				<VariablePopover
					variables={globalVariables}
					title={t('Global variables')}
					emptyLabel={t('No global variables defined yet.')}
					ariaLabel={t('Show global variables')}
					copiedLabel={t('Copied')}
				/>
			</div>
			<DefinitionPickerDropdown
				label={t('Add Trigger')}
				definitions={getApp().actions.triggers.items}
				onSelect={addTrigger}
			/>
		</div>

		{#if action.formErrors?.triggers}
			<p class="text-sm text-destructive-50">{action.formErrors.triggers}</p>
		{/if}

		{#if action.triggers.length === 0}
			<p class="text-sm text-dark-300">{t('No triggers added yet.')}</p>
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
								'border-green-500 ring-1 ring-green-500/50':
									trigger.definition.isAvailable &&
									action.execution.state.activeTriggerId === trigger.id,
								'border-dark-600':
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
									<span class={cn('font-bold text-green-500')}>
										{t('ON')}
									</span>
									<span class="truncate text-dark-50 italic">
										{trigger.definition.name.toLowerCase()}
									</span>
								</span>
								<VariablePopover
									variables={getTriggerVariables(action, trigger)}
									title={t('Trigger variables')}
									emptyLabel={t('No variables available for this trigger.')}
									ariaLabel={t('Show trigger variables')}
									copiedLabel={t('Copied')}
								/>
							</span>
							<Button
								variant="ghost"
								size="icon"
								icon="ri:close-line"
								aria-label={t('Remove')}
								onclick={() => action.removeTrigger(trigger.id)}
							/>
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
	</section>

	<section class="grid gap-3">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<Label>{t('Handlers')}</Label>
			<DefinitionPickerDropdown
				label={t('Add Handler')}
				definitions={getApp().actions.actions.items}
				onSelect={addHandler}
			/>
		</div>

		{#if action.formErrors?.handlers}
			<p class="text-sm text-destructive-50">{action.formErrors.handlers}</p>
		{/if}

		{#if action.handlers.length === 0}
			<p class="text-sm text-dark-300">{t('No handlers added yet.')}</p>
		{/if}

		{#if action.handlers.length > 0}
			<SortableChainList
				items={action.handlers}
				getId={(handler: ActionHandler) => handler.id}
				getLabel={handlerLabel}
				sortableType="handler"
				onReorder={reorderHandlers}
			>
				{#snippet itemContent(handler: ActionHandler)}
					<div
						class={cn(
							'grid min-w-0 gap-2 rounded-xl border px-4 py-4 transition-colors duration-200',
							{
								'border-green-500 ring-1 ring-green-500/50':
									handler.definition.isAvailable &&
									action.execution.state.activeHandlerId === handler.id,
								'border-green-600/70':
									handler.definition.isAvailable &&
									action.execution.state.activeHandlerId !== handler.id &&
									action.execution.state.completedHandlerIds.includes(handler.id),
								'border-dark-600':
									handler.definition.isAvailable &&
									action.execution.state.activeHandlerId !== handler.id &&
									!action.execution.state.completedHandlerIds.includes(
										handler.id
									),
								'border-destructive-500 bg-destructive-800':
									!handler.definition.isAvailable
							}
						)}
					>
						<div class="flex items-center justify-between gap-2">
							{#if isIfHandler(handler)}
								<div class="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-1">
									<IfConditionSummary {handler} />
									{#if !handler.definition.isAvailable}
										<span class="text-sm font-normal text-destructive-50">
											{t('Unavailable')}
										</span>
									{/if}
								</div>
							{:else}
								<p class="min-w-0 font-medium text-dark-50">
									{handler.definition.name}
									{#if !handler.definition.isAvailable}
										<span class="ml-2 text-sm font-normal text-destructive-50">
											{t('Unavailable')}
										</span>
									{/if}
								</p>
							{/if}
							<Button
								variant="ghost"
								size="icon"
								icon="ri:close-line"
								aria-label={t('Remove')}
								onclick={() => action.removeHandler(handler.id)}
							/>
						</div>

						{#if !handler.definition.isAvailable}
							<p class="text-sm text-destructive-50">
								{t(
									'This handler is not available. The plugin may be disabled or missing.'
								)}
							</p>
						{/if}

						{#if action.formErrors?.handlerErrors[handler.id]?.missingFields.length}
							<ul class="grid gap-1 text-sm text-destructive-50">
								{#each action.formErrors.handlerErrors[handler.id].missingFields as name (name)}
									<li>{t('{field} is required', { field: name })}</li>
								{/each}
							</ul>
						{/if}

						{#if handler.fieldDefinitions?.length}
							<HandlerFieldGroup
								{handler}
								contextVariables={contextVariablesForHandler(handler)}
								fieldErrors={action.formErrors?.handlerErrors[handler.id]}
							/>
						{/if}
					</div>
				{/snippet}
			</SortableChainList>
		{/if}
	</section>

	<div class="flex flex-wrap items-center gap-2">
		{#if action.id != null}
			<Button
				type="button"
				variant="destructive"
				onclick={() => void handleDelete()}
				icon="ri:delete-bin-line"
			>
				{t('Delete')}
			</Button>
		{/if}
		<Button
			type="button"
			variant="outline"
			disabled={!canTest}
			onclick={() => void handleTest()}
			icon="ri:play-line"
		>
			{t('Test')}
		</Button>
		<Button type="button" variant="ghost" onclick={() => void handleCancel()} class="ms-auto">
			{t('Cancel')}
		</Button>
		<Button type="submit" onclick={() => void handleSave()}>{t('Save')}</Button>
	</div>
</form>
