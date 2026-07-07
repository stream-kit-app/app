import type { SelectItem } from '../action/trigger/condition';
import type { ConditionGroupNode } from '../action/trigger/condition';
import type { SettingsFieldItem, SettingsFieldValue } from '../settings/field';
import type { OverlayFrameworkId } from './types';

export const OVERLAY_SELF_FIELD_TOKEN = '__overlay__';

export type OverlayTestHandlerDefinition = {
	label: string;
	event: string;
	payload?: unknown;
};

export type OverlayActionPresetFieldJson = {
	key: string;
	value: string | number | boolean;
};

export type OverlayActionPresetHandlerJson = {
	handlerTypeId: string;
	fields: OverlayActionPresetFieldJson[];
};

export type OverlayActionPresetTriggerJson = {
	triggerTypeId: string;
	conditions?: ConditionGroupNode;
};

export type OverlayActionPresetJson = {
	key: string;
	name: string;
	enabled?: boolean;
	triggers: OverlayActionPresetTriggerJson[];
	handlers: OverlayActionPresetHandlerJson[];
};

export type OverlaySettingsFieldJson =
	| {
			type: 'text';
			key: string;
			name: string;
			placeholder?: string;
			defaultValue?: SettingsFieldValue;
			required?: boolean;
			inputType?: 'text' | 'password';
	  }
	| {
			type: 'switch';
			key: string;
			name: string;
			defaultValue?: SettingsFieldValue;
			required?: boolean;
	  }
	| {
			type: 'checkbox';
			key: string;
			name: string;
			defaultValue?: SettingsFieldValue;
			required?: boolean;
	  }
	| {
			type: 'select';
			key: string;
			name: string;
			placeholder?: string;
			defaultValue?: SettingsFieldValue;
			required?: boolean;
			items: SelectItem[];
			loadingPlaceholder?: string;
	  }
	| {
			type: 'slider';
			key: string;
			name: string;
			defaultValue?: SettingsFieldValue;
			required?: boolean;
			min: number;
			max: number;
			step?: number;
	  };

export type OverlaySettingsSectionJson = {
	type: 'section';
	title?: string;
	description?: string;
	fields: OverlaySettingsFieldJson[];
};

export type OverlaySettingsItemJson = OverlaySettingsFieldJson | OverlaySettingsSectionJson;

export type OverlayManifest = {
	id: string;
	name: string;
	framework: OverlayFrameworkId;
	expectedEvents: string[];
	outgoingEvents?: string[];
	version?: number;
	settings?: OverlaySettingsItemJson[];
	testHandlers?: OverlayTestHandlerDefinition[];
	requiredPlugins?: string[];
	actions?: OverlayActionPresetJson[];
};

export const OVERLAY_SETTINGS_EVENT = 'overlay:settings';

const SUPPORTED_FIELD_TYPES = new Set(['text', 'switch', 'checkbox', 'select', 'slider']);

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseSettingsField(value: unknown, path: string): OverlaySettingsFieldJson {
	if (!isRecord(value)) {
		throw new Error(`Invalid settings field at ${path}`);
	}

	const type = value.type;

	if (typeof type !== 'string' || !SUPPORTED_FIELD_TYPES.has(type)) {
		throw new Error(`Unsupported settings field type at ${path}: ${String(type)}`);
	}

	const key = typeof value.key === 'string' ? value.key.trim() : '';
	const name = typeof value.name === 'string' ? value.name.trim() : '';

	if (!key) {
		throw new Error(`Settings field at ${path} requires a key`);
	}

	if (!name) {
		throw new Error(`Settings field at ${path} requires a name`);
	}

	const base = {
		key,
		name,
		required: value.required === true,
		defaultValue: parseDefaultValue(value.defaultValue, path)
	};

	switch (type) {
		case 'text':
			return {
				...base,
				type: 'text',
				placeholder: typeof value.placeholder === 'string' ? value.placeholder : undefined,
				inputType: value.inputType === 'password' ? 'password' : 'text'
			};
		case 'switch':
			return { ...base, type: 'switch' };
		case 'checkbox':
			return { ...base, type: 'checkbox' };
		case 'select': {
			if (!Array.isArray(value.items)) {
				throw new Error(`Select field at ${path} requires static items array`);
			}

			const items = value.items.map((item, index) => parseSelectItem(item, `${path}.items[${index}]`));

			return {
				...base,
				type: 'select',
				placeholder: typeof value.placeholder === 'string' ? value.placeholder : undefined,
				items,
				loadingPlaceholder:
					typeof value.loadingPlaceholder === 'string' ? value.loadingPlaceholder : undefined
			};
		}
		case 'slider': {
			const min = Number(value.min);
			const max = Number(value.max);

			if (Number.isNaN(min) || Number.isNaN(max)) {
				throw new Error(`Slider field at ${path} requires numeric min and max`);
			}

			return {
				...base,
				type: 'slider',
				min,
				max,
				step: value.step === undefined ? undefined : Number(value.step)
			};
		}
		default:
			throw new Error(`Unsupported settings field type at ${path}: ${type}`);
	}
}

function parseSelectItem(value: unknown, path: string): SelectItem {
	if (!isRecord(value)) {
		throw new Error(`Invalid select item at ${path}`);
	}

	const itemValue = typeof value.value === 'string' ? value.value : String(value.value ?? '');
	const label = typeof value.label === 'string' ? value.label : itemValue;

	if (!itemValue) {
		throw new Error(`Select item at ${path} requires a value`);
	}

	return { value: itemValue, label };
}

function parseDefaultValue(value: unknown, path: string): SettingsFieldValue | undefined {
	if (value === undefined) {
		return undefined;
	}

	if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
		return value;
	}

	throw new Error(`Invalid defaultValue at ${path}`);
}

function parseSettingsSection(value: unknown, path: string): OverlaySettingsSectionJson {
	if (!isRecord(value) || value.type !== 'section') {
		throw new Error(`Invalid settings section at ${path}`);
	}

	const fields = Array.isArray(value.fields) ? value.fields : [];

	return {
		type: 'section',
		title: typeof value.title === 'string' ? value.title : undefined,
		description: typeof value.description === 'string' ? value.description : undefined,
		fields: fields.map((field, index) => parseSettingsField(field, `${path}.fields[${index}]`))
	};
}

function parseSettingsItems(value: unknown): OverlaySettingsItemJson[] {
	if (value === undefined) {
		return [];
	}

	if (!Array.isArray(value)) {
		throw new Error('manifest.settings must be an array');
	}

	return value.map((item, index) => {
		if (!isRecord(item)) {
			throw new Error(`Invalid settings item at settings[${index}]`);
		}

		if (item.type === 'section') {
			return parseSettingsSection(item, `settings[${index}]`);
		}

		return parseSettingsField(item, `settings[${index}]`);
	});
}

function parseRequiredPlugins(value: unknown): string[] | undefined {
	if (value === undefined) {
		return undefined;
	}

	if (!Array.isArray(value)) {
		throw new Error('manifest.requiredPlugins must be an array');
	}

	const plugins = value
		.filter((item): item is string => typeof item === 'string')
		.map((item) => item.trim())
		.filter(Boolean);

	return [...new Set(plugins)];
}

function parseConditionGroup(value: unknown, path: string): ConditionGroupNode {
	if (!isRecord(value) || value.kind !== 'group') {
		throw new Error(`Invalid condition group at ${path}`);
	}

	const id = typeof value.id === 'string' ? value.id.trim() : '';

	if (!id) {
		throw new Error(`Condition group at ${path} requires an id`);
	}

	const children = Array.isArray(value.children) ? value.children : [];

	if (children.length > 0) {
		throw new Error(
			`Overlay action preset conditions at ${path} must be a root group with empty children`
		);
	}

	return {
		kind: 'group',
		id,
		operator: value.operator === 'or' ? 'or' : value.operator === 'and' ? 'and' : undefined,
		children: []
	};
}

function createDefaultConditionGroup(): ConditionGroupNode {
	return {
		kind: 'group',
		id: crypto.randomUUID(),
		children: []
	};
}

function parseActionPresetField(value: unknown, path: string): OverlayActionPresetFieldJson {
	if (!isRecord(value)) {
		throw new Error(`Invalid handler field at ${path}`);
	}

	const key = typeof value.key === 'string' ? value.key.trim() : '';

	if (!key) {
		throw new Error(`Handler field at ${path} requires a key`);
	}

	const rawValue = value.value;

	if (
		typeof rawValue !== 'string' &&
		typeof rawValue !== 'number' &&
		typeof rawValue !== 'boolean'
	) {
		throw new Error(`Handler field at ${path} requires a string, number, or boolean value`);
	}

	if (key === 'event' && typeof rawValue === 'string' && rawValue.trim() === OVERLAY_SETTINGS_EVENT) {
		throw new Error(`Handler field event at ${path} cannot use reserved event ${OVERLAY_SETTINGS_EVENT}`);
	}

	return { key, value: rawValue };
}

function parseActionPresetHandler(value: unknown, path: string): OverlayActionPresetHandlerJson {
	if (!isRecord(value)) {
		throw new Error(`Invalid action handler at ${path}`);
	}

	const handlerTypeId = typeof value.handlerTypeId === 'string' ? value.handlerTypeId.trim() : '';

	if (!handlerTypeId) {
		throw new Error(`Action handler at ${path} requires handlerTypeId`);
	}

	const fields = Array.isArray(value.fields) ? value.fields : [];

	if (fields.length === 0) {
		throw new Error(`Action handler at ${path} requires at least one field`);
	}

	return {
		handlerTypeId,
		fields: fields.map((field, index) => parseActionPresetField(field, `${path}.fields[${index}]`))
	};
}

function parseActionPresetTrigger(value: unknown, path: string): OverlayActionPresetTriggerJson {
	if (!isRecord(value)) {
		throw new Error(`Invalid action trigger at ${path}`);
	}

	const triggerTypeId = typeof value.triggerTypeId === 'string' ? value.triggerTypeId.trim() : '';

	if (!triggerTypeId) {
		throw new Error(`Action trigger at ${path} requires triggerTypeId`);
	}

	return {
		triggerTypeId,
		conditions:
			value.conditions === undefined
				? createDefaultConditionGroup()
				: parseConditionGroup(value.conditions, `${path}.conditions`)
	};
}

function parseActionPresets(value: unknown): OverlayActionPresetJson[] | undefined {
	if (value === undefined) {
		return undefined;
	}

	if (!Array.isArray(value)) {
		throw new Error('manifest.actions must be an array');
	}

	const keys = new Set<string>();

	return value.map((item, index) => {
		if (!isRecord(item)) {
			throw new Error(`Invalid action preset at actions[${index}]`);
		}

		const key = typeof item.key === 'string' ? item.key.trim() : '';
		const name = typeof item.name === 'string' ? item.name.trim() : '';

		if (!key) {
			throw new Error(`Action preset at actions[${index}] requires a key`);
		}

		if (keys.has(key)) {
			throw new Error(`Duplicate action preset key at actions[${index}]: ${key}`);
		}

		keys.add(key);

		if (!name) {
			throw new Error(`Action preset at actions[${index}] requires a name`);
		}

		const triggers = Array.isArray(item.triggers) ? item.triggers : [];
		const handlers = Array.isArray(item.handlers) ? item.handlers : [];

		if (triggers.length === 0) {
			throw new Error(`Action preset at actions[${index}] requires at least one trigger`);
		}

		if (handlers.length === 0) {
			throw new Error(`Action preset at actions[${index}] requires at least one handler`);
		}

		return {
			key,
			name,
			enabled: item.enabled === false ? false : true,
			triggers: triggers.map((trigger, triggerIndex) =>
				parseActionPresetTrigger(trigger, `actions[${index}].triggers[${triggerIndex}]`)
			),
			handlers: handlers.map((handler, handlerIndex) =>
				parseActionPresetHandler(handler, `actions[${index}].handlers[${handlerIndex}]`)
			)
		};
	});
}

function parseTestHandlers(value: unknown): OverlayTestHandlerDefinition[] {
	if (value === undefined) {
		return [];
	}

	if (!Array.isArray(value)) {
		throw new Error('manifest.testHandlers must be an array');
	}

	return value.map((item, index) => {
		if (!isRecord(item)) {
			throw new Error(`Invalid test handler at testHandlers[${index}]`);
		}

		const label = typeof item.label === 'string' ? item.label.trim() : '';
		const event = typeof item.event === 'string' ? item.event.trim() : '';

		if (!label) {
			throw new Error(`Test handler at testHandlers[${index}] requires a label`);
		}

		if (!event) {
			throw new Error(`Test handler at testHandlers[${index}] requires an event`);
		}

		return {
			label,
			event,
			payload: item.payload
		};
	});
}

export function parseOverlayManifest(value: unknown): OverlayManifest {
	if (!isRecord(value)) {
		throw new Error('manifest.json must be a JSON object');
	}

	const id = typeof value.id === 'string' ? value.id.trim() : '';
	const name = typeof value.name === 'string' ? value.name.trim() : '';
	const framework = value.framework as OverlayFrameworkId;

	if (!id) {
		throw new Error('manifest.json requires id');
	}

	if (!name) {
		throw new Error('manifest.json requires name');
	}

	if (!framework) {
		throw new Error('manifest.json requires framework');
	}

	const expectedEvents = Array.isArray(value.expectedEvents)
		? value.expectedEvents.filter((event): event is string => typeof event === 'string')
		: [];

	const outgoingEvents = Array.isArray(value.outgoingEvents)
		? value.outgoingEvents.filter((event): event is string => typeof event === 'string')
		: undefined;

	const rawVersion = value.version ?? value.settingsSchemaVersion;
	let version: number | undefined;

	if (rawVersion !== undefined) {
		version = Number(rawVersion);

		if (Number.isNaN(version)) {
			throw new Error('manifest.version must be a number');
		}
	}

	return {
		id,
		name,
		framework,
		expectedEvents,
		outgoingEvents,
		version,
		settings: value.settings === undefined ? undefined : parseSettingsItems(value.settings),
		testHandlers:
			value.testHandlers === undefined ? undefined : parseTestHandlers(value.testHandlers),
		requiredPlugins: parseRequiredPlugins(value.requiredPlugins),
		actions: parseActionPresets(value.actions)
	};
}

export function overlayManifestToSettingsItems(
	items: OverlaySettingsItemJson[] | undefined
): SettingsFieldItem[] {
	return (items ?? []) as SettingsFieldItem[];
}

export function collectOverlayDefaultConfig(items: OverlaySettingsItemJson[] | undefined): Record<string, SettingsFieldValue> {
	const defaults: Record<string, SettingsFieldValue> = {};

	for (const item of items ?? []) {
		if (item.type === 'section') {
			for (const field of item.fields) {
				if (field.defaultValue !== undefined) {
					defaults[field.key] = field.defaultValue;
				}
			}
			continue;
		}

		if (item.defaultValue !== undefined) {
			defaults[item.key] = item.defaultValue;
		}
	}

	return defaults;
}

export function mergeOverlayConfig(
	stored: Record<string, unknown>,
	defaults: Record<string, SettingsFieldValue>,
	manifestVersion: number,
	storedVersion: number
): { config: Record<string, SettingsFieldValue>; version: number } {
	const merged: Record<string, SettingsFieldValue> = { ...defaults };

	for (const [key, value] of Object.entries(stored)) {
		if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
			merged[key] = value;
		}
	}

	return {
		config: merged,
		version: Math.max(manifestVersion, storedVersion)
	};
}
