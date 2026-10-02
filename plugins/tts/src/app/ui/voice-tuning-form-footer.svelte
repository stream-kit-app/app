<script lang="ts">
	import type { VoiceTuningEditor } from '../../lib/elevenlabs/voice-library.svelte';

	import { Button } from '@stream-kit/ui/button';

	type Props = {
		editor: VoiceTuningEditor;
	};

	let { editor }: Props = $props();
	const t = $derived(editor.app.i18n.t);
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex items-center gap-2">
		<Button
			variant="outline"
			icon="ri:play-line"
			isLoading={editor.isTesting}
			disabled={editor.isTesting}
			onclick={() => void editor.test()}
		>
			{t('Test voice')}
		</Button>
		{#if editor.hasCustomTuning}
			<Button variant="ghost" icon="ri:restart-line" onclick={() => void editor.reset()}>
				{t('Reset to default')}
			</Button>
		{/if}
	</div>
	<div class="flex items-center gap-2">
		<Button variant="ghost" onclick={() => editor.close()}>{t('Cancel')}</Button>
		<Button
			icon="ri:save-line"
			isLoading={editor.isSaving}
			disabled={editor.isSaving}
			onclick={() => void editor.save()}
		>
			{t('Save')}
		</Button>
	</div>
</div>
