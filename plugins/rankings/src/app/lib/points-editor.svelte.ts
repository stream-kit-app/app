import type { Modal } from '@stream-kit/plugin/action';

import type { UserRankingRecord } from '../../lib/types';

import PointsForm from '../ui/points-form.svelte';
import PointsFormFooter from '../ui/points-form-footer.svelte';
import { getRankingsService } from './get-rankings';

export class PointsEditor {
	userId: string;
	username: string;
	platform: UserRankingRecord['platform'];
	currentPoints: number;
	modalId?: string;
	amount: string = $state('');
	error: string | null = $state(null);
	isSaving = $state(false);

	constructor(record: UserRankingRecord) {
		this.userId = record.userId;
		this.username = record.username;
		this.platform = record.platform;
		this.currentPoints = record.totalPoints;
		this.amount = String(record.totalPoints);
	}

	static fromRecord(record: UserRankingRecord): PointsEditor {
		return new PointsEditor(record);
	}

	open(): Modal {
		const app = getRankingsService().requireApp();
		this.modalId = `rankings-points-${this.userId}`;
		app.modal.get(this.modalId)?.close();

		const modal = app.modal.create({
			id: this.modalId,
			title: app.i18n.translate('Edit points'),
			description: this.username,
			size: 'xs',
			content: PointsForm,
			footer: PointsFormFooter,
			props: { editor: this }
		});

		modal.open();

		return modal;
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getRankingsService().requireApp().modal.get(this.modalId)?.close();
	}

	async save(): Promise<boolean> {
		const rankings = getRankingsService();
		const app = rankings.requireApp();
		const amount = Number(this.amount.trim());

		if (this.amount.trim() === '' || !Number.isFinite(amount) || amount < 0) {
			this.error = app.i18n.translate('Points must be a valid number');
			return false;
		}

		this.error = null;
		this.isSaving = true;

		try {
			await rankings.setPoints({
				userId: this.userId,
				username: this.username,
				platform: this.platform,
				amount: Math.floor(amount),
				source: 'manual'
			});
			app.toast.create({
				title: app.i18n.translate('Points updated'),
				description: app.i18n.translate('{name} now has {points} points.', {
					name: this.username,
					points: Math.floor(amount)
				}),
				variant: 'success'
			});
			this.close();

			return true;
		} catch (error) {
			app.toast.create({
				title: app.i18n.translate('Could not update points'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});

			return false;
		} finally {
			this.isSaving = false;
		}
	}
}
