import { PUBLIC_POCKETBASE_URL } from '$app/env/public';

type FileRecord = {
	collectionId?: string;
	id?: string;
	file: string;
};

export function pocketbaseFileUrl(record: FileRecord): string {
	if (!record.id || !record.file) {
		throw new Error('File record is missing id or filename');
	}

	const collectionId = record.collectionId ?? 'pbc_5829103848';
	const base = PUBLIC_POCKETBASE_URL.replace(/\/$/, '');

	return `${base}/api/files/${collectionId}/${record.id}/${record.file}`;
}
