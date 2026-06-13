import type { ChatModerationContext } from './moderation-engine';
import type {
	ConditionDefinition,
	ConditionGroupNode,
	FieldValue
} from '@stream-kit/plugin';
import type { ResolvedConditionDefinition } from '@stream-kit/plugin/action';
import { emptyConditionGroup } from '@stream-kit/plugin/action';

import { matchText } from './match-text';
import { DEFAULT_EXEMPT_ROLES, moderationRoleItems, roleMatches } from './role-utils';

export { DEFAULT_EXEMPT_ROLES };

const textMatchOperators = [
	{ value: 'contains', label: 'Contains' },
	{ value: 'equals', label: 'Equals' },
	{ value: 'startsWith', label: 'Starts with' },
	{ value: 'endsWith', label: 'Ends with' },
	{ value: 'regex', label: 'Regex' }
] as const;

const minLengthItems = [
	{ value: '0', label: 'Any length' },
	{ value: '50', label: '50+ characters' },
	{ value: '100', label: '100+ characters' },
	{ value: '200', label: '200+ characters' },
	{ value: '500', label: '500+ characters' }
] as const;

const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s]+/i;

export const moderationConditionDefinitions: ResolvedConditionDefinition[] = [
	{
		key: 'message',
		type: 'select-text',
		name: 'Message',
		placeholder: 'Text to match',
		defaultValue: { type: 'contains', value: '' },
		items: [...textMatchOperators]
	},
	{
		key: 'user',
		type: 'select-text',
		name: 'User',
		placeholder: 'Username',
		defaultValue: { type: 'equals', value: '' },
		items: [...textMatchOperators]
	},
	{
		key: 'role',
		type: 'select',
		name: 'Role',
		items: [...moderationRoleItems]
	},
	{
		key: 'min-length',
		type: 'text',
		name: 'Minimum length',
		placeholder: '8'
	},
	{
		key: 'max-length',
		type: 'text',
		name: 'Maximum length',
		placeholder: '500'
	},
	{
		key: 'contains-link',
		type: 'checkbox',
		name: 'Contains link',
		defaultValue: true
	},
	{
		key: 'caps-percent',
		type: 'text',
		name: 'Caps percent',
		placeholder: '70'
	},
	{
		key: 'repeat-message',
		type: 'text-select-text',
		name: 'Repeated message',
		pathPlaceholder: 'seconds',
		valuePlaceholder: 'repeats',
		selectPlaceholder: 'Match',
		defaultValue: { path: '30', type: 'within', value: '3' },
		items: [{ value: 'within', label: 'Within' }]
	},
	{
		key: 'message-flood',
		type: 'text-select-text',
		name: 'Message flood',
		pathPlaceholder: 'seconds',
		valuePlaceholder: 'messages',
		selectPlaceholder: 'Only if at least',
		defaultValue: { path: '60', type: '0', value: '5' },
		items: [...minLengthItems]
	}
];

export function createDefaultConditionGroup(): ConditionGroupNode {
	return emptyConditionGroup();
}

function readSelectText(value: FieldValue): { type: string; value: string } | null {
	if (!value || typeof value !== 'object' || !('type' in value) || !('value' in value)) {
		return null;
	}

	return value as { type: string; value: string };
}

function readTextSelectText(
	value: FieldValue
): { path: string; type: string; value: string } | null {
	if (!value || typeof value !== 'object' || !('path' in value) || !('value' in value)) {
		return null;
	}

	return value as { path: string; type: string; value: string };
}

function readNumber(value: FieldValue, fallback: number): number {
	const parsed = Number(typeof value === 'string' ? value : '');

	return Number.isFinite(parsed) ? parsed : fallback;
}

function messageContainsLink(message: string): boolean {
	return URL_PATTERN.test(message);
}

function capsPercent(message: string): number {
	const letters = message.replace(/[^a-zA-Z]/g, '');

	if (letters.length === 0) {
		return 0;
	}

	const caps = letters.replace(/[^A-Z]/g, '').length;

	return (caps / letters.length) * 100;
}

const repeatMessageTracker = new Map<string, Array<{ message: string; at: number }>>();
const messageFloodTracker = new Map<string, Array<{ at: number }>>();

function evaluateRepeatMessage(
	context: ChatModerationContext,
	ruleId: string,
	value: FieldValue
): boolean {
	const match = readTextSelectText(value);

	if (!match?.value.trim() || !match.path.trim()) {
		return false;
	}

	const maxRepeats = readNumber(match.value, 3);
	const windowSec = Math.max(1, readNumber(match.path, 30));
	const windowMs = windowSec * 1000;
	const key = `${ruleId}:${context.userId || context.user}`;
	const now = Date.now();
	const normalized = context.message.trim().toLowerCase();
	const history = (repeatMessageTracker.get(key) ?? []).filter(
		(entry) => now - entry.at <= windowMs
	);

	history.push({ message: normalized, at: now });
	repeatMessageTracker.set(key, history);

	const repeats = history.filter((entry) => entry.message === normalized).length;

	return repeats > maxRepeats;
}

function evaluateMessageFlood(
	context: ChatModerationContext,
	ruleId: string,
	value: FieldValue
): boolean {
	const match = readTextSelectText(value);

	if (!match?.value.trim() || !match.path.trim()) {
		return false;
	}

	const maxMessages = readNumber(match.value, 5);
	const windowSec = Math.max(1, readNumber(match.path, 30));
	const minLength = readNumber(match.type, 0);
	const windowMs = windowSec * 1000;
	const key = `${ruleId}:${context.userId || context.user}`;
	const now = Date.now();
	const messageLength = context.message.length;

	const history = (messageFloodTracker.get(key) ?? []).filter(
		(entry) => now - entry.at <= windowMs
	);

	history.push({ at: now });
	messageFloodTracker.set(key, history);

	if (history.length < maxMessages) {
		return false;
	}

	return minLength === 0 || messageLength >= minLength;
}

export function createModerationEvaluators(
	context: ChatModerationContext,
	ruleId: string
): Record<string, (value: FieldValue) => boolean> {
	return {
		message: (value) => {
			const match = readSelectText(value);

			if (!match?.value.trim()) {
				return true;
			}

			return matchText(context.message, match.type, match.value);
		},
		user: (value) => {
			const match = readSelectText(value);

			if (!match?.value.trim()) {
				return true;
			}

			return matchText(context.user, match.type, match.value);
		},
		role: (value) => {
			const role = String(value ?? '').trim();

			if (!role) {
				return true;
			}

			return roleMatches(context.role, role);
		},
		'min-length': (value) => {
			const minLength = readNumber(value, 0);

			return context.message.length >= minLength;
		},
		'max-length': (value) => {
			const maxLength = readNumber(value, Number.MAX_SAFE_INTEGER);

			return context.message.length <= maxLength;
		},
		'contains-link': (value) => {
			const enabled = value !== false;

			if (!enabled) {
				return true;
			}

			return messageContainsLink(context.message);
		},
		'caps-percent': (value) => {
			const threshold = readNumber(value, 70);

			return capsPercent(context.message) >= threshold;
		},
		'repeat-message': (value) => evaluateRepeatMessage(context, ruleId, value),
		'message-flood': (value) => evaluateMessageFlood(context, ruleId, value)
	};
}

export function summarizeConditions(conditions: ConditionGroupNode): string {
	const leaves = collectLeaves(conditions);

	if (leaves.length === 0) {
		return 'No conditions';
	}

	const labels = leaves.map((leaf) => {
		const definition = moderationConditionDefinitions.find((item) => item.key === leaf.key);

		return definition?.name ?? leaf.key;
	});

	return labels.slice(0, 3).join(', ') + (labels.length > 3 ? '…' : '');
}

function collectLeaves(group: ConditionGroupNode): Array<{ key: string }> {
	return group.children.flatMap((child) =>
		child.kind === 'condition' ? [{ key: child.key }] : collectLeaves(child)
	);
}

export type { ConditionDefinition };
