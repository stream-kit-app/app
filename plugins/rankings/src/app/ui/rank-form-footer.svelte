<script lang="ts">
	import type { Rank } from '../lib/rank.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getRankingsService } from '../lib/get-rankings';

	type Props = {
		rank: Rank;
	};

	let { rank }: Props = $props();
	const app = getRankingsService().requireApp();
	const t = app.i18n.t;
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" type="button" onclick={() => rank.close()}>{t('Cancel')}</Button>
	<Button type="button" onclick={() => void rank.save()}>{t('Save')}</Button>
</div>
