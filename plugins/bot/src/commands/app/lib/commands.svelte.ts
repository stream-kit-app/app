import type { HandlerTriggerContext, PluginAppApi, PluginStore } from '@stream-kit/plugin';
import type { SelectItem } from '@stream-kit/ui/types';
import type { CommandLayoutUpdate, CommandRecord, NewCommandRecord } from './stored-command';

import { loadCommands, saveCommands } from '../../../lib/commands-store';
import { getOwnedCommandIds } from '../../lib/owned-command-ids';
import {
	mergeCommandRecord,
	toCommandRecordInput
} from '../../lib/command-record-input';
import { validateCommandRecord } from '../../lib/validate-command-record';

import { buildCommandsExport, isExportableCommand } from './command-export';
import {
	applyLayoutUpdates,
	buildDndLayout,
	compareCommandsByLayout,
	dndLayoutToUpdates,
	getGroupOrder,
	normalizeCommandGroup
} from './command-layout';
import { exportedCommandToNewRecord, parseCommandsExport } from './command-import';
import { Command } from './command.svelte';

export type CommandRuntimeFactory = (app: PluginAppApi) => () => void;

export type CommandRecordOptions = {
	ownerPluginKey?: string;
};

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

		this.items = [...this.items, command].sort(compareCommandsByLayout);
	}

	async applyLayout(updates: CommandLayoutUpdate[]): Promise<void> {
		if (updates.length === 0) {
			return;
		}

		this.items = applyLayoutUpdates(this.items, updates);
		await this.persist();
	}

	getGroups(): string[] {
		return [...new Set(this.items.map((command) => command.group))].sort((left, right) =>
			left.localeCompare(right)
		);
	}

	getGroupSelectItems(): SelectItem[] {
		return this.getGroups().map((group) => ({ value: group, label: group }));
	}

	async moveToGroup(
		ids: string[],
		changes: { group?: string; groupOrder?: string[] }
	): Promise<void> {
		if (ids.length === 0 || changes.group === undefined) {
			return;
		}

		const { app } = this.requireContext();
		const targetGroup = normalizeCommandGroup(changes.group);
		const idSet = new Set(ids);
		const layout = buildDndLayout(this.items);

		for (const group of Object.keys(layout)) {
			layout[group] = (layout[group] ?? []).filter((item) => !idSet.has(item.id));
		}

		if (!layout[targetGroup]) {
			layout[targetGroup] = [];
		}

		for (const id of ids) {
			const command = this.items.find((item) => item.id === id);

			if (command?.id != null) {
				layout[targetGroup].push({ id: command.id, command });
			}
		}

		let nextGroupOrder = changes.groupOrder ?? getGroupOrder(layout);

		if (!nextGroupOrder.includes(targetGroup)) {
			nextGroupOrder = [...nextGroupOrder, targetGroup];
		}

		nextGroupOrder = nextGroupOrder.filter((group) => (layout[group]?.length ?? 0) > 0);

		await this.applyLayout(dndLayoutToUpdates(layout, nextGroupOrder));

		app.toast.create({
			title: app.i18n.translate('Selected commands updated'),
			description: app.i18n.translate('Moved {count} commands to group.', {
				count: ids.length
			}),
			variant: 'success'
		});
	}

	async delete(id: string): Promise<void> {
		await this.deleteBulk([id]);
	}

	async deleteById(id: string): Promise<boolean> {
		const exists = this.items.some((command) => command.id === id);

		if (!exists) {
			return false;
		}

		await this.deleteBulkSilent([id]);
		return true;
	}

	async deleteByOwner(ownerPluginKey: string): Promise<number> {
		const ids = getOwnedCommandIds(this.items, ownerPluginKey);

		if (ids.length === 0) {
			return 0;
		}

		await this.deleteBulkSilent(ids);
		return ids.length;
	}

	private async deleteBulkSilent(ids: string[]): Promise<void> {
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
	}

	async createFromRecord(
		input: NewCommandRecord,
		options?: CommandRecordOptions
	): Promise<CommandRecord> {
		const { app } = this.requireContext();
		const id = input.id ?? crypto.randomUUID();

		if (this.items.some((command) => command.id === id)) {
			throw new Error(`Command with id "${id}" already exists`);
		}

		validateCommandRecord(input, app);

		const record = toCommandRecordInput({ ...input, id }, options);
		const command = Command.fromRecord(record, app);

		await this.upsert(command);

		return command.toRecord();
	}

	async updateFromRecord(
		id: string,
		input: Omit<NewCommandRecord, 'id'>,
		options?: CommandRecordOptions
	): Promise<CommandRecord> {
		const { app } = this.requireContext();
		const existing = this.items.find((command) => command.id === id);

		if (!existing) {
			throw new Error(`Command with id "${id}" not found`);
		}

		const merged = mergeCommandRecord(existing.toRecord(), input, options);

		validateCommandRecord(
			{
				name: merged.name,
				commandNames: merged.commandNames,
				handlers: merged.handlers,
				sources: merged.sources,
				cooldownGlobalMs: merged.cooldownGlobalMs,
				cooldownUserMs: merged.cooldownUserMs
			},
			app
		);

		const command = Command.fromRecord(merged, app);

		await this.upsert(command);

		return command.toRecord();
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

	async refreshDefinitionBindings(): Promise<void> {
		const { store, app } = this.requireContext();
		const rows = await loadCommands(store);
		const openById = new Map(
			this.items
				.filter((command): command is Command & { id: string } => command.isFormOpen && command.id != null)
				.map((command) => [command.id, command])
		);

		this.items = rows.map((row) => openById.get(row.id) ?? Command.fromRecord(row, app));
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

	getExportableCommands(): Command[] {
		return this.items.filter(isExportableCommand);
	}

	async exportToJson(commands: Command[]): Promise<void> {
		const { app } = this.requireContext();
		const payload = buildCommandsExport(commands);

		if (payload.commands.length === 0) {
			app.toast.create({
				title: app.i18n.translate('Nothing to export'),
				description: app.i18n.translate('Select one or more commands to export.'),
				variant: 'warning'
			});
			return;
		}

		const path = await app.fs.save({
			defaultPath: 'commands.json',
			filters: [{ name: app.i18n.translate('Commands JSON'), extensions: ['json'] }]
		});

		if (!path) {
			return;
		}

		await app.fs.writeTextFile(path, JSON.stringify(payload, null, 2));

		app.toast.create({
			title: app.i18n.translate('Commands exported'),
			description: app.i18n.translate('{count} commands exported.', {
				count: payload.commands.length
			}),
			variant: 'success'
		});
	}

	async importFromJsonPath(path: string): Promise<number> {
		const { app } = this.requireContext();
		const raw = await app.fs.readTextFile(path);
		const payload = parseCommandsExport(raw);
		let imported = 0;

		for (const command of payload.commands) {
			await this.createFromRecord(exportedCommandToNewRecord(command));
			imported += 1;
		}

		app.toast.create({
			title: app.i18n.translate('Commands imported'),
			description: app.i18n.translate('{count} commands imported.', { count: imported }),
			variant: 'success'
		});

		return imported;
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

		if (command.hasUnavailableDefinitions) {
			command.rebindDefinitions();
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
