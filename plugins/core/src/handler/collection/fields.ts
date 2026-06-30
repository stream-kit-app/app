import type { HandlerFieldDefinition } from '@stream-kit/plugin';
import type { PluginAppApi } from '@stream-kit/plugin';

import type { CollectionStore } from '../../lib/collections/collection-store';
import type { CollectionLifetime } from '../../lib/collections/types';

export const LIFETIME_ITEMS = [
	{ value: 'session', label: 'Session' },
	{ value: 'persistent', label: 'Persistent' }
] as const;

export const collectionNameField: HandlerFieldDefinition = {
	type: 'text',
	name: 'Collection name',
	placeholder: 'myCollection',
	required: true
};

function formatCollectionLabel(collectionName: string, lifetime: CollectionLifetime): string {
	return lifetime === 'session'
		? `${collectionName} (Session)`
		: `${collectionName} (Persistent)`;
}

/** Dropdown of all existing collections. Names are globally unique (Create collection uses {@link collectionNameField}). */
export function createExistingCollectionNameField(
	collections: CollectionStore
): HandlerFieldDefinition {
	return {
		type: 'combobox',
		name: 'Collection name',
		placeholder: 'Select a collection',
		loadingPlaceholder: 'Loading collections…',
		required: true,
		allowCustomValue: false,
		items: () =>
			collections.listCollections().map(({ collectionName, lifetime }) => ({
				value: collectionName,
				label: formatCollectionLabel(collectionName, lifetime)
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

export function parseLifetime(value: unknown): CollectionLifetime {
	if (value === 'persistent') {
		return 'persistent';
	}

	return 'session';
}

export function collectionMutationErrorMessage(
	reason:
		| 'collection-not-found'
		| 'key-not-found'
		| 'invalid-input'
		| 'already-exists'
		| 'invalid-name'
): string {
	switch (reason) {
		case 'collection-not-found':
			return 'The collection does not exist. Create it first with the Create collection handler.';
		case 'key-not-found':
			return 'The key does not exist in this collection.';
		case 'already-exists':
			return 'A collection with this name already exists.';
		case 'invalid-name':
			return 'Collection name is required.';
		case 'invalid-input':
			return 'Collection name and key are required.';
	}
}

export function requireCollectionName(
	app: PluginAppApi,
	collectionName: unknown,
	failureTitle: string
): collectionName is string {
	if (typeof collectionName !== 'string' || !collectionName.trim()) {
		app.toast.create({
			title: failureTitle,
			description: collectionMutationErrorMessage('invalid-name'),
			variant: 'warning'
		});

		return false;
	}

	return true;
}
