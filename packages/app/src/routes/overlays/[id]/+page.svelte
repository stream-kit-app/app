<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onDestroy } from 'svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCode } from '@stream-kit/ui/input';

	import { buildOverlayLspWorkspace } from '$lib/codemirror/overlay-lsp-workspace';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	const { t } = useI18n();

	const AUTOSAVE_DELAY_MS = 700;

	type EditorTab = 'app' | 'context';
	type SaveStatus = 'loading' | 'saved' | 'pending' | 'saving' | 'building' | 'error';

	let appSource = $state('');
	let contextJson = $state('{}');
	let loadedOverlayId = $state('');
	let loaded = $state(false);
	let activeTab: EditorTab = $state('app');
	let saveStatus = $state<SaveStatus>('loading');
	let contextError = $state<string | null>(null);
	let saveError = $state<string | null>(null);
	let previewRevision = $state(Date.now());
	let autosaveTimer: ReturnType<typeof setTimeout> | undefined = $state();
	let lastSavedAppSource = '';
	let lastSavedContextJson = '{}';

	const overlayId = $derived(page.params.id ?? '');
	const overlay = $derived(app.overlay.items.find((item) => item.id === overlayId));
	const overlayLsp = $derived(buildOverlayLspWorkspace(appSource));
	const previewUrl = $derived(`${app.overlay.getUrl(overlayId)}?v=${previewRevision}`);
	const previewAspectRatio = $derived(
		overlay ? `${overlay.width} / ${overlay.height}` : '16 / 9'
	);
	const hasBuildError = $derived(Boolean(app.overlay.lastBuildError));
	const statusVariant = $derived(
		saveStatus === 'error' || hasBuildError
			? 'destructive'
			: saveStatus === 'building' || saveStatus === 'saving' || saveStatus === 'pending'
				? 'warning'
				: 'success'
	);
	const statusLabel = $derived.by(() => {
		if (contextError) {
			return t('Invalid context JSON');
		}

		if (hasBuildError) {
			return t('Build failed');
		}

		if (saveStatus === 'loading') {
			return t('Loading…');
		}

		if (saveStatus === 'pending') {
			return t('Unsaved changes');
		}

		if (saveStatus === 'saving') {
			return t('Saving…');
		}

		if (saveStatus === 'building') {
			return t('Building…');
		}

		return t('Saved');
	});

	$effect(() => {
		if (!overlayId || loadedOverlayId === overlayId) {
			return;
		}

		clearAutosaveTimer();
		loaded = false;
		loadedOverlayId = overlayId;
		saveStatus = 'loading';
		saveError = null;
		contextError = null;

		void loadOverlaySource(overlayId);
	});

	onDestroy(clearAutosaveTimer);

	async function loadOverlaySource(id: string): Promise<void> {
		const files = await import('$lib/core/overlay/overlay-project').then((module) =>
			module.readOverlaySourceFiles(id)
		);
		const appFile = files.find((file) => file.path === 'src/App.svelte');
		const currentOverlay = app.overlay.items.find((item) => item.id === id);

		appSource = appFile?.content ?? '';
		contextJson = JSON.stringify(currentOverlay?.config ?? {}, null, 2);
		lastSavedAppSource = appSource;
		lastSavedContextJson = contextJson;
		loaded = true;
		saveStatus = 'saved';
		previewRevision = Date.now();
	}

	function clearAutosaveTimer(): void {
		if (!autosaveTimer) {
			return;
		}

		clearTimeout(autosaveTimer);
		autosaveTimer = undefined;
	}

	function scheduleAutosave(): void {
		if (!loaded || !overlay) {
			return;
		}

		clearAutosaveTimer();
		saveStatus = 'pending';
		saveError = null;
		autosaveTimer = setTimeout(() => {
			autosaveTimer = undefined;
			void saveAndBuild();
		}, AUTOSAVE_DELAY_MS);
	}

	async function saveAndBuild(): Promise<void> {
		if (!overlay || !overlayId) {
			return;
		}

		let parsedConfig: Record<string, unknown>;

		try {
			parsedConfig = JSON.parse(contextJson) as Record<string, unknown>;
			contextError = null;
		} catch {
			contextError = t('Invalid context JSON');
			saveStatus = 'error';
			return;
		}

		const sourceChanged = appSource !== lastSavedAppSource;
		const contextChanged = contextJson !== lastSavedContextJson;

		if (!sourceChanged && !contextChanged) {
			saveStatus = 'saved';
			return;
		}

		saveStatus = 'saving';
		saveError = null;

		try {
			if (sourceChanged) {
				await app.overlay.saveSourceFile(overlayId, 'src/App.svelte', appSource);
				lastSavedAppSource = appSource;
			}

			if (contextChanged) {
				await app.overlay.saveMetadata({
					...overlay,
					config: parsedConfig
				});
				lastSavedContextJson = contextJson;
			}

			saveStatus = 'building';
			const result = await app.overlay.build(overlayId);

			if (!result.success) {
				saveStatus = 'error';
				saveError = result.error ?? t('Overlay build failed');
				return;
			}

			previewRevision = Date.now();
			saveStatus = 'saved';
		} catch (error) {
			saveStatus = 'error';
			saveError = error instanceof Error ? error.message : String(error);
		}
	}

	async function copyUrl(): Promise<void> {
		if (!overlayId) {
			return;
		}

		await navigator.clipboard.writeText(app.overlay.getUrl(overlayId));
		app.toast.create({
			title: t('Copied browser source URL'),
			variant: 'success'
		});
	}
</script>

<Container class="flex h-full min-h-0 flex-col px-6 py-6" size="full">
	{#if !overlay}
		<div class="rounded-lg border border-dark-600 bg-dark-800 p-6 text-dark-100">
			<p>{t('Overlay not found.')}</p>
			<Button class="mt-4" variant="secondary" onclick={() => goto('/overlays')}>
				{t('Back to overlays')}
			</Button>
		</div>
	{:else}
		<div class="flex min-h-0 flex-1 flex-col gap-4">
			<header class="flex flex-wrap items-center justify-between gap-4">
				<div class="min-w-0">
					<div class="flex flex-wrap items-center gap-3">
						<Heading level="1" class="text-3xl">{overlay.name}</Heading>
						<Badge variant={statusVariant}>{statusLabel}</Badge>
					</div>
					<p class="mt-2 font-mono text-xs break-all text-dark-100">
						{app.overlay.getUrl(overlay.id)}
					</p>
				</div>
				<div class="flex flex-wrap items-center gap-2">
					{#if app.overlay.status.running}
						<Badge variant="success">{t('Live')}</Badge>
					{:else}
						<Badge variant="warning">{t('Overlay server is stopped')}</Badge>
					{/if}
					<Button variant="outline" onclick={() => goto('/overlays')}>
						{t('Back to overlays')}
					</Button>
					<Button variant="secondary" onclick={copyUrl}>{t('Copy URL')}</Button>
				</div>
			</header>

			<div class="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(25rem,42%)]">
				<section
					class="flex min-h-[34rem] flex-col overflow-hidden rounded-lg border border-dark-600 bg-dark-800"
				>
					<div
						class="flex items-center justify-between border-b border-dark-600 bg-dark-900/60 px-3 py-2"
					>
						<div class="flex gap-1">
							<button
								type="button"
								class={cn(
									'rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors',
									activeTab === 'app'
										? 'bg-primary/15 text-primary'
										: 'text-dark-100 hover:bg-dark-700 hover:text-white'
								)}
								onclick={() => (activeTab = 'app')}
							>
								{t('App.svelte')}
							</button>
							<button
								type="button"
								class={cn(
									'rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors',
									activeTab === 'context'
										? 'bg-primary/15 text-primary'
										: 'text-dark-100 hover:bg-dark-700 hover:text-white'
								)}
								onclick={() => (activeTab = 'context')}
							>
								{t('context.json')}
							</button>
						</div>
						<span class="text-xs text-dark-200">{overlay.width}x{overlay.height}</span>
					</div>

					<div class="min-h-0 flex-1">
						{#if loaded}
							{#if activeTab === 'app'}
								{#key `${overlayId}-app`}
									<InputCode
										language="svelte"
										value={appSource}
										minHeight="100%"
										class="h-full rounded-none border-0 focus-within:ring-0"
										languageServer={overlayLsp}
										oninput={(event) => {
											appSource = event.currentTarget.value;
											scheduleAutosave();
										}}
									/>
								{/key}
							{:else}
								{#key `${overlayId}-context`}
									<InputCode
										language="json"
										value={contextJson}
										minHeight="100%"
										class="h-full rounded-none border-0 focus-within:ring-0"
										error={contextError ?? undefined}
										oninput={(event) => {
											contextJson = event.currentTarget.value;
											contextError = null;
											scheduleAutosave();
										}}
									/>
								{/key}
							{/if}
						{/if}
					</div>
				</section>

				<section
					class="flex min-h-[34rem] flex-col overflow-hidden rounded-lg border border-dark-600 bg-dark-800"
				>
					<div
						class="flex flex-wrap items-center justify-between gap-3 border-b border-dark-600 bg-dark-900/60 px-3 py-2"
					>
						<div>
							<p class="text-sm font-semibold text-white">{t('Preview')}</p>
							<p class="mt-0.5 text-xs text-dark-200">
								{t('Template')}: {overlay.template}
							</p>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each overlay.expectedEvents as event (event)}
								<Badge variant="outline">{event}</Badge>
							{/each}
							{#if overlay.expectedEvents.length === 0}
								<Badge variant="ghost">{t('No events')}</Badge>
							{/if}
						</div>
					</div>

					<div class="flex min-h-0 flex-1 items-center justify-center bg-dark-950 p-4">
						<div
							class="w-full overflow-hidden rounded-lg border border-dark-600 bg-black shadow-sm"
							style:aspect-ratio={previewAspectRatio}
						>
							<iframe
								title={t('Overlay preview')}
								src={previewUrl}
								class="h-full w-full bg-transparent"
							></iframe>
						</div>
					</div>

					{#if saveError || app.overlay.lastBuildError}
						<p
							class="border-t border-destructive-500/40 bg-destructive-900/40 p-3 text-sm text-destructive-50"
						>
							{saveError ?? app.overlay.lastBuildError}
						</p>
					{/if}
				</section>
			</div>
		</div>
	{/if}
</Container>
