<script lang="ts">
	import type { Command } from '$lib/core/commands/command.svelte';
	import type { CommandSource } from '$lib/core/commands/stored-command';
	import type { FormEventHandler } from 'svelte/elements';

	import { cn } from 'tailwind-variants';

	import { Button } from '@stream-kit/ui/button';
	import {
		InputCheckbox,
		InputSelect,
		InputSwitch,
		InputText,
		InputTextList,
		Label
	} from '@stream-kit/ui/input';

	import DefinitionPickerDropdown from '$lib/components/core/action/definition-picker-dropdown.svelte';
	import HandlerFieldGroup from '$lib/components/core/action/handler-field-group.svelte';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	type Props = {
		command: Command;
	};

	let { command }: Props = $props();
	const { t } = useI18n();

	const roleItems = [
		{ value: 'everyone', label: t('Everyone') },
		{ value: 'mod', label: t('Mod') },
		{ value: 'broadcaster', label: t('Broadcaster') },
		{ value: 'vip', label: t('VIP') },
		{ value: 'subscriber', label: t('Subscriber') }
	];

	function addHandler(definition: { id: string }) {
		const found = getApp().actions.actions.find(definition.id);

		if (!found || found.isGroup || !found.isAvailable) {
			return;
		}

		command.addHandler(found);
	}

	async function handleSave() {
		await command.save();
	}

	async function handleDelete() {
		const confirmed = await getApp().confirm.ask({
			title: t('Delete command'),
			description: t('Are you sure you want to delete "{name}"? This cannot be undone.', {
				name: command.name.trim() || t('this command')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await command.delete();
		}
	}

	const onNameInput: FormEventHandler<HTMLInputElement> = (event) => {
		command.name = event.currentTarget.value;
	};
</script>

<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>
	<InputText
		label={t('Name')}
		required
		value={command.name}
		error={command.formErrors?.name}
		oninput={onNameInput}
	/>

	<InputTextList
		label={t('Commands')}
		bind:values={command.commandNames}
		placeholder={t('hello')}
		addLabel={t('Add command')}
		removeLabel={t('Remove')}
		error={command.formErrors?.commandNames}
	/>

	<section class="grid gap-3">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<Label>{t('Handlers')}</Label>
			<DefinitionPickerDropdown
				label={t('Add Handler')}
				definitions={getApp().actions.actions.items}
				onSelect={addHandler}
			/>
		</div>

		{#if command.formErrors?.handlers}
			<p class="text-sm text-destructive-50">{command.formErrors.handlers}</p>
		{/if}

		{#if command.handlers.length === 0}
			<p class="text-sm text-dark-300">{t('No handlers added yet.')}</p>
		{/if}

		{#each command.handlers as handler (handler.id)}
			<div
				class={cn('grid gap-2 rounded-xl border px-4 py-4', {
					'border-dark-600': handler.definition.isAvailable,
					'border-destructive-500 bg-destructive-800': !handler.definition.isAvailable
				})}
			>
				<div class="flex items-center justify-between gap-2">
					<p class="font-medium text-dark-50">
						{handler.definition.name}
						{#if !handler.definition.isAvailable}
							<span class="ml-2 text-sm font-normal text-destructive-50"
								>{t('Unavailable')}</span
							>
						{/if}
					</p>
					<Button
						variant="ghost"
						size="icon"
						icon="ri:close-line"
						aria-label={t('Remove')}
						onclick={() => command.removeHandler(handler.id)}
					/>
				</div>

				{#if !handler.definition.isAvailable}
					<p class="text-sm text-destructive-50">
						{t('This handler is not available. The plugin may be disabled or missing.')}
					</p>
				{/if}

				{#if command.formErrors?.handlerErrors[handler.id]?.missingFields.length}
					<ul class="grid gap-1 text-sm text-destructive-50">
						{#each command.formErrors.handlerErrors[handler.id].missingFields as name (name)}
							<li>{t('{field} is required', { field: name })}</li>
						{/each}
					</ul>
				{/if}

				{#if handler.fieldDefinitions?.length}
					<HandlerFieldGroup
						{handler}
						fieldErrors={command.formErrors?.handlerErrors[handler.id]}
					/>
				{/if}
			</div>
		{/each}
	</section>

	<section class="grid gap-3">
		<Label>{t('Platforms')}</Label>
		<div class="flex flex-wrap gap-4">
			<InputCheckbox
				inline
				label={t('Twitch')}
				bind:checked={
					() => command.sources.includes('twitch'),
					(checked) => {
						if (checked) {
							command.sources = [
								...new Set<CommandSource>([...command.sources, 'twitch'])
							];
						} else {
							command.sources = command.sources.filter((source) => source !== 'twitch');
						}
					}
				}
			/>
			<InputCheckbox
				inline
				label={t('YouTube')}
				bind:checked={
					() => command.sources.includes('youtube'),
					(checked) => {
						if (checked) {
							command.sources = [
								...new Set<CommandSource>([...command.sources, 'youtube'])
							];
						} else {
							command.sources = command.sources.filter((source) => source !== 'youtube');
						}
					}
				}
			/>
		</div>
		{#if command.formErrors?.sources}
			<p class="text-sm text-destructive-50">{command.formErrors.sources}</p>
		{/if}
	</section>

	<InputSelect
		type="multiple"
		label={t('Allowed roles')}
		items={roleItems}
		bind:value={command.permissions.roles}
	/>

	<InputSwitch label={t('Enabled')} bind:checked={command.enabled} />

	<div class="flex flex-wrap justify-between gap-3">
		{#if command.id != null}
			<Button variant="destructive" type="button" onclick={() => void handleDelete()}>
				{t('Delete')}
			</Button>
		{:else}
			<div></div>
		{/if}

		<div class="flex gap-2">
			<Button variant="ghost" type="button" onclick={() => command.close()}>
				{t('Cancel')}
			</Button>
			<Button type="button" onclick={() => void handleSave()}>{t('Save')}</Button>
		</div>
	</div>
</form>
