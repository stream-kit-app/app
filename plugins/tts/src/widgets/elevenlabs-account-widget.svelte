<script lang="ts">
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	import { onMount } from 'svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Eyebrow } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText } from '@stream-kit/ui/input';
	import { WidgetFooterLink, WidgetStat } from '@stream-kit/ui/widget';

	import { elevenlabsAccount } from '../lib/elevenlabs/account.svelte';
	import { errorMessage } from '../lib/settings-helpers';

	const SETTINGS_PATH = '/plugins/tts';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);
	const account = $derived(elevenlabsAccount.account);
	const remaining = $derived(
		account ? Math.max(0, account.characterLimit - account.characterCount) : 0
	);
	const usagePercent = $derived(
		account && account.characterLimit > 0
			? Math.min(100, (account.characterCount / account.characterLimit) * 100)
			: 0
	);
	const resetDate = $derived(
		account?.nextResetUnix
			? new Date(account.nextResetUnix * 1000).toLocaleDateString(undefined, {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})
			: undefined
	);

	let editingKey = $state(false);
	let newKey = $state('');
	let savingKey = $state(false);
	let keyError = $state<string>();

	const numberFormat = new Intl.NumberFormat();

	function formatNumber(value: number): string {
		return numberFormat.format(value);
	}

	function formatTier(tier: string): string {
		return tier
			.split(/[_\s]+/)
			.filter(Boolean)
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join(' ');
	}

	function startEditingKey(): void {
		editingKey = true;
		newKey = '';
		keyError = undefined;
	}

	function cancelEditingKey(): void {
		editingKey = false;
		newKey = '';
		keyError = undefined;
	}

	async function saveKey(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		savingKey = true;
		keyError = undefined;

		try {
			await elevenlabsAccount.updateApiKey(app, newKey);
			editingKey = false;
			newKey = '';
			app.toast.create({
				title: app.i18n.translate('API key updated'),
				description: app.i18n.translate('ElevenLabs is connected.'),
				variant: 'success'
			});
		} catch (error) {
			keyError = errorMessage(error);
		} finally {
			savingKey = false;
		}
	}

	onMount(() => {
		if (!elevenlabsAccount.account) {
			void elevenlabsAccount.refresh();
		}
	});
</script>

{#snippet keyForm()}
	<form class="flex flex-col gap-2" onsubmit={saveKey}>
		<InputText
			type="password"
			label={t('ElevenLabs API key')}
			placeholder={t('Paste your ElevenLabs API key')}
			autocomplete="off"
			value={newKey}
			error={keyError}
			oninput={(event: Event & { currentTarget: HTMLInputElement }) =>
				(newKey = event.currentTarget.value)}
		/>
		<div class="flex justify-end gap-2">
			<Button variant="ghost" size="sm" onclick={cancelEditingKey} disabled={savingKey}>
				{t('Cancel')}
			</Button>
			<Button
				type="submit"
				size="sm"
				icon="ri:check-line"
				isLoading={savingKey}
				disabled={savingKey || !newKey.trim()}
			>
				{t('Save')}
			</Button>
		</div>
	</form>
{/snippet}

<div class="flex min-w-0 flex-1 flex-col gap-4">
	{#if !elevenlabsAccount.hasApiKey && !editingKey}
		<EmptyState
			compact
			icon="ri:key-2-line"
			title={t('ElevenLabs is not connected')}
			description={t('Add an API key to see your credits and subscription.')}
			actionLabel={t('Add API key')}
			onAction={startEditingKey}
		/>
	{:else}
		{#if account}
			<div class="flex items-start justify-between gap-3">
				<div class="flex min-w-0 flex-col gap-1">
					<Eyebrow>{t('Linked account')}</Eyebrow>
					<p class="truncate text-sm font-semibold text-dark-50">
						{account.firstName ?? t('ElevenLabs account')}
					</p>
					<p class="truncate font-mono text-xs text-dark-400">
						{account.apiKeyPreview ?? account.userId}
					</p>
				</div>
				<div class="flex shrink-0 items-center gap-1.5">
					<Badge variant="secondary" size="sm">{formatTier(account.tier)}</Badge>
					{#if account.status !== 'active' && account.status !== 'free'}
						<Badge variant="warning" size="sm">{formatTier(account.status)}</Badge>
					{/if}
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3 border-t border-rule pt-3">
				<WidgetStat label={t('Credits left')} value={formatNumber(remaining)} />
				<WidgetStat
					label={t('Credits used')}
					value={formatNumber(account.characterCount)}
					total={formatNumber(account.characterLimit)}
				/>
			</div>

			<div class="flex flex-col gap-1.5">
				<div
					class="h-1.5 overflow-hidden rounded-full bg-dark-800"
					role="progressbar"
					aria-label={t('Credits used')}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={Math.round(usagePercent)}
				>
					<div
						class={[
							'h-full rounded-full transition-[width] duration-300',
							usagePercent >= 90 ? 'bg-warning-500' : 'bg-primary'
						]}
						style:width="{usagePercent}%"
					></div>
				</div>
				<p class="flex justify-between gap-2 text-xs text-dark-300">
					<span>{t('{percent}% used', { percent: Math.round(usagePercent) })}</span>
					{#if resetDate}
						<span>{t('Resets on {date}', { date: resetDate })}</span>
					{/if}
				</p>
			</div>

			{#if account.voiceLimit > 0}
				<p class="text-xs text-dark-300">
					{t('Voice slots: {used} / {limit}', {
						used: account.voiceSlotsUsed,
						limit: account.voiceLimit
					})}
				</p>
			{/if}
		{:else if elevenlabsAccount.error}
			<Alert
				variant="error"
				title={t('Could not load ElevenLabs account')}
				description={elevenlabsAccount.error}
			/>
		{:else}
			<p class="py-6 text-center text-sm text-dark-300">{t('Loading account…')}</p>
		{/if}

		{#if !editingKey}
			<div class="flex flex-wrap gap-2 border-t border-rule pt-3">
				<Button
					variant="outline"
					size="sm"
					icon="ri:refresh-line"
					isLoading={elevenlabsAccount.loading}
					disabled={elevenlabsAccount.loading || !elevenlabsAccount.hasApiKey}
					onclick={() => void elevenlabsAccount.refresh()}
				>
					{t('Refresh')}
				</Button>
				<Button variant="outline" size="sm" icon="ri:key-2-line" onclick={startEditingKey}>
					{t('Update API key')}
				</Button>
			</div>
		{/if}
	{/if}

	{#if editingKey}
		<div class="border-t border-rule pt-3">
			{@render keyForm()}
		</div>
	{/if}

	<WidgetFooterLink href={SETTINGS_PATH} class="mt-auto">
		{t('TTS settings')}
	</WidgetFooterLink>
</div>
