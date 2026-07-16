import type { OverlayManifest, OverlayProjectFile } from '../types';
import type { OverlayWidgetTemplate } from './types';

import {
	hotkeyToOverlayPreset,
	layoutSettingsSection,
	mergeStyleFields,
	styleSettingsSection,
	WIDGET_BASE_CSS,
	WIDGET_STYLE_RUNTIME_JS,
	widgetRuntimeJs
} from './shared';

function timerHtml(): string {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Timer</title>
		<style>
			${WIDGET_BASE_CSS}

			#root {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				padding: var(--padding, 16px);
				border-radius: var(--radius, 16px);
				background: var(--bg, transparent);
				border: 1px solid var(--border, transparent);
				box-shadow: var(--shadow, none);
				text-align: var(--text-align, center);
				min-width: 8rem;
			}

			#label {
				margin: 0;
				font-size: var(--label-font-size, 14px);
				letter-spacing: 0.06em;
				text-transform: uppercase;
				color: var(--label-color, var(--accent, #38bdf8));
				font-weight: 600;
			}

			#label.hidden {
				display: none;
			}

			#time {
				margin: 0;
				font-variant-numeric: tabular-nums;
				font-size: var(--font-size, 64px);
				font-weight: var(--font-weight, 800);
				color: var(--text-color, #f8fafc);
				line-height: 1;
			}
		</style>
	</head>
	<body>
		<div id="root">
			<p id="label"></p>
			<p id="time">00:00</p>
		</div>
		<script src="./app.js"></script>
	</body>
</html>
`;
}

function timerJs(overlayId: string): string {
	const handlers = `{
	'overlay:settings': function (payload) {
		applySettings(payload || {});
		render();
	},
	start: function (payload) {
		startTimer(payload || {});
	},
	pause: function () {
		paused = true;
	},
	resume: function () {
		if (remainingMs > 0 || mode === 'stopwatch') {
			paused = false;
		}
	},
	reset: function () {
		resetTimer();
	},
	set: function (payload) {
		setTimer(payload || {});
	}
}`;

	return `${WIDGET_STYLE_RUNTIME_JS}

let settings = {
	label: 'Timer',
	defaultSeconds: 300,
	mode: 'countdown',
	fontFamily: 'system',
	fontSize: 64,
	fontWeight: '800',
	textColor: '#f8fafc',
	accentColor: '#38bdf8',
	backgroundColor: '#0f172a',
	backgroundOpacity: 0,
	borderColor: '#94a3b8',
	borderOpacity: 0,
	borderRadius: 16,
	padding: 16,
	textAlign: 'center',
	shadow: false,
	alignX: 'center',
	alignY: 'center',
	offsetX: 24,
	offsetY: 24,
	showLabel: true,
	labelFontSize: 14,
	labelColor: '#38bdf8'
};

const rootEl = document.getElementById('root');
const labelEl = document.getElementById('label');
const timeEl = document.getElementById('time');
let mode = 'countdown';
let remainingMs = 300000;
let elapsedMs = 0;
let paused = true;
let lastTick = performance.now();

function applySettings(payload) {
	settings = Object.assign({}, settings, payload);
	mode = settings.mode === 'stopwatch' ? 'stopwatch' : 'countdown';
	applyStyleCssVars(settings);
	applyLayoutToRoot(rootEl, settings);
	document.documentElement.style.setProperty(
		'--label-font-size',
		Number(settings.labelFontSize || 14) + 'px'
	);
	document.documentElement.style.setProperty(
		'--label-color',
		settings.labelColor || settings.accentColor || '#38bdf8'
	);
	labelEl.textContent = settings.label || 'Timer';
	labelEl.classList.toggle('hidden', settings.showLabel === false);
	if (paused && mode === 'countdown' && remainingMs === 0) {
		remainingMs = Math.max(0, Number(settings.defaultSeconds) || 0) * 1000;
	}
}

function formatTime(ms) {
	var total = Math.max(0, Math.floor(ms / 1000));
	var hours = Math.floor(total / 3600);
	var minutes = Math.floor((total % 3600) / 60);
	var seconds = total % 60;
	var mm = String(minutes).padStart(2, '0');
	var ss = String(seconds).padStart(2, '0');
	if (hours > 0) {
		return String(hours) + ':' + mm + ':' + ss;
	}
	return mm + ':' + ss;
}

function render() {
	timeEl.textContent = formatTime(mode === 'stopwatch' ? elapsedMs : remainingMs);
}

function startTimer(payload) {
	if (payload.seconds != null) {
		remainingMs = Math.max(0, Number(payload.seconds) || 0) * 1000;
		elapsedMs = 0;
	} else if (mode === 'countdown' && remainingMs <= 0) {
		remainingMs = Math.max(0, Number(settings.defaultSeconds) || 0) * 1000;
	}
	paused = false;
	lastTick = performance.now();
	render();
}

function resetTimer() {
	paused = true;
	elapsedMs = 0;
	remainingMs = Math.max(0, Number(settings.defaultSeconds) || 0) * 1000;
	render();
}

function setTimer(payload) {
	if (payload.seconds != null) {
		remainingMs = Math.max(0, Number(payload.seconds) || 0) * 1000;
	}
	if (payload.elapsedSeconds != null) {
		elapsedMs = Math.max(0, Number(payload.elapsedSeconds) || 0) * 1000;
	}
	render();
}

function tick(now) {
	var delta = now - lastTick;
	lastTick = now;
	if (!paused) {
		if (mode === 'countdown') {
			remainingMs = Math.max(0, remainingMs - delta);
			if (remainingMs <= 0) {
				paused = true;
			}
		} else {
			elapsedMs += delta;
		}
		render();
	}
	requestAnimationFrame(tick);
}

applySettings({});
render();
requestAnimationFrame(tick);

${widgetRuntimeJs(overlayId, handlers)}
`;
}

function createTimerManifest(overlayId: string, name: string): OverlayManifest {
	return {
		id: overlayId,
		name,
		framework: 'vanilla',
		version: 2,
		expectedEvents: ['start', 'pause', 'resume', 'reset', 'set'],
		requiredPlugins: ['core'],
		settings: [
			{
				type: 'section',
				title: 'Content',
				fields: [
					{ type: 'text', key: 'label', name: 'Label', defaultValue: 'Timer' },
					{
						type: 'switch',
						key: 'showLabel',
						name: 'Show label',
						defaultValue: true
					},
					{
						type: 'slider',
						key: 'defaultSeconds',
						name: 'Default duration',
						min: 0,
						max: 3600,
						step: 5,
						defaultValue: 300,
						unit: 's'
					},
					{
						type: 'select',
						key: 'mode',
						name: 'Mode',
						defaultValue: 'countdown',
						items: [
							{ value: 'countdown', label: 'Countdown' },
							{ value: 'stopwatch', label: 'Stopwatch' }
						]
					},
					{
						type: 'slider',
						key: 'labelFontSize',
						name: 'Label font size',
						min: 10,
						max: 40,
						step: 1,
						defaultValue: 14,
						unit: 'px'
					},
					{
						type: 'color',
						key: 'labelColor',
						name: 'Label color',
						defaultValue: '#38bdf8'
					}
				]
			},
			mergeStyleFields(
				styleSettingsSection({
					fontSize: 64,
					fontWeight: '800',
					padding: 16,
					backgroundOpacity: 0,
					borderOpacity: 0,
					shadow: false,
					textAlign: 'center'
				}),
				[]
			),
			layoutSettingsSection({ alignX: 'center', alignY: 'center', offsetX: 24, offsetY: 24 })
		],
		testHandlers: [
			{ label: 'Start', event: 'start', payload: {} },
			{ label: 'Pause', event: 'pause', payload: {} },
			{ label: 'Resume', event: 'resume', payload: {} },
			{ label: 'Reset', event: 'reset', payload: {} },
			{ label: 'Set 60s', event: 'set', payload: { seconds: 60 } }
		],
		actions: [
			hotkeyToOverlayPreset('timer-start', 'Hotkey → Start timer', 'start', '{}'),
			hotkeyToOverlayPreset('timer-pause', 'Hotkey → Pause timer', 'pause', '{}'),
			hotkeyToOverlayPreset('timer-reset', 'Hotkey → Reset timer', 'reset', '{}')
		]
	};
}

export const timerWidget: OverlayWidgetTemplate = {
	id: 'timer',
	name: 'Timer',
	description: 'Countdown or stopwatch for stream segments.',
	icon: 'ri:timer-line',
	defaultName: 'Timer',
	buildFiles: (overlayId): OverlayProjectFile[] => [
		{ path: 'dist/index.html', content: timerHtml() },
		{ path: 'dist/app.js', content: timerJs(overlayId) }
	],
	createManifest: createTimerManifest
};
