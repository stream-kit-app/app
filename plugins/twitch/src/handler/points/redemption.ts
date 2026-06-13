import type { ActionHandler, PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import type { PointsRedemptionContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { rewardSelectField } from '../../lib/rewards';
import { getTwitch } from '../../lib/plugin-api';

function resolveRedemptionIds(
	handler: ActionHandler,
	context: PointsRedemptionContext
): { rewardId?: string; redemptionId?: string } {
	const fieldRewardId = getFieldValue(handler.fields, 'rewardId');
	const fieldRedemptionId = getFieldValue(handler.fields, 'redemptionId');

	return {
		rewardId:
			(typeof fieldRewardId === 'string' && fieldRewardId.trim()) || context.rewardId || undefined,
		redemptionId:
			(typeof fieldRedemptionId === 'string' && fieldRedemptionId.trim()) ||
			context.redemptionId ||
			undefined
	};
}

export const createPointsFulfillHandler = (app: PluginAppApi) =>
	({
		name: 'Fulfill Redemption',
		fields: [
			rewardSelectField(app),
			{
				type: 'text',
				name: 'Redemption ID',
				placeholder: 'Leave empty to use trigger redemption'
			}
		],
		execute: (_action, handler, context, next) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const { rewardId, redemptionId } = resolveRedemptionIds(
				handler,
				context.data as PointsRedemptionContext
			);

			if (!broadcasterId || !rewardId || !redemptionId) {
				return;
			}

			void getTwitch(app).client?.channelPoints.updateRedemptionStatusByIds(
				broadcasterId,
				rewardId,
				[redemptionId],
				'FULFILLED'
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createPointsCancelHandler = (app: PluginAppApi) =>
	({
		name: 'Cancel Redemption',
		fields: [
			rewardSelectField(app),
			{
				type: 'text',
				name: 'Redemption ID',
				placeholder: 'Leave empty to use trigger redemption'
			}
		],
		execute: (_action, handler, context, next) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const { rewardId, redemptionId } = resolveRedemptionIds(
				handler,
				context.data as PointsRedemptionContext
			);

			if (!broadcasterId || !rewardId || !redemptionId) {
				return;
			}

			void getTwitch(app).client?.channelPoints.updateRedemptionStatusByIds(
				broadcasterId,
				rewardId,
				[redemptionId],
				'CANCELED'
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;
