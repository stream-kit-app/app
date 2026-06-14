<script lang="ts">
	import { PluginCard, PluginCheckUpdatesButton, PluginInstallButton } from '$lib/components/core/plugins';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { app } from '$lib/core';
	import { pluginUpdates } from '$lib/core/plugins/plugin-updates.svelte';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
</script>

<Container class="px-6 py-6">
	<div class="flex flex-col gap-6">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<Heading level="1">{t('Plugins')}</Heading>
			<div class="flex flex-wrap gap-2">
				<PluginCheckUpdatesButton />
				<PluginInstallButton />
			</div>
		</div>

		{#if pluginUpdates.availableCount > 0}
			<p class="text-sm text-dark-100">
				{t('{count} plugin update(s) available.', { count: pluginUpdates.availableCount })}
			</p>
		{/if}

		{#if app.plugins.items.length === 0}
			<div class="rounded-lg border border-dark-600 p-6 text-dark-100">
				{t('No plugins have been registered yet.')}
			</div>
		{:else}
			<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each app.plugins.items as plugin (plugin.key)}
					<PluginCard {plugin} />
				{/each}
			</div>
		{/if}
	</div>
</Container>
