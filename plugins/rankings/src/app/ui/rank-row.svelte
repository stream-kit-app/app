<script lang="ts">
	import type { RankRecord } from '../../lib/types';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	type Props = {
		rank: RankRecord;
		pointsLabel: string;
		deleteLabel: string;
		onDelete: () => void;
	};

	let { rank, pointsLabel, deleteLabel, onDelete }: Props = $props();
</script>

<div
	class="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 rounded-xl border border-dark-600 bg-dark-800 px-3 py-2 transition-colors hover:bg-dark-700"
>
	<p class="truncate font-medium text-dark-100">{rank.name}</p>
	<Badge variant="secondary">{rank.pointsRequired} {pointsLabel}</Badge>
	<Button
		type="button"
		variant="ghost"
		size="icon"
		icon="ri:delete-bin-line"
		aria-label={deleteLabel}
		onclick={() => onDelete()}
		{@attach tooltip(() => deleteLabel)}
	/>
</div>
