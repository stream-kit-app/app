<script lang="ts" module>
	/** New overlays already scrolled into view, so returning to the list does not jump again. */
	const scrolledIntoView = new Set<string>();
</script>

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { SaveOverlayInput } from '$db/repositories/overlays';
	import type { OverlayFrameworkId } from '$lib/core/overlay';

	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { useId } from 'bits-ui';
	import { tick } from 'svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import * as Dropdown from '@stream-kit/ui/dropdown';
	import { InputText } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { getOverlayFrameworkIcon } from '$lib/core/overlay';
	import type { OverlayManifest } from '$lib/core/overlay/overlay-manifest';
	import {
		disabledRequiredPlugins,
		missingRequiredPlugins
	} from '$lib/core/overlay/overlay-dependencies';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import {
		overlayNeedsAttention,
		overlayNeedsBuild,
		overlayStatusDotClasses,
		overlayStatusLabels,
		resolveOverlayStatus
	} from './overlay-status';

	type Props = {
		overlay: SaveOverlayInput;
	};

	let { overlay }: Props = $props();

	const { t } = useI18n();

	let nameDraft = $state('');
	let isEditingName = $state(false);
	let isSavingName = $state(false);
	let openingEditor = $state(false);
	let openingFolder = $state(false);
	let exporting = $state(false);
	let menuOpen = $state(false);

	const nameInputId = useId();

	const framework = $derived(overlay.template as OverlayFrameworkId);
	const needsBuild = $derived(overlayNeedsBuild(overlay));
	const detailPath = $derived(`/overlays/${overlay.id}`);
	const status = $derived(resolveOverlayStatus(overlay));
	const needsAttention = $derived(overlayNeedsAttention(status));
	const isNew = $derived(app.overlay.isNew(overlay.id));
	const isOpening = $derived(openingEditor || openingFolder);

	const revealIfNew: Attachment<HTMLElement> = (element) => {
		if (!isNew || scrolledIntoView.has(overlay.id)) {
			return;
		}

		scrolledIntoView.add(overlay.id);
		requestAnimationFrame(() => {
			element.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	};
	const browserSourceUrl = $derived(app.overlay.getUrl(overlay.id));
	const cloudUrl = $derived(app.overlay.getCloudUrl(overlay.id));
	const isCloudPublished = $derived(app.overlay.isCloudPublished(overlay.id));
	const isBuilding = $derived(app.overlay.buildingId === overlay.id);
	const dependencyManifest = $derived({
		requiredPlugins: overlay.requiredPlugins ?? []
	} as OverlayManifest);
	const overlayUnavailableReason = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return app.overlay.getOverlayUnavailableReason(overlay.requiredPlugins ?? []);
	});
	const missingPlugins = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return missingRequiredPlugins(dependencyManifest, app);
	});
	const disabledPlugins = $derived.by(() => {
		void app.overlay.dependenciesRevision;

		return disabledRequiredPlugins(dependencyManifest, app);
	});
	const unavailablePlugins = $derived(new Set([...missingPlugins, ...disabledPlugins]));

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

	function markSeen(): void {
		app.overlay.markSeen(overlay.id);
	}

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
			menuOpen = false;
		}
	}

	async function openFolder(): Promise<void> {
		openingFolder = true;

		try {
			await app.overlay.openProjectFolder(overlay.id);
		} catch (error) {
			app.toast.create({
				title: t('Could not open folder'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			openingFolder = false;
			menuOpen = false;
		}
	}

	function keepMenuOpenWhileOpening(event: Event): void {
		if (isOpening) {
			event.preventDefault();
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

<div
	class={cn(
		'group/card relative flex h-full flex-col transition-colors',
		isNew
			? 'bg-primary/8 hover:bg-primary/12'
			: 'hover:bg-dark-700/40'
	)}
	{@attach revealIfNew}
>
	{#if isNew}
		<span
			class="pointer-events-none absolute inset-0 ring-2 ring-primary ring-inset"
			aria-hidden="true"
		></span>
	{/if}
	<div class="flex flex-1 flex-col gap-4 p-5">
		<div class="flex items-start gap-3">
			<a
				href={detailPath}
				onclick={markSeen}
				class="relative flex size-10 shrink-0 items-center justify-center rounded-md border border-rule text-primary"
				aria-hidden="true"
				tabindex="-1"
			>
				<Icon icon={getOverlayFrameworkIcon(framework)} class="size-5" />
				{#if needsAttention}
					<span
						class={cn(
							'absolute -top-1 -right-1 size-2.5 rounded-full ring-2 ring-background',
							overlayStatusDotClasses[status]
						)}
					></span>
				{/if}
			</a>

			<div class="min-w-0 flex-1">
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
					<div class="flex min-w-0 items-center gap-2">
						<a
							href={detailPath}
							onclick={markSeen}
							class="min-w-0 truncate text-base font-semibold text-dark-50 transition-colors hover:text-primary"
						>
							{overlay.name}
						</a>
						{#if isNew}
							<Badge size="sm" class="shrink-0 gap-1.5 border-primary/40 bg-primary/25 font-semibold">
								<span class="size-1.5 rounded-full bg-primary"></span>
								{t('New')}
							</Badge>
						{/if}
					</div>
				{/if}
				<p class="mt-1 flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-dark-400">
					<span class="truncate">{overlay.template}</span>
					{#if overlay.expectedEvents.length > 0}
						<span class="text-rule-strong">/</span>
						<span class="shrink-0">
							{t('{count} events', { count: overlay.expectedEvents.length })}
						</span>
					{/if}
					{#if isCloudPublished}
						<span class="text-rule-strong">/</span>
						<span class="inline-flex shrink-0 items-center gap-0.5 text-primary">
							<Icon icon="ri:cloud-line" class="size-3" />
							{t('Cloud')}
						</span>
					{/if}
				</p>
			</div>

			<Dropdown.Root bind:open={menuOpen}>
				{#snippet trigger({ props })}
					<Button
						{...props}
						variant="ghost"
						size="icon-sm"
						icon="ri:more-2-fill"
						class="-mt-1 -mr-2 shrink-0 text-dark-400 hover:text-dark-50"
						aria-label={t('More actions')}
					/>
				{/snippet}
				<Dropdown.Content
					align="end"
					class="min-w-48"
					onInteractOutside={keepMenuOpenWhileOpening}
					onEscapeKeydown={keepMenuOpenWhileOpening}
				>
					<Dropdown.Item
						class="flex items-center gap-2"
						disabled={isOpening}
						onclick={() => void startEditingName()}
					>
						<Icon icon="ri:pencil-line" class="size-4" />
						{t('Rename overlay')}
					</Dropdown.Item>
					<Dropdown.Item
						class="flex items-center gap-2"
						closeOnSelect={false}
						disabled={isOpening}
						onclick={() => void openInEditor()}
					>
						<Icon
							icon={openingEditor ? 'ri:loader-4-line' : 'ri:code-box-line'}
							class={cn('size-4', openingEditor && 'animate-spin')}
						/>
						{t('Open in editor')}
					</Dropdown.Item>
					<Dropdown.Item
						class="flex items-center gap-2"
						closeOnSelect={false}
						disabled={isOpening}
						onclick={() => void openFolder()}
					>
						<Icon
							icon={openingFolder ? 'ri:loader-4-line' : 'ri:folder-open-line'}
							class={cn('size-4', openingFolder && 'animate-spin')}
						/>
						{t('Open folder')}
					</Dropdown.Item>
					<Dropdown.Item
						class="flex items-center gap-2"
						disabled={exporting || isOpening}
						onclick={() => void downloadZip()}
					>
						<Icon icon="ri:download-2-line" class="size-4" />
						{t('Download ZIP')}
					</Dropdown.Item>
					<Dropdown.Item
						class="flex items-center gap-2 text-destructive-100"
						disabled={isOpening}
						onclick={() => void deleteOverlay()}
					>
						<Icon icon="ri:delete-bin-line" class="size-4" />
						{t('Delete')}
					</Dropdown.Item>
				</Dropdown.Content>
			</Dropdown.Root>
		</div>

		<div class="flex flex-col gap-1.5">
			<p class="font-mono text-[10px] tracking-[0.14em] text-dark-400 uppercase">
				{isCloudPublished && cloudUrl ? t('Cloud browser source') : t('Browser source URL')}
			</p>
			<div class="min-w-0 [&_input]:font-mono [&_input]:text-[11px] [&_input]:leading-5">
				<InputText
					copyable
					readonly
					size="xs"
					aria-label={t('Browser source URL')}
					value={isCloudPublished && cloudUrl ? cloudUrl : browserSourceUrl}
					copyLabel={t('Copy URL')}
					copiedLabel={t('Copied')}
				/>
			</div>
		</div>

		{#if (overlay.requiredPlugins ?? []).length > 0}
			<div class="mt-auto flex flex-wrap items-center gap-1">
				<span class="mr-0.5 font-mono text-[10px] tracking-[0.14em] text-dark-400 uppercase">
					{t('Requires')}
				</span>
				{#each overlay.requiredPlugins ?? [] as pluginKey (pluginKey)}
					<span
						class={cn(
							'rounded-md border px-1.5 py-px font-mono text-[11px]',
							unavailablePlugins.has(pluginKey)
								? 'border-destructive-200/40 text-destructive-100'
								: 'border-rule text-dark-200'
						)}
					>
						{app.plugins.find(pluginKey)?.name ?? pluginKey}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="flex h-12 items-center gap-1 border-t border-rule pr-2 pl-5">
		<span
			class={cn(
				'flex min-w-0 flex-1 items-center gap-2 text-xs',
				status === 'not-built' && 'font-medium text-warning-100',
				status === 'unavailable' && 'font-medium text-destructive-100',
				!needsAttention && 'text-dark-200'
			)}
			title={overlayUnavailableReason ?? undefined}
		>
			{#if needsAttention}
				<Icon icon="ri:error-warning-line" class="size-4 shrink-0" />
			{:else}
				<span class={cn('size-1.5 shrink-0 rounded-full', overlayStatusDotClasses[status])}
				></span>
			{/if}
			<span class="truncate">{t(overlayStatusLabels[status])}</span>
		</span>

		{#if status === 'not-built'}
			<Button
				size="sm"
				icon="ri:hammer-line"
				disabled={isBuilding}
				isLoading={isBuilding}
				onclick={() => void buildOverlay()}
			>
				{t('Build')}
			</Button>
		{:else if needsBuild}
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:hammer-line"
				class="text-dark-400 hover:text-dark-50"
				aria-label={t('Rebuild')}
				disabled={isBuilding}
				isLoading={isBuilding}
				onclick={() => void buildOverlay()}
				{@attach tooltip(() => t('Rebuild'))}
			/>
		{/if}
		<Button
			variant="ghost"
			size="sm"
			href={detailPath}
			onclick={markSeen}
			icon="ri:arrow-right-s-line"
			iconPosition="end"
			class="text-dark-200 hover:text-dark-50"
		>
			{t('Configure')}
		</Button>
	</div>
</div>
