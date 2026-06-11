import type { HandlerTriggerContext, PluginStore } from '@stream-kit/app/api';

import { extractUsername } from './extract-username';
import { resolveVariables } from './resolve-variables';
import type { VariableScope } from './types';

const GLOBAL_KEY = 'variables';
const USERS_KEY = 'users';

type UserVariableMap = Record<string, Record<string, string>>;

export class VariableStore {
	private store?: PluginStore;
	private globalVariables: Record<string, string> = {};
	private userVariables: UserVariableMap = {};
	private loaded = false;

	bindStore(store: PluginStore): void {
		this.store = store;
	}

	private getStore(): PluginStore {
		if (!this.store) {
			throw new Error('VariableStore is not initialized');
		}

		return this.store;
	}

	async load(): Promise<void> {
		if (this.loaded) {
			return;
		}

		const store = this.getStore();

		this.globalVariables = (await store.get<Record<string, string>>(GLOBAL_KEY)) ?? {};
		this.userVariables = (await store.get<UserVariableMap>(USERS_KEY)) ?? {};
		this.loaded = true;
	}

	resolve(context: HandlerTriggerContext): Record<string, string> {
		return resolveVariables(this, context);
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

		const store = this.getStore();

		if (scope === 'global') {
			this.globalVariables[normalizedKey] = value;
			await store.set(GLOBAL_KEY, this.globalVariables);
			return { ok: true };
		}

		const username = extractUsername(context.data);

		if (!username) {
			return { ok: false, reason: 'missing-user' };
		}

		const userRecord = this.userVariables[username] ?? {};
		userRecord[normalizedKey] = value;
		this.userVariables[username] = userRecord;
		await store.set(USERS_KEY, this.userVariables);

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
