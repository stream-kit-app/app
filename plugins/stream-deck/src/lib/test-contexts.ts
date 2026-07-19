import type { StreamDeckEventContext, StreamDeckEventType } from '../contexts';

export function createTestEventContext(type: StreamDeckEventType): StreamDeckEventContext {
	return {
		type,
		context: 'test-context',
		device: 'test-device',
		action: 'app.stream-kit.streamdeck.run-action',
		alias: 'test-button',
		coordinates: { column: 0, row: 0 },
		settings: {},
		isInMultiAction: false,
		ticks: type === 'dialRotate' ? 1 : undefined,
		pressed: type === 'dialRotate' ? false : undefined,
		lastEventAt: new Date().toISOString()
	};
}
