import type { Action } from './action.svelte';
import type { StoredActionHandler, StoredActionTrigger } from './stored-action';

import { getApp } from '../registry';

export const ACTIONS_EXPORT_VERSION = 1;

export type ExportedAction = {
	name: string;
	group: string;
	enabled: boolean;
	queueName: string | null;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
};

export type ActionsExportFile = {
	version: typeof ACTIONS_EXPORT_VERSION;
	exportedAt: string;
	actions: ExportedAction[];
};

export function isExportableAction(action: Action): boolean {
	return action.id != null && action.ownerPluginKey == null;
}

export function buildActionsExport(actions: Action[]): ActionsExportFile {
	const app = getApp();

	return {
		version: ACTIONS_EXPORT_VERSION,
		exportedAt: new Date().toISOString(),
		actions: actions.filter(isExportableAction).map((action) => {
			const queueName =
				action.queueId != null
					? (app.actionQueues.getDefinition(action.queueId)?.name ?? null)
					: null;

			return {
				name: action.name,
				group: action.group,
				enabled: action.enabled,
				queueName,
				triggers: action.triggers.map((trigger) => trigger.toStored()),
				handlers: action.handlers.map((handler) => handler.toStored())
			};
		})
	};
}
