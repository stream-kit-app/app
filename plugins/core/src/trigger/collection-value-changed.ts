import type { ConditionGroupNode, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { CollectionStore } from '../lib/collections/collection-store';
import type { CollectionChangedContext } from '../lib/collections/types';
import {
	collectionChangeTypeCondition,
	collectionKeyCondition,
	collectionLifetimeCondition,
	collectionNameCondition,
	collectionPreviousValueCondition,
	collectionValueCondition,
	evaluateCollectionChangeTypeMatch,
	evaluateCollectionKeyMatch,
	evaluateCollectionLifetimeMatch,
	evaluateCollectionNameMatch,
	evaluateCollectionPreviousValueMatch,
	evaluateCollectionValueMatch
} from '../lib/collection-conditions';
import { createTestCollectionChangedContext } from '../lib/test-collection-contexts';
import {
	createActivate,
	createDeactivate,
	createOnTest,
	evaluateWith
} from '../lib/trigger-helpers';

function validateCollectionChanged(conditions: ConditionGroupNode, context: unknown): boolean {
	const ctx = context as CollectionChangedContext;

	return evaluateWith(conditions, context, {
		'collection-name': (value) => evaluateCollectionNameMatch(ctx, value),
		key: (value) => evaluateCollectionKeyMatch(ctx, value),
		lifetime: (value) => evaluateCollectionLifetimeMatch(ctx, value),
		'change-type': (value) => evaluateCollectionChangeTypeMatch(ctx, value),
		'previous-value': (value) => evaluateCollectionPreviousValueMatch(ctx, value),
		value: (value) => evaluateCollectionValueMatch(ctx, value)
	});
}

export function createCollectionValueChangedTrigger(
	collections: CollectionStore
): TriggerDefinitionProps {
	return {
		name: 'Collection value changed',
		conditions: [
			collectionNameCondition(),
			collectionKeyCondition(),
			collectionLifetimeCondition(),
			collectionChangeTypeCondition(),
			collectionPreviousValueCondition(),
			collectionValueCondition()
		],
		validate: (conditions, context) => validateCollectionChanged(conditions, context),
		activate: createActivate<CollectionChangedContext>(
			(listener) => collections.subscribe('changed', listener),
			(conditions, context) => validateCollectionChanged(conditions, context)
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestCollectionChangedContext())
	};
}
