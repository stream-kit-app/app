import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	collectionMutationErrorMessage,
	createExistingCollectionNameField,
	requireCollectionName
} from './fields';

export const createDeleteCollectionHandler = ({ app, collections }: CorePluginContext) =>
	({
		name: 'Delete collection',
		fields: [createExistingCollectionNameField(collections)],
		execute: async (_action, handler, _context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');

			if (!requireCollectionName(app, collectionName, 'Delete collection failed')) {
				next();
				return;
			}

			const result = await collections.delete(collectionName.trim());

			if (!result.ok) {
				app.toast.create({
					title: 'Delete collection failed',
					description: collectionMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
