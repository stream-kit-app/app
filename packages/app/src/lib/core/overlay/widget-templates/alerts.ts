import type { OverlayManifest, OverlayProjectFile } from '../types';
import type { OverlayWidgetTemplate } from './types';

import { OVERLAY_SELF_FIELD_TOKEN } from '../overlay-manifest';

import {
	layoutSettingsSection,
	mergeStyleFields,
	styleSettingsSection,
	twitchToOverlayPreset,
	WIDGET_BASE_CSS,
	WIDGET_STYLE_RUNTIME_JS,
	widgetRuntimeJs
} from './shared';

function alertsHtml(): string {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Alerts</title>
		<style>
			${WIDGET_BASE_CSS}

			#root {
				pointer-events: none;
				width: min(var(--max-width, 560px), 92vw);
			}

			#alert {
				display: none;
				width: 100%;
				padding: var(--padding, 20px);
				border-radius: var(--radius, 16px);
				background: var(--bg, rgba(15, 23, 42, 0.82));
				border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
				box-shadow: var(--shadow, 0 20px 50px rgba(0, 0, 0, 0.35));
				text-align: var(--text-align, center);
				opacity: 0;
				transform: translateY(16px) scale(0.98);
				transition: opacity 220ms ease, transform 220ms ease;
			}

			#alert.visible {
				display: block;
				opacity: 1;
				transform: translateY(0) scale(1);
			}

			#alert.leaving {
				opacity: 0;
				transform: translateY(12px) scale(0.98);
			}

			#label {
				margin: 0 0 0.35rem;
				font-size: var(--label-font-size, 12px);
				letter-spacing: 0.08em;
				text-transform: uppercase;
				color: var(--accent, #38bdf8);
				font-weight: 700;
			}

			#label.hidden {
				display: none;
			}

			#message {
				margin: 0;
				font-size: var(--font-size, 28px);
				font-weight: var(--font-weight, 700);
				line-height: 1.25;
				color: var(--text-color, #f8fafc);
				word-break: break-word;
			}
		</style>
	</head>
	<body>
		<div id="root">
			<div id="alert" role="status" aria-live="polite">
				<p id="label"></p>
				<p id="message"></p>
			</div>
		</div>
		<script src="./app.js"></script>
	</body>
</html>
`;
}

function alertsJs(overlayId: string): string {
	const handlers = `{
	'overlay:settings': function (payload) {
		applySettings(payload || {});
	},
	alert: function (payload) {
		enqueueAlert(payload || {});
	},
	clear: function () {
		queue = [];
		hideAlert(true);
	}
}`;

	return `${WIDGET_STYLE_RUNTIME_JS}

let settings = {
	enableFollow: true,
	enableSub: true,
	enableBits: true,
	enableRaid: true,
	enableDonation: true,
	enableChannelPoints: true,
	duration: 5,
	fontFamily: 'system',
	fontSize: 28,
	fontWeight: '700',
	textColor: '#f8fafc',
	accentColor: '#38bdf8',
	backgroundColor: '#0f172a',
	backgroundOpacity: 0.82,
	borderColor: '#94a3b8',
	borderOpacity: 0.25,
	borderRadius: 16,
	padding: 20,
	textAlign: 'center',
	shadow: true,
	alignX: 'center',
	alignY: 'bottom',
	offsetX: 24,
	offsetY: 32,
	labelFontSize: 12,
	showTypeLabel: true,
	maxWidth: 560,
	queueMode: 'queue',
	followTemplate: '{username} followed!',
	subTemplate: '{username} subscribed!',
	bitsTemplate: '{username} cheered {amount} bits!',
	raidTemplate: '{username} raided with {viewers} viewers!',
	donationTemplate: '{username} donated {amount}!',
	channelPointsTemplate: '{username} redeemed {rewardName}!'
};

const typeEnableKey = {
	follow: 'enableFollow',
	sub: 'enableSub',
	bits: 'enableBits',
	raid: 'enableRaid',
	donation: 'enableDonation',
	channel_points: 'enableChannelPoints'
};

const typeTemplateKey = {
	follow: 'followTemplate',
	sub: 'subTemplate',
	bits: 'bitsTemplate',
	raid: 'raidTemplate',
	donation: 'donationTemplate',
	channel_points: 'channelPointsTemplate'
};

const typeLabel = {
	follow: 'Follow',
	sub: 'Subscription',
	bits: 'Bits',
	raid: 'Raid',
	donation: 'Donation',
	channel_points: 'Channel Points'
};

const rootEl = document.getElementById('root');
const alertEl = document.getElementById('alert');
const labelEl = document.getElementById('label');
const messageEl = document.getElementById('message');
let queue = [];
let busy = false;
let hideTimer = null;

function applySettings(payload) {
	settings = Object.assign({}, settings, payload);
	applyStyleCssVars(settings);
	applyLayoutToRoot(rootEl, settings);
	document.documentElement.style.setProperty(
		'--label-font-size',
		Number(settings.labelFontSize || 12) + 'px'
	);
	document.documentElement.style.setProperty(
		'--max-width',
		Number(settings.maxWidth || 560) + 'px'
	);
	labelEl.classList.toggle('hidden', settings.showTypeLabel === false);
}

function formatTemplate(template, data) {
	return String(template || '')
		.replaceAll('{username}', data.username || 'Someone')
		.replaceAll('{amount}', data.amount != null ? String(data.amount) : '')
		.replaceAll('{viewers}', data.viewers != null ? String(data.viewers) : '')
		.replaceAll('{rewardName}', data.rewardName || 'reward')
		.replaceAll('{message}', data.message || '');
}

function enqueueAlert(payload) {
	var type = payload.type || 'follow';
	var enableKey = typeEnableKey[type];

	if (enableKey && settings[enableKey] === false) {
		return;
	}

	var item = {
		type: type,
		username: payload.username || payload.user || 'Someone',
		amount: payload.amount != null ? payload.amount : payload.bits,
		viewers: payload.viewers,
		rewardName: payload.rewardName || payload.rewardTitle,
		message: payload.message
	};

	if (settings.queueMode === 'replace') {
		queue = [item];
		if (busy) {
			hideAlert(true);
			return;
		}
	} else {
		queue.push(item);
	}

	if (!busy) {
		showNext();
	}
}

function showNext() {
	if (!queue.length) {
		busy = false;
		return;
	}

	busy = true;
	var item = queue.shift();
	var templateKey = typeTemplateKey[item.type] || 'followTemplate';
	labelEl.textContent = typeLabel[item.type] || 'Alert';
	messageEl.textContent = formatTemplate(settings[templateKey], item);
	alertEl.classList.remove('leaving');
	alertEl.classList.add('visible');

	clearTimeout(hideTimer);
	hideTimer = setTimeout(function () {
		hideAlert(false);
	}, Math.max(1, Number(settings.duration) || 5) * 1000);
}

function hideAlert(immediate) {
	clearTimeout(hideTimer);
	hideTimer = null;

	if (immediate) {
		alertEl.classList.remove('visible', 'leaving');
		busy = false;
		showNext();
		return;
	}

	alertEl.classList.add('leaving');
	setTimeout(function () {
		alertEl.classList.remove('visible', 'leaving');
		busy = false;
		showNext();
	}, 220);
}

applySettings({});

${widgetRuntimeJs(overlayId, handlers)}
`;
}

function createAlertsManifest(overlayId: string, name: string): OverlayManifest {
	return {
		id: overlayId,
		name,
		framework: 'vanilla',
		version: 2,
		expectedEvents: ['alert', 'clear'],
		requiredPlugins: ['twitch'],
		settings: [
			{
				type: 'section',
				title: 'Alert types',
				fields: [
					{ type: 'switch', key: 'enableFollow', name: 'Follow alerts', defaultValue: true },
					{ type: 'switch', key: 'enableSub', name: 'Subscription alerts', defaultValue: true },
					{ type: 'switch', key: 'enableBits', name: 'Bits alerts', defaultValue: true },
					{ type: 'switch', key: 'enableRaid', name: 'Raid alerts', defaultValue: true },
					{ type: 'switch', key: 'enableDonation', name: 'Donation alerts', defaultValue: true },
					{
						type: 'switch',
						key: 'enableChannelPoints',
						name: 'Channel points alerts',
						defaultValue: true
					}
				]
			},
			{
				type: 'section',
				title: 'Behavior',
				fields: [
					{
						type: 'slider',
						key: 'duration',
						name: 'Duration',
						min: 1,
						max: 20,
						step: 1,
						defaultValue: 5,
						unit: 's'
					},
					{
						type: 'select',
						key: 'queueMode',
						name: 'Queue mode',
						defaultValue: 'queue',
						items: [
							{ value: 'queue', label: 'Queue alerts' },
							{ value: 'replace', label: 'Replace current alert' }
						]
					},
					{
						type: 'switch',
						key: 'showTypeLabel',
						name: 'Show type label',
						defaultValue: true
					},
					{
						type: 'slider',
						key: 'labelFontSize',
						name: 'Label font size',
						min: 10,
						max: 32,
						step: 1,
						defaultValue: 12,
						unit: 'px'
					},
					{
						type: 'slider',
						key: 'maxWidth',
						name: 'Max width',
						min: 240,
						max: 900,
						step: 10,
						defaultValue: 560,
						unit: 'px'
					}
				]
			},
			mergeStyleFields(styleSettingsSection({ fontSize: 28, padding: 20, textAlign: 'center' }), []),
			layoutSettingsSection({ alignX: 'center', alignY: 'bottom', offsetX: 24, offsetY: 32 }),
			{
				type: 'section',
				title: 'Message templates',
				description: 'Use {username}, {amount}, {viewers}, {rewardName}, or {message}.',
				fields: [
					{
						type: 'text',
						key: 'followTemplate',
						name: 'Follow',
						defaultValue: '{username} followed!'
					},
					{
						type: 'text',
						key: 'subTemplate',
						name: 'Subscription',
						defaultValue: '{username} subscribed!'
					},
					{
						type: 'text',
						key: 'bitsTemplate',
						name: 'Bits',
						defaultValue: '{username} cheered {amount} bits!'
					},
					{
						type: 'text',
						key: 'raidTemplate',
						name: 'Raid',
						defaultValue: '{username} raided with {viewers} viewers!'
					},
					{
						type: 'text',
						key: 'donationTemplate',
						name: 'Donation',
						defaultValue: '{username} donated {amount}!'
					},
					{
						type: 'text',
						key: 'channelPointsTemplate',
						name: 'Channel points',
						defaultValue: '{username} redeemed {rewardName}!'
					}
				]
			}
		],
		testHandlers: [
			{
				label: 'Follow',
				event: 'alert',
				payload: { type: 'follow', username: 'TestFollower' }
			},
			{
				label: 'Subscription',
				event: 'alert',
				payload: { type: 'sub', username: 'TestSub' }
			},
			{
				label: 'Bits',
				event: 'alert',
				payload: { type: 'bits', username: 'CheerUser', amount: 100 }
			},
			{
				label: 'Raid',
				event: 'alert',
				payload: { type: 'raid', username: 'RaidLeader', viewers: 42 }
			},
			{
				label: 'Donation',
				event: 'alert',
				payload: { type: 'donation', username: 'Donor', amount: '$5.00' }
			},
			{
				label: 'Channel points',
				event: 'alert',
				payload: {
					type: 'channel_points',
					username: 'Redeemer',
					rewardName: 'Highlight My Message'
				}
			},
			{ label: 'Clear', event: 'clear', payload: {} }
		],
		actions: [
			twitchToOverlayPreset(
				'follow-alert',
				'Follow → Alert',
				'twitch:twitch:channel:new-follower',
				'alert',
				'{"type":"follow","username":"{user}"}'
			),
			twitchToOverlayPreset(
				'sub-alert',
				'Subscription → Alert',
				'twitch:twitch:subscriptions:new-subscription',
				'alert',
				'{"type":"sub","username":"{user}"}'
			),
			twitchToOverlayPreset(
				'bits-alert',
				'Cheer → Alert',
				'twitch:twitch:chat:cheer',
				'alert',
				'{"type":"bits","username":"{user}","amount":"{bits}","message":"{message}"}'
			),
			twitchToOverlayPreset(
				'raid-alert',
				'Raid → Alert',
				'twitch:twitch:raids:incoming-raid',
				'alert',
				'{"type":"raid","username":"{user}","viewers":"{viewers}"}'
			),
			twitchToOverlayPreset(
				'channel-points-alert',
				'Channel points → Alert',
				'twitch:twitch:channel-points:reward-redeemed',
				'alert',
				'{"type":"channel_points","username":"{user}","rewardName":"{rewardTitle}","message":"{input}"}'
			),
			{
				key: 'youtube-super-chat-alert',
				name: 'YouTube Super Chat → Alert',
				enabled: true,
				triggers: [{ triggerTypeId: 'youtube:youtube:chat:super-chat' }],
				handlers: [
					{
						handlerTypeId: 'overlay:overlay:send-to-overlay',
						fields: [
							{ key: 'overlay', value: OVERLAY_SELF_FIELD_TOKEN },
							{ key: 'event', value: 'alert' },
							{
								key: 'payload',
								value:
									'{"type":"donation","username":"{user}","amount":"{amount}","message":"{message}"}'
							}
						]
					}
				]
			}
		]
	};
}

export const alertsWidget: OverlayWidgetTemplate = {
	id: 'alerts',
	name: 'Alerts',
	description: 'Follow, sub, bits, raid, donation, and channel points alerts.',
	icon: 'ri:notification-3-line',
	defaultName: 'Alerts',
	buildFiles: (overlayId) => [
		{ path: 'dist/index.html', content: alertsHtml() },
		{ path: 'dist/app.js', content: alertsJs(overlayId) }
	],
	createManifest: createAlertsManifest
};
