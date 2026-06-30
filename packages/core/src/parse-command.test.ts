import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
	extractCommandArgNames,
	hasCommandArgPlaceholders,
	matchCommandPattern,
	parseCommand,
	parseCommandMessage
} from './parse-command.ts';

describe('parseCommand', () => {
	it('extracts the first token after the prefix', () => {
		assert.equal(parseCommand('!setalias CoolUser'), 'setalias');
		assert.equal(parseCommand('!hello'), 'hello');
		assert.equal(parseCommand('hello world', '!'), null);
	});

	it('remains backward compatible for multi-word messages', () => {
		assert.equal(parseCommand('!say hello world'), 'say');
	});
});

describe('parseCommandMessage', () => {
	it('returns tokens and remainder for command messages', () => {
		assert.deepEqual(parseCommandMessage('!setalias CoolUser'), {
			isCommand: true,
			command: 'setalias',
			tokens: ['setalias', 'CoolUser'],
			remainder: 'setalias CoolUser'
		});
	});
});

describe('matchCommandPattern', () => {
	it('matches simple commands without extra tokens', () => {
		assert.deepEqual(matchCommandPattern('setalias', '!setalias'), {
			command: 'setalias',
			args: {}
		});
		assert.equal(matchCommandPattern('setalias', '!setalias CoolUser'), null);
	});

	it('matches a single required argument', () => {
		assert.deepEqual(matchCommandPattern('setalias <target>', '!setalias CoolUser'), {
			command: 'setalias',
			args: { target: 'CoolUser' }
		});
		assert.equal(matchCommandPattern('setalias <target>', '!setalias'), null);
	});

	it('captures the last argument greedily', () => {
		assert.deepEqual(matchCommandPattern('say <message>', '!say hello world'), {
			command: 'say',
			args: { message: 'hello world' }
		});
	});

	it('matches multiple positional arguments', () => {
		assert.deepEqual(matchCommandPattern('give <user> <amount>', '!give John 100'), {
			command: 'give',
			args: { user: 'John', amount: '100' }
		});
	});

	it('is case-insensitive for literals', () => {
		assert.deepEqual(matchCommandPattern('SetAlias <target>', '!setalias CoolUser'), {
			command: 'setalias',
			args: { target: 'CoolUser' }
		});
	});

	it('respects a custom prefix', () => {
		assert.deepEqual(matchCommandPattern('hello', '?hello', '?'), {
			command: 'hello',
			args: {}
		});
	});
});

describe('pattern helpers', () => {
	it('detects placeholders', () => {
		assert.equal(hasCommandArgPlaceholders('setalias <target>'), true);
		assert.equal(hasCommandArgPlaceholders('setalias'), false);
	});

	it('extracts argument names', () => {
		assert.deepEqual(extractCommandArgNames('give <user> <amount>'), ['user', 'amount']);
	});
});
