<script lang="ts">
	import type { Action as ActionType } from '$lib/core/action/action.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	type Props = {
		action: ActionType;
	};

	let { action }: Props = $props();
	const { t } = useI18n();

	async function handleSave(): Promise<void> {
		await action.save();
	}

	function handleCancel(): void {
		action.close();
	}

	async function handleDelete(): Promise<void> {
		const confirmed = await getApp().confirm.ask({
			title: t('Delete action'),
			description: t('Are you sure you want to delete "{name}"? This cannot be undone.', {
				name: action.name.trim() || t('this action')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await action.delete();
		}
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex items-center gap-2">
		{#if action.id != null}
			<Button
				type="button"
				variant="destructive"
				onclick={() => void handleDelete()}
				icon="ri:delete-bin-line"
			>
				{t('Delete')}
			</Button>
		{/if}
	</div>
	<div class="flex items-center gap-2">
		<Button type="button" variant="ghost" onclick={handleCancel}>
			{t('Cancel')}
		</Button>
		<Button type="button" onclick={() => void handleSave()}>{t('Save')}</Button>
	</div>
</div>
