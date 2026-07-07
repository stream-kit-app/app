<script lang="ts">
	import type { Timer } from '../lib/timer.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getTimersService } from '../lib/get-timers';

	type Props = {
		timer: Timer;
	};

	let { timer }: Props = $props();
	const app = getTimersService().requireApp();
	const t = app.i18n.t;

	async function handleDelete() {
		const confirmed = await app.confirm.ask({
			title: t('Delete timer'),
			description: t('Are you sure you want to delete "{name}"?', {
				name: timer.name.trim() || t('this timer')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await timer.delete();
		}
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex items-center gap-2">
		{#if timer.id != null}
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
		<Button variant="ghost" type="button" onclick={() => timer.close()}>{t('Cancel')}</Button>
		<Button type="button" onclick={() => void timer.save()}>{t('Save')}</Button>
	</div>
</div>
