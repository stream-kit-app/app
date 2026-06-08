<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';
	import type { FormEventHandler } from 'svelte/elements';

	import { getActionGroups } from '$db/repositories/actions';

	import { Button } from '$lib/components/ui/button';
	import { InputText, InputTextSelect, Label } from '$lib/components/ui/input';
	import { getApp } from '$lib/core/registry';

	import ConditionGroup from './condition-group.svelte';
	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import HandlerFieldGroup from './handler-field-group.svelte';

	type Props = {
		action: Action;
	};

	let { action }: Props = $props();

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
			title: 'Delete action',
			description: `Are you sure you want to delete "${action.name.trim() || 'this action'}"? This cannot be undone.`,
			confirmLabel: 'Delete'
		});

		if (confirmed) {
			await action.delete();
		}
	}
</script>

<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>
	<InputText
		label="Name"
		required
		value={action.name}
		error={action.formErrors?.name}
		oninput={onNameInput}
	/>

	<InputTextSelect
		label="Group"
		placeholder="Select or enter a group"
		items={getActionGroups}
		bind:value={action.group}
	/>

	<section class="grid gap-3">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<Label>Triggers</Label>
			<DefinitionPickerDropdown
				label="Add Trigger"
				definitions={getApp().actions.triggers.items}
				onSelect={addTrigger}
			/>
		</div>

		{#if action.formErrors?.triggers}
			<p class="text-sm text-red-400">{action.formErrors.triggers}</p>
		{/if}

		{#if action.triggers.length === 0}
			<p class="text-sm text-dark-300">No triggers added yet.</p>
		{/if}

		{#each action.triggers as trigger (trigger.id)}
			<div
				class={`grid gap-2 rounded-xl border px-4 pt-4 pb-4 ${trigger.definition.isAvailable ? 'border-dark-600' : 'border-red-500 bg-red-500/5'}`}
			>
				<div class="flex items-center justify-between gap-2">
					<span class="flex items-center gap-2 font-mono font-medium text-dark-50">
						<span class={trigger.definition.isAvailable ? 'text-green-500' : 'text-red-400'}>
							{trigger.definition.isAvailable ? 'ON' : 'BROKEN'}
						</span>
						<span class="text-dark-50 italic">
							{trigger.definition.name.toLowerCase()}
						</span>
					</span>
					<Button
						variant="ghost"
						size="icon"
						icon="ri:close-line"
						aria-label="Remove trigger"
						onclick={() => action.removeTrigger(trigger.id)}
					/>
				</div>

				{#if !trigger.definition.isAvailable}
					<p class="text-sm text-red-300">
						This trigger is not available. The plugin may be disabled or missing.
					</p>
				{/if}

				{#if action.formErrors?.triggerErrors[trigger.id]?.missingConditions.length}
					<ul class="grid gap-1 text-sm text-red-400">
						{#each action.formErrors.triggerErrors[trigger.id].missingConditions as name (name)}
							<li>{name} is required</li>
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
		{/each}
	</section>

	<section class="grid gap-3">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<Label>Handlers</Label>
			<DefinitionPickerDropdown
				label="Add Handler"
				definitions={getApp().actions.actions.items}
				onSelect={addHandler}
			/>
		</div>

		{#if action.formErrors?.handlers}
			<p class="text-sm text-red-400">{action.formErrors.handlers}</p>
		{/if}

		{#if action.handlers.length === 0}
			<p class="text-sm text-dark-300">No handlers added yet.</p>
		{/if}

		{#each action.handlers as handler (handler.id)}
			<div
				class={`grid gap-2 rounded-xl border px-4 py-4 ${handler.definition.isAvailable ? 'border-dark-600' : 'border-red-500 bg-red-500/5'}`}
			>
				<div class="flex items-center justify-between gap-2">
					<p class="font-medium text-dark-50">
						{handler.definition.name}
						{#if !handler.definition.isAvailable}
							<span class="ml-2 text-sm font-normal text-red-300">Unavailable</span>
						{/if}
					</p>
					<Button
						variant="ghost"
						size="icon"
						icon="ri:close-line"
						aria-label="Remove handler"
						onclick={() => action.removeHandler(handler.id)}
					/>
				</div>

				{#if !handler.definition.isAvailable}
					<p class="text-sm text-red-300">
						This handler is not available. The plugin may be disabled or missing.
					</p>
				{/if}

				{#if action.formErrors?.handlerErrors[handler.id]?.missingFields.length}
					<ul class="grid gap-1 text-sm text-red-400">
						{#each action.formErrors.handlerErrors[handler.id].missingFields as name (name)}
							<li>{name} is required</li>
						{/each}
					</ul>
				{/if}

				{#if handler.fieldDefinitions?.length}
					<HandlerFieldGroup
						{handler}
						fieldErrors={action.formErrors?.handlerErrors[handler.id]}
					/>
				{/if}
			</div>
		{/each}
	</section>

	<div class="flex flex-wrap items-center justify-between gap-2">
		<Button type="submit" onclick={() => void handleSave()}>Save</Button>
		{#if action.id != null}
			<Button
				type="button"
				variant="ghost"
				class="text-destructive-50 hover:text-destructive-50"
				onclick={() => void handleDelete()}
				icon="ri:delete-bin-line"
			>
				Delete
			</Button>
		{/if}
	</div>
</form>
