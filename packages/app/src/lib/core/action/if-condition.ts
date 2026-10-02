import type { ResolvedHandlerFieldDefinition } from './handler/field';
import type { ActionHandler } from './action-handler.svelte';
import type {
	ConditionGroupNode,
	ResolvedConditionDefinition,
	SelectItem,
	SelectItemsSource
} from './trigger/condition';

import { isConditionGroupNode } from './condition-tree';

type ConditionGroupField = Extract<ResolvedHandlerFieldDefinition, { type: 'condition-group' }>;

/** One styled piece of a one-line IF summary, for example `{user}` `equals` `x` `AND` … */
export type IfSummaryPart = {
	kind: 'path' | 'operator' | 'value' | 'placeholder' | 'join' | 'not' | 'paren';
	text: string;
};

export function isIfHandler(handler: ActionHandler): boolean {
	return handler.definition.id.endsWith(':if');
}

function summarizeGroup(
	group: ConditionGroupNode,
	definitions: ResolvedConditionDefinition[],
	translate: (label: string) => string
): IfSummaryPart[] {
	const parts: IfSummaryPart[] = [];

	group.children.forEach((child, index) => {
		if (index > 0) {
			parts.push({ kind: 'join', text: translate((child.operator ?? 'and').toUpperCase()) });
		}

		if (child.kind === 'group') {
			parts.push({ kind: 'paren', text: '(' });
			parts.push(...summarizeGroup(child, definitions, translate));
			parts.push({ kind: 'paren', text: ')' });
			return;
		}

		const definition = definitions.find((item) => item.key === child.key);
		const value = child.value;

		if (child.negate) {
			parts.push({ kind: 'not', text: translate('not') });
		}

		if (definition?.type !== 'text-select-text' || typeof value !== 'object' || !('path' in value)) {
			parts.push({ kind: 'path', text: definition?.name ?? child.key });
			return;
		}

		const path = value.path.trim();
		parts.push(
			path
				? { kind: 'path', text: path }
				: { kind: 'placeholder', text: definition.pathPlaceholder ?? '{variable}' }
		);
		parts.push({
			kind: 'operator',
			text: resolveOperatorLabel(definition.items, value.type, translate).toLowerCase()
		});

		if (!isValuelessIfOperator(definition.valuelessOperators, value.type) && value.value.trim()) {
			parts.push({ kind: 'value', text: value.value.trim() });
		}
	});

	return parts;
}

/** One-line summary of an IF handler's condition group, or `undefined` for other handlers. */
export function summarizeIfCondition(
	handler: ActionHandler,
	translate: (label: string) => string
): IfSummaryPart[] | undefined {
	const config = handler.fieldDefinitions?.find(
		(definition): definition is ConditionGroupField => definition.type === 'condition-group'
	);

	if (!config) {
		return undefined;
	}

	const value = handler.getField(config.key)?.value;

	if (!isConditionGroupNode(value)) {
		return [];
	}

	return summarizeGroup(value, config.conditions as ResolvedConditionDefinition[], translate);
}

export function resolveOperatorLabel(
	items: SelectItemsSource,
	type: string,
	translate: (label: string) => string
): string {
	if (typeof items === 'function') {
		return type;
	}

	const match = items.find((item: SelectItem) => item.value === type);

	return match ? translate(match.label) : type;
}

export function isValuelessIfOperator(
	valuelessOperators: readonly string[] | undefined,
	type: string
): boolean {
	return valuelessOperators?.includes(type) ?? false;
}
