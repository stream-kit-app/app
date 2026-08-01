import type { Plugin, PluginPageDefinition } from '@stream-kit/plugin';

import LeaderboardPage from './app/ui/leaderboard-page.svelte';
import OverviewPage from './app/ui/overview-page.svelte';
import TiersPage from './app/ui/tiers-page.svelte';
import { createGetUserRankHandler } from './handler/get-user-rank';
import {
	createAddPointsHandler,
	createRemovePointsHandler,
	createSetPointsHandler
} from './handler/points';
import {
	createLeaderboardMessageHandler,
	createSendRankMessageHandler
} from './handler/send-rank-message';
import { createSendLeaderboardToOverlayHandler } from './handler/send-leaderboard-to-overlay';
import { seedRankingsDefaults } from './lib/seed-defaults';
import { rankings as rankingsService } from './lib/instances';
import { WatchTimeTracker } from './lib/watch-time-tracker';
import {
	createPointsEarnedTrigger,
	createRankChangedTrigger,
	createTierAdvancedTrigger
} from './trigger/rankings-events';
import RankingsWidget from './widgets/rankings-widget.svelte';

export type { RankingsPluginApi } from './lib/plugin-api';

const overviewPage = {
	customView: 'overview',
	title: 'Overview',
	description: 'Rankings stats and watch-time status.'
} as unknown as PluginPageDefinition;

const tiersPage = {
	customView: 'tiers',
	title: 'Tiers & Ranks',
	description: 'Configure tiers, ranks, and point milestones.'
} as unknown as PluginPageDefinition;

const leaderboardPage = {
	customView: 'leaderboard',
	title: 'Leaderboard',
	description: 'Top users and manual point adjustments.'
} as unknown as PluginPageDefinition;

const plugin: Plugin = (app) => {
	let watchTimeTracker: WatchTimeTracker | undefined;

	return {
		name: 'Rankings',
		description: 'User rankings with tiers, points, and watch-time rewards.',
		icon: 'ri:trophy-line',
		dependencies: ['core', 'bot', 'twitch'],
		isConfigured: () => rankingsService.isReady,
		api: {
			rankings: rankingsService
		},
		customViews: {
			overview: OverviewPage,
			tiers: TiersPage,
			leaderboard: LeaderboardPage,
			'rankings-widget': RankingsWidget
		},
		menuItems: [
			{
				title: 'Rankings',
				icon: 'ri:trophy-line',
				children: [
					{ title: 'Overview', page: overviewPage },
					{ title: 'Tiers & Ranks', page: tiersPage },
					{ title: 'Leaderboard', page: leaderboardPage }
				]
			}
		],
		widgets: [
			{
				key: 'rankings',
				title: 'Rankings',
				description: 'User stats and top leaderboard entries.',
				icon: 'ri:trophy-line',
				columns: 2,
				view: 'rankings-widget'
			}
		],
		triggers: [
			{
				name: 'Rankings',
				children: [
					createPointsEarnedTrigger(rankingsService),
					createRankChangedTrigger(rankingsService),
					createTierAdvancedTrigger(rankingsService)
				]
			}
		],
		handlers: [
			{
				name: 'Rankings',
				children: [
					createGetUserRankHandler(app, rankingsService),
					createAddPointsHandler(app, rankingsService),
					createSetPointsHandler(app, rankingsService),
					createRemovePointsHandler(app, rankingsService),
					createSendRankMessageHandler(app, rankingsService),
					createLeaderboardMessageHandler(app, rankingsService),
					createSendLeaderboardToOverlayHandler(app, rankingsService)
				]
			}
		],
		settings: [
			{
				type: 'switch',
				name: 'Watch time rewards',
				description: 'Award points to active Twitch chatters while you are live.',
				defaultValue: true
			},
			{
				type: 'text',
				name: 'Points per minute',
				defaultValue: '1'
			},
			{
				type: 'text',
				name: 'Award interval (seconds)',
				defaultValue: '60'
			},
			{
				type: 'text',
				name: 'Leaderboard size',
				defaultValue: '10'
			}
		],
		onLoad: async ({ store, app: pluginApp }) => {
			rankingsService.bind(store, pluginApp);
			await rankingsService.load();
		},
		onEnable: async ({ store, app: pluginApp }) => {
			rankingsService.bind(store, pluginApp);
			await rankingsService.load();
		},
		onReady: async ({ store, app: pluginApp, pluginKey }) => {
			rankingsService.bind(store, pluginApp);
			await rankingsService.load();
			// Seed after app.actions.load() (see boot-app). Seeding in onEnable runs too early
			// and would recreate defaults on every boot when the action list is still empty.
			await seedRankingsDefaults(pluginApp, pluginKey, store);

			const watchTimeEnabled = pluginApp.plugins.getSettingValue(pluginKey, 'watch-time-rewards');
			const pointsPerMinute = pluginApp.plugins.getSettingValue(pluginKey, 'points-per-minute');
			const awardIntervalSeconds = pluginApp.plugins.getSettingValue(
				pluginKey,
				'award-interval-seconds'
			);
			const leaderboardSize = pluginApp.plugins.getSettingValue(pluginKey, 'leaderboard-size');

			rankingsService.settings = {
				...rankingsService.settings,
				watchTimeEnabled: watchTimeEnabled !== false,
				pointsPerMinute: Number(pointsPerMinute) || rankingsService.settings.pointsPerMinute,
				awardIntervalSeconds:
					Number(awardIntervalSeconds) || rankingsService.settings.awardIntervalSeconds,
				leaderboardSize: Number(leaderboardSize) || rankingsService.settings.leaderboardSize
			};

			await rankingsService.persistSettings();

			watchTimeTracker = new WatchTimeTracker(pluginApp, rankingsService);
			watchTimeTracker.start();
		},
		onDisable: async () => {
			watchTimeTracker?.stop();
			watchTimeTracker = undefined;
		},
		onSave: async ({ store, app: pluginApp, pluginKey }) => {
			const watchTimeEnabled = pluginApp.plugins.getSettingValue(pluginKey, 'watch-time-rewards');
			const pointsPerMinute = pluginApp.plugins.getSettingValue(pluginKey, 'points-per-minute');
			const awardIntervalSeconds = pluginApp.plugins.getSettingValue(
				pluginKey,
				'award-interval-seconds'
			);
			const leaderboardSize = pluginApp.plugins.getSettingValue(pluginKey, 'leaderboard-size');

			rankingsService.settings = {
				...rankingsService.settings,
				watchTimeEnabled: watchTimeEnabled !== false,
				pointsPerMinute: Number(pointsPerMinute) || rankingsService.settings.pointsPerMinute,
				awardIntervalSeconds:
					Number(awardIntervalSeconds) || rankingsService.settings.awardIntervalSeconds,
				leaderboardSize: Number(leaderboardSize) || rankingsService.settings.leaderboardSize
			};

			await rankingsService.persistSettings();
			watchTimeTracker?.restart();
		}
	};
};

export default plugin;
