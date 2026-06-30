import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { interpolateVariables } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	collectionMutationErrorMessage,
	createExistingCollectionNameField,
	keyField,
	requireCollectionName,
	valueField
} from './fields';

export const createUpdateCollectionValueHandler = ({
	app,
	variables,
	collections
}: CorePluginContext) =>
	({
		name: 'Update value',
		fields: [createExistingCollectionNameField(collections), keyField, valueField],
		execute: async (_action, handler, context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');
			const key = getFieldValue(handler.fields, 'key');
			const valueTemplate = getFieldValue(handler.fields, 'value');

			if (!requireCollectionName(app, collectionName, 'Update collection value failed')) {
				next();
				return;
			}

			if (typeof key !== 'string' || !key.trim()) {
				next();
				return;
			}

			const value = interpolateVariables(
				typeof valueTemplate === 'string' ? valueTemplate : '',
				variables.resolve(context)
			);

			const result = await collections.update(collectionName.trim(), key, value);

			if (!result.ok) {
				app.toast.create({
					title: 'Update collection value failed',
					description: collectionMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
