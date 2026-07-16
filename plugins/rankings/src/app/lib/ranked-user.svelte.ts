import type { Modal } from '@stream-kit/plugin/action';

import type { UserRankingRecord } from '../../lib/types';

import UserDetail from '../ui/user-detail.svelte';
import UserDetailFooter from '../ui/user-detail-footer.svelte';
import { getRankingsService } from './get-rankings';

export class RankedUser {
	userId: string;
	username: string;
	platform: UserRankingRecord['platform'];
	modalId?: string;

	constructor(record: UserRankingRecord) {
		this.userId = record.userId;
		this.username = record.username;
		this.platform = record.platform;
	}

	static fromRecord(record: UserRankingRecord): RankedUser {
		return new RankedUser(record);
	}

	open(): Modal {
		const app = getRankingsService().requireApp();
		this.modalId = `rankings-user-${this.userId}`;

		const modal =
			app.modal.get(this.modalId) ??
			app.modal.create({
				id: this.modalId,
				title: this.username,
				description: app.i18n.translate('Point history and stats'),
				size: 'lg',
				content: UserDetail,
				footer: UserDetailFooter,
				props: { rankedUser: this }
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

	async delete(): Promise<void> {
		const rankings = getRankingsService();
		const app = rankings.requireApp();

		try {
			await rankings.deleteUser(this.userId);
			app.toast.create({
				title: app.i18n.translate('User removed'),
				description: app.i18n.translate('The user has been removed from rankings'),
				variant: 'success'
			});
			this.close();
		} catch (error) {
			app.toast.create({
				title: app.i18n.translate('Could not remove user'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}
}
