<script lang="ts">
	import type { CollectionSummary } from '../lib/collections/types';
	import type { CorePluginApi } from '../lib/plugin-api';
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { WidgetList, WidgetRow } from '@stream-kit/ui/widget';

	import CollectionCreateFormFooter from './collection-create-form-footer.svelte';
	import CollectionCreateForm from './collection-create-form.svelte';
	import { CollectionCreateForm as CollectionCreateFormModel } from './collection-create.svelte';
	import CollectionEditorFormFooter from './collection-editor-form-footer.svelte';
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
		const modalId = 'collection-create';
		const existing = app.modal.get(modalId);

		if (existing) {
			existing.open();
			return;
		}

		const form = new CollectionCreateFormModel(app, modalId);

		app.modal
			.create({
				id: modalId,
				title: t('Create collection'),
				description: t('Create a collection to store key-value data for your actions.'),
				content: CollectionCreateForm,
				footer: CollectionCreateFormFooter,
				props: { form },
				size: 'md'
			})
			.open();
	}

	function openEditor(collectionName: string): void {
		const modalId = collectionEditModalId(collectionName);

		const modal =
			app.modal.get(modalId) ??
			app.modal.create({
				id: modalId,
				title: t('Edit collection'),
				content: CollectionEditorForm,
				footer: CollectionEditorFormFooter,
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

<div class="flex min-h-0 flex-1 flex-col gap-3">
	{#if collectionsApi == null}
		<EmptyState compact icon="ri:plug-disconnected-line" title={t('Core plugin unavailable')} />
	{:else if collections.length === 0}
		<EmptyState
			compact
			icon="ri:database-2-line"
			title={t('No collections yet')}
			description={t('Create a collection to store key-value data for your actions.')}
		/>
	{:else}
		<WidgetList>
			{#each collections as collection (collection.collectionName)}
				<WidgetRow
					icon="ri:database-2-line"
					title={collection.collectionName}
					description={t('{count} entries', { count: collection.entryCount })}
					onclick={() => openEditor(collection.collectionName)}
				>
					{#snippet trailing()}
						<Badge
							variant={collection.lifetime === 'session' ? 'default' : 'success'}
							size="sm"
						>
							{collection.lifetime === 'session' ? t('Session') : t('Persistent')}
						</Badge>
						<Button
							variant="ghost"
							size="icon-badge"
							icon="ri:delete-bin-line"
							class="text-dark-400 opacity-0 group-hover/row:opacity-100 hover:text-destructive-50 focus-visible:opacity-100"
							aria-label={t('Delete')}
							onclick={() => void handleDeleteCollection(collection.collectionName)}
						/>
					{/snippet}
				</WidgetRow>
			{/each}
		</WidgetList>
	{/if}

	<div class="mt-auto flex items-center justify-between gap-2">
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
