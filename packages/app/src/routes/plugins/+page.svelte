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
	import { resolvePluginStatus } from '$lib/components/core/plugins/plugin-actions';
	import { app } from '$lib/core';
	import { pluginUpdates } from '$lib/core/plugins/plugin-updates.svelte';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	const totalCount = $derived(app.plugins.items.length);
	const enabledCount = $derived(app.plugins.items.filter((plugin) => plugin.isEnabled).length);
	const notConfiguredKeys = $derived(
		new Set(
			app.plugins.items
				.filter((plugin) => resolvePluginStatus(plugin) === 'not-configured')
				.map((plugin) => plugin.key)
		)
	);
	const notConfiguredCount = $derived(notConfiguredKeys.size);
	// Plugins that still need setup come first; the rest keep their registry order.
	const sortedPlugins = $derived(
		[...app.plugins.items].sort(
			(a, b) => Number(notConfiguredKeys.has(b.key)) - Number(notConfiguredKeys.has(a.key))
		)
	);

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
							...(notConfiguredCount > 0
								? [
										{
											icon: 'ri:error-warning-line',
											label: t('{count} not configured', { count: notConfiguredCount })
										}
									]
								: []),
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
		<CellGrid cols={3}>
			{#each sortedPlugins as plugin (plugin.key)}
				<Cell class="p-0">
					<PluginCard {plugin} />
				</Cell>
			{/each}
		</CellGrid>
	</Container>
{/if}
