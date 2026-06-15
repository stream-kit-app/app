<script lang="ts">
	import type { EditorView, LanguageServerConnection } from '@stream-kit/ui/codemirror';
	import type { OverlayProjectFile } from '$lib/core/overlay/types';

	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Pane, PaneGroup, PaneResizer } from 'paneforge';
	import { onDestroy, tick } from 'svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { createLanguageServerConnection, formatEditorDocument, openEditorSearch } from '@stream-kit/ui/codemirror';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCode } from '@stream-kit/ui/input';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';

	import {
		buildOverlayLspWorkspace,
		toWorkspaceUri
	} from '$lib/codemirror/overlay-lsp-workspace';
	import { app } from '$lib/core';
	import {
		createTemporaryOverlayPath,
		isOverlayEntryFile,
		isTemporaryOverlayPath,
		normalizeOverlayComponentFileName,
		OVERLAY_ENTRY_PATH,
		overlayFileIcon,
		overlayFileLspLanguageId,
		overlayFileName,
		overlayFileSupportsLsp,
		overlaySourceLanguage,
		overlaySourcePathsMatch,
		sortOverlaySourceFiles,
		toOverlaySourcePath,
		validateOverlayFileName
	} from '$lib/core/overlay/overlay-source-file';
	import {
		appendOverlayPreviewConsoleEntry,
		formatOverlayPreviewConsoleTime,
		isOverlayPreviewConsoleOrigin,
		overlayPreviewConsoleLevelClass,
		parseOverlayPreviewConsoleMessage,
		type OverlayPreviewConsoleEntry
	} from '$lib/core/overlay/overlay-preview-console';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	const { t } = useI18n();

	const AUTOSAVE_DELAY_MS = 700;
	const OVERLAY_LSP_SYNC_DELAY_MS = 450;

	type SaveStatus = 'loading' | 'saved' | 'pending' | 'saving' | 'building' | 'error';

	let sourceFiles = $state<OverlayProjectFile[]>([]);
	let activePath = $state(OVERLAY_ENTRY_PATH);
	let pendingFileNames = $state<Record<string, string>>({});
	let fileNameErrors = $state<Record<string, string | null>>({});
	let loadedOverlayId = $state('');
	let loaded = $state(false);
	let saveStatus = $state<SaveStatus>('loading');
	let saveError = $state<string | null>(null);
	let previewRevision = $state(Date.now());
	let autosaveTimer: ReturnType<typeof setTimeout> | undefined;
	let lspSyncTimer: ReturnType<typeof setTimeout> | undefined;
	let lastSavedContents = $state<Record<string, string>>({});
	let overlayLspSession = $state<LanguageServerConnection | null>(null);
	let lspLoading = $state(false);
	let previewConsoleLogs = $state<OverlayPreviewConsoleEntry[]>([]);
	let exporting = $state(false);
	let editorViews = $state<Record<string, EditorView | null>>({});

	const overlayId = $derived(page.params.id ?? '');
	const overlay = $derived(app.overlay.items.find((item) => item.id === overlayId));
	const tabSourceFiles = $derived.by(() => {
		const persistent = sortOverlaySourceFiles(
			sourceFiles.filter((file) => !isTemporaryOverlayPath(file.path))
		);
		const pending = sourceFiles.filter((file) => isTemporaryOverlayPath(file.path));

		return [...persistent, ...pending];
	});
	const lspSourceFiles = $derived(
		sourceFiles.filter((file) => !isTemporaryOverlayPath(file.path))
	);
	const previewUrl = $derived(`${app.overlay.getUrl(overlayId)}?v=${previewRevision}`);
	const previewAspectRatio = $derived(
		overlay ? `${overlay.width} / ${overlay.height}` : '16 / 9'
	);
	const activeEditorView = $derived(editorViews[activePath] ?? null);
	const activeFileSupportsLsp = $derived(
		!isTemporaryOverlayPath(activePath) && overlayFileSupportsLsp(activePath)
	);
	const hasBuildError = $derived(Boolean(app.overlay.lastBuildError));
	const previewConsoleError = $derived(saveError ?? app.overlay.lastBuildError);
	const statusVariant = $derived(
		saveStatus === 'error' || hasBuildError
			? 'destructive'
			: saveStatus === 'building' || saveStatus === 'saving' || saveStatus === 'pending'
				? 'warning'
				: 'success'
	);
	const statusLabel = $derived.by(() => {
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

	function editorLanguage(path: string): 'svelte' | 'typescript' | 'json' {
		if (isTemporaryOverlayPath(path)) {
			const pendingName = pendingFileNames[path]?.trim() ?? '';

			if (pendingName.endsWith('.json')) {
				return 'json';
			}

			if (pendingName.endsWith('.svelte')) {
				return 'svelte';
			}

			return 'typescript';
		}

		return overlaySourceLanguage(path);
	}

	function handleEditorReady(path: string, view: EditorView | null): void {
		editorViews = { ...editorViews, [path]: view };
	}

	function openActiveEditorSearch(): void {
		if (!activeEditorView) {
			return;
		}

		openEditorSearch(activeEditorView);
		activeEditorView.focus();
	}

	function formatActiveEditorDocument(): void {
		if (!activeEditorView) {
			return;
		}

		formatEditorDocument(activeEditorView);
	}

	function defaultContentFor(fileName: string): string {
		if (fileName.endsWith('.json')) {
			return '{\n}\n';
		}

		if (fileName.endsWith('.svelte')) {
			return '<script lang="ts"></' + 'script>\n';
		}

		return '';
	}

	function clearLspSyncTimer(): void {
		if (!lspSyncTimer) {
			return;
		}

		clearTimeout(lspSyncTimer);
		lspSyncTimer = undefined;
	}

	function updateFileContent(path: string, content: string): void {
		sourceFiles = sourceFiles.map((file) => (file.path === path ? { ...file, content } : file));
		scheduleAutosave();
	}

	$effect(() => {
		if (!overlayId || loadedOverlayId === overlayId) {
			return;
		}

		clearAutosaveTimer();
		clearLspSyncTimer();
		overlayLspSession?.destroy();
		overlayLspSession = null;
		lspLoading = true;
		loaded = false;
		loadedOverlayId = overlayId;
		activePath = OVERLAY_ENTRY_PATH;
		pendingFileNames = {};
		fileNameErrors = {};
		saveStatus = 'loading';
		saveError = null;

		void loadOverlaySource(overlayId);
	});

	onDestroy(() => {
		clearAutosaveTimer();
		clearLspSyncTimer();
		overlayLspSession?.destroy();
		overlayLspSession = null;
	});

	$effect(() => {
		if (!loaded || !overlayLspSession) {
			return;
		}

		const workspace = buildOverlayLspWorkspace(lspSourceFiles, OVERLAY_ENTRY_PATH).workspace;

		clearLspSyncTimer();
		lspSyncTimer = setTimeout(() => {
			lspSyncTimer = undefined;
			void overlayLspSession?.updateWorkspace(workspace);
		}, OVERLAY_LSP_SYNC_DELAY_MS);

		return () => {
			clearLspSyncTimer();
		};
	});

	$effect(() => {
		previewRevision;
		previewConsoleLogs = [];
	});

	$effect(() => {
		if (!overlayId) {
			return;
		}

		const overlayUrl = app.overlay.getUrl(overlayId);

		function handlePreviewConsoleMessage(event: MessageEvent): void {
			if (!isOverlayPreviewConsoleOrigin(event, overlayUrl)) {
				return;
			}

			const message = parseOverlayPreviewConsoleMessage(event.data);

			if (!message) {
				return;
			}

			previewConsoleLogs = appendOverlayPreviewConsoleEntry(previewConsoleLogs, message);
		}

		window.addEventListener('message', handlePreviewConsoleMessage);

		return () => {
			window.removeEventListener('message', handlePreviewConsoleMessage);
		};
	});

	async function loadOverlaySource(id: string): Promise<void> {
		lspLoading = true;

		try {
			const { readOverlaySourceFiles, renameOverlaySourceFile } =
				await import('$lib/core/overlay/overlay-project');
			const files = await readOverlaySourceFiles(id);
			const normalizedFiles: OverlayProjectFile[] = [];

			for (const file of files) {
				const fileName = overlayFileName(file.path);
				const normalizedName = normalizeOverlayComponentFileName(fileName);

				if (fileName === normalizedName) {
					normalizedFiles.push(file);
					continue;
				}

				const newPath = toOverlaySourcePath(normalizedName);

				if (normalizedFiles.some((entry) => overlaySourcePathsMatch(entry.path, newPath))) {
					normalizedFiles.push(file);
					continue;
				}

				await renameOverlaySourceFile(id, file.path, newPath);
				normalizedFiles.push({ path: newPath, content: file.content });
			}

			sourceFiles = sortOverlaySourceFiles(normalizedFiles);
			lastSavedContents = Object.fromEntries(
				normalizedFiles.map((file) => [file.path, file.content])
			);
			activePath = normalizedFiles.some((file) => file.path === OVERLAY_ENTRY_PATH)
				? OVERLAY_ENTRY_PATH
				: (normalizedFiles[0]?.path ?? OVERLAY_ENTRY_PATH);

			overlayLspSession?.destroy();
			overlayLspSession = await createLanguageServerConnection(
				buildOverlayLspWorkspace(normalizedFiles, OVERLAY_ENTRY_PATH),
				{ shared: true }
			);

			loaded = true;
			saveStatus = 'saved';
			previewRevision = Date.now();
		} finally {
			lspLoading = false;
		}
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

	async function saveAndBuild(options: { force?: boolean } = {}): Promise<void> {
		if (!overlay || !overlayId) {
			return;
		}

		const persistentFiles = sourceFiles.filter((file) => !isTemporaryOverlayPath(file.path));
		const changedFiles = persistentFiles.filter(
			(file) => file.content !== (lastSavedContents[file.path] ?? '')
		);

		if (!options.force && changedFiles.length === 0) {
			saveStatus = 'saved';
			return;
		}

		saveStatus = 'saving';
		saveError = null;

		try {
			for (const file of changedFiles) {
				await app.overlay.saveSourceFile(overlayId, file.path, file.content);
				lastSavedContents[file.path] = file.content;
			}

			saveStatus = 'building';
			const result = await app.overlay.build(overlayId, persistentFiles);

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

	async function recreateLspSession(): Promise<void> {
		clearLspSyncTimer();
		lspLoading = true;

		try {
			const previous = overlayLspSession;
			const next = await createLanguageServerConnection(
				buildOverlayLspWorkspace(lspSourceFiles, activePath),
				{ shared: true }
			);

			// Swapping the identity forces the `{#key overlayLspSession}` block to tear down and
			// rebuild every editor against the new worker, so freshly added files are resolved
			// without a manual page reload. Dispose the old worker only after the swap.
			overlayLspSession = next;
			previous?.destroy();
		} finally {
			lspLoading = false;
		}
	}

	async function handleStructuralChange(): Promise<void> {
		if (!loaded || !overlay) {
			return;
		}

		clearAutosaveTimer();
		await recreateLspSession();
		await saveAndBuild({ force: true });
	}

	async function addNewFile(): Promise<void> {
		const tempPath = createTemporaryOverlayPath();

		sourceFiles = [...sourceFiles, { path: tempPath, content: '' }];
		pendingFileNames = { ...pendingFileNames, [tempPath]: '' };
		fileNameErrors = { ...fileNameErrors, [tempPath]: null };
		activePath = tempPath;

		await tick();

		const input = document.querySelector<HTMLInputElement>(
			`[data-overlay-new-file="${CSS.escape(tempPath)}"]`
		);

		input?.focus();
		input?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
	}

	function validatePendingFileName(tempPath: string, rawName: string): string | null {
		const fileName = normalizeOverlayComponentFileName(rawName);
		const validationError = validateOverlayFileName(fileName);

		if (validationError) {
			return t(validationError);
		}

		const normalizedPath = toOverlaySourcePath(fileName);

		if (
			sourceFiles.some(
				(file) =>
					file.path !== tempPath && overlaySourcePathsMatch(file.path, normalizedPath)
			)
		) {
			return t('A file with this name already exists');
		}

		return null;
	}

	async function commitNewFileName(tempPath: string): Promise<void> {
		const rawName = pendingFileNames[tempPath]?.trim() ?? '';

		if (!rawName) {
			cancelNewFile(tempPath);
			return;
		}

		const fileName = normalizeOverlayComponentFileName(rawName);
		const error = validatePendingFileName(tempPath, rawName);

		if (error) {
			fileNameErrors = { ...fileNameErrors, [tempPath]: error };
			return;
		}

		const newPath = toOverlaySourcePath(fileName);
		const existing = sourceFiles.find((file) => file.path === tempPath);
		const content = existing?.content.trim() ? existing.content : defaultContentFor(fileName);

		sourceFiles = sortOverlaySourceFiles(
			sourceFiles.map((file) => (file.path === tempPath ? { path: newPath, content } : file))
		);

		const nextPending = { ...pendingFileNames };
		delete nextPending[tempPath];
		pendingFileNames = nextPending;

		const nextErrors = { ...fileNameErrors };
		delete nextErrors[tempPath];
		fileNameErrors = nextErrors;

		activePath = newPath;

		if (!overlayId) {
			return;
		}

		await app.overlay.saveSourceFile(overlayId, newPath, content);
		lastSavedContents = { ...lastSavedContents, [newPath]: content };
		await handleStructuralChange();
	}

	function cancelNewFile(tempPath: string): void {
		sourceFiles = sourceFiles.filter((file) => file.path !== tempPath);

		const nextPending = { ...pendingFileNames };
		delete nextPending[tempPath];
		pendingFileNames = nextPending;

		const nextErrors = { ...fileNameErrors };
		delete nextErrors[tempPath];
		fileNameErrors = nextErrors;

		if (activePath === tempPath) {
			activePath = OVERLAY_ENTRY_PATH;
		}
	}

	async function deleteFile(path: string): Promise<void> {
		if (isOverlayEntryFile(path) || isTemporaryOverlayPath(path)) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Remove file?'),
			description: t('Are you sure you want to delete "{name}"? This cannot be undone.', {
				name: overlayFileName(path)
			}),
			confirmLabel: t('Delete'),
			cancelLabel: t('Cancel')
		});

		if (!confirmed) {
			return;
		}

		const wasSaved = path in lastSavedContents;

		sourceFiles = sourceFiles.filter((file) => file.path !== path);

		const nextSaved = { ...lastSavedContents };
		delete nextSaved[path];
		lastSavedContents = nextSaved;

		if (activePath === path) {
			activePath = OVERLAY_ENTRY_PATH;
		}

		if (!overlayId || !wasSaved) {
			return;
		}

		await app.overlay.removeSourceFile(overlayId, path);
		await handleStructuralChange();
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

	function refreshPreview(): void {
		previewRevision = Date.now();
	}

	async function downloadProjectZip(): Promise<void> {
		if (!overlay || !overlayId || exporting) {
			return;
		}

		exporting = true;

		try {
			const [{ buildOverlayProjectZip, overlayProjectSlug }, { save }] = await Promise.all([
				import('$lib/core/overlay/overlay-export'),
				import('@tauri-apps/plugin-dialog')
			]);

			const persistentFiles = sourceFiles.filter(
				(file) => !isTemporaryOverlayPath(file.path)
			);
			const bytes = buildOverlayProjectZip({ name: overlay.name, files: persistentFiles });

			const targetPath = await save({
				defaultPath: `${overlayProjectSlug(overlay.name)}.zip`,
				filters: [{ name: t('Zip archive'), extensions: ['zip'] }]
			});

			if (!targetPath) {
				return;
			}

			await app.fs.writeFile(targetPath, bytes);

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
</script>

<Container
	class="flex h-[calc(100dvh-2rem)] max-h-[calc(100dvh-2rem)] min-h-0 flex-col overflow-hidden px-6 py-6"
	size="full"
>
	{#if !overlay}
		<div
			class="flex flex-col items-center gap-4 rounded-xl border border-dashed border-dark-600 bg-dark-800/60 px-6 py-14 text-center"
		>
			<div
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-dark-700 text-dark-200"
			>
				<Icon icon="ri:error-warning-line" class="size-7" />
			</div>
			<p class="text-dark-100">{t('Overlay not found.')}</p>
			<Button variant="secondary" icon="ri:arrow-left-line" onclick={() => goto('/overlays')}>
				{t('Back to overlays')}
			</Button>
		</div>
	{:else}
		<div class="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
			<header class="flex shrink-0 flex-wrap items-start justify-between gap-4">
				<div class="flex min-w-0 items-start gap-3">
					<Button
						class="mt-0.5"
						size="icon"
						variant="outline"
						icon="ri:arrow-left-line"
						aria-label={t('Back to overlays')}
						onclick={() => goto('/overlays')}
					/>
					<div class="min-w-0">
						<div class="flex flex-wrap items-center gap-3">
							<Heading level="1" class="text-3xl">{overlay.name}</Heading>
							<Badge variant={statusVariant}>{statusLabel}</Badge>
							{#if app.overlay.status.running}
								<Badge variant="success">
									<span class="relative flex h-1.5 w-1.5">
										<span
											class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-50 opacity-70"
										></span>
										<span
											class="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-50"
										></span>
									</span>
									{t('Live')}
								</Badge>
							{:else}
								<Badge variant="warning">{t('Overlay server is stopped')}</Badge>
							{/if}
						</div>
						<div
							class="mt-2 flex max-w-xl items-center gap-2 rounded-lg border border-dark-700 bg-dark-900/60 px-3 py-1.5"
						>
							<Icon icon="ri:link" class="size-3.5 shrink-0 text-dark-300" />
							<span class="min-w-0 flex-1 truncate font-mono text-xs text-dark-100">
								{app.overlay.getUrl(overlay.id)}
							</span>
							<button
								type="button"
								class="shrink-0 rounded-md p-1 text-dark-300 transition-colors hover:bg-dark-700 hover:text-white"
								aria-label={t('Copy URL')}
								onclick={copyUrl}
							>
								<Icon icon="ri:file-copy-line" class="size-3.5" />
							</button>
						</div>
					</div>
				</div>
				<Button
					class="mt-0.5 shrink-0"
					variant="outline"
					icon="ri:download-2-line"
					isLoading={exporting}
					disabled={exporting}
					onclick={() => void downloadProjectZip()}
				>
					{t('Download ZIP')}
				</Button>
			</header>

			<div
				class="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-dark-600 bg-dark-800"
			>
				<PaneGroup
					direction="horizontal"
					autoSaveId="stream-kit-overlay-editor"
					class="flex h-full min-h-0 flex-1"
				>
					<Pane defaultSize={58} minSize={30} class="flex h-full min-h-0 min-w-0 flex-col">
						<section class="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-dark-800">
							<div
								class="flex shrink-0 items-center gap-2 overflow-x-auto border-b border-dark-600 bg-dark-900/60 px-1 py-1"
							>
								<div class="flex shrink-0 gap-1 rounded-lg p-0.5">
									{#each tabSourceFiles as file (file.path)}
										<div
											class={cn(
												'group flex shrink-0 items-center gap-1 rounded-md shadow-sm',
												activePath === file.path
													? 'bg-dark-600 text-white'
													: 'bg-dark-800 text-dark-200 hover:bg-dark-700 hover:text-white'
											)}
										>
											{#if isTemporaryOverlayPath(file.path)}
												<div class="flex items-center gap-1 px-2 py-1.5">
													<Icon
														icon="ri:file-add-line"
														class="size-4 shrink-0 text-primary"
													/>
													<input
														type="text"
														data-overlay-new-file={file.path}
														class={cn(
															'w-36 bg-transparent text-sm font-semibold outline-none placeholder:text-dark-400',
															fileNameErrors[file.path] &&
																'text-destructive-100'
														)}
														placeholder={t('File name')}
														value={pendingFileNames[file.path] ?? ''}
														oninput={(event) => {
															const value = event.currentTarget.value;
															pendingFileNames = {
																...pendingFileNames,
																[file.path]: value
															};
															fileNameErrors = {
																...fileNameErrors,
																[file.path]: null
															};
														}}
														onkeydown={(event) => {
															if (event.key === 'Enter') {
																void commitNewFileName(file.path);
															}

															if (event.key === 'Escape') {
																cancelNewFile(file.path);
															}
														}}
														onblur={() => {
															void commitNewFileName(file.path);
														}}
													/>
												</div>
											{:else}
												<button
													type="button"
													class="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-semibold"
													onclick={() => (activePath = file.path)}
												>
													<Icon
														icon={overlayFileIcon(file.path)}
														class={cn(
															'size-4',
															file.path.endsWith('.svelte') &&
																'text-[#ff3e00]'
														)}
													/>
													{overlayFileName(file.path)}
												</button>
												{#if !isOverlayEntryFile(file.path)}
													<button
														type="button"
														class="mr-1.5 cursor-pointer rounded p-0.5 text-dark-400 opacity-0 group-hover:opacity-100 hover:bg-dark-600 hover:text-destructive-100"
														aria-label={t('Remove file')}
														onclick={() => void deleteFile(file.path)}
													>
														<Icon
															icon="ri:close-line"
															class="size-3.5"
														/>
													</button>
												{/if}
											{/if}
										</div>
									{/each}
									<button
										type="button"
										class="flex shrink-0 items-center justify-center rounded-md p-1.5 text-dark-200 transition-colors hover:bg-dark-700 hover:text-white"
										aria-label={t('Add file')}
										onclick={() => void addNewFile()}
									>
										<Icon icon="ri:add-line" class="size-4" />
									</button>
								</div>
							</div>

							<div
								class="flex shrink-0 items-center gap-1 border-b border-dark-600 bg-dark-900/40 px-2 py-1"
							>
								<span {@attach tooltip(t('Find in file (Ctrl+F)'))}>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										icon="ri:search-line"
										disabled={!activeEditorView}
										onclick={openActiveEditorSearch}
									>
										{t('Find')}
									</Button>
								</span>
								<span {@attach tooltip(t('Format document (Shift+Alt+F)'))}>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										icon="ri:code-box-line"
										disabled={!activeEditorView || !activeFileSupportsLsp}
										onclick={formatActiveEditorDocument}
									>
										{t('Format')}
									</Button>
								</span>
							</div>

							<div class="relative min-h-0 flex-1 overflow-hidden">
								{#if loaded && overlayLspSession}
									{#key overlayLspSession}
										{#each tabSourceFiles as file (file.path)}
											<div
												class={cn(
													'absolute inset-0 flex min-h-0 flex-col',
													activePath !== file.path &&
														'pointer-events-none invisible'
												)}
											>
												<InputCode
													language={editorLanguage(file.path)}
													value={file.content}
													fillHeight
													loadingLabel={t('Loading editor…')}
													class="h-full min-h-0 rounded-none border-0 focus-within:ring-0"
													sharedLanguageServer={overlayLspSession}
													languageServerActive={activePath === file.path &&
														!isTemporaryOverlayPath(file.path) &&
														overlayFileSupportsLsp(file.path)}
													activeDocumentUri={toWorkspaceUri(file.path)}
													activeLanguageId={overlayFileLspLanguageId(file.path) ??
														'typescript'}
													onEditorReady={(view) => handleEditorReady(file.path, view)}
													oninput={(event) => {
														updateFileContent(
															file.path,
															event.currentTarget.value
														);
													}}
												/>
											</div>
										{/each}
									{/key}
								{/if}
								{#if !loaded || lspLoading || !overlayLspSession}
									<div
										class="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-dark-900/90"
										role="status"
										aria-live="polite"
										aria-label={t('Loading editor…')}
									>
										<Icon
											icon="gg:spinner"
											class="size-6 animate-spin text-primary"
											aria-hidden="true"
										/>
										<p class="text-sm text-dark-300">{t('Loading editor…')}</p>
									</div>
								{/if}
							</div>
						</section>
					</Pane>

					<PaneResizer
						class={cn(
							'relative w-px shrink-0 cursor-col-resize bg-dark-600',
							'data-active:pointer:bg-primary transition-colors hover:bg-primary/70',
							'after:absolute after:inset-y-0 after:-right-1.5 after:-left-1.5 after:content-[""]'
						)}
					/>

					<Pane defaultSize={42} minSize={25} class="flex h-full min-h-0 min-w-0 flex-col">
						<section class="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-dark-800">
							<div
								class="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-dark-600 bg-dark-900/60 px-3 py-2"
							>
								<div class="flex items-center gap-2">
									<Icon icon="ri:eye-line" class="size-4 text-primary" />
									<p class="text-sm font-semibold text-white">{t('Preview')}</p>
									<Badge variant="ghost">{overlay.template}</Badge>
								</div>
								<div class="flex flex-wrap items-center gap-2">
									{#each overlay.expectedEvents as event (event)}
										<Badge variant="outline">{event}</Badge>
									{/each}
									{#if overlay.expectedEvents.length === 0}
										<Badge variant="ghost">{t('No events')}</Badge>
									{/if}
									<button
										type="button"
										class="rounded-md p-1.5 text-dark-300 transition-colors hover:bg-dark-700 hover:text-white"
										aria-label={t('Refresh preview')}
										onclick={refreshPreview}
									>
										<Icon icon="ri:refresh-line" class="size-4" />
									</button>
								</div>
							</div>

							<div class="relative flex min-h-0 flex-1 flex-col overflow-hidden">
								<ScrollArea
									orientation="both"
									class="h-full min-h-0 flex-1 overflow-hidden"
									viewportClasses="h-full min-h-0"
								>
									<div
										class="relative flex min-h-full items-center justify-center bg-dark-950 p-4"
									>
										<div
											class="boot-ambient pointer-events-none absolute inset-0 opacity-30"
										></div>
										<div
											class="relative w-full min-w-0 overflow-hidden rounded-lg border border-dark-600 bg-black shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
											style:aspect-ratio={previewAspectRatio}
										>
											<iframe
												title={t('Overlay preview')}
												src={previewUrl}
												class="h-full w-full bg-transparent"
											></iframe>
										</div>
									</div>
								</ScrollArea>

							<div
								class="sticky bottom-0 z-10 shrink-0 border-t border-dark-600 bg-[#0a0e14] shadow-[0_-10px_30px_rgba(0,0,0,0.45)]"
								role="log"
								aria-live="polite"
								aria-relevant="additions"
							>
								<div
									class="flex items-center gap-2 border-b border-dark-700/80 bg-dark-900/95 px-3 py-1.5"
								>
									<div class="flex items-center gap-1.5">
										<Icon
											icon="ri:terminal-box-line"
											class="size-3.5 text-primary"
										/>
										<span
											class="text-[11px] font-semibold tracking-wide text-dark-200 uppercase"
										>
											{t('Console')}
										</span>
									</div>
									{#if previewConsoleError}
										<div
											class="ml-auto flex items-center gap-1 text-[11px] font-medium text-destructive-100"
										>
											<Icon icon="ri:error-warning-line" class="size-3.5" />
											{t('Error')}
										</div>
									{/if}
								</div>
								<ScrollArea
									orientation="vertical"
									class="max-h-40 overflow-hidden"
									viewportClasses="max-h-40"
								>
									<div class="space-y-1 p-3 font-mono text-xs leading-relaxed">
										{#if previewConsoleError}
											<div class="flex gap-2 text-red-300/95">
												<span class="shrink-0 text-dark-500">
													{formatOverlayPreviewConsoleTime(Date.now())}
												</span>
												<span class="min-w-0 wrap-break-word whitespace-pre-wrap">
													{previewConsoleError}
												</span>
											</div>
										{/if}
										{#each previewConsoleLogs as entry (entry.id)}
											<div
												class={cn(
													'flex gap-2',
													overlayPreviewConsoleLevelClass(entry.level)
												)}
											>
												<span class="shrink-0 text-dark-500">
													{formatOverlayPreviewConsoleTime(entry.timestamp)}
												</span>
												<span class="min-w-0 wrap-break-word whitespace-pre-wrap">
													{entry.message}
												</span>
											</div>
										{/each}
										{#if !previewConsoleError && previewConsoleLogs.length === 0}
											<p class="text-dark-500">{t('No console output')}</p>
										{/if}
									</div>
								</ScrollArea>
							</div>
							</div>
						</section>
					</Pane>
				</PaneGroup>
			</div>
		</div>
	{/if}
</Container>
