import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';
import type { HandlerFieldInstance } from '@stream-kit/plugin';

import {
	HANDLER_IDS,
	PLUGIN_GROUP,
	TWITCH_TRIGGER_IDS
} from './types';
import { CURRENT_SEED_VERSION, loadSeedVersion, saveSeedVersion } from './rankings-store';

type SeedHandler = {
	id: string;
	handlerTypeId: string;
	fields: HandlerFieldInstance[];
};

type SeedTrigger = {
	id: string;
	triggerTypeId: string;
	conditions: { kind: 'group'; id: string; children: [] };
};

function createHandlerFields(fields: Array<{ key: string; value: HandlerFieldInstance['value'] }>) {
	return fields.map((field) => ({
		id: crypto.randomUUID(),
		key: field.key,
		value: field.value
	}));
}

function createTrigger(triggerTypeId: string): SeedTrigger {
	return {
		id: crypto.randomUUID(),
		triggerTypeId,
		conditions: { kind: 'group', id: crypto.randomUUID(), children: [] }
	};
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

const DEFAULT_ACTIONS = [
	{
		name: 'Points on follow',
		triggerTypeId: TWITCH_TRIGGER_IDS.follow,
		amount: 25,
		source: 'follow'
	},
	{
		name: 'Points on sub',
		triggerTypeId: TWITCH_TRIGGER_IDS.sub,
		amount: 100,
		source: 'subscription'
	},
	{
		name: 'Points on cheer',
		triggerTypeId: TWITCH_TRIGGER_IDS.cheer,
		amount: 1,
		source: 'cheer'
	},
	{
		name: 'Points on raid',
		triggerTypeId: TWITCH_TRIGGER_IDS.raid,
		amount: 50,
		source: 'raid'
	}
] as const;

const DEFAULT_MESSAGE_COMMANDS = [
	{
		id: 'rankings:rank',
		name: 'Rank',
		commandNames: ['rank'],
		message: '@{username} you are {rank} ({tier}) with {points} points.'
	},
	{
		id: 'rankings:points',
		name: 'Points',
		commandNames: ['points'],
		message: '@{username} you have {points} points.'
	}
] as const;

const DEFAULT_LEADERBOARD_COMMAND = {
	id: 'rankings:leaderboard',
	name: 'Leaderboard',
	commandNames: ['top', 'leaderboard']
} as const;

export async function seedRankingsDefaults(
	app: PluginAppApi,
	pluginKey: string,
	store: PluginStore
): Promise<void> {
	const seedVersion = await loadSeedVersion(app);

	if (seedVersion >= CURRENT_SEED_VERSION) {
		return;
	}

	const ownedActions = app.actions.getSnapshot().filter((action) => action.ownerPluginKey === pluginKey);

	for (const preset of DEFAULT_ACTIONS) {
		const payload = {
			name: preset.name,
			group: PLUGIN_GROUP,
			enabled: false,
			triggers: [createTrigger(preset.triggerTypeId)],
			handlers: [
				createHandler(HANDLER_IDS.addPoints, [
					{ key: 'amount', value: preset.amount },
					{ key: 'source', value: preset.source }
				])
			]
		};

		const match = ownedActions.find((action) => action.name === preset.name);

		if (match?.id != null) {
			await app.actions.update(match.id, payload);
		} else {
			await app.actions.create(payload);
		}
	}

	for (const preset of DEFAULT_MESSAGE_COMMANDS) {
		const exists = app.commands.getSnapshot().some((command) => command.id === preset.id);
		const payload = {
			name: preset.name,
			commandNames: [...preset.commandNames],
			group: PLUGIN_GROUP,
			enabled: false,
			handlers: [
				createHandler(HANDLER_IDS.sendRankMessage, [
					{ key: 'message', value: preset.message },
					{ key: 'as-bot', value: true }
				])
			],
			sources: ['twitch' as const],
			permissions: { roles: ['everyone' as const] },
			cooldownGlobalMs: null,
			cooldownUserMs: 5000
		};

		if (exists) {
			await app.commands.update(preset.id, payload);
		} else {
			await app.commands.create({ ...payload, id: preset.id });
		}
	}

	{
		const preset = DEFAULT_LEADERBOARD_COMMAND;
		const exists = app.commands.getSnapshot().some((command) => command.id === preset.id);
		const payload = {
			name: preset.name,
			commandNames: [...preset.commandNames],
			group: PLUGIN_GROUP,
			enabled: false,
			handlers: [
				createHandler(HANDLER_IDS.sendLeaderboardMessage, [
					{ key: 'prefix', value: 'Top users:' },
					{ key: 'as-bot', value: true }
				])
			],
			sources: ['twitch' as const],
			permissions: { roles: ['everyone' as const] },
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
