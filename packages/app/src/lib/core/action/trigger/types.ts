import type { Action } from '../action.svelte';
import type { ActionTrigger } from '../action-trigger.svelte';
import type { ConditionDefinition, ConditionGroupNode, ResolvedConditionDefinition } from './condition';

export type TriggerTestFn = (action: Action, trigger: ActionTrigger) => unknown;

export type TriggerDefinitionProps<TContext = unknown> = {
	name: string;
	pluginName?: string;
	children?: TriggerDefinitionProps<any>[];
	conditions?: ConditionDefinition[];
	validate?: (
		conditions: ConditionGroupNode,
		context: TContext,
		trigger?: ActionTrigger
	) => boolean;
	activate?: (action: Action, trigger: ActionTrigger) => void;
	deactivate?: (action: Action, trigger: ActionTrigger) => void;
	onTest?: TriggerTestFn;
};

export type ResolvedTriggerDefinitionProps<TContext = unknown> = Omit<
	TriggerDefinitionProps<TContext>,
	'children' | 'conditions'
> & {
	id: string;
	children?: ResolvedTriggerDefinitionProps<any>[];
	conditions?: ResolvedConditionDefinition[];
};
