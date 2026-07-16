import type { App } from '../app.svelte';
import type { NewActionRecord } from '../action/stored-action';
import type { HandlerTriggerContext } from '../action/handler-context';
import type { NewCommandRecord } from '$lib/types/command-types';
import type {
	CorePluginApi,
	VariableScope
} from '$lib/types/core-plugin-api';

import {
	asRecord,
	requireNumber,
	requireString,
	type ApiMethodRouter
} from './method-router';
import type { ApiMethodContext } from './types';

function pluginUnavailable(name: string): never {
	throw Object.assign(new Error(`${name} plugin is not available`), {
		code: 'plugin_unavailable'
	});
}

function getCore(app: App): CorePluginApi {
	const core = app.plugins.tryGet<CorePluginApi>('core');
	if (!core) {
		pluginUnavailable('Core');
	}
	return core;
}

function asTriggerContext(params: Record<string, unknown>): HandlerTriggerContext {
	const trigger =
		typeof params.trigger === 'string' && params.trigger.trim()
			? params.trigger
			: 'api-server';
	return {
		trigger,
		data: params.data ?? {}
	};
}

function asVariableScope(value: string): VariableScope {
	if (value === 'global' || value === 'user' || value === 'action') {
		return value;
	}

	throw Object.assign(new Error('scope must be global, user, or action'), {
		code: 'invalid_params'
	});
}

export function registerBuiltinApiMethods(
	router: ApiMethodRouter,
	app: App,
	options: {
		getSubscriptions: (clientId: string) => Set<string>;
		emitEvent: (event: string, payload?: unknown, clientIds?: string[]) => Promise<void>;
	}
): void {
	router.register('server.hello', () => ({
		name: 'Stream Kit API',
		version: 1
	}));

	router.register('server.listMethods', () => router.listMethods());

	router.register('server.subscribe', (params, context: ApiMethodContext) => {
		const record = asRecord(params);
		const events = record.events;
		if (!Array.isArray(events) || events.some((item) => typeof item !== 'string')) {
			throw Object.assign(new Error('params.events must be a string array'), {
				code: 'invalid_params'
			});
		}

		const subscriptions = options.getSubscriptions(context.clientId);
		for (const event of events as string[]) {
			const trimmed = event.trim();
			if (trimmed) {
				subscriptions.add(trimmed);
			}
		}

		return { events: [...subscriptions].sort() };
	});

	router.register('server.unsubscribe', (params, context: ApiMethodContext) => {
		const record = asRecord(params);
		const events = record.events;
		const subscriptions = options.getSubscriptions(context.clientId);

		if (events === undefined) {
			subscriptions.clear();
			return { events: [] };
		}

		if (!Array.isArray(events) || events.some((item) => typeof item !== 'string')) {
			throw Object.assign(new Error('params.events must be a string array'), {
				code: 'invalid_params'
			});
		}

		for (const event of events as string[]) {
			subscriptions.delete(event.trim());
		}

		return { events: [...subscriptions].sort() };
	});

	router.register('actions.getSnapshot', () => app.actions.getSnapshot());

	router.register('actions.create', async (params) => {
		const input = asRecord(params) as unknown as NewActionRecord;
		if (typeof input.name !== 'string' || !input.name.trim()) {
			throw Object.assign(new Error('params.name is required'), { code: 'invalid_params' });
		}
		if (!Array.isArray(input.triggers) || !Array.isArray(input.handlers)) {
			throw Object.assign(new Error('params.triggers and params.handlers are required'), {
				code: 'invalid_params'
			});
		}

		return app.actions.createFromRecord(input);
	});

	router.register('actions.update', async (params) => {
		const record = asRecord(params);
		const id = requireNumber(record, 'id');
		const { id: _id, ...input } = record as unknown as NewActionRecord & { id: number };
		return app.actions.updateFromRecord(id, input as Omit<NewActionRecord, 'id'>);
	});

	router.register('actions.delete', async (params) => {
		const id = requireNumber(asRecord(params), 'id');
		await app.actions.delete(id);
		return { ok: true };
	});

	router.register('actions.runById', async (params) => {
		const record = asRecord(params);
		const id = requireNumber(record, 'id');
		const context = asTriggerContext(record);
		const ok = app.actions.runById(id, context);

		if (ok) {
			await options.emitEvent('actions.executed', {
				id,
				trigger: context.trigger,
				data: context.data
			});
		}

		return { ok };
	});

	router.register('commands.getSnapshot', () => {
		const bot = app.plugins.tryGet<{ commands: { getSnapshot: () => unknown } }>('bot');
		return bot?.commands.getSnapshot() ?? [];
	});

	router.register('commands.create', async (params) => {
		const bot = app.plugins.tryGet<{
			commands: {
				createFromRecord: (input: NewCommandRecord) => Promise<unknown>;
			};
		}>('bot');
		if (!bot) {
			pluginUnavailable('Bot');
		}

		const input = asRecord(params) as unknown as NewCommandRecord;
		return bot.commands.createFromRecord(input);
	});

	router.register('commands.update', async (params) => {
		const bot = app.plugins.tryGet<{
			commands: {
				updateFromRecord: (
					id: string,
					input: Omit<NewCommandRecord, 'id'>
				) => Promise<unknown>;
			};
		}>('bot');
		if (!bot) {
			pluginUnavailable('Bot');
		}

		const record = asRecord(params);
		const id = requireString(record, 'id');
		const { id: _id, ...input } = record as unknown as NewCommandRecord & { id: string };
		return bot.commands.updateFromRecord(id, input);
	});

	router.register('commands.delete', async (params) => {
		const bot = app.plugins.tryGet<{
			commands: { deleteById: (id: string) => Promise<boolean> };
		}>('bot');
		if (!bot) {
			pluginUnavailable('Bot');
		}

		const id = requireString(asRecord(params), 'id');
		const ok = await bot.commands.deleteById(id);
		return { ok };
	});

	router.register('commands.runById', (params) => {
		const bot = app.plugins.tryGet<{
			commands: {
				runById: (id: string, context: HandlerTriggerContext) => boolean;
			};
		}>('bot');
		if (!bot) {
			pluginUnavailable('Bot');
		}

		const record = asRecord(params);
		const id = requireString(record, 'id');
		const ok = bot.commands.runById(id, asTriggerContext(record));
		return { ok };
	});

	router.register('commands.findByTrigger', (params) => {
		const bot = app.plugins.tryGet<{
			commands: {
				findByTrigger: (trigger: string) => { toRecord: () => unknown } | undefined;
			};
		}>('bot');
		if (!bot) {
			pluginUnavailable('Bot');
		}

		const trigger = requireString(asRecord(params), 'trigger');
		return bot.commands.findByTrigger(trigger)?.toRecord() ?? null;
	});

	router.register('variables.get', (params) => {
		const core = getCore(app);
		const record = asRecord(params);
		const scope = asVariableScope(requireString(record, 'scope'));
		const key = requireString(record, 'key');
		const context = asTriggerContext(record);
		return { value: core.variables.get(scope, key, context) ?? null };
	});

	router.register('variables.set', async (params) => {
		const core = getCore(app);
		const record = asRecord(params);
		const scope = asVariableScope(requireString(record, 'scope'));
		const key = requireString(record, 'key');
		const value = requireString(record, 'value');
		const context = asTriggerContext(record);
		return core.variables.set(scope, key, value, context);
	});

	router.register('variables.listKeys', (params) => {
		const core = getCore(app);
		const record = asRecord(params);
		const scope = asVariableScope(requireString(record, 'scope'));
		const context =
			scope === 'global' ? undefined : asTriggerContext(record);
		return { keys: core.variables.listKeys(scope, context) };
	});

	router.register('collections.list', () => {
		const core = getCore(app);
		return core.collections.listCollections();
	});

	router.register('collections.listEntries', (params) => {
		const core = getCore(app);
		const collectionName = requireString(asRecord(params), 'collectionName');
		return core.collections.listEntries(collectionName);
	});

	router.register('collections.get', (params) => {
		const core = getCore(app);
		const record = asRecord(params);
		const collectionName = requireString(record, 'collectionName');
		const key = requireString(record, 'key');
		return { value: core.collections.get(collectionName, key) ?? null };
	});

	router.register('collections.create', async (params) => {
		const core = getCore(app);
		const record = asRecord(params);
		const collectionName = requireString(record, 'collectionName');
		const lifetime = requireString(record, 'lifetime');
		if (lifetime !== 'session' && lifetime !== 'persistent') {
			throw Object.assign(new Error('lifetime must be session or persistent'), {
				code: 'invalid_params'
			});
		}
		return core.collections.create(collectionName, lifetime);
	});

	router.register('collections.set', async (params) => {
		const core = getCore(app);
		const record = asRecord(params);
		return core.collections.set(
			requireString(record, 'collectionName'),
			requireString(record, 'key'),
			requireString(record, 'value')
		);
	});

	router.register('collections.update', async (params) => {
		const core = getCore(app);
		const record = asRecord(params);
		return core.collections.update(
			requireString(record, 'collectionName'),
			requireString(record, 'key'),
			requireString(record, 'value')
		);
	});

	router.register('collections.deleteKey', async (params) => {
		const core = getCore(app);
		const record = asRecord(params);
		return core.collections.deleteKey(
			requireString(record, 'collectionName'),
			requireString(record, 'key')
		);
	});

	router.register('collections.clear', async (params) => {
		const core = getCore(app);
		return core.collections.clear(requireString(asRecord(params), 'collectionName'));
	});

	router.register('collections.delete', async (params) => {
		const core = getCore(app);
		return core.collections.delete(requireString(asRecord(params), 'collectionName'));
	});

	router.register('queues.list', () => app.actionQueues.definitions);

	router.register('queues.pause', (params) => {
		const queueId = requireNumber(asRecord(params), 'queueId');
		app.actionQueues.pause(queueId);
		return { ok: true };
	});

	router.register('queues.resume', (params) => {
		const queueId = requireNumber(asRecord(params), 'queueId');
		app.actionQueues.resume(queueId);
		return { ok: true };
	});

	router.register('queues.stats', (params) => {
		const queueId = requireNumber(asRecord(params), 'queueId');
		return app.actionQueues.stats(queueId);
	});

	router.register('overlays.list', () =>
		app.overlay.items.map((overlay) => ({
			id: overlay.id,
			name: overlay.name,
			expectedEvents: overlay.expectedEvents ?? []
		}))
	);

	router.register('overlays.broadcast', async (params) => {
		const record = asRecord(params);
		const overlayId = requireString(record, 'overlayId');
		const event = requireString(record, 'event');
		await app.overlay.broadcast(overlayId, event, record.payload);
		return { ok: true };
	});
}
