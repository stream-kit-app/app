import type { ActionHandler } from '../action/action-handler.svelte';
import type { App } from '../app.svelte';
import type { AuthPublicUser } from '../auth/types';
import type { HandlerFieldInstance, OneOfFieldValue } from '../action/handler/field';

import { isOneOfFieldValue } from '@stream-kit/core';

import { saveAction } from '$db/repositories/actions';
import { translate } from '$lib/i18n';

import { flattenActionHandlers } from '../action/handler-tree';
import { isLocalFilePath, usesCloudFileStorage } from './cloud-file-path';

type UploadCache = Map<string, string>;

type MigrationStats = {
	uploaded: number;
	failed: number;
};

type BotCommandsApi = {
	items: Array<{
		id: string | null;
		handlers: ActionHandler[];
	}>;
	upsert: (command: unknown) => Promise<void>;
};

type BotTimersApi = {
	items: Array<{
		id: string | null;
		handlers: ActionHandler[];
	}>;
	upsert: (timer: unknown) => Promise<void>;
};

type RankingsApi = {
	rankings: {
		ranks: Array<{ id: string; icon?: string }>;
		updateRank: (id: string, input: { icon: string }) => Promise<unknown>;
	};
};

let started = false;
let running = false;

/**
 * Watch auth and, while the user has an active plan, upload local file values
 * on cloud-capable handler fields (and rankings data-URL icons) in the background.
 */
export function startCloudFileMigration(app: App): void {
	if (started) {
		return;
	}
	started = true;

	app.auth.onChange((user) => {
		void migrateCloudFilesIfNeeded(app, user);
	});
}

async function migrateCloudFilesIfNeeded(
	app: App,
	user: AuthPublicUser | null
): Promise<void> {
	if (!user?.subscription || running) {
		return;
	}

	running = true;
	const cache: UploadCache = new Map();
	const stats: MigrationStats = { uploaded: 0, failed: 0 };

	try {
		await migrateActions(app, cache, stats);
		await migrateBotHandlers(app, cache, stats);
		await migrateRankingsIcons(app, cache, stats);

		if (stats.uploaded > 0) {
			app.toast.create({
				title: translate('Cloud files'),
				description: translate('Uploaded {count} local files to the cloud.', {
					count: stats.uploaded
				}),
				variant: 'success'
			});
		}

		if (stats.failed > 0) {
			app.toast.create({
				title: translate('Cloud files'),
				description: translate('{count} files could not be uploaded to the cloud.', {
					count: stats.failed
				}),
				variant: 'warning'
			});
		}
	} catch (error) {
		console.warn('Cloud file migration failed', error);
	} finally {
		running = false;
	}
}

async function migrateActions(
	app: App,
	cache: UploadCache,
	stats: MigrationStats
): Promise<void> {
	for (const action of app.actions.items) {
		if (action.id == null) {
			continue;
		}

		const dirty = await migrateHandlerTree(app, action.handlers, cache, stats);
		if (!dirty) {
			continue;
		}

		try {
			await saveAction(
				{
					name: action.name,
					group: action.group,
					enabled: action.enabled,
					queueId: action.queueId,
					ownerPluginKey: action.ownerPluginKey ?? null,
					triggers: action.triggers.map((trigger) => trigger.toStored()),
					handlers: action.handlers.map((handler) => handler.toStored())
				},
				action.id
			);
		} catch (error) {
			console.warn(`Failed to persist cloud migration for action ${action.id}`, error);
			stats.failed += 1;
		}
	}
}

async function migrateBotHandlers(
	app: App,
	cache: UploadCache,
	stats: MigrationStats
): Promise<void> {
	const bot = app.plugins.tryGet<{
		commands?: BotCommandsApi;
		timers?: BotTimersApi;
	}>('bot');

	if (!bot) {
		return;
	}

	if (bot.commands?.items) {
		for (const command of bot.commands.items) {
			if (command.id == null) {
				continue;
			}
			const dirty = await migrateHandlerTree(app, command.handlers, cache, stats);
			if (dirty) {
				try {
					await bot.commands.upsert(command);
				} catch (error) {
					console.warn(`Failed to persist cloud migration for command ${command.id}`, error);
					stats.failed += 1;
				}
			}
		}
	}

	if (bot.timers?.items) {
		for (const timer of bot.timers.items) {
			if (timer.id == null) {
				continue;
			}
			const dirty = await migrateHandlerTree(app, timer.handlers, cache, stats);
			if (dirty) {
				try {
					await bot.timers.upsert(timer);
				} catch (error) {
					console.warn(`Failed to persist cloud migration for timer ${timer.id}`, error);
					stats.failed += 1;
				}
			}
		}
	}
}

async function migrateRankingsIcons(
	app: App,
	cache: UploadCache,
	stats: MigrationStats
): Promise<void> {
	const plugin = app.plugins.tryGet<RankingsApi>('rankings');
	const rankings = plugin?.rankings;
	if (!rankings?.ranks) {
		return;
	}

	for (const rank of [...rankings.ranks]) {
		const icon = rank.icon?.trim();
		if (!icon?.startsWith('data:image/')) {
			continue;
		}

		const url = await uploadDataUrl(app, icon, cache, stats);
		if (!url) {
			continue;
		}

		try {
			await rankings.updateRank(rank.id, { icon: url });
		} catch (error) {
			console.warn(`Failed to persist cloud migration for rank ${rank.id}`, error);
			stats.failed += 1;
		}
	}
}

async function migrateHandlerTree(
	app: App,
	handlers: ActionHandler[],
	cache: UploadCache,
	stats: MigrationStats
): Promise<boolean> {
	let dirty = false;

	for (const handler of flattenActionHandlers(handlers)) {
		for (const field of handler.fields) {
			if (await migrateHandlerField(app, handler, field, cache, stats)) {
				dirty = true;
			}
		}
	}

	return dirty;
}

async function migrateHandlerField(
	app: App,
	handler: ActionHandler,
	field: HandlerFieldInstance,
	cache: UploadCache,
	stats: MigrationStats
): Promise<boolean> {
	const definition = handler.getFieldDefinition(field.key);
	if (!definition) {
		return false;
	}

	if (definition.type === 'select-file-or-folder' && usesCloudFileStorage(definition)) {
		if (!isLocalFilePath(field.value)) {
			return false;
		}
		const url = await uploadLocalPath(app, String(field.value).trim(), cache, stats);
		if (!url) {
			return false;
		}
		field.value = url;
		return true;
	}

	if (definition.type !== 'one-of' || !isOneOfFieldValue(field.value)) {
		return false;
	}

	const oneOf = field.value as OneOfFieldValue;
	let nextValues = oneOf.values;
	let changed = false;

	for (const variant of definition.variants) {
		const inner = variant.field;
		if (inner.type !== 'select-file-or-folder' || !usesCloudFileStorage(inner)) {
			continue;
		}
		const current = nextValues[variant.id];
		if (!isLocalFilePath(current)) {
			continue;
		}
		const url = await uploadLocalPath(app, String(current).trim(), cache, stats);
		if (!url) {
			continue;
		}
		nextValues = { ...nextValues, [variant.id]: url };
		changed = true;
	}

	if (!changed) {
		return false;
	}

	field.value = {
		variant: oneOf.variant,
		values: nextValues
	};
	return true;
}

async function uploadLocalPath(
	app: App,
	path: string,
	cache: UploadCache,
	stats: MigrationStats
): Promise<string | null> {
	const cached = cache.get(path);
	if (cached) {
		return cached;
	}

	try {
		const bytes = await app.fs.readFile(path);
		const originalName = path.split(/[/\\]/).pop() || 'upload.bin';
		const uploaded = await app.userFiles.upload(new Blob([Uint8Array.from(bytes)]), {
			originalName
		});
		cache.set(path, uploaded.url);
		stats.uploaded += 1;
		return uploaded.url;
	} catch (error) {
		console.warn('Cloud migration upload failed', path, error);
		stats.failed += 1;
		return null;
	}
}

async function uploadDataUrl(
	app: App,
	dataUrl: string,
	cache: UploadCache,
	stats: MigrationStats
): Promise<string | null> {
	const cached = cache.get(dataUrl);
	if (cached) {
		return cached;
	}

	try {
		const blob = await (await fetch(dataUrl)).blob();
		const uploaded = await app.userFiles.upload(blob, { originalName: 'icon.png' });
		cache.set(dataUrl, uploaded.url);
		stats.uploaded += 1;
		return uploaded.url;
	} catch (error) {
		console.warn('Cloud migration data-URL upload failed', error);
		stats.failed += 1;
		return null;
	}
}
