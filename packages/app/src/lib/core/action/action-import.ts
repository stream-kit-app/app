import type { NewActionRecord, StoredActionHandler, StoredActionTrigger } from './stored-action';

import { getApp } from '../registry';
import {
	ACTIONS_EXPORT_VERSION,
	type ActionsExportFile,
	type ExportedAction
} from './action-export';

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function withFreshHandlerIds(handler: StoredActionHandler): StoredActionHandler {
	const next: StoredActionHandler = {
		...handler,
		id: crypto.randomUUID(),
		fields: structuredClone(handler.fields)
	};

	if (handler.thenHandlers) {
		next.thenHandlers = handler.thenHandlers.map(withFreshHandlerIds);
	}

	if (handler.elseHandlers) {
		next.elseHandlers = handler.elseHandlers.map(withFreshHandlerIds);
	}

	return next;
}

function withFreshTriggerIds(trigger: StoredActionTrigger): StoredActionTrigger {
	return {
		...trigger,
		id: crypto.randomUUID(),
		conditions: structuredClone(trigger.conditions)
	};
}

function resolveQueueId(queueName: string | null): number | null {
	const app = getApp();

	if (queueName == null) {
		return null;
	}

	const match = app.actionQueues.definitions.find((definition) => definition.name === queueName);

	if (match) {
		return match.id;
	}

	return app.actionQueues.defaultQueueId;
}

function parseExportedAction(value: unknown, index: number): ExportedAction {
	if (!isRecord(value)) {
		throw new Error(`Action at index ${index} is invalid`);
	}

	if (typeof value.name !== 'string' || value.name.trim().length === 0) {
		throw new Error(`Action at index ${index} is missing a name`);
	}

	if (!Array.isArray(value.triggers)) {
		throw new Error(`Action "${value.name}" is missing triggers`);
	}

	if (!Array.isArray(value.handlers)) {
		throw new Error(`Action "${value.name}" is missing handlers`);
	}

	const queueName =
		value.queueName == null
			? null
			: typeof value.queueName === 'string'
				? value.queueName
				: null;

	return {
		name: value.name,
		group: typeof value.group === 'string' ? value.group : 'default',
		enabled: typeof value.enabled === 'boolean' ? value.enabled : true,
		queueName,
		triggers: value.triggers as StoredActionTrigger[],
		handlers: value.handlers as StoredActionHandler[]
	};
}

export function parseActionsExport(raw: string): ActionsExportFile {
	let parsed: unknown;

	try {
		parsed = JSON.parse(raw);
	} catch {
		throw new Error('File is not valid JSON');
	}

	if (!isRecord(parsed)) {
		throw new Error('Actions export file is invalid');
	}

	if (parsed.version !== ACTIONS_EXPORT_VERSION) {
		throw new Error(`Unsupported actions export version: ${String(parsed.version)}`);
	}

	if (!Array.isArray(parsed.actions)) {
		throw new Error('Actions export file is missing an actions array');
	}

	if (parsed.actions.length === 0) {
		throw new Error('Actions export file contains no actions');
	}

	return {
		version: ACTIONS_EXPORT_VERSION,
		exportedAt: typeof parsed.exportedAt === 'string' ? parsed.exportedAt : new Date().toISOString(),
		actions: parsed.actions.map(parseExportedAction)
	};
}

export function exportedActionToNewRecord(action: ExportedAction): NewActionRecord {
	return {
		name: action.name,
		group: action.group,
		enabled: action.enabled,
		queueId: resolveQueueId(action.queueName),
		triggers: action.triggers.map(withFreshTriggerIds),
		handlers: action.handlers.map(withFreshHandlerIds)
	};
}
