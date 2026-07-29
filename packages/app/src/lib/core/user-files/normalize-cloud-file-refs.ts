import type {
	HandlerFieldInstance,
	HandlerFieldScalarValue,
	HandlerFieldValue,
	OneOfFieldValue
} from '../action/handler/field';
import type { StoredActionHandler } from '../action/stored-action';

import { toRelativeCloudFilePath } from './user-files';

function isOneOfFieldValue(value: unknown): value is OneOfFieldValue {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return false;
	}
	const record = value as Record<string, unknown>;
	return typeof record.variant === 'string' && record.values != null && typeof record.values === 'object';
}

/**
 * Rewrite absolute PocketBase file URLs to host-independent /api/files paths.
 * Leaves non-cloud values unchanged.
 */
export function normalizeCloudFileRefValue(
	value: HandlerFieldValue
): { value: HandlerFieldValue; changed: boolean } {
	if (typeof value === 'string') {
		const relative = toRelativeCloudFilePath(value);
		if (relative && relative !== value.trim()) {
			return { value: relative, changed: true };
		}
		return { value, changed: false };
	}

	if (!isOneOfFieldValue(value)) {
		return { value, changed: false };
	}

	let changed = false;
	const values: Record<string, HandlerFieldScalarValue> = { ...value.values };

	for (const [key, entry] of Object.entries(values)) {
		if (typeof entry !== 'string') {
			continue;
		}
		const relative = toRelativeCloudFilePath(entry);
		if (relative && relative !== entry.trim()) {
			values[key] = relative;
			changed = true;
		}
	}

	if (!changed) {
		return { value, changed: false };
	}

	return {
		value: {
			variant: value.variant,
			values
		},
		changed: true
	};
}

export function normalizeCloudFileRefsInFields(
	fields: HandlerFieldInstance[]
): { fields: HandlerFieldInstance[]; changed: boolean } {
	let changed = false;
	const next = fields.map((field) => {
		const result = normalizeCloudFileRefValue(field.value);
		if (!result.changed) {
			return field;
		}
		changed = true;
		return { ...field, value: result.value };
	});
	return { fields: next, changed };
}

export function normalizeCloudFileRefsInHandlers(
	handlers: StoredActionHandler[]
): { handlers: StoredActionHandler[]; changed: boolean } {
	let changed = false;
	const next = handlers.map((handler) => {
		const fieldsResult = normalizeCloudFileRefsInFields(handler.fields);
		let thenHandlers = handler.thenHandlers;
		let elseHandlers = handler.elseHandlers;
		let nestedChanged = fieldsResult.changed;

		if (thenHandlers?.length) {
			const nested = normalizeCloudFileRefsInHandlers(thenHandlers);
			if (nested.changed) {
				thenHandlers = nested.handlers;
				nestedChanged = true;
			}
		}

		if (elseHandlers?.length) {
			const nested = normalizeCloudFileRefsInHandlers(elseHandlers);
			if (nested.changed) {
				elseHandlers = nested.handlers;
				nestedChanged = true;
			}
		}

		if (!nestedChanged) {
			return handler;
		}

		changed = true;
		return {
			...handler,
			fields: fieldsResult.fields,
			...(thenHandlers ? { thenHandlers } : {}),
			...(elseHandlers ? { elseHandlers } : {})
		};
	});

	return { handlers: next, changed };
}
