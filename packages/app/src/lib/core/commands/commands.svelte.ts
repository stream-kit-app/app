import type { HandlerTriggerContext } from '../action/handler-context';
import type { App } from '../app.svelte';
import type { PluginAppApi } from '../plugins/app-api';
import type { CommandRecord } from './stored-command';

import {
	deleteCommands,
	getCommands,
	updateCommandsEnabled
} from '$db/repositories/commands';

import { translate } from '$lib/i18n';

import { getApp } from '../registry';
import { createPluginAppApi } from '../plugins/app-api';
import { Command } from './command.svelte';

export type CommandRuntimeFactory = (app: PluginAppApi) => () => void;

export class Commands {
	items: Command[] = $state.raw([]);
	private runtimeCleanup: (() => void) | null = null;
	private runtimeFactory: CommandRuntimeFactory | null = null;

	registerRuntime(factory: CommandRuntimeFactory): void {
		this.runtimeFactory = factory;
	}

	add(command: Command): void {
		if (command.id != null && this.items.some((item) => item.id === command.id)) {
			return;
		}

		this.items = [...this.items, command];
	}

	async delete(id: number): Promise<void> {
		await this.deleteBulk([id]);
	}

	async deleteBulk(ids: number[]): Promise<void> {
		const toDelete = this.items.filter(
			(command) => command.id != null && ids.includes(command.id)
		);

		if (toDelete.length === 0) {
			return;
		}

		for (const command of toDelete) {
			command.close();
		}

		await deleteCommands(toDelete.map((command) => command.id!));

		const deletedIds = new Set(toDelete.map((command) => command.id));
		this.items = this.items.filter((item) => item.id == null || !deletedIds.has(item.id));

		const app = getApp();

		app.toast.create({
			title: translate('Commands deleted'),
			description: translate('{count} commands have been deleted.', {
				count: toDelete.length
			}),
			variant: 'success'
		});
	}

	async load(): Promise<void> {
		const rows = await getCommands();

		this.items = rows.map((row) => Command.fromRecord(row));
	}

	activate(app: App): void {
		this.deactivate();

		if (!this.runtimeFactory) {
			return;
		}

		this.runtimeCleanup = this.runtimeFactory(createPluginAppApi(app));
	}

	deactivate(): void {
		this.runtimeCleanup?.();
		this.runtimeCleanup = null;
	}

	getSnapshot(): CommandRecord[] {
		return this.items
			.filter((command): command is Command & { id: number } => command.id != null)
			.map((command) => command.toRecord());
	}

	findByTrigger(trigger: string): Command | undefined {
		const normalized = trigger.trim().replace(/^!+/, '').toLowerCase();

		return this.items.find(
			(command) => command.enabled && command.displayCommandNames.includes(normalized)
		);
	}

	runById(id: number, context: HandlerTriggerContext): boolean {
		const command = this.items.find((item) => item.id === id);

		if (!command) {
			return false;
		}

		command.runHandlers(context.data, context.trigger);

		return true;
	}

	async setEnabledBulk(ids: number[], enabled: boolean): Promise<void> {
		const toUpdate = this.items.filter(
			(command) => command.id != null && ids.includes(command.id) && command.enabled !== enabled
		);

		if (toUpdate.length === 0) {
			return;
		}

		for (const command of toUpdate) {
			command.enabled = enabled;
		}

		await updateCommandsEnabled(
			toUpdate.map((command) => command.id!),
			enabled
		);

		const app = getApp();

		app.toast.create({
			title: translate(enabled ? 'Commands enabled' : 'Commands disabled'),
			description: translate(
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
