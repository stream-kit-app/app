<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';

	type Props = {
		editMode?: boolean;
		onAddWidget?: () => void;
	};

	let { editMode = false, onAddWidget }: Props = $props();

	const { t } = useI18n();
</script>

<div
	class="relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
>
	<div
		class="relative flex size-16 items-center justify-center rounded-2xl bg-dark-800 text-primary"
	>
		<Icon icon="ri:dashboard-3-line" class="size-7" aria-hidden="true" />
	</div>
	<div class="relative flex flex-col gap-1.5">
		<p class="text-lg font-semibold text-dark-50">{t('Your dashboard is empty')}</p>
		<p class="text-sm text-dark-300">
			{t('Add widgets to build a personalized overview of your stream setup.')}
		</p>
	</div>
	{#if editMode}
		<Button class="relative" icon="ri:add-line" onclick={() => onAddWidget?.()}>
			{t('Add your first widget')}
		</Button>
	{:else}
		<p class="relative text-sm text-dark-300">{t('Switch to Customize to add widgets.')}</p>
	{/if}
</div>
