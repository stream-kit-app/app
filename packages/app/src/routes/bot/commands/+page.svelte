<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '$lib/components/ui/button';
	import { Container } from '$lib/components/ui/container';
	import { Heading } from '$lib/components/ui/heading';
	import { app } from '$lib/core';

	import AddCommandModal from './AddCommandModal.svelte';
</script>

<Container size="md">
	<header class="flex justify-between">
		<Heading level="1" subTitle="Manage your bot's commands">Commands</Heading>
		<Button
			variant="outline"
			icon="ri:add-fill"
			size="lg"
			onclick={() => {
				const modal = app.createModal({
					id: 'add-command-modal',
					title: 'Add Command',
					description: 'Add a new command to your bot',
					content: AddCommandModal
				});
				modal.open();
			}}
		>
			Add Command
		</Button>
	</header>
</Container>
