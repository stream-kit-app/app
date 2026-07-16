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

function counterHtml(): string {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Counter</title>
		<style>
			${WIDGET_BASE_CSS}

			#root {
				display: flex;
				flex-direction: column;
				gap: 0.4rem;
				padding: var(--padding, 16px);
				border-radius: var(--radius, 16px);
				background: var(--bg, transparent);
				border: 1px solid var(--border, transparent);
				box-shadow: var(--shadow, none);
				text-align: var(--text-align, center);
				min-width: 6rem;
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

			#value {
				margin: 0;
				font-variant-numeric: tabular-nums;
				font-size: var(--font-size, 72px);
				font-weight: var(--font-weight, 800);
				color: var(--text-color, #f8fafc);
				line-height: 1;
			}
		</style>
	</head>
	<body>
		<div id="root">
			<p id="label"></p>
			<p id="value">0</p>
		</div>
		<script src="./app.js"></script>
	</body>
</html>
`;
}

function counterJs(overlayId: string): string {
	const handlers = `{
	'overlay:settings': function (payload) {
		applySettings(payload || {});
		render();
	},
	set: function (payload) {
		value = Number((payload || {}).value);
		if (Number.isNaN(value)) value = 0;
		render();
	},
	increment: function (payload) {
		var amount = Number((payload || {}).amount);
		if (Number.isNaN(amount)) amount = 1;
		value += amount;
		render();
	},
	decrement: function (payload) {
		var amount = Number((payload || {}).amount);
		if (Number.isNaN(amount)) amount = 1;
		value -= amount;
		render();
	}
}`;

	return `${WIDGET_STYLE_RUNTIME_JS}

let settings = {
	label: 'Counter',
	defaultValue: 0,
	fontFamily: 'system',
	fontSize: 72,
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
const valueEl = document.getElementById('value');
let value = 0;

function applySettings(payload) {
	settings = Object.assign({}, settings, payload);
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
	labelEl.textContent = settings.label || 'Counter';
	labelEl.classList.toggle('hidden', settings.showLabel === false);
	if (payload && payload.defaultValue != null && value === 0) {
		value = Number(settings.defaultValue) || 0;
	}
}

function render() {
	valueEl.textContent = String(value);
}

applySettings({});
value = Number(settings.defaultValue) || 0;
render();

${widgetRuntimeJs(overlayId, handlers)}
`;
}

function createCounterManifest(overlayId: string, name: string): OverlayManifest {
	return {
		id: overlayId,
		name,
		framework: 'vanilla',
		version: 2,
		expectedEvents: ['set', 'increment', 'decrement'],
		requiredPlugins: ['core'],
		settings: [
			{
				type: 'section',
				title: 'Content',
				fields: [
					{ type: 'text', key: 'label', name: 'Label', defaultValue: 'Counter' },
					{
						type: 'switch',
						key: 'showLabel',
						name: 'Show label',
						defaultValue: true
					},
					{
						type: 'slider',
						key: 'defaultValue',
						name: 'Default value',
						min: 0,
						max: 1000,
						step: 1,
						defaultValue: 0,
						unit: ''
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
					fontSize: 72,
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
			{ label: 'Set 10', event: 'set', payload: { value: 10 } },
			{ label: 'Increment', event: 'increment', payload: { amount: 1 } },
			{ label: 'Decrement', event: 'decrement', payload: { amount: 1 } }
		],
		actions: [
			hotkeyToOverlayPreset(
				'counter-increment',
				'Hotkey → Increment counter',
				'increment',
				'{"amount":1}'
			),
			hotkeyToOverlayPreset(
				'counter-decrement',
				'Hotkey → Decrement counter',
				'decrement',
				'{"amount":1}'
			)
		]
	};
}

export const counterWidget: OverlayWidgetTemplate = {
	id: 'counter',
	name: 'Counter',
	description: 'Simple on-stream counter driven by actions.',
	icon: 'ri:hashtag',
	defaultName: 'Counter',
	buildFiles: (overlayId): OverlayProjectFile[] => [
		{ path: 'dist/index.html', content: counterHtml() },
		{ path: 'dist/app.js', content: counterJs(overlayId) }
	],
	createManifest: createCounterManifest
};
