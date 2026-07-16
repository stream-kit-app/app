import type { PluginStore } from '@stream-kit/plugin';

import type { RoleRecord } from '../roles/app/lib/stored-role';

export const ROLES_STORE_KEY = 'roles';
const LEGACY_GROUPS_STORE_KEY = 'groups';

export async function loadRoles(store: PluginStore): Promise<RoleRecord[]> {
	const roles = await store.get<RoleRecord[]>(ROLES_STORE_KEY);

	if (roles != null) {
		return roles;
	}

	const legacy = await store.get<RoleRecord[]>(LEGACY_GROUPS_STORE_KEY);

	if (legacy == null) {
		return [];
	}

	await store.set(ROLES_STORE_KEY, legacy);

	return legacy;
}

export async function saveRoles(store: PluginStore, roles: RoleRecord[]): Promise<void> {
	await store.set(ROLES_STORE_KEY, roles);
}
