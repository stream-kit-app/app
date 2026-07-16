<script lang="ts">
	import type { RankedUser } from '../lib/ranked-user.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getRankingsService } from '../lib/get-rankings';

	type Props = {
		rankedUser: RankedUser;
	};

	let { rankedUser }: Props = $props();
	const app = getRankingsService().requireApp();
	const t = app.i18n.t;

	async function handleDelete() {
		const confirmed = await app.confirm.ask({
			title: t('Remove user from rankings?'),
			description: t(
				'Are you sure you want to remove {name} from rankings? Their points and history will be deleted. This cannot be undone.',
				{ name: rankedUser.username }
			),
			confirmLabel: t('Remove')
		});

		if (confirmed) {
			await rankedUser.delete();
		}
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<Button
		variant="destructive"
		type="button"
		onclick={() => void handleDelete()}
		icon="ri:delete-bin-line"
	>
		{t('Remove user')}
	</Button>
	<Button variant="ghost" type="button" onclick={() => rankedUser.close()}>{t('Close')}</Button>
</div>
