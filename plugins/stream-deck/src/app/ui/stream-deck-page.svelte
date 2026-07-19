<script lang="ts">
	import type { RegisteredButton } from '../../lib/types';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { DataTable } from '@stream-kit/ui/data-table';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { Heading } from '@stream-kit/ui/heading';

	import { getStreamDeckService } from '../lib/get-stream-deck';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const service = getStreamDeckService();

	let revision = $state(0);

	$effect(() => {
		const unsubscribe = service.onStatusChange(() => {
			revision += 1;
		});

		return unsubscribe;
	});

	const status = $derived.by(() => {
		void revision;
		return service.getStatus();
	});

	const buttons = $derived.by(() => {
		void revision;
		return service.listButtons();
	});

	$effect(() => {
		app.toolbar.set({
			meta: [
				{
					icon: 'ri:keyboard-box-line',
					label: status.pluginConnected ? t('Plugin connected') : t('Plugin disconnected')
				},
				{
					icon: 'ri:grid-line',
					label: t('{count} buttons', { count: status.buttonCount })
				}
			]
		});
	});

	function formatWhen(value: string | null): string {
		if (!value) {
			return t('Never');
		}

		try {
			return new Date(value).toLocaleString();
		} catch {
			return value;
		}
	}

	function formatCoordinates(column?: number, row?: number): string {
		if (column === undefined && row === undefined) {
			return '—';
		}

		return `${column ?? '?'},${row ?? '?'}`;
	}
</script>

{#snippet aliasCell(button: RegisteredButton)}
	<span class="text-dark-100">{button.alias || '—'}</span>
{/snippet}

{#snippet contextCell(button: RegisteredButton)}
	<span class="font-mono text-xs text-dark-300">{button.context}</span>
{/snippet}

{#snippet positionCell(button: RegisteredButton)}
	<span class="text-dark-200">
		{formatCoordinates(button.coordinates?.column, button.coordinates?.row)}
	</span>
{/snippet}

{#snippet deviceCell(button: RegisteredButton)}
	<span class="font-mono text-xs text-dark-300">{button.device || '—'}</span>
{/snippet}

{#snippet actionCell(button: RegisteredButton)}
	<span class="font-mono text-xs text-dark-300">{button.actionUUID || '—'}</span>
{/snippet}

<Container class="space-y-6 py-6">
	<section class="space-y-3">
		<Heading level={2}>{t('Setup')}</Heading>
		<Alert
			icon="ri:information-line"
			title={t('API Server required')}
			description={t(
				'Enable the WebSocket API Server under Settings → API Server, then enter the host, port, and access token in the Stream Deck plugin Property Inspector.'
			)}
		/>
		<div class="flex flex-wrap gap-2">
			<Button href="/settings" variant="secondary" icon="ri:settings-3-line">
				{t('Open API Server settings')}
			</Button>
		</div>
		<p class="text-sm text-dark-300">
			{t(
				'Install the Stream Kit Stream Deck plugin in the Elgato Stream Deck app (dev: link the package under integrations/stream-deck). Assign Run Action, Toggle Action, or Dial Control keys and optionally set a button Alias for feedback handlers.'
			)}
		</p>
	</section>

	<section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-xl border border-dark-700 bg-dark-800/40 px-4 py-3">
			<p class="text-xs tracking-wide text-dark-400 uppercase">{t('Elgato plugin')}</p>
			<div class="mt-2">
				<Badge variant={status.pluginConnected ? 'success' : 'default'} size="sm">
					{status.pluginConnected ? t('Connected') : t('Disconnected')}
				</Badge>
			</div>
		</div>
		<div class="rounded-xl border border-dark-700 bg-dark-800/40 px-4 py-3">
			<p class="text-xs tracking-wide text-dark-400 uppercase">{t('Registered buttons')}</p>
			<p class="mt-2 text-lg font-semibold text-dark-100">{status.buttonCount}</p>
		</div>
		<div class="rounded-xl border border-dark-700 bg-dark-800/40 px-4 py-3">
			<p class="text-xs tracking-wide text-dark-400 uppercase">{t('Last event')}</p>
			<p class="mt-2 text-sm font-medium text-dark-100">{status.lastEventType ?? '—'}</p>
		</div>
		<div class="rounded-xl border border-dark-700 bg-dark-800/40 px-4 py-3">
			<p class="text-xs tracking-wide text-dark-400 uppercase">{t('Last event at')}</p>
			<p class="mt-2 text-sm font-medium text-dark-100">{formatWhen(status.lastEventAt)}</p>
		</div>
	</section>

	<section class="space-y-3">
		<Heading level={2}>{t('Registered buttons')}</Heading>
		{#if buttons.length === 0}
			<EmptyState
				icon="ri:keyboard-box-line"
				title={t('No buttons registered yet')}
				description={t(
					'Place a Stream Kit action on your Stream Deck and open the profile so keys call willAppear / registerButton.'
				)}
			/>
		{:else}
			<DataTable
				data={buttons}
				getRowKey={(button) => button.context}
				empty={t('No buttons registered yet')}
				maxHeight="max-h-[min(36rem,70vh)]"
				columns={[
					{ id: 'alias', header: t('Alias'), cell: aliasCell, class: 'w-36' },
					{ id: 'context', header: t('Context'), cell: contextCell },
					{ id: 'position', header: t('Position'), cell: positionCell, class: 'w-24' },
					{ id: 'device', header: t('Device'), cell: deviceCell, class: 'w-40' },
					{ id: 'action', header: t('Action'), cell: actionCell }
				]}
			/>
		{/if}
	</section>
</Container>
