<script lang="ts">
	import type { Timer } from '../lib/timer.svelte';
	import type { TimerPlatform } from '../lib/stored-timer';
	import type { HandlerDefinition } from '@stream-kit/plugin/action';

	import {
		InputCheckbox,
		InputSwitch,
		InputText,
		Label
	} from '@stream-kit/ui/input';

	import HandlerChainEditor from '@stream-kit/plugin/action-ui/handler-chain-editor.svelte';
	import { getGlobalVariables } from '@stream-kit/plugin/action';
	import { getTimersService } from '../lib/get-timers';
	import { contextVariablesForTimerHandler } from '../lib/timer-context-variables';

	type Props = {
		timer: Timer;
	};

	let { timer }: Props = $props();
	const app = getTimersService().requireApp();
	const t = app.i18n.t;

	const globalVariables = $derived(getGlobalVariables(app));

	function addHandler(definition: HandlerDefinition) {
		if (definition.isGroup || !definition.isAvailable) {
			return;
		}

		timer.addHandler(definition);
	}

	function contextVariablesForHandler(handler: (typeof timer.handlers)[number]) {
		return contextVariablesForTimerHandler(app, timer.handlers, handler);
	}
</script>

<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>
	<InputText
		label={t('Name')}
		required
		value={timer.name}
		error={timer.formErrors?.name}
		oninput={(event) => {
			timer.name = (event.currentTarget as HTMLInputElement).value;
		}}
	/>

	<HandlerChainEditor
		host={timer}
		definitions={app.actions.getHandlers()}
		formErrors={timer.formErrors}
		contextVariablesForHandler={contextVariablesForHandler}
		{globalVariables}
		showVariablePopover
		onAddHandler={addHandler}
		{app}
		{t}
	/>

	<div class="grid gap-4 sm:grid-cols-2">
		<InputText
			label={t('Min interval (seconds)')}
			type="number"
			value={String(timer.intervalMinSec)}
			error={timer.formErrors?.interval}
			oninput={(event) => {
				timer.intervalMinSec = Number((event.currentTarget as HTMLInputElement).value) || 30;
			}}
		/>
		<InputText
			label={t('Max interval (seconds)')}
			type="number"
			value={String(timer.intervalMaxSec)}
			oninput={(event) => {
				timer.intervalMaxSec = Number((event.currentTarget as HTMLInputElement).value) || 60;
			}}
		/>
	</div>

	<InputText
		label={t('Minimum chat messages between runs')}
		type="number"
		value={String(timer.minChatLines)}
		oninput={(event) => {
			timer.minChatLines = Number((event.currentTarget as HTMLInputElement).value) || 0;
		}}
	/>

	<section class="grid gap-3">
		<Label>{t('Platforms')}</Label>
		<div class="flex flex-wrap gap-4">
			<InputCheckbox
				inline
				label={t('Twitch')}
				bind:checked={
					() => timer.platforms.includes('twitch'),
					(checked) => {
						if (checked) {
							timer.platforms = [...new Set<TimerPlatform>([...timer.platforms, 'twitch'])];
						} else {
							timer.platforms = timer.platforms.filter((p) => p !== 'twitch');
						}
					}
				}
			/>
			<InputCheckbox
				inline
				label={t('YouTube')}
				bind:checked={
					() => timer.platforms.includes('youtube'),
					(checked) => {
						if (checked) {
							timer.platforms = [...new Set<TimerPlatform>([...timer.platforms, 'youtube'])];
						} else {
							timer.platforms = timer.platforms.filter((p) => p !== 'youtube');
						}
					}
				}
			/>
		</div>
		{#if timer.formErrors?.platforms}
			<p class="text-sm text-destructive-50">{timer.formErrors.platforms}</p>
		{/if}
	</section>

	<InputSwitch label={t('Only when live')} bind:checked={timer.onlineOnly} />
	<InputSwitch label={t('Enabled')} bind:checked={timer.enabled} />
</form>
