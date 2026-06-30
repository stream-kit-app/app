import { eq } from 'drizzle-orm';

import { db } from '$db';
import { overlays, type NewOverlayRecord, type OverlayRecord } from '$db/schemas/overlays';

export type SaveOverlayInput = {
	id: string;
	name: string;
	template: string;
	config: Record<string, unknown>;
	expectedEvents: string[];
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
				expectedEvents: input.expectedEvents,
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
		expectedEvents: input.expectedEvents,
		createdAt: now,
		updatedAt: now
	};

	await db.insert(overlays).values(record);

	return (await getOverlay(input.id))!;
}

export async function deleteOverlay(id: string): Promise<void> {
	await db.delete(overlays).where(eq(overlays.id, id));
}
