<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import Icon from '@iconify/svelte';

	import { goto } from '$app/navigation';

	import { Badge } from '@stream-kit/ui/badge';
	import { WidgetList, WidgetRow } from '@stream-kit/ui/widget';

	import { pluginDetailPath } from '$lib/components/core/plugins/plugin-actions';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	type Props = {
		plugins: RegisteredPlugin[];
		revision?: number;
	};

	let { plugins, revision = 0 }: Props = $props();

	const { t } = useI18n();

	function isConfigured(plugin: RegisteredPlugin): boolean {
		void revision;

		return plugin.isConfigured(app);
	}

	function hasDependencyIssues(plugin: RegisteredPlugin): boolean {
		void revision;

		return (
			plugin.missingDependencies(app).length > 0 ||
			plugin.disabledDependencies(app).length > 0
		);
	}
</script>

<WidgetList>
	{#each plugins as plugin (plugin.key)}
		<WidgetRow
			icon={plugin.icon ?? 'ri:plug-line'}
			title={plugin.name}
			onclick={plugin.hasSettings ? () => goto(pluginDetailPath(plugin)) : undefined}
		>
			{#snippet trailing()}
				{#if !plugin.isEnabled}
					<Badge variant="default" size="sm">{t('Disabled')}</Badge>
				{:else if hasDependencyIssues(plugin)}
					<Badge variant="destructive" size="sm">{t('BROKEN')}</Badge>
				{:else if isConfigured(plugin)}
					<Badge variant="success" size="sm">{t('Configured')}</Badge>
				{:else}
					<Badge variant="warning" size="sm">{t('Not configured')}</Badge>
				{/if}
				{#if plugin.hasSettings}
					<Icon
						icon="ri:settings-3-line"
						class="size-4 text-dark-400 transition-colors group-hover/row:text-dark-100"
						aria-hidden="true"
					/>
				{/if}
			{/snippet}
		</WidgetRow>
	{/each}
</WidgetList>
