import type {
	ConditionDefinition,
	ConditionGroupNode,
	ConditionLeafNode,
	FieldValue
} from './trigger/condition';
import type { HandlerFieldDefinition, HandlerFieldInstance } from './handler/field';

import { translate } from '$lib/i18n';

import type { HandlerFieldFormErrors } from './action-handler.svelte';
import { isHandlerFieldValueEmpty } from './handler-field';

export type TriggerFormErrors = {
	conditionFields: Record<string, string>;
	missingConditions: string[];
};

export type ActionFormErrors = {
	name?: string;
	triggers?: string;
	handlers?: string;
	triggerErrors: Record<string, TriggerFormErrors>;
	handlerErrors: Record<string, HandlerFieldFormErrors>;
};

function collectLeaves(group: ConditionGroupNode): ConditionLeafNode[] {
	return group.children.flatMap((child) =>
		child.kind === 'condition' ? [child] : collectLeaves(child)
	);
}

export function isFieldValueEmpty(
	definition: ConditionDefinition,
	value: FieldValue
): boolean {
	if (definition.type === 'checkbox') {
		return false;
	}

	if (definition.type === 'text' || definition.type === 'select') {
		return !String(value ?? '').trim();
	}

	const compound = value as { type: string; value: string };

	return !compound.type.trim() || !compound.value.trim();
}

function validateConditionTree(
	conditions: ConditionGroupNode,
	definitions: ConditionDefinition[] | undefined
): TriggerFormErrors {
	const errors: TriggerFormErrors = {
		conditionFields: {},
		missingConditions: []
	};

	for (const definition of definitions?.filter((item) => item.required) ?? []) {
		const leaves = collectLeaves(conditions).filter((leaf) => leaf.key === definition.key);

		if (leaves.length === 0) {
			errors.missingConditions.push(definition.name);
			continue;
		}

		for (const leaf of leaves) {
			if (isFieldValueEmpty(definition, leaf.value)) {
				errors.conditionFields[leaf.id] = translate('{field} is required', {
					field: definition.name
				});
			}
		}
	}

	return errors;
}

function validateHandlerFields(
	fields: HandlerFieldInstance[],
	definitions: HandlerFieldDefinition[] | undefined
): HandlerFieldFormErrors {
	const errors: HandlerFieldFormErrors = {
		fieldErrors: {},
		missingFields: []
	};

	for (const definition of definitions ?? []) {
		const instance = fields.find((field) => field.key === definition.key);

		if (!instance) {
			if (definition.required) {
				errors.missingFields.push(definition.name);
			}

			continue;
		}

		if (definition.required && isHandlerFieldValueEmpty(definition, instance.value)) {
			errors.fieldErrors[instance.id] = translate('{field} is required', {
				field: definition.name
			});
		}
	}

	return errors;
}

function hasTriggerErrors(errors: TriggerFormErrors): boolean {
	return (
		errors.missingConditions.length > 0 || Object.keys(errors.conditionFields).length > 0
	);
}

function hasHandlerErrors(errors: HandlerFieldFormErrors): boolean {
	return errors.missingFields.length > 0 || Object.keys(errors.fieldErrors).length > 0;
}

export function validateActionForm(input: {
	name: string;
	triggers: Array<{ id: string; conditions: ConditionGroupNode; definitions?: ConditionDefinition[] }>;
	handlers: Array<{ id: string; fields: HandlerFieldInstance[]; definitions?: HandlerFieldDefinition[] }>;
}): ActionFormErrors | null {
	const errors: ActionFormErrors = {
		triggerErrors: {},
		handlerErrors: {}
	};

	if (!input.name.trim()) {
		errors.name = translate('Name is required');
	}

	if (input.triggers.length === 0) {
		errors.triggers = translate('Add at least one trigger');
	}

	if (input.handlers.length === 0) {
		errors.handlers = translate('Add at least one handler');
	}

	for (const trigger of input.triggers) {
		const triggerErrors = validateConditionTree(trigger.conditions, trigger.definitions);

		if (hasTriggerErrors(triggerErrors)) {
			errors.triggerErrors[trigger.id] = triggerErrors;
		}
	}

	for (const handler of input.handlers) {
		const handlerErrors = validateHandlerFields(handler.fields, handler.definitions);

		if (hasHandlerErrors(handlerErrors)) {
			errors.handlerErrors[handler.id] = handlerErrors;
		}
	}

	const hasErrors =
		!!errors.name ||
		!!errors.triggers ||
		!!errors.handlers ||
		Object.keys(errors.triggerErrors).length > 0 ||
		Object.keys(errors.handlerErrors).length > 0;

	return hasErrors ? errors : null;
}
