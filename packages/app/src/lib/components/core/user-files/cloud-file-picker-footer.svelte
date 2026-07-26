<script lang="ts">
	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';

	type Props = {
		onCancel: () => void;
	};

	let { onCancel }: Props = $props();
	const { t } = useI18n();
</script>

<div class="flex justify-end">
	<Button type="button" variant="outline" onclick={onCancel}>{t('Cancel')}</Button>
</div>
