import type { WsConnectionStateContext, WsMessageContext } from '../contexts';

export function createTestMessageContext(): WsMessageContext {
	return {
		connectionId: 'test-connection',
		connectionName: 'Test Connection',
		url: 'ws://localhost:8080',
		message: JSON.stringify({ event: 'alert', data: { type: 'follow' } }),
		isJson: true,
		data: { event: 'alert', data: { type: 'follow' } }
	};
}

export function createTestConnectionStateContext(): WsConnectionStateContext {
	return {
		connectionId: 'test-connection',
		connectionName: 'Test Connection',
		url: 'ws://localhost:8080'
	};
}
