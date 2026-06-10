import type { CommandPermissions, CommandRecord, CommandSource } from '../lib/stored-command';
import type { StoredActionHandler } from '$lib/core/action/stored-action';

import { db } from '$db/index';
import { eq, inArray } from 'drizzle-orm';

import { DEFAULT_COMMAND_PERMISSIONS, DEFAULT_COMMAND_SOURCES } from '../lib/stored-command';
import { commands } from './schema';

export type SaveCommandInput = {
	name: string;
	commandNames: string[];
	handlers: StoredActionHandler[];
	sources: CommandSource[];
	permissions: CommandPermissions;
	cooldownGlobalMs: number | null;
	cooldownUserMs: number | null;
	enabled: boolean;
};

export function normalizeCommandText(value: string): string {
	return value.trim().replace(/^!+/, '').toLowerCase();
}

export function normalizeCommandNames(values: string[]): string[] {
	return [...new Set(values.map(normalizeCommandText).filter(Boolean))];
}

export async function getCommand(id: number): Promise<CommandRecord> {
	const [row] = await db.select().from(commands).where(eq(commands.id, id)).limit(1);

	if (!row) {
		throw new Error('Command not found');
	}

	return row;
}

export async function getCommands(): Promise<CommandRecord[]> {
	return db.select().from(commands);
}

export async function saveCommand(input: SaveCommandInput, id?: number): Promise<CommandRecord> {
	const now = new Date();
	const commandNames = normalizeCommandNames(input.commandNames);
	const sources = input.sources.length > 0 ? input.sources : DEFAULT_COMMAND_SOURCES;
	const permissions = input.permissions.roles.length
		? input.permissions
		: DEFAULT_COMMAND_PERMISSIONS;

	if (id != null) {
		const [row] = await db
			.update(commands)
			.set({
				name: input.name.trim(),
				commandNames,
				handlers: input.handlers,
				sources,
				permissions,
				cooldownGlobalMs: input.cooldownGlobalMs,
				cooldownUserMs: input.cooldownUserMs,
				enabled: input.enabled,
				updatedAt: now
			})
			.where(eq(commands.id, id))
			.returning();

		return row;
	}

	const [row] = await db
		.insert(commands)
		.values({
			name: input.name.trim(),
			commandNames,
			handlers: input.handlers,
			sources,
			permissions,
			cooldownGlobalMs: input.cooldownGlobalMs,
			cooldownUserMs: input.cooldownUserMs,
			enabled: input.enabled,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	return row;
}

export async function updateCommandEnabled(id: number, enabled: boolean): Promise<void> {
	await updateCommandsEnabled([id], enabled);
}

export async function updateCommandsEnabled(ids: number[], enabled: boolean): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db
		.update(commands)
		.set({
			enabled,
			updatedAt: new Date()
		})
		.where(inArray(commands.id, ids));
}

export async function deleteCommand(id: number) {
	return deleteCommands([id]);
}

export async function deleteCommands(ids: number[]): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db.delete(commands).where(inArray(commands.id, ids));
}
