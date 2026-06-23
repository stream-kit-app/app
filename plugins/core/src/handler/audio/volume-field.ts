import type { HandlerFieldDefinition } from '@stream-kit/plugin';
import type { HandlerFieldInstance } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';

export const volumeField = {
	type: 'slider',
	name: 'Volume',
	min: 0,
	max: 200,
	defaultValue: 100
} satisfies HandlerFieldDefinition;

export function resolveVolume(fields: HandlerFieldInstance[]): number {
	const value = getFieldValue(fields, 'volume');
	const percent = typeof value === 'number' ? value : 100;

	return Math.min(2, Math.max(0, percent / 100));
}
