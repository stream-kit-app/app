import type {
	OverlayActionPresetJson,
	OverlaySettingsFieldJson,
	OverlaySettingsSectionJson
} from '../overlay-manifest';
import { OVERLAY_SELF_FIELD_TOKEN } from '../overlay-manifest';

/** Shared WebSocket runtime for vanilla widget overlays. */
export function widgetRuntimeJs(overlayId: string, handlersObjectLiteral: string): string {
	return `const OVERLAY_ID = '${overlayId}';
const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
let reconnectAttempt = 0;
let socket = null;

const handlers = ${handlersObjectLiteral};

function send(event, payload) {
	if (!event || !String(event).trim()) {
		return;
	}

	if (!socket || socket.readyState !== WebSocket.OPEN) {
		console.warn('[overlay] WebSocket is not connected; message not sent:', event);
		return;
	}

	socket.send(JSON.stringify({ event: String(event).trim(), payload: payload ?? {} }));
}

function connect() {
	const ws = new WebSocket(protocol + '//' + location.host + '/ws?overlayId=' + OVERLAY_ID);
	socket = ws;

	ws.onmessage = function (event) {
		try {
			const message = JSON.parse(event.data);
			var handler = handlers[message.event];
			if (handler) {
				handler(message.payload);
			}
		} catch (error) {
			// Ignore malformed messages.
		}
	};

	ws.onclose = function () {
		socket = null;
		var delay = Math.min(1000 * Math.pow(2, reconnectAttempt), 30000);
		reconnectAttempt += 1;
		setTimeout(connect, delay);
	};

	ws.onopen = function () {
		reconnectAttempt = 0;
	};
}

connect();
`;
}

export function sendToOverlayFields(event: string, payloadJson: string) {
	return [
		{ key: 'overlay', value: OVERLAY_SELF_FIELD_TOKEN },
		{ key: 'event', value: event },
		{ key: 'payload', value: payloadJson }
	];
}

export function hotkeyToOverlayPreset(
	key: string,
	name: string,
	event: string,
	payloadJson: string
): OverlayActionPresetJson {
	return {
		key,
		name,
		enabled: true,
		triggers: [{ triggerTypeId: 'core:core:input:hotkey' }],
		handlers: [
			{
				handlerTypeId: 'overlay:overlay:send-to-overlay',
				fields: sendToOverlayFields(event, payloadJson)
			}
		]
	};
}

export function twitchToOverlayPreset(
	key: string,
	name: string,
	triggerTypeId: string,
	event: string,
	payloadJson: string
): OverlayActionPresetJson {
	return {
		key,
		name,
		enabled: true,
		triggers: [{ triggerTypeId }],
		handlers: [
			{
				handlerTypeId: 'overlay:overlay:send-to-overlay',
				fields: sendToOverlayFields(event, payloadJson)
			}
		]
	};
}

export type WidgetStyleDefaults = {
	fontSize?: number;
	fontWeight?: string;
	textAlign?: 'left' | 'center' | 'right';
	padding?: number;
	borderRadius?: number;
	backgroundOpacity?: number;
	borderOpacity?: number;
	shadow?: boolean;
};

export type WidgetLayoutDefaults = {
	alignX?: 'left' | 'center' | 'right';
	alignY?: 'top' | 'center' | 'bottom';
	offsetX?: number;
	offsetY?: number;
};

const FONT_FAMILY_ITEMS = [
	{ value: 'system', label: 'System' },
	{ value: 'sans', label: 'Sans-serif' },
	{ value: 'serif', label: 'Serif' },
	{ value: 'mono', label: 'Monospace' },
	{ value: 'display', label: 'Display' }
];

/** Manifest Style section shared by all widgets. */
export function styleSettingsSection(
	defaults: WidgetStyleDefaults = {}
): OverlaySettingsSectionJson {
	const fontSize = defaults.fontSize ?? 28;
	const fontWeight = defaults.fontWeight ?? '700';
	const textAlign = defaults.textAlign ?? 'center';
	const padding = defaults.padding ?? 20;
	const borderRadius = defaults.borderRadius ?? 16;
	const backgroundOpacity = defaults.backgroundOpacity ?? 0.82;
	const borderOpacity = defaults.borderOpacity ?? 0.25;
	const shadow = defaults.shadow ?? true;

	return {
		type: 'section',
		title: 'Style',
		fields: [
			{
				type: 'select',
				key: 'fontFamily',
				name: 'Font',
				defaultValue: 'system',
				items: FONT_FAMILY_ITEMS
			},
			{
				type: 'slider',
				key: 'fontSize',
				name: 'Font size',
				min: 12,
				max: 140,
				step: 1,
				defaultValue: fontSize,
				unit: 'px'
			},
			{
				type: 'select',
				key: 'fontWeight',
				name: 'Font weight',
				defaultValue: fontWeight,
				items: [
					{ value: '400', label: 'Regular' },
					{ value: '600', label: 'Semibold' },
					{ value: '700', label: 'Bold' },
					{ value: '800', label: 'Extra bold' }
				]
			},
			{
				type: 'color',
				key: 'textColor',
				name: 'Text color',
				defaultValue: '#f8fafc'
			},
			{
				type: 'color',
				key: 'accentColor',
				name: 'Accent color',
				defaultValue: '#38bdf8'
			},
			{
				type: 'color',
				key: 'backgroundColor',
				name: 'Background color',
				defaultValue: '#0f172a'
			},
			{
				type: 'slider',
				key: 'backgroundOpacity',
				name: 'Background opacity',
				min: 0,
				max: 1,
				step: 0.05,
				defaultValue: backgroundOpacity,
				unit: ''
			},
			{
				type: 'color',
				key: 'borderColor',
				name: 'Border color',
				defaultValue: '#94a3b8'
			},
			{
				type: 'slider',
				key: 'borderOpacity',
				name: 'Border opacity',
				min: 0,
				max: 1,
				step: 0.05,
				defaultValue: borderOpacity,
				unit: ''
			},
			{
				type: 'slider',
				key: 'borderRadius',
				name: 'Border radius',
				min: 0,
				max: 48,
				step: 1,
				defaultValue: borderRadius,
				unit: 'px'
			},
			{
				type: 'slider',
				key: 'padding',
				name: 'Padding',
				min: 0,
				max: 64,
				step: 1,
				defaultValue: padding,
				unit: 'px'
			},
			{
				type: 'select',
				key: 'textAlign',
				name: 'Text align',
				defaultValue: textAlign,
				items: [
					{ value: 'left', label: 'Left' },
					{ value: 'center', label: 'Center' },
					{ value: 'right', label: 'Right' }
				]
			},
			{
				type: 'switch',
				key: 'shadow',
				name: 'Drop shadow',
				defaultValue: shadow
			}
		]
	};
}

/** Manifest Layout section for positioned widgets. */
export function layoutSettingsSection(
	defaults: WidgetLayoutDefaults = {}
): OverlaySettingsSectionJson {
	const alignX = defaults.alignX ?? 'center';
	const alignY = defaults.alignY ?? 'center';
	const offsetX = defaults.offsetX ?? 24;
	const offsetY = defaults.offsetY ?? 24;

	return {
		type: 'section',
		title: 'Layout',
		fields: [
			{
				type: 'select',
				key: 'alignX',
				name: 'Horizontal align',
				defaultValue: alignX,
				items: [
					{ value: 'left', label: 'Left' },
					{ value: 'center', label: 'Center' },
					{ value: 'right', label: 'Right' }
				]
			},
			{
				type: 'select',
				key: 'alignY',
				name: 'Vertical align',
				defaultValue: alignY,
				items: [
					{ value: 'top', label: 'Top' },
					{ value: 'center', label: 'Center' },
					{ value: 'bottom', label: 'Bottom' }
				]
			},
			{
				type: 'slider',
				key: 'offsetX',
				name: 'Horizontal offset',
				min: 0,
				max: 200,
				step: 4,
				defaultValue: offsetX,
				unit: 'px'
			},
			{
				type: 'slider',
				key: 'offsetY',
				name: 'Vertical offset',
				min: 0,
				max: 200,
				step: 4,
				defaultValue: offsetY,
				unit: 'px'
			}
		]
	};
}

export function mergeStyleFields(
	section: OverlaySettingsSectionJson,
	extra: OverlaySettingsFieldJson[]
): OverlaySettingsSectionJson {
	return {
		...section,
		fields: [...section.fields, ...extra]
	};
}

/** JS helpers injected into overlay app.js for style + layout CSS vars. */
export const WIDGET_STYLE_RUNTIME_JS = `
var FONT_STACKS = {
	system: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
	sans: 'ui-sans-serif, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
	serif: 'ui-serif, Georgia, Cambria, Times New Roman, serif',
	mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
	display: 'ui-rounded, system-ui, Segoe UI, Roboto, sans-serif'
};

function hexToRgba(hex, alpha) {
	var normalized = String(hex || '#000000').trim();
	var short = /^#([0-9a-fA-F]{3})$/.exec(normalized);
	var full = /^#([0-9a-fA-F]{6})$/.exec(normalized);
	var r = 0;
	var g = 0;
	var b = 0;
	if (short) {
		r = parseInt(short[1][0] + short[1][0], 16);
		g = parseInt(short[1][1] + short[1][1], 16);
		b = parseInt(short[1][2] + short[1][2], 16);
	} else if (full) {
		r = parseInt(full[1].slice(0, 2), 16);
		g = parseInt(full[1].slice(2, 4), 16);
		b = parseInt(full[1].slice(4, 6), 16);
	}
	var a = alpha == null ? 1 : Number(alpha);
	if (Number.isNaN(a)) a = 1;
	return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

function applyStyleCssVars(settings) {
	var root = document.documentElement;
	var family = FONT_STACKS[settings.fontFamily] || FONT_STACKS.system;
	root.style.setProperty('--font-family', family);
	root.style.setProperty('--font-size', Number(settings.fontSize || 28) + 'px');
	root.style.setProperty('--font-weight', String(settings.fontWeight || '700'));
	root.style.setProperty('--text-color', settings.textColor || '#f8fafc');
	root.style.setProperty('--accent', settings.accentColor || '#38bdf8');
	root.style.setProperty(
		'--bg',
		hexToRgba(settings.backgroundColor || '#0f172a', settings.backgroundOpacity ?? 0.82)
	);
	root.style.setProperty(
		'--border',
		hexToRgba(settings.borderColor || '#94a3b8', settings.borderOpacity ?? 0.25)
	);
	root.style.setProperty('--radius', Number(settings.borderRadius ?? 16) + 'px');
	root.style.setProperty('--padding', Number(settings.padding ?? 20) + 'px');
	root.style.setProperty('--text-align', settings.textAlign || 'center');
	root.style.setProperty(
		'--shadow',
		settings.shadow === false ? 'none' : '0 20px 50px rgba(0, 0, 0, 0.35)'
	);
}

function applyLayoutToRoot(rootEl, settings) {
	if (!rootEl) return;
	var alignX = settings.alignX || 'center';
	var alignY = settings.alignY || 'center';
	var offsetX = Number(settings.offsetX ?? 24);
	var offsetY = Number(settings.offsetY ?? 24);
	rootEl.style.position = 'fixed';
	rootEl.style.inset = 'auto';
	rootEl.style.left = alignX === 'left' ? offsetX + 'px' : alignX === 'right' ? 'auto' : '50%';
	rootEl.style.right = alignX === 'right' ? offsetX + 'px' : 'auto';
	rootEl.style.top = alignY === 'top' ? offsetY + 'px' : alignY === 'bottom' ? 'auto' : '50%';
	rootEl.style.bottom = alignY === 'bottom' ? offsetY + 'px' : 'auto';
	var tx = alignX === 'center' ? '-50%' : '0';
	var ty = alignY === 'center' ? '-50%' : '0';
	rootEl.style.transform = 'translate(' + tx + ', ' + ty + ')';
}
`.trim();

export const WIDGET_BASE_CSS = `
html, body {
	margin: 0;
	width: 100%;
	height: 100%;
	background: transparent;
	overflow: hidden;
	font-family: var(--font-family, system-ui, -apple-system, Segoe UI, Roboto, sans-serif);
	color: var(--text-color, #f8fafc);
}

* {
	box-sizing: border-box;
}
`.trim();
