<script lang="ts">
	import type { CorePluginCollectionsApi, CollectionSummary } from '$lib/types/core-plugin-api';

	import Icon from '@iconify/svelte';

	import { Panel } from '@stream-kit/ui/blueprint';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import CollectionCreateForm from './collection-create-form.svelte';
	import CollectionEditorForm from './collection-editor-form.svelte';
	import { app } from '$lib/core';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	type Props = {
		collectionsApi?: CorePluginCollectionsApi;
		revision?: number;
	};

	let { collectionsApi, revision = 0 }: Props = $props();

	const { t } = useI18n();

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

	function collectionEditModalId(collectionName: string): string {
		return `collection-edit-${collectionName}`;
	}

	function openCreateCollection(): void {
		app
			.createModal({
				id: 'collection-create',
				title: t('Create collection'),
				description: t('Create a collection to store key-value data for your actions.'),
				content: CollectionCreateForm,
				props: { collectionsApi, modalId: 'collection-create' },
				size: 'md'
			})
			.open();
	}

	function openEditor(collectionName: string): void {
		const modalId = collectionEditModalId(collectionName);

		app
			.createModal({
				id: modalId,
				title: t('Edit collection'),
				content: CollectionEditorForm,
				props: { collectionName, collectionsApi, modalId },
				size: 'lg'
			})
			.open();
	}

	async function handleDeleteCollection(collectionName: string): Promise<void> {
		if (!collectionsApi) {
			return;
		}

		const confirmed = await getApp().confirm.ask({
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
			getApp().toast.create({
				title: t('Delete collection?'),
				description: t('The collection does not exist.'),
				variant: 'warning'
			});
			return;
		}

		getApp().toast.create({
			title: t('Collection deleted'),
			variant: 'success'
		});
	}
</script>

<section class="flex flex-col gap-3">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div>
			<h2 class="text-lg font-medium text-dark-50">{t('Collections')}</h2>
			<p class="mt-0.5 text-sm text-dark-300">
				{t('Store and edit key-value data used by action handlers.')}
			</p>
		</div>
		<Button icon="ri:add-line" disabled={collectionsApi == null} onclick={openCreateCollection}>
			{t('Create collection')}
		</Button>
	</div>

	<Panel tone="solid" class="p-2">
		{#if collectionsApi == null}
			<p class="px-3 py-6 text-center text-sm text-dark-300">
				{t('Core plugin unavailable')}
			</p>
		{:else if collections.length === 0}
			<EmptyState
				icon="ri:database-2-line"
				title={t('No collections yet')}
				description={t('Create a collection to store key-value data for your actions.')}
				actionLabel={t('Create collection')}
				onAction={openCreateCollection}
			/>
		{:else}
			{#each collections as collection (collection.collectionName)}
				<div
					class="flex items-center justify-between gap-3 rounded-none px-3 py-2.5 hover:bg-dark-700/50"
				>
					<div class="flex min-w-0 items-center gap-3">
						<div
							class="flex size-8 shrink-0 items-center justify-center border border-rule text-primary"
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
						<Badge variant={collection.lifetime === 'session' ? 'secondary' : 'success'} size="sm">
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
		{/if}
	</Panel>
</section>
