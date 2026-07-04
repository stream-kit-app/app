import { eq } from 'drizzle-orm';

import { db } from '$db';
import { overlays, type NewOverlayRecord, type OverlayRecord } from '$db/schemas/overlays';

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
				updatedAt: now
			})
			.where(eq(overlays.id, input.id));

		return (await getOverlay(input.id))!;
	}

	const record: NewOverlayRecord = {
		id: input.id,
		name: input.name,
		template: input.template,
		config: input.config,
		version: input.version,
		expectedEvents: input.expectedEvents,
		requiredPlugins: input.requiredPlugins ?? [],
		installedActionKeys: input.installedActionKeys ?? [],
		createdAt: now,
		updatedAt: now
	};

	await db.insert(overlays).values(record);

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
			updatedAt: now
		})
		.where(eq(overlays.id, id));

	return (await getOverlay(id))!;
}

export async function deleteOverlay(id: string): Promise<void> {
	await db.delete(overlays).where(eq(overlays.id, id));
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
			updatedAt: now
		})
		.where(eq(overlays.id, id));

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
			updatedAt: now
		})
		.where(eq(overlays.id, id));

	return (await getOverlay(id))!;
}
