import {
	getFieldValue as getFieldValueCore,
	resolveFieldText as resolveFieldTextCore,
	type HandlerFieldInstance,
	type HandlerTriggerContext
} from '@stream-kit/core';

import { contextToVariables } from './lib/variables';

export const getFieldValue = getFieldValueCore;

export function resolveFieldText(
	fields: HandlerFieldInstance[],
	key: string,
	context: HandlerTriggerContext
): string | undefined {
	return resolveFieldTextCore(fields, key, context, contextToVariables);
}
