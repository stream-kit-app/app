import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';
import { migrateStoreArrayToRecords } from '@stream-kit/plugin';
import type { ModRuleRecord } from '../moderation/app/lib/stored-mod-rule';

export const MOD_RULES_STORE_KEY = 'modRules';
export const MOD_RULES_COLLECTION = 'modRules';

type StoredModRuleRecord = Omit<ModRuleRecord, 'createdAt' | 'updatedAt'> & {
	createdAt: string;
	updatedAt: string;
};

function serialize(record: ModRuleRecord): StoredModRuleRecord {
	return {
		...record,
		createdAt: record.createdAt.toISOString(),
		updatedAt: record.updatedAt.toISOString()
	};
}

function deserialize(raw: StoredModRuleRecord): ModRuleRecord {
	return {
		...raw,
		createdAt: new Date(raw.createdAt),
		updatedAt: new Date(raw.updatedAt)
	};
}

export async function migrateModRulesToRecords(
	app: PluginAppApi,
	store: PluginStore
): Promise<void> {
	await migrateStoreArrayToRecords(app, store, {
		collection: MOD_RULES_COLLECTION,
		storeKey: MOD_RULES_STORE_KEY,
		mapItem: (item) => serialize(deserialize(item as StoredModRuleRecord)) as Record<string, unknown>
	});
}

export async function loadModRules(app: PluginAppApi): Promise<ModRuleRecord[]> {
	const rows = await app.records.open(MOD_RULES_COLLECTION).list();

	return rows.map((row) => deserialize(row as StoredModRuleRecord));
}

export async function saveModRules(
	app: PluginAppApi,
	rules: ModRuleRecord[]
): Promise<void> {
	const records = app.records.open(MOD_RULES_COLLECTION);
	const existing = await records.list();

	for (const rule of rules) {
		const { id, ...data } = serialize(rule);
		if (await records.get(id)) {
			await records.update(id, data);
		} else {
			const created = await records.create({ ...data, id });
			rule.id = created.id;
		}
	}

	const currentIds = new Set(rules.map((rule) => rule.id));
	await Promise.all(
		existing.filter((record) => !currentIds.has(record.id)).map((record) => records.delete(record.id))
	);
}
