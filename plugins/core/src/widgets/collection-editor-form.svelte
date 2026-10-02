<script lang="ts">
	import type { CorePluginApi } from '../lib/plugin-api';
	import type { CollectionLifetime } from '../lib/collections/types';
	import type { PluginAppApi } from '@stream-kit/plugin';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { DataTable } from '@stream-kit/ui/data-table';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText } from '@stream-kit/ui/input';
	import { cn } from '@stream-kit/plugin/utils';

	type Props = {
		app: PluginAppApi;
		collectionName: string;
		modalId: string;
	};

	type Entry = { key: string; value: string };
	type EditField = 'key' | 'value';

	let { app, collectionName }: Props = $props();

	const t = $derived(app.i18n.t);
	const collectionsApi = $derived(app.plugins.tryGet<CorePluginApi>('core')?.collections);

	let revision = $state(0);
	let newKey = $state('');
	let newValue = $state('');
	let editingKey = $state<string | null>(null);
	let editKey = $state('');
	let editValue = $state('');
	let editFocus = $state<EditField>('value');
	let saving = $state(false);
	let search = $state('');
	let addForm = $state<HTMLFormElement>();

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
	const filteredEntries = $derived.by(() => {
		const query = search.trim().toLowerCase();

		if (!query) {
			return entries;
		}

		return entries.filter(
			(entry) =>
				entry.key.toLowerCase().includes(query) || entry.value.toLowerCase().includes(query)
		);
	});
	const newKeyExists = $derived(entries.some((entry) => entry.key === newKey.trim()));
	const canAddEntry = $derived(
		newKey.trim().length > 0 && !saving && collectionsApi != null && trimmedCollectionName.length > 0
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

	function startEditing(key: string, value: string, focus: EditField = 'value'): void {
		editFocus = focus;
		editingKey = key;
		editKey = key;
		editValue = value;
	}

	function cancelEditing(): void {
		editingKey = null;
		editKey = '';
		editValue = '';
	}

	function focusOnMount(node: HTMLInputElement): void {
		node.focus();
		node.setSelectionRange(node.value.length, node.value.length);
	}

	function handleEditKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			event.preventDefault();
			void handleSaveEdit();
		} else if (event.key === 'Escape') {
			// Cancel the row edit without closing the whole modal.
			event.preventDefault();
			event.stopPropagation();
			cancelEditing();
		}
	}

	function handleAddSubmit(event: SubmitEvent): void {
		event.preventDefault();
		void handleAddEntry();
	}

	async function handleAddEntry(): Promise<void> {
		if (!canAddEntry || !collectionsApi || !trimmedCollectionName) {
			return;
		}

		saving = true;

		try {
			const result = await collectionsApi.set(trimmedCollectionName, newKey.trim(), newValue);

			if (!result.ok) {
				app.toast.create({
					title: t('Add entry'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			newKey = '';
			newValue = '';
			addForm?.querySelector('input')?.focus();
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
					app.toast.create({
						title: t('Edit collection'),
						description: mutationErrorMessage(deleteResult.reason),
						variant: 'warning'
					});
					return;
				}

				result = await collectionsApi.set(trimmedCollectionName, normalizedEditKey, editValue);
			}

			if (!result.ok) {
				app.toast.create({
					title: t('Edit collection'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

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
				app.toast.create({
					title: t('Delete'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			if (editingKey === key) {
				cancelEditing();
			}
		} finally {
			saving = false;
		}
	}

	function lifetimeLabel(value: CollectionLifetime): string {
		return value === 'session' ? t('Session') : t('Persistent');
	}
</script>

{#snippet keyCell(entry: Entry)}
	{#if editingKey === entry.key}
		<InputText
			size="sm"
			class="font-mono"
			aria-label={t('Key')}
			required
			value={editKey}
			oninput={(event) => (editKey = event.currentTarget.value)}
			onkeydown={handleEditKeydown}
			{@attach editFocus === 'key' ? focusOnMount : undefined}
		/>
	{:else}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="truncate font-mono text-primary-100"
			title={entry.key}
			ondblclick={() => startEditing(entry.key, entry.value, 'key')}
		>
			{entry.key}
		</div>
	{/if}
{/snippet}

{#snippet valueCell(entry: Entry)}
	{#if editingKey === entry.key}
		<InputText
			size="sm"
			aria-label={t('Value')}
			value={editValue}
			oninput={(event) => (editValue = event.currentTarget.value)}
			onkeydown={handleEditKeydown}
			{@attach editFocus === 'value' ? focusOnMount : undefined}
		/>
	{:else}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class={cn('truncate', !entry.value && 'text-dark-500 italic')}
			title={entry.value}
			ondblclick={() => startEditing(entry.key, entry.value, 'value')}
		>
			{entry.value || t('Empty value')}
		</div>
	{/if}
{/snippet}

{#snippet actionsCell(entry: Entry)}
	{#if editingKey === entry.key}
		<div class="flex items-center justify-end gap-1">
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:check-line"
				aria-label={t('Save')}
				disabled={!canSaveEdit}
				onclick={() => void handleSaveEdit()}
			/>
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:close-line"
				aria-label={t('Cancel')}
				disabled={saving}
				onclick={cancelEditing}
			/>
		</div>
	{:else}
		<div
			class="flex items-center justify-end gap-1 opacity-0 transition-opacity focus-within:opacity-100 [tr:hover_&]:opacity-100"
		>
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
				class="hover:text-destructive-50"
				aria-label={t('Delete')}
				disabled={saving}
				onclick={() => void handleDeleteEntry(entry.key)}
			/>
		</div>
	{/if}
{/snippet}

<div class="flex flex-wrap items-center justify-between gap-3">
	{#if trimmedCollectionName}
		<div class="flex min-w-0 flex-wrap items-center gap-2">
			<span class="truncate font-mono text-sm text-dark-100">{trimmedCollectionName}</span>
			{#if lifetime}
				<Badge variant={lifetime === 'session' ? 'secondary' : 'success'}>
					{lifetimeLabel(lifetime)}
				</Badge>
			{/if}
			<span class="text-xs text-dark-400 tabular-nums">
				{t('{count} entries', { count: entries.length })}
			</span>
		</div>
	{/if}
	{#if entries.length > 0}
		<InputText
			size="sm"
			class="w-full sm:w-56"
			prependIcon="ri:search-line"
			placeholder={t('Search entries')}
			aria-label={t('Search entries')}
			value={search}
			oninput={(event) => (search = event.currentTarget.value)}
		/>
	{/if}
</div>
{#if lifetime === 'session'}
	<p class="mt-2 text-sm text-dark-300">
		{t('Session collections are cleared when the app closes.')}
	</p>
{/if}

<form
	bind:this={addForm}
	class="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-start gap-2"
	onsubmit={handleAddSubmit}
>
	<InputText
		size="sm"
		class="font-mono"
		placeholder={t('Key')}
		aria-label={t('Key')}
		value={newKey}
		oninput={(event) => (newKey = event.currentTarget.value)}
	/>
	<InputText
		size="sm"
		placeholder={t('Value')}
		aria-label={t('Value')}
		value={newValue}
		oninput={(event) => (newValue = event.currentTarget.value)}
	/>
	<Button
		type="submit"
		size="sm"
		icon={newKeyExists ? 'ri:refresh-line' : 'ri:add-line'}
		disabled={!canAddEntry}
	>
		{newKeyExists ? t('Update') : t('Add entry')}
	</Button>
	{#if newKeyExists}
		<p class="col-span-full text-xs text-warning-300">{t('Key exists — will overwrite')}</p>
	{/if}
</form>

<div class="mt-3">
	{#if entries.length === 0}
		<EmptyState compact icon="ri:database-2-line" title={t('This collection has no entries yet.')} />
	{:else}
		<DataTable
			data={filteredEntries}
			getRowKey={(entry) => entry.key}
			empty={t('No matching entries')}
			maxHeight="max-h-[min(28rem,55vh)]"
			columns={[
				{ id: 'key', header: t('Key'), cell: keyCell, class: 'w-1/3 max-w-0' },
				{ id: 'value', header: t('Value'), cell: valueCell, class: 'max-w-0' },
				{ id: 'actions', header: '', align: 'right', cell: actionsCell, class: 'w-24' }
			]}
		/>
	{/if}
</div>
