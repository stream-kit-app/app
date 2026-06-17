import type { RequestEvent } from '@sveltejs/kit';
import type { TypedPocketBase } from '$lib/pocketbase/types';

import { getRequestEvent } from '$app/server';
import { ClientResponseError } from 'pocketbase';

export type ServiceError<Code extends number, Message extends string> = {
	code: Code;
	message: Message;
	data?: unknown;
};

export class Service {
	protected readonly ctx: RequestEvent;

	constructor() {
		this.ctx = getRequestEvent();
	}

	/**
	 * Generically format an error object
	 *
	 * @param code - Give this a unique number, to reference the error
	 * @param message - A human readable message
	 * @param error - The original error, if any
	 * @returns
	 */
	error<Code extends number, Message extends string>(
		code: Code,
		message: Message,
		error?: unknown
	) {
		return {
			code,
			message,
			data:
				error instanceof ClientResponseError
					? { ...error.data }
					: error && 'data' in (error as any)
						? (error as any).data
						: undefined
		};
	}

	/**
	 * Get the PocketBase instance from the request event
	 *
	 * @returns The PocketBase instance
	 */
	protected get pocketbase(): TypedPocketBase {
		return this.ctx.locals.pocketbase;
	}
}
