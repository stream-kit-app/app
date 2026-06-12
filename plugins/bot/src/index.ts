import type { Plugin, PluginPageDefinition } from '@stream-kit/app/api';
import type { Component } from 'svelte';

import { Commands } from './commands/app/lib/commands.svelte';
import CommandsPage from './commands/app/ui/commands-page.svelte';
import { createChatRuntime } from './lib/chat-runtime';
import { TimerScheduler } from './lib/timer-scheduler';
import { ModerationRules } from './moderation/app/lib/moderation-rules.svelte';
import ModerationPage from './moderation/app/ui/moderation-page.svelte';
import { BotSettings } from './settings/bot-settings';
import { Timers } from './timers/app/lib/timers.svelte';
import TimersPage from './timers/app/ui/timers-page.svelte';
import OverviewPage from './ui/overview-page.svelte';
import { createChatMessageTrigger } from './trigger/chat-message';
import { createModerationRuleTrigger } from './trigger/moderation-rule';

export type { BotPluginRegistrationApi } from './lib/plugin-api';
export { Commands } from './commands/app/lib/commands.svelte';
export { Timers } from './timers/app/lib/timers.svelte';
export { ModerationRules } from './moderation/app/lib/moderation-rules.svelte';
export { BotSettings } from './settings/bot-settings';

const overviewPage = {
	customView: 'overview',
	title: 'Overview',
	description: 'Bot connection status and settings.'
} satisfies PluginPageDefinition;

const commandsPage = {
	customView: 'commands',
	title: 'Commands',
	description: 'Create chat commands with their own handlers.'
} satisfies PluginPageDefinition;

const timersPage = {
	customView: 'timers',
	title: 'Timers',
	description: 'Schedule automatic actions on an interval.'
} satisfies PluginPageDefinition;

const moderationPageDef = {
	customView: 'moderation',
	title: 'Moderation',
	description: 'Automatic chat moderation rules.'
} satisfies PluginPageDefinition;

export function botPlugin(
	commands: Commands,
	timers: Timers,
	moderation: ModerationRules,
	botSettings: BotSettings,
	overviewPageComponent: Component = OverviewPage,
	commandsPageComponent: Component = CommandsPage,
	timersPageComponent: Component = TimersPage,
	moderationPageComponent: Component = ModerationPage
): Plugin {
	let timerScheduler: TimerScheduler | undefined;

	function activateRuntime(pluginApp: Parameters<Plugin>[0]): void {
		commands.registerRuntime((app) =>
			createChatRuntime(app, {
				settings: botSettings,
				fetchModRules: () => moderation.fetchRecords(),
				getCommands: () => commands.getSnapshot(),
				timerScheduler
			})
		);
		commands.deactivate();
		commands.activate(pluginApp);
		timerScheduler?.start();
	}

	function deactivateRuntime(): void {
		commands.deactivate();
		timerScheduler?.stop();
	}

	return (app) => ({
		name: 'Bot',
		description: 'Chat bot with commands, timers, and moderation.',
		icon: 'at-icons:bot',
		dependencies: [],
		triggers: [
			{
				name: 'Bot',
				children: [
					createModerationRuleTrigger(app, moderation),
					createChatMessageTrigger(app)
				]
			}
		],
		isConfigured: () => {
			const twitch = app.plugins.tryGet<{ isConnected?: boolean }>('twitch');
			const youtube = app.plugins.tryGet<{ isConnected?: boolean }>('youtube');

			return Boolean(twitch?.isConnected || youtube?.isConnected);
		},
		api: {
			commands,
			timers,
			moderation,
			settings: botSettings
		},
		customViews: {
			overview: overviewPageComponent,
			commands: commandsPageComponent,
			timers: timersPageComponent,
			moderation: moderationPageComponent
		},
		menuItems: [
			{
				title: 'Bot',
				icon: 'at-icons:bot',
				children: [
					{
						title: 'Overview',
						page: overviewPage
					},
					{
						title: 'Commands',
						page: commandsPage
					},
					{
						title: 'Timers',
						page: timersPage
					},
					{
						title: 'Moderation',
						page: moderationPageDef
					}
				]
			}
		],
		onLoad: async ({ store }) => {
			await botSettings.load(store);
			await Promise.all([commands.load(), timers.load(), moderation.load()]);
		},
		onBoot: async (context) => {
			timerScheduler = new TimerScheduler(
				context.app,
				botSettings,
				() => timers.getSnapshot(),
				(id, data) => {
					timers.runById(id, { trigger: 'Timer', data });
				}
			);
			await moderation.load();
			activateRuntime(context.app);
		},
		onEnable: async (context) => {
			await Promise.all([commands.load(), timers.load(), moderation.load()]);
			timerScheduler = new TimerScheduler(
				context.app,
				botSettings,
				() => timers.getSnapshot(),
				(id, data) => {
					timers.runById(id, { trigger: 'Timer', data });
				}
			);
			activateRuntime(context.app);
		},
		onReady: (context) => {
			activateRuntime(context.app);
		},
		onDisable: () => {
			deactivateRuntime();
		},
		onSave: async ({ store }) => {
			await botSettings.save(store);
		}
	});
}

export default botPlugin;
