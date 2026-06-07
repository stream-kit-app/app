import type { Action } from '../action.svelte';
import type { ActionTrigger } from '../action-trigger.svelte';
import type { ConditionDefinition, ConditionGroupNode } from './condition';
import type { TriggerDefinitionProps } from './types';

export class TriggerDefinitions {
	items: TriggerDefinition[] = $state.raw([]);

	add<TContext = unknown>(props: TriggerDefinitionProps<TContext>): TriggerDefinition {
		if (this.find(props.id)) {
			throw new Error(`Trigger definition with id ${props.id} already exists`);
		}

		const definition = new TriggerDefinition(props);
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
}

export class TriggerDefinition {
	id: string;
	name: string;
	isAvailable: boolean = $state(true);

	conditions?: ConditionDefinition[];
	validate?: (conditions: ConditionGroupNode, context: unknown) => boolean;
	activate?: (action: Action, trigger: ActionTrigger) => void;
	deactivate?: (action: Action, trigger: ActionTrigger) => void;

	children = new TriggerDefinitions();

	constructor(props: TriggerDefinitionProps<any>) {
		this.id = props.id;
		this.name = props.name;
		this.conditions = props.conditions;
		this.validate = props.validate as
			| ((conditions: ConditionGroupNode, context: unknown) => boolean)
			| undefined;
		this.activate = props.activate;
		this.deactivate = props.deactivate;

		props.children?.forEach((child) => this.children.add(child));
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
}
