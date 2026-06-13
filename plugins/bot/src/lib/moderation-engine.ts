import type { CustomModRuleParameters, ModRuleRecord } from '../moderation/app/lib/stored-mod-rule';
import type { PluginAppApi } from '@stream-kit/plugin';

import { evaluateWith } from './evaluate-conditions';
import { createModerationEvaluators, DEFAULT_EXEMPT_ROLES } from './moderation-conditions';
import { roleMatches } from './role-utils';

type TwitchModerationApi = {
	readonly userId?: string;
	readonly client?: {
		moderation: {
			deleteChatMessages(broadcasterId: string, messageId: string): Promise<unknown>;
			banUser(
				broadcasterId: string,
				params: { userId: string; duration?: number; reason?: string }
			): Promise<unknown>;
			warnUser(
				broadcasterId: string,
				params: { userId: string; reason?: string }
			): Promise<unknown>;
		};
	};
};

type YouTubeModerationApi = {
	deleteMessage(messageId: string): Promise<boolean>;
	banUser(userId: string, durationSec?: number): Promise<boolean>;
};

export type ChatModerationContext = {
	source: 'twitch' | 'youtube';
	user: string;
	userId: string;
	message: string;
	role: string;
	channel?: string;
	broadcasterId?: string;
	messageId?: string;
	liveChatId?: string;
	channelId?: string;
};

function isExempt(role: string, exemptRoles: string[]): boolean {
	return exemptRoles.some((item) => roleMatches(role, item));
}

function sortRules(rules: ModRuleRecord[]): ModRuleRecord[] {
	return [...rules].sort((left, right) => {
		if (left.priority !== right.priority) {
			return left.priority - right.priority;
		}

		return left.id.localeCompare(right.id);
	});
}

function evaluateRule(context: ChatModerationContext, rule: ModRuleRecord): boolean {
	const parameters = rule.parameters as CustomModRuleParameters;

	if (!parameters.conditions?.children?.length) {
		return false;
	}

	return evaluateWith(parameters.conditions, createModerationEvaluators(context, rule.id));
}

export function evaluateModRuleMatch(
	context: ChatModerationContext,
	rule: ModRuleRecord,
	options: {
		checkEnabled?: boolean;
		checkPlatform?: boolean;
		checkExempt?: boolean;
	} = {}
): boolean {
	const { checkEnabled = true, checkPlatform = true, checkExempt = false } = options;

	if (checkEnabled && !rule.enabled) {
		return false;
	}

	if (checkPlatform && !rule.platforms.includes(context.source)) {
		return false;
	}

	const parameters = rule.parameters as CustomModRuleParameters;

	if (checkExempt) {
		const exemptRoles =
			parameters.exemptRoles !== undefined ? parameters.exemptRoles : DEFAULT_EXEMPT_ROLES;

		if (isExempt(context.role, exemptRoles)) {
			return false;
		}
	}

	return evaluateRule(context, rule);
}

async function applyAction(
	app: PluginAppApi,
	context: ChatModerationContext,
	action: ModRuleRecord['action'],
	reason: string
): Promise<void> {
	if (context.source === 'youtube') {
		const youtube = app.plugins.tryGet<YouTubeModerationApi>('youtube');

		if (!youtube) {
			return;
		}

		if (action === 'delete' && context.messageId) {
			await youtube.deleteMessage(context.messageId);
			return;
		}

		if (action === 'timeout' && context.userId) {
			await youtube.banUser(context.userId, 600);
			return;
		}

		return;
	}

	if (!context.broadcasterId) {
		const twitchUserId = app.plugins.tryGet<{ userId?: string }>('twitch')?.userId;

		if (!twitchUserId) {
			return;
		}

		context = { ...context, broadcasterId: twitchUserId };
	}

	const twitch = app.plugins.tryGet<TwitchModerationApi>('twitch');

	if (!twitch?.client?.moderation) {
		return;
	}

	const { moderation } = twitch.client;

	if (action === 'delete') {
		if (!context.messageId) {
			console.warn('[bot] Cannot delete Twitch chat message: missing messageId');
			return;
		}

		try {
			await moderation.deleteChatMessages(context.broadcasterId!, context.messageId);
		} catch (error) {
			console.error('[bot] Failed to delete Twitch chat message', error);
		}
		return;
	}

	if (!context.userId) {
		return;
	}

	if (action === 'timeout') {
		await moderation.banUser(context.broadcasterId!, {
			userId: context.userId,
			duration: 600,
			reason
		});
		return;
	}

	if (action === 'warn') {
		await moderation.warnUser(context.broadcasterId!, {
			userId: context.userId,
			reason
		});
	}
}

export async function evaluateModeration(
	app: PluginAppApi,
	rules: ModRuleRecord[],
	context: ChatModerationContext
): Promise<boolean> {
	for (const rule of sortRules(rules)) {
		if (!evaluateModRuleMatch(context, rule, { checkExempt: true })) {
			continue;
		}

		await applyAction(app, context, rule.action, `Auto-mod: ${rule.name}`);

		return true;
	}

	return false;
}
