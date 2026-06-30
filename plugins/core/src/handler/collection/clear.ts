import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	collectionMutationErrorMessage,
	createExistingCollectionNameField,
	requireCollectionName
} from './fields';

export const createClearCollectionHandler = ({ app, collections }: CorePluginContext) =>
	({
		name: 'Clear collection',
		fields: [createExistingCollectionNameField(collections)],
		execute: async (_action, handler, _context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');

			if (!requireCollectionName(app, collectionName, 'Clear collection failed')) {
				next();
				return;
			}

			const result = await collections.clear(collectionName.trim());

			if (!result.ok) {
				app.toast.create({
					title: 'Clear collection failed',
					description: collectionMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
