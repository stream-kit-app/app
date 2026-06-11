import type { WsConnectionStateContext, WsMessageContext } from '../contexts';

export const WS_TEXT_VARIABLES = [
	{ key: 'message', label: 'Message' },
	{ key: 'connectionName', label: 'Connection name' },
	{ key: 'connectionId', label: 'Connection ID' },
	{ key: 'url', label: 'URL' }
] as const;

export function contextToVariables(context: unknown): Record<string, string> {
	const record = context as Partial<WsMessageContext & WsConnectionStateContext>;
	const variables: Record<string, string> = {};

	if (typeof record.message === 'string') {
		variables.message = record.message;
	}

	if (typeof record.connectionName === 'string') {
		variables.connectionName = record.connectionName;
	}

	if (typeof record.connectionId === 'string') {
		variables.connectionId = record.connectionId;
	}

	if (typeof record.url === 'string') {
		variables.url = record.url;
	}

	return variables;
}
