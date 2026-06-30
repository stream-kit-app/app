import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	collectionMutationErrorMessage,
	createExistingCollectionNameField,
	keyFieldWithContextVariables,
	requireCollectionName,
	targetNameField
} from './fields';

export const createGetCollectionValueHandler = ({
	app,
	collections,
	variables
}: CorePluginContext) =>
	({
		name: 'Get value',
		fields: [
			createExistingCollectionNameField(collections),
			keyFieldWithContextVariables,
			targetNameField
		],
		execute: async (_action, handler, context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');
			const key = resolveFieldText(variables, handler.fields, 'key', context);
			const targetName = getFieldValue(handler.fields, 'target-name');

			if (!requireCollectionName(app, collectionName, 'Get collection value failed')) {
				next();
				return;
			}

			if (
				typeof key !== 'string' ||
				!key.trim() ||
				typeof targetName !== 'string' ||
				!targetName.trim()
			) {
				next();
				return;
			}

			if (!collections.collectionExists(collectionName.trim())) {
				app.toast.create({
					title: 'Get collection value failed',
					description: collectionMutationErrorMessage('collection-not-found'),
					variant: 'warning'
				});
				next();
				return;
			}

			const value = collections.get(collectionName.trim(), key);

			if (!context.actionVariables) {
				context.actionVariables = {};
			}

			context.actionVariables[targetName.trim()] = value ?? '';

			next();
		}
	}) satisfies HandlerDefinitionProps;
