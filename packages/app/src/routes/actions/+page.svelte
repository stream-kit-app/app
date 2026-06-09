<script lang="ts">
	import { capitalize, groupBy } from 'es-toolkit';

	import { ActionCard } from '$lib/components/core/action';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { app } from '$lib/core';
	import { Action } from '$lib/core/action';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
	const groups = $derived(groupBy(app.actions.items, (action) => action.group));
</script>

<div class="p-4">
	<Container size="md">
		<header class="flex justify-between">
			<Heading level="1" subTitle={t('Manage your actions')}>{t('Actions')}</Heading>
			<Button
				icon="ri:add-fill"
				size="lg"
				variant="outline"
				onclick={() => Action.createDraft().open()}
			>
				{t('Add Action')}
			</Button>
		</header>
		<div class="mt-8 grid gap-6">
			{#each Object.keys(groups) as group (group)}
				<div class="flex flex-col gap-2">
					<Heading level="4" class="text-dark-300 uppercase">{capitalize(group)}</Heading>
					{#each groups[group] as action (action.id)}
						<ActionCard {action} />
					{/each}
				</div>
			{/each}
		</div>
	</Container>
</div>
