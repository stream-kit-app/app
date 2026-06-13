<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';

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

<section class="flex flex-col gap-3">
	<h2 class="text-lg font-medium text-dark-50">{t('Plugin status')}</h2>
	<div class="rounded-xl border border-dark-600 bg-dark-800 p-2">
		{#each plugins as plugin (plugin.key)}
			<div
				class="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-dark-700/50"
			>
				<div class="flex min-w-0 items-center gap-3">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700"
					>
						<Icon icon={plugin.icon ?? 'ri:plug-line'} class="size-4" />
					</div>
					<span class="truncate font-medium text-dark-50">{plugin.name}</span>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					{#if !plugin.isEnabled}
						<Badge variant="secondary">{t('Disabled')}</Badge>
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
</section>
