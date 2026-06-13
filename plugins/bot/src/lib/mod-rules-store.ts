import type { PluginStore } from '@stream-kit/plugin';
import type { ModRuleRecord } from '../moderation/app/lib/stored-mod-rule';

export const MOD_RULES_STORE_KEY = 'modRules';

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

export async function loadModRules(store: PluginStore): Promise<ModRuleRecord[]> {
	const stored = await store.get<StoredModRuleRecord[]>(MOD_RULES_STORE_KEY);

	if (!Array.isArray(stored)) {
		return [];
	}

	return stored.map(deserialize);
}

export async function saveModRules(
	store: PluginStore,
	rules: ModRuleRecord[]
): Promise<void> {
	await store.set(MOD_RULES_STORE_KEY, rules.map(serialize));
}
