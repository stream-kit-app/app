import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { interpolateVariables } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	collectionMutationErrorMessage,
	createExistingCollectionNameField,
	keyFieldWithContextVariables,
	requireCollectionName,
	valueFieldWithContextVariables
} from './fields';

export const createSetCollectionValueHandler = ({ app, variables, collections }: CorePluginContext) =>
	({
		name: 'Set value',
		fields: [
			createExistingCollectionNameField(collections),
			keyFieldWithContextVariables,
			valueFieldWithContextVariables
		],
		execute: async (_action, handler, context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');
			const key = resolveFieldText(variables, handler.fields, 'key', context);
			const valueTemplate = getFieldValue(handler.fields, 'value');

			if (!requireCollectionName(app, collectionName, 'Set collection value failed')) {
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

			const result = await collections.set(collectionName.trim(), key, value);

			if (!result.ok) {
				app.toast.create({
					title: 'Set collection value failed',
					description: collectionMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
