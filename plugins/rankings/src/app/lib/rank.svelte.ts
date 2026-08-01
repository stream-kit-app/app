import type { Modal } from '@stream-kit/plugin/action';

import type { RankRecord } from '../../lib/types';

import RankForm from '../ui/rank-form.svelte';
import RankFormFooter from '../ui/rank-form-footer.svelte';
import { getRankingsService } from './get-rankings';
import { validateRankForm, type RankFormErrors } from './validate-rank-form';

export type RankProps = {
	id: string;
	tierId: string;
	name?: string;
	pointsRequired?: number;
	sortOrder?: number;
	icon?: string;
	color?: string;
};

export class Rank {
	id: string;
	tierId: string;
	modalId?: string;
	name: string = $state('');
	pointsRequired: number = $state(0);
	/** string form field for the points input */
	pointsRequiredInput: string = $state('0');
	sortOrder?: number;
	icon: string | undefined = $state(undefined);
	color?: string;
	formErrors: RankFormErrors | null = $state(null);

	constructor(props: RankProps) {
		this.id = props.id;
		this.tierId = props.tierId;
		this.name = props.name ?? '';
		this.pointsRequired = props.pointsRequired ?? 0;
		this.pointsRequiredInput = String(props.pointsRequired ?? 0);
		this.sortOrder = props.sortOrder;
		this.icon = props.icon;
		this.color = props.color;
	}

	static fromRecord(record: RankRecord): Rank {
		return new Rank({
			id: record.id,
			tierId: record.tierId,
			name: record.name,
			pointsRequired: record.pointsRequired,
			sortOrder: record.sortOrder,
			icon: record.icon,
			color: record.color
		});
	}

	open(): Modal {
		const app = getRankingsService().requireApp();
		this.modalId = `rankings-rank-${this.id}`;
		const title = app.i18n.translate('Edit {name}', { name: this.name });

		let modal = app.modal.get(this.modalId);

		if (!modal) {
			modal = app.modal.create({
				id: this.modalId,
				title,
				size: 'md',
				content: RankForm,
				footer: RankFormFooter,
				props: { rank: this }
			});
		} else {
			modal.title = title;
			modal.size = 'md';
			modal.props = { rank: this };
		}

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
		this.formErrors = validateRankForm(
			{ name: this.name, pointsRequired: this.pointsRequiredInput },
			app.i18n.translate
		);

		return this.formErrors == null;
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		const rankings = getRankingsService();
		const app = rankings.requireApp();

		try {
			await rankings.updateRank(this.id, {
				name: this.name,
				pointsRequired: Number(this.pointsRequiredInput),
				icon: this.icon?.trim() ? this.icon.trim() : undefined
			});
			app.toast.create({
				title: app.i18n.translate('Rank saved'),
				description: app.i18n.translate('The rank has been saved successfully'),
				variant: 'success'
			});
			this.close();
			return true;
		} catch (error) {
			app.toast.create({
				title: app.i18n.translate('Could not save rank'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});

			return false;
		}
	}
}
