import type { Action } from '../action.svelte';
import type { ActionTrigger } from '../action-trigger.svelte';
import type { TriggerFormErrors } from '../validate-form';
import type { ConditionDefinition, ConditionGroupNode, ResolvedConditionDefinition } from './condition';

/** Test function invoked from the action editor to preview trigger context. */
export type TriggerTestFn = (action: Action, trigger: ActionTrigger) => unknown;

/** Validate trigger condition form values before saving an action. */
export type TriggerValidateFormFn = (
	conditions: ConditionGroupNode
) => TriggerFormErrors | undefined;

/**
 * Definition of an action trigger type that users can attach to actions.
 */
export type TriggerDefinitionProps<TContext = unknown> = {
	/** Stable trigger id. Auto-generated from plugin key and name when omitted. */
	id?: string;
	/** Display name in the trigger picker. */
	name: string;
	/** Owning plugin display name (set automatically during registration). */
	pluginName?: string;
	/** Nested sub-triggers shown as a group in the picker. */
	children?: TriggerDefinitionProps<any>[];
	/** Condition fields users configure when adding this trigger to an action. */
	conditions?: ConditionDefinition[];
	/**
	 * Runtime validation: return `true` when trigger context matches configured conditions.
	 *
	 * @example
	 * ```ts
	 * validate: (conditions, context) => context.message.startsWith('!')
	 * ```
	 */
	validate?: (
		conditions: ConditionGroupNode,
		context: TContext,
		trigger?: ActionTrigger
	) => boolean;
	/** Validate condition form values in the action editor. */
	validateForm?: TriggerValidateFormFn;
	/**
	 * Called when an action with this trigger is enabled. Use to start listeners or subscriptions.
	 *
	 * @example
	 * ```ts
	 * activate: (action, trigger) => {
	 *   const unlisten = subscribe(trigger, (ctx) => action.run(ctx));
	 *   trigger.setCleanup(unlisten);
	 * }
	 * ```
	 */
	activate?: (action: Action, trigger: ActionTrigger) => void;
	/**
	 * Called when an action with this trigger is disabled. Use to stop listeners started in `activate`.
	 */
	deactivate?: (action: Action, trigger: ActionTrigger) => void;
	/** Return sample context for the Test button in the action editor. */
	onTest?: TriggerTestFn;
};

/** Trigger definition after ids and condition keys are resolved at registration time. */
export type ResolvedTriggerDefinitionProps<TContext = unknown> = Omit<
	TriggerDefinitionProps<TContext>,
	'children' | 'conditions'
> & {
	id: string;
	children?: ResolvedTriggerDefinitionProps<any>[];
	conditions?: ResolvedConditionDefinition[];
};
