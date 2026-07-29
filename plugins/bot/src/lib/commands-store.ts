import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';
import { migrateStoreArrayToRecords } from '@stream-kit/plugin';
import type { CommandRecord } from '../commands/app/lib/stored-command';
import { DEFAULT_COMMAND_GROUP } from '../commands/app/lib/stored-command';

export const COMMANDS_STORE_KEY = 'commands';
export const COMMANDS_COLLECTION = 'commands';

type LegacyStoredCommandRecord = Omit<
	CommandRecord,
	'createdAt' | 'updatedAt' | 'group' | 'groupSortOrder' | 'sortOrder'
> & {
	createdAt: string;
	updatedAt: string;
	group?: string;
	groupSortOrder?: number;
	sortOrder?: number;
};

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

function deserialize(raw: LegacyStoredCommandRecord, index: number): CommandRecord {
	return {
		...raw,
		group: raw.group?.trim() || DEFAULT_COMMAND_GROUP,
		groupSortOrder: raw.groupSortOrder ?? 0,
		sortOrder: raw.sortOrder ?? index,
		createdAt: new Date(raw.createdAt),
		updatedAt: new Date(raw.updatedAt)
	};
}

function rowToCommand(
	row: Record<string, unknown> & { id: string },
	index: number
): CommandRecord {
	return deserialize(row as unknown as LegacyStoredCommandRecord, index);
}

export async function migrateCommandsToRecords(
	app: PluginAppApi,
	store: PluginStore
): Promise<void> {
	await migrateStoreArrayToRecords(app, store, {
		collection: COMMANDS_COLLECTION,
		storeKey: COMMANDS_STORE_KEY,
		mapItem: (item) => {
			const record = item as unknown as LegacyStoredCommandRecord;
			return serialize(deserialize(record, 0)) as unknown as Record<string, unknown>;
		}
	});
}

export async function loadCommands(app: PluginAppApi): Promise<CommandRecord[]> {
	const rows = await app.records.open(COMMANDS_COLLECTION).list();
	return rows.map((row, index) => rowToCommand(row, index));
}

export async function saveCommands(
	app: PluginAppApi,
	commands: CommandRecord[]
): Promise<void> {
	const collection = app.records.open(COMMANDS_COLLECTION);
	const existing = await collection.list();
	const existingIds = new Set(existing.map((row) => row.id));
	const nextIds = new Set(commands.map((command) => command.id).filter(Boolean));

	for (const command of commands) {
		const payload = serialize(command) as unknown as Record<string, unknown>;
		if (command.id && existingIds.has(command.id)) {
			await collection.update(command.id, payload);
		} else {
			const created = await collection.create(payload);
			command.id = created.id;
		}
	}

	for (const row of existing) {
		if (!nextIds.has(row.id)) {
			await collection.delete(row.id);
		}
	}
}

export function normalizeCommandText(value: string): string {
	return value.trim().replace(/^!+/, '').toLowerCase();
}

export function normalizeCommandNames(values: string[]): string[] {
	return [...new Set(values.map(normalizeCommandText).filter(Boolean))];
}
