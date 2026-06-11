<script lang="ts">
	import type { Timer } from '../lib/timer.svelte';
	import type { TimerPlatform } from '../lib/stored-timer';

	import { Button } from '@stream-kit/ui/button';
	import {
		InputCheckbox,
		InputSwitch,
		InputText,
		InputTextList,
		Label
	} from '@stream-kit/ui/input';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	type Props = {
		timer: Timer;
	};

	let { timer }: Props = $props();
	const { t } = useI18n();
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

	<InputTextList
		label={t('Messages')}
		bind:values={timer.messages}
		placeholder={t('Follow on social media!')}
		addLabel={t('Add message')}
		removeLabel={t('Remove')}
		error={timer.formErrors?.messages}
	/>

	<div class="grid gap-4 sm:grid-cols-2">
		<InputText
			label={t('Min interval (seconds)')}
			type="number"
			value={String(timer.intervalMinSec)}
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
		label={t('Minimum chat lines between messages')}
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
