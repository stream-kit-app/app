import type { MapChangedContext, MapCreatedContext } from '../lib/maps/types';

export function createTestMapCreatedContext(): MapCreatedContext {
	return {
		mapName: 'scores',
		lifetime: 'session'
	};
}

export function createTestMapChangedContext(): MapChangedContext {
	return {
		mapName: 'scores',
		lifetime: 'session',
		key: 'player1',
		value: '100',
		previousValue: '50',
		changeType: 'update'
	};
}
