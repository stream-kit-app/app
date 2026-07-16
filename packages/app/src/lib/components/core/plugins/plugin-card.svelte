<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';
	import type { InstalledPluginManifest } from '$lib/core/plugins/installed-plugin';

	import Icon from '@iconify/svelte';
	import { invoke } from '@tauri-apps/api/core';

	import { tooltip } from '@stream-kit/ui/attachments';
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
	const showFooter = $derived(
		Boolean(pendingUpdate) || plugin.hasSettings || plugin.source === 'installed'
	);

	function dependencyBadgeVariant(dependency: string): 'success' | 'destructive' {
		if (missingDependencies.includes(dependency) || disabledDependencies.includes(dependency)) {
			return 'destructive';
		}

		return 'success';
	}

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

<article
	class={cn(
		'group/card flex flex-col overflow-hidden rounded-xl border transition-colors',
		hasDependencyIssues
			? 'border-dark-700 bg-dark-900/70 opacity-80 hover:border-dark-600'
			: 'border-dark-600 bg-dark-800 hover:border-dark-500'
	)}
>
	<div class="flex items-start gap-3 p-4 pb-3">
		<div
			class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			aria-hidden="true"
		>
			<Icon icon={plugin.icon ?? 'ri:plug-line'} class="size-5" />
		</div>
		<div class="min-w-0 flex-1 space-y-2">
			<h2 class="min-w-0 truncate text-base font-semibold text-dark-50">{plugin.name}</h2>
			<div class="flex flex-wrap items-center gap-1.5">
				{#if plugin.version}
					<Badge variant="default" size="sm">v{plugin.version}</Badge>
				{/if}
				{#if pendingUpdate}
					<Badge variant="warning" size="sm">v{pendingUpdate.availableVersion}</Badge>
				{/if}
				{#if plugin.source === 'installed'}
					<Badge variant="secondary" size="sm">{t('Installed')}</Badge>
				{:else}
					<Badge variant="ghost" size="sm">{t('Built-in')}</Badge>
				{/if}
				{#if hasDependencyIssues}
					<Badge variant="destructive" size="sm">
						<Icon icon="ri:error-warning-line" />
						{t('Unavailable')}
					</Badge>
				{/if}
			</div>
			{#if plugin.description}
				<p class="line-clamp-2 text-sm text-dark-300">{plugin.description}</p>
			{/if}
		</div>
		<InputSwitch
			class="shrink-0"
			bind:checked={() => plugin.isEnabled, (value) => void setPluginEnabled(value)}
		/>
	</div>

	<div class="border-t border-dark-700/80 bg-dark-900/50 px-4 py-3">
		<p class="mb-2 text-[10px] font-semibold tracking-wider text-dark-400 uppercase">
			{t('Status')}
		</p>
		<div class="flex flex-wrap items-center gap-1.5">
			<Badge variant={isConfigured ? 'success' : 'default'} size="sm">
				{isConfigured ? t('Configured') : t('Not configured')}
			</Badge>
			{#each plugin.dependencies as dependency (dependency)}
				<Badge variant={dependencyBadgeVariant(dependency)} size="sm">
					{dependency}
				</Badge>
			{/each}
		</div>
		{#if hasMissingDependencies}
			<p class="mt-2 text-xs text-red-400">
				{t('Missing plugins')}: {missingDependencies.join(', ')}
			</p>
		{/if}
		{#if hasDisabledDependencies}
			<p class="mt-2 text-xs text-amber-400">
				{t('Disabled plugins')}: {disabledDependencies.join(', ')}
			</p>
		{/if}
		{#if showDevMode}
			<div class="mt-3 flex items-center justify-between gap-3">
				<div class="flex min-w-0 flex-col gap-0.5">
					<span class="text-sm text-dark-100">{t('Dev mode')}</span>
					<span class="text-xs text-dark-300">
						{t('Watch plugin entry and reload on change')}
					</span>
				</div>
				<InputSwitch
					class="shrink-0"
					bind:checked={() => isDevMode, (value) => void setPluginDevModeEnabled(value)}
				/>
			</div>
		{/if}
	</div>

	{#if showFooter}
		<div class="mt-auto flex items-center gap-2 border-t border-dark-700 p-3">
			{#if pendingUpdate}
				<Button
					size="sm"
					variant="default"
					class="min-w-0 flex-1"
					icon="ri:refresh-line"
					onclick={updatePlugin}
					disabled={isUpdating}
					isLoading={isUpdating}
				>
					<span class="truncate">
						{isUpdating ? t('Updating...') : t('Update plugin')}
					</span>
				</Button>
			{/if}
			{#if plugin.hasSettings}
				<Button
					size="sm"
					variant={pendingUpdate ? 'outline' : 'default'}
					class="min-w-0 flex-1"
					icon="ri:settings-3-line"
					onclick={openSettings}
				>
					<span class="truncate">{t('Configure')}</span>
				</Button>
			{/if}
			{#if plugin.source === 'installed'}
				<div class="flex shrink-0 items-center gap-1">
					<Button
						variant="destructive"
						size="icon-sm"
						icon="ri:delete-bin-line"
						aria-label={t('Remove')}
						onclick={() => void uninstallPlugin()}
						{@attach tooltip(() => t('Remove'))}
					/>
				</div>
			{/if}
		</div>
	{/if}
</article>
