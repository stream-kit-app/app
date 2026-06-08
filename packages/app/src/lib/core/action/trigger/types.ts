import type { Action } from '../action.svelte';
import type { ActionTrigger } from '../action-trigger.svelte';
import type { ConditionDefinition, ConditionGroupNode } from './condition';

export type TriggerDefinitionProps<TContext = unknown> = {
	id: string;
	name: string;
	pluginName?: string;
	children?: TriggerDefinitionProps<any>[];
	conditions?: ConditionDefinition[];
	validate?: (conditions: ConditionGroupNode, context: TContext) => boolean;
	activate?: (action: Action, trigger: ActionTrigger) => void;
	deactivate?: (action: Action, trigger: ActionTrigger) => void;
};
