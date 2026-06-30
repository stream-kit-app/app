import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { DatabaseSync } from 'node:sqlite';

const appData =
	process.platform === 'win32'
		? join(process.env.APPDATA, 'app.stream-kit')
		: join(homedir(), '.local', 'share', 'app.stream-kit');

const db = new DatabaseSync(join(appData, 'app.db'));
const rows = db.prepare('SELECT id, name, handlers, triggers FROM actions').all();

let staleHandlers = 0;
let staleTriggers = 0;

for (const row of rows) {
	if (row.handlers.includes('core:core:map:')) {
		staleHandlers += 1;
		console.log('handler', row.id, row.name);
	}

	if (row.triggers.includes('core:core:map:')) {
		staleTriggers += 1;
		console.log('trigger', row.id, row.name);
	}
}

console.log({ staleHandlers, staleTriggers, total: rows.length });
db.close();

for (const file of ['plugin.core.json', 'plugin.bot.json']) {
	const path = join(appData, file);
	const raw = readFileSync(path, 'utf8');
	const idMatches = raw.match(/core:core:map:[a-z0-9-]+/g) ?? [];
	const fieldMatches = raw.match(/"map-name"/g) ?? [];
	const mapNameMatches = raw.match(/\{mapName\}/g) ?? [];

	if (idMatches.length > 0 || fieldMatches.length > 0 || mapNameMatches.length > 0) {
		console.log(file, {
			staleIds: [...new Set(idMatches)],
			mapNameFields: fieldMatches.length,
			mapNameText: mapNameMatches.length
		});
	}
}
