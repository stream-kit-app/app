import type { OverlayManifest, OverlayProjectFile } from '../types';
import type { OverlayWidgetTemplate } from './types';

import {
	layoutSettingsSection,
	mergeStyleFields,
	styleSettingsSection,
	twitchToOverlayPreset,
	WIDGET_BASE_CSS,
	WIDGET_STYLE_RUNTIME_JS,
	widgetRuntimeJs
} from './shared';

function chatboxHtml(): string {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Chatbox</title>
		<style>
			${WIDGET_BASE_CSS}

			#root {
				width: min(420px, 92vw);
				max-height: 80vh;
			}

			#messages {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				gap: var(--message-gap, 8px);
				overflow: hidden;
			}

			.msg {
				max-width: 100%;
				padding: var(--bubble-padding, 10px);
				border-radius: var(--radius, 12px);
				background: var(--bg, rgba(15, 23, 42, 0.72));
				border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
				box-shadow: var(--shadow, none);
				font-size: var(--font-size, 18px);
				font-weight: var(--font-weight, 400);
				line-height: 1.35;
				color: var(--text-color, #f8fafc);
				text-align: var(--text-align, left);
				word-break: break-word;
				opacity: 1;
				transition: opacity 400ms ease;
			}

			.msg.fading {
				opacity: 0;
			}

			.user {
				font-weight: 700;
				margin-right: 0.4rem;
				color: var(--username-color, var(--accent, #38bdf8));
			}

			.user.hidden {
				display: none;
			}
		</style>
	</head>
	<body>
		<div id="root">
			<div id="messages"></div>
		</div>
		<script src="./app.js"></script>
	</body>
</html>
`;
}

function chatboxJs(overlayId: string): string {
	const handlers = `{
	'overlay:settings': function (payload) {
		applySettings(payload || {});
	},
	message: function (payload) {
		addMessage(payload || {});
	},
	clear: function () {
		listEl.innerHTML = '';
	}
}`;

	return `${WIDGET_STYLE_RUNTIME_JS}

let settings = {
	maxMessages: 8,
	fontFamily: 'system',
	fontSize: 18,
	fontWeight: '400',
	textColor: '#f8fafc',
	accentColor: '#38bdf8',
	backgroundColor: '#0f172a',
	backgroundOpacity: 0.72,
	borderColor: '#94a3b8',
	borderOpacity: 0.25,
	borderRadius: 12,
	padding: 10,
	textAlign: 'left',
	shadow: false,
	alignX: 'left',
	alignY: 'bottom',
	offsetX: 24,
	offsetY: 24,
	showUserColor: true,
	showUsername: true,
	usernameColor: '#38bdf8',
	messageGap: 8,
	bubblePadding: 10,
	fadeOutSeconds: 0
};

const rootEl = document.getElementById('root');
const listEl = document.getElementById('messages');

function applySettings(payload) {
	settings = Object.assign({}, settings, payload);
	applyStyleCssVars(settings);
	applyLayoutToRoot(rootEl, settings);
	document.documentElement.style.setProperty(
		'--message-gap',
		Number(settings.messageGap ?? 8) + 'px'
	);
	document.documentElement.style.setProperty(
		'--bubble-padding',
		Number(settings.bubblePadding ?? settings.padding ?? 10) + 'px'
	);
	document.documentElement.style.setProperty(
		'--username-color',
		settings.usernameColor || settings.accentColor || '#38bdf8'
	);
}

function addMessage(payload) {
	var el = document.createElement('div');
	el.className = 'msg';

	var user = document.createElement('span');
	user.className = 'user';
	if (settings.showUsername === false) {
		user.classList.add('hidden');
	}
	user.textContent = (payload.user || payload.username || 'User') + ':';
	if (settings.showUserColor && payload.color) {
		user.style.color = payload.color;
	}

	var text = document.createElement('span');
	text.textContent = payload.text || payload.message || '';

	el.appendChild(user);
	el.appendChild(text);
	listEl.appendChild(el);

	while (listEl.children.length > Math.max(1, Number(settings.maxMessages) || 8)) {
		listEl.removeChild(listEl.firstChild);
	}

	var fadeSeconds = Number(settings.fadeOutSeconds) || 0;
	if (fadeSeconds > 0) {
		setTimeout(function () {
			el.classList.add('fading');
			setTimeout(function () {
				if (el.parentNode === listEl) {
					listEl.removeChild(el);
				}
			}, 420);
		}, fadeSeconds * 1000);
	}
}

applySettings({});

${widgetRuntimeJs(overlayId, handlers)}
`;
}

function createChatboxManifest(overlayId: string, name: string): OverlayManifest {
	return {
		id: overlayId,
		name,
		framework: 'vanilla',
		version: 2,
		expectedEvents: ['message', 'clear'],
		requiredPlugins: ['twitch'],
		settings: [
			{
				type: 'section',
				title: 'Behavior',
				fields: [
					{
						type: 'slider',
						key: 'maxMessages',
						name: 'Max messages',
						min: 1,
						max: 30,
						step: 1,
						defaultValue: 8,
						unit: ''
					},
					{
						type: 'slider',
						key: 'fadeOutSeconds',
						name: 'Fade out (0 = never)',
						min: 0,
						max: 60,
						step: 1,
						defaultValue: 0,
						unit: 's'
					},
					{
						type: 'switch',
						key: 'showUsername',
						name: 'Show username',
						defaultValue: true
					},
					{
						type: 'switch',
						key: 'showUserColor',
						name: 'Use chat user color',
						defaultValue: true
					},
					{
						type: 'color',
						key: 'usernameColor',
						name: 'Username fallback color',
						defaultValue: '#38bdf8'
					},
					{
						type: 'slider',
						key: 'messageGap',
						name: 'Message gap',
						min: 0,
						max: 24,
						step: 1,
						defaultValue: 8,
						unit: 'px'
					},
					{
						type: 'slider',
						key: 'bubblePadding',
						name: 'Bubble padding',
						min: 0,
						max: 32,
						step: 1,
						defaultValue: 10,
						unit: 'px'
					}
				]
			},
			mergeStyleFields(
				styleSettingsSection({
					fontSize: 18,
					fontWeight: '400',
					padding: 10,
					borderRadius: 12,
					backgroundOpacity: 0.72,
					textAlign: 'left',
					shadow: false
				}),
				[]
			),
			layoutSettingsSection({ alignX: 'left', alignY: 'bottom', offsetX: 24, offsetY: 24 })
		],
		testHandlers: [
			{
				label: 'Sample message',
				event: 'message',
				payload: { user: 'Viewer', text: 'Hello from Stream Kit!', color: '#38bdf8' }
			},
			{ label: 'Clear', event: 'clear', payload: {} }
		],
		actions: [
			twitchToOverlayPreset(
				'chat-message',
				'Chat message → Chatbox',
				'twitch:twitch:chat:chat-message',
				'message',
				'{"user":"{user}","text":"{message}"}'
			)
		]
	};
}

export const chatboxWidget: OverlayWidgetTemplate = {
	id: 'chatbox',
	name: 'Chatbox',
	description: 'Live chat messages for your OBS browser source.',
	icon: 'ri:chat-3-line',
	defaultName: 'Chatbox',
	buildFiles: (overlayId): OverlayProjectFile[] => [
		{ path: 'dist/index.html', content: chatboxHtml() },
		{ path: 'dist/app.js', content: chatboxJs(overlayId) }
	],
	createManifest: createChatboxManifest
};
