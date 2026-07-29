<script lang="ts">
	import type { CorePluginApi } from '../lib/plugin-api';
	import type { PluginAppApi } from '@stream-kit/plugin';

	import { Button } from '@stream-kit/ui/button';

	type Props = {
		app: PluginAppApi;
		collectionName: string;
		modalId: string;
	};

	let { app, collectionName, modalId }: Props = $props();

	const t = $derived(app.i18n.t);
	const collectionsApi = $derived(app.plugins.tryGet<CorePluginApi>('core')?.collections);

	let revision = $state(0);
	let saving = $state(false);

	const trimmedCollectionName = $derived(collectionName.trim());
	const entryCount = $derived.by(() => {
		void revision;

		if (!trimmedCollectionName || !collectionsApi) {
			return 0;
		}

		return collectionsApi.listEntries(trimmedCollectionName).length;
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

	function closeModal(): void {
		app.modal.get(modalId)?.close();
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

	async function handleClearCollection(): Promise<void> {
		if (!collectionsApi || !trimmedCollectionName || saving) {
			return;
		}

		const confirmed = await app.confirm.ask({
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
				app.toast.create({
					title: t('Clear collection'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			app.toast.create({
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

		const confirmed = await app.confirm.ask({
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
				app.toast.create({
					title: t('Delete collection?'),
					description: mutationErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			app.toast.create({
				title: t('Collection deleted'),
				variant: 'success'
			});
			closeModal();
		} finally {
			saving = false;
		}
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex flex-wrap items-center gap-2">
		<Button
			variant="outline"
			icon="ri:eraser-line"
			disabled={saving || entryCount === 0}
			onclick={() => void handleClearCollection()}
		>
			{t('Clear collection')}
		</Button>
		<Button
			variant="destructive"
			icon="ri:delete-bin-line"
			disabled={saving}
			onclick={() => void handleDeleteCollection()}
		>
			{t('Delete')}
		</Button>
	</div>
	<Button variant="ghost" disabled={saving} onclick={closeModal}>{t('Close')}</Button>
</div>
