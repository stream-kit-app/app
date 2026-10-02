<script lang="ts">
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { useI18n } from '$lib/i18n';

	type Props = {
		onAddWidget?: () => void;
	};

	let { onAddWidget }: Props = $props();

	const { t } = useI18n();
</script>

<EmptyState
	icon="ri:dashboard-3-line"
	title={t('Your dashboard is empty')}
	description={t('Add widgets to build a personalized overview of your stream setup.')}
	actionLabel={t('Add your first widget')}
	onAction={() => onAddWidget?.()}
/>
