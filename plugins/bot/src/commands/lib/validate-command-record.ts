import type { PluginAppApi } from '@stream-kit/plugin';
import type { StoredActionHandler } from '@stream-kit/plugin/action';
import {
	flattenActionHandlers,
	handlerFromStoredWithResolver,
	hasHandlerErrors,
	HandlerDefinition,
	validateHandlerFields
} from '@stream-kit/plugin/action';
import type { NewCommandRecord } from '@stream-kit/plugin';

import { validateCommandForm } from '../app/lib/validate-form';

function createUnavailableHandlerDefinition(id: string): HandlerDefinition {
	const definition = new HandlerDefinition({
		id,
		name: id
	});
	definition.setAvailable(false);

	return definition;
}

function handlersFromStored(stored: StoredActionHandler[], app: PluginAppApi) {
	const resolveDefinition = (handlerTypeId: string) => app.actions.findHandler(handlerTypeId);

	return stored.map((item) =>
		handlerFromStoredWithResolver(
			item,
			resolveDefinition,
			createUnavailableHandlerDefinition
		)
	);
}

export function validateCommandRecord(
	input: Pick<
		NewCommandRecord,
		| 'name'
		| 'commandNames'
		| 'handlers'
		| 'sources'
		| 'cooldownGlobalMs'
		| 'cooldownUserMs'
	>,
	app: PluginAppApi
): void {
	const baseErrors = validateCommandForm(
		{
			name: input.name,
			commandNames: input.commandNames,
			handlersCount: input.handlers.length,
			sources: input.sources ?? ['twitch'],
			cooldownGlobalMs: input.cooldownGlobalMs ?? null,
			cooldownUserMs: input.cooldownUserMs ?? null
		},
		app.i18n.translate
	);

	if (baseErrors) {
		const message =
			baseErrors.name ??
			baseErrors.commandNames ??
			baseErrors.handlers ??
			baseErrors.sources ??
			baseErrors.cooldownGlobal ??
			baseErrors.cooldownUser ??
			'Invalid command';

		throw new Error(message);
	}

	const handlers = handlersFromStored(input.handlers, app);

	for (const handler of flattenActionHandlers(handlers)) {
		const errors = validateHandlerFields(handler.fields, handler.fieldDefinitions);

		if (hasHandlerErrors(errors)) {
			throw new Error(`Invalid handler configuration for "${handler.definition.name}"`);
		}
	}
}

export { getOwnedCommandIds } from './owned-command-ids';
export { mergeCommandRecord, toCommandRecordInput } from './command-record-input';
