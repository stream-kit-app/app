<script lang="ts">
	import type { CloneSample, VoiceCloneEditor } from '../../lib/elevenlabs/voice-library.svelte';

	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox, InputSwitch, InputText, InputTextarea } from '@stream-kit/ui/input';

	type Props = {
		editor: VoiceCloneEditor;
	};

	let { editor }: Props = $props();
	const t = $derived(editor.app.i18n.t);

	let fileInput = $state<HTMLInputElement>();

	function formatDuration(seconds: number): string {
		const total = Math.round(seconds);

		return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
	}

	function sampleStatus(sample: CloneSample): string {
		if (sample.status === 'processing') {
			return t('Processing…');
		}

		if (sample.status === 'error') {
			return sample.error ?? t('Could not process this file.');
		}

		if (sample.durationSeconds === undefined) {
			return t('Ready');
		}

		const parts = [
			sample.chunked ? t('{count} parts', { count: sample.files.length }) : t('Converted'),
			formatDuration(sample.durationSeconds)
		];

		if (sample.trimmed) {
			parts.push(t('trimmed'));
		}

		return parts.join(' · ');
	}

	function formatSize(bytes: number): string {
		return bytes >= 1024 * 1024
			? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
			: `${Math.max(1, Math.round(bytes / 1024))} KB`;
	}
</script>

<form
	class="grid gap-5"
	onsubmit={(event: SubmitEvent) => {
		event.preventDefault();
		void editor.submit();
	}}
>
	<InputText
		label={t('Name')}
		required
		autocomplete="off"
		placeholder={t('My stream voice')}
		value={editor.name}
		oninput={(event: Event & { currentTarget: HTMLInputElement }) =>
			(editor.name = event.currentTarget.value)}
	/>

	<InputTextarea
		label={t('Description')}
		rows={2}
		placeholder={t('Optional, e.g. calm and warm, Dutch accent')}
		bind:value={editor.description}
	/>

	<div class="grid gap-2">
		<div class="flex items-center justify-between gap-3">
			<span class="text-sm font-medium text-dark-100">{t('Audio samples')}</span>
			<Button
				variant="outline"
				size="sm"
				icon="ri:upload-2-line"
				onclick={() => fileInput?.click()}
			>
				{t('Add files')}
			</Button>
		</div>
		<input
			bind:this={fileInput}
			type="file"
			accept="audio/*"
			multiple
			class="hidden"
			onchange={(event: Event & { currentTarget: HTMLInputElement }) => {
				editor.addFiles(event.currentTarget.files);
				event.currentTarget.value = '';
			}}
		/>
		{#if editor.samples.length > 0}
			<ul class="grid gap-1.5">
				{#each editor.samples as sample (sample.key)}
					<li
						class="flex items-center gap-3 rounded-lg border border-rule bg-dark-900/40 px-3 py-2"
					>
						<Icon
							icon={sample.status === 'processing'
								? 'ri:loader-4-line'
								: sample.status === 'error'
									? 'ri:error-warning-line'
									: 'ri:file-music-line'}
							class={[
								'size-4 shrink-0',
								sample.status === 'processing' && 'animate-spin text-dark-300',
								sample.status === 'error' && 'text-destructive-300',
								sample.status === 'ready' && 'text-dark-300'
							]}
							aria-hidden="true"
						/>
						<span class="flex min-w-0 flex-1 flex-col">
							<span class="truncate text-sm text-dark-100">{sample.name}</span>
							<span
								class={[
									'truncate text-xs',
									sample.status === 'error'
										? 'text-destructive-300'
										: 'text-dark-400'
								]}
							>
								{sampleStatus(sample)}
							</span>
						</span>
						<span class="shrink-0 font-mono text-xs text-dark-400"
							>{formatSize(sample.size)}</span
						>
						<Button
							variant="ghost"
							size="icon-sm"
							icon="ri:close-line"
							aria-label={t('Remove {name}', { name: sample.name })}
							onclick={() => editor.removeSample(sample.key)}
						/>
					</li>
				{/each}
			</ul>
			{#if editor.tooManyFiles}
				<p class="text-xs text-destructive-300">
					{t('ElevenLabs accepts at most 25 samples. Remove some files.')}
				</p>
			{/if}
		{:else}
			<p
				class="rounded-lg border border-dashed border-rule px-3 py-4 text-center text-sm text-dark-300"
			>
				{t(
					'Add one or more clean recordings of the voice. One to two minutes in total works best. Large files are converted and split automatically.'
				)}
			</p>
		{/if}
	</div>

	<InputSwitch label={t('Remove background noise')} bind:checked={editor.removeBackgroundNoise} />

	<InputCheckbox
		label={t('I have the rights and consent to clone this voice.')}
		bind:checked={editor.consent}
	/>

	{#if editor.error}
		<Alert variant="error" title={t('Could not add voice')} description={editor.error} />
	{/if}
</form>
