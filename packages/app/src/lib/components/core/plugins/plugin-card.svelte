<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';
	import type { InstalledPluginManifest } from '$lib/core/plugins/installed-plugin';

	import Icon from '@iconify/svelte';
	import { invoke } from '@tauri-apps/api/core';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputSwitch } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { setPluginDevMode } from '$lib/core/plugins/plugin-dev-watcher';
	import { uninstallInstalledPlugin } from '$lib/core/plugins/plugin-loader';
	import { pluginUpdates } from '$lib/core/plugins/plugin-updates.svelte';
	import { canApplyPluginUpdates } from '$lib/core/plugins/plugin-update';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import PluginSettingsForm from './plugin-settings-form.svelte';

	type Props = {
		plugin: RegisteredPlugin;
	};

	let { plugin }: Props = $props();
	let { t } = useI18n();
	let statusRevision = $state(0);
	let isUpdating = $state(false);

	const pendingUpdate = $derived(pluginUpdates.getUpdate(plugin.key));
	const canInstallUpdates = $derived(canApplyPluginUpdates());

	const missingDependencies = $derived.by(() => {
		void statusRevision;

		return plugin.missingDependencies(app);
	});
	const disabledDependencies = $derived.by(() => {
		void statusRevision;

		return plugin.disabledDependencies(app);
	});
	const hasMissingDependencies = $derived(missingDependencies.length > 0);
	const hasDisabledDependencies = $derived(disabledDependencies.length > 0);
	const isConfigured = $derived.by(() => {
		void statusRevision;

		return plugin.isConfigured(app);
	});
	const hasDependencyIssues = $derived(hasMissingDependencies || hasDisabledDependencies);
	const showDevMode = $derived(app.settings.developerMode && plugin.source === 'installed');
	const isDevMode = $derived(app.settings.isPluginDevMode(plugin.key));

	$effect(() => {
		const api = plugin.api as { subscribe?: (listener: () => void) => () => void } | undefined;

		return api?.subscribe?.(() => {
			statusRevision += 1;
		});
	});

	function openSettings(): void {
		app.createModal({
			id: `plugin-settings-${plugin.key}`,
			title: plugin.name,
			description: plugin.description,
			content: PluginSettingsForm,
			props: { plugin },
			size: 'lg'
		}).open();
	}

	async function setPluginDevModeEnabled(enabled: boolean): Promise<void> {
		const manifests = await invoke<InstalledPluginManifest[]>('list_installed_plugins');
		const manifest = manifests.find((item) => item.key === plugin.key);

		await setPluginDevMode(app, plugin.key, enabled, manifest);
	}

	async function setPluginEnabled(enabled: boolean): Promise<void> {
		await plugin.setEnabled(app, enabled);
		statusRevision += 1;

		app.toast.create({
			title: enabled ? t('Plugin enabled') : t('Plugin disabled'),
			description: enabled
				? t('{name} has been enabled.', { name: plugin.name })
				: t('{name} has been disabled.', { name: plugin.name }),
			variant: 'success'
		});
	}

	async function uninstallPlugin(): Promise<void> {
		const confirmed = await app.confirm.ask({
			title: t('Remove plugin?'),
			description: t(
				'Are you sure you want to remove {name}? This action cannot be undone.',
				{ name: plugin.name }
			),
			confirmLabel: t('Delete'),
			cancelLabel: t('Cancel')
		});

		if (!confirmed) {
			return;
		}

		try {
			await uninstallInstalledPlugin(app, plugin.key);
			app.toast.create({
				title: t('Plugin removed'),
				description: t('{name} has been removed.', { name: plugin.name }),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Plugin could not be removed'),
				description: error instanceof Error ? error.message : t('Unknown error.'),
				variant: 'error'
			});
		}
	}

	async function updatePlugin(): Promise<void> {
		if (!pendingUpdate || isUpdating) {
			return;
		}

		if (!canInstallUpdates) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Update plugin?'),
			description: t(
				'Update {name} from v{current} to v{next}? Installed plugins run with full access to Stream Kit and your system. Only update plugins from sources you trust.',
				{
					name: plugin.name,
					current: pendingUpdate.installedVersion,
					next: pendingUpdate.availableVersion
				}
			),
			confirmLabel: t('Update'),
			cancelLabel: t('Cancel')
		});

		if (!confirmed) {
			return;
		}

		isUpdating = true;
		const nextVersion = pendingUpdate.availableVersion;

		try {
			await pluginUpdates.apply(plugin.key);
			statusRevision += 1;
			app.toast.create({
				title: t('Plugin updated'),
				description: t('{name} has been updated to v{version}.', {
					name: plugin.name,
					version: nextVersion
				}),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Plugin could not be updated'),
				description: error instanceof Error ? error.message : t('Unknown error.'),
				variant: 'error'
			});
		} finally {
			isUpdating = false;
		}
	}
</script>

<section
	class={cn(
		'flex min-h-52 flex-col gap-4 rounded-lg border border-dark-600 p-4',
		hasDependencyIssues ? 'pointer-events-none bg-destructive-900 opacity-70' : 'bg-dark-800'
	)}
>
	<div class="flex items-start gap-3">
		<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-700">
			<Icon icon={plugin.icon ?? 'ri:plug-line'} class="h-5 w-5" />
		</div>
		<div class="min-w-0 flex-1">
			<div class="flex flex-wrap items-center gap-2">
				<h2 class="font-semibold">{plugin.name}</h2>
				{#if plugin.version}
					<Badge variant="default">v{plugin.version}</Badge>
				{/if}
				{#if pendingUpdate}
					<Badge variant="warning">v{pendingUpdate.availableVersion}</Badge>
				{/if}
			</div>
			{#if plugin.description}
				<p class="mt-1 text-sm text-dark-100">{plugin.description}</p>
			{/if}
		</div>
		<InputSwitch
			class="shrink-0"
			bind:checked={() => plugin.isEnabled, (value) => void setPluginEnabled(value)}
		/>
	</div>

	<div class="flex flex-col gap-2 text-sm">
		{#if showDevMode}
			<div class="flex items-center justify-between gap-3">
				<div class="flex flex-col gap-0.5">
					<span class="text-dark-100">{t('Dev mode')}</span>
					<span class="text-xs text-dark-300"
						>{t('Watch plugin entry and reload on change')}</span
					>
				</div>
				<InputSwitch
					class="shrink-0"
					bind:checked={() => isDevMode, (value) => void setPluginDevModeEnabled(value)}
				/>
			</div>
		{/if}
		<div class="flex items-center justify-between gap-3">
			<span class="text-dark-100">{t('Configured')}</span>
			<Badge variant={isConfigured ? 'success' : 'default'}>
				{isConfigured ? t('Yes') : t('No')}
			</Badge>
		</div>
		{#if plugin.dependencies.length > 0}
			<div class="flex items-start justify-between gap-3">
				<span class="text-dark-100">{t('Depends on')}</span>
				{#each plugin.dependencies as dependency (dependency)}
					<Badge variant={hasDependencyIssues ? 'destructive' : 'success'}>
						{dependency}
					</Badge>
				{/each}
			</div>
		{/if}
	</div>

	<div class="mt-auto flex flex-wrap gap-2">
		{#if pendingUpdate}
			<Button onclick={updatePlugin} disabled={isUpdating} isLoading={isUpdating}>
				{isUpdating ? t('Updating...') : t('Update plugin')}
			</Button>
		{/if}
		{#if plugin.hasSettings}
			<Button variant="outline" onclick={openSettings}>{t('Configure')}</Button>
		{/if}
		{#if plugin.source === 'installed'}
			<Button variant="destructive" onclick={uninstallPlugin}>{t('Remove')}</Button>
		{/if}
	</div>
</section>
