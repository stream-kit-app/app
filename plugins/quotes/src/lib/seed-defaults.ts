import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';
import type { HandlerFieldInstance } from '@stream-kit/plugin';

import {
	CURRENT_SEED_VERSION,
	loadQuoteRecords,
	loadSeedVersion,
	migrateLegacySeedVersion,
	saveSeedVersion,
	waitForQuotesConfigSync
} from './quotes-store';
import { HANDLER_IDS, PLUGIN_GROUP } from './types';

type SeedHandler = {
	id: string;
	handlerTypeId: string;
	fields: HandlerFieldInstance[];
};

function createHandlerFields(fields: Array<{ key: string; value: HandlerFieldInstance['value'] }>) {
	return fields.map((field) => ({
		id: crypto.randomUUID(),
		key: field.key,
		value: field.value
	}));
}

function createHandler(
	handlerTypeId: string,
	fields: Array<{ key: string; value: HandlerFieldInstance['value'] }>
): SeedHandler {
	return {
		id: crypto.randomUUID(),
		handlerTypeId,
		fields: createHandlerFields(fields)
	};
}

const DEFAULT_COMMANDS: Array<{
	id: string;
	name: string;
	commandNames: string[];
	permissions: { roles: string[] };
	handlers: SeedHandler[];
}> = [
	{
		id: 'quotes:quote',
		name: 'Quote',
		commandNames: ['quote', 'quote <id>'],
		permissions: { roles: ['everyone'] },
		handlers: [
			createHandler(HANDLER_IDS.sendQuoteMessage, [
				{ key: 'quote-id', value: '{id}' },
				{ key: 'message', value: 'Quote #{id}: "{quote}" — {addedBy}' },
				{ key: 'not-found', value: 'Quote #{id} does not exist.' },
				{ key: 'empty', value: 'No quotes saved yet.' },
				{ key: 'as-bot', value: true }
			])
		]
	},
	{
		id: 'quotes:addquote',
		name: 'Add quote',
		commandNames: ['addquote <quote>'],
		permissions: { roles: ['mod'] },
		handlers: [
			createHandler(HANDLER_IDS.addQuote, [
				{ key: 'quote', value: '{quote}' },
				{ key: 'reply', value: 'Quote #{id} added.' },
				{ key: 'as-bot', value: true }
			])
		]
	},
	{
		id: 'quotes:delquote',
		name: 'Delete quote',
		commandNames: ['delquote <id>'],
		permissions: { roles: ['mod'] },
		handlers: [
			createHandler(HANDLER_IDS.deleteQuote, [
				{ key: 'quote-id', value: '{id}' },
				{ key: 'reply', value: 'Quote #{id} deleted.' },
				{ key: 'as-bot', value: true }
			])
		]
	}
];

export async function seedQuotesDefaults(
	app: PluginAppApi,
	_pluginKey: string,
	store: PluginStore
): Promise<void> {
	await migrateLegacySeedVersion(store, app);

	if ((await loadQuoteRecords(app)).length === 0) {
		await waitForQuotesConfigSync(app);
	}

	const seedVersion = await loadSeedVersion(app);

	if (seedVersion >= CURRENT_SEED_VERSION) {
		return;
	}

	for (const preset of DEFAULT_COMMANDS) {
		const exists = app.commands.getSnapshot().some((command) => command.id === preset.id);
		const payload = {
			name: preset.name,
			commandNames: [...preset.commandNames],
			group: PLUGIN_GROUP,
			enabled: false,
			handlers: preset.handlers.map((handler) => ({
				...handler,
				id: crypto.randomUUID(),
				fields: handler.fields.map((field) => ({
					...field,
					id: crypto.randomUUID()
				}))
			})),
			sources: ['twitch' as const],
			permissions: preset.permissions,
			cooldownGlobalMs: null,
			cooldownUserMs: 5000
		};

		if (exists) {
			await app.commands.update(preset.id, payload);
		} else {
			await app.commands.create({ ...payload, id: preset.id });
		}
	}

	await saveSeedVersion(app, CURRENT_SEED_VERSION);
}
