import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { MapStore } from '../lib/maps/map-store';
import type { MapCreatedContext } from '../lib/maps/types';
import {
	evaluateMapLifetimeMatch,
	evaluateMapNameMatch,
	mapLifetimeCondition,
	mapNameCondition
} from '../lib/map-conditions';
import { createTestMapCreatedContext } from '../lib/test-map-contexts';
import {
	createActivate,
	createDeactivate,
	createOnTest,
	evaluateWith
} from '../lib/trigger-helpers';

export function createMapCreatedTrigger(maps: MapStore): TriggerDefinitionProps {
	return {
		name: 'Map created',
		conditions: [mapNameCondition(), mapLifetimeCondition()],
		validate: (conditions, context) => {
			const ctx = context as MapCreatedContext;

			return evaluateWith(conditions, context, {
				'map-name': (value) => evaluateMapNameMatch(ctx, value),
				lifetime: (value) => evaluateMapLifetimeMatch(ctx, value)
			});
		},
		activate: createActivate<MapCreatedContext>(
			(listener) => maps.subscribe('created', listener),
			(conditions, context) => {
				const ctx = context as MapCreatedContext;

				return evaluateWith(conditions, context, {
					'map-name': (value) => evaluateMapNameMatch(ctx, value),
					lifetime: (value) => evaluateMapLifetimeMatch(ctx, value)
				});
			}
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestMapCreatedContext())
	};
}
