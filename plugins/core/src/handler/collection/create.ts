import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	collectionMutationErrorMessage,
	collectionNameField,
	lifetimeField,
	parseLifetime,
	requireCollectionName
} from './fields';

export const createCreateCollectionHandler = ({ app, collections }: CorePluginContext) =>
	({
		name: 'Create collection',
		fields: [collectionNameField, lifetimeField],
		execute: async (_action, handler, _context, next) => {
			const collectionName = getFieldValue(handler.fields, 'collection-name');
			const lifetime = parseLifetime(getFieldValue(handler.fields, 'lifetime'));

			if (!requireCollectionName(app, collectionName, 'Create collection failed')) {
				next();
				return;
			}

			const result = await collections.create(collectionName, lifetime);

			if (!result.ok) {
				app.toast.create({
					title: 'Create collection failed',
					description: collectionMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
