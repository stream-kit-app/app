import type { ConditionGroupNode, FieldValue } from '$lib/core/action/trigger/condition';

import { emptyConditionGroup } from '$lib/core/action/condition-tree';

type LegacyBannedWordParameters = {
	words: string[];
	matchWholeWord: boolean;
};

type LegacyCapsParameters = {
	minLength: number;
	maxCapsPercent: number;
};

type LegacyLinksParameters = {
	allowedDomains: string[];
};

type LegacyRepeatParameters = {
	maxRepeats: number;
	windowSec: number;
};

type LegacyModRuleRow = {
	id: number;
	type: string;
	parameters: unknown;
};

function createConditionLeaf(
	key: string,
	value: FieldValue,
	operator?: 'and' | 'or'
): ConditionGroupNode['children'][number] {
	return {
		kind: 'condition',
		id: crypto.randomUUID(),
		key,
		value,
		...(operator ? { operator } : {})
	};
}

function convertBannedWord(params: LegacyBannedWordParameters): ConditionGroupNode {
	const words = params.words.map((word) => word.trim()).filter(Boolean);

	if (words.length === 0) {
		return emptyConditionGroup();
	}

	return {
		kind: 'group',
		id: 'root',
		children: words.map((word, index) =>
			createConditionLeaf(
				'message',
				{ type: params.matchWholeWord ? 'equals' : 'contains', value: word },
				index > 0 ? 'or' : undefined
			)
		)
	};
}

function convertCaps(params: LegacyCapsParameters): ConditionGroupNode {
	return {
		kind: 'group',
		id: 'root',
		children: [
			createConditionLeaf('min-length', String(params.minLength ?? 8)),
			createConditionLeaf('caps-percent', String(params.maxCapsPercent ?? 70), 'and')
		]
	};
}

function convertLinks(_params: LegacyLinksParameters): ConditionGroupNode {
	return {
		kind: 'group',
		id: 'root',
		children: [createConditionLeaf('contains-link', true)]
	};
}

function convertRepeat(params: LegacyRepeatParameters): ConditionGroupNode {
	return {
		kind: 'group',
		id: 'root',
		children: [
			createConditionLeaf('repeat-message', {
				path: String(params.windowSec ?? 30),
				type: 'within',
				value: String(params.maxRepeats ?? 3)
			})
		]
	};
}

export function convertLegacyModRuleParameters(
	type: string,
	parameters: unknown
): ConditionGroupNode {
	switch (type) {
		case 'banned_word':
			return convertBannedWord(parameters as LegacyBannedWordParameters);
		case 'caps':
			return convertCaps(parameters as LegacyCapsParameters);
		case 'links':
			return convertLinks(parameters as LegacyLinksParameters);
		case 'repeat':
			return convertRepeat(parameters as LegacyRepeatParameters);
		default:
			return emptyConditionGroup();
	}
}

export function isLegacyModRuleType(type: string): boolean {
	return type !== 'custom';
}

export function migrateRateLimitConditionKeys(group: ConditionGroupNode): boolean {
	let changed = false;

	for (const child of group.children) {
		if (child.kind === 'condition' && child.key === 'rate-limit') {
			child.key = 'repeat-message';
			changed = true;
			continue;
		}

		if (child.kind === 'group' && migrateRateLimitConditionKeys(child)) {
			changed = true;
		}
	}

	return changed;
}

export type { LegacyModRuleRow };
