import type { CollectionLifetime, CorePluginCollectionsApi } from '$lib/types/core-plugin-api';

import { getApp } from '$lib/core/registry';
import { translate } from '$lib/i18n';

/** Shared state for the create-collection modal content and footer. */
export class CollectionCreateFormModel {
	collectionName = $state('');
	lifetime = $state<CollectionLifetime>('session');
	saving = $state(false);

	constructor(
		readonly modalId: string,
		readonly collectionsApi?: CorePluginCollectionsApi
	) {}

	get canSave(): boolean {
		return this.collectionName.trim().length > 0 && !this.saving && this.collectionsApi != null;
	}

	close(): void {
		getApp().modals.get(this.modalId)?.close();
	}

	private createErrorMessage(reason: 'already-exists' | 'invalid-name'): string {
		switch (reason) {
			case 'already-exists':
				return translate('A collection with this name already exists.');
			case 'invalid-name':
				return translate('Collection name is required.');
		}
	}

	async create(): Promise<void> {
		const collectionsApi = this.collectionsApi;

		if (!this.canSave || !collectionsApi) {
			return;
		}

		this.saving = true;

		try {
			const name = this.collectionName.trim();
			const result = await collectionsApi.create(name, this.lifetime);

			if (!result.ok) {
				getApp().toast.create({
					title: translate('Create collection'),
					description: this.createErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			getApp().toast.create({
				title: translate('Collection created'),
				description: name,
				variant: 'success'
			});
			this.close();
		} finally {
			this.saving = false;
		}
	}
}
