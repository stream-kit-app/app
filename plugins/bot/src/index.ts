import type { Plugin, PluginPageDefinition } from '@stream-kit/plugin';
import type { Component } from 'svelte';

import { Commands } from './commands/app/lib/commands.svelte';
import CommandsPage from './commands/app/ui/commands-page.svelte';
import { createChatRuntime } from './lib/chat-runtime';
import { botSettings, commands, moderation, roles, timers } from './lib/instances';
import { TimerScheduler } from './lib/timer-scheduler';
import { ModerationRules } from './moderation/app/lib/moderation-rules.svelte';
import ModerationPage from './moderation/app/ui/moderation-page.svelte';
import { Roles } from './roles/app/lib/roles.svelte';
import RolesPage from './roles/app/ui/roles-page.svelte';
import {
	createAddUserToRoleHandler,
	createRemoveUserFromRoleHandler,
	createUserInRoleHandler
} from './roles/handler/roles';
import { BotSettings } from './settings/bot-settings';
import { Timers } from './timers/app/lib/timers.svelte';
import TimersPage from './timers/app/ui/timers-page.svelte';
import OverviewPage from './ui/overview-page.svelte';
import CommandsWidget from './widgets/commands-widget.svelte';
import { createChatMessageTrigger } from './trigger/chat-message';
import { createModerationRuleTrigger } from './trigger/moderation-rule';

export type { BotPluginRegistrationApi } from './lib/plugin-api';
export { Commands } from './commands/app/lib/commands.svelte';
export { Roles } from './roles/app/lib/roles.svelte';
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

const rolesPageDef = {
	customView: 'roles',
	title: 'Roles',
	description: 'Custom user roles for command permissions.'
} as unknown as PluginPageDefinition;

export function botPlugin(
	commandsService: Commands,
	timersService: Timers,
	moderationService: ModerationRules,
	rolesService: Roles,
	settings: BotSettings,
	overviewPageComponent: Component = OverviewPage,
	commandsPageComponent: Component = CommandsPage,
	timersPageComponent: Component = TimersPage,
	moderationPageComponent: Component = ModerationPage,
	rolesPageComponent: Component = RolesPage
): Plugin {
	let timerScheduler: TimerScheduler | undefined;

	function ensureTimerScheduler(pluginApp: Parameters<Plugin>[0]): TimerScheduler {
		if (!timerScheduler) {
			timerScheduler = new TimerScheduler(
				pluginApp,
				settings,
				() => timersService.getSnapshot(),
				(id, data) => {
					timersService.runById(id, { trigger: 'Timer', data });
				}
			);
		}

		return timerScheduler;
	}

	function activateRuntime(pluginApp: Parameters<Plugin>[0]): void {
		commandsService.registerRuntime((app) =>
			createChatRuntime(app, {
				settings,
				fetchModRules: () => moderationService.fetchRecords(),
				getCommands: () => commandsService.getSnapshot(),
				timerScheduler
			})
		);
		commandsService.deactivate();
		commandsService.activate(pluginApp);
		timerScheduler?.start();
	}

	function deactivateRuntime(): void {
		commandsService.deactivate();
		timerScheduler?.stop();
	}

	return (app) => ({
		name: 'Bot',
		description: 'Chat bot with commands, timers, moderation, and custom roles.',
		icon: 'at-icons:bot',
		dependencies: [],
		triggers: [
			{
				name: 'Bot',
				children: [
					createModerationRuleTrigger(app, moderationService),
					createChatMessageTrigger(app)
				]
			}
		],
		handlers: [
			{
				name: 'Roles',
				children: [
					createAddUserToRoleHandler(app, rolesService),
					createRemoveUserFromRoleHandler(app, rolesService),
					createUserInRoleHandler(app, rolesService)
				]
			}
		],
		isConfigured: () => {
			const twitch = app.plugins.tryGet<{ isConnected?: boolean }>('twitch');
			const youtube = app.plugins.tryGet<{ isConnected?: boolean }>('youtube');

			return Boolean(twitch?.isConnected || youtube?.isConnected);
		},
		api: {
			commands: commandsService,
			timers: timersService,
			moderation: moderationService,
			roles: rolesService,
			settings
		},
		customViews: {
			overview: overviewPageComponent,
			commands: commandsPageComponent,
			timers: timersPageComponent,
			moderation: moderationPageComponent,
			roles: rolesPageComponent,
			'commands-widget': CommandsWidget
		},
		widgets: [
			{
				key: 'commands',
				title: 'Commands',
				icon: 'ri:robot-2-line',
				columns: 1,
				view: 'commands-widget'
			}
		],
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
					},
					{
						title: 'Roles',
						page: rolesPageDef
					}
				]
			}
		],
		onLoad: async ({ app: pluginApp, store }) => {
			commandsService.bind(store, pluginApp);
			timersService.bind(store, pluginApp);
			moderationService.bind(store, pluginApp);
			rolesService.bind(store, pluginApp);
			await settings.load(store);
			await Promise.all([
				commandsService.load(),
				timersService.load(),
				moderationService.load(),
				rolesService.load()
			]);
		},
		onEnable: async (context) => {
			ensureTimerScheduler(context.app);
			await Promise.all([
				commandsService.load(),
				timersService.load(),
				moderationService.load(),
				rolesService.load()
			]);
			activateRuntime(context.app);
		},
		onReady: async (context) => {
			await Promise.all([
				commandsService.refreshDefinitionBindings(),
				timersService.refreshDefinitionBindings()
			]);
			activateRuntime(context.app);
		},
		onDisable: () => {
			deactivateRuntime();
			timerScheduler = undefined;
		},
		onSave: async ({ store }) => {
			await settings.save(store);
		}
	});
}

export default botPlugin(commands, timers, moderation, roles, botSettings);
