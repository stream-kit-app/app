import type { Action } from '../action.svelte';
import type { ActionTrigger } from '../action-trigger.svelte';
import type { ConditionDefinition, ConditionGroupNode, ResolvedConditionDefinition } from './condition';
import type { TriggerDefinitionProps, TriggerTestFn, TriggerValidateFormFn } from './types';

import { slugify, uniqueSlug } from '$lib/utils';

type TriggerDefinitionInput<TContext = unknown> = TriggerDefinitionProps<TContext> & { id?: string };
type TriggerDefinitionAddOptions = {
	idScope?: string;
};

export class TriggerDefinitions {
	items: TriggerDefinition[] = $state.raw([]);

	add<TContext = unknown>(
		props: TriggerDefinitionInput<TContext>,
		options: TriggerDefinitionAddOptions = {}
	): TriggerDefinition {
		const normalizedProps = {
			...props,
			id: resolveDefinitionId(props.id, props.name, options.idScope, 'trigger'),
			conditions: resolveConditionDefinitions(props.conditions)
		};

		if (this.find(normalizedProps.id)) {
			throw new Error(`Trigger definition with id ${normalizedProps.id} already exists`);
		}

		const definition = new TriggerDefinition(normalizedProps);
		this.items = [...this.items, definition];

		return definition;
	}

	find(id: string): TriggerDefinition | undefined {
		for (const definition of this.items) {
			const found = definition.find(id);
			if (found) {
				return found;
			}
		}

		return undefined;
	}

	remove(id: string): void {
		this.items = this.items.filter((definition) => definition.id !== id);
	}
}

function createStableDefinitionId(name: string, scope?: string, fallback = 'item'): string {
	const segment = slugify(name, fallback);
	return scope ? `${scope}:${segment}` : segment;
}

function resolveDefinitionId(
	explicitId: string | undefined,
	name: string,
	scope?: string,
	fallback = 'item'
): string {
	if (explicitId) {
		const segment = slugify(explicitId, fallback);
		return scope ? `${scope}:${segment}` : segment;
	}

	return createStableDefinitionId(name, scope, fallback);
}

export class TriggerDefinition {
	id: string;
	name: string;
	pluginName?: string;
	isAvailable: boolean = $state(true);

	conditions?: ResolvedConditionDefinition[];
	validate?: (conditions: ConditionGroupNode, context: unknown, trigger?: ActionTrigger) => boolean;
	validateForm?: TriggerValidateFormFn;
	activate?: (action: Action, trigger: ActionTrigger) => void;
	deactivate?: (action: Action, trigger: ActionTrigger) => void;
	onTest?: TriggerTestFn;

	children = new TriggerDefinitions();

	constructor(props: TriggerDefinitionInput<any> & { id: string }) {
		this.id = props.id;
		this.name = props.name;
		this.pluginName = props.pluginName;
		this.conditions = resolveConditionDefinitions(props.conditions);
		this.validate = props.validate as
			| ((conditions: ConditionGroupNode, context: unknown, trigger?: ActionTrigger) => boolean)
			| undefined;
		this.validateForm = props.validateForm;
		this.activate = props.activate;
		this.deactivate = props.deactivate;
		this.onTest = props.onTest;

		props.children?.forEach((child) => this.children.add(child, { idScope: this.id }));
	}

	get isGroup(): boolean {
		return this.children.items.length > 0;
	}

	find(id: string): TriggerDefinition | undefined {
		if (this.id === id) {
			return this;
		}

		return this.children.find(id);
	}

	setAvailable(available: boolean): void {
		this.isAvailable = available;

		for (const child of this.children.items) {
			child.setAvailable(available);
		}
	}

	setPluginName(name: string): void {
		this.pluginName = name;

		for (const child of this.children.items) {
			child.setPluginName(name);
		}
	}
}

function resolveConditionDefinitions(
	conditions: ConditionDefinition[] | ResolvedConditionDefinition[] | undefined
): ResolvedConditionDefinition[] | undefined {
	const usedKeys = new Set<string>();

	return conditions?.map((condition) => {
		return {
			...condition,
			key:
				'key' in condition && typeof condition.key === 'string'
					? condition.key
					: uniqueSlug(condition.name, usedKeys, 'condition')
		};
	});
}
