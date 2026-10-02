<script lang="ts">
	import type { PointsEditor } from '../lib/points-editor.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getRankingsService } from '../lib/get-rankings';

	type Props = {
		editor: PointsEditor;
	};

	let { editor }: Props = $props();
	const app = getRankingsService().requireApp();
	const t = app.i18n.t;
</script>

<div class="flex items-center justify-end gap-2">
	<Button variant="ghost" type="button" onclick={() => editor.close()}>{t('Cancel')}</Button>
	<Button type="button" disabled={editor.isSaving} onclick={() => void editor.save()}>
		{t('Save')}
	</Button>
</div>
