<script lang="ts">
	import type { LogViewerEntry, LogViewerLevel } from './types';
	import type { FormEventHandler } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { onDestroy } from 'svelte';

	import { cn } from '../../utils';
	import { Button } from '../button';
	import { InputSwitch, InputText } from '../input';
	import { ScrollArea } from '../scroll-area';

	type Props = {
		entries: LogViewerEntry[];
		title?: string;
		subtitle?: string;
		allLabel?: string;
		infoLabel?: string;
		warnLabel?: string;
		errorLabel?: string;
		debugLabel?: string;
		searchPlaceholder?: string;
		autoScrollLabel?: string;
		clearLabel?: string;
		copyLabel?: string;
		copiedLabel?: string;
		emptyLabel?: string;
		emptyDescription?: string;
		filteredEmptyLabel?: string;
		filteredEmptyDescription?: string;
		onClear?: () => void;
		class?: string;
	};

	let {
		entries,
		title = 'Action logs',
		subtitle,
		allLabel = 'All',
		infoLabel = 'Info',
		warnLabel = 'Warning',
		errorLabel = 'Error',
		debugLabel = 'Debug',
		searchPlaceholder = 'Filter logs…',
		autoScrollLabel = 'Auto-scroll',
		clearLabel = 'Clear logs',
		copyLabel = 'Copy',
		copiedLabel = 'Copied',
		emptyLabel = 'No log entries yet.',
		emptyDescription = 'Run an action with a Log handler to see entries here.',
		filteredEmptyLabel = 'No matching logs',
		filteredEmptyDescription = 'No logs match your current filter or search criteria.',
		onClear,
		class: className
	}: Props = $props();

	let filterLevel = $state<'all' | LogViewerLevel>('all');
	let searchQuery = $state('');
	let autoScroll = $state(true);
	let copiedId = $state<string | null>(null);
	let bottomAnchor = $state<HTMLDivElement | undefined>();

	const counts = $derived.by(() => {
		let info = 0;
		let warn = 0;
		let error = 0;
		let debug = 0;

		for (const entry of entries) {
			if (entry.level === 'info') info++;
			else if (entry.level === 'warn') warn++;
			else if (entry.level === 'error') error++;
			else if (entry.level === 'debug') debug++;
		}

		return {
			all: entries.length,
			info,
			warn,
			error,
			debug
		};
	});

	const filteredEntries = $derived.by(() => {
		let list = entries;

		if (filterLevel !== 'all') {
			list = list.filter((entry) => entry.level === filterLevel);
		}

		const query = searchQuery.trim().toLowerCase();

		if (query) {
			list = list.filter(
				(entry) =>
					entry.message.toLowerCase().includes(query) ||
					entry.actionName?.toLowerCase().includes(query) ||
					entry.trigger?.toLowerCase().includes(query)
			);
		}

		const seenIds = new Set<string>();

		return list.filter((entry) => {
			if (seenIds.has(entry.id)) {
				return false;
			}

			seenIds.add(entry.id);
			return true;
		});
	});

	const levelIcons: Record<LogViewerLevel, string> = {
		info: 'ri:information-line',
		warn: 'ri:alert-line',
		error: 'ri:error-warning-line',
		debug: 'ri:bug-line'
	};

	const levelLineClasses: Record<LogViewerLevel, string> = {
		info: 'border-l-2 border-primary-400/60 bg-primary-500/5 hover:bg-primary-500/10',
		warn: 'border-l-2 border-warning-500/60 bg-warning-500/5 hover:bg-warning-500/10',
		error: 'border-l-2 border-destructive-500/60 bg-destructive-500/5 hover:bg-destructive-500/10',
		debug: 'border-l-2 border-dark-500 bg-dark-500/5 hover:bg-dark-500/10'
	};

	const levelLabelClasses: Record<LogViewerLevel, string> = {
		info: 'text-primary-300',
		warn: 'text-warning-300',
		error: 'text-destructive-300',
		debug: 'text-dark-300'
	};

	const levelFilterActiveClasses: Record<LogViewerLevel, string> = {
		info: 'border-primary-500/40 bg-primary-500/15 font-semibold text-primary-300',
		warn: 'border-warning-500/40 bg-warning-500/15 font-semibold text-warning-300',
		error: 'border-destructive-500/40 bg-destructive-500/15 font-semibold text-destructive-300',
		debug: 'border-dark-500/40 bg-dark-500/20 font-semibold text-dark-300'
	};

	const levelFilterIconClasses: Record<LogViewerLevel, string> = {
		info: 'text-primary-400',
		warn: 'text-warning-400',
		error: 'text-destructive-400',
		debug: 'text-dark-400'
	};

	const levelLabels = $derived<Record<LogViewerLevel, string>>({
		info: infoLabel,
		warn: warnLabel,
		error: errorLabel,
		debug: debugLabel
	});

	function formatTimestamp(timestamp: number): string {
		return new Date(timestamp).toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			fractionalSecondDigits: 3
		});
	}

	function parseJsonMessage(message: string): string | null {
		try {
			return JSON.stringify(JSON.parse(message), null, 2);
		} catch {
			return null;
		}
	}

	let copyTimeout: ReturnType<typeof setTimeout> | undefined;

	function handleCopy(id: string, text: string): void {
		void navigator.clipboard.writeText(text).then(() => {
			copiedId = id;

			if (copyTimeout) {
				clearTimeout(copyTimeout);
			}

			copyTimeout = setTimeout(() => {
				if (copiedId === id) {
					copiedId = null;
				}

				copyTimeout = undefined;
			}, 2000);
		});
	}

	onDestroy(() => {
		if (copyTimeout) {
			clearTimeout(copyTimeout);
		}
	});

	const onSearchInput: FormEventHandler<HTMLInputElement> = (event) => {
		searchQuery = event.currentTarget.value;
	};

	$effect(() => {
		filteredEntries;

		if (autoScroll) {
			bottomAnchor?.scrollIntoView({ block: 'end' });
		}
	});
</script>

<div
	class={cn(
		'grid h-[calc(100dvh-8rem)] min-h-72 grid-rows-[auto_auto_minmax(0,1fr)] gap-4',
		className
	)}
>
	<div class="flex items-center justify-between gap-3 border-b border-dark-800 pb-2">
		<div class="min-w-0 flex-1">
			<h3 class="truncate text-base font-semibold text-dark-50">{title}</h3>
			{#if subtitle}
				<p class="mt-0.5 truncate text-xs text-dark-400">{subtitle}</p>
			{/if}
		</div>
		{#if onClear}
			<Button
				type="button"
				variant="outline"
				size="sm"
				onclick={onClear}
				class="flex items-center gap-1.5"
			>
				<Icon icon="ri:delete-bin-line" class="size-4" />
				<span>{clearLabel}</span>
			</Button>
		{/if}
	</div>

	<div class="flex flex-col gap-3">
		<div class="flex flex-wrap items-center gap-2">
			<Button
				type="button"
				variant="outline"
				size="sm"
				class={cn(
					'flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
					filterLevel === 'all'
						? 'border-dark-500 bg-dark-600 font-semibold text-dark-50'
						: 'border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
				)}
				onclick={() => (filterLevel = 'all')}
			>
				<span>{allLabel}</span>
				<span class="rounded bg-dark-900 px-1 py-0.25 font-mono text-xs text-dark-400">
					{counts.all}
				</span>
			</Button>

			{#each ['info', 'warn', 'error', 'debug'] as level (level)}
				{@const typedLevel = level as LogViewerLevel}
				<Button
					type="button"
					variant="outline"
					size="sm"
					class={cn(
						'flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
						filterLevel === typedLevel
							? levelFilterActiveClasses[typedLevel]
							: 'border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
					)}
					onclick={() => (filterLevel = typedLevel)}
				>
					<Icon
						icon={levelIcons[typedLevel]}
						class={cn('size-3.5', levelFilterIconClasses[typedLevel])}
					/>
					<span>{levelLabels[typedLevel]}</span>
					<span
						class="rounded bg-dark-900/60 px-1 py-0.25 font-mono text-xs text-dark-400"
					>
						{counts[typedLevel]}
					</span>
				</Button>
			{/each}
		</div>

		<div class="flex shrink-0 items-center gap-4">
			<div class="w-48 sm:w-56">
				<InputText
					placeholder={searchPlaceholder}
					prependIcon="ri:search-line"
					value={searchQuery}
					oninput={onSearchInput}
					size="sm"
				/>
			</div>
			<div class="flex shrink-0 items-center gap-2">
				<InputSwitch label={autoScrollLabel} bind:checked={autoScroll} />
			</div>
		</div>
	</div>

	<ScrollArea
		orientation="vertical"
		class="h-full min-h-0 overflow-hidden rounded-none border border-rule bg-dark-900 font-mono text-sm leading-normal shadow-inner"
		viewportClasses="h-full"
	>
		{#if entries.length === 0}
			<div
				class="flex h-full min-h-64 flex-col items-center justify-center px-4 py-12 text-center"
			>
				<div class="mb-3 rounded-full bg-dark-800 p-3 text-dark-500">
					<Icon icon="ri:bubble-chart-line" class="size-8" />
				</div>
				<h4 class="font-sans text-sm font-semibold text-dark-200">{emptyLabel}</h4>
				<p class="mt-1 max-w-xs font-sans text-xs leading-relaxed text-dark-400">
					{emptyDescription}
				</p>
			</div>
		{:else if filteredEntries.length === 0}
			<div
				class="flex h-full min-h-64 flex-col items-center justify-center px-4 py-12 text-center"
			>
				<div class="mb-3 rounded-full bg-dark-800 p-3 text-dark-500">
					<Icon icon="ri:search-eye-line" class="size-8" />
				</div>
				<h4 class="font-sans text-sm font-semibold text-dark-200">{filteredEmptyLabel}</h4>
				<p class="mt-1 max-w-xs font-sans text-xs leading-relaxed text-dark-400">
					{filteredEmptyDescription}
				</p>
			</div>
		{:else}
			<div>
				{#each filteredEntries as entry (entry.id)}
					{@const displayMessage = parseJsonMessage(entry.message) ?? entry.message}
					{@const isMultiline = displayMessage.includes('\n')}
					<div
						class={cn(
							'group relative border-b border-dark-800/60 px-4 py-2 transition-colors last:border-b-0',
							levelLineClasses[entry.level]
						)}
					>
						<div
							class="absolute top-2 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								class="flex size-7 cursor-pointer items-center justify-center rounded-md border border-dark-700 bg-dark-800 text-dark-400 shadow-md transition-all hover:bg-dark-700 hover:text-dark-100"
								title={copyLabel}
								onclick={() => handleCopy(entry.id, entry.message)}
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

						<div class="mb-1 flex flex-wrap items-center gap-2">
							<time
								class="font-mono text-xs text-dark-300 tabular-nums"
								datetime={new Date(entry.timestamp).toISOString()}
							>
								{formatTimestamp(entry.timestamp)}
							</time>

							<div class="flex items-center gap-1">
								<Icon
									icon={levelIcons[entry.level]}
									class={cn('size-3.5', levelLabelClasses[entry.level])}
								/>
								<span
									class={cn(
										'text-xs font-bold tracking-wider uppercase',
										levelLabelClasses[entry.level]
									)}
								>
									{levelLabels[entry.level]}
								</span>
							</div>

							{#if entry.actionName || entry.trigger}
								<span class="font-sans text-xs text-dark-300">
									{#if entry.actionName}
										<span>{entry.actionName}</span>
									{/if}
									{#if entry.actionName && entry.trigger}
										<span> · </span>
									{/if}
									{#if entry.trigger}
										<span>{entry.trigger}</span>
									{/if}
								</span>
							{/if}
						</div>

						{#if isMultiline}
							<pre
								class="m-0 mt-1 overflow-x-auto rounded-lg border border-dark-800/40 bg-dark-950/40 p-2.5 font-mono text-xs text-dark-200"><code
									>{displayMessage}</code
								></pre>
						{:else}
							<code
								class="block pr-8 font-mono text-xs break-all whitespace-pre-wrap text-dark-100"
							>
								{displayMessage}
							</code>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
		<div bind:this={bottomAnchor} aria-hidden="true"></div>
	</ScrollArea>
</div>
