import type { Action } from '../action.svelte';
import type { ActionTrigger } from '../action-trigger.svelte';
import type { ConditionDefinition, ConditionGroupNode, ResolvedConditionDefinition } from './condition';

export type TriggerDefinitionProps<TContext = unknown> = {
	name: string;
	pluginName?: string;
	children?: TriggerDefinitionProps<any>[];
	conditions?: ConditionDefinition[];
	validate?: (conditions: ConditionGroupNode, context: TContext) => boolean;
	activate?: (action: Action, trigger: ActionTrigger) => void;
	deactivate?: (action: Action, trigger: ActionTrigger) => void;
};

export type ResolvedTriggerDefinitionProps<TContext = unknown> = Omit<
	TriggerDefinitionProps<TContext>,
	'children' | 'conditions'
> & {
	id: string;
	children?: ResolvedTriggerDefinitionProps<any>[];
	conditions?: ResolvedConditionDefinition[];
};
