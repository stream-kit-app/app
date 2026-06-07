import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { PredictionContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createPredictionCancelHandler = (app: PluginAppApi) =>
	({
		id: 'twitch-prediction-cancel',
		name: 'Cancel Prediction',
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

			void getTwitch(app).client?.predictions.cancelPrediction(broadcasterId, predictionId);
		}
	}) satisfies HandlerDefinitionProps;
