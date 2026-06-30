<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';

	import PluginSettingsForm from '$lib/components/core/plugins/plugin-settings-form.svelte';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

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

<div class="flex flex-col gap-2 text-sm">
	{#each plugins as plugin (plugin.key)}
		{@const configurable = plugin.hasSettings}
		<div
			class={cn(
				'flex items-center justify-between gap-3 rounded-lg',
				configurable && '-mx-1 px-1 py-0.5'
			)}
		>
			<button
				type="button"
				class={cn(
					'flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left',
					configurable &&
						'cursor-pointer transition hover:bg-dark-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
				)}
				disabled={!configurable}
				aria-label={configurable
					? t('Configure {name}', { name: plugin.name })
					: undefined}
				onclick={() => openSettings(plugin)}
			>
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
					<Icon icon={plugin.icon ?? 'ri:plug-line'} class="size-4" />
				</div>
				<span class="truncate text-dark-100">{plugin.name}</span>
			</button>
			<div class="flex shrink-0 items-center gap-2">
				{#if !plugin.isEnabled}
					<Badge variant="default">{t('Disabled')}</Badge>
				{:else if hasDependencyIssues(plugin)}
					<Badge variant="destructive">{t('BROKEN')}</Badge>
				{:else if isConfigured(plugin)}
					<Badge variant="success">{t('Configured')}</Badge>
				{:else}
					<Badge variant="warning">{t('Not configured')}</Badge>
				{/if}
			</div>
		</div>
	{/each}
</div>
