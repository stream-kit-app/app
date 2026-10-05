/**
 * Homepage copy. Keep claims in line with `docs/` — the marketing site must not promise
 * features, platforms or pricing that the app does not have.
 */

export type Integration = { name: string; icon: string };

export const integrations: Integration[] = [
	{ name: 'Twitch', icon: 'ri:twitch-fill' },
	{ name: 'YouTube', icon: 'ri:youtube-fill' },
	{ name: 'OBS Studio', icon: 'simple-icons:obsstudio' },
	{ name: 'Discord', icon: 'ri:discord-fill' },
	{ name: 'Stream Deck', icon: 'simple-icons:elgato' },
	{ name: 'ElevenLabs', icon: 'simple-icons:elevenlabs' }
];

export type Step = { icon: string; title: string; description: string };

export const steps: Step[] = [
	{
		icon: 'ri:flashlight-line',
		title: 'Trigger',
		description:
			'Something happens: a follow, a chat command, a channel point redeem, a hotkey or a schedule.'
	},
	{
		icon: 'ri:filter-3-line',
		title: 'Conditions',
		description:
			'Optionally narrow it down: only for subscribers, only for a certain user, only when the message matches.'
	},
	{
		icon: 'ri:play-list-2-line',
		title: 'Handlers',
		description:
			'Stream Kit runs your steps in order: reply in chat, switch scenes, play a sound, show an alert.'
	}
];

export type Showcase = {
	id: string;
	label: string;
	title: string;
	description: string;
	bullets: string[];
	docsPath: string;
	mock: 'actions' | 'overlays' | 'bot' | 'dashboard';
};

export const showcases: Showcase[] = [
	{
		id: 'actions',
		label: 'Actions',
		title: 'Build automations visually',
		description:
			'An action connects one or more triggers to a chain of steps. Pick from more than a hundred triggers and handlers across Twitch, YouTube, OBS and more.',
		bullets: [
			'If/else logic, delays and variables without writing code',
			'Queues run actions one at a time, perfect for TTS and media',
			'Schedules, hotkeys and process triggers for everything off-stream'
		],
		docsPath: 'guide/actions',
		mock: 'actions'
	},
	{
		id: 'overlays',
		label: 'Overlays',
		title: 'Overlays that react to your stream',
		description:
			'Add browser sources to OBS straight from Stream Kit. Start from a ready-made widget or build your own, and drive it from your actions.',
		bullets: [
			'Alerts, chatbox, timer, counter, goal and leaderboard widgets',
			'Live style and layout settings, no CSS required',
			'Two-way: actions update overlays, overlays can trigger actions'
		],
		docsPath: 'guide/overlays',
		mock: 'overlays'
	},
	{
		id: 'bot',
		label: 'Chat bot',
		title: 'A chat bot that knows your community',
		description:
			'One bot for Twitch and YouTube at the same time. Commands, timers and moderation are built in; plugins add ranks, points and quotes.',
		bullets: [
			'Commands with aliases, cooldowns and custom roles',
			'Timers that only run while you are live and chat is active',
			'Rankings with points, tiers and watch-time rewards'
		],
		docsPath: 'plugins/bot',
		mock: 'bot'
	},
	{
		id: 'dashboard',
		label: 'Dashboard',
		title: 'Everything at a glance',
		description:
			'Arrange widgets on your dashboard to see what is happening while you stream: running actions, recent logs, collections and plugin status.',
		bullets: [
			'Drag-and-drop widgets from every plugin',
			'See which actions are running and what they did',
			'Logs that show what every action did, step by step'
		],
		docsPath: 'guide/dashboard',
		mock: 'dashboard'
	}
];

export type PluginSummary = { key: string; name: string; icon: string; description: string };

/** Official plugins — names, icons and descriptions mirror `plugins/*\/manifest.json`. */
export const officialPlugins: PluginSummary[] = [
	{
		key: 'twitch',
		name: 'Twitch',
		icon: 'ri:twitch-fill',
		description: 'Chat, EventSub, moderation, polls, predictions and channel actions.'
	},
	{
		key: 'youtube',
		name: 'YouTube',
		icon: 'ri:youtube-fill',
		description: 'Live chat, memberships, Super Chats, moderation and stream status.'
	},
	{
		key: 'obs',
		name: 'OBS',
		icon: 'simple-icons:obsstudio',
		description: 'Scenes, sources, streaming, recording, media, filters and replay buffer.'
	},
	{
		key: 'bot',
		name: 'Bot',
		icon: 'at-icons:bot',
		description: 'Chat bot with commands, timers and moderation.'
	},
	{
		key: 'tts',
		name: 'TTS',
		icon: 'ri:speak-line',
		description: 'Text-to-speech via StreamElements, ElevenLabs or local voices.'
	},
	{
		key: 'discord',
		name: 'Discord',
		icon: 'ri:discord-fill',
		description: 'Bot messages, roles and voice events.'
	},
	{
		key: 'stream-deck',
		name: 'Stream Deck',
		icon: 'ri:keyboard-box-line',
		description: 'Run actions from your Stream Deck, with live button feedback.'
	},
	{
		key: 'rankings',
		name: 'Rankings',
		icon: 'ri:trophy-line',
		description: 'Points, tiers and watch-time rewards for your viewers.'
	},
	{
		key: 'quotes',
		name: 'Quotes',
		icon: 'ri:double-quotes-l',
		description: 'Save and recall memorable chat quotes.'
	},
	{
		key: 'websocket',
		name: 'WebSocket',
		icon: 'ri:links-line',
		description: 'Persistent WebSocket connections with action triggers.'
	},
	{
		key: 'ai-actions',
		name: 'AI Actions',
		icon: 'ri:sparkling-2-line',
		description: 'Describe an action in plain language and let AI build it. Pro.'
	},
	{
		key: 'core',
		name: 'Core',
		icon: 'ri:settings-3-line',
		description: 'Variables, collections, queues, logs, hotkeys and schedules.'
	}
];

export type PowerFeature = { icon: string; title: string; description: string; docsPath: string };

export const powerFeatures: PowerFeature[] = [
	{
		icon: 'ri:code-s-slash-line',
		title: 'TypeScript scripts',
		description: 'Drop a Run script step into any action when you need full control.',
		docsPath: 'api/handlers/core/run-script'
	},
	{
		icon: 'ri:server-line',
		title: 'Local API server',
		description: 'Run actions and read variables from your own tools over WebSocket.',
		docsPath: 'developers/api-server'
	},
	{
		icon: 'ri:puzzle-2-line',
		title: 'Plugin SDK',
		description: 'Build your own triggers, handlers and settings pages.',
		docsPath: 'developers/plugin-getting-started'
	}
];

export type Plan = {
	name: string;
	tagline: string;
	features: string[];
	highlighted?: boolean;
};

export const plans: Plan[] = [
	{
		name: 'Free',
		tagline: 'Everything you need to automate your stream on one PC.',
		features: [
			'All official plugins',
			'Unlimited actions, triggers and handlers',
			'Chat bot, overlays and dashboard',
			'No account required'
		]
	},
	{
		name: 'Pro',
		tagline: 'Optional cloud features for streamers who want more.',
		features: [
			'Sync your setup across multiple PCs',
			'Cloud media library for your sounds and images',
			'Cloud overlay URLs for browser sources',
			'AI Actions: describe it, Stream Kit builds it'
		],
		highlighted: true
	}
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
	{
		question: 'Is Stream Kit free?',
		answer: 'Yes. The app and all official plugins are free to use without an account. An optional Pro plan adds cloud features: syncing your setup across PCs, a cloud media library, cloud overlay URLs and AI Actions.'
	},
	{
		question: 'Which platforms and tools does it support?',
		answer: 'Twitch and YouTube, at the same time if you like. Stream Kit also controls OBS Studio, works with Discord and Elgato Stream Deck, and speaks through StreamElements, ElevenLabs or local text-to-speech voices.'
	},
	{
		question: 'Do I need to know how to code?',
		answer: 'No. Actions, conditions and handlers are all built visually. If you do want to code, you can add a TypeScript script step to any action or build your own plugin.'
	},
	{
		question: 'How is this different from Streamer.bot?',
		answer: 'The idea is similar: triggers start actions that run a chain of steps. Stream Kit focuses on a clear, modern interface, a plugin system that keeps everything organised, built-in overlays and an optional cloud sync across PCs.'
	},
	{
		question: 'Does it run on Mac or Linux?',
		answer: 'Not at the moment. Stream Kit is a desktop app for Windows 10 and 11.'
	},
	{
		question: 'Is it ready for my stream?',
		answer: 'Stream Kit is in early access. It is actively developed and updates itself from inside the app. Expect new features often, and the occasional rough edge.'
	}
];
