<script lang="ts">
	import type { Tier } from '../lib/tier.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getRankingsService } from '../lib/get-rankings';

	type Props = {
		tier: Tier;
	};

	let { tier }: Props = $props();
	const app = getRankingsService().requireApp();
	const t = app.i18n.t;

	async function handleDelete() {
		const confirmed = await app.confirm.ask({
			title: t('Delete tier?'),
			description: t('Are you sure you want to delete "{name}"? This cannot be undone.', {
				name: tier.name.trim() || t('this tier')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await tier.delete();
		}
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex items-center gap-2">
		{#if tier.id != null}
			<Button
				variant="destructive"
				type="button"
				onclick={() => void handleDelete()}
				icon="ri:delete-bin-line"
			>
				{t('Delete')}
			</Button>
		{/if}
	</div>
	<div class="flex items-center gap-2">
		<Button variant="ghost" type="button" onclick={() => tier.close()}>{t('Cancel')}</Button>
		<Button type="button" onclick={() => void tier.save()}>
			{tier.id != null ? t('Save') : t('Create tier')}
		</Button>
	</div>
</div>
