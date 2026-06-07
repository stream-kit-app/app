import type { HandlerFieldVariable } from '../handler/field';

export type SelectItem = { value: string; label: string; disabled?: boolean };

/** Static list or async loader (e.g. from an API). */
export type SelectItemsSource = SelectItem[] | (() => SelectItem[] | Promise<SelectItem[]>);

type ConditionBase = {
	key: string;
	name: string;
	placeholder?: string;
	loadingPlaceholder?: string;
	defaultValue?: FieldValue;
	required?: boolean;
};

/** A selectable condition definition for the Add Condition dropdown. */
export type ConditionDefinition =
	| (ConditionBase & { type: 'text'; variables?: HandlerFieldVariable[] })
	| (ConditionBase & { type: 'checkbox' })
	| (ConditionBase & { type: 'select'; items: SelectItemsSource })
	| (ConditionBase & {
			type: 'select-text';
			items: SelectItemsSource;
			selectPlaceholder?: string;
			variables?: HandlerFieldVariable[];
	  });

/** Runtime value for a condition field. `select-text` produces the compound value. */
export type FieldValue = string | boolean | { type: string; value: string };

export type Operator = 'and' | 'or';

/**
 * The condition tree configured on an action. Sibling nodes combine using the
 * `operator` on each node after the first within the same group.
 */
export type ConditionNode =
	| {
			kind: 'condition';
			id: string;
			key: string;
			value: FieldValue;
			/** When true, the condition result is inverted. */
			negate?: boolean;
			operator?: Operator;
	  }
	| { kind: 'group'; id: string; children: ConditionNode[]; operator?: Operator };

export type ConditionGroupNode = Extract<ConditionNode, { kind: 'group' }>;
export type ConditionLeafNode = Extract<ConditionNode, { kind: 'condition' }>;
