import type {
	ResolvedHandlerFieldDefinition,
	TextSelectTextFieldValue
} from './handler/field';
import type { ActionHandler } from './action-handler.svelte';
import type { SelectItem, SelectItemsSource } from './trigger/condition';

type IfConditionTextSelectField = Extract<
	ResolvedHandlerFieldDefinition,
	{ type: 'text-select-text' }
>;

type IfConditionField = {
	config: IfConditionTextSelectField;
	field: TextSelectTextFieldValue;
};

export function isIfHandler(handler: ActionHandler): boolean {
	return (
		handler.fieldDefinitions?.some(
			(definition) => definition.type === 'text-select-text' && definition.allowNegate
		) ?? false
	);
}

export function getIfConditionField(handler: ActionHandler): IfConditionField | undefined {
	const config = handler.fieldDefinitions?.find(
		(definition): definition is IfConditionTextSelectField =>
			definition.type === 'text-select-text' && definition.allowNegate === true
	);

	if (!config) {
		return undefined;
	}

	const instance = handler.getField(config.key);
	const value = instance?.value;

	if (!value || typeof value !== 'object' || !('path' in value)) {
		return {
			config,
			field: { path: '', type: 'equals', value: '', negate: false }
		};
	}

	return {
		config,
		field: value as TextSelectTextFieldValue
	};
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
