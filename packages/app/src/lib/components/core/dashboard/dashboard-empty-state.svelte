<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { useI18n } from '$lib/i18n';

	type Props = {
		editMode?: boolean;
		onAddWidget?: () => void;
	};

	let { editMode = false, onAddWidget }: Props = $props();

	const { t } = useI18n();
</script>

<EmptyState
	icon="ri:dashboard-3-line"
	title={t('Your dashboard is empty')}
	description={t('Add widgets to build a personalized overview of your stream setup.')}
>
	{#if editMode}
		<Button class="relative" icon="ri:add-line" onclick={() => onAddWidget?.()}>
			{t('Add your first widget')}
		</Button>
	{:else}
		<p class="relative text-sm text-dark-300">{t('Switch to Customize to add widgets.')}</p>
	{/if}
</EmptyState>
