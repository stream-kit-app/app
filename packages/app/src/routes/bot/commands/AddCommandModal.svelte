<script lang="ts">
	import { InputText } from '@stream-kit/ui/input';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
</script>

<InputText
	label={t('Command Name')}
	placeholder={t('Enter command name')}
/>
