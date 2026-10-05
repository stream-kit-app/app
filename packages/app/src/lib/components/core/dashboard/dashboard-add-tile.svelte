<script lang="ts">
	import Icon from '@iconify/svelte';

	import { masonryItem } from '@stream-kit/ui/attachments';

	import { useI18n } from '#lib/i18n.js';

	type Props = {
		onclick?: () => void;
	};

	let { onclick }: Props = $props();

	const { t } = useI18n();

	const masonry = masonryItem();
</script>

<button
	type="button"
	class="group/add flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-rule p-4 text-sm font-medium text-dark-300 transition-colors hover:border-rule-strong hover:bg-dark-700/40 hover:text-dark-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
	{onclick}
	{@attach masonry}
>
	<span
		class="flex size-8 items-center justify-center rounded-md bg-dark-800 text-dark-300 transition-colors group-hover/add:bg-primary/10 group-hover/add:text-primary"
		aria-hidden="true"
	>
		<Icon icon="ri:add-line" class="size-4" />
	</span>
	{t('Add widget')}
</button>
