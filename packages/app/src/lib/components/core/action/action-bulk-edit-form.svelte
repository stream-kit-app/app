<script lang="ts">
	import type { ActionBulkEditForm } from './action-bulk-edit.svelte';

	import { getActionGroups } from '$db/repositories/actions';

	import { InputCheckbox, InputSelect, InputTextSelect } from '@stream-kit/ui/input';

	import { ACTION_BULK_EDIT_NO_QUEUE } from './action-bulk-edit.svelte';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	type Props = {
		form: ActionBulkEditForm;
	};

	let { form }: Props = $props();

	const { t } = useI18n();

	const queueItems = $derived([
		{ value: ACTION_BULK_EDIT_NO_QUEUE, label: t('No queue') },
		...getApp().actionQueues.definitions.map((queue) => ({
			value: String(queue.id),
			label: queue.name
		}))
	]);
</script>

<div class="grid gap-5">
	<div class="grid gap-3">
		<InputCheckbox inline label={t('Move to group')} bind:checked={form.changeGroup} />
		<InputTextSelect
			label={t('Group')}
			placeholder={t('Select or enter a group')}
			items={getActionGroups}
			bind:value={form.groupValue}
			disabled={!form.changeGroup}
		/>
	</div>
	<div class="grid gap-3">
		<InputCheckbox inline label={t('Assign to queue')} bind:checked={form.changeQueue} />
		<InputSelect
			label={t('Queue')}
			items={queueItems}
			bind:value={form.queueValue}
			disabled={!form.changeQueue}
		/>
	</div>
</div>
