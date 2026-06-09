import type { Action } from '../action.svelte';
import type { ActionTrigger } from '../action-trigger.svelte';
import type { ConditionDefinition, ConditionGroupNode, ResolvedConditionDefinition } from './condition';
import type { TriggerDefinitionProps } from './types';

type TriggerDefinitionInput<TContext = unknown> = TriggerDefinitionProps<TContext> & { id?: string };

export class TriggerDefinitions {
	items: TriggerDefinition[] = $state.raw([]);

	add<TContext = unknown>(props: TriggerDefinitionInput<TContext>): TriggerDefinition {
		const normalizedProps = {
			...props,
			id: props.id ?? createGeneratedDefinitionId(props.name, this.items.length),
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
}

function createGeneratedDefinitionId(name: string, index: number): string {
	const slug = name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return `${slug || 'trigger'}-${index + 1}`;
}

export class TriggerDefinition {
	id: string;
	name: string;
	pluginName?: string;
	isAvailable: boolean = $state(true);

	conditions?: ResolvedConditionDefinition[];
	validate?: (conditions: ConditionGroupNode, context: unknown) => boolean;
	activate?: (action: Action, trigger: ActionTrigger) => void;
	deactivate?: (action: Action, trigger: ActionTrigger) => void;

	children = new TriggerDefinitions();

	constructor(props: TriggerDefinitionInput<any> & { id: string }) {
		this.id = props.id;
		this.name = props.name;
		this.pluginName = props.pluginName;
		this.conditions = resolveConditionDefinitions(props.conditions);
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
		const baseKey =
			'key' in condition && typeof condition.key === 'string'
				? condition.key
				: createGeneratedDefinitionId(condition.name, usedKeys.size);
		let key = baseKey;
		let suffix = 2;

		while (usedKeys.has(key)) {
			key = `${baseKey}-${suffix}`;
			suffix += 1;
		}

		usedKeys.add(key);

		return {
			...condition,
			key
		};
	});
}
