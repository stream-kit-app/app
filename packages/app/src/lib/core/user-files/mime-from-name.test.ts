import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
	isAllowedCloudUploadName,
	mimeForCloudUpload,
	mimeFromFileName
} from './mime-from-name.ts';

describe('mimeForCloudUpload', () => {
	it('allows known media extensions', () => {
		assert.equal(mimeForCloudUpload('clip.mp4'), 'video/mp4');
		assert.equal(mimeForCloudUpload('icon.PNG'), 'image/png');
		assert.equal(mimeForCloudUpload('sound.mp3'), 'audio/mpeg');
	});

	it('rejects unknown and archive extensions', () => {
		assert.equal(mimeForCloudUpload('payload.bin'), null);
		assert.equal(mimeForCloudUpload('plugin.zip'), null);
		assert.equal(mimeForCloudUpload('noext'), null);
		assert.equal(isAllowedCloudUploadName('x.exe'), false);
	});

	it('mimeFromFileName still falls back for non-cloud uses', () => {
		assert.equal(mimeFromFileName('x.bin'), 'application/octet-stream');
	});
});
