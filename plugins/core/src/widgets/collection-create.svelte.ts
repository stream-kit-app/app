import type { CorePluginApi } from '../lib/plugin-api';
import type { CollectionLifetime } from '../lib/collections/types';
import type { PluginAppApi } from '@stream-kit/plugin';

export class CollectionCreateForm {
	collectionName = $state('');
	lifetime = $state<CollectionLifetime>('session');
	saving = $state(false);

	constructor(
		readonly app: PluginAppApi,
		readonly modalId: string
	) {}

	get collectionsApi() {
		return this.app.plugins.tryGet<CorePluginApi>('core')?.collections;
	}

	get canSave(): boolean {
		return this.collectionName.trim().length > 0 && !this.saving && this.collectionsApi != null;
	}

	close(): void {
		this.app.modal.get(this.modalId)?.close();
	}

	private createErrorMessage(reason: 'already-exists' | 'invalid-name'): string {
		const t = this.app.i18n.t;

		switch (reason) {
			case 'already-exists':
				return t('A collection with this name already exists.');
			case 'invalid-name':
				return t('Collection name is required.');
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
				this.app.toast.create({
					title: this.app.i18n.t('Create collection'),
					description: this.createErrorMessage(result.reason),
					variant: 'warning'
				});
				return;
			}

			this.app.toast.create({
				title: this.app.i18n.t('Collection created'),
				description: name,
				variant: 'success'
			});
			this.close();
		} finally {
			this.saving = false;
		}
	}
}
