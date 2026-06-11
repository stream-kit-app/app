import type { Modal } from '$lib/core/modal';
import type { Action } from '$lib/core/action/action.svelte';
import type { HandlerTriggerContext } from '$lib/core/action/handler-context';
import { runHandlerChain } from '$lib/core/action/run-handler-chain';
import { ActionHandler } from '$lib/core/action/action-handler.svelte';
import { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';
import { migrateLegacyHandlerFields } from '$lib/core/action/handler-field';
import type { CommandPermissions, CommandRecord, CommandSource } from './stored-command';
import {
	DEFAULT_COMMAND_PERMISSIONS,
	DEFAULT_COMMAND_SOURCES
} from './stored-command';

import {
	normalizeCommandNames,
	saveCommand,
	updateCommandEnabled
} from '../db/repository';

import CommandForm from '../ui/command-form.svelte';
import { translate } from '$lib/i18n';

import { getApp } from '$lib/core/registry';
import { getCommandsService } from './get-commands';
import type { CommandFormErrors } from './validate-form';
import { validateCommandForm } from './validate-form';
import {
	hasHandlerErrors,
	validateHandlerFields
} from '$lib/core/action/validate-form';

export type CommandProps = {
	id?: number;
	name?: string;
	commandNames?: string[];
	handlers?: ActionHandler[];
	sources?: CommandSource[];
	permissions?: CommandPermissions;
	cooldownGlobalMs?: number | null;
	cooldownUserMs?: number | null;
	enabled?: boolean;
};

export class Command {
	id?: number;
	modalId?: string;
	name: string = $state('');
	commandNames: string[] = $state(['']);
	handlers: ActionHandler[] = $state([]);
	sources: CommandSource[] = $state([...DEFAULT_COMMAND_SOURCES]);
	permissions: CommandPermissions = $state({ ...DEFAULT_COMMAND_PERMISSIONS });
	cooldownGlobalMs: number | null = $state(null);
	cooldownUserMs: number | null = $state(null);
	enabled: boolean = $state(true);

	formErrors: CommandFormErrors | null = $state(null);

	constructor(props: CommandProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.commandNames = props.commandNames?.length ? [...props.commandNames] : [''];
		this.handlers = props.handlers ?? [];
		this.sources = props.sources?.length ? [...props.sources] : [...DEFAULT_COMMAND_SOURCES];
		this.permissions = props.permissions ?? { ...DEFAULT_COMMAND_PERMISSIONS };
		this.cooldownGlobalMs = props.cooldownGlobalMs ?? null;
		this.cooldownUserMs = props.cooldownUserMs ?? null;
		this.enabled = props.enabled ?? true;
	}

	get hasUnavailableDefinitions(): boolean {
		return this.handlers.some((handler) => !handler.definition.isAvailable);
	}

	get displayCommandNames(): string[] {
		return normalizeCommandNames(this.commandNames);
	}

	static createDraft(): Command {
		return new Command();
	}

	static fromRecord(record: CommandRecord): Command {
		const app = getApp();
		const handlers = record.handlers.map((stored) => {
			const definition =
				app.actions.actions.find(stored.handlerTypeId) ??
				Command.createUnavailableHandlerDefinition(stored.handlerTypeId);

			return new ActionHandler(definition, {
				id: stored.id,
				fields: migrateLegacyHandlerFields(stored)
			});
		});

		return new Command({
			id: record.id,
			name: record.name,
			commandNames: record.commandNames.length > 0 ? [...record.commandNames] : [''],
			handlers,
			sources: record.sources,
			permissions: record.permissions,
			cooldownGlobalMs: record.cooldownGlobalMs,
			cooldownUserMs: record.cooldownUserMs,
			enabled: record.enabled
		});
	}

	private static createUnavailableHandlerDefinition(id: string): HandlerDefinition {
		const definition = new HandlerDefinition({
			id,
			name: id
		});
		definition.setAvailable(false);

		return definition;
	}

	toRecord(): CommandRecord {
		if (this.id == null) {
			throw new Error('Command must be saved before converting to a record');
		}

		return {
			id: this.id,
			name: this.name.trim(),
			commandNames: normalizeCommandNames(this.commandNames),
			handlers: this.handlers.map((handler) => handler.toStored()),
			sources: this.sources,
			permissions: this.permissions,
			cooldownGlobalMs: this.cooldownGlobalMs,
			cooldownUserMs: this.cooldownUserMs,
			enabled: this.enabled,
			createdAt: new Date(),
			updatedAt: new Date()
		};
	}

	open(): Modal {
		this.modalId =
			this.id != null ? `command-${this.id}` : `command-draft-${crypto.randomUUID()}`;
		const app = getApp();

		const modal =
			app.modals.get(this.modalId) ??
			app.createModal({
				id: this.modalId,
				title:
					this.id != null
						? translate('Edit {name}', { name: this.name })
						: translate('New Command'),
				content: CommandForm,
				props: { command: this }
			});

		modal.open();
		this.formErrors = null;

		return modal;
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		await getCommandsService().delete(this.id);
		this.close();
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getApp().modals.get(this.modalId)?.close();
	}

	addHandler(definition: HandlerDefinition): void {
		this.handlers = [...this.handlers, new ActionHandler(definition)];
	}

	removeHandler(handlerId: string): void {
		this.handlers = this.handlers.filter((handler) => handler.id !== handlerId);
	}

	runHandlers(data: unknown, triggerLabel = 'Command'): void {
		if (!this.enabled) {
			return;
		}

		const context: HandlerTriggerContext = {
			trigger: triggerLabel,
			data
		};

		const actionProxy = this as unknown as Action;

		runHandlerChain(this.handlers, actionProxy, context);
	}

	validateForm(): boolean {
		const baseErrors = validateCommandForm({
			name: this.name,
			commandNames: this.commandNames,
			handlersCount: this.handlers.length,
			sources: this.sources
		});

		const handlerErrors: Record<string, ReturnType<typeof validateHandlerFields>> = {};

		for (const handler of this.handlers) {
			const errors = validateHandlerFields(handler.fields, handler.fieldDefinitions);

			if (hasHandlerErrors(errors)) {
				handlerErrors[handler.id] = errors;
			}
		}

		if (!baseErrors && Object.keys(handlerErrors).length === 0) {
			this.formErrors = null;
			return true;
		}

		this.formErrors = {
			name: baseErrors?.name,
			commandNames: baseErrors?.commandNames,
			handlers: baseErrors?.handlers,
			sources: baseErrors?.sources,
			handlerErrors
		};

		return false;
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		const app = getApp();
		const commands = getCommandsService();
		const wasNew = this.id == null;
		const row = await saveCommand(
			{
				name: this.name.trim(),
				commandNames: this.commandNames,
				handlers: this.handlers.map((handler) => handler.toStored()),
				sources: this.sources,
				permissions: this.permissions,
				cooldownGlobalMs: this.cooldownGlobalMs,
				cooldownUserMs: this.cooldownUserMs,
				enabled: this.enabled
			},
			this.id
		);

		if (row) {
			this.id = row.id;
			this.commandNames = row.commandNames.length > 0 ? [...row.commandNames] : [''];
			this.enabled = row.enabled;
		}

		if (wasNew && row) {
			commands.add(this);
		} else if (row) {
			commands.items = commands.items.map((item) => (item.id === row.id ? this : item));
		}

		app.toast.create({
			title: translate('Command saved'),
			description: translate('The command has been saved successfully'),
			variant: 'success'
		});

		this.close();

		return true;
	}

	async setEnabled(enabled: boolean): Promise<void> {
		if (this.enabled === enabled) {
			return;
		}

		this.enabled = enabled;

		if (this.id == null) {
			return;
		}

		await updateCommandEnabled(this.id, enabled);

		getApp().toast.create({
			title: translate(enabled ? 'Command enabled' : 'Command disabled'),
			description: translate(
				enabled ? '{name} has been enabled.' : '{name} has been disabled.',
				{
					name: this.name.trim() || translate('this command')
				}
			),
			variant: 'success'
		});
	}
}
