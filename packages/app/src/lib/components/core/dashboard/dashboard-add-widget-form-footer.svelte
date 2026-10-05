<script lang="ts">
	import { Button } from '@stream-kit/ui/button';

	import { app } from '#lib/core/index.js';
	import { useI18n } from '#lib/i18n.js';

	type Props = {
		modalId: string;
	};

	let { modalId }: Props = $props();

	const { t } = useI18n();
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" onclick={() => app.modals.get(modalId)?.close()}>{t('Cancel')}</Button>
</div>
