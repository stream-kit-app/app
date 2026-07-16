export const DEFAULT_API_SERVER_PORT = 7892;

export type ApiServerBind = '127.0.0.1' | '0.0.0.0';

export type ApiServerSettings = {
	enabled: boolean;
	port: number;
	bind: ApiServerBind;
	token: string;
};

export type ApiServerStatus = {
	running: boolean;
	port: number;
	bind: string;
	baseUrl: string;
	wsUrl: string;
};

export type ApiRequestFrame = {
	id: string;
	type: 'request';
	method: string;
	params?: unknown;
};

export type ApiResponseFrame = {
	id: string;
	type: 'response';
	ok: boolean;
	result?: unknown;
	error?: {
		code: string;
		message: string;
	};
};

export type ApiEventFrame = {
	type: 'event';
	event: string;
	payload?: unknown;
};

export type ApiIncomingRequest = {
	clientId: string;
	raw: string;
	timestamp: number;
};

export type ApiClientLifecycleEvent = {
	clientId: string;
	event: string;
	timestamp: number;
};

export type ApiMethodHandler = (params: unknown, context: ApiMethodContext) => unknown | Promise<unknown>;

export type ApiMethodContext = {
	clientId: string;
};

export function createDefaultApiServerSettings(): ApiServerSettings {
	return {
		enabled: false,
		port: DEFAULT_API_SERVER_PORT,
		bind: '127.0.0.1',
		token: ''
	};
}

export function generateApiServerToken(): string {
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
