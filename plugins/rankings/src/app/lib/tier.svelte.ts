import type { Modal } from '@stream-kit/plugin/action';

import type { TierRecord } from '../../lib/types';

import TierForm from '../ui/tier-form.svelte';
import TierFormFooter from '../ui/tier-form-footer.svelte';
import { getRankingsService } from './get-rankings';
import { validateTierForm, type TierFormErrors } from './validate-tier-form';

export type TierProps = {
	id?: string;
	name?: string;
	sortOrder?: number;
	icon?: string;
};

export class Tier {
	id?: string;
	modalId?: string;
	name: string = $state('');
	sortOrder?: number;
	icon?: string;
	formErrors: TierFormErrors | null = $state(null);

	constructor(props: TierProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.sortOrder = props.sortOrder;
		this.icon = props.icon;
	}

	static createDraft(): Tier {
		return new Tier();
	}

	static fromRecord(record: TierRecord): Tier {
		return new Tier({
			id: record.id,
			name: record.name,
			sortOrder: record.sortOrder,
			icon: record.icon
		});
	}

	open(): Modal {
		const app = getRankingsService().requireApp();
		this.modalId =
			this.id != null ? `rankings-tier-${this.id}` : `rankings-tier-draft-${crypto.randomUUID()}`;

		const modal =
			app.modal.get(this.modalId) ??
			app.modal.create({
				id: this.modalId,
				title:
					this.id != null
						? app.i18n.translate('Edit {name}', { name: this.name })
						: app.i18n.translate('New tier'),
				size: 'xs',
				content: TierForm,
				footer: TierFormFooter,
				props: { tier: this }
			});

		modal.open();
		this.formErrors = null;

		return modal;
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getRankingsService().requireApp().modal.get(this.modalId)?.close();
	}

	validateForm(): boolean {
		const app = getRankingsService().requireApp();
		this.formErrors = validateTierForm({ name: this.name }, app.i18n.translate);

		return this.formErrors == null;
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		const rankings = getRankingsService();
		const app = rankings.requireApp();

		try {
			if (this.id == null) {
				await rankings.createTier({ name: this.name, icon: this.icon });
				app.toast.create({
					title: app.i18n.translate('Tier created'),
					description: app.i18n.translate('The tier has been created successfully'),
					variant: 'success'
				});
			} else {
				await rankings.updateTier(this.id, { name: this.name, icon: this.icon });
				app.toast.create({
					title: app.i18n.translate('Tier saved'),
					description: app.i18n.translate('The tier has been saved successfully'),
					variant: 'success'
				});
			}

			this.close();
			return true;
		} catch (error) {
			app.toast.create({
				title: app.i18n.translate('Could not save tier'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});

			return false;
		}
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		const rankings = getRankingsService();
		const app = rankings.requireApp();

		try {
			await rankings.deleteTier(this.id);
			app.toast.create({
				title: app.i18n.translate('Tier deleted'),
				description: app.i18n.translate('The tier has been deleted successfully'),
				variant: 'success'
			});
			this.close();
		} catch (error) {
			app.toast.create({
				title: app.i18n.translate('Could not delete tier'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}
}
