import type { ModRuleRecord } from '../lib/stored-mod-rule';

import { db } from '$db/index';
import { eq, inArray } from 'drizzle-orm';

import { DEFAULT_MOD_PLATFORMS } from '../lib/stored-mod-rule';
import { botModRules } from './schema';

export type SaveModRuleInput = {
	name: string;
	type: ModRuleRecord['type'];
	enabled: boolean;
	action: ModRuleRecord['action'];
	parameters: ModRuleRecord['parameters'];
	platforms: ModRuleRecord['platforms'];
	priority: number;
};

export async function getModRules(): Promise<ModRuleRecord[]> {
	return db.select().from(botModRules);
}

export async function saveModRule(input: SaveModRuleInput, id?: number): Promise<ModRuleRecord> {
	const now = new Date();
	const platforms = input.platforms.length > 0 ? input.platforms : DEFAULT_MOD_PLATFORMS;

	if (id != null) {
		const [row] = await db
			.update(botModRules)
			.set({
				name: input.name.trim(),
				type: input.type,
				enabled: input.enabled,
				action: input.action,
				parameters: input.parameters,
				platforms,
				priority: input.priority,
				updatedAt: now
			})
			.where(eq(botModRules.id, id))
			.returning();

		return row;
	}

	const [row] = await db
		.insert(botModRules)
		.values({
			name: input.name.trim(),
			type: input.type,
			enabled: input.enabled,
			action: input.action,
			parameters: input.parameters,
			platforms,
			priority: input.priority,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	return row;
}

export async function updateModRulesEnabled(ids: number[], enabled: boolean): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db
		.update(botModRules)
		.set({
			enabled,
			updatedAt: new Date()
		})
		.where(inArray(botModRules.id, ids));
}

export async function deleteModRules(ids: number[]): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db.delete(botModRules).where(inArray(botModRules.id, ids));
}
