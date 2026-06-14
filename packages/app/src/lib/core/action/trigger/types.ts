import type { Action } from '../action.svelte';
import type { ActionTrigger } from '../action-trigger.svelte';
import type { TriggerFormErrors } from '../validate-form';
import type { ConditionDefinition, ConditionGroupNode, ResolvedConditionDefinition } from './condition';

export type TriggerTestFn = (action: Action, trigger: ActionTrigger) => unknown;

export type TriggerValidateFormFn = (
	conditions: ConditionGroupNode
) => TriggerFormErrors | undefined;

export type TriggerDefinitionProps<TContext = unknown> = {
	id?: string;
	name: string;
	pluginName?: string;
	children?: TriggerDefinitionProps<any>[];
	conditions?: ConditionDefinition[];
	validate?: (
		conditions: ConditionGroupNode,
		context: TContext,
		trigger?: ActionTrigger
	) => boolean;
	validateForm?: TriggerValidateFormFn;
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
