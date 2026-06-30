export type CommandMatch = {
	command: string;
	args: Record<string, string>;
};

export type ParsedCommandMessage = {
	isCommand: boolean;
	command: string | null;
	tokens: string[];
	remainder: string;
};

export const RESERVED_COMMAND_ARG_NAMES = new Set([
	'user',
	'username',
	'userid',
	'message',
	'role',
	'command',
	'channel',
	'channelid',
	'broadcasterid',
	'livechatid',
	'messageid',
	'source',
	'args',
	'amount',
	'tier',
	'title',
	'broadcastid'
]);

const ARG_PLACEHOLDER_PATTERN = /^<([a-zA-Z_][a-zA-Z0-9_]*)>$/;

type PatternToken = { type: 'literal'; value: string } | { type: 'arg'; name: string };

function normalizePattern(pattern: string): string {
	return pattern.trim().replace(/^!+/, '');
}

function tokenizePattern(pattern: string): PatternToken[] {
	const normalized = normalizePattern(pattern);

	if (!normalized) {
		return [];
	}

	return normalized.split(/\s+/).map((part) => {
		const argMatch = part.match(ARG_PLACEHOLDER_PATTERN);

		if (argMatch) {
			return { type: 'arg' as const, name: argMatch[1] };
		}

		return { type: 'literal' as const, value: part };
	});
}

function getMessageBody(message: string, prefix: string): string | null {
	const normalizedPrefix = prefix.trim();

	if (!normalizedPrefix || !message.startsWith(normalizedPrefix)) {
		return null;
	}

	return message.slice(normalizedPrefix.length).trim();
}

export function hasCommandArgPlaceholders(pattern: string): boolean {
	return /<[a-zA-Z_][a-zA-Z0-9_]*>/.test(pattern);
}

export function extractCommandArgNames(pattern: string): string[] {
	return tokenizePattern(pattern)
		.filter((token): token is { type: 'arg'; name: string } => token.type === 'arg')
		.map((token) => token.name);
}

export function parseCommand(message: string, prefix = '!'): string | null {
	const parsed = parseCommandMessage(message, prefix);

	return parsed.command;
}

export function parseCommandMessage(message: string, prefix = '!'): ParsedCommandMessage {
	const body = getMessageBody(message, prefix);

	if (body === null) {
		return {
			isCommand: false,
			command: null,
			tokens: [],
			remainder: ''
		};
	}

	if (!body) {
		return {
			isCommand: false,
			command: null,
			tokens: [],
			remainder: ''
		};
	}

	const tokens = body.split(/\s+/);

	return {
		isCommand: true,
		command: tokens[0]?.toLowerCase() ?? null,
		tokens,
		remainder: body
	};
}

export function matchCommandPattern(
	pattern: string,
	message: string,
	prefix = '!'
): CommandMatch | null {
	const body = getMessageBody(message, prefix);

	if (body === null) {
		return null;
	}

	const tokens = tokenizePattern(pattern);

	if (tokens.length === 0) {
		return null;
	}

	const hasArgs = tokens.some((token) => token.type === 'arg');

	if (!hasArgs) {
		if (!body) {
			return null;
		}

		const bodyTokens = body.split(/\s+/);

		if (bodyTokens.length !== tokens.length) {
			return null;
		}

		for (let index = 0; index < tokens.length; index++) {
			const token = tokens[index];

			if (token.type !== 'literal') {
				return null;
			}

			if (token.value.toLowerCase() !== bodyTokens[index].toLowerCase()) {
				return null;
			}
		}

		const firstToken = tokens[0];

		return {
			command: firstToken.type === 'literal' ? firstToken.value.toLowerCase() : '',
			args: {}
		};
	}

	const firstToken = tokens[0];

	if (firstToken.type !== 'literal') {
		return null;
	}

	const commandName = firstToken.value;

	if (!body.toLowerCase().startsWith(commandName.toLowerCase())) {
		return null;
	}

	let remaining = body.slice(commandName.length).trimStart();
	const argTokens = tokens.slice(1);

	if (argTokens.length === 0) {
		return remaining ? null : { command: commandName.toLowerCase(), args: {} };
	}

	const args: Record<string, string> = {};

	for (let index = 0; index < argTokens.length - 1; index++) {
		const token = argTokens[index];

		if (token.type !== 'arg') {
			return null;
		}

		const spaceIndex = remaining.indexOf(' ');

		if (spaceIndex === -1) {
			return null;
		}

		const value = remaining.slice(0, spaceIndex);

		if (!value) {
			return null;
		}

		args[token.name] = value;
		remaining = remaining.slice(spaceIndex + 1).trimStart();
	}

	const lastToken = argTokens[argTokens.length - 1];

	if (lastToken.type !== 'arg' || !remaining) {
		return null;
	}

	args[lastToken.name] = remaining.trim();

	return {
		command: commandName.toLowerCase(),
		args
	};
}
