<script lang="ts">
	import type { OverlayFrameworkId } from '$lib/core/overlay';

	import Icon from '@iconify/svelte';

	import { goto } from '$app/navigation';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';

	import { app } from '$lib/core';
	import { getOverlayFrameworkIcon } from '$lib/core/overlay';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	const { t } = useI18n();

	const COPY_FEEDBACK_MS = 2000;

	let openingEditorId = $state<string | null>(null);
	let exportingId = $state<string | null>(null);
	let buildingId = $state<string | null>(null);
	let copiedUrlId = $state<string | null>(null);
	let copyFeedbackTimer: ReturnType<typeof setTimeout> | undefined;

	function needsBuild(framework: OverlayFrameworkId): boolean {
		return framework !== 'vanilla';
	}

	async function copyUrl(overlayId: string): Promise<void> {
		await navigator.clipboard.writeText(app.overlay.getUrl(overlayId));

		if (copyFeedbackTimer) {
			clearTimeout(copyFeedbackTimer);
		}

		copiedUrlId = overlayId;
		copyFeedbackTimer = setTimeout(() => {
			if (copiedUrlId === overlayId) {
				copiedUrlId = null;
			}
		}, COPY_FEEDBACK_MS);
	}

	async function openInEditor(overlayId: string): Promise<void> {
		openingEditorId = overlayId;

		try {
			const result = await app.overlay.openInExternalEditor(overlayId);

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
			openingEditorId = null;
		}
	}

	async function openFolder(overlayId: string): Promise<void> {
		try {
			await app.overlay.openProjectFolder(overlayId);
		} catch (error) {
			app.toast.create({
				title: t('Could not open folder'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		}
	}

	async function downloadZip(overlayId: string, name: string): Promise<void> {
		exportingId = overlayId;

		try {
			await app.overlay.exportZip(overlayId, name);
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
			exportingId = null;
		}
	}

	async function buildOverlay(overlayId: string): Promise<void> {
		buildingId = overlayId;

		try {
			const result = await app.overlay.build(overlayId);

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
		} finally {
			buildingId = null;
		}
	}
</script>

<Container class="px-6 py-6" size="md">
	<div class="flex flex-col gap-6">
		<header class="flex flex-wrap items-start justify-between gap-4">
			<Heading level="1" subTitle={t('Build browser source overlays for OBS')}>
				{t('Overlays')}
			</Heading>
			<div class="flex flex-wrap items-center gap-2">
				{#if app.overlay.status.running}
					<Button
						variant="outline"
						icon="ri:stop-circle-line"
						onclick={() => app.overlay.stopServer()}
					>
						{t('Stop server')}
					</Button>
				{:else}
					<Button
						variant="outline"
						icon="ri:play-circle-line"
						onclick={() => app.overlay.startServer()}
					>
						{t('Start server')}
					</Button>
				{/if}
				<Button icon="ri:add-line" onclick={() => goto('/overlays/new')}>
					{t('New overlay')}
				</Button>
			</div>
		</header>

		<div
			class="flex flex-wrap items-center gap-3 rounded-xl border border-dark-600 bg-dark-800 px-4 py-3"
		>
			<span class="relative flex h-2.5 w-2.5 shrink-0">
				{#if app.overlay.status.running}
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60"
					></span>
					<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-success"></span>
				{:else}
					<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-dark-400"></span>
				{/if}
			</span>
			{#if app.overlay.status.running}
				<span class="text-sm font-medium text-dark-50">{t('Server running')}</span>
				<span class="font-mono text-xs break-all text-dark-200"
					>{app.overlay.status.baseUrl}</span
				>
			{:else}
				<span class="text-sm font-medium text-dark-100">
					{t('Overlay server is stopped')}
				</span>
			{/if}
		</div>

		{#if app.overlay.items.length === 0}
			<div
				class="relative flex flex-col items-center gap-4 overflow-hidden rounded-xl border border-dashed border-dark-600 bg-dark-800/60 px-6 py-14 text-center"
			>
				<div class="boot-ambient pointer-events-none opacity-40"></div>
				<div
					class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-dark-700 text-primary"
				>
					<Icon icon="ri:layout-masonry-line" class="size-7" />
				</div>
				<div class="relative max-w-md">
					<h2 class="text-lg font-semibold text-dark-50">{t('No overlays yet')}</h2>
					<p class="mt-1 text-sm text-dark-200">
						{t('Create one to get a browser source URL for OBS.')}
					</p>
				</div>
				<Button class="relative" icon="ri:add-line" onclick={() => goto('/overlays/new')}>
					{t('New overlay')}
				</Button>
			</div>
		{:else}
			<div class="grid gap-4">
				{#each app.overlay.items as overlay (overlay.id)}
					<article
						class="group rounded-xl border border-dark-600 bg-dark-800 p-4 transition-colors hover:border-dark-500"
					>
						<div class="flex flex-wrap items-start justify-between gap-4">
							<div class="flex min-w-0 flex-1 items-start gap-3">
								<div
									class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
								>
									<Icon
										icon={getOverlayFrameworkIcon(
											overlay.template as OverlayFrameworkId
										)}
										class="size-5"
									/>
								</div>
								<div class="min-w-0 flex-1">
									<h2 class="truncate text-base font-semibold text-white">
										{overlay.name}
									</h2>
									<div class="mt-1.5 flex flex-wrap items-center gap-1.5">
										<Badge variant="default">{overlay.template}</Badge>
										{#if app.overlay.isBuilt(overlay.id)}
											<Badge variant="success">{t('Ready')}</Badge>
										{:else}
											<Badge variant="warning">{t('Not built')}</Badge>
										{/if}
										{#if overlay.expectedEvents.length > 0}
											<Badge variant="ghost">
												<Icon icon="ri:flashlight-line" />
												{t('{count} events', {
													count: overlay.expectedEvents.length
												})}
											</Badge>
										{/if}
									</div>
								</div>
							</div>
							<div class="flex flex-wrap gap-2">
								<Button
									size="sm"
									variant="secondary"
									icon="ri:code-box-line"
									disabled={openingEditorId === overlay.id}
									isLoading={openingEditorId === overlay.id}
									onclick={() => openInEditor(overlay.id)}
								>
									{t('Open in editor')}
								</Button>
								<Button
									size="sm"
									variant="outline"
									icon="ri:folder-open-line"
									onclick={() => openFolder(overlay.id)}
								>
									{t('Open folder')}
								</Button>
								{#if needsBuild(overlay.template as OverlayFrameworkId)}
									<Button
										size="sm"
										variant="outline"
										icon="ri:hammer-line"
										disabled={buildingId === overlay.id}
										isLoading={buildingId === overlay.id}
										onclick={() => buildOverlay(overlay.id)}
									>
										{t('Build')}
									</Button>
								{/if}
								<Button
									size="sm"
									variant="outline"
									icon="ri:download-2-line"
									disabled={exportingId === overlay.id}
									isLoading={exportingId === overlay.id}
									onclick={() => downloadZip(overlay.id, overlay.name)}
								>
									{t('Download ZIP')}
								</Button>
								<Button
									size="sm"
									variant="destructive"
									icon="ri:delete-bin-line"
									onclick={async () => {
										await app.overlay.remove(overlay.id);
									}}
								>
									{t('Delete')}
								</Button>
							</div>
						</div>

						<div
							class="mt-3 flex items-center gap-2 rounded-lg border border-dark-700 bg-dark-900/60 px-3 py-2"
						>
							<Icon icon="ri:link" class="size-4 shrink-0 text-dark-300" />
							<span class="min-w-0 flex-1 truncate font-mono text-xs text-dark-100">
								{app.overlay.getUrl(overlay.id)}
							</span>
							<button
								type="button"
								class={cn(
									'shrink-0 rounded-md p-1 transition-colors',
									copiedUrlId === overlay.id
										? 'text-success'
										: 'text-dark-300 hover:bg-dark-700 hover:text-white'
								)}
								aria-label={copiedUrlId === overlay.id ? t('Copied') : t('Copy URL')}
								onclick={() => copyUrl(overlay.id)}
							>
								<Icon
									icon={copiedUrlId === overlay.id
										? 'ri:checkbox-circle-fill'
										: 'ri:file-copy-line'}
									class="size-4"
								/>
							</button>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</Container>
