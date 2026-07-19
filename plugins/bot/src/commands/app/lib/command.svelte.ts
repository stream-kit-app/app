import type { HandlerTriggerContext, PluginAppApi } from '@stream-kit/plugin';
import type { Action, Modal } from '@stream-kit/plugin/action';
import type { StoredActionHandler } from '@stream-kit/plugin/action';
import {
	ActionHandler,
	HandlerDefinition,
	addHandlerToChain,
	cloneHandlerInChain,
	createHandlerFields,
	flattenActionHandlers,
	handlerFromStoredWithResolver,
	hasHandlerErrors,
	removeHandlerFromChain,
	reorderBranchHandlersInChain,
	runHandlerChain,
	type HandlerBranch,
	validateHandlerFields
} from '@stream-kit/plugin/action';
import type { CommandPermissions, CommandRecord, CommandSource } from './stored-command';
import {
	DEFAULT_COMMAND_GROUP,
	DEFAULT_COMMAND_PERMISSIONS,
	DEFAULT_COMMAND_SOURCES
} from './stored-command';

import { normalizeCommandNames } from '../../../lib/commands-store';

import CommandForm from '../ui/command-form.svelte';
import CommandFormFooter from '../ui/command-form-footer.svelte';

import { normalizeCommandGroup } from './command-layout';
import { getCommandsService } from './get-commands';
import type { CommandFormErrors } from './validate-form';
import { validateCommandForm } from './validate-form';

export type CommandProps = {
	id?: string;
	name?: string;
	group?: string;
	groupSortOrder?: number;
	sortOrder?: number;
	commandNames?: string[];
	handlers?: ActionHandler[];
	sources?: CommandSource[];
	permissions?: CommandPermissions;
	cooldownGlobalMs?: number | null;
	cooldownUserMs?: number | null;
	enabled?: boolean;
	ownerPluginKey?: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export class Command {
	id?: string;
	modalId?: string;
	name: string = $state('');
	group: string = $state(DEFAULT_COMMAND_GROUP);
	groupSortOrder: number = $state(0);
	sortOrder: number = $state(0);
	commandNames: string[] = $state(['']);
	handlers: ActionHandler[] = $state([]);
	sources: CommandSource[] = $state([...DEFAULT_COMMAND_SOURCES]);
	permissions: CommandPermissions = $state({ ...DEFAULT_COMMAND_PERMISSIONS });
	cooldownGlobalMs: number | null = $state(null);
	cooldownUserMs: number | null = $state(null);
	enabled: boolean = $state(true);
	ownerPluginKey?: string;
	createdAt?: Date;
	updatedAt?: Date;

	formErrors: CommandFormErrors | null = $state(null);

	constructor(props: CommandProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.group = normalizeCommandGroup(props.group);
		this.groupSortOrder = props.groupSortOrder ?? 0;
		this.sortOrder = props.sortOrder ?? 0;
		this.commandNames = props.commandNames?.length ? [...props.commandNames] : [''];
		this.handlers = props.handlers ?? [];
		this.sources = props.sources?.length ? [...props.sources] : [...DEFAULT_COMMAND_SOURCES];
		this.permissions = props.permissions ?? { ...DEFAULT_COMMAND_PERMISSIONS };
		this.cooldownGlobalMs = props.cooldownGlobalMs ?? null;
		this.cooldownUserMs = props.cooldownUserMs ?? null;
		this.enabled = props.enabled ?? true;
		this.ownerPluginKey = props.ownerPluginKey;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	get hasUnavailableDefinitions(): boolean {
		return this.handlers.some((handler) => !handler.definition.isAvailable);
	}

	get isFormOpen(): boolean {
		return this.modalId != null;
	}

	get displayCommandNames(): string[] {
		return normalizeCommandNames(this.commandNames);
	}

	static createDraft(): Command {
		return new Command();
	}

	static createFrom(source: Command): Command {
		const app = getCommandsService().requireApp();
		const sourceName = source.name.trim() || app.i18n.translate('Untitled command');

		return new Command({
			name: app.i18n.translate('Copy of {name}', { name: sourceName }),
			group: source.group,
			enabled: source.enabled,
			commandNames: [...source.commandNames],
			handlers: source.handlers.map((handler) => ActionHandler.clone(handler)),
			sources: [...source.sources],
			permissions: { roles: [...source.permissions.roles] },
			cooldownGlobalMs: source.cooldownGlobalMs,
			cooldownUserMs: source.cooldownUserMs
		});
	}

	private static handlersFromStored(
		stored: StoredActionHandler[],
		app: PluginAppApi
	): ActionHandler[] {
		const resolveDefinition = (handlerTypeId: string) => app.actions.findHandler(handlerTypeId);

		return stored.map((item) =>
			handlerFromStoredWithResolver(
				item,
				resolveDefinition,
				Command.createUnavailableHandlerDefinition
			)
		);
	}

	static fromRecord(record: CommandRecord, app: PluginAppApi): Command {
		const handlers = Command.handlersFromStored(record.handlers, app);

		return new Command({
			id: record.id,
			name: record.name,
			group: record.group,
			groupSortOrder: record.groupSortOrder,
			sortOrder: record.sortOrder,
			commandNames: record.commandNames.length > 0 ? [...record.commandNames] : [''],
			handlers,
			sources: record.sources,
			permissions: record.permissions,
			cooldownGlobalMs: record.cooldownGlobalMs,
			cooldownUserMs: record.cooldownUserMs,
			enabled: record.enabled,
			ownerPluginKey: record.ownerPluginKey,
			createdAt: record.createdAt,
			updatedAt: record.updatedAt
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

		const now = new Date();

		return {
			id: this.id,
			name: this.name.trim(),
			group: normalizeCommandGroup(this.group),
			groupSortOrder: this.groupSortOrder,
			sortOrder: this.sortOrder,
			commandNames: normalizeCommandNames(this.commandNames),
			handlers: this.handlers.map((handler) => handler.toStored()),
			sources: this.sources,
			permissions: this.permissions,
			cooldownGlobalMs: this.cooldownGlobalMs,
			cooldownUserMs: this.cooldownUserMs,
			enabled: this.enabled,
			...(this.ownerPluginKey ? { ownerPluginKey: this.ownerPluginKey } : {}),
			createdAt: this.createdAt ?? now,
			updatedAt: this.updatedAt ?? now
		};
	}

	open(): Modal {
		const app = getCommandsService().requireApp();

		this.modalId =
			this.id != null ? `command-${this.id}` : `command-draft-${crypto.randomUUID()}`;

		if (this.hasUnavailableDefinitions) {
			this.rebindDefinitions();
		}

		const modal =
			app.modal.get(this.modalId) ??
			app.modal.create({
				id: this.modalId,
				title:
					this.id != null
						? app.i18n.translate('Edit {name}', { name: this.name })
						: app.i18n.translate('New Command'),
				content: CommandForm,
				footer: CommandFormFooter,
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

		getCommandsService().requireApp().modal.get(this.modalId)?.close();
	}

	addHandler(
		definition: HandlerDefinition,
		target?: { parentId: string; branch: HandlerBranch }
	): void {
		this.handlers = addHandlerToChain(this.handlers, definition, target);
	}

	removeHandler(handlerId: string): void {
		this.handlers = removeHandlerFromChain(this.handlers, handlerId);
	}

	cloneHandler(handlerId: string): void {
		this.handlers = cloneHandlerInChain(this.handlers, handlerId);
	}

	reorderHandlers(handlers: ActionHandler[]): void {
		this.handlers = handlers;
	}

	reorderBranchHandlers(
		parentId: string,
		branch: HandlerBranch,
		handlers: ActionHandler[]
	): void {
		this.handlers = reorderBranchHandlersInChain(this.handlers, parentId, branch, handlers);
	}

	rebindDefinitions(): void {
		if (this.isFormOpen) {
			this.rebindDefinitionsInPlace();
			return;
		}

		const app = getCommandsService().requireApp();

		this.rebindDefinitionsInPlace();

		if (this.hasUnavailableDefinitions) {
			this.handlers = Command.handlersFromStored(
				this.handlers.map((handler) => structuredClone(handler.toStored())),
				app
			);
		}
	}

	private rebindDefinitionsInPlace(): void {
		const app = getCommandsService().requireApp();

		for (const handler of flattenActionHandlers(this.handlers)) {
			const resolved = app.actions.findHandler(handler.definition.id);

			if (!resolved?.isAvailable) {
				continue;
			}

			if (handler.definition === resolved) {
				continue;
			}

			const storedFields = structuredClone($state.snapshot(handler.fields));
			handler.definition = resolved;
			handler.fields = createHandlerFields(resolved.fields, storedFields);
		}
	}

	async runHandlerBranch(
		handlers: ActionHandler[],
		context: HandlerTriggerContext
	): Promise<void> {
		await runHandlerChain(handlers, this as unknown as Action, context);
	}

	runHandlers(data: unknown, triggerLabel = 'Command'): void {
		void this.runHandlersAsync(data, triggerLabel);
	}

	async runHandlersAsync(data: unknown, triggerLabel = 'Command'): Promise<boolean> {
		if (!this.enabled) {
			return false;
		}

		if (this.hasUnavailableDefinitions) {
			this.rebindDefinitions();
		}

		const context: HandlerTriggerContext = {
			trigger: triggerLabel,
			data,
			actionVariables: {}
		};

		await runHandlerChain(this.handlers, this as unknown as Action, context);
		return true;
	}

	validateForm(): boolean {
		const app = getCommandsService().requireApp();
		const baseErrors = validateCommandForm(
			{
				name: this.name,
				commandNames: this.commandNames,
				handlersCount: this.handlers.length,
				sources: this.sources,
				cooldownGlobalMs: this.cooldownGlobalMs,
				cooldownUserMs: this.cooldownUserMs
			},
			app.i18n.translate
		);

		const handlerErrors: Record<string, ReturnType<typeof validateHandlerFields>> = {};

		for (const handler of flattenActionHandlers(this.handlers)) {
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

		const app = getCommandsService().requireApp();
		const commands = getCommandsService();
		const wasNew = this.id == null;

		await commands.upsert(this);

		app.toast.create({
			title: app.i18n.translate('Command saved'),
			description: app.i18n.translate('The command has been saved successfully'),
			variant: 'success'
		});

		if (wasNew) {
			// upsert already added to items
		}

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

		await getCommandsService().setEnabledBulk([this.id], enabled);
	}
}
