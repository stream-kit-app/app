<script lang="ts">
	import type { VoiceTuningEditor } from '../../lib/elevenlabs/voice-library.svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { InputSelect, InputSlider, InputSwitch, InputText } from '@stream-kit/ui/input';

	import { loadElevenLabsModelItems } from '../../lib/elevenlabs/models';
	import { ELEVENLABS_VOICE_SETTING_RANGES } from '../../lib/elevenlabs/types';
	import { MAX_TTS_VOLUME } from '../../lib/player';

	type Props = {
		editor: VoiceTuningEditor;
	};

	let { editor }: Props = $props();
	const t = $derived(editor.app.i18n.t);

	const sliders = [
		{
			setting: 'stability',
			label: 'Stability',
			hint: 'Lower is more expressive, higher is more consistent.'
		},
		{
			setting: 'similarityBoost',
			label: 'Similarity',
			hint: 'How closely the output follows the original voice.'
		},
		{
			setting: 'style',
			label: 'Style exaggeration',
			hint: "Amplifies the speaker's style; higher values add latency."
		},
		{ setting: 'speed', label: 'Speed', hint: 'Speaking rate.' }
	] as const;
</script>

<div class="grid gap-5">
	<div class="grid gap-1">
		<InputSelect
			type="single"
			label={t('Model')}
			placeholder={t('Use default model')}
			loadingPlaceholder={t('Loading models…')}
			items={async () => [
				{ value: '', label: t('Use default model') },
				...(await loadElevenLabsModelItems())
			]}
			bind:value={editor.modelId}
		/>
		<p class="text-xs text-dark-300">
			{t('Used whenever this voice speaks, unless an action picks its own model.')}
		</p>
	</div>

	{#if !editor.hasCustomTuning}
		<Alert
			title={t('Uses the default tuning')}
			description={t(
				'Save to give this voice its own tuning. It then overrides the defaults from the TTS settings.'
			)}
		/>
	{/if}

	{#each sliders as slider (slider.setting)}
		{@const range = ELEVENLABS_VOICE_SETTING_RANGES[slider.setting]}
		<div class="grid gap-1">
			<InputSlider
				label={t(slider.label)}
				min={range.min}
				max={range.max}
				step={0.05}
				unit=""
				bind:value={editor.values[slider.setting]}
			/>
			<p class="text-xs text-dark-300">{t(slider.hint)}</p>
		</div>
	{/each}

	<InputSwitch label={t('Speaker boost')} bind:checked={editor.values.useSpeakerBoost} />

	<div class="grid gap-3 border-t border-rule pt-5">
		<InputSwitch label={t('Custom volume')} bind:checked={editor.customVolume} />
		{#if editor.customVolume}
			<InputSlider
				label={t('Volume')}
				min={0}
				max={MAX_TTS_VOLUME * 100}
				bind:value={editor.volume}
			/>
		{:else}
			<p class="text-xs text-dark-300">
				{t('Uses the ElevenLabs volume from the TTS settings.')}
			</p>
		{/if}
	</div>

	<div class="grid gap-1 border-t border-rule pt-5">
		<InputText
			label={t('Audio tags')}
			placeholder="[heavy german accent] [excited]"
			autocomplete="off"
			value={editor.tags}
			oninput={(event: Event & { currentTarget: HTMLInputElement }) =>
				(editor.tags = event.currentTarget.value)}
		/>
		<p class="text-xs text-dark-300">
			{t(
				'Placed before every message spoken with this voice. Only used with models that support audio tags (Eleven v3 and newer).'
			)}
		</p>
	</div>

	{#if editor.tags.trim() && !editor.modelSupportsTags}
		<Alert
			variant="warning"
			title={t('This model ignores audio tags')}
			description={t('Pick an Eleven v3 or newer model for this voice to use these tags.')}
		/>
	{/if}
</div>
