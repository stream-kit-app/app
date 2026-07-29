import type {
	HandlerTriggerContext,
	PluginAppApi,
	PluginAppRecordCollectionApi,
	PluginStore
} from '@stream-kit/plugin';

import { extractUsername } from './extract-username';
import { resolveTriggerContextVariables, resolveVariables } from './resolve-variables';
import type { VariableScope } from './types';

const GLOBAL_KEY = 'variables';
const USERS_KEY = 'users';
const GLOBAL_RECORDS_COLLECTION = 'variables';
const USER_RECORDS_COLLECTION = 'userVariables';
const GLOBAL_MIGRATION_KEY = '__records_migrated_variables_v1';
const USER_MIGRATION_KEY = '__records_migrated_userVariables_v1';

type UserVariableMap = Record<string, Record<string, string>>;
type GlobalVariableRecord = { key: string; value: string };
type UserVariableRecord = { username: string; key: string; value: string };

export class VariableStore {
	private store?: PluginStore;
	private app?: PluginAppApi;
	private globalVariables: Record<string, string> = {};
	private userVariables: UserVariableMap = {};
	private loaded = false;
	private unsubscribeGlobalRecords?: () => void;
	private unsubscribeUserRecords?: () => void;

	bindStore(store: PluginStore, app: PluginAppApi): void {
		this.store = store;
		this.app = app;
	}

	private getStore(): PluginStore {
		if (!this.store) {
			throw new Error('VariableStore is not initialized');
		}

		return this.store;
	}

	private getApp(): PluginAppApi {
		if (!this.app) {
			throw new Error('VariableStore is not initialized');
		}

		return this.app;
	}

	private globalRecords(): PluginAppRecordCollectionApi {
		return this.getApp().records.open<GlobalVariableRecord>(GLOBAL_RECORDS_COLLECTION);
	}

	private userRecords(): PluginAppRecordCollectionApi {
		return this.getApp().records.open<UserVariableRecord>(USER_RECORDS_COLLECTION);
	}

	private async migrate(): Promise<void> {
		const store = this.getStore();
		const legacyGlobals = (await store.get<Record<string, string>>(GLOBAL_KEY)) ?? null;
		const globalsMigrated = await store.get<boolean>(GLOBAL_MIGRATION_KEY);

		if (!globalsMigrated || (legacyGlobals && Object.keys(legacyGlobals).length > 0)) {
			const records = this.globalRecords();
			const existing = await records.list<GlobalVariableRecord>();

			for (const [key, value] of Object.entries(legacyGlobals ?? {})) {
				if (!existing.some((record) => record.key === key)) {
					await records.create({ key, value });
				}
			}

			await store.set(GLOBAL_MIGRATION_KEY, true);
			await store.delete(GLOBAL_KEY);
		}

		const legacyUsers = (await store.get<UserVariableMap>(USERS_KEY)) ?? null;
		const usersMigrated = await store.get<boolean>(USER_MIGRATION_KEY);

		if (!usersMigrated || (legacyUsers && Object.keys(legacyUsers).length > 0)) {
			const records = this.userRecords();
			const existing = await records.list<UserVariableRecord>();

			for (const [username, variables] of Object.entries(legacyUsers ?? {})) {
				for (const [key, value] of Object.entries(variables)) {
					if (
						!existing.some(
							(record) => record.username === username && record.key === key
						)
					) {
						await records.create({ username, key, value });
					}
				}
			}

			await store.set(USER_MIGRATION_KEY, true);
			await store.delete(USERS_KEY);
		}
	}

	private async reload(): Promise<void> {
		const [globalRecords, userRecords] = await Promise.all([
			this.globalRecords().list<GlobalVariableRecord>(),
			this.userRecords().list<UserVariableRecord>()
		]);

		this.globalVariables = Object.fromEntries(
			globalRecords.map(({ key, value }) => [key, value])
		);
		this.userVariables = {};

		for (const { username, key, value } of userRecords) {
			(this.userVariables[username] ??= {})[key] = value;
		}
	}

	async load(): Promise<void> {
		if (this.loaded) {
			return;
		}

		await this.migrate();
		await this.reload();
		this.unsubscribeGlobalRecords = this.globalRecords().onChange(() => {
			void this.reload();
		});
		this.unsubscribeUserRecords = this.userRecords().onChange(() => {
			void this.reload();
		});
		this.loaded = true;
	}

	resolve(context: HandlerTriggerContext): Record<string, string> {
		return resolveVariables(this, context);
	}

	resolveTriggerContext(data: unknown): Record<string, string> {
		return resolveTriggerContextVariables(data);
	}

	getGlobalSnapshot(): Record<string, string> {
		return { ...this.globalVariables };
	}

	getUserSnapshot(username: string): Record<string, string> {
		return { ...(this.userVariables[username] ?? {}) };
	}

	get(scope: VariableScope, key: string, context: HandlerTriggerContext): string | undefined {
		const normalizedKey = key.trim();

		if (!normalizedKey) {
			return undefined;
		}

		if (scope === 'action') {
			return context.actionVariables?.[normalizedKey];
		}

		if (scope === 'global') {
			return this.globalVariables[normalizedKey];
		}

		const username = extractUsername(context.data);

		if (!username) {
			return undefined;
		}

		return this.userVariables[username]?.[normalizedKey];
	}

	async set(
		scope: VariableScope,
		key: string,
		value: string,
		context: HandlerTriggerContext
	): Promise<{ ok: true } | { ok: false; reason: 'missing-user' }> {
		const normalizedKey = key.trim();

		if (!normalizedKey) {
			return { ok: true };
		}

		if (scope === 'action') {
			if (!context.actionVariables) {
				context.actionVariables = {};
			}

			context.actionVariables[normalizedKey] = value;
			return { ok: true };
		}

		if (scope === 'global') {
			this.globalVariables[normalizedKey] = value;
			const records = this.globalRecords();
			const existing = (await records.list<GlobalVariableRecord>()).find(
				(record) => record.key === normalizedKey
			);

			if (existing) {
				await records.update<GlobalVariableRecord>(existing.id, { value });
			} else {
				await records.create({ key: normalizedKey, value });
			}

			return { ok: true };
		}

		const username = extractUsername(context.data);

		if (!username) {
			return { ok: false, reason: 'missing-user' };
		}

		const userRecord = this.userVariables[username] ?? {};
		userRecord[normalizedKey] = value;
		this.userVariables[username] = userRecord;
		const records = this.userRecords();
		const existing = (await records.list<UserVariableRecord>()).find(
			(record) => record.username === username && record.key === normalizedKey
		);

		if (existing) {
			await records.update<UserVariableRecord>(existing.id, { value });
		} else {
			await records.create({ username, key: normalizedKey, value });
		}

		return { ok: true };
	}

	listKeys(scope: VariableScope, context?: HandlerTriggerContext): string[] {
		if (scope === 'global') {
			return Object.keys(this.globalVariables);
		}

		if (scope === 'action') {
			return Object.keys(context?.actionVariables ?? {});
		}

		const username = context ? extractUsername(context.data) : undefined;

		if (!username) {
			return [];
		}

		return Object.keys(this.userVariables[username] ?? {});
	}
}
