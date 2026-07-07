export type OverlayMessageContext = {
	overlayId: string;
	event: string;
	payload: unknown;
	/** JSON string of `payload`. */
	message: string;
	timestamp: number;
};

export function createTestOverlayMessageContext(): OverlayMessageContext {
	const payload = { ok: true, source: 'test' };

	return {
		overlayId: 'test-overlay',
		event: 'test:ping',
		payload,
		message: JSON.stringify(payload),
		timestamp: Date.now()
	};
}
