import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	collectionMutationErrorMessage,
	createExistingCollectionNameField,
	keyFieldWithContextVariables,
	requireCollectionName
} from './fields';

export const createDeleteCollectionKeyHandler = ({
	app,
	collections,
	variables
}: CorePluginContext) =>
	({
		name: 'Delete key',
		fields: [createExistingCollectionNameField(collections), keyFieldWithContextVariables],
		execute: async (_action, handler, context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');
			const key = resolveFieldText(variables, handler.fields, 'key', context);

			if (!requireCollectionName(app, collectionName, 'Delete collection key failed')) {
				next();
				return;
			}

			if (typeof key !== 'string' || !key.trim()) {
				next();
				return;
			}

			const result = await collections.deleteKey(collectionName.trim(), key);

			if (!result.ok) {
				app.toast.create({
					title: 'Delete collection key failed',
					description: collectionMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
