/** PocketBase-compatible record id: 15 chars of [a-z0-9]. */
const SYNC_ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function createSyncId(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	let id = '';
	for (const byte of bytes) {
		id += SYNC_ID_ALPHABET[byte % SYNC_ID_ALPHABET.length];
	}
	return id;
}

export function isSyncId(value: unknown): value is string {
	return typeof value === 'string' && /^[a-z0-9]{15}$/.test(value);
}
