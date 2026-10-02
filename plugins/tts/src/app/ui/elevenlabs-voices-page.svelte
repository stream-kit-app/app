<script lang="ts">
	import type { ElevenLabsVoice } from '../../lib/elevenlabs/types';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import Icon from '@iconify/svelte';
	import { onDestroy, onMount } from 'svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { CopyButton } from '@stream-kit/ui/copy-button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText } from '@stream-kit/ui/input';
	import { ToggleGroup } from '@stream-kit/ui/toggle-group';

	import {
		ElevenLabsVoiceLibrary,
		isOwnedVoice
	} from '../../lib/elevenlabs/voice-library.svelte';
	import { elevenlabsVoiceTuning } from '../../lib/elevenlabs/voice-tuning.svelte';

	type VoiceFilter = 'all' | 'mine';

	const SETTINGS_PATH = '/plugins/tts';

	let { app }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	// svelte-ignore state_referenced_locally
	const library = new ElevenLabsVoiceLibrary(app);

	let search = $state('');
	let filter = $state<VoiceFilter>('all');

	const visibleVoices = $derived.by(() => {
		const query = search.trim().toLowerCase();

		return library.voices.filter((voice) => {
			if (filter === 'mine' && !isOwnedVoice(voice)) {
				return false;
			}

			if (!query) {
				return true;
			}

			return [
				voice.name,
				voice.id,
				voice.language,
				voice.description,
				...Object.values(voice.labels ?? {})
			]
				.filter(Boolean)
				.some((value) => String(value).toLowerCase().includes(query));
		});
	});

	function voiceDetails(voice: ElevenLabsVoice): string {
		const labels = voice.labels ?? {};

		return [voice.language ?? labels.language, labels.gender, labels.accent, labels.age]
			.filter(Boolean)
			.join(' · ');
	}

	function categoryLabel(category: string | undefined): string {
		switch (category) {
			case 'cloned':
				return t('Cloned');
			case 'generated':
				return t('Generated');
			case 'professional':
				return t('Professional');
			case 'premade':
				return t('Default');
			default:
				return category ?? '';
		}
	}

	onMount(() => {
		void library.refresh();
	});

	onDestroy(() => {
		if (library.previewingId) {
			void library.stopPreview();
		}
	});
</script>

<Container class="flex flex-col gap-6 px-6 py-6" size="md">
	{#if !library.hasApiKey}
		<EmptyState
			icon="ri:key-2-line"
			title={t('ElevenLabs is not connected')}
			description={t('Add an API key in the TTS settings to manage your voices.')}
		>
			<Button href={SETTINGS_PATH} variant="outline" icon="ri:settings-3-line">
				{t('TTS settings')}
			</Button>
		</EmptyState>
	{:else}
		<div class="flex flex-wrap items-end justify-between gap-3">
			<div class="flex min-w-0 flex-1 flex-wrap items-end gap-3">
				<div class="w-full max-w-xs">
					<InputText
						prependIcon="ri:search-line"
						placeholder={t('Search by name, language, or id')}
						value={search}
						oninput={(event: Event & { currentTarget: HTMLInputElement }) =>
							(search = event.currentTarget.value)}
					/>
				</div>
				<ToggleGroup
					ariaLabel={t('Filter voices')}
					items={[
						{ value: 'all', label: t('All voices') },
						{ value: 'mine', label: t('My voices') }
					]}
					bind:value={filter}
				/>
			</div>
			<div class="flex items-center gap-2">
				<Button
					variant="outline"
					icon="ri:refresh-line"
					isLoading={library.loading}
					disabled={library.loading}
					onclick={() => void library.refresh(true)}
				>
					{t('Refresh')}
				</Button>
				<Button icon="ri:add-line" onclick={() => library.openClone()}>
					{t('Add voice')}
				</Button>
			</div>
		</div>

		{#if library.error}
			<Alert variant="error" title={t('Could not load voices')} description={library.error} />
		{/if}

		{#if library.loading && library.voices.length === 0}
			<p class="py-10 text-center text-sm text-dark-300">{t('Loading voices…')}</p>
		{:else if visibleVoices.length === 0}
			<EmptyState
				icon="ri:voiceprint-line"
				title={filter === 'mine' ? t('No voices of your own yet') : t('No voices found.')}
				description={filter === 'mine'
					? t('Clone a voice from audio samples to use it for TTS.')
					: undefined}
				actionLabel={filter === 'mine' ? t('Add voice') : undefined}
				onAction={filter === 'mine' ? () => library.openClone() : undefined}
			/>
		{:else}
			<ul class="grid overflow-hidden rounded-xl border border-rule">
				{#each visibleVoices as voice (voice.id)}
					{@const previewing = library.previewingId === voice.id}
					{@const details = voiceDetails(voice)}
					<li
						class="flex flex-wrap items-center gap-3 border-b border-rule bg-dark-900/40 px-4 py-3 last:border-b-0"
					>
						<Button
							variant="outline"
							size="icon-sm"
							icon={previewing ? 'ri:stop-fill' : 'ri:play-fill'}
							aria-label={previewing
								? t('Stop preview')
								: t('Play preview of {name}', { name: voice.name })}
							onclick={() => void library.preview(voice)}
						/>
						<div class="flex min-w-0 flex-1 flex-col gap-0.5">
							<div class="flex min-w-0 items-center gap-2">
								<span class="truncate text-sm font-semibold text-dark-50"
									>{voice.name}</span
								>
								{#if voice.category}
									<Badge
										variant={isOwnedVoice(voice) ? 'secondary' : 'outline'}
										size="sm"
									>
										{categoryLabel(voice.category)}
									</Badge>
								{/if}
								{#if elevenlabsVoiceTuning.has(voice.id)}
									<Badge variant="default" size="sm">
										<Icon icon="ri:equalizer-line" aria-hidden="true" />
										{t('Tuned')}
									</Badge>
								{/if}
							</div>
							<p class="truncate text-xs text-dark-300">
								{#if details}{details} ·
								{/if}<span class="font-mono">{voice.id}</span>
							</p>
						</div>
						<div class="flex shrink-0 items-center gap-1">
							<Button
								variant="ghost"
								size="sm"
								icon="ri:equalizer-line"
								onclick={() => library.openTuning(voice)}
								{@attach tooltip(() => t('Tune voice settings'))}
							>
								{t('Tune')}
							</Button>
							<CopyButton
								value={voice.id}
								label={t('Copy voice ID')}
								copiedLabel={t('Copied')}
								onCopied={() => library.notifyIdCopied(voice)}
								onCopyError={() => library.notifyIdCopyFailed()}
							/>
							{#if isOwnedVoice(voice)}
								<Button
									variant="ghost"
									size="icon-sm"
									icon="ri:delete-bin-line"
									aria-label={t('Delete {name}', { name: voice.name })}
									onclick={() => void library.remove(voice)}
									{@attach tooltip(() => t('Delete voice'))}
								/>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</Container>
