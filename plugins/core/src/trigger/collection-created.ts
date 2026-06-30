import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { CollectionStore } from '../lib/collections/collection-store';
import type { CollectionCreatedContext } from '../lib/collections/types';
import {
	collectionLifetimeCondition,
	collectionNameCondition,
	evaluateCollectionLifetimeMatch,
	evaluateCollectionNameMatch
} from '../lib/collection-conditions';
import { createTestCollectionCreatedContext } from '../lib/test-collection-contexts';
import {
	createActivate,
	createDeactivate,
	createOnTest,
	evaluateWith
} from '../lib/trigger-helpers';

export function createCollectionCreatedTrigger(
	collections: CollectionStore
): TriggerDefinitionProps {
	return {
		name: 'Collection created',
		conditions: [collectionNameCondition(), collectionLifetimeCondition()],
		validate: (conditions, context) => {
			const ctx = context as CollectionCreatedContext;

			return evaluateWith(conditions, context, {
				'collection-name': (value) => evaluateCollectionNameMatch(ctx, value),
				lifetime: (value) => evaluateCollectionLifetimeMatch(ctx, value)
			});
		},
		activate: createActivate<CollectionCreatedContext>(
			(listener) => collections.subscribe('created', listener),
			(conditions, context) => {
				const ctx = context as CollectionCreatedContext;

				return evaluateWith(conditions, context, {
					'collection-name': (value) => evaluateCollectionNameMatch(ctx, value),
					lifetime: (value) => evaluateCollectionLifetimeMatch(ctx, value)
				});
			}
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestCollectionCreatedContext())
	};
}
