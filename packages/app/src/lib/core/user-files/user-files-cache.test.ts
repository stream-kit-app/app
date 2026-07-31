import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
	isSafeCacheRelativePath,
	normalizeManifestKey,
	parseCloudFilePath,
	sanitizeFileName,
	sanitizeRecordId
} from './user-files-cache-path.ts';

describe('sanitizeFileName', () => {
	it('keeps normal media names', () => {
		assert.equal(sanitizeFileName('clip.mp4'), 'clip.mp4');
		assert.equal(sanitizeFileName('my.file.name.mp3'), 'my.file.name.mp3');
	});

	it('collapses consecutive dots used in names', () => {
		assert.equal(sanitizeFileName('file..mp4'), 'file.mp4');
		assert.equal(sanitizeFileName('archive...bak.wav'), 'archive.bak.wav');
	});

	it('strips separators and rejects traversal-only names', () => {
		assert.equal(sanitizeFileName('../secret.mp4'), '_secret.mp4');
		assert.equal(sanitizeFileName('..'), 'file');
		assert.equal(sanitizeFileName('.'), 'file');
		assert.equal(sanitizeFileName('C:\\Videos\\clip.mp4'), 'C__Videos_clip.mp4');
	});
});

describe('isSafeCacheRelativePath', () => {
	const root = 'user-files-cache/user123';

	it('allows files under the user root', () => {
		assert.equal(isSafeCacheRelativePath(`${root}/rec1/clip.mp4`, root), true);
		assert.equal(isSafeCacheRelativePath(`${root}/rec1/file.mp4`, root), true);
	});

	it('rejects path traversal segments', () => {
		assert.equal(isSafeCacheRelativePath(`${root}/../other/x`, root), false);
		assert.equal(isSafeCacheRelativePath(`${root}/rec1/..`, root), false);
		assert.equal(isSafeCacheRelativePath('/absolute/path', root), false);
	});

	it('rejects paths outside the user root', () => {
		assert.equal(isSafeCacheRelativePath('user-files-cache/other/rec1/a.mp4', root), false);
		assert.equal(isSafeCacheRelativePath('evil.txt', root), false);
	});
});

describe('sanitizeRecordId', () => {
	it('accepts PocketBase-style ids', () => {
		assert.equal(sanitizeRecordId('wfb94498x4pg72n'), 'wfb94498x4pg72n');
		assert.equal(sanitizeRecordId('pbc_9929103852'), 'pbc_9929103852');
	});

	it('rejects separators and empty values', () => {
		assert.equal(sanitizeRecordId(''), null);
		assert.equal(sanitizeRecordId('../x'), null);
		assert.equal(sanitizeRecordId('a/b'), null);
	});
});

describe('parseCloudFilePath / normalizeManifestKey', () => {
	it('parses relative cloud file paths', () => {
		const key = normalizeManifestKey('/api/files/pbc_9929103852/wfb94498x4pg72n/dex.mp4');
		assert.equal(key, '/api/files/pbc_9929103852/wfb94498x4pg72n/dex.mp4');
		assert.deepEqual(parseCloudFilePath(key!), {
			recordId: 'wfb94498x4pg72n',
			fileName: 'dex.mp4'
		});
	});
});
