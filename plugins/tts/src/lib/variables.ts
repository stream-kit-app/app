import type { HandlerFieldVariable } from '@stream-kit/plugin';

export const USERNAME_VARIABLE: HandlerFieldVariable = {
	key: 'username',
	label: 'Username'
};

export const MESSAGE_VARIABLE: HandlerFieldVariable = {
	key: 'message',
	label: 'Trigger message'
};

export const CHANNEL_VARIABLE: HandlerFieldVariable = {
	key: 'channel',
	label: 'Channel'
};

export const TTS_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	MESSAGE_VARIABLE,
	CHANNEL_VARIABLE
];

export function contextToVariables(context: unknown): Record<string, string> {
	if (!context || typeof context !== 'object') {
		return {};
	}

	const record = context as Record<string, unknown>;
	const variables: Record<string, string> = {};

	const set = (key: string, value: unknown) => {
		if (value === undefined || value === null) {
			return;
		}

		variables[key] = String(value);
	};

	set('channel', record.channel);
	set('username', record.user);
	set('user', record.user);
	set('message', record.message);
	set('command', record.command);
	set('input', record.input);

	return variables;
}
