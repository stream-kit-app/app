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

function goalHtml(): string {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Goal</title>
		<style>
			${WIDGET_BASE_CSS}

			#root {
				width: min(520px, 92vw);
				padding: var(--padding, 16px);
				border-radius: var(--radius, 16px);
				background: var(--bg, transparent);
				border: 1px solid var(--border, transparent);
				box-shadow: var(--shadow, none);
				text-align: var(--text-align, left);
			}

			#label {
				margin: 0 0 0.5rem;
				font-size: var(--font-size, 16px);
				font-weight: var(--font-weight, 700);
				color: var(--text-color, #f8fafc);
			}

			#meta {
				display: flex;
				justify-content: space-between;
				margin-bottom: 0.4rem;
				font-size: 0.85rem;
				color: var(--accent, #38bdf8);
			}

			#meta.hidden-values #progress-text {
				display: none;
			}

			#percent-text.hidden {
				display: none;
			}

			#track {
				height: var(--bar-height, 18px);
				border-radius: 999px;
				background: var(--track-color, rgba(15, 23, 42, 0.7));
				border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
				overflow: hidden;
			}

			#fill {
				height: 100%;
				width: 0%;
				background: var(--accent, #38bdf8);
				transition: width 280ms ease;
			}
		</style>
	</head>
	<body>
		<div id="root">
			<p id="label"></p>
			<div id="meta">
				<span id="progress-text">0 / 100</span>
				<span id="percent-text">0%</span>
			</div>
			<div id="track"><div id="fill"></div></div>
		</div>
		<script src="./app.js"></script>
	</body>
</html>
`;
}

function goalJs(overlayId: string): string {
	const handlers = `{
	'overlay:settings': function (payload) {
		applySettings(payload || {});
		render();
	},
	set: function (payload) {
		var data = payload || {};
		if (data.current != null) current = Number(data.current) || 0;
		if (data.target != null) target = Math.max(1, Number(data.target) || 1);
		render();
	},
	progress: function (payload) {
		var data = payload || {};
		if (data.current != null) current = Number(data.current) || 0;
		if (data.target != null) target = Math.max(1, Number(data.target) || target);
		render();
	}
}`;

	return `${WIDGET_STYLE_RUNTIME_JS}

let settings = {
	label: 'Goal',
	defaultTarget: 100,
	defaultCurrent: 0,
	showPercentage: true,
	showValues: true,
	fontFamily: 'system',
	fontSize: 16,
	fontWeight: '700',
	textColor: '#f8fafc',
	accentColor: '#38bdf8',
	backgroundColor: '#0f172a',
	backgroundOpacity: 0,
	borderColor: '#94a3b8',
	borderOpacity: 0,
	borderRadius: 16,
	padding: 16,
	textAlign: 'left',
	shadow: false,
	alignX: 'center',
	alignY: 'bottom',
	offsetX: 24,
	offsetY: 32,
	trackColor: '#1e293b',
	barHeight: 18
};

const rootEl = document.getElementById('root');
const labelEl = document.getElementById('label');
const metaEl = document.getElementById('meta');
const progressText = document.getElementById('progress-text');
const percentText = document.getElementById('percent-text');
const fillEl = document.getElementById('fill');
let current = 0;
let target = 100;

function applySettings(payload) {
	settings = Object.assign({}, settings, payload);
	applyStyleCssVars(settings);
	applyLayoutToRoot(rootEl, settings);
	document.documentElement.style.setProperty(
		'--bar-height',
		Number(settings.barHeight || 18) + 'px'
	);
	document.documentElement.style.setProperty(
		'--track-color',
		settings.trackColor || '#1e293b'
	);
	labelEl.textContent = settings.label || 'Goal';
	metaEl.classList.toggle('hidden-values', settings.showValues === false);
	percentText.classList.toggle('hidden', settings.showPercentage === false);
	if (payload && (payload.defaultTarget != null || payload.defaultCurrent != null)) {
		target = Math.max(1, Number(settings.defaultTarget) || 100);
		current = Number(settings.defaultCurrent) || 0;
	}
}

function render() {
	var safeTarget = Math.max(1, target);
	var pct = Math.max(0, Math.min(100, (current / safeTarget) * 100));
	progressText.textContent = String(current) + ' / ' + String(safeTarget);
	percentText.textContent = Math.round(pct) + '%';
	fillEl.style.width = pct + '%';
}

applySettings({});
target = Math.max(1, Number(settings.defaultTarget) || 100);
current = Number(settings.defaultCurrent) || 0;
render();

${widgetRuntimeJs(overlayId, handlers)}
`;
}

function createGoalManifest(overlayId: string, name: string): OverlayManifest {
	return {
		id: overlayId,
		name,
		framework: 'vanilla',
		version: 2,
		expectedEvents: ['set', 'progress'],
		requiredPlugins: ['core'],
		settings: [
			{
				type: 'section',
				title: 'Content',
				fields: [
					{ type: 'text', key: 'label', name: 'Label', defaultValue: 'Goal' },
					{
						type: 'slider',
						key: 'defaultTarget',
						name: 'Default target',
						min: 1,
						max: 10000,
						step: 1,
						defaultValue: 100,
						unit: ''
					},
					{
						type: 'slider',
						key: 'defaultCurrent',
						name: 'Default current',
						min: 0,
						max: 10000,
						step: 1,
						defaultValue: 0,
						unit: ''
					},
					{
						type: 'switch',
						key: 'showPercentage',
						name: 'Show percentage',
						defaultValue: true
					},
					{
						type: 'switch',
						key: 'showValues',
						name: 'Show current / target',
						defaultValue: true
					},
					{
						type: 'color',
						key: 'trackColor',
						name: 'Track color',
						defaultValue: '#1e293b'
					},
					{
						type: 'slider',
						key: 'barHeight',
						name: 'Bar height',
						min: 6,
						max: 48,
						step: 1,
						defaultValue: 18,
						unit: 'px'
					}
				]
			},
			mergeStyleFields(
				styleSettingsSection({
					fontSize: 16,
					fontWeight: '700',
					padding: 16,
					backgroundOpacity: 0,
					borderOpacity: 0,
					shadow: false,
					textAlign: 'left'
				}),
				[]
			),
			layoutSettingsSection({ alignX: 'center', alignY: 'bottom', offsetX: 24, offsetY: 32 })
		],
		testHandlers: [
			{ label: 'Set 25/100', event: 'set', payload: { current: 25, target: 100 } },
			{ label: 'Progress 50', event: 'progress', payload: { current: 50 } },
			{ label: 'Complete', event: 'progress', payload: { current: 100, target: 100 } }
		],
		actions: [
			hotkeyToOverlayPreset(
				'goal-demo-progress',
				'Hotkey → Demo goal progress',
				'progress',
				'{"current":50,"target":100}'
			)
		]
	};
}

export const goalWidget: OverlayWidgetTemplate = {
	id: 'goal',
	name: 'Goal',
	description: 'Progress bar toward a stream goal.',
	icon: 'ri:flag-line',
	defaultName: 'Goal',
	buildFiles: (overlayId): OverlayProjectFile[] => [
		{ path: 'dist/index.html', content: goalHtml() },
		{ path: 'dist/app.js', content: goalJs(overlayId) }
	],
	createManifest: createGoalManifest
};
