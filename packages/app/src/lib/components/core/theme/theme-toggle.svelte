<script lang="ts">
	import { tooltip } from '@stream-kit/ui/attachments';
	import { Button } from '@stream-kit/ui/button';

	import { app } from '#lib/core/index.js';
	import { useI18n } from '#lib/i18n.js';

	const { t } = useI18n();

	const label = $derived(app.theme.isLight ? t('Switch to dark mode') : t('Switch to light mode'));
</script>

<Button
	type="button"
	variant="ghost"
	size="icon-sm"
	icon={app.theme.isLight ? 'ri:moon-line' : 'ri:sun-line'}
	aria-label={label}
	onclick={() => void app.theme.toggle()}
	{@attach tooltip(() => label)}
/>
