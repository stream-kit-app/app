<script lang="ts">
	import type { PointsEditor } from '../lib/points-editor.svelte';

	import { InputText } from '@stream-kit/ui/input';

	import { getRankingsService } from '../lib/get-rankings';

	type Props = {
		editor: PointsEditor;
	};

	let { editor }: Props = $props();
	const app = getRankingsService().requireApp();
	const t = app.i18n.t;
</script>

<form
	class="grid gap-4"
	onsubmit={(event: SubmitEvent) => {
		event.preventDefault();
		void editor.save();
	}}
>
	<InputText
		label={t('Points')}
		required
		autocomplete="off"
		inputmode="numeric"
		value={editor.amount}
		error={editor.error ?? undefined}
		oninput={(event) => {
			editor.amount = (event.currentTarget as HTMLInputElement).value;
		}}
	/>
	<p class="text-sm text-dark-300">
		{t('Currently {points} points. Saving replaces the total and is logged in the point history.', {
			points: editor.currentPoints
		})}
	</p>
</form>
