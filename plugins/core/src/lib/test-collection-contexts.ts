import type { CollectionChangedContext, CollectionCreatedContext } from '../lib/collections/types';

export function createTestCollectionCreatedContext(): CollectionCreatedContext {
	return {
		collectionName: 'scores',
		lifetime: 'session'
	};
}

export function createTestCollectionChangedContext(): CollectionChangedContext {
	return {
		collectionName: 'scores',
		lifetime: 'session',
		key: 'player1',
		value: '100',
		previousValue: '50',
		changeType: 'update'
	};
}
