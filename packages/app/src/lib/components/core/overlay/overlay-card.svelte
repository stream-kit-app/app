<script lang="ts">
	import type { SaveOverlayInput } from '$db/repositories/overlays';
	import type { OverlayFrameworkId } from '$lib/core/overlay';

	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { useId } from 'bits-ui';
	import { tick } from 'svelte';

	import { Eyebrow } from '@stream-kit/ui/blueprint';
	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { getOverlayFrameworkIcon } from '$lib/core/overlay';
	import type { OverlayManifest } from '$lib/core/overlay/overlay-manifest';
	import {
		disabledRequiredPlugins,
		formatRequiredPluginLabels,
		missingRequiredPlugins
	} from '$lib/core/overlay/overlay-dependencies';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		overlay: SaveOverlayInput;
	};

	let { overlay }: Props = $props();

	const { t } = useI18n();

	let nameDraft = $state('');
	let isEditingName = $state(false);
	let isSavingName = $state(false);
	let openingEditor = $state(false);
	let exporting = $state(false);

	const nameInputId = useId();

	const framework = $derived(overlay.template as OverlayFrameworkId);
	const needsBuild = $derived(framework !== 'vanilla');
	const browserSourceUrl = $derived(app.overlay.getUrl(overlay.id));
	const isBuilt = $derived(app.overlay.isBuilt(overlay.id));
	const isBuilding = $derived(app.overlay.buildingId === overlay.id);
	const dependencyManifest = $derived({
		requiredPlugins: overlay.requiredPlugins ?? []
	} as OverlayManifest);
	const overlayUnavailableReason = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return app.overlay.getOverlayUnavailableReason(overlay.requiredPlugins ?? []);
	});
	const hasDependencyIssues = $derived(overlayUnavailableReason !== null);
	const missingPlugins = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return missingRequiredPlugins(dependencyManifest, app);
	});
	const disabledPlugins = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return disabledRequiredPlugins(dependencyManifest, app);
	});
	const requiredPluginLabels = $derived(
		formatRequiredPluginLabels(app, overlay.requiredPlugins ?? [])
	);

	$effect(() => {
		overlay.id;
		isEditingName = false;
	});

	$effect(() => {
		overlay.id;
		overlay.name;

		if (!isSavingName && !isEditingName) {
			nameDraft = overlay.name;
		}
	});

	async function startEditingName(): Promise<void> {
		nameDraft = overlay.name;
		isEditingName = true;
		await tick();
		const input = document.getElementById(nameInputId);

		if (input instanceof HTMLInputElement) {
			input.focus();
			input.select();
		}
	}

	async function finishEditingName(): Promise<void> {
		await saveName();
		isEditingName = false;
	}

	async function saveName(): Promise<void> {
		const trimmed = nameDraft.trim();

		if (!trimmed || trimmed === overlay.name) {
			nameDraft = overlay.name;
			return;
		}

		isSavingName = true;

		try {
			await app.overlay.rename(overlay.id, trimmed);
			app.toast.create({
				title: t('Overlay renamed'),
				variant: 'success'
			});
		} catch (error) {
			nameDraft = overlay.name;
			app.toast.create({
				title: t('Could not rename overlay'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			isSavingName = false;
		}
	}

	function handleNameKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			event.currentTarget instanceof HTMLInputElement && event.currentTarget.blur();
		}

		if (event.key === 'Escape') {
			nameDraft = overlay.name;
			isEditingName = false;
		}
	}

	async function openInEditor(): Promise<void> {
		openingEditor = true;

		try {
			const result = await app.overlay.openInExternalEditor(overlay.id);

			if (result.opened === 'editor') {
				app.toast.create({
					title: t('Opened in editor'),
					variant: 'success'
				});
				return;
			}

			app.toast.create({
				title: t('Opened project folder'),
				description: t(
					'No code editor found. The folder was opened in your file manager and the path was copied. You can also edit the project at vscode.dev — open the folder there manually or drag it into the browser.'
				),
				variant: 'warning'
			});
		} catch (error) {
			app.toast.create({
				title: t('Could not open in editor'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			openingEditor = false;
		}
	}

	async function openFolder(): Promise<void> {
		try {
			await app.overlay.openProjectFolder(overlay.id);
		} catch (error) {
			app.toast.create({
				title: t('Could not open folder'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		}
	}

	async function downloadZip(): Promise<void> {
		exporting = true;

		try {
			await app.overlay.exportZip(overlay.id, overlay.name);
			app.toast.create({
				title: t('Project downloaded'),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Could not export project'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			exporting = false;
		}
	}

	async function buildOverlay(): Promise<void> {
		try {
			const result = await app.overlay.build(overlay.id);

			if (result.success) {
				app.toast.create({
					title: t('Overlay built'),
					variant: 'success'
				});
				return;
			}

			app.toast.create({
				title: t('Overlay build failed'),
				description: result.error ?? t('Unknown build error'),
				variant: 'error'
			});
		} catch (error) {
			app.toast.create({
				title: t('Overlay build failed'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		}
	}

	async function deleteOverlay(): Promise<void> {
		const confirmed = await app.confirm.ask({
			title: t('Delete overlay?'),
			description: t('Are you sure you want to delete "{name}"? This cannot be undone.', {
				name: overlay.name
			}),
			confirmLabel: t('Delete')
		});

		if (!confirmed) {
			return;
		}

		try {
			await app.overlay.remove(overlay.id);
		} catch (error) {
			app.toast.create({
				title: t('Could not delete overlay'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		}
	}
</script>

<article
	class={cn(
		'group/card flex flex-col overflow-hidden rounded-none border transition-colors',
		hasDependencyIssues
			? 'border-rule bg-dark-900/70 opacity-80 hover:bg-dark-900/80'
			: 'border-rule bg-dark-800 hover:bg-dark-900/60'
	)}
>
	<div class="flex items-start gap-3 p-4 pb-3">
		<div
			class="flex size-10 shrink-0 items-center justify-center border border-rule text-primary"
		>
			<Icon icon={getOverlayFrameworkIcon(framework)} class="size-5" />
		</div>

		<div class="min-w-0 flex-1 space-y-2">
			{#if isEditingName}
				<InputText
					id={nameInputId}
					size="sm"
					aria-label={t('Name')}
					value={nameDraft}
					disabled={isSavingName}
					oninput={(event) => {
						nameDraft = event.currentTarget.value;
					}}
					onblur={() => void finishEditingName()}
					onkeydown={handleNameKeydown}
				/>
			{:else}
				<div class="flex min-w-0 items-center gap-1">
					<h2 class="min-w-0 flex-1 truncate text-base font-semibold text-dark-50">
						{overlay.name}
					</h2>
					<Button
						variant="ghost"
						size="icon-sm"
						icon="ri:pencil-line"
						class="shrink-0 text-dark-300 hover:text-dark-50"
						aria-label={t('Rename overlay')}
						onclick={() => void startEditingName()}
						{@attach tooltip(() => t('Rename overlay'))}
					/>
				</div>
			{/if}

			<div class="flex flex-wrap items-center gap-1.5">
				<Badge variant="secondary" size="sm">{overlay.template}</Badge>
				{#if isBuilt}
					<Badge variant="success" size="sm">{t('Ready')}</Badge>
				{:else}
					<Badge variant="warning" size="sm">{t('Not built')}</Badge>
				{/if}
				{#if overlay.expectedEvents.length > 0}
					<Badge variant="ghost" size="sm">
						<Icon icon="ri:flashlight-line" />
						{t('{count} events', { count: overlay.expectedEvents.length })}
					</Badge>
				{/if}
				{#if hasDependencyIssues}
					<Badge variant="destructive" size="sm">
						<Icon icon="ri:error-warning-line" />
						{t('Unavailable')}
					</Badge>
				{/if}
			</div>
			{#if hasDependencyIssues && requiredPluginLabels}
				<p class="text-xs text-dark-400">
					{t('Requires')}: {requiredPluginLabels}
				</p>
				{#if missingPlugins.length > 0}
					<p class="text-xs text-red-400">
						{t('Missing plugins')}: {formatRequiredPluginLabels(app, missingPlugins)}
					</p>
				{/if}
				{#if disabledPlugins.length > 0}
					<p class="text-xs text-amber-400">
						{t('Disabled plugins')}: {formatRequiredPluginLabels(app, disabledPlugins)}
					</p>
				{/if}
			{/if}
		</div>
	</div>

	<div class="border-t border-rule bg-dark-900/50 px-4 py-3">
		<Eyebrow class="mb-2">{t('Browser source URL')}</Eyebrow>
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
	</div>

	<div class="mt-auto flex items-center gap-2 border-t border-rule p-3">
		<Button
			size="sm"
			variant="default"
			class="min-w-0 flex-1"
			icon="ri:settings-3-line"
			onclick={() => goto(`/overlays/${overlay.id}`)}
		>
			<span class="truncate">{t('Configure')}</span>
		</Button>

		<Button
			size="sm"
			variant="outline"
			class="min-w-0 flex-1"
			icon="ri:code-box-line"
			disabled={openingEditor}
			isLoading={openingEditor}
			onclick={() => void openInEditor()}
		>
			<span class="truncate">{t('Open in editor')}</span>
		</Button>

		<div class="flex shrink-0 items-center gap-1">
			<Button
				variant="outline"
				size="icon-sm"
				icon="ri:folder-open-line"
				aria-label={t('Open folder')}
				onclick={() => void openFolder()}
				{@attach tooltip(() => t('Open folder'))}
			/>
			{#if needsBuild}
				<Button
					variant="outline"
					size="icon-sm"
					icon="ri:hammer-line"
					aria-label={t('Build')}
					disabled={isBuilding}
					isLoading={isBuilding}
					onclick={() => void buildOverlay()}
					{@attach tooltip(() => t('Build'))}
				/>
			{/if}
			<Button
				variant="outline"
				size="icon-sm"
				icon="ri:download-2-line"
				aria-label={t('Download ZIP')}
				disabled={exporting}
				isLoading={exporting}
				onclick={() => void downloadZip()}
				{@attach tooltip(() => t('Download ZIP'))}
			/>
			<Button
				variant="destructive"
				size="icon-sm"
				icon="ri:delete-bin-line"
				aria-label={t('Delete')}
				onclick={() => void deleteOverlay()}
				{@attach tooltip(() => t('Delete'))}
			/>
		</div>
	</div>
</article>
