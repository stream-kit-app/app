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

export const createHasCollectionKeyHandler = ({
	app,
	collections,
	variables
}: CorePluginContext) =>
	({
		name: 'Has key',
		fields: [
			createExistingCollectionNameField(collections),
			keyFieldWithContextVariables,
			targetNameField
		],
		execute: async (_action, handler, context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');
			const key = resolveFieldText(variables, handler.fields, 'key', context);
			const targetName = getFieldValue(handler.fields, 'target-name');

			if (!requireCollectionName(app, collectionName, 'Has key failed')) {
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
					title: 'Has key failed',
					description: collectionMutationErrorMessage('collection-not-found'),
					variant: 'warning'
				});
				next();
				return;
			}

			const exists = collections.has(collectionName.trim(), key);

			if (!context.actionVariables) {
				context.actionVariables = {};
			}

			context.actionVariables[targetName.trim()] = exists ? 'true' : 'false';

			next();
		}
	}) satisfies HandlerDefinitionProps;
