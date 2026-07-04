<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox } from '@stream-kit/ui/input';
	import { InputText } from '@stream-kit/ui/input';

	import OverlaySettingsForm from '$lib/components/core/overlay/overlay-settings-form.svelte';
	import { app } from '$lib/core';
	import type { OverlaySettingsDefinition } from '$lib/core/overlay/overlay-settings.svelte';
	import {
		disabledRequiredPlugins,
		formatRequiredPluginLabels,
		missingRequiredPlugins
	} from '$lib/core/overlay/overlay-dependencies';
	import { getPresetEventSummary } from '$lib/core/overlay/overlay-action-presets';
	import type { OverlayActionPresetValidation } from '$lib/core/overlay/overlay-action-presets';
	import type { OverlayManifest } from '$lib/core/overlay/overlay-manifest';
	import { getOverlayFrameworkIcon } from '$lib/core/overlay';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	const overlayId = $derived(page.params.id ?? '');
	const overlay = $derived(app.overlay.items.find((item) => item.id === overlayId));
	const framework = $derived(overlay?.template ?? 'vanilla');
	const needsBuild = $derived(framework !== 'vanilla');
	const isBuilt = $derived(app.overlay.isBuilt(overlayId));
	const isBuilding = $derived(app.overlay.buildingId === overlayId);
	const browserSourceUrl = $derived(app.overlay.getUrl(overlayId));
	const dependencyManifest = $derived({
		requiredPlugins: overlay?.requiredPlugins ?? []
	} as OverlayManifest);
	const overlayUnavailableReason = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return app.overlay.getOverlayUnavailableReason(overlay?.requiredPlugins ?? []);
	});
	const isOverlayAvailable = $derived(overlayUnavailableReason === null);
	const missingPlugins = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return missingRequiredPlugins(dependencyManifest, app);
	});
	const disabledPlugins = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return disabledRequiredPlugins(dependencyManifest, app);
	});

	let settings = $state<OverlaySettingsDefinition | null>(null);
	let actionPresets = $state<OverlayActionPresetValidation[]>([]);
	let selectedPresetKeys = $state<string[]>([]);
	let loadError = $state<string | null>(null);
	let isLoadingSettings = $state(false);
	let isInstallingPresets = $state(false);
	let previewKey = $state(0);
	let openingEditor = $state(false);
	let runningTest = $state<string | null>(null);
	let settingsForm = $state<OverlaySettingsForm | undefined>();

	const pendingPresets = $derived(
		actionPresets.filter((entry) => entry.status === 'installable')
	);
	const hasRecommendedActions = $derived(actionPresets.length > 0);

	$effect(() => {
		const id = overlayId;

		if (!id) {
			settings = null;
			actionPresets = [];
			loadError = null;
			isLoadingSettings = false;
			return;
		}

		let cancelled = false;
		loadError = null;
		settings = null;
		actionPresets = [];
		isLoadingSettings = true;

		void Promise.all([app.overlay.getSettings(id), app.overlay.getActionPresets(id)])
			.then(([definition, presets]) => {
				if (!cancelled) {
					settings = definition;
					actionPresets = presets;
					selectedPresetKeys = presets
						.filter((entry) => entry.status === 'installable')
						.map((entry) => entry.preset.key);
					isLoadingSettings = false;
				}
			})
			.catch((error) => {
				if (!cancelled) {
					settings = null;
					actionPresets = [];
					loadError = error instanceof Error ? error.message : String(error);
					isLoadingSettings = false;
				}
			});

		return () => {
			cancelled = true;
		};
	});

	async function reloadSettings(): Promise<void> {
		if (!overlayId) {
			return;
		}

		await settingsForm?.flushPendingSave();

		try {
			loadError = null;
			const [definition, presets] = await Promise.all([
				app.overlay.getSettings(overlayId),
				app.overlay.getActionPresets(overlayId)
			]);
			settings = definition;
			actionPresets = presets;
			selectedPresetKeys = presets
				.filter((entry) => entry.status === 'installable')
				.map((entry) => entry.preset.key);
		} catch (error) {
			settings = null;
			actionPresets = [];
			loadError = error instanceof Error ? error.message : String(error);
		}
	}

	async function reloadPreview(): Promise<void> {
		previewKey += 1;
	}

	async function openInEditor(): Promise<void> {
		openingEditor = true;

		try {
			await app.overlay.openInExternalEditor(overlayId);
			await reloadSettings();
		} catch (error) {
			app.toast.create({
				title: t('Could not open editor'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			openingEditor = false;
		}
	}

	async function buildOverlay(): Promise<void> {
		const result = await app.overlay.build(overlayId);

		if (result.success) {
			previewKey += 1;
			app.toast.create({
				title: t('Build complete'),
				description: t('The overlay is ready for OBS.'),
				variant: 'success'
			});
			return;
		}

		app.toast.create({
			title: t('Build failed'),
			description: result.error ?? t('Unknown error'),
			variant: 'error'
		});
	}

	async function runTest(event: string, payload?: unknown): Promise<void> {
		runningTest = event;

		try {
			await app.overlay.runTest(overlayId, event, payload);
		} catch (error) {
			app.toast.create({
				title: t('Test failed'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			runningTest = null;
		}
	}

	function togglePresetSelection(key: string, checked: boolean): void {
		if (checked) {
			selectedPresetKeys = [...new Set([...selectedPresetKeys, key])];
			return;
		}

		selectedPresetKeys = selectedPresetKeys.filter((entry) => entry !== key);
	}

	async function installRecommendedActions(): Promise<void> {
		const keys = selectedPresetKeys.filter((key) =>
			pendingPresets.some((entry) => entry.preset.key === key)
		);

		if (keys.length === 0) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Install recommended actions?'),
			description: t(
				'Stream Kit will create {count} action(s) in your Actions list and enable them. You can edit or remove them later.',
				{ count: keys.length }
			),
			confirmLabel: t('Install')
		});

		if (!confirmed) {
			return;
		}

		isInstallingPresets = true;

		try {
			const result = await app.overlay.installRecommendedActions(overlayId, keys);
			actionPresets = await app.overlay.getActionPresets(overlayId);
			selectedPresetKeys = actionPresets
				.filter((entry) => entry.status === 'installable')
				.map((entry) => entry.preset.key);

			if (result.installed.length > 0) {
				app.toast.create({
					title: t('Actions installed'),
					description: t('{count} recommended action(s) were installed.', {
						count: result.installed.length
					}),
					variant: 'success'
				});
			}

			if (result.failed.length > 0) {
				app.toast.create({
					title: t('Some actions could not be installed'),
					description: result.failed.map((entry) => entry.error).join(' '),
					variant: 'error'
				});
			}
		} catch (error) {
			app.toast.create({
				title: t('Could not install actions'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			isInstallingPresets = false;
		}
	}

	function presetStatusLabel(status: OverlayActionPresetValidation['status']): string {
		switch (status) {
			case 'installed':
				return t('Installed');
			case 'blocked':
				return t('Blocked');
			default:
				return t('Not installed');
		}
	}
</script>

<Container class="px-6 py-6" size="lg">
	<header class="mb-6 flex flex-wrap items-start justify-between gap-4">
		<div class="space-y-2">
			<Button variant="ghost" size="sm" icon="ri:arrow-left-line" onclick={() => goto('/overlays')}>
				{t('Back to overlays')}
			</Button>

			{#if overlay}
				<div class="flex items-center gap-3">
					<div
						class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-800 text-primary"
					>
						<Icon icon={getOverlayFrameworkIcon(framework)} class="size-5" />
					</div>
					<div>
						<Heading level="1">{overlay.name}</Heading>
						<div class="mt-1 flex flex-wrap items-center gap-1.5">
							<Badge variant="secondary" size="sm">{overlay.template}</Badge>
							{#if isBuilt}
								<Badge variant="success" size="sm">{t('Ready')}</Badge>
							{:else}
								<Badge variant="warning" size="sm">{t('Not built')}</Badge>
							{/if}
						</div>
					</div>
				</div>
			{:else}
				<Heading level="1">{t('Configure overlay')}</Heading>
			{/if}
		</div>

		<div class="flex flex-wrap items-center gap-2">
			<Button
				variant="outline"
				size="sm"
				icon="ri:code-box-line"
				disabled={openingEditor}
				isLoading={openingEditor}
				onclick={() => void openInEditor()}
			>
				{t('Open in editor')}
			</Button>
			{#if needsBuild}
				<Button
					variant="outline"
					size="sm"
					icon="ri:hammer-line"
					disabled={isBuilding}
					isLoading={isBuilding}
					onclick={() => void buildOverlay()}
				>
					{t('Build')}
				</Button>
			{/if}
		</div>
	</header>

	{#if !overlay}
		<p class="text-sm text-dark-300">{t('Overlay not found.')}</p>
	{:else if isLoadingSettings}
		<p class="text-sm text-dark-300">{t('Loading overlay settings…')}</p>
	{:else if loadError}
		<p class="text-sm text-red-400">{loadError}</p>
	{:else}
		{#if overlayUnavailableReason}
			<Alert variant="warning" class="mb-6">
				<p>{overlayUnavailableReason}</p>
				{#if missingPlugins.length > 0 || disabledPlugins.length > 0}
					<p class="mt-2 text-sm text-dark-200">
						{t('Requires')}: {formatRequiredPluginLabels(app, [
							...missingPlugins,
							...disabledPlugins
						])}
					</p>
				{/if}
				<Button class="mt-3" size="sm" variant="outline" onclick={() => goto('/plugins')}>
					{t('Open plugins')}
				</Button>
			</Alert>
		{/if}

		<div class="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
			<section class="flex min-h-[28rem] flex-col overflow-hidden rounded-xl border border-dark-600 bg-dark-900">
				<div class="flex items-center justify-between border-b border-dark-700 px-4 py-3">
					<p class="text-sm font-medium text-dark-100">{t('Preview')}</p>
					{#if !isBuilt}
						<Badge variant="warning" size="sm">{t('Not built')}</Badge>
					{/if}
				</div>

				<div class="relative min-h-0 flex-1 bg-[#0f0f12]">
					{#if isBuilt}
						{#key previewKey}
							<iframe
								title={t('Overlay preview')}
								src={browserSourceUrl}
								class="absolute inset-0 size-full border-0 bg-transparent"
							></iframe>
						{/key}
					{:else}
						<div class="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
							<Icon icon="ri:hammer-line" class="size-8 text-dark-400" />
							<p class="text-sm text-dark-300">
								{t('Build this overlay to preview it here and use it in OBS.')}
							</p>
							<Button size="sm" icon="ri:hammer-line" onclick={() => void buildOverlay()}>
								{t('Build')}
							</Button>
						</div>
					{/if}
				</div>
			</section>

			<aside class="space-y-6">
				{#if hasRecommendedActions}
					<section class="rounded-xl border border-dark-600 bg-dark-800 p-4">
						<Heading level="3" class="mb-2">{t('Recommended actions')}</Heading>
						<p class="mb-4 text-sm text-dark-300">
							{t('Install ready-made actions that connect triggers to this overlay.')}
						</p>

						<ul class="space-y-3">
							{#each actionPresets as entry (entry.preset.key)}
								<li class="rounded-lg border border-dark-700 bg-dark-900/60 p-3">
									<div class="flex items-start gap-3">
										{#if entry.status === 'installable'}
											<InputCheckbox
												bind:checked={
													() => selectedPresetKeys.includes(entry.preset.key),
													(value) => togglePresetSelection(entry.preset.key, value)
												}
												aria-label={entry.preset.name}
											/>
										{/if}
										<div class="min-w-0 flex-1 space-y-1">
											<div class="flex flex-wrap items-center gap-2">
												<p class="font-medium text-dark-50">{entry.preset.name}</p>
												<Badge
													variant={entry.status === 'installed'
														? 'success'
														: entry.status === 'blocked'
															? 'destructive'
															: 'secondary'}
													size="sm"
												>
													{presetStatusLabel(entry.status)}
												</Badge>
											</div>
											<p class="text-xs text-dark-400">
												{t('Triggers')}: {entry.preset.triggers
													.map((trigger) => trigger.triggerTypeId)
													.join(', ')}
											</p>
											{#if getPresetEventSummary(entry.preset)}
												<p class="text-xs text-dark-400">
													{t('Event')}: {getPresetEventSummary(entry.preset)}
												</p>
											{/if}
											{#if entry.issues.length > 0}
												<p class="text-xs text-red-400">{entry.issues.join(' ')}</p>
											{/if}
										</div>
									</div>
								</li>
							{/each}
						</ul>

						{#if pendingPresets.length > 0}
							<Button
								class="mt-4"
								size="sm"
								icon="ri:download-2-line"
								disabled={selectedPresetKeys.length === 0 || isInstallingPresets || !isOverlayAvailable}
								isLoading={isInstallingPresets}
								onclick={() => void installRecommendedActions()}
							>
								{t('Install recommended actions')}
							</Button>
						{/if}
					</section>
				{/if}

				<section class="rounded-xl border border-dark-600 bg-dark-800 p-4">
					<p class="mb-2 text-[10px] font-semibold tracking-wider text-dark-400 uppercase">
						{t('Browser source URL')}
					</p>
					<div class="min-w-0 [&_input]:font-mono [&_input]:text-[11px] [&_input]:leading-5">
						<InputText
							copyable
							readonly
							size="xs"
							aria-label={t('Browser source URL')}
							value={browserSourceUrl}
							copyLabel={t('Copy URL')}
							copiedLabel={t('Copied')}
						/>
					</div>
				</section>

				{#if settings?.hasSettings}
					<section class="rounded-xl border border-dark-600 bg-dark-800 p-4">
						<Heading level="3" class="mb-4">{t('Settings')}</Heading>
						{#key `${settings.overlayId}:${settings.versionSnapshot}`}
							<OverlaySettingsForm bind:this={settingsForm} {settings} />
						{/key}
					</section>
				{:else if settings}
					<section class="rounded-xl border border-dashed border-dark-600 bg-dark-900/50 p-4">
						<p class="text-sm text-dark-300">
							{t('This overlay has no configurable settings. Add a settings array to manifest.json in the overlay project.')}
						</p>
					</section>
				{/if}

				{#if settings && settings.testHandlers.length > 0}
					<section class="rounded-xl border border-dark-600 bg-dark-800 p-4">
						<Heading level="3" class="mb-2">{t('Test mode')}</Heading>
						<p class="mb-4 text-sm text-dark-300">
							{t('Trigger sample events to preview overlay behavior without going live.')}
						</p>
						{#if !isOverlayAvailable}
							<p class="mb-4 text-sm text-dark-400">
								{t('Install and enable required plugins to use test mode.')}
							</p>
						{/if}
						<div class="flex flex-wrap gap-2">
							{#each settings.testHandlers as handler (handler.event + handler.label)}
								<Button
									variant="outline"
									size="sm"
									icon="ri:play-line"
									disabled={!isBuilt || !isOverlayAvailable || runningTest === handler.event}
									isLoading={runningTest === handler.event}
									onclick={() => void runTest(handler.event, handler.payload)}
								>
									{handler.label}
								</Button>
							{/each}
						</div>
					</section>
				{/if}
			</aside>
		</div>
	{/if}
</Container>
