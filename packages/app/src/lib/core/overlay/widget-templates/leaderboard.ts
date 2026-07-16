import type { OverlayManifest, OverlayProjectFile } from '../types';
import type { OverlayWidgetTemplate } from './types';

import { OVERLAY_SELF_FIELD_TOKEN } from '../overlay-manifest';

import {
	layoutSettingsSection,
	mergeStyleFields,
	styleSettingsSection,
	WIDGET_BASE_CSS,
	WIDGET_STYLE_RUNTIME_JS,
	widgetRuntimeJs
} from './shared';

function leaderboardHtml(): string {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Leaderboard</title>
		<style>
			${WIDGET_BASE_CSS}

			#root {
				width: min(var(--panel-width, 320px), 92vw);
				padding: var(--padding, 16px);
				border-radius: var(--radius, 16px);
				background: var(--bg, rgba(15, 23, 42, 0.82));
				border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
				box-shadow: var(--shadow, 0 20px 50px rgba(0, 0, 0, 0.35));
				text-align: var(--text-align, left);
			}

			#title {
				margin: 0 0 0.75rem;
				font-size: 0.95rem;
				letter-spacing: 0.06em;
				text-transform: uppercase;
				font-weight: 700;
				color: var(--accent, #38bdf8);
			}

			#list {
				margin: 0;
				padding: 0;
				list-style: none;
				display: flex;
				flex-direction: column;
				gap: var(--row-gap, 8px);
			}

			.row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.75rem;
				font-size: var(--font-size, 16px);
				font-weight: var(--font-weight, 600);
				color: var(--text-color, #f8fafc);
			}

			.left {
				display: flex;
				align-items: center;
				gap: 0.55rem;
				min-width: 0;
			}

			.rank {
				flex: 0 0 auto;
				width: 1.5rem;
				font-weight: 700;
				color: var(--rank-color, rgba(248, 250, 252, 0.55));
			}

			.rank.hidden {
				display: none;
			}

			.name {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-weight: 600;
			}

			.points {
				flex: 0 0 auto;
				font-variant-numeric: tabular-nums;
				font-weight: 700;
				color: var(--points-color, var(--text-color, #f8fafc));
			}
		</style>
	</head>
	<body>
		<div id="root">
			<p id="title">Leaderboard</p>
			<ol id="list"></ol>
		</div>
		<script src="./app.js"></script>
	</body>
</html>
`;
}

function leaderboardJs(overlayId: string): string {
	const handlers = `{
	'overlay:settings': function (payload) {
		applySettings(payload || {});
		render(entries);
	},
	update: function (payload) {
		var data = payload || {};
		entries = Array.isArray(data.entries) ? data.entries : [];
		render(entries);
	}
}`;

	return `${WIDGET_STYLE_RUNTIME_JS}

let settings = {
	title: 'Leaderboard',
	topN: 5,
	fontFamily: 'system',
	fontSize: 16,
	fontWeight: '600',
	textColor: '#f8fafc',
	accentColor: '#38bdf8',
	backgroundColor: '#0f172a',
	backgroundOpacity: 0.82,
	borderColor: '#94a3b8',
	borderOpacity: 0.25,
	borderRadius: 16,
	padding: 16,
	textAlign: 'left',
	shadow: true,
	alignX: 'right',
	alignY: 'top',
	offsetX: 24,
	offsetY: 24,
	rowGap: 8,
	rankColor: '#94a3b8',
	pointsColor: '#f8fafc',
	showRank: true,
	panelWidth: 320
};

const rootEl = document.getElementById('root');
const titleEl = document.getElementById('title');
const listEl = document.getElementById('list');
let entries = [];

function applySettings(payload) {
	settings = Object.assign({}, settings, payload);
	applyStyleCssVars(settings);
	applyLayoutToRoot(rootEl, settings);
	document.documentElement.style.setProperty('--row-gap', Number(settings.rowGap ?? 8) + 'px');
	document.documentElement.style.setProperty(
		'--rank-color',
		settings.rankColor || '#94a3b8'
	);
	document.documentElement.style.setProperty(
		'--points-color',
		settings.pointsColor || settings.textColor || '#f8fafc'
	);
	document.documentElement.style.setProperty(
		'--panel-width',
		Number(settings.panelWidth || 320) + 'px'
	);
	titleEl.textContent = settings.title || 'Leaderboard';
}

function render(items) {
	var limit = Math.max(1, Number(settings.topN) || 5);
	var slice = (items || []).slice(0, limit);
	listEl.innerHTML = '';
	slice.forEach(function (entry, index) {
		var li = document.createElement('li');
		li.className = 'row';

		var left = document.createElement('div');
		left.className = 'left';

		var rank = document.createElement('span');
		rank.className = 'rank';
		if (settings.showRank === false) {
			rank.classList.add('hidden');
		}
		rank.textContent = String(entry.rank != null ? entry.rank : index + 1);

		var name = document.createElement('span');
		name.className = 'name';
		name.textContent = entry.name || entry.username || 'User';

		left.appendChild(rank);
		left.appendChild(name);

		var points = document.createElement('span');
		points.className = 'points';
		points.textContent = String(entry.points != null ? entry.points : 0);

		li.appendChild(left);
		li.appendChild(points);
		listEl.appendChild(li);
	});
}

applySettings({});
render([]);

${widgetRuntimeJs(overlayId, handlers)}
`;
}

function createLeaderboardManifest(overlayId: string, name: string): OverlayManifest {
	return {
		id: overlayId,
		name,
		framework: 'vanilla',
		version: 2,
		expectedEvents: ['update'],
		requiredPlugins: ['rankings'],
		settings: [
			{
				type: 'section',
				title: 'Content',
				fields: [
					{ type: 'text', key: 'title', name: 'Title', defaultValue: 'Leaderboard' },
					{
						type: 'slider',
						key: 'topN',
						name: 'Top N',
						min: 1,
						max: 25,
						step: 1,
						defaultValue: 5,
						unit: ''
					},
					{
						type: 'switch',
						key: 'showRank',
						name: 'Show rank numbers',
						defaultValue: true
					},
					{
						type: 'slider',
						key: 'rowGap',
						name: 'Row gap',
						min: 0,
						max: 24,
						step: 1,
						defaultValue: 8,
						unit: 'px'
					},
					{
						type: 'slider',
						key: 'panelWidth',
						name: 'Panel width',
						min: 200,
						max: 560,
						step: 10,
						defaultValue: 320,
						unit: 'px'
					},
					{
						type: 'color',
						key: 'rankColor',
						name: 'Rank color',
						defaultValue: '#94a3b8'
					},
					{
						type: 'color',
						key: 'pointsColor',
						name: 'Points color',
						defaultValue: '#f8fafc'
					}
				]
			},
			mergeStyleFields(
				styleSettingsSection({
					fontSize: 16,
					fontWeight: '600',
					padding: 16,
					textAlign: 'left',
					shadow: true
				}),
				[]
			),
			layoutSettingsSection({ alignX: 'right', alignY: 'top', offsetX: 24, offsetY: 24 })
		],
		testHandlers: [
			{
				label: 'Sample leaderboard',
				event: 'update',
				payload: {
					entries: [
						{ name: 'Alice', points: 1200, rank: 1 },
						{ name: 'Bob', points: 980, rank: 2 },
						{ name: 'Carol', points: 740, rank: 3 }
					]
				}
			}
		],
		actions: [
			{
				key: 'refresh-leaderboard',
				name: 'Hotkey → Refresh leaderboard',
				enabled: true,
				triggers: [{ triggerTypeId: 'core:core:input:hotkey' }],
				handlers: [
					{
						handlerTypeId: 'rankings:rankings:send-leaderboard-to-overlay',
						fields: [
							{ key: 'overlay', value: OVERLAY_SELF_FIELD_TOKEN },
							{ key: 'event', value: 'update' },
							{ key: 'limit', value: 5 }
						]
					}
				]
			}
		]
	};
}

export const leaderboardWidget: OverlayWidgetTemplate = {
	id: 'leaderboard',
	name: 'Leaderboard',
	description: 'Show top ranked users on stream.',
	icon: 'ri:trophy-line',
	defaultName: 'Leaderboard',
	buildFiles: (overlayId): OverlayProjectFile[] => [
		{ path: 'dist/index.html', content: leaderboardHtml() },
		{ path: 'dist/app.js', content: leaderboardJs(overlayId) }
	],
	createManifest: createLeaderboardManifest
};
