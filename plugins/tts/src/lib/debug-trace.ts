/** TEMPORARY diagnostics, written by the app to AppData/logs/debug-trace.log. */
export function trace(message: string, data?: unknown): void {
	(globalThis as { __streamKitTrace?: (scope: string, message: string, data?: unknown) => void })
		.__streamKitTrace?.('tts', message, data);
}
