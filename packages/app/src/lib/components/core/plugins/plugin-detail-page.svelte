<script lang="ts">
	import type { InstalledPluginManifest } from '#lib/core/plugins/installed-plugin.js';

	import Icon from '@iconify/svelte';
	import { invoke } from '@tauri-apps/api/core';
	import { goto } from '$app/navigation';

	import { Alert } from '@stream-kit/ui/alert';
	import { Eyebrow, Panel } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputSwitch } from '@stream-kit/ui/input';

	import { app } from '#lib/core/index.js';
	import { setPluginDevMode } from '#lib/core/plugins/plugin-dev-watcher.js';
	import { canApplyPluginUpdates } from '#lib/core/plugins/plugin-update.js';
	import { pluginUpdates } from '#lib/core/plugins/plugin-updates.svelte.js';
	import { useI18n } from '#lib/i18n.js';
	import { cn } from '#lib/utils.js';

	import {
		pluginStatusDotClasses,
		pluginStatusLabels,
		resolvePluginStatus,
		setPluginEnabled,
		uninstallPlugin,
		updatePlugin
	} from './plugin-actions';
	import PluginSettingsForm from './plugin-settings-form.svelte';

	type Props = {
		pluginKey: string;
	};

	let { pluginKey }: Props = $props();
	const { t } = useI18n();

	let statusRevision = $state(0);
	let isSaving = $state(false);
	let isUpdating = $state(false);

	const plugin = $derived(app.plugins.items.find((item) => item.key === pluginKey));
	const pendingUpdate = $derived(plugin ? pluginUpdates.getUpdate(plugin.key) : undefined);
	const canInstallUpdates = $derived(canApplyPluginUpdates());
	const showDevMode = $derived(app.settings.developerMode && plugin?.source === 'installed');
	const isDevMode = $derived(app.settings.isPluginDevMode(pluginKey));

	const status = $derived.by(() => {
		void statusRevision;

		return plugin ? resolvePluginStatus(plugin) : 'disabled';
	});
	const missingDependencies = $derived.by(() => {
		void statusRevision;

		return plugin?.missingDependencies(app) ?? [];
	});
	const disabledDependencies = $derived.by(() => {
		void statusRevision;

		return plugin?.disabledDependencies(app) ?? [];
	});

	$effect(() => {
		app.pageHeader.set({
			title: plugin?.name ?? t('Plugin not found'),
			segments: [t('Plugins')]
		});
	});

	$effect(() => {
		app.toolbar.set({
			meta: plugin
				? [
						...(plugin.version
							? [{ icon: 'ri:price-tag-3-line', label: `v${plugin.version}` }]
							: []),
						{
							icon:
								plugin.source === 'installed'
									? 'ri:download-2-line'
									: 'ri:box-3-line',
							label: plugin.source === 'installed' ? t('Installed') : t('Built-in')
						}
					]
				: [],
			actions: [
				{
					id: 'back-to-plugins',
					label: t('Back to plugins'),
					icon: 'ri:arrow-left-line',
					onClick: () => goto('/plugins')
				}
			],
			primaryActions: plugin?.hasSettings
				? [
						{
							id: 'save-plugin-settings',
							label: t('Save'),
							icon: 'ri:save-line',
							disabled: isSaving,
							loading: isSaving,
							onClick: savePluginSettings
						}
					]
				: []
		});
	});

	$effect(() => {
		const api = plugin?.api as { subscribe?: (listener: () => void) => () => void } | undefined;

		return api?.subscribe?.(() => {
			statusRevision += 1;
		});
	});

	async function savePluginSettings(): Promise<void> {
		if (!plugin || isSaving) {
			return;
		}

		isSaving = true;

		try {
			const saved = await plugin.save(app);

			if (saved) {
				statusRevision += 1;
				app.toast.create({
					title: t('Plugin saved'),
					description: t('{name} has been saved successfully', { name: plugin.name }),
					variant: 'success'
				});
			} else {
				app.toast.create({
					title: t('Settings not saved'),
					description: t('Check the highlighted fields and try again.'),
					variant: 'error'
				});
			}
		} catch (error) {
			app.toast.create({
				title: t('Settings not saved'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			isSaving = false;
		}
	}

	async function toggleEnabled(enabled: boolean): Promise<void> {
		if (!plugin) {
			return;
		}

		await setPluginEnabled(plugin, enabled);
		statusRevision += 1;
	}

	async function toggleDevMode(enabled: boolean): Promise<void> {
		const manifests = await invoke<InstalledPluginManifest[]>('list_installed_plugins');
		const manifest = manifests.find((item) => item.key === pluginKey);

		await setPluginDevMode(app, pluginKey, enabled, manifest);
	}

	async function update(): Promise<void> {
		if (!plugin || isUpdating) {
			return;
		}

		isUpdating = true;

		try {
			await updatePlugin(plugin);
			statusRevision += 1;
		} finally {
			isUpdating = false;
		}
	}

	async function remove(): Promise<void> {
		if (plugin && (await uninstallPlugin(plugin))) {
			await goto('/plugins');
		}
	}
</script>

<Container class="px-6 py-6" size="lg">
	{#if !plugin}
		<EmptyState
			icon="ri:plug-line"
			title={t('Plugin not found')}
			description={t('This plugin is not installed or could not be loaded.')}
		>
			<Button variant="outline" icon="ri:arrow-left-line" href="/plugins">
				{t('Back to plugins')}
			</Button>
		</EmptyState>
	{:else}
		<div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
			<div class="flex min-w-0 flex-col gap-4">
				{#if pendingUpdate}
					<Alert
						variant="warning"
						title={t('Update available')}
						description={t('Version {version} is available.', {
							version: pendingUpdate.availableVersion
						})}
					>
						{#if canInstallUpdates}
							<Button
								class="mt-3"
								size="sm"
								icon="ri:refresh-line"
								disabled={isUpdating}
								isLoading={isUpdating}
								onclick={() => void update()}
							>
								{isUpdating ? t('Updating...') : t('Update plugin')}
							</Button>
						{/if}
					</Alert>
				{/if}

				{#if status === 'not-configured' && plugin.hasSettings}
					<Alert
						variant="warning"
						title={t('Not configured')}
						description={t(
							'{name} is not set up yet. Fill in the settings below and save to start using it.',
							{ name: plugin.name }
						)}
					/>
				{/if}

				{#if missingDependencies.length > 0}
					<Alert
						variant="error"
						title={t('Missing plugins')}
						description={missingDependencies.join(', ')}
					/>
				{/if}
				{#if disabledDependencies.length > 0}
					<Alert
						variant="warning"
						title={t('Disabled plugins')}
						description={disabledDependencies.join(', ')}
					/>
				{/if}

				<Panel tone="solid">
					{#snippet header()}
						<Eyebrow>{t('Settings')}</Eyebrow>
					{/snippet}
					<div class="p-5">
						{#if plugin.hasSettings}
							<PluginSettingsForm {plugin} />
						{:else}
							<EmptyState
								compact
								icon="ri:settings-3-line"
								title={t('No settings')}
								description={t('This plugin has no settings to configure.')}
							/>
						{/if}
					</div>
				</Panel>
			</div>

			<Panel tone="solid" class="overflow-hidden lg:sticky lg:top-6">
				<div class="flex flex-col gap-3 p-5">
					<div class="flex items-center gap-3">
						<div
							class={cn(
								'flex size-11 shrink-0 items-center justify-center rounded-md border border-rule',
								plugin.isEnabled ? 'text-primary' : 'text-dark-400'
							)}
							aria-hidden="true"
						>
							<Icon icon={plugin.icon ?? 'ri:plug-line'} class="size-5" />
						</div>
						<div class="min-w-0">
							<p class="truncate text-base font-semibold text-dark-50">
								{plugin.name}
							</p>
							<p class="truncate font-mono text-[11px] text-dark-400">{plugin.key}</p>
						</div>
					</div>
					{#if plugin.description}
						<p class="text-sm leading-relaxed text-dark-300">{plugin.description}</p>
					{/if}
				</div>

				<dl class="divide-y divide-rule border-t border-rule text-sm">
					<div class="flex items-center justify-between gap-3 px-5 py-3">
						<dt class="text-dark-300">{t('Enabled')}</dt>
						<dd>
							<InputSwitch
								bind:checked={
									() => plugin.isEnabled, (value) => void toggleEnabled(value)
								}
							/>
						</dd>
					</div>
					<div class="flex items-center justify-between gap-3 px-5 py-3">
						<dt class="text-dark-300">{t('Status')}</dt>
						<dd class="flex items-center gap-2 text-dark-100">
							<span
								class={cn('size-1.5 rounded-full', pluginStatusDotClasses[status])}
							></span>
							{t(pluginStatusLabels[status])}
						</dd>
					</div>
					{#if plugin.version}
						<div class="flex items-center justify-between gap-3 px-5 py-3">
							<dt class="text-dark-300">{t('Version')}</dt>
							<dd class="font-mono text-xs text-dark-100 tabular-nums">
								v{plugin.version}
							</dd>
						</div>
					{/if}
					<div class="flex items-center justify-between gap-3 px-5 py-3">
						<dt class="text-dark-300">{t('Source')}</dt>
						<dd class="text-dark-100">
							{plugin.source === 'installed' ? t('Installed') : t('Built-in')}
						</dd>
					</div>
					{#if plugin.dependencies.length > 0}
						<div class="flex items-start justify-between gap-3 px-5 py-3">
							<dt class="shrink-0 text-dark-300">{t('Requires')}</dt>
							<dd class="flex flex-wrap justify-end gap-1">
								{#each plugin.dependencies as dependency (dependency)}
									<span
										class={cn(
											'rounded-md border px-1.5 py-px font-mono text-[11px]',
											missingDependencies.includes(dependency) ||
												disabledDependencies.includes(dependency)
												? 'border-destructive-200/40 text-destructive-100'
												: 'border-rule text-dark-200'
										)}
									>
										{dependency}
									</span>
								{/each}
							</dd>
						</div>
					{/if}
					{#if showDevMode}
						<div class="flex items-center justify-between gap-3 px-5 py-3">
							<dt class="flex min-w-0 flex-col gap-0.5">
								<span class="text-dark-100">{t('Dev mode')}</span>
								<span class="text-xs text-dark-400">
									{t('Watch plugin entry and reload on change')}
								</span>
							</dt>
							<dd>
								<InputSwitch
									bind:checked={
										() => isDevMode, (value) => void toggleDevMode(value)
									}
								/>
							</dd>
						</div>
					{/if}
				</dl>

				{#if plugin.source === 'installed'}
					<div class="border-t border-rule p-3">
						<Button
							variant="destructive"
							size="sm"
							class="w-full"
							icon="ri:delete-bin-line"
							onclick={() => void remove()}
						>
							{t('Remove plugin')}
						</Button>
					</div>
				{/if}
			</Panel>
		</div>
	{/if}
</Container>
