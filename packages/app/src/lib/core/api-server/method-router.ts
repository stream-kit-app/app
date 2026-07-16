import type { ApiMethodContext, ApiMethodHandler } from './types';

export class ApiMethodRouter {
	private readonly methods = new Map<string, ApiMethodHandler>();
	private readonly ownerByMethod = new Map<string, string>();

	register(name: string, handler: ApiMethodHandler, ownerPluginKey?: string): void {
		const method = name.trim();
		if (!method) {
			throw new Error('API method name is required');
		}

		this.methods.set(method, handler);
		if (ownerPluginKey) {
			this.ownerByMethod.set(method, ownerPluginKey);
		} else {
			this.ownerByMethod.delete(method);
		}
	}

	unregister(name: string): void {
		this.methods.delete(name);
		this.ownerByMethod.delete(name);
	}

	unregisterByOwner(ownerPluginKey: string): void {
		for (const [method, owner] of this.ownerByMethod) {
			if (owner !== ownerPluginKey) {
				continue;
			}

			this.methods.delete(method);
			this.ownerByMethod.delete(method);
		}
	}

	has(name: string): boolean {
		return this.methods.has(name);
	}

	listMethods(): string[] {
		return [...this.methods.keys()].sort();
	}

	async invoke(name: string, params: unknown, context: ApiMethodContext): Promise<unknown> {
		const handler = this.methods.get(name);

		if (!handler) {
			const error = new Error(`Unknown method: ${name}`);
			(error as Error & { code?: string }).code = 'not_found';
			throw error;
		}

		return handler(params ?? {}, context);
	}
}

export function asRecord(params: unknown): Record<string, unknown> {
	if (params && typeof params === 'object' && !Array.isArray(params)) {
		return params as Record<string, unknown>;
	}

	return {};
}

export function requireString(params: Record<string, unknown>, key: string): string {
	const value = params[key];
	if (typeof value !== 'string' || !value.trim()) {
		throw Object.assign(new Error(`Missing or invalid string param: ${key}`), {
			code: 'invalid_params'
		});
	}

	return value;
}

export function requireNumber(params: Record<string, unknown>, key: string): number {
	const value = params[key];
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		throw Object.assign(new Error(`Missing or invalid number param: ${key}`), {
			code: 'invalid_params'
		});
	}

	return value;
}

export function optionalString(params: Record<string, unknown>, key: string): string | undefined {
	const value = params[key];
	if (value === undefined || value === null) {
		return undefined;
	}

	if (typeof value !== 'string') {
		throw Object.assign(new Error(`Invalid string param: ${key}`), {
			code: 'invalid_params'
		});
	}

	return value;
}
