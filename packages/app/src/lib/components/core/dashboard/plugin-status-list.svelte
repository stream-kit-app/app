<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import PluginSettingsForm from '$lib/components/core/plugins/plugin-settings-form.svelte';
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

	function openSettings(plugin: RegisteredPlugin): void {
		app
			.createModal({
				id: `plugin-settings-${plugin.key}`,
				title: plugin.name,
				description: plugin.description,
				content: PluginSettingsForm,
				props: { plugin },
				size: 'lg'
			})
			.open();
	}
</script>

<div class="flex flex-col gap-1 text-sm">
	{#each plugins as plugin (plugin.key)}
		<div class="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5">
			<div class="flex min-w-0 items-center gap-3">
				<div
					class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
				>
					<Icon icon={plugin.icon ?? 'ri:plug-line'} class="size-4" />
				</div>
				<span class="truncate text-dark-100">{plugin.name}</span>
			</div>
			<div class="flex shrink-0 items-center gap-2">
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
					<Button
						variant="outline"
						size="badge"
						icon="ri:settings-3-line"
						onclick={() => openSettings(plugin)}
					>
						{t('Configure')}
					</Button>
				{/if}
			</div>
		</div>
	{/each}
</div>
