<script lang="ts">
	import type { UserFileRecord, UserFilesQuota } from '$lib/core/user-files';

	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputSwitch, InputText } from '@stream-kit/ui/input';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';

	import { isPocketBaseAutoCancelled } from '$lib/core/auth/auth-utils';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
	const app = getApp();
	const cache = app.userFiles.cache;
	const settings = app.settings;

	let loading = $state(true);
	let deletingId = $state<string | null>(null);
	let openingFolder = $state(false);
	let togglingMirror = $state(false);
	let files = $state<UserFileRecord[]>([]);
	let quota = $state<UserFilesQuota | null>(null);
	let error = $state<string | null>(null);
	let search = $state('');
	const failedThumbIds = new SvelteSet<string>();

	const mirrorEnabled = $derived(settings.offlineCloudFilesMirror);

	const filteredFiles = $derived.by(() => {
		const query = search.trim().toLowerCase();
		if (!query) {
			return files;
		}
		return files.filter((file) => {
			const name = file.originalName.toLowerCase();
			const mime = file.mimeType.toLowerCase();
			return name.includes(query) || mime.includes(query);
		});
	});

	const quotaPercent = $derived(
		quota && quota.maxStorageBytes > 0
			? Math.min(100, Math.round((quota.usedBytes / quota.maxStorageBytes) * 100))
			: 0
	);

	const offlineStatusLabel = $derived.by(() => {
		if (!mirrorEnabled) {
			return null;
		}
		if (cache.status === 'syncing') {
			return t('Downloading offline copies…');
		}
		if (cache.status === 'error') {
			return cache.lastError ?? t('Offline sync failed');
		}
		if (cache.totalCount === 0 && files.length === 0) {
			return null;
		}
		const total = Math.max(cache.totalCount, files.length);
		return t('Offline copies: {cached}/{total}', {
			cached: String(cache.cachedCount),
			total: String(total)
		});
	});

	onMount(() => {
		void load();
	});

	async function load(): Promise<void> {
		loading = true;
		error = null;
		failedThumbIds.clear();

		try {
			const [listed, nextQuota] = await Promise.all([
				app.userFiles.list(),
				app.userFiles.getQuota()
			]);
			files = listed;
			quota = nextQuota;
			if (settings.offlineCloudFilesMirror) {
				void app.userFiles.syncCache();
			}
		} catch (err) {
			if (isPocketBaseAutoCancelled(err)) {
				return;
			}
			error = err instanceof Error ? err.message : t('Could not load cloud files.');
			files = [];
			quota = null;
		} finally {
			loading = false;
		}
	}

	async function setOfflineMirror(enabled: boolean): Promise<void> {
		if (togglingMirror || settings.offlineCloudFilesMirror === enabled) {
			return;
		}
		togglingMirror = true;
		try {
			await settings.setOfflineCloudFilesMirror(enabled);
			if (enabled) {
				void app.userFiles.syncCache();
			}
		} catch (err) {
			app.toast.create({
				title: t('Could not update setting'),
				description: err instanceof Error ? err.message : t('Could not update setting'),
				variant: 'error'
			});
		} finally {
			togglingMirror = false;
		}
	}

	async function deleteFile(file: UserFileRecord): Promise<void> {
		const confirmed = await app.confirm.ask({
			title: t('Delete cloud file?'),
			description: t(
				'Delete "{name}"? Actions that still reference this file may stop working.',
				{ name: file.originalName }
			),
			confirmLabel: t('Delete'),
			cancelLabel: t('Cancel')
		});
		if (!confirmed) {
			return;
		}

		deletingId = file.id;
		try {
			await app.userFiles.remove(file.id);
			files = files.filter((item) => item.id !== file.id);
			quota = await app.userFiles.getQuota();
			app.toast.create({
				title: t('File deleted'),
				description: t('The cloud file was removed.'),
				variant: 'success'
			});
		} catch (err) {
			app.toast.create({
				title: t('Delete failed'),
				description: err instanceof Error ? err.message : t('Could not delete file.'),
				variant: 'error'
			});
		} finally {
			deletingId = null;
		}
	}

	async function openOfflineFolder(): Promise<void> {
		if (openingFolder) {
			return;
		}
		openingFolder = true;
		try {
			const path = await cache.getCacheDirPath();
			await app.opener.openPath(path);
		} catch (err) {
			const title = t('Could not open folder');
			const detail = err instanceof Error ? err.message.trim() : '';
			app.toast.create({
				title,
				description: detail && detail !== title ? detail : undefined,
				variant: 'error'
			});
		} finally {
			openingFolder = false;
		}
	}

	function formatBytes(bytes: number): string {
		if (bytes < 1024) {
			return `${bytes} B`;
		}
		if (bytes < 1024 * 1024) {
			return `${(bytes / 1024).toFixed(1)} KB`;
		}
		if (bytes < 1024 * 1024 * 1024) {
			return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
		}
		return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
	}

	function fileIcon(mimeType: string): string {
		if (mimeType.startsWith('image/')) {
			return 'ri:image-line';
		}
		if (mimeType.startsWith('audio/')) {
			return 'ri:music-2-line';
		}
		if (mimeType.startsWith('video/')) {
			return 'ri:film-line';
		}
		return 'ri:file-line';
	}
</script>

<div class="grid gap-4">
	<div class="grid gap-2 rounded-none border border-rule bg-dark-900/40 px-3 py-3">
		<InputSwitch
			label={t('Keep cloud files offline')}
			bind:checked={
				() => mirrorEnabled,
				(value) => void setOfflineMirror(value)
			}
		/>
		<p class="text-xs text-dark-400">
			{t(
				'Download your cloud library to this PC and use local paths for playback (OBS, audio, icons). Actions still store cloud refs for multi-PC sync.'
			)}
		</p>
		{#if mirrorEnabled}
			<div class="flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-2">
				{#if offlineStatusLabel}
					<p
						class={[
							'min-w-0 flex-1 text-xs',
							cache.status === 'error' ? 'text-destructive-100' : 'text-dark-400'
						]}
					>
						{offlineStatusLabel}
					</p>
				{/if}
				<Button
					variant="ghost"
					size="sm"
					class="ms-auto shrink-0"
					icon="ri:folder-open-line"
					disabled={openingFolder}
					isLoading={openingFolder}
					onclick={() => void openOfflineFolder()}
				>
					{t('Open offline folder')}
				</Button>
			</div>
		{/if}
	</div>

	{#if quota}
		<div class="grid gap-1.5">
			<div class="flex items-center justify-between gap-2 text-xs text-dark-300">
				<span>{t('Storage')}</span>
				<span>
					{formatBytes(quota.usedBytes)} / {formatBytes(quota.maxStorageBytes)}
					· {quota.planName}
				</span>
			</div>
			<div class="h-1.5 overflow-hidden rounded-full bg-dark-700">
				<div
					class="h-full rounded-full bg-primary transition-all"
					style:width="{quotaPercent}%"
				></div>
			</div>
			<p class="text-xs text-dark-400">
				{t('Max file size')}: {formatBytes(quota.maxFileBytes)}
			</p>
		</div>
	{/if}

	<div>
		<InputText
			prependIcon="ri:search-line"
			placeholder={t('Search cloud files')}
			value={search}
			oninput={(event) => {
				search = event.currentTarget.value;
			}}
		/>
	</div>

	{#if loading}
		<p class="text-sm text-dark-300">{t('Loading…')}</p>
	{:else if error}
		<p class="text-sm text-destructive-100">{error}</p>
	{:else if files.length === 0}
		<EmptyState
			icon="ri:cloud-off-line"
			title={t('No cloud files yet')}
			description={t('Upload a file to store it in your Stream Kit account.')}
		/>
	{:else if filteredFiles.length === 0}
		<div
			class="flex flex-col items-center gap-2 rounded-xl border border-dashed border-dark-600 px-4 py-8 text-center"
		>
			<Icon icon="ri:search-line" class="size-8 text-dark-400" aria-hidden="true" />
			<p class="text-sm text-dark-200">{t('No values match your search.')}</p>
		</div>
	{:else}
		<ScrollArea orientation="vertical" class="max-h-80" viewportClasses="h-full w-full">
			<ul class="divide-y divide-dark-700 rounded-xl border border-dark-600">
				{#each filteredFiles as file (file.id)}
					<li class="flex items-center gap-3 px-3 py-2.5">
						<span
							class="inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dark-600 bg-dark-800 text-primary"
							aria-hidden="true"
						>
							{#if file.mimeType.startsWith('image/') && !failedThumbIds.has(file.id)}
								<img
									src={app.userFiles.resolveUrl(file.url)}
									alt=""
									class="size-9 rounded-lg object-cover"
									onerror={() => failedThumbIds.add(file.id)}
								/>
							{:else}
								<Icon icon={fileIcon(file.mimeType)} class="size-4" />
							{/if}
						</span>
						<span class="min-w-0 flex-1">
							<span class="block truncate text-sm font-medium text-dark-50"
								>{file.originalName}</span
							>
							<span class="block text-xs text-dark-400">
								{formatBytes(file.size)} · {file.mimeType}
							</span>
						</span>
						<Button
							variant="destructive"
							size="sm"
							class="shrink-0"
							disabled={deletingId === file.id}
							onclick={() => void deleteFile(file)}
						>
							{t('Delete')}
						</Button>
					</li>
				{/each}
			</ul>
		</ScrollArea>
	{/if}
</div>
