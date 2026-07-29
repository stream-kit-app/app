<script lang="ts">
	import { Alert } from '@stream-kit/ui/alert';
	import { Cell, CellGrid } from '@stream-kit/ui/blueprint';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import {
		PluginCard,
		PluginCheckUpdatesButton,
		PluginInstallButton
	} from '$lib/components/core/plugins';
	import { app } from '$lib/core';
	import { pluginUpdates } from '$lib/core/plugins/plugin-updates.svelte';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	const totalCount = $derived(app.plugins.items.length);
	const enabledCount = $derived(app.plugins.items.filter((plugin) => plugin.isEnabled).length);

	$effect(() => {
		app.toolbar.set({
			meta:
				totalCount > 0
					? [
							{
								icon: 'ri:plug-line',
								label: t('{count} plugins', { count: totalCount })
							},
							{
								icon: 'ri:checkbox-circle-line',
								label: t('{count} enabled', { count: enabledCount })
							},
							...(pluginUpdates.availableCount > 0
								? [
										{
											icon: 'ri:refresh-line',
											label: t('{count} plugin update(s) available.', {
												count: pluginUpdates.availableCount
											})
										}
									]
								: [])
						]
					: [],
			primaryComponents: [
				{
					id: 'plugin-check-updates',
					component: PluginCheckUpdatesButton,
					props: { size: 'default' }
				},
				{
					id: 'plugin-install',
					component: PluginInstallButton,
					props: { size: 'default' }
				}
			]
		});
	});
</script>

{#if app.plugins.items.length === 0}
	<EmptyState
		icon="ri:plug-line"
		title={t('No plugins yet')}
		description={t('Install a plugin zip to extend Stream Kit with integrations and features.')}
	>
		<PluginInstallButton />
	</EmptyState>
{:else}
	<Container class="px-6 py-6">
		{#if pluginUpdates.availableCount > 0}
			<Alert
				variant="warning"
				class="mb-6"
				title={t('Updates available')}
				description={t('{count} plugin update(s) available.', {
					count: pluginUpdates.availableCount
				})}
			/>
		{/if}
		<CellGrid cols={4} class="border-rule">
			{#each app.plugins.items as plugin (plugin.key)}
				<Cell class="p-0 [&>article]:border-0 [&>article]:bg-transparent">
					<PluginCard {plugin} />
				</Cell>
			{/each}
		</CellGrid>
	</Container>
{/if}
