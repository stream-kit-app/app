import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { decideLww, remoteWinsLww, toLwwSide } from './lww.ts';

describe('remoteWinsLww', () => {
	it('prefers higher revision', () => {
		assert.equal(
			remoteWinsLww(
				toLwwSide({ revision: 1, clientUpdatedAt: 100, present: true }),
				toLwwSide({ revision: 2, clientUpdatedAt: 50, present: true })
			),
			true
		);
		assert.equal(
			remoteWinsLww(
				toLwwSide({ revision: 3, clientUpdatedAt: 50, present: true }),
				toLwwSide({ revision: 2, clientUpdatedAt: 100, present: true })
			),
			false
		);
	});

	it('breaks revision ties with clientUpdatedAt', () => {
		assert.equal(
			remoteWinsLww(
				toLwwSide({ revision: 2, clientUpdatedAt: 100, present: true }),
				toLwwSide({ revision: 2, clientUpdatedAt: 200, present: true })
			),
			true
		);
		assert.equal(
			remoteWinsLww(
				toLwwSide({ revision: 2, clientUpdatedAt: 200, present: true }),
				toLwwSide({ revision: 2, clientUpdatedAt: 100, present: true })
			),
			false
		);
	});

	it('when fully tied, prefers present remote over absent local', () => {
		assert.equal(
			remoteWinsLww(
				toLwwSide({ revision: 1, clientUpdatedAt: 10, present: false }),
				toLwwSide({ revision: 1, clientUpdatedAt: 10, present: true })
			),
			true
		);
		assert.equal(
			remoteWinsLww(
				toLwwSide({ revision: 1, clientUpdatedAt: 10, present: true }),
				toLwwSide({ revision: 1, clientUpdatedAt: 10, present: false })
			),
			false
		);
	});

	it('decideLww mirrors remoteWinsLww', () => {
		const local = toLwwSide({ revision: 1, clientUpdatedAt: 1, present: true });
		const remote = toLwwSide({ revision: 2, clientUpdatedAt: 1, present: true });
		assert.equal(decideLww(local, remote), 'remote');
		assert.equal(decideLww(remote, local), 'local');
	});
});
