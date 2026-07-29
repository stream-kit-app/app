import type { ActionHandler } from '../action/action-handler.svelte';
import type { App } from '../app.svelte';
import type { AuthPublicUser } from '../auth/types';
import type { HandlerFieldInstance, OneOfFieldValue } from '../action/handler/field';

import { isOneOfFieldValue } from '@stream-kit/core';

import { saveAction } from '$db/repositories/actions';
import { translate } from '$lib/i18n';

import { flattenActionHandlers } from '../action/handler-tree';
import { isLocalFilePath, usesCloudFileStorage } from './cloud-file-path';
import { normalizeCloudFileRefValue } from './normalize-cloud-file-refs';

type UploadCache = Map<string, string>;

type MigrationStats = {
	uploaded: number;
	failed: number;
};

let started = false;
let running = false;
let pending = false;

/**
 * Watch auth and, while the user has an active plan:
 * - normalize absolute PocketBase file URLs to host-independent /api/files paths
 * - upload local file values on cloud-capable action handler fields
 *
 * Plugin-record file fields (bot/rankings) are covered once those values use
 * host-independent cloud paths via `app.userFiles`; absolute hosts are normalized
 * on action handlers after each config sync.
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

/** Called after config sync reloads actions so cloud sync cannot leave absolute hosts behind. */
export async function migrateCloudFilesAfterSync(app: App): Promise<void> {
	await migrateCloudFilesIfNeeded(app, app.auth.user);
}

async function migrateCloudFilesIfNeeded(
	app: App,
	user: AuthPublicUser | null
): Promise<void> {
	if (!app.auth.isConfigured || !user?.subscription) {
		return;
	}

	if (running) {
		pending = true;
		return;
	}

	running = true;

	try {
		do {
			pending = false;
			const cache: UploadCache = new Map();
			const stats: MigrationStats = { uploaded: 0, failed: 0 };
			let normalized = false;

			try {
				normalized = await migrateActions(app, cache, stats);

				if (stats.uploaded > 0 || normalized) {
					app.configSync.scheduleSync();
				}

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
			}
		} while (pending);
	} finally {
		running = false;
	}
}

async function migrateActions(
	app: App,
	cache: UploadCache,
	stats: MigrationStats
): Promise<boolean> {
	let anyDirty = false;

	for (const action of app.actions.items) {
		if (action.id == null) {
			continue;
		}

		const dirty = await migrateHandlerTree(app, action.handlers, cache, stats);
		if (!dirty) {
			continue;
		}

		anyDirty = true;

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

	return anyDirty;
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
	let dirty = false;

	// Normalize absolute PB file URLs even when the field definition is missing
	// (e.g. renamed handlers) — otherwise absolute hosts stick around forever.
	const normalized = normalizeCloudFileRefValue(field.value);
	if (normalized.changed) {
		field.value = normalized.value;
		dirty = true;
	}

	const definition = handler.getFieldDefinition(field.key);
	if (!definition) {
		return dirty;
	}

	if (definition.type === 'select-file-or-folder' && usesCloudFileStorage(definition)) {
		if (!isLocalFilePath(field.value)) {
			return dirty;
		}
		const url = await uploadLocalPath(app, String(field.value).trim(), cache, stats);
		if (!url) {
			return dirty;
		}
		field.value = url;
		return true;
	}

	if (definition.type !== 'one-of' || !isOneOfFieldValue(field.value)) {
		return dirty;
	}

	const oneOf = field.value as OneOfFieldValue;
	let nextValues = oneOf.values;
	let changed = dirty;

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
		return dirty;
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
