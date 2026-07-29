<script lang="ts">
	import type { UserFileRecord, UserFilesQuota } from '$lib/core/user-files';

	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText } from '@stream-kit/ui/input';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';

	import { isPocketBaseAutoCancelled } from '$lib/core/auth/auth-utils';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	let loading = $state(true);
	let deletingId = $state<string | null>(null);
	let files = $state<UserFileRecord[]>([]);
	let quota = $state<UserFilesQuota | null>(null);
	let error = $state<string | null>(null);
	let search = $state('');
	const failedThumbIds = new SvelteSet<string>();

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

	onMount(() => {
		void load();
	});

	async function load(): Promise<void> {
		loading = true;
		error = null;
		failedThumbIds.clear();

		try {
			const app = getApp();
			const [listed, nextQuota] = await Promise.all([
				app.userFiles.list(),
				app.userFiles.getQuota()
			]);
			files = listed;
			quota = nextQuota;
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

	async function deleteFile(file: UserFileRecord): Promise<void> {
		const app = getApp();
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
									src={getApp().userFiles.resolveUrl(file.url)}
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
