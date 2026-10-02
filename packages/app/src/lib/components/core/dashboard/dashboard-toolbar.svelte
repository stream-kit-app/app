<script lang="ts">
	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';

	type Props = {
		onAddWidget?: () => void;
	};

	let { onAddWidget }: Props = $props();

	const { t } = useI18n();
</script>

<Button icon="ri:add-line" onclick={() => onAddWidget?.()}>
	{t('Add widget')}
</Button>
