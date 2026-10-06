import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../get-field-value';

/** Extra time on top of the configured duration before the action aborts the delay. */
const TIMEOUT_MARGIN_MS = 5_000;

/** Resolves after `ms`; `false` when `signal` aborted first (the action was stopped). */
function delay(ms: number, signal?: AbortSignal): Promise<boolean> {
	return new Promise((resolve) => {
		if (signal?.aborted) {
			resolve(false);
			return;
		}

		const onAbort = (): void => {
			clearTimeout(timer);
			resolve(false);
		};
		const timer = setTimeout(() => {
			signal?.removeEventListener('abort', onAbort);
			resolve(true);
		}, ms);
		signal?.addEventListener('abort', onAbort, { once: true });
	});
}

function readDurationMs(fields: Parameters<typeof getFieldValue>[0]): number | null {
	const durationText = getFieldValue(fields, 'duration-ms');
	const duration = Number(typeof durationText === 'string' ? durationText : '0');

	return Number.isFinite(duration) && duration >= 0 ? Math.round(duration) : null;
}

export const createDelayHandler = () =>
	({
		name: 'Delay',
		fields: [
			{
				type: 'text',
				name: 'Duration (ms)',
				placeholder: '1000',
				defaultValue: '1000',
				required: true
			}
		],
		timeout: (handler) => (readDurationMs(handler.fields) ?? 0) + TIMEOUT_MARGIN_MS,
		execute: async (_action, handler, context, next) => {
			const duration = readDurationMs(handler.fields);

			if (duration === null) {
				return;
			}

			if (await delay(duration, context.signal)) {
				next();
			}
		}
	}) satisfies HandlerDefinitionProps;
