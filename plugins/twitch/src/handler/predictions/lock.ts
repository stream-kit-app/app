import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { PredictionContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createPredictionLockHandler = (app: App) =>
	({
		id: 'twitch-prediction-lock',
		name: 'Lock Prediction',
		fields: [
			{
				type: 'text',
				key: 'predictionId',
				name: 'Prediction ID',
				placeholder: 'Leave empty to use trigger prediction'
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const fieldPredictionId = getFieldValue(handler.fields, 'predictionId');
			const predictionId =
				(typeof fieldPredictionId === 'string' && fieldPredictionId.trim()) ||
				(context as PredictionContext).predictionId;

			if (!broadcasterId || !predictionId) {
				return;
			}

			void app.twitch.client?.predictions.lockPrediction(broadcasterId, predictionId);
		}
	}) satisfies HandlerDefinitionProps;
