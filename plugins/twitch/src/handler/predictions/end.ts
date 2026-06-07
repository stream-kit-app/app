import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { PredictionContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createPredictionEndHandler = (app: PluginAppApi) =>
	({
		id: 'twitch-prediction-end',
		name: 'End Prediction',
		fields: [
			{
				type: 'text',
				key: 'predictionId',
				name: 'Prediction ID',
				placeholder: 'Leave empty to use trigger prediction'
			},
			{
				type: 'text',
				key: 'winningOutcomeId',
				name: 'Winning Outcome ID',
				required: true,
				placeholder: 'Outcome ID to resolve as winner'
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const fieldPredictionId = getFieldValue(handler.fields, 'predictionId');
			const winningOutcomeId = getFieldValue(handler.fields, 'winningOutcomeId');
			const predictionId =
				(typeof fieldPredictionId === 'string' && fieldPredictionId.trim()) ||
				(context as PredictionContext).predictionId;

			if (
				!broadcasterId ||
				!predictionId ||
				typeof winningOutcomeId !== 'string' ||
				!winningOutcomeId.trim()
			) {
				return;
			}

			void getTwitch(app).client?.predictions.resolvePrediction(
				broadcasterId,
				predictionId,
				winningOutcomeId.trim()
			);
		}
	}) satisfies HandlerDefinitionProps;
