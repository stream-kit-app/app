import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import { getFieldValue } from '../lib/get-field-value';
import type { RankingsPlatform } from '../lib/types';
import {
	createUserTargetField,
	resolveUserTarget,
	userTargetFailureDescription
} from '../lib/user-target-field';

function parseAmount(value: unknown): number {
	const amount = Number(value);

	if (!Number.isFinite(amount)) {
		return 0;
	}

	return Math.max(0, Math.floor(amount));
}

function parseSource(value: unknown): string {
	if (typeof value !== 'string' || !value.trim()) {
		return 'manual';
	}

	return value.trim();
}

function createPointsHandlerFields(rankings: RankingsService, amountDefault = '10') {
	return [
		createUserTargetField(rankings),
		{
			type: 'text' as const,
			name: 'Amount',
			required: true,
			defaultValue: amountDefault
		},
		{
			type: 'text' as const,
			name: 'Source',
			placeholder: 'manual'
		}
	];
}

function createPointsExecute(
	app: PluginAppApi,
	rankings: RankingsService,
	failureTitle: string,
	mutate: (input: {
		userId: string;
		username: string;
		platform: RankingsPlatform;
		amount: number;
		source: string;
	}) => Promise<unknown>
): HandlerDefinitionProps['execute'] {
	return async (_action, handler, context, next) => {
		const identity = resolveUserTarget(handler.fields, context.data, rankings);

		if (!identity) {
			app.toast.create({
				title: failureTitle,
				description: userTargetFailureDescription(handler.fields),
				variant: 'warning'
			});
			next();
			return;
		}

		await mutate({
			...identity,
			amount: parseAmount(getFieldValue(handler.fields, 'amount')),
			source: parseSource(getFieldValue(handler.fields, 'source'))
		});

		next();
	};
}

export function createAddPointsHandler(app: PluginAppApi, rankings: RankingsService) {
	return {
		name: 'Add points',
		fields: createPointsHandlerFields(rankings),
		execute: createPointsExecute(app, rankings, 'Add points failed', (input) =>
			rankings.addPoints(input)
		)
	} satisfies HandlerDefinitionProps;
}

export function createSetPointsHandler(app: PluginAppApi, rankings: RankingsService) {
	return {
		name: 'Set points',
		fields: createPointsHandlerFields(rankings, '0'),
		execute: createPointsExecute(app, rankings, 'Set points failed', (input) =>
			rankings.setPoints(input)
		)
	} satisfies HandlerDefinitionProps;
}

export function createRemovePointsHandler(app: PluginAppApi, rankings: RankingsService) {
	return {
		name: 'Remove points',
		fields: createPointsHandlerFields(rankings),
		execute: createPointsExecute(app, rankings, 'Remove points failed', (input) =>
			rankings.removePoints(input)
		)
	} satisfies HandlerDefinitionProps;
}
