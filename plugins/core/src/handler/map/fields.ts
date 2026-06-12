import type { HandlerFieldDefinition } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/app/api';

import type { MapStore } from '../../lib/maps/map-store';
import type { MapLifetime } from '../../lib/maps/types';

export const LIFETIME_ITEMS = [
	{ value: 'session', label: 'Session' },
	{ value: 'persistent', label: 'Persistent' }
] as const;

export const mapNameField: HandlerFieldDefinition = {
	type: 'text',
	name: 'Map name',
	placeholder: 'myMap',
	required: true
};

function formatMapLabel(mapName: string, lifetime: MapLifetime): string {
	return lifetime === 'session' ? `${mapName} (Session)` : `${mapName} (Persistent)`;
}

/** Dropdown of all existing maps. Map names are globally unique (Create map uses {@link mapNameField}). */
export function createExistingMapNameField(maps: MapStore): HandlerFieldDefinition {
	return {
		type: 'combobox',
		name: 'Map name',
		placeholder: 'Select a map',
		loadingPlaceholder: 'Loading maps…',
		required: true,
		allowCustomValue: false,
		items: () =>
			maps.listMaps().map(({ mapName, lifetime }) => ({
				value: mapName,
				label: formatMapLabel(mapName, lifetime)
			}))
	};
}

export const lifetimeField: HandlerFieldDefinition = {
	type: 'select',
	name: 'Lifetime',
	items: LIFETIME_ITEMS.map((item) => ({ value: item.value, label: item.label })),
	defaultValue: 'session'
};

export const keyField: HandlerFieldDefinition = {
	type: 'text',
	name: 'Key',
	placeholder: 'myKey',
	required: true
};

export const keyFieldWithContextVariables: HandlerFieldDefinition = {
	type: 'text',
	name: 'Key',
	placeholder: 'e.g. {username}',
	required: true,
	useContextVariables: true
};

export const valueField: HandlerFieldDefinition = {
	type: 'text',
	name: 'Value',
	placeholder: 'e.g. {username}'
};

export const valueFieldWithContextVariables: HandlerFieldDefinition = {
	type: 'text',
	name: 'Value',
	placeholder: 'e.g. {username}',
	useContextVariables: true
};

export const targetNameField: HandlerFieldDefinition = {
	type: 'text',
	name: 'Target name',
	placeholder: 'Action variable name',
	required: true
};

export function parseLifetime(value: unknown): MapLifetime {
	if (value === 'persistent') {
		return 'persistent';
	}

	return 'session';
}

export function mapMutationErrorMessage(
	reason: 'map-not-found' | 'key-not-found' | 'invalid-input' | 'already-exists' | 'invalid-name'
): string {
	switch (reason) {
		case 'map-not-found':
			return 'The map does not exist. Create it first with the Create map handler.';
		case 'key-not-found':
			return 'The key does not exist in this map.';
		case 'already-exists':
			return 'A map with this name already exists.';
		case 'invalid-name':
			return 'Map name is required.';
		case 'invalid-input':
			return 'Map name and key are required.';
	}
}

export function requireMapName(
	app: PluginAppApi,
	mapName: unknown,
	failureTitle: string
): mapName is string {
	if (typeof mapName !== 'string' || !mapName.trim()) {
		app.toast.create({
			title: failureTitle,
			description: mapMutationErrorMessage('invalid-name'),
			variant: 'warning'
		});

		return false;
	}

	return true;
}
