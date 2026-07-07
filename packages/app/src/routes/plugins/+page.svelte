<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';

	import { PluginCard, PluginCheckUpdatesButton, PluginInstallButton } from '$lib/components/core/plugins';
	import { app } from '$lib/core';
	import { pluginUpdates } from '$lib/core/plugins/plugin-updates.svelte';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	const totalCount = $derived(app.plugins.items.length);
	const enabledCount = $derived(app.plugins.items.filter((plugin) => plugin.isEnabled).length);
</script>

<Container class="px-6 py-6" size="md">
	<header class="flex flex-wrap items-start justify-between gap-4">
		<div class="flex flex-col gap-3">
			<Heading level="1" subTitle={t('Install and manage Stream Kit plugins')}>
				{t('Plugins')}
			</Heading>
			{#if totalCount > 0}
				<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-dark-200">
					<span
						class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-800 px-2.5 py-1"
					>
						<Icon icon="ri:plug-line" class="size-3.5 text-primary" aria-hidden="true" />
						{t('{count} plugins', { count: totalCount })}
					</span>
					<span
						class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-800 px-2.5 py-1"
					>
						<Icon icon="ri:checkbox-circle-line" class="size-3.5 text-dark-400" aria-hidden="true" />
						{t('{count} enabled', { count: enabledCount })}
					</span>
					{#if pluginUpdates.availableCount > 0}
						<span
							class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-800 px-2.5 py-1"
						>
							<Icon icon="ri:refresh-line" class="size-3.5 text-warning-400" aria-hidden="true" />
							{t('{count} plugin update(s) available.', {
								count: pluginUpdates.availableCount
							})}
						</span>
					{/if}
				</div>
			{/if}
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<PluginCheckUpdatesButton size="lg" />
			<PluginInstallButton size="lg" />
		</div>
	</header>

	{#if pluginUpdates.availableCount > 0}
		<Alert
			variant="warning"
			class="mt-6"
			title={t('Updates available')}
			description={t('{count} plugin update(s) available.', {
				count: pluginUpdates.availableCount
			})}
		/>
	{/if}

	{#if app.plugins.items.length === 0}
		<div
			class="relative mt-8 flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
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
		<div class="mt-8 grid gap-5 md:grid-cols-2">
			{#each app.plugins.items as plugin (plugin.key)}
				<PluginCard {plugin} />
			{/each}
		</div>
	{/if}
</Container>
