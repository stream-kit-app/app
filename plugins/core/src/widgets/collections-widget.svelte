<script lang="ts">
	import type { CorePluginApi } from '../lib/plugin-api';
	import type { CollectionSummary } from '../lib/collections/types';
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import CollectionCreateForm from './collection-create-form.svelte';
	import CollectionEditorForm from './collection-editor-form.svelte';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);
	const collectionsApi = $derived(app.plugins.tryGet<CorePluginApi>('core')?.collections);

	let revision = $state(0);

	const collections = $derived.by(() => {
		void revision;

		if (!collectionsApi) {
			return [];
		}

		return collectionsApi.listCollections().map((summary: CollectionSummary) => ({
			...summary,
			entryCount: collectionsApi.listEntries(summary.collectionName).length
		}));
	});

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

	function collectionEditModalId(collectionName: string): string {
		return `collection-edit-${collectionName}`;
	}

	function openCreateCollection(): void {
		const modal =
			app.modal.get('collection-create') ??
			app.modal.create({
				id: 'collection-create',
				title: t('Create collection'),
				description: t('Create a collection to store key-value data for your actions.'),
				content: CollectionCreateForm,
				props: { app, modalId: 'collection-create' },
				size: 'md'
			});

		modal.open();
	}

	function openEditor(collectionName: string): void {
		const modalId = collectionEditModalId(collectionName);

		const modal =
			app.modal.get(modalId) ??
			app.modal.create({
				id: modalId,
				title: t('Edit collection'),
				content: CollectionEditorForm,
				props: { app, collectionName, modalId },
				size: 'lg'
			});

		modal.open();
	}

	async function handleDeleteCollection(collectionName: string): Promise<void> {
		if (!collectionsApi) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Delete collection?'),
			description: t(
				'Are you sure you want to delete the collection "{name}"? This cannot be undone.',
				{ name: collectionName }
			),
			confirmLabel: t('Delete'),
			cancelLabel: t('Cancel')
		});

		if (!confirmed) {
			return;
		}

		const result = await collectionsApi.delete(collectionName);

		if (!result.ok) {
			app.toast.create({
				title: t('Delete collection?'),
				description: t('The collection does not exist.'),
				variant: 'warning'
			});
			return;
		}

		app.toast.create({
			title: t('Collection deleted'),
			variant: 'success'
		});
	}
</script>

<div class="flex min-h-0 flex-1 flex-col">
	{#if collectionsApi == null}
		<p class="text-sm text-dark-100">{t('Core plugin unavailable')}</p>
	{:else if collections.length === 0}
		<p class="text-sm text-dark-300">{t('No collections yet')}</p>
	{:else}
		<div class="flex flex-col gap-1 text-sm">
			{#each collections as collection (collection.collectionName)}
				<div
					class="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition hover:bg-dark-700/50"
				>
					<div class="flex min-w-0 items-center gap-3">
						<div
							class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
						>
							<Icon icon="ri:database-2-line" class="size-4" />
						</div>
						<div class="min-w-0">
							<p class="truncate font-medium text-dark-50">{collection.collectionName}</p>
							<p class="text-xs text-dark-300">
								{t('{count} entries', { count: collection.entryCount })}
							</p>
						</div>
					</div>
					<div class="flex shrink-0 items-center gap-2">
						<Badge variant={collection.lifetime === 'session' ? 'default' : 'success'} size="sm">
							{collection.lifetime === 'session' ? t('Session') : t('Persistent')}
						</Badge>
						<Button
							variant="outline"
							size="badge"
							icon="ri:pencil-line"
							onclick={() => openEditor(collection.collectionName)}
						>
							{t('Edit')}
						</Button>
						<Button
							variant="ghost"
							size="icon-badge"
							icon="ri:delete-bin-line"
							aria-label={t('Delete')}
							onclick={() => void handleDeleteCollection(collection.collectionName)}
						/>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="mt-3 border-t border-dark-700 pt-3">
		<Button
			size="sm"
			icon="ri:add-line"
			disabled={collectionsApi == null}
			onclick={openCreateCollection}
		>
			{t('Create collection')}
		</Button>
	</div>
</div>
