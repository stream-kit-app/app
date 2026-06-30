import type { HandlerTriggerContext, PluginAppApi, PluginStore } from '@stream-kit/plugin';
import type { CommandRecord } from './stored-command';

import { loadCommands, saveCommands } from '../../../lib/commands-store';

import { Command } from './command.svelte';

export type CommandRuntimeFactory = (app: PluginAppApi) => () => void;

export class Commands {
	items: Command[] = $state.raw([]);
	private runtimeCleanup: (() => void) | null = null;
	private runtimeFactory: CommandRuntimeFactory | null = null;
	private store?: PluginStore;
	private app?: PluginAppApi;

	bind(store: PluginStore, app: PluginAppApi): void {
		this.store = store;
		this.app = app;
	}

	private requireContext(): { store: PluginStore; app: PluginAppApi } {
		if (!this.store || !this.app) {
			throw new Error('Commands service has not been bound to a plugin store');
		}

		return { store: this.store, app: this.app };
	}

	requireApp(): PluginAppApi {
		return this.requireContext().app;
	}

	registerRuntime(factory: CommandRuntimeFactory): void {
		this.runtimeFactory = factory;
	}

	add(command: Command): void {
		if (command.id != null && this.items.some((item) => item.id === command.id)) {
			return;
		}

		this.items = [...this.items, command];
	}

	async delete(id: string): Promise<void> {
		await this.deleteBulk([id]);
	}

	async deleteBulk(ids: string[]): Promise<void> {
		const toDelete = this.items.filter(
			(command) => command.id != null && ids.includes(command.id)
		);

		if (toDelete.length === 0) {
			return;
		}

		for (const command of toDelete) {
			command.close();
		}

		const deletedIds = new Set(toDelete.map((command) => command.id));
		this.items = this.items.filter((item) => item.id == null || !deletedIds.has(item.id));
		await this.persist();

		const { app } = this.requireContext();

		app.toast.create({
			title: app.i18n.translate('Commands deleted'),
			description: app.i18n.translate('{count} commands have been deleted.', {
				count: toDelete.length
			}),
			variant: 'success'
		});
	}

	async load(): Promise<void> {
		const { store, app } = this.requireContext();
		const rows = await loadCommands(store);

		this.items = rows.map((row) => Command.fromRecord(row, app));
	}

	async persist(): Promise<void> {
		const { store } = this.requireContext();
		await saveCommands(store, this.getSnapshot());
	}

	async upsert(command: Command): Promise<void> {
		const wasNew = command.id == null || !this.items.some((item) => item.id === command.id);

		if (command.id == null) {
			command.id = crypto.randomUUID();
		}

		const now = new Date();

		if (wasNew) {
			command.createdAt = now;
			command.updatedAt = now;
			this.add(command);
		} else {
			command.updatedAt = now;
			this.items = this.items.map((item) => (item.id === command.id ? command : item));
		}

		await this.persist();
	}

	activate(pluginApp: PluginAppApi): void {
		this.deactivate();

		if (!this.runtimeFactory) {
			return;
		}

		this.runtimeCleanup = this.runtimeFactory(pluginApp);
	}

	deactivate(): void {
		this.runtimeCleanup?.();
		this.runtimeCleanup = null;
	}

	getSnapshot(): CommandRecord[] {
		return this.items
			.filter((command): command is Command & { id: string } => command.id != null)
			.map((command) => command.toRecord());
	}

	findByTrigger(trigger: string): Command | undefined {
		const normalized = trigger.trim().replace(/^!+/, '').toLowerCase();

		return this.items.find(
			(command) =>
				command.enabled &&
				command.displayCommandNames.some((pattern) => {
					const baseName = pattern.split(/\s+/)[0]?.toLowerCase();

					return pattern.toLowerCase() === normalized || baseName === normalized;
				})
		);
	}

	runById(id: string, context: HandlerTriggerContext): boolean {
		const command = this.items.find((item) => item.id === id);

		if (!command) {
			return false;
		}

		command.runHandlers(context.data, context.trigger);

		return true;
	}

	async setEnabledBulk(ids: string[], enabled: boolean): Promise<void> {
		const toUpdate = this.items.filter(
			(command) => command.id != null && ids.includes(command.id) && command.enabled !== enabled
		);

		if (toUpdate.length === 0) {
			return;
		}

		for (const command of toUpdate) {
			command.enabled = enabled;
			command.updatedAt = new Date();
		}

		await this.persist();

		const { app } = this.requireContext();

		app.toast.create({
			title: app.i18n.translate(enabled ? 'Commands enabled' : 'Commands disabled'),
			description: app.i18n.translate(
				enabled
					? '{count} commands have been enabled.'
					: '{count} commands have been disabled.',
				{ count: toUpdate.length }
			),
			variant: 'success'
		});
	}
}

export { Command };
