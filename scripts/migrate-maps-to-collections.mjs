#!/usr/bin/env node
/**
 * One-time local migration: Maps → Collections.
 *
 * Migrates:
 * - app.db actions (handler/trigger IDs, field keys, condition keys, {mapName} text)
 * - app.db dashboard_widgets (core:maps → core:collections)
 * - plugin.*.json (maps key → collections; bot command/timer handlers)
 *
 * Usage (from repo root, app closed):
 *   node scripts/migrate-maps-to-collections.mjs
 *   node scripts/migrate-maps-to-collections.mjs --db "C:/path/to/app.db"
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { pathToFileURL } from 'node:url';

const DEFINITION_ID_REPLACEMENTS = [
	['core:core:map:map-value-changed', 'core:core:collection:collection-value-changed'],
	['core:core:map:map-created', 'core:core:collection:collection-created'],
	['core:core:map:create-map', 'core:core:collection:create-collection'],
	['core:core:map:clear-map', 'core:core:collection:clear-collection'],
	['core:core:map:delete-map', 'core:core:collection:delete-collection'],
	['core:core:map:', 'core:core:collection:'],
	['core:core.map.map-value-changed', 'core:core.collection.collection-value-changed'],
	['core:core.map.map-created', 'core:core.collection.collection-created'],
	['core:core.map.create-map', 'core:core.collection.create-collection'],
	['core:core.map.clear-map', 'core:core.collection.clear-collection'],
	['core:core.map.delete-map', 'core:core.collection.delete-collection'],
	['core:core.map.', 'core:core.collection.'],
	['core:maps', 'core:collections']
];

function migrateDefinitionId(id) {
	let result = id;

	for (const [from, to] of DEFINITION_ID_REPLACEMENTS) {
		result = result.replaceAll(from, to);
	}

	return result;
}

function migrateFieldKey(key) {
	return key === 'map-name' ? 'collection-name' : key;
}

function migrateInterpolatedText(value) {
	return value.replaceAll('{mapName}', '{collectionName}');
}

function migrateFieldValue(value) {
	if (typeof value === 'string') {
		return migrateInterpolatedText(value);
	}

	if (Array.isArray(value)) {
		return value.map((entry) => ({
			key: migrateInterpolatedText(entry.key),
			value: migrateInterpolatedText(entry.value)
		}));
	}

	if (value && typeof value === 'object' && 'variant' in value && 'values' in value) {
		const nextValues = {};

		for (const [key, nestedValue] of Object.entries(value.values)) {
			nextValues[migrateFieldKey(key)] = migrateFieldValue(nestedValue);
		}

		return {
			variant: value.variant,
			values: nextValues
		};
	}

	if (value && typeof value === 'object' && 'path' in value && 'value' in value) {
		return {
			...value,
			path: migrateInterpolatedText(String(value.path)),
			value: migrateInterpolatedText(String(value.value))
		};
	}

	if (value && typeof value === 'object' && 'value' in value) {
		return {
			...value,
			value: migrateInterpolatedText(String(value.value))
		};
	}

	return value;
}

function migrateHandlerField(field) {
	return {
		...field,
		key: migrateFieldKey(field.key),
		value: migrateFieldValue(field.value)
	};
}

function migrateConditionNode(node) {
	if (node.kind === 'group') {
		return {
			...node,
			children: node.children.map(migrateConditionNode)
		};
	}

	return {
		...node,
		key: migrateFieldKey(node.key),
		value: migrateFieldValue(node.value)
	};
}

function migrateHandler(stored) {
	return {
		...stored,
		handlerTypeId: migrateDefinitionId(stored.handlerTypeId),
		fields: stored.fields.map(migrateHandlerField),
		config: stored.config ? migrateConditionNode(stored.config) : undefined
	};
}

function migrateTrigger(stored) {
	return {
		...stored,
		triggerTypeId: migrateDefinitionId(stored.triggerTypeId),
		conditions: migrateConditionNode(stored.conditions)
	};
}

function migrateStoredJsonArray(raw, migrateItem) {
	if (!raw.includes('map')) {
		return raw;
	}

	let parsed;

	try {
		parsed = JSON.parse(raw);
	} catch {
		return raw;
	}

	if (!Array.isArray(parsed)) {
		return raw;
	}

	return JSON.stringify(parsed.map(migrateItem));
}

function migratePluginStoreMapsKey(store) {
	if (!store || typeof store !== 'object') {
		return { migrated: false, collectionCount: 0 };
	}

	if (!Object.hasOwn(store, 'maps')) {
		return {
			migrated: false,
			collectionCount: Object.hasOwn(store, 'collections')
				? Object.keys(store.collections).length
				: 0
		};
	}

	const maps = store.maps;

	if (maps && typeof maps === 'object' && !Object.hasOwn(store, 'collections')) {
		store.collections = maps;
	}

	delete store.maps;

	return {
		migrated: true,
		collectionCount:
			store.collections && typeof store.collections === 'object'
				? Object.keys(store.collections).length
				: 0
	};
}

function defaultDbPath() {
	if (process.platform === 'win32') {
		return join(process.env.APPDATA ?? join(homedir(), 'AppData', 'Roaming'), 'app.stream-kit', 'app.db');
	}

	if (process.platform === 'darwin') {
		return join(homedir(), 'Library', 'Application Support', 'app.stream-kit', 'app.db');
	}

	return join(homedir(), '.local', 'share', 'app.stream-kit', 'app.db');
}

function defaultAppDataDir() {
	return defaultDbPath().replace(/[/\\]app\.db$/, '');
}

function parseArgs(argv) {
	const dbFlagIndex = argv.indexOf('--db');
	const appDataDir =
		process.platform === 'win32'
			? join(process.env.APPDATA ?? join(homedir(), 'AppData', 'Roaming'), 'app.stream-kit')
			: process.platform === 'darwin'
				? join(homedir(), 'Library', 'Application Support', 'app.stream-kit')
				: join(homedir(), '.local', 'share', 'app.stream-kit');

	if (dbFlagIndex === -1) {
		return { dbPath: join(appDataDir, 'app.db'), appDataDir };
	}

	return {
		dbPath: argv[dbFlagIndex + 1],
		appDataDir
	};
}

function migrateDatabase(dbPath) {
	if (!existsSync(dbPath)) {
		console.log(`Database not found: ${dbPath}`);
		return { actionUpdates: 0, widgetUpdates: 0 };
	}

	const db = new DatabaseSync(dbPath);
	let actionUpdates = 0;
	let widgetUpdates = 0;

	const widgetTable = db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'dashboard_widgets'`).get();

	if (widgetTable) {
		const widgetResult = db
			.prepare(`UPDATE dashboard_widgets SET definition_id = 'core:collections' WHERE definition_id = 'core:maps'`)
			.run();
		widgetUpdates = widgetResult.changes;
	}

	const actionTable = db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'actions'`).get();

	if (actionTable) {
		const rows = db.prepare('SELECT id, triggers, handlers FROM actions').all();

		const update = db.prepare('UPDATE actions SET triggers = ?, handlers = ? WHERE id = ?');

		for (const row of rows) {
			const triggers = migrateStoredJsonArray(row.triggers, migrateTrigger);
			const handlers = migrateStoredJsonArray(row.handlers, migrateHandler);

			if (triggers !== row.triggers || handlers !== row.handlers) {
				update.run(triggers, handlers, row.id);
				actionUpdates += 1;
			}
		}
	}

	db.close();

	return { actionUpdates, widgetUpdates };
}

function migratePluginStoreFile(storePath) {
	if (!existsSync(storePath)) {
		return { migrated: false, commandUpdates: 0, timerUpdates: 0, mapsMigrated: false, collectionCount: 0 };
	}

	const raw = readFileSync(storePath, 'utf8');
	const store = JSON.parse(raw);
	let commandUpdates = 0;
	let timerUpdates = 0;

	if (Array.isArray(store.commands)) {
		store.commands = store.commands.map((command) => {
			if (!Array.isArray(command.handlers)) {
				return command;
			}

			const handlers = command.handlers.map(migrateHandler);
			const changed = JSON.stringify(handlers) !== JSON.stringify(command.handlers);

			if (changed) {
				commandUpdates += 1;
			}

			return changed ? { ...command, handlers } : command;
		});
	}

	if (Array.isArray(store.timers)) {
		store.timers = store.timers.map((timer) => {
			if (!Array.isArray(timer.handlers)) {
				return timer;
			}

			const handlers = timer.handlers.map(migrateHandler);
			const changed = JSON.stringify(handlers) !== JSON.stringify(timer.handlers);

			if (changed) {
				timerUpdates += 1;
			}

			return changed ? { ...timer, handlers } : timer;
		});
	}

	const mapsResult = migratePluginStoreMapsKey(store);
	const migrated = commandUpdates > 0 || timerUpdates > 0 || mapsResult.migrated;

	if (migrated) {
		writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
	}

	return {
		migrated,
		commandUpdates,
		timerUpdates,
		mapsMigrated: mapsResult.migrated,
		collectionCount: mapsResult.collectionCount
	};
}

function migrateAllPluginStores(appDataDir) {
	const results = [];

	if (!existsSync(appDataDir)) {
		return results;
	}

	for (const entry of readdirSync(appDataDir)) {
		if (!entry.startsWith('plugin.') || !entry.endsWith('.json')) {
			continue;
		}

		const storePath = join(appDataDir, entry);
		const result = migratePluginStoreFile(storePath);

		if (result.migrated) {
			results.push({ file: entry, ...result });
		}
	}

	return results;
}

function main() {
	const { dbPath, appDataDir } = parseArgs(process.argv.slice(2));

	console.log('Maps → Collections migration');
	console.log(`Database: ${dbPath}`);
	console.log(`App data: ${appDataDir}`);

	const { actionUpdates, widgetUpdates } = migrateDatabase(dbPath);
	const pluginResults = migrateAllPluginStores(appDataDir);

	console.log('');
	console.log(`Updated ${actionUpdates} action(s)`);
	console.log(`Updated ${widgetUpdates} dashboard widget(s)`);

	if (pluginResults.length === 0) {
		console.log('No plugin store files needed migration.');
	} else {
		for (const result of pluginResults) {
			console.log(
				`${result.file}: ${result.commandUpdates} command(s), ${result.timerUpdates} timer(s)` +
					(result.mapsMigrated ? `, maps → collections (${result.collectionCount})` : '')
			);
		}
	}

	console.log('Done.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main();
}
