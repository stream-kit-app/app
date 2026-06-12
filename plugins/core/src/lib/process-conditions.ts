import type { ConditionDefinition, FieldValue } from '@stream-kit/core';

import type { ProcessEventContext } from '../contexts';
import { matchText } from './match-text';
import { textMatchOperators } from './text-match-operators';

export const processNameMatchOperators = textMatchOperators;

export function processNameCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Name',
		placeholder: 'Process name (e.g. notepad)',
		defaultValue: { type: 'equals', value: '' },
		items: [...processNameMatchOperators],
		variables: [
			{ key: 'executable', label: 'Executable' },
			{ key: 'name', label: 'Name' },
			{ key: 'fullPath', label: 'Full path' }
		]
	};
}

function basename(path: string): string {
	const normalized = path.replace(/\\/g, '/');
	const segment = normalized.split('/').pop();

	return segment ?? '';
}

function normalizeProcessName(value: string): string {
	const trimmed = value.trim();

	if (trimmed.toLowerCase().endsWith('.exe')) {
		return trimmed.slice(0, -4);
	}

	return trimmed;
}

function getProcessMatchCandidates(ctx: ProcessEventContext): string[] {
	const candidates = new Set<string>();

	if (ctx.executable) {
		candidates.add(normalizeProcessName(ctx.executable));
	}

	if (ctx.name) {
		candidates.add(normalizeProcessName(ctx.name));
	}

	if (ctx.fullPath) {
		candidates.add(normalizeProcessName(basename(ctx.fullPath)));
	}

	return [...candidates].filter((candidate) => candidate.length > 0);
}

export function evaluateProcessNameMatch(ctx: ProcessEventContext, value: FieldValue): boolean {
	if (!value || typeof value !== 'object' || !('value' in value)) {
		return true;
	}

	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	const needle = normalizeProcessName(match.value);
	const candidates = getProcessMatchCandidates(ctx);

	if (candidates.some((candidate) => matchText(candidate, match.type, needle))) {
		return true;
	}

	if (ctx.fullPath && matchText(ctx.fullPath, match.type, match.value)) {
		return true;
	}

	return false;
}
