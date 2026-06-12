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
	/** @deprecated Legacy condition-tree config, migrated on load. */
	config?: ConditionGroupNode;
};

export const DEFAULT_ACTION_GROUP = 'default';

export type ActionRecord = {
	id: number;
	name: string;
	group: string;
	groupSortOrder: number;
	sortOrder: number;
	enabled: boolean;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
	createdAt: Date;
	updatedAt: Date;
};

export type NewActionRecord = {
	id?: number;
	name: string;
	group?: string;
	groupSortOrder?: number;
	sortOrder?: number;
	enabled?: boolean;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
	createdAt: Date;
	updatedAt: Date;
};

export type ActionLayoutUpdate = {
	id: number;
	group: string;
	groupSortOrder: number;
	sortOrder: number;
};
