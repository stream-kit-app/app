import type { PluginAppApi, PluginAppRecordCollectionApi, PluginStore } from '@stream-kit/plugin';

import type { RoleRecord } from '../roles/app/lib/stored-role';

export const ROLES_STORE_KEY = 'roles';
const LEGACY_GROUPS_STORE_KEY = 'groups';
const RECORDS_MIGRATION_KEY = '__records_migrated_roles_v1';

function isSyncId(id: string): boolean {
	return /^[a-z0-9]{15}$/.test(id);
}

async function migrateRoles(store: PluginStore, records: PluginAppRecordCollectionApi): Promise<void> {
	if (await store.get<boolean>(RECORDS_MIGRATION_KEY)) {
		return;
	}

	const existing = await records.list();
	if (existing.length > 0) {
		await store.set(RECORDS_MIGRATION_KEY, true);
		await store.delete(ROLES_STORE_KEY);
		await store.delete(LEGACY_GROUPS_STORE_KEY);
		return;
	}

	const roles = await store.get<RoleRecord[]>(ROLES_STORE_KEY);
	const legacy = roles ?? (await store.get<RoleRecord[]>(LEGACY_GROUPS_STORE_KEY));

	if (Array.isArray(legacy)) {
		for (const role of legacy) {
			const { id, ...data } = role;
			await records.create(isSyncId(id) ? { ...data, id } : data);
		}
	}

	await store.set(RECORDS_MIGRATION_KEY, true);
	await store.delete(ROLES_STORE_KEY);
	await store.delete(LEGACY_GROUPS_STORE_KEY);
}

export async function loadRoles(store: PluginStore, app: PluginAppApi): Promise<RoleRecord[]> {
	const records = app.records.open<RoleRecord>('roles');
	await migrateRoles(store, records);

	return records.list<RoleRecord>();
}

export async function saveRoles(app: PluginAppApi, roles: RoleRecord[]): Promise<void> {
	const records = app.records.open<RoleRecord>('roles');
	const existing = await records.list();

	for (const role of roles) {
		const { id, ...data } = role;
		if (await records.get(id)) {
			await records.update(id, data);
		} else {
			const created = await records.create({ ...data, id });
			role.id = created.id;
		}
	}

	const nextIds = new Set(roles.map((role) => role.id));
	await Promise.all(
		existing.filter((record) => !nextIds.has(record.id)).map((record) => records.delete(record.id))
	);
}
