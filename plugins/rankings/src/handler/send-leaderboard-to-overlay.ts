import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import { getFieldValue } from '../lib/get-field-value';

export function createSendLeaderboardToOverlayHandler(
	app: PluginAppApi,
	rankings: RankingsService
) {
	return {
		name: 'Send leaderboard to overlay',
		fields: [
			{
				type: 'select',
				name: 'Overlay',
				required: true,
				placeholder: 'Select an overlay',
				items: async () =>
					app.overlay.items.map((overlay) => ({
						value: overlay.id,
						label: overlay.name
					}))
			},
			{
				type: 'combobox',
				name: 'Event',
				required: true,
				placeholder: 'update',
				allowCustomValue: true,
				defaultValue: 'update',
				itemsReloadFromField: 'overlay',
				items: ({ getFieldValue: getValue }) => {
					const overlayId = getValue('overlay');

					if (typeof overlayId !== 'string' || !overlayId.trim()) {
						return [{ value: 'update', label: 'update' }];
					}

					const overlay = app.overlay.items.find((item) => item.id === overlayId.trim());
					const events = overlay?.expectedEvents ?? [];

					if (events.length === 0) {
						return [{ value: 'update', label: 'update' }];
					}

					return events.map((event) => ({
						value: event,
						label: event
					}));
				}
			},
			{
				type: 'text',
				name: 'Limit',
				placeholder: '5',
				defaultValue: '5'
			}
		],
		execute: async (_action, handler, _context, next) => {
			const overlayId = getFieldValue(handler.fields, 'overlay');
			const event = getFieldValue(handler.fields, 'event');
			const limitRaw = getFieldValue(handler.fields, 'limit');

			if (typeof overlayId !== 'string' || !overlayId.trim()) {
				app.toast.create({
					title: 'Send leaderboard to overlay failed',
					description: 'Select an overlay.',
					variant: 'error'
				});
				return;
			}

			const eventName =
				typeof event === 'string' && event.trim() ? event.trim() : 'update';
			const limit = Math.max(1, Number(limitRaw) || rankings.settings.leaderboardSize);
			const entries = rankings.getLeaderboard(limit).map((user, index) => ({
				name: user.username,
				points: user.totalPoints,
				rank: index + 1,
				userId: user.userId,
				platform: user.platform
			}));

			try {
				await app.overlay.broadcast(overlayId.trim(), eventName, { entries });
				next();
			} catch (error) {
				app.toast.create({
					title: 'Send leaderboard to overlay failed',
					description: error instanceof Error ? error.message : String(error),
					variant: 'error'
				});
			}
		}
	} satisfies HandlerDefinitionProps;
}
