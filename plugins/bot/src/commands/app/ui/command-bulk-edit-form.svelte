<script lang="ts">
	import type { CommandBulkEditForm } from './command-bulk-edit.svelte';

	import { InputCheckbox, InputTextSelect } from '@stream-kit/ui/input';

	import { getCommandsService } from '../lib/get-commands';

	type Props = {
		form: CommandBulkEditForm;
	};

	let { form }: Props = $props();

	const commands = getCommandsService();
	const t = commands.requireApp().i18n.t;
</script>

<div class="grid gap-5">
	<p class="text-sm text-dark-200">{t('{count} selected', { count: form.selectedCount })}</p>

	<div class="grid gap-3">
		<InputCheckbox inline label={t('Move to group')} bind:checked={form.changeGroup} />
		<InputTextSelect
			label={t('Group')}
			placeholder={t('Select or enter a group')}
			items={() => commands.getGroupSelectItems()}
			bind:value={form.groupValue}
			disabled={!form.changeGroup}
		/>
	</div>
</div>
