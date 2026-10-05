<script lang="ts">
	import type { ActionBulkEditForm } from './action-bulk-edit.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '#lib/i18n.js';

	type Props = {
		form: ActionBulkEditForm;
	};

	let { form }: Props = $props();

	const { t } = useI18n();
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" disabled={form.applying} onclick={() => form.close()}>
		{t('Cancel')}
	</Button>
	<Button disabled={!form.canApply} onclick={() => void form.apply()}>
		{t('Apply changes')}
	</Button>
</div>
