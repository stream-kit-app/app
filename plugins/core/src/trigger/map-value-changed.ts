import type { ConditionGroupNode, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { MapStore } from '../lib/maps/map-store';
import type { MapChangedContext } from '../lib/maps/types';
import {
	evaluateMapChangeTypeMatch,
	evaluateMapKeyMatch,
	evaluateMapLifetimeMatch,
	evaluateMapNameMatch,
	evaluateMapPreviousValueMatch,
	evaluateMapValueMatch,
	mapChangeTypeCondition,
	mapKeyCondition,
	mapLifetimeCondition,
	mapNameCondition,
	mapPreviousValueCondition,
	mapValueCondition
} from '../lib/map-conditions';
import { createTestMapChangedContext } from '../lib/test-map-contexts';
import {
	createActivate,
	createDeactivate,
	createOnTest,
	evaluateWith
} from '../lib/trigger-helpers';

function validateMapChanged(conditions: ConditionGroupNode, context: unknown): boolean {
	const ctx = context as MapChangedContext;

	return evaluateWith(conditions, context, {
		'map-name': (value) => evaluateMapNameMatch(ctx, value),
		key: (value) => evaluateMapKeyMatch(ctx, value),
		lifetime: (value) => evaluateMapLifetimeMatch(ctx, value),
		'change-type': (value) => evaluateMapChangeTypeMatch(ctx, value),
		'previous-value': (value) => evaluateMapPreviousValueMatch(ctx, value),
		value: (value) => evaluateMapValueMatch(ctx, value)
	});
}

export function createMapValueChangedTrigger(maps: MapStore): TriggerDefinitionProps {
	return {
		name: 'Map value changed',
		conditions: [
			mapNameCondition(),
			mapKeyCondition(),
			mapLifetimeCondition(),
			mapChangeTypeCondition(),
			mapPreviousValueCondition(),
			mapValueCondition()
		],
		validate: (conditions, context) => validateMapChanged(conditions, context),
		activate: createActivate<MapChangedContext>(
			(listener) => maps.subscribe('changed', listener),
			(conditions, context) => validateMapChanged(conditions, context)
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestMapChangedContext())
	};
}
