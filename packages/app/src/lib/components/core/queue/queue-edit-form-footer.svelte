<script lang="ts">
	import type { QueueEditForm } from './queue-edit.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';

	type Props = {
		form: QueueEditForm;
	};

	let { form }: Props = $props();

	const { t } = useI18n();
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" disabled={form.saving} onclick={() => form.close()}>
		{t('Cancel')}
	</Button>
	<Button disabled={!form.canSave} onclick={() => void form.save()}>
		{form.isEditing ? t('Save') : t('Create queue')}
	</Button>
</div>
