import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { validateCommandForm } from '../app/lib/validate-form.ts';
import { getOwnedCommandIds } from './owned-command-ids.ts';

describe('validateCommandForm', () => {
	const translate = (key: string) => key;

	it('requires a name', () => {
		const errors = validateCommandForm(
			{
				name: '',
				commandNames: ['ping'],
				handlersCount: 1,
				sources: ['twitch']
			},
			translate
		);

		assert.equal(errors?.name, 'Name is required');
	});

	it('requires at least one handler', () => {
		const errors = validateCommandForm(
			{
				name: 'Ping',
				commandNames: ['ping'],
				handlersCount: 0,
				sources: ['twitch']
			},
			translate
		);

		assert.equal(errors?.handlers, 'Add at least one handler');
	});
});

describe('getOwnedCommandIds', () => {
	it('returns only commands owned by the plugin', () => {
		const ids = getOwnedCommandIds(
			[
				{ id: 'a', ownerPluginKey: 'plugin-a' },
				{ id: 'b', ownerPluginKey: 'plugin-b' },
				{ id: 'c' }
			],
			'plugin-a'
		);

		assert.deepEqual(ids, ['a']);
	});
});
