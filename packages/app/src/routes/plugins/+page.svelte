<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Container } from '@stream-kit/ui/container';

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

<Container class="px-6 py-6" size="md">
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

	{#if app.plugins.items.length === 0}
		<div
			class="relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
		>
			<div
				class="relative flex size-16 items-center justify-center rounded-2xl bg-dark-800 text-primary"
			>
				<Icon icon="ri:plug-line" class="size-7" aria-hidden="true" />
			</div>
			<div class="relative flex flex-col gap-1.5">
				<p class="text-lg font-semibold text-dark-50">{t('No plugins yet')}</p>
				<p class="text-sm text-dark-300">
					{t('Install a plugin zip to extend Stream Kit with integrations and features.')}
				</p>
			</div>
			<div class="relative flex flex-wrap items-center justify-center gap-2">
				<PluginInstallButton />
			</div>
		</div>
	{:else}
		<div class="grid gap-5 md:grid-cols-2">
			{#each app.plugins.items as plugin (plugin.key)}
				<PluginCard {plugin} />
			{/each}
		</div>
	{/if}
</Container>
