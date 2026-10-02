<script lang="ts">
	import type { VoiceCloneEditor } from '../../lib/elevenlabs/voice-library.svelte';

	import { Button } from '@stream-kit/ui/button';

	type Props = {
		editor: VoiceCloneEditor;
	};

	let { editor }: Props = $props();
	const t = $derived(editor.app.i18n.t);
</script>

<div class="flex items-center justify-end gap-2">
	<Button variant="ghost" onclick={() => editor.close()}>{t('Cancel')}</Button>
	<Button
		icon="ri:add-line"
		isLoading={editor.isSaving}
		disabled={!editor.canSubmit}
		onclick={() => void editor.submit()}
	>
		{t('Add voice')}
	</Button>
</div>
