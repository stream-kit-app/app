export type MapLifetime = 'session' | 'persistent';

export type MapChangeType = 'set' | 'update' | 'delete' | 'clear';

export type MapData = Record<string, string>;

export type MapCreatedContext = {
	mapName: string;
	lifetime: MapLifetime;
};

export type MapChangedContext = {
	mapName: string;
	lifetime: MapLifetime;
	key: string;
	value: string;
	previousValue?: string;
	changeType: MapChangeType;
};

export type MapStoreEvent = 'created' | 'changed';

export type MapCreateResult =
	| { ok: true }
	| { ok: false; reason: 'already-exists' | 'invalid-name' };

export type MapMutationResult =
	| { ok: true }
	| { ok: false; reason: 'map-not-found' | 'key-not-found' | 'invalid-input' };

export type MapSummary = {
	mapName: string;
	lifetime: MapLifetime;
};

export type MapEntry = {
	key: string;
	value: string;
};
