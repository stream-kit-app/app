<script lang="ts">
	import type { Timer } from '../lib/timer.svelte';
	import type { TimerPlatform } from '../lib/stored-timer';

	import { Button } from '@stream-kit/ui/button';
	import {
		InputCheckbox,
		InputSwitch,
		InputText,
		Label
	} from '@stream-kit/ui/input';

	import DefinitionPickerDropdown from '$lib/components/core/action/definition-picker-dropdown.svelte';
	import HandlerFieldGroup from '$lib/components/core/action/handler-field-group.svelte';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		timer: Timer;
	};

	let { timer }: Props = $props();
	const { t } = useI18n();

	function addHandler(definition: { id: string }) {
		const found = getApp().actions.actions.find(definition.id);

		if (!found || found.isGroup || !found.isAvailable) {
			return;
		}

		timer.addHandler(found);
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

	<section class="grid gap-3">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<Label>{t('Handlers')}</Label>
			<DefinitionPickerDropdown
				label={t('Add Handler')}
				definitions={getApp().actions.actions.items}
				onSelect={addHandler}
			/>
		</div>

		{#if timer.formErrors?.handlers}
			<p class="text-sm text-destructive-50">{timer.formErrors.handlers}</p>
		{/if}

		{#if timer.handlers.length === 0}
			<p class="text-sm text-dark-300">{t('No handlers added yet.')}</p>
		{/if}

		{#each timer.handlers as handler (handler.id)}
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
						onclick={() => timer.removeHandler(handler.id)}
					/>
				</div>

				{#if !handler.definition.isAvailable}
					<p class="text-sm text-destructive-50">
						{t('This handler is not available. The plugin may be disabled or missing.')}
					</p>
				{/if}

				{#if timer.formErrors?.handlerErrors[handler.id]?.missingFields.length}
					<ul class="grid gap-1 text-sm text-destructive-50">
						{#each timer.formErrors.handlerErrors[handler.id].missingFields as name (name)}
							<li>{t('{field} is required', { field: name })}</li>
						{/each}
					</ul>
				{/if}

				{#if handler.fieldDefinitions?.length}
					<HandlerFieldGroup
						{handler}
						fieldErrors={timer.formErrors?.handlerErrors[handler.id]}
					/>
				{/if}
			</div>
		{/each}
	</section>

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

	<div class="flex flex-wrap justify-between gap-3">
		{#if timer.id != null}
			<Button
				variant="destructive"
				type="button"
				onclick={async () => {
					const confirmed = await getApp().confirm.ask({
						title: t('Delete timer'),
						description: t('Are you sure you want to delete "{name}"?', {
							name: timer.name.trim() || t('this timer')
						}),
						confirmLabel: t('Delete')
					});
					if (confirmed) await timer.delete();
				}}
				icon="ri:delete-bin-line"
			>
				{t('Delete')}
			</Button>
		{:else}
			<div></div>
		{/if}

		<div class="flex gap-2">
			<Button variant="ghost" type="button" onclick={() => timer.close()}>{t('Cancel')}</Button>
			<Button type="button" onclick={() => void timer.save()}>{t('Save')}</Button>
		</div>
	</div>
</form>
