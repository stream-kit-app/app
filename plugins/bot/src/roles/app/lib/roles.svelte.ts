import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';

import { loadRoles, saveRoles } from '../../../lib/roles-store';
import {
	formatPlatformUserId,
	memberMatchesIdentity,
	parsePlatformFromUserId
} from '../../lib/extract-user';
import type { RolePlatform, RoleRecord } from './stored-role';

export class Roles {
	roles: RoleRecord[] = $state([]);
	private store?: PluginStore;
	private app?: PluginAppApi;
	private unsubscribeRecords?: () => void;

	bind(store: PluginStore, app: PluginAppApi): void {
		if (this.store === store && this.app === app) {
			return;
		}

		this.unsubscribeRecords?.();
		this.store = store;
		this.app = app;
		this.unsubscribeRecords = app.records.open('roles').onChange(() => {
			void this.load();
		});
	}

	get isReady(): boolean {
		return this.store != null && this.app != null;
	}

	requireApp(): PluginAppApi {
		return this.requireContext().app;
	}

	private requireContext(): { store: PluginStore; app: PluginAppApi } {
		if (!this.store || !this.app) {
			throw new Error('Roles service has not been bound to a plugin store');
		}

		return { store: this.store, app: this.app };
	}

	async load(): Promise<void> {
		const { store, app } = this.requireContext();
		await app.waitForConfigSync();
		this.roles = await loadRoles(store, app);
	}

	async persist(): Promise<void> {
		const { app } = this.requireContext();
		await saveRoles(app, this.roles);
	}

	create(name: string): RoleRecord {
		const trimmed = name.trim();

		if (!trimmed) {
			throw new Error('Role name is required');
		}

		const now = new Date().toISOString();
		const role: RoleRecord = {
			id: crypto.randomUUID().replaceAll('-', '').slice(0, 15),
			name: trimmed,
			memberIds: [],
			memberNames: {},
			createdAt: now,
			updatedAt: now
		};

		this.roles = [...this.roles, role];
		void this.persist();

		return role;
	}

	update(id: string, input: { name: string }): RoleRecord {
		const index = this.roles.findIndex((role) => role.id === id);

		if (index === -1) {
			throw new Error('Role not found');
		}

		const trimmed = input.name.trim();

		if (!trimmed) {
			throw new Error('Role name is required');
		}

		const updated: RoleRecord = {
			...this.roles[index],
			name: trimmed,
			updatedAt: new Date().toISOString()
		};

		const next = [...this.roles];
		next[index] = updated;
		this.roles = next;
		void this.persist();

		return updated;
	}

	delete(id: string): void {
		this.roles = this.roles.filter((role) => role.id !== id);
		void this.persist();
	}

	addMember(
		roleId: string,
		input: { userId?: string; username: string; platform?: RolePlatform }
	): RoleRecord {
		const index = this.roles.findIndex((role) => role.id === roleId);

		if (index === -1) {
			throw new Error('Role not found');
		}

		const username = input.username.trim();

		if (!username) {
			throw new Error('Username is required');
		}

		const platform = input.platform ?? 'twitch';
		const userId =
			input.userId?.trim() || formatPlatformUserId(platform, username.toLowerCase());
		const role = this.roles[index];

		if (role.memberIds.some((memberId) => memberId === userId)) {
			return role;
		}

		const updated: RoleRecord = {
			...role,
			memberIds: [...role.memberIds, userId],
			memberNames: {
				...role.memberNames,
				[userId]: username
			},
			updatedAt: new Date().toISOString()
		};

		const next = [...this.roles];
		next[index] = updated;
		this.roles = next;
		void this.persist();

		return updated;
	}

	removeMember(roleId: string, userIdOrUsername: string): RoleRecord {
		const index = this.roles.findIndex((role) => role.id === roleId);

		if (index === -1) {
			throw new Error('Role not found');
		}

		const role = this.roles[index];
		const query = userIdOrUsername.trim();
		const memberId = role.memberIds.find((id) =>
			memberMatchesIdentity(id, role.memberNames[id], {
				userId: query.includes(':')
					? query
					: formatPlatformUserId('twitch', query.toLowerCase()),
				username: query
			})
		);

		if (!memberId) {
			return role;
		}

		const { [memberId]: _removed, ...memberNames } = role.memberNames;
		const updated: RoleRecord = {
			...role,
			memberIds: role.memberIds.filter((id) => id !== memberId),
			memberNames,
			updatedAt: new Date().toISOString()
		};

		const next = [...this.roles];
		next[index] = updated;
		this.roles = next;
		void this.persist();

		return updated;
	}

	isMember(
		roleId: string,
		identity: { userId?: string; username?: string; platform?: RolePlatform }
	): boolean {
		const role = this.roles.find((entry) => entry.id === roleId);

		if (!role) {
			return false;
		}

		const userId =
			identity.userId?.trim() ||
			(identity.username
				? formatPlatformUserId(identity.platform ?? 'twitch', identity.username.toLowerCase())
				: '');

		if (!userId && !identity.username) {
			return false;
		}

		return role.memberIds.some((memberId) =>
			memberMatchesIdentity(memberId, role.memberNames[memberId], {
				userId: userId || memberId,
				username: identity.username,
				platform: identity.platform ?? parsePlatformFromUserId(userId || memberId)
			})
		);
	}

	findByName(name: string): RoleRecord | undefined {
		const trimmed = name.trim().toLowerCase();

		return this.roles.find((role) => role.name.trim().toLowerCase() === trimmed);
	}

	memberLabel(role: RoleRecord, memberId: string): string {
		return role.memberNames[memberId] ?? memberId;
	}
}
