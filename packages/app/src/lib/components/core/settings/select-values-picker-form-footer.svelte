<script lang="ts">
	import type { SelectValuesPicker } from './select-values-picker.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '#lib/i18n.js';

	type Props = {
		picker: SelectValuesPicker;
	};

	let { picker }: Props = $props();

	const { t } = useI18n();
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" onclick={() => picker.close()}>{t('Close')}</Button>
</div>
