<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	import AddCommandModal from './AddCommandModal.svelte';

	const { t } = useI18n();
</script>

<Container size="md">
	<header class="flex justify-between">
		<Heading level="1" subTitle={t('Manage your bot\'s commands')}>{t('Commands')}</Heading>
		<Button
			variant="outline"
			icon="ri:add-fill"
			size="lg"
			onclick={() => {
				const modal = app.createModal({
					id: 'add-command-modal',
					title: t('Add Command'),
					description: t('Add a new command to your bot'),
					content: AddCommandModal
				});
				modal.open();
			}}
		>
			{t('Add Command')}
		</Button>
	</header>
</Container>
