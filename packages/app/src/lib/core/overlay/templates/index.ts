import type { OverlayTemplateId } from '../types';

export type OverlayTemplate = {
	id: OverlayTemplateId;
	name: string;
	description: string;
	width: number;
	height: number;
	expectedEvents: string[];
	context: Record<string, unknown>;
	files: Array<{ path: string; content: string }>;
};

const blankApp = `<script lang="ts">
	import { createOverlay } from '@stream-kit/overlay-sdk';

	const overlay = createOverlay({
		handlers: {
			event: (payload) => {
				console.log('Overlay event received', payload);
			}
		}
	});
</script>

<main>
	<p>Overlay ready. Edit App.svelte to customize this overlay.</p>
	<p>Overlay ID: {overlay.overlayId}</p>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		color: #fff;
		background: transparent;
	}

	main {
		padding: 1rem;
	}
</style>
`;

const chatApp = `<script lang="ts">
	import { createOverlay } from '@stream-kit/overlay-sdk';

	type ChatMessage = {
		username?: string;
		message?: string;
		color?: string;
	};

	let messages = $state<ChatMessage[]>([]);
	const maxMessages = 50;

	createOverlay({
		handlers: {
			message: (payload) => {
				const entry = payload as ChatMessage;
				messages = [...messages.slice(-(maxMessages - 1)), entry];
			},
			clear: () => {
				messages = [];
			}
		}
	});
</script>

<ul>
	{#each messages as item}
		<li>
			<strong style:color={item.color ?? '#9146ff'}>{item.username ?? 'Anonymous'}</strong>:
			{item.message ?? ''}
		</li>
	{/each}
</ul>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		color: #fff;
		background: transparent;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	li {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
	}
</style>
`;

const alertApp = `<script lang="ts">
	import { createOverlay } from '@stream-kit/overlay-sdk';

	type AlertPayload = {
		title?: string;
		message?: string;
		username?: string;
	};

	let alert = $state<AlertPayload | null>(null);
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	function showAlert(payload: AlertPayload) {
		alert = payload;

		if (hideTimer) {
			clearTimeout(hideTimer);
		}

		hideTimer = setTimeout(() => {
			alert = null;
		}, 5000);
	}

	createOverlay({
		handlers: {
			alert: (payload) => showAlert(payload as AlertPayload),
			clear: () => {
				alert = null;
			}
		}
	});
</script>

{#if alert}
	<section>
		<h1>{alert.title ?? 'Alert'}</h1>
		{#if alert.username}
			<p class="username">{alert.username}</p>
		{/if}
		{#if alert.message}
			<p>{alert.message}</p>
		{/if}
	</section>
{/if}

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		background: transparent;
	}

	section {
		margin: 2rem auto;
		padding: 1.5rem 2rem;
		max-width: 28rem;
		border-radius: 1rem;
		background: rgba(15, 15, 18, 0.9);
		color: #fff;
		text-align: center;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
		animation: pop-in 350ms ease;
	}

	.username {
		font-size: 1.5rem;
		font-weight: 700;
		color: #9146ff;
	}

	@keyframes pop-in {
		from {
			opacity: 0;
			transform: scale(0.9) translateY(12px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
`;

export const OVERLAY_TEMPLATES: OverlayTemplate[] = [
	{
		id: 'blank',
		name: 'Blank',
		description: 'Minimal starter overlay with a single event handler.',
		width: 800,
		height: 600,
		expectedEvents: ['event'],
		context: {},
		files: [{ path: 'src/App.svelte', content: blankApp }]
	},
	{
		id: 'chat',
		name: 'Chat',
		description: 'Displays chat messages pushed from actions.',
		width: 400,
		height: 800,
		expectedEvents: ['message', 'clear'],
		context: { maxMessages: 50 },
		files: [{ path: 'src/App.svelte', content: chatApp }]
	},
	{
		id: 'alert',
		name: 'Alert',
		description: 'Shows temporary alert popups from actions.',
		width: 800,
		height: 600,
		expectedEvents: ['alert', 'clear'],
		context: { durationMs: 5000 },
		files: [{ path: 'src/App.svelte', content: alertApp }]
	}
];

export function getOverlayTemplate(id: OverlayTemplateId): OverlayTemplate {
	const template = OVERLAY_TEMPLATES.find((item) => item.id === id);

	if (!template) {
		throw new Error(`Unknown overlay template: ${id}`);
	}

	return template;
}
