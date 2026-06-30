<script lang="ts">
	import type { CollectionLifetime, CorePluginCollectionsApi } from '$lib/types/core-plugin-api';

	import { Button } from '@stream-kit/ui/button';
	import { InputSelect, InputText } from '@stream-kit/ui/input';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	type Props = {
		collectionsApi?: CorePluginCollectionsApi;
		modalId?: string;
	};

	let { collectionsApi, modalId = 'collection-create' }: Props = $props();

	const { t } = useI18n();

	let collectionName = $state('');
	let lifetime = $state<CollectionLifetime>('session');
	let saving = $state(false);

	const lifetimeItems = $derived([
		{ value: 'session', label: t('Session') },
		{ value: 'persistent', label: t('Persistent') }
	]);

	const canSave = $derived(collectionName.trim().length > 0 && !saving && collectionsApi != null);

	function createErrorMessage(reason: 'already-exists' | 'invalid-name'): string {
		switch (reason) {
			case 'already-exists':
				return t('A collection with this name already exists.');
			case 'invalid-name':
				return t('Collection name is required.');
		}
	}

	function closeModal(): void {
		getApp().modals.get(modalId)?.close();
	}

	async function handleCreate(): Promise<void> {
		if (!canSave || !collectionsApi) {
			return;
		}

		saving = true;

		try {
			const result = await collectionsApi.create(collectionName.trim(), lifetime);

			if (!result.ok) {
				getApp().toast.create({
					title: t('Create collection'),
					description: createErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			getApp().toast.create({
				title: t('Collection created'),
				description: collectionName.trim(),
				variant: 'success'
			});
			closeModal();
		} finally {
			saving = false;
		}
	}
</script>

<div class="grid gap-5">
	<InputText
		label={t('Collection name')}
		required
		placeholder="myCollection"
		value={collectionName}
		oninput={(event) => (collectionName = event.currentTarget.value)}
	/>
	<InputSelect
		label={t('Lifetime')}
		items={lifetimeItems}
		value={lifetime}
		onValueChange={(value: string) => {
			if (value === 'session' || value === 'persistent') {
				lifetime = value;
			}
		}}
	/>
	{#if lifetime === 'session'}
		<p class="text-sm text-dark-300">
			{t('Session collections are cleared when the app closes.')}
		</p>
	{/if}
</div>

<div class="mt-6 flex flex-wrap justify-end gap-2">
	<Button variant="outline" disabled={saving} onclick={closeModal}>{t('Cancel')}</Button>
	<Button disabled={!canSave} onclick={() => void handleCreate()}>
		{t('Create collection')}
	</Button>
</div>
