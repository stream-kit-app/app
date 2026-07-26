import type { HandlerFieldInstance } from './handler/field';
import type { ConditionGroupNode } from './trigger/condition';

export type StoredActionTrigger = {
	id: string;
	triggerTypeId: string;
	conditions: ConditionGroupNode;
};

export type StoredActionHandler = {
	id: string;
	handlerTypeId: string;
	fields: HandlerFieldInstance[];
	thenHandlers?: StoredActionHandler[];
	elseHandlers?: StoredActionHandler[];
	/** @deprecated Legacy condition-tree config, migrated on load. */
	config?: ConditionGroupNode;
};

export const DEFAULT_ACTION_GROUP = 'default';
export const DEFAULT_ACTION_QUEUE_NAME = 'default';

export type ActionRecord = {
	id: number;
	syncId: string;
	name: string;
	group: string;
	groupSortOrder: number;
	sortOrder: number;
	enabled: boolean;
	queueId?: number | null;
	ownerPluginKey?: string | null;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
	createdAt: Date;
	updatedAt: Date;
};

export type NewActionRecord = {
	id?: number;
	syncId?: string;
	name: string;
	group?: string;
	groupSortOrder?: number;
	sortOrder?: number;
	enabled?: boolean;
	queueId?: number | null;
	ownerPluginKey?: string;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
	createdAt?: Date;
	updatedAt?: Date;
};

export type ActionLayoutUpdate = {
	id: number;
	group: string;
	groupSortOrder: number;
	sortOrder: number;
};
