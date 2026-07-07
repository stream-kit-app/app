<script lang="ts">
	import type { ModRule } from '../lib/mod-rule.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getModerationService } from '../lib/get-moderation';

	type Props = {
		rule: ModRule;
	};

	let { rule }: Props = $props();
	const app = getModerationService().requireApp();
	const t = app.i18n.t;

	async function handleDelete() {
		const confirmed = await app.confirm.ask({
			title: t('Delete rule'),
			description: t('Are you sure you want to delete "{name}"?', {
				name: rule.name.trim() || t('this rule')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await rule.delete();
		}
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex items-center gap-2">
		{#if rule.id != null}
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
		<Button variant="ghost" type="button" onclick={() => rule.close()}>{t('Cancel')}</Button>
		<Button type="button" onclick={() => void rule.save()}>{t('Save')}</Button>
	</div>
</div>
