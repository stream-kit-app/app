<script lang="ts">
	import type { CollectionLifetime, CorePluginCollectionsApi } from '$lib/types/core-plugin-api';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		collectionName: string;
		collectionsApi?: CorePluginCollectionsApi;
		modalId: string;
	};

	let { collectionName, collectionsApi, modalId }: Props = $props();

	const { t } = useI18n();

	let revision = $state(0);
	let newKey = $state('');
	let newValue = $state('');
	let editingKey = $state<string | null>(null);
	let editKey = $state('');
	let editValue = $state('');
	let saving = $state(false);

	const trimmedCollectionName = $derived(collectionName.trim());
	const lifetime = $derived(
		trimmedCollectionName && collectionsApi
			? collectionsApi.getLifetime(trimmedCollectionName)
			: undefined
	);
	const entries = $derived.by(() => {
		void revision;

		if (!trimmedCollectionName || !collectionsApi) {
			return [];
		}

		return collectionsApi.listEntries(trimmedCollectionName);
	});
	const canAddEntry = $derived(
		newKey.trim().length > 0 &&
			!saving &&
			collectionsApi != null &&
			trimmedCollectionName.length > 0
	);
	const canSaveEdit = $derived(editKey.trim().length > 0 && editingKey != null && !saving);

	$effect(() => {
		if (!collectionsApi) {
			return;
		}

		const cleanups = [
			collectionsApi.subscribe('created', () => {
				revision += 1;
			}),
			collectionsApi.subscribe('changed', () => {
				revision += 1;
			}),
			collectionsApi.subscribe('deleted', () => {
				revision += 1;
			})
		];

		return () => {
			for (const cleanup of cleanups) {
				cleanup();
			}
		};
	});

	function closeModal(): void {
		getApp().modals.get(modalId)?.close();
	}

	function mutationErrorMessage(
		reason: 'collection-not-found' | 'key-not-found' | 'invalid-input'
	): string {
		switch (reason) {
			case 'collection-not-found':
				return t('The collection does not exist.');
			case 'key-not-found':
				return t('The key does not exist in this collection.');
			case 'invalid-input':
				return t('Collection name and key are required.');
		}
	}

	function startEditing(key: string, value: string): void {
		editingKey = key;
		editKey = key;
		editValue = value;
	}

	function cancelEditing(): void {
		editingKey = null;
		editKey = '';
		editValue = '';
	}

	async function handleAddEntry(): Promise<void> {
		if (!canAddEntry || !collectionsApi || !trimmedCollectionName) {
			return;
		}

		saving = true;

		try {
			const result = await collectionsApi.set(trimmedCollectionName, newKey.trim(), newValue);

			if (!result.ok) {
				getApp().toast.create({
					title: t('Add entry'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			getApp().toast.create({
				title: t('Entry added'),
				variant: 'success'
			});
			newKey = '';
			newValue = '';
		} finally {
			saving = false;
		}
	}

	async function handleSaveEdit(): Promise<void> {
		if (!canSaveEdit || !collectionsApi || !trimmedCollectionName || editingKey == null) {
			return;
		}

		saving = true;

		try {
			const normalizedEditKey = editKey.trim();
			let result;

			if (normalizedEditKey === editingKey) {
				result = await collectionsApi.update(trimmedCollectionName, editingKey, editValue);
			} else {
				const deleteResult = await collectionsApi.deleteKey(trimmedCollectionName, editingKey);

				if (!deleteResult.ok) {
					getApp().toast.create({
						title: t('Edit collection'),
						description: mutationErrorMessage(deleteResult.reason),
						variant: 'warning'
					});
					return;
				}

				result = await collectionsApi.set(trimmedCollectionName, normalizedEditKey, editValue);
			}

			if (!result.ok) {
				getApp().toast.create({
					title: t('Edit collection'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			getApp().toast.create({
				title: t('Entry updated'),
				variant: 'success'
			});
			cancelEditing();
		} finally {
			saving = false;
		}
	}

	async function handleDeleteEntry(key: string): Promise<void> {
		if (!collectionsApi || !trimmedCollectionName || saving) {
			return;
		}

		saving = true;

		try {
			const result = await collectionsApi.deleteKey(trimmedCollectionName, key);

			if (!result.ok) {
				getApp().toast.create({
					title: t('Delete'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			if (editingKey === key) {
				cancelEditing();
			}

			getApp().toast.create({
				title: t('Entry deleted'),
				variant: 'success'
			});
		} finally {
			saving = false;
		}
	}

	async function handleClearCollection(): Promise<void> {
		if (!collectionsApi || !trimmedCollectionName || saving) {
			return;
		}

		const confirmed = await getApp().confirm.ask({
			title: t('Clear collection?'),
			description: t('Are you sure you want to clear all entries in "{name}"?', {
				name: trimmedCollectionName
			}),
			confirmLabel: t('Clear collection'),
			cancelLabel: t('Cancel')
		});

		if (!confirmed) {
			return;
		}

		saving = true;

		try {
			const result = await collectionsApi.clear(trimmedCollectionName);

			if (!result.ok) {
				getApp().toast.create({
					title: t('Clear collection'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			cancelEditing();
			getApp().toast.create({
				title: t('Collection cleared'),
				variant: 'success'
			});
		} finally {
			saving = false;
		}
	}

	async function handleDeleteCollection(): Promise<void> {
		if (!collectionsApi || !trimmedCollectionName || saving) {
			return;
		}

		const confirmed = await getApp().confirm.ask({
			title: t('Delete collection?'),
			description: t(
				'Are you sure you want to delete the collection "{name}"? This cannot be undone.',
				{ name: trimmedCollectionName }
			),
			confirmLabel: t('Delete'),
			cancelLabel: t('Cancel')
		});

		if (!confirmed) {
			return;
		}

		saving = true;

		try {
			const result = await collectionsApi.delete(trimmedCollectionName);

			if (!result.ok) {
				getApp().toast.create({
					title: t('Delete collection?'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			getApp().toast.create({
				title: t('Collection deleted'),
				variant: 'success'
			});
			closeModal();
		} finally {
			saving = false;
		}
	}

	function lifetimeLabel(value: CollectionLifetime): string {
		return value === 'session' ? t('Session') : t('Persistent');
	}
</script>

{#if trimmedCollectionName}
	<div class="flex flex-wrap items-center gap-2">
		<span class="font-mono text-sm text-dark-200">{trimmedCollectionName}</span>
		{#if lifetime}
			<Badge variant={lifetime === 'session' ? 'secondary' : 'success'}>
				{lifetimeLabel(lifetime)}
			</Badge>
		{/if}
	</div>
	{#if lifetime === 'session'}
		<p class="mt-2 text-sm text-dark-300">
			{t('Session collections are cleared when the app closes.')}
		</p>
	{/if}
{/if}

<div class="mt-5 min-h-0">
	{#if entries.length === 0}
		<p class="py-4 text-sm text-dark-300">{t('This collection has no entries yet.')}</p>
	{:else}
		<ScrollArea orientation="vertical" viewportClasses="max-h-64 overflow-hidden">
			<ul class="grid gap-2 pr-2">
				{#each entries as entry (entry.key)}
					<li
						class={cn(
							'rounded-none border border-rule bg-dark-700/40 p-3',
							editingKey === entry.key && 'border-primary-500/40'
						)}
					>
						{#if editingKey === entry.key}
							<div class="grid gap-3">
								<InputText
									label={t('Key')}
									required
									value={editKey}
									oninput={(event) => (editKey = event.currentTarget.value)}
								/>
								<InputText
									label={t('Value')}
									value={editValue}
									oninput={(event) => (editValue = event.currentTarget.value)}
								/>
								<div class="flex flex-wrap justify-end gap-2">
									<Button
										variant="outline"
										size="sm"
										disabled={saving}
										onclick={cancelEditing}
									>
										{t('Cancel')}
									</Button>
									<Button
										size="sm"
										disabled={!canSaveEdit}
										onclick={() => void handleSaveEdit()}
									>
										{t('Save')}
									</Button>
								</div>
							</div>
						{:else}
							<div class="flex items-start justify-between gap-3">
								<div class="min-w-0 flex-1">
									<p
										class="truncate font-mono text-sm font-medium text-primary-100"
										title={entry.key}
									>
										{entry.key}
									</p>
									<p class="mt-1 truncate text-sm text-dark-200" title={entry.value}>
										{entry.value || t('Empty value')}
									</p>
								</div>
								<div class="flex shrink-0 items-center gap-1">
									<Button
										variant="ghost"
										size="icon-sm"
										icon="ri:edit-line"
										aria-label={t('Edit')}
										disabled={saving}
										onclick={() => startEditing(entry.key, entry.value)}
									/>
									<Button
										variant="ghost"
										size="icon-sm"
										icon="ri:delete-bin-line"
										aria-label={t('Delete')}
										disabled={saving}
										onclick={() => void handleDeleteEntry(entry.key)}
									/>
								</div>
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</ScrollArea>
	{/if}
</div>

<div class="mt-5 grid gap-3 rounded-none border border-rule bg-dark-700/30 p-4">
	<p class="text-sm font-medium text-dark-100">{t('Add entry')}</p>
	<div class="grid gap-3 sm:grid-cols-2">
		<InputText
			label={t('Key')}
			required
			placeholder="myKey"
			value={newKey}
			oninput={(event) => (newKey = event.currentTarget.value)}
		/>
		<InputText
			label={t('Value')}
			placeholder="myValue"
			value={newValue}
			oninput={(event) => (newValue = event.currentTarget.value)}
		/>
	</div>
	<div class="flex justify-end">
		<Button
			size="sm"
			icon="ri:add-line"
			disabled={!canAddEntry}
			onclick={() => void handleAddEntry()}
		>
			{t('Add entry')}
		</Button>
	</div>
</div>

<div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-4">
	<div class="flex flex-wrap gap-2">
		<Button
			variant="outline"
			size="sm"
			icon="ri:eraser-line"
			disabled={saving || entries.length === 0}
			onclick={() => void handleClearCollection()}
		>
			{t('Clear collection')}
		</Button>
		<Button
			variant="outline"
			size="sm"
			icon="ri:delete-bin-line"
			class="text-destructive-50 hover:text-destructive-50"
			disabled={saving}
			onclick={() => void handleDeleteCollection()}
		>
			{t('Delete')}
		</Button>
	</div>
	<Button variant="outline" disabled={saving} onclick={closeModal}>{t('Close')}</Button>
</div>
