<script lang="ts">

	import type { Command } from '../lib/command.svelte';

	import type { CommandSource } from '../lib/stored-command';



	import { Button } from '@stream-kit/ui/button';

	import {
		InputCheckbox,
		InputSelect,
		InputSwitch,
		InputText,
		InputTextList,
		InputTextSelect,
		Label
	} from '@stream-kit/ui/input';



	import HandlerChainEditor from '@stream-kit/plugin/action-ui/handler-chain-editor.svelte';

	import { getGlobalVariables, type HandlerDefinition } from '@stream-kit/plugin/action';

	import { getCommandsService } from '../lib/get-commands';

	import { contextVariablesForCommandHandler } from '../lib/command-context-variables';



	type Props = {

		command: Command;

	};



	let { command }: Props = $props();

	const app = getCommandsService().requireApp();

	const t = app.i18n.t;



	const roleItems = [

		{ value: 'everyone', label: t('Everyone') },

		{ value: 'mod', label: t('Mod') },

		{ value: 'broadcaster', label: t('Broadcaster') },

		{ value: 'vip', label: t('VIP') },

		{ value: 'subscriber', label: t('Subscriber') }

	];



	const globalVariables = $derived(getGlobalVariables(app));



	function addHandler(definition: HandlerDefinition) {

		if (definition.isGroup || !definition.isAvailable) {

			return;

		}



		command.addHandler(definition);

	}



	function contextVariablesForHandler(handler: (typeof command.handlers)[number]) {

		return contextVariablesForCommandHandler(app, command.handlers, handler, command.commandNames);

	}



	async function handleSave() {

		await command.save();

	}



	async function handleDelete() {

		const confirmed = await app.confirm.ask({

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



	const onNameInput = (event: Event) => {

		command.name = (event.currentTarget as HTMLInputElement).value;

	};

	function cooldownMsToSeconds(ms: number | null): string {
		if (ms == null || ms <= 0) {
			return '';
		}

		return String(ms / 1000);
	}

	function parseCooldownSeconds(value: string): number | null {
		const trimmed = value.trim();

		if (!trimmed) {
			return null;
		}

		const seconds = Number(trimmed);

		if (!Number.isFinite(seconds) || seconds <= 0) {
			return null;
		}

		return Math.round(seconds * 1000);
	}

</script>



<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>

	<InputText

		label={t('Name')}

		required

		value={command.name}

		error={command.formErrors?.name}

		oninput={onNameInput}

	/>



	<InputTextSelect

		label={t('Group')}

		placeholder={t('Select or enter a group')}

		items={() => getCommandsService().getGroups()}

		bind:value={command.group}

	/>



	<InputTextList

		label={t('Commands')}

		bind:values={command.commandNames}

		placeholder={t('setalias <target>')}

		addLabel={t('Add command')}

		removeLabel={t('Remove')}

		error={command.formErrors?.commandNames}

	/>

	<p class="text-sm text-dark-300">

		{t('Use <arg> for command arguments. The last argument captures the rest of the message.')}

	</p>



	<HandlerChainEditor

		host={command}

		definitions={app.actions.getHandlers()}

		formErrors={command.formErrors}

		contextVariablesForHandler={contextVariablesForHandler}

		{globalVariables}

		showVariablePopover

		onAddHandler={addHandler}

		{app}

		{t}

	/>



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

							command.sources = command.sources.filter(

								(source) => source !== 'twitch'

							);

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

							command.sources = command.sources.filter(

								(source) => source !== 'youtube'

							);

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

	<section class="grid gap-3">
		<Label>{t('Cooldown')}</Label>
		<div class="grid gap-4 sm:grid-cols-2">
			<InputText
				label={t('Global cooldown (seconds)')}
				type="number"
				min="0"
				value={cooldownMsToSeconds(command.cooldownGlobalMs)}
				error={command.formErrors?.cooldownGlobal}
				oninput={(event) => {
					command.cooldownGlobalMs = parseCooldownSeconds(
						(event.currentTarget as HTMLInputElement).value
					);
				}}
			/>
			<InputText
				label={t('User cooldown (seconds)')}
				type="number"
				min="0"
				value={cooldownMsToSeconds(command.cooldownUserMs)}
				error={command.formErrors?.cooldownUser}
				oninput={(event) => {
					command.cooldownUserMs = parseCooldownSeconds(
						(event.currentTarget as HTMLInputElement).value
					);
				}}
			/>
		</div>
		<p class="text-sm text-dark-300">
			{t(
				'Global cooldown applies between any use of this command. User cooldown applies per viewer. Leave empty for no cooldown.'
			)}
		</p>
	</section>

	<InputSwitch label={t('Enabled')} bind:checked={command.enabled} />



	<div class="flex flex-wrap justify-between gap-3">

		{#if command.id != null}

			<Button

				variant="destructive"

				type="button"

				onclick={() => void handleDelete()}

				icon="ri:delete-bin-line"

			>

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


