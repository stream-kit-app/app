import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	collectionMutationErrorMessage,
	createExistingCollectionNameField,
	keyField,
	requireCollectionName
} from './fields';

export const createDeleteCollectionKeyHandler = ({ app, collections }: CorePluginContext) =>
	({
		name: 'Delete key',
		fields: [createExistingCollectionNameField(collections), keyField],
		execute: async (_action, handler, _context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');
			const key = getFieldValue(handler.fields, 'key');

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
