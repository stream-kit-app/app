/** @type {Record<string, string>} */
export const VARIABLE_DESCRIPTIONS = {
	user: 'Display name of the user who triggered the event.',
	userId: 'Platform user ID of the chatter or actor.',
	username: 'Login name of the user (lowercase on Twitch).',
	message: 'Full message text from the event.',
	role: 'Role of the user (for example everyone, mod, broadcaster, vip, subscriber).',
	msg: 'Structured chat message object (JSON) with badges, emotes, flags, and metadata.',
	raw: 'Raw platform chat message object (JSON).',
	channel: 'Channel login or display name where the event occurred.',
	broadcasterId: 'Broadcaster channel ID for the connected account.',
	channelId: 'YouTube channel ID for the connected account.',
	liveChatId: 'YouTube live chat ID for the active broadcast.',
	broadcastId: 'YouTube broadcast (stream) ID.',
	command: 'Parsed command name without prefix (for example `test` from `!test`).',
	args: 'Parsed command arguments as key-value pairs (JSON object).',
	bits: 'Number of bits cheered with the message.',
	rewardId: 'Channel point reward ID tied to the redemption.',
	amount: 'Numeric amount for the event (bits, points awarded, Super Chat value, etc.).',
	amountMicros: 'Super Chat amount in micro-units of the currency.',
	currency: 'ISO currency code for a Super Chat (for example USD, EUR).',
	tier: 'Subscription or Super Chat tier level.',
	months: 'Cumulative subscription month count for resubs.',
	giftCount: 'Number of gifted subscriptions in the event.',
	viewers: 'Number of viewers in an incoming raid.',
	duration: 'Timeout or ban duration in seconds, when applicable.',
	title: 'Current stream title after a channel update.',
	game: 'Current game or category name after a channel update.',
	gameId: 'Category/game ID after a channel update.',
	streamId: 'Unique stream session ID when the event fired.',
	shortcut: 'Full hotkey shortcut (for example `Shift+P`).',
	modifiers: 'Modifier keys pressed (array).',
	key: 'Key pressed without modifiers, or collection entry key on collection triggers.',
	queueId: 'Internal ID of the action queue.',
	queueName: 'Display name of the action queue.',
	pending: 'Number of jobs waiting in the queue.',
	active: 'Number of jobs currently running in the queue.',
	paused: 'Whether the queue is paused (`true` or `false`).',
	job: 'Current queue job details (action name, job ID) when applicable.',
	event: 'Lifecycle or queue event name.',
	timestamp: 'ISO timestamp when the event fired.',
	firedAt: 'ISO timestamp when the schedule fired.',
	scheduledAt: 'ISO timestamp when the event was scheduled.',
	cronExpression: 'Cron expression for recurring schedules.',
	date: 'Scheduled date (`YYYY-MM-DD`) for one-shot schedules.',
	time: 'Scheduled time (`HH:mm`) for one-shot schedules.',
	repeat: 'Repeat mode for scheduled triggers (`once`, `daily`, `weekly`).',
	weekday: 'Weekday used by weekly schedules.',
	executable: 'Process executable file name.',
	fullPath: 'Full filesystem path to the process executable.',
	name: 'Process or collection name from the event.',
	path: 'Directory path of the process executable.',
	processId: 'Operating-system process ID.',
	parentProcessId: 'Parent process ID, when available.',
	collectionName: 'Name of the collection that changed.',
	lifetime: 'Collection lifetime (`session` or `persistent`).',
	value: 'New collection value after the change.',
	previousValue: 'Previous collection value before the change.',
	changeType: 'Type of collection mutation (`set`, `update`, `delete`, `clear`).',
	sceneName: 'OBS program or preview scene name.',
	sceneUuid: 'OBS scene UUID.',
	inputName: 'OBS input (source) name.',
	inputUuid: 'OBS input UUID.',
	sourceName: 'OBS source name (alias for input on filter events).',
	filterName: 'OBS filter name.',
	filterEnabled: 'Whether the OBS filter is enabled.',
	transitionName: 'OBS transition name.',
	transitionUuid: 'OBS transition UUID.',
	outputState: 'OBS output state string (stream/recording).',
	outputActive: 'Whether the OBS output is active.',
	outputPath: 'File path for recording or replay output.',
	newOutputPath: 'New recording file path after a file change.',
	mediaAction: 'OBS media action type (play, pause, stop, restart, next, previous).',
	mediaState: 'OBS media playback state.',
	mediaDuration: 'Media duration in milliseconds.',
	mediaCursor: 'Current media playback position in milliseconds.',
	connectionId: 'Configured WebSocket connection ID.',
	connectionName: 'Display name of the WebSocket connection.',
	url: 'WebSocket server URL.',
	isJson: 'Whether the received payload parsed as JSON.',
	data: 'Parsed JSON payload from the WebSocket message.',
	affectedConnectionIds: 'Connection IDs affected by a broadcast event.',
	overlayId: 'ID of the overlay that received the event.',
	payload: 'Extra event payload object (overlay events, Stream Deck settings extras, etc.).',
	stickerId: 'Super Sticker ID from YouTube.',
	memberLevelName: 'YouTube membership level name.',
	memberMonth: 'Member milestone month count.',
	isUpgrade: 'Whether the membership event is an upgrade.',
	gifterChannelId: 'Channel ID of the user who gifted the membership.',
	giftName: 'Name of the gifted item (for example jewel type).',
	jewelsAmount: 'Number of YouTube jewels gifted.',
	banType: 'Ban type (`permanent` or `temporary`).',
	moderator: 'Moderator who performed the action.',
	deletedMessageId: 'ID of the deleted chat message.',
	question: 'Poll question text.',
	status: 'Poll status (`unknown`, `active`, `closed`).',
	mediaFilePath: 'Resolved filesystem path after Set Media Input File runs.',
	source: 'Event source (platform such as `twitch`/`youtube`, or rankings source such as `watch-time`/`manual`).',
	kind: 'Schedule kind (`cron` or `scheduled`).',
	messageId: 'Platform message ID for the chat message.',
	totalPoints: 'User total points after the rankings event.',
	watchTimeSeconds: 'Accumulated watch time in seconds for the user.',
	previousRank: 'Rank record before the change (JSON), when applicable.',
	currentRank: 'Rank record after the change (JSON), when applicable.',
	previousTier: 'Tier record before the change (JSON), when applicable.',
	currentTier: 'Tier record after the change (JSON), when applicable.',
	platform: 'Platform key for the user (`twitch`, `youtube`, …).',
	type: 'Stream Deck event type (`keyDown`, `keyUp`, `dialRotate`, …).',
	device: 'Stream Deck device identifier.',
	action: 'Stream Deck action UUID that fired the event.',
	alias: 'Optional button alias configured in Stream Kit.',
	coordinates: 'Button coordinates on the Stream Deck (`column`, `row`).',
	settings: 'Action settings object from the Stream Deck button.',
	isInMultiAction: 'Whether the button is part of a multi-action.',
	ticks: 'Dial rotation ticks (dial events only).',
	pressed: 'Whether the dial was pressed while rotating.',
	lastEventAt: 'ISO timestamp of the latest Stream Deck event.',
	context: 'Stream Deck action instance context id.'
};

/** @param {string} fnName @param {string} key @param {string} name */
export function describeCondition(fnName, key, name) {
	const byKey = CONDITION_BY_KEY[key];
	if (byKey) return byKey;

	switch (fnName) {
		case 'messageMatchCondition':
			if (key === 'command') {
				return 'Match chat commands (supports `<arg>` placeholders). Leave empty to match all messages.';
			}
			if (key === 'parentMessage') {
				return 'Match the text of the message being replied to.';
			}
			if (name === 'Message') {
				return 'Match raw message text (starts with, ends with, contains, equals). Leave empty to always match.';
			}
			return `Match **${name}** text. Leave empty to always match.`;

		case 'userMatchCondition':
			if (key === 'parentUser') {
				return 'Match the username of the parent message in a reply thread.';
			}
			return 'Match chatter username (equals, contains, starts with, ends with). Leave empty to always match.';

		case 'roleCondition':
			return 'Only fire for users with the selected role (mod, broadcaster, VIP, subscriber, artist, founder).';

		case 'flagCondition':
			return `Only fire when **${name}** is enabled on the message (checkbox).`;

		case 'minNumberCondition':
			return MIN_NUMBER_DESCRIPTIONS[key] ?? `Minimum numeric value for **${name}**. Leave empty to disable.`;

		case 'rewardSelectCondition':
			return 'Restrict to a specific channel point reward. Leave empty to match any reward.';

		case 'connectionSelectCondition':
			return 'Restrict to one configured WebSocket connection. Leave empty to match any connection.';

		case 'jsonFieldCondition':
			return 'Match a dot-path inside JSON payloads (for example `data.topic` equals `game.lobby.joined`). Empty path always matches.';

		case 'subTierCondition':
			return 'Restrict to a subscription tier (Tier 1, Tier 2, Tier 3, or Prime).';

		case 'hotkeyCondition':
			return 'Keyboard shortcut that fires the trigger (configured in the trigger condition).';

		case 'queueFilterCondition':
			return 'Restrict to a specific action queue. Leave empty to match any queue.';

		case 'sceneMatchCondition':
			return 'Match OBS scene name (starts with, ends with, contains, equals). Leave empty to match any scene.';

		case 'inputMatchCondition':
			return 'Match OBS input/source name. Leave empty to match any input.';

		case 'filterMatchCondition':
			return 'Match OBS filter name on the selected input. Leave empty to match any filter.';

		case 'transitionMatchCondition':
			return 'Match OBS transition name. Leave empty to match any transition.';

		case 'mediaActionMatchCondition':
			return 'Match OBS media action type (play, pause, stop, restart, next, previous).';

		case 'collectionNameCondition':
			return 'Restrict to a specific collection name. Leave empty to match any collection.';

		case 'collectionLifetimeCondition':
			return 'Restrict to collections with a specific lifetime (`session` or `persistent`).';

		case 'cronExpressionCondition':
			return 'Cron expression that must match for the trigger to fire.';

		default:
			return `Filter on **${name}**. Configure in the trigger condition editor.`;
	}
}

/** @type {Record<string, string>} */
const CONDITION_BY_KEY = {
	match: 'Match message text (starts with, ends with, contains, equals). Leave empty to always match.',
	command: 'Match chat commands (supports `<arg>` placeholders). Leave empty to match all messages.',
	parentMessage: 'Match the text of the message being replied to.',
	parentUser: 'Match the username of the parent message in a reply thread.',
	'json-field': 'Match a field inside JSON using a dot-path and text operator.',
	'input-name': 'Match OBS input/source name. Leave empty to match any input.',
	'filter-name': 'Match OBS filter name. Leave empty to match any filter.'
};

/** @type {Record<string, string>} */
const MIN_NUMBER_DESCRIPTIONS = {
	minBits: 'Minimum bit cheer amount required on the message.',
	minAmount: 'Minimum hype chat amount (localized currency).',
	minHypeLevel: 'Minimum hype chat level (1–4).',
	minJewels: 'Minimum number of YouTube jewels in the gift event.',
	minTier: 'Minimum Super Sticker tier.',
	giftCount: 'Minimum number of gifted subscriptions.',
	viewers: 'Minimum number of raiding viewers.',
	duration: 'Minimum timeout/ban duration in seconds.'
};

/** @param {string} type */
function simplifyType(type) {
	return type.replace(/\s+/g, ' ').replace(/import\([^)]+\)\./, '').trim();
}

/** @param {string} raw */
function formatSample(raw) {
	const trimmed = raw.trim();
	if (/^['"`]/.test(trimmed)) {
		return trimmed.replace(/^['"`]|['"`]$/g, '');
	}
	if (trimmed === 'true' || trimmed === 'false') return trimmed;
	if (/^\d+$/.test(trimmed)) return trimmed;
	if (trimmed.startsWith('[') || trimmed.startsWith('{')) return 'object';
	return '';
}

/** @param {string} type */
export function simplifyVariableType(type) {
	if (!type) return undefined;
	const simplified = simplifyType(type);
	if (/\bstring\b/i.test(simplified)) return 'string';
	if (/\bnumber\b/i.test(simplified)) return 'number';
	if (/\bboolean\b/i.test(simplified)) return 'boolean';
	if (/\[\]|Array</.test(simplified)) return 'array';
	if (/Record<|\{/.test(simplified)) return 'object';
	if (/^[A-Z]\w+$/.test(simplified)) return 'object';
	return simplified.length > 28 ? `${simplified.slice(0, 28)}…` : simplified;
}

/** @param {string} raw */
export function formatVariableExample(raw) {
	const sample = formatSample(raw);
	if (sample) return sample;
	const trimmed = raw?.trim();
	if (!trimmed || trimmed.startsWith('[') || trimmed.startsWith('{')) return undefined;
	return trimmed;
}

/** @param {string} varName */
function humanizeVariableName(varName) {
	const spaced = varName
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[_-]+/g, ' ')
		.trim();
	return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : varName;
}

/**
 * @param {string} varName
 * @param {{ label?: string, type?: string }} meta
 */
export function variableDescription(varName, meta = {}) {
	if (VARIABLE_DESCRIPTIONS[varName]) return VARIABLE_DESCRIPTIONS[varName];
	if (meta.label) return meta.label.endsWith('.') ? meta.label : `${meta.label}.`;
	const label = humanizeVariableName(varName);
	if (meta.type) {
		return `${label} (${simplifyType(meta.type)}).`;
	}
	return `${label}.`;
}

/**
 * @param {string} varName
 * @param {{ label?: string, type?: string, sample?: string }} meta
 */
export function describeVariable(varName, meta = {}) {
	const base = variableDescription(varName, meta);
	if (meta.sample) {
		const example = formatVariableExample(meta.sample);
		return example ? `${base} Example: \`${example}\`.` : base;
	}
	if (meta.type && !VARIABLE_DESCRIPTIONS[varName] && !meta.label) {
		return `${varName} (${simplifyType(meta.type)}).`;
	}
	return base;
}

/** @param {string} type @param {string | undefined} placeholder */
export function describeField(type, placeholder) {
	if (placeholder?.trim()) {
		return placeholder.trim();
	}

	switch (type) {
		case 'text':
			return 'Text value. Supports variable interpolation.';
		case 'select':
			return 'Choose one option from the list.';
		case 'combobox':
			return 'Pick from suggestions or enter a custom value.';
		case 'checkbox':
		case 'switch':
			return 'Enable or disable this option.';
		case 'code':
			return 'Code or script body.';
		case 'json':
			return 'JSON template. Supports variable interpolation.';
		case 'one-of':
			return 'Choose between a JSON template or passing a single variable through.';
		case 'key-value-list':
			return 'Key-value pairs.';
		default:
			return '—';
	}
}
