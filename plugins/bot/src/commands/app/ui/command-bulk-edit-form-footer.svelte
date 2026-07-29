<script lang="ts">
	import type { CommandBulkEditForm } from './command-bulk-edit.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getCommandsService } from '../lib/get-commands';

	type Props = {
		form: CommandBulkEditForm;
	};

	let { form }: Props = $props();

	const t = getCommandsService().requireApp().i18n.t;
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" disabled={form.applying} onclick={() => form.close()}>
		{t('Cancel')}
	</Button>
	<Button disabled={!form.canApply || form.applying} onclick={() => void form.apply()}>
		{t('Apply changes')}
	</Button>
</div>
