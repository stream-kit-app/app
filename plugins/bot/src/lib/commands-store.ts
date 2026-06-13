import type { PluginStore } from '@stream-kit/plugin';
import type { CommandRecord } from '../commands/app/lib/stored-command';

export const COMMANDS_STORE_KEY = 'commands';

type StoredCommandRecord = Omit<CommandRecord, 'createdAt' | 'updatedAt'> & {
	createdAt: string;
	updatedAt: string;
};

function serialize(record: CommandRecord): StoredCommandRecord {
	return {
		...record,
		createdAt: record.createdAt.toISOString(),
		updatedAt: record.updatedAt.toISOString()
	};
}

function deserialize(raw: StoredCommandRecord): CommandRecord {
	return {
		...raw,
		createdAt: new Date(raw.createdAt),
		updatedAt: new Date(raw.updatedAt)
	};
}

export async function loadCommands(store: PluginStore): Promise<CommandRecord[]> {
	const stored = await store.get<StoredCommandRecord[]>(COMMANDS_STORE_KEY);

	if (!Array.isArray(stored)) {
		return [];
	}

	return stored.map(deserialize);
}

export async function saveCommands(
	store: PluginStore,
	commands: CommandRecord[]
): Promise<void> {
	await store.set(COMMANDS_STORE_KEY, commands.map(serialize));
}

export function normalizeCommandText(value: string): string {
	return value.trim().replace(/^!+/, '').toLowerCase();
}

export function normalizeCommandNames(values: string[]): string[] {
	return [...new Set(values.map(normalizeCommandText).filter(Boolean))];
}
