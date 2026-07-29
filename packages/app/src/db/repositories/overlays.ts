import { eq } from 'drizzle-orm';

import { db } from '$db';
import { overlays, type NewOverlayRecord, type OverlayRecord } from '$db/schemas/overlays';
import { createSyncId } from '$db/sync-id';
import { notifyConfigLocalChange } from '$db/config-sync-notify';
import { recordConfigSyncTombstone } from './config-sync-tombstones';

export type SaveOverlayInput = {
	id: string;
	name: string;
	template: string;
	config: Record<string, unknown>;
	version: number;
	expectedEvents: string[];
	requiredPlugins?: string[];
	installedActionKeys?: string[];
};

export async function getOverlays(): Promise<OverlayRecord[]> {
	return db.select().from(overlays).orderBy(overlays.name);
}

export async function getOverlay(id: string): Promise<OverlayRecord | undefined> {
	const rows = await db.select().from(overlays).where(eq(overlays.id, id)).limit(1);
	return rows[0];
}

export async function getOverlayBySyncId(syncId: string): Promise<OverlayRecord | undefined> {
	const rows = await db.select().from(overlays).where(eq(overlays.syncId, syncId)).limit(1);
	return rows[0];
}

export async function saveOverlay(input: SaveOverlayInput): Promise<OverlayRecord> {
	const now = new Date();
	const existing = await getOverlay(input.id);

	if (existing) {
		await db
			.update(overlays)
			.set({
				name: input.name,
				template: input.template,
				config: input.config,
				version: input.version,
				expectedEvents: input.expectedEvents,
				requiredPlugins: input.requiredPlugins ?? existing.requiredPlugins ?? [],
				installedActionKeys: input.installedActionKeys ?? existing.installedActionKeys ?? [],
				revision: (existing.revision ?? 1) + 1,
				updatedAt: now
			})
			.where(eq(overlays.id, input.id));

		notifyConfigLocalChange();
		return (await getOverlay(input.id))!;
	}

	const record: NewOverlayRecord = {
		id: input.id,
		syncId: createSyncId(),
		name: input.name,
		template: input.template,
		config: input.config,
		version: input.version,
		expectedEvents: input.expectedEvents,
		requiredPlugins: input.requiredPlugins ?? [],
		installedActionKeys: input.installedActionKeys ?? [],
		sourceHash: '',
		revision: 1,
		createdAt: now,
		updatedAt: now
	};

	await db.insert(overlays).values(record);
	notifyConfigLocalChange();
	return (await getOverlay(input.id))!;
}

export async function saveOverlayConfig(
	id: string,
	config: Record<string, unknown>,
	version: number
): Promise<OverlayRecord> {
	const existing = await getOverlay(id);
	if (!existing) {
		throw new Error(`Overlay not found: ${id}`);
	}

	const now = new Date();
	await db
		.update(overlays)
		.set({
			config,
			version,
			revision: (existing.revision ?? 1) + 1,
			updatedAt: now
		})
		.where(eq(overlays.id, id));

	notifyConfigLocalChange();
	return (await getOverlay(id))!;
}

export async function deleteOverlay(id: string): Promise<void> {
	const existing = await getOverlay(id);
	if (!existing) {
		return;
	}

	await db.delete(overlays).where(eq(overlays.id, id));
	await recordConfigSyncTombstone(
		'overlay',
		existing.syncId,
		new Date(),
		(existing.revision ?? 1) + 1
	);
	notifyConfigLocalChange();
}

export async function saveOverlayInstalledActionKeys(
	id: string,
	installedActionKeys: string[]
): Promise<OverlayRecord> {
	const existing = await getOverlay(id);
	if (!existing) {
		throw new Error(`Overlay not found: ${id}`);
	}

	const now = new Date();
	await db
		.update(overlays)
		.set({
			installedActionKeys,
			revision: (existing.revision ?? 1) + 1,
			updatedAt: now
		})
		.where(eq(overlays.id, id));

	notifyConfigLocalChange();
	return (await getOverlay(id))!;
}

export async function saveOverlayManifestMetadata(
	id: string,
	metadata: Pick<SaveOverlayInput, 'expectedEvents' | 'requiredPlugins'>
): Promise<OverlayRecord> {
	const existing = await getOverlay(id);
	if (!existing) {
		throw new Error(`Overlay not found: ${id}`);
	}

	const now = new Date();
	await db
		.update(overlays)
		.set({
			expectedEvents: metadata.expectedEvents,
			requiredPlugins: metadata.requiredPlugins ?? [],
			revision: (existing.revision ?? 1) + 1,
			updatedAt: now
		})
		.where(eq(overlays.id, id));

	notifyConfigLocalChange();
	return (await getOverlay(id))!;
}

export async function upsertOverlayFromSync(input: {
	id: string;
	syncId: string;
	name: string;
	template: string;
	config: Record<string, unknown>;
	version: number;
	expectedEvents: string[];
	requiredPlugins: string[];
	installedActionKeys: string[];
	sourceHash: string;
	revision: number;
	updatedAt: Date;
}): Promise<OverlayRecord> {
	const existing = await getOverlayBySyncId(input.syncId);
	const byId = await getOverlay(input.id);

	if (existing) {
		await db
			.update(overlays)
			.set({
				name: input.name,
				template: input.template,
				config: input.config,
				version: input.version,
				expectedEvents: input.expectedEvents,
				requiredPlugins: input.requiredPlugins,
				installedActionKeys: input.installedActionKeys,
				sourceHash: input.sourceHash,
				revision: input.revision,
				updatedAt: input.updatedAt
			})
			.where(eq(overlays.syncId, input.syncId));
		return (await getOverlayBySyncId(input.syncId))!;
	}

	if (byId && byId.syncId !== input.syncId) {
		await db.delete(overlays).where(eq(overlays.id, input.id));
	}

	await db.insert(overlays).values({
		id: input.id,
		syncId: input.syncId,
		name: input.name,
		template: input.template,
		config: input.config,
		version: input.version,
		expectedEvents: input.expectedEvents,
		requiredPlugins: input.requiredPlugins,
		installedActionKeys: input.installedActionKeys,
		sourceHash: input.sourceHash,
		revision: input.revision,
		createdAt: input.updatedAt,
		updatedAt: input.updatedAt
	});

	return (await getOverlayBySyncId(input.syncId))!;
}

export async function deleteOverlayBySyncIdFromSync(syncId: string): Promise<void> {
	const existing = await getOverlayBySyncId(syncId);
	if (!existing) {
		return;
	}
	await db.delete(overlays).where(eq(overlays.id, existing.id));
}

export async function updateOverlaySourceHash(
	id: string,
	sourceHash: string
): Promise<void> {
	const existing = await getOverlay(id);
	if (!existing) {
		return;
	}
	await db
		.update(overlays)
		.set({
			sourceHash,
			revision: (existing.revision ?? 1) + 1,
			updatedAt: new Date()
		})
		.where(eq(overlays.id, id));
	notifyConfigLocalChange();
}
