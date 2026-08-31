<script lang="ts">
	import type { WsConnectionLogEntry, WsLogDirection } from '../../lib/connection-logs';
	import { formatLogMessage } from '../../lib/format-log-message';
	import type { Connection } from '../lib/connection.svelte';

	import Icon from '@iconify/svelte';
	import { SvelteSet } from 'svelte/reactivity';

	import { Button } from '@stream-kit/ui/button';
	import { InputSwitch, InputText } from '@stream-kit/ui/input';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';
	import { tooltip } from '@stream-kit/ui/attachments';

	import { cn } from '@stream-kit/plugin/utils';

	import { getConnectionsService } from '../lib/get-connections';

	type Props = {
		connection: Connection;
	};

	let { connection }: Props = $props();
	const t = getConnectionsService().requireApp().i18n.t;
	const connections = getConnectionsService();

	let bottomAnchor = $state<HTMLDivElement | undefined>();

	let filterDirection = $state<'all' | WsLogDirection>('all');
	let searchQuery = $state('');
	let autoScroll = $state(true);
	let copiedId = $state<string | null>(null);
	const expandedIds = new SvelteSet<string>();

	const logs = $derived.by(() => {
		connections.logsRevision;

		if (!connection.id) {
			return [] as WsConnectionLogEntry[];
		}

		return connections.getLogs(connection.id);
	});

	const counts = $derived.by(() => {
		let inCount = 0;
		let outCount = 0;
		let systemCount = 0;

		for (const entry of logs) {
			if (entry.direction === 'in') inCount++;
			else if (entry.direction === 'out') outCount++;
			else if (entry.direction === 'system') systemCount++;
		}

		return {
			all: logs.length,
			in: inCount,
			out: outCount,
			system: systemCount
		};
	});

	const filteredLogs = $derived.by(() => {
		let list = logs;

		if (filterDirection !== 'all') {
			list = list.filter((entry) => entry.direction === filterDirection);
		}

		const query = searchQuery.trim().toLowerCase();
		if (query) {
			list = list.filter((entry) => entry.message.toLowerCase().includes(query));
		}

		return list;
	});

	const directionLabels: Record<WsLogDirection, string> = {
		in: t('Received'),
		out: t('Sent'),
		system: t('System')
	};

	const directionIcons: Record<WsLogDirection, string> = {
		in: 'ri:arrow-left-down-line',
		out: 'ri:arrow-right-up-line',
		system: 'ri:terminal-line'
	};

	const directionLineClasses: Record<WsLogDirection, string> = {
		in: 'border-l-2 border-success-500/60 bg-success-500/5 hover:bg-success-500/10',
		out: 'border-l-2 border-primary-400/60 bg-primary-500/5 hover:bg-primary-500/10',
		system: 'border-l-2 border-dark-500 bg-dark-500/5 hover:bg-dark-500/10'
	};

	const directionLabelClasses: Record<WsLogDirection, string> = {
		in: 'text-success-300',
		out: 'text-primary-300',
		system: 'text-dark-300'
	};

	function formatTimestamp(timestamp: number): string {
		return new Date(timestamp).toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			fractionalSecondDigits: 3
		});
	}

	function setExpanded(id: string, open: boolean) {
		if (open) {
			expandedIds.add(id);
		} else {
			expandedIds.delete(id);
		}
	}

	function handleCopy(id: string, text: string) {
		navigator.clipboard.writeText(text).then(() => {
			copiedId = id;
			setTimeout(() => {
				if (copiedId === id) {
					copiedId = null;
				}
			}, 2000);
		});
	}

	$effect(() => {
		filteredLogs;
		if (autoScroll) {
			bottomAnchor?.scrollIntoView({ block: 'end' });
		}
	});

	function handleClear() {
		if (!connection.id) {
			return;
		}

		connections.clearLogs(connection.id);
	}

	function handleSearchInput(event: Event) {
		searchQuery = (event.currentTarget as HTMLInputElement).value;
	}
</script>

<div class="grid h-[calc(100dvh-13.5rem)] min-h-72 grid-rows-[auto_auto_minmax(0,1fr)] gap-4">
	<!-- Header -->
	<div class="flex items-center justify-between gap-3 border-b border-rule pb-2">
		<div class="min-w-0 flex-1">
			<h3 class="truncate text-base font-semibold text-dark-50">
				{connection.name || t('WebSocket Logs')}
			</h3>
			<p class="mt-0.5 truncate font-mono text-xs text-dark-400">{connection.url}</p>
		</div>
		<div class="flex shrink-0 items-center gap-2">
			<Button
				type="button"
				variant="outline"
				size="sm"
				onclick={handleClear}
				class="flex items-center gap-1.5"
			>
				<Icon icon="ri:delete-bin-line" class="size-4" />
				<span>{t('Clear logs')}</span>
			</Button>
		</div>
	</div>

	<!-- Toolbar -->
	<div class="flex flex-col gap-3">
		<div class="flex flex-wrap items-center gap-2">
			<!-- All Filter -->
			<Button
				type="button"
				variant="outline"
				size="sm"
				class={cn(
					'flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
					filterDirection === 'all'
						? 'border-dark-500 bg-dark-600 font-semibold text-dark-50'
						: 'border-rule bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
				)}
				onclick={() => (filterDirection = 'all')}
			>
				<span>{t('All')}</span>
				<span class="border border-rule px-1 py-0.25 font-mono text-[10px] text-dark-400">
					{counts.all}
				</span>
			</Button>

			<!-- Received Filter -->
			<Button
				type="button"
				variant="outline"
				size="sm"
				class={cn(
					'flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
					filterDirection === 'in'
						? 'border-success-500/40 bg-success-500/15 font-semibold text-success-300'
						: 'border-rule bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
				)}
				onclick={() => (filterDirection = 'in')}
			>
				<Icon icon="ri:arrow-left-down-line" class="size-3.5 text-success-400" />
				<span>{t('Received')}</span>
				<span class="border border-rule px-1 py-0.25 font-mono text-[10px] text-dark-400">
					{counts.in}
				</span>
			</Button>

			<!-- Sent Filter -->
			<Button
				type="button"
				variant="outline"
				size="sm"
				class={cn(
					'flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
					filterDirection === 'out'
						? 'border-primary-500/40 bg-primary-500/15 font-semibold text-primary-300'
						: 'border-rule bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
				)}
				onclick={() => (filterDirection = 'out')}
			>
				<Icon icon="ri:arrow-right-up-line" class="size-3.5 text-primary-400" />
				<span>{t('Sent')}</span>
				<span class="border border-rule px-1 py-0.25 font-mono text-[10px] text-dark-400">
					{counts.out}
				</span>
			</Button>

			<!-- System Filter -->
			<Button
				type="button"
				variant="outline"
				size="sm"
				class={cn(
					'flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
					filterDirection === 'system'
						? 'border-dark-500/40 bg-dark-500/20 font-semibold text-dark-300'
						: 'border-rule bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
				)}
				onclick={() => (filterDirection = 'system')}
			>
				<Icon icon="ri:terminal-line" class="size-3.5 text-dark-400" />
				<span>{t('System')}</span>
				<span class="border border-rule px-1 py-0.25 font-mono text-[10px] text-dark-400">
					{counts.system}
				</span>
			</Button>
		</div>

		<div class="flex shrink-0 items-center gap-4">
			<div class="w-48 sm:w-56">
				<InputText
					placeholder={t('Filter logs…')}
					prependIcon="ri:search-line"
					value={searchQuery}
					oninput={handleSearchInput}
					size="sm"
				/>
			</div>
			<div class="flex shrink-0 items-center gap-2">
				<InputSwitch label={t('Auto-scroll')} bind:checked={autoScroll} />
			</div>
		</div>
	</div>

	<!-- Scrollable Logs Content -->
	<ScrollArea
		orientation="vertical"
		class="h-full min-h-0 overflow-hidden rounded-none border border-rule bg-dark-900 font-mono text-sm leading-normal"
		viewportClasses="h-full"
	>
		{#if logs.length === 0}
			<div
				class="flex h-full min-h-64 flex-col items-center justify-center px-4 py-12 text-center"
			>
				<div class="mb-3 border border-rule bg-dark-800 p-3 text-dark-500">
					<Icon icon="ri:bubble-chart-line" class="size-8 animate-pulse" />
				</div>
				<h4 class="font-sans text-sm font-semibold text-dark-200">
					{t('No messages yet')}
				</h4>
				<p class="mt-1 max-w-xs font-sans text-xs leading-relaxed text-dark-400">
					{t('Connect and send or receive data to see live logs here.')}
				</p>
			</div>
		{:else if filteredLogs.length === 0}
			<div
				class="flex h-full min-h-64 flex-col items-center justify-center px-4 py-12 text-center"
			>
				<div class="mb-3 border border-rule bg-dark-800 p-3 text-dark-500">
					<Icon icon="ri:search-eye-line" class="size-8" />
				</div>
				<h4 class="font-sans text-sm font-semibold text-dark-200">
					{t('No matching logs')}
				</h4>
				<p class="mt-1 max-w-xs font-sans text-xs leading-relaxed text-dark-400">
					{t('No logs match your current filter or search criteria.')}
				</p>
			</div>
		{:else}
			<div>
				{#each filteredLogs as entry (entry.id)}
					{@const formatted = formatLogMessage(entry.message)}
					<div
						class={cn(
							'group relative border-b border-rule px-4 py-2 transition-colors last:border-b-0',
							directionLineClasses[entry.direction]
						)}
					>
						<!-- Floating Copy Button -->
						<div
							class="absolute top-2 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								class="flex size-7 cursor-pointer items-center justify-center rounded-md border border-rule bg-dark-800 text-dark-400 shadow-md transition-all hover:bg-dark-700 hover:text-dark-100"
								aria-label={copiedId === entry.id ? t('Copied') : t('Copy message')}
								onclick={() => handleCopy(entry.id, entry.message)}
								{@attach tooltip(() =>
									copiedId === entry.id ? t('Copied') : t('Copy message')
								)}
							>
								{#if copiedId === entry.id}
									<Icon
										icon="ri:check-line"
										class="size-4 animate-in text-success-400 duration-150 zoom-in-50"
									/>
								{:else}
									<Icon icon="ri:file-copy-line" class="size-4" />
								{/if}
							</Button>
						</div>

						<!-- Log Info Header -->
						<div class="mb-1 flex items-center gap-2">
							<time
								class="font-mono text-xs text-dark-500 tabular-nums"
								datetime={new Date(entry.timestamp).toISOString()}
							>
								{formatTimestamp(entry.timestamp)}
							</time>

							<div class="flex items-center gap-1">
								<Icon
									icon={directionIcons[entry.direction]}
									class={cn('size-3.5', directionLabelClasses[entry.direction])}
								/>
								<span
									class={cn(
										'text-[10px] font-bold tracking-wider uppercase',
										directionLabelClasses[entry.direction]
									)}
								>
									{directionLabels[entry.direction]}
								</span>
							</div>
						</div>

						<!-- Log Content -->
						{#if formatted.collapsible}
							<details
								class="group/msg mt-1"
								ontoggle={(event) => {
									setExpanded(
										entry.id,
										(event.currentTarget as HTMLDetailsElement).open
									);
								}}
							>
								<summary
									class="flex cursor-pointer list-none items-start gap-1.5 pr-8 [&::-webkit-details-marker]:hidden"
									aria-label={t('Show full message')}
								>
									<Icon
										icon="ri:arrow-right-s-line"
										class="mt-0.5 size-3.5 shrink-0 text-dark-400 transition-transform group-open/msg:rotate-90"
									/>
									<code
										class="min-w-0 font-mono text-xs break-all whitespace-pre-wrap text-dark-100"
									>
										{formatted.preview}
									</code>
								</summary>
								{#if expandedIds.has(entry.id)}
									<pre
										class="m-0 mt-1.5 overflow-x-auto rounded-none border border-rule bg-dark-950/40 p-2.5 font-mono text-xs text-dark-200"><code
											>{formatted.getPretty()}</code
										></pre>
								{/if}
							</details>
						{:else}
							<code
								class="block pr-8 font-mono text-xs break-all whitespace-pre-wrap text-dark-100"
							>
								{formatted.preview}
							</code>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
		<div bind:this={bottomAnchor} aria-hidden="true"></div>
	</ScrollArea>
</div>
