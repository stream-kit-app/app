import type { ConditionGroupNode } from '$lib/core/action/trigger/condition';

export type ModRuleType = 'custom';
export type ModRuleAction = 'delete' | 'timeout' | 'warn';
export type ModRulePlatform = 'twitch' | 'youtube';

export type CustomModRuleParameters = {
	conditions: ConditionGroupNode;
	exemptRoles?: string[];
};

export type ModRuleParameters = CustomModRuleParameters;

export type ModRuleRecord = {
	id: number;
	name: string;
	type: ModRuleType;
	enabled: boolean;
	action: ModRuleAction;
	parameters: ModRuleParameters;
	platforms: ModRulePlatform[];
	priority: number;
	createdAt: Date;
	updatedAt: Date;
};

export const DEFAULT_MOD_PLATFORMS: ModRulePlatform[] = ['twitch', 'youtube'];
