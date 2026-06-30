export type CollectionLifetime = 'session' | 'persistent';

export type CollectionChangeType = 'set' | 'update' | 'delete' | 'clear';

export type CollectionData = Record<string, string>;

export type CollectionCreatedContext = {
	collectionName: string;
	lifetime: CollectionLifetime;
};

export type CollectionChangedContext = {
	collectionName: string;
	lifetime: CollectionLifetime;
	key: string;
	value: string;
	previousValue?: string;
	changeType: CollectionChangeType;
};

export type CollectionDeletedContext = {
	collectionName: string;
	lifetime: CollectionLifetime;
};

export type CollectionStoreEvent = 'created' | 'changed' | 'deleted';

export type CollectionCreateResult =
	| { ok: true }
	| { ok: false; reason: 'already-exists' | 'invalid-name' };

export type CollectionMutationResult =
	| { ok: true }
	| { ok: false; reason: 'collection-not-found' | 'key-not-found' | 'invalid-input' };

export type CollectionSummary = {
	collectionName: string;
	lifetime: CollectionLifetime;
};

export type CollectionEntry = {
	key: string;
	value: string;
};
