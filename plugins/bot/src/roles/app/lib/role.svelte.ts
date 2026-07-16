import type { Modal } from '@stream-kit/plugin/action';

import { formatPlatformUserId } from '../../lib/extract-user';
import RoleForm from '../ui/role-form.svelte';
import RoleFormFooter from '../ui/role-form-footer.svelte';
import { getRolesService } from './get-roles';
import type { RoleRecord } from './stored-role';

export type RoleFormErrors = {
	name?: string;
};

export type RoleProps = {
	id?: string;
	name?: string;
	memberIds?: string[];
	memberNames?: Record<string, string>;
};

export class Role {
	id?: string;
	modalId?: string;
	name: string = $state('');
	memberIds: string[] = $state([]);
	memberNames: Record<string, string> = $state({});
	formErrors: RoleFormErrors | null = $state(null);

	constructor(props: RoleProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.memberIds = props.memberIds ? [...props.memberIds] : [];
		this.memberNames = props.memberNames ? { ...props.memberNames } : {};
	}

	static createDraft(): Role {
		return new Role();
	}

	static fromRecord(record: RoleRecord): Role {
		return new Role({
			id: record.id,
			name: record.name,
			memberIds: record.memberIds,
			memberNames: record.memberNames
		});
	}

	memberLabel(memberId: string): string {
		return this.memberNames[memberId] ?? memberId;
	}

	open(): Modal {
		const app = getRolesService().requireApp();

		this.modalId =
			this.id != null ? `bot-role-${this.id}` : `bot-role-draft-${crypto.randomUUID()}`;

		const title =
			this.id != null
				? app.i18n.translate('Edit {name}', { name: this.name })
				: app.i18n.translate('New Role');
		const modalProps = { role: this };
		const existing = app.modal.get(this.modalId);

		if (existing) {
			existing.title = title;
			existing.props = modalProps;
			existing.open();
			this.formErrors = null;
			return existing;
		}

		const modal = app.modal.create({
			id: this.modalId,
			title,
			content: RoleForm,
			footer: RoleFormFooter,
			props: modalProps
		});

		modal.open();
		this.formErrors = null;

		return modal;
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getRolesService().requireApp().modal.get(this.modalId)?.close();
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		getRolesService().delete(this.id);
		this.close();
	}

	addMember(username: string): boolean {
		const app = getRolesService().requireApp();
		const trimmed = username.trim();

		if (!trimmed) {
			app.toast.create({
				title: app.i18n.translate('Could not add member'),
				description: app.i18n.translate('Username is required'),
				variant: 'warning'
			});
			return false;
		}

		const memberId = formatPlatformUserId('twitch', trimmed.toLowerCase());

		if (this.memberIds.includes(memberId)) {
			return false;
		}

		this.memberIds = [...this.memberIds, memberId];
		this.memberNames = {
			...this.memberNames,
			[memberId]: trimmed
		};

		return true;
	}

	removeMember(memberId: string): void {
		if (!this.memberIds.includes(memberId)) {
			return;
		}

		const { [memberId]: _removed, ...memberNames } = this.memberNames;
		this.memberIds = this.memberIds.filter((id) => id !== memberId);
		this.memberNames = memberNames;
	}

	validateForm(): boolean {
		const app = getRolesService().requireApp();
		const name = this.name.trim();

		if (!name) {
			this.formErrors = {
				name: app.i18n.translate('Role name required')
			};
			return false;
		}

		this.formErrors = null;
		return true;
	}

	private syncMembers(roleId: string): void {
		const roles = getRolesService();
		const current = roles.roles.find((role) => role.id === roleId);

		if (!current) {
			return;
		}

		const serviceMemberIds = [...current.memberIds];

		for (const memberId of this.memberIds) {
			if (!serviceMemberIds.includes(memberId)) {
				roles.addMember(roleId, {
					userId: memberId,
					username: this.memberNames[memberId] ?? memberId,
					platform: 'twitch'
				});
			}
		}

		for (const memberId of serviceMemberIds) {
			if (!this.memberIds.includes(memberId)) {
				roles.removeMember(roleId, memberId);
			}
		}
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		const app = getRolesService().requireApp();
		const roles = getRolesService();

		try {
			if (this.id == null) {
				const created = roles.create(this.name);
				this.id = created.id;

				for (const memberId of this.memberIds) {
					roles.addMember(created.id, {
						userId: memberId,
						username: this.memberNames[memberId] ?? memberId,
						platform: 'twitch'
					});
				}
			} else {
				roles.update(this.id, { name: this.name });
				this.syncMembers(this.id);
			}

			app.toast.create({
				title: app.i18n.translate('Role saved'),
				description: app.i18n.translate('The role has been saved successfully'),
				variant: 'success'
			});

			this.close();
			return true;
		} catch (error) {
			app.toast.create({
				title: app.i18n.translate('Could not update role'),
				description:
					error instanceof Error
						? error.message
						: app.i18n.translate('Something went wrong.'),
				variant: 'error'
			});
			return false;
		}
	}
}
