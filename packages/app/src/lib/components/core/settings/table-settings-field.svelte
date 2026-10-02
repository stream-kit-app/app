<script lang="ts">
	import type { SettingsContext } from '$lib/core/settings/context';
	import type {
		SettingsFieldDefinition,
		SettingsTableActionDefinition,
		SettingsTableRow
	} from '$lib/core/settings/field';
	import type { PluginAppApi } from '$lib/core/plugins';

	import { onDestroy } from 'svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Button } from '@stream-kit/ui/button';
	import { COPIED_ICON, COPY_ICON, CopyFeedback, copyToClipboard } from '@stream-kit/ui/copy-button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText, Label } from '@stream-kit/ui/input';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { resolveTableRows, toSettingsTableRowsSource } from '$lib/core/settings/resolve-table-rows.svelte';

	type Props = {
		config: Extract<SettingsFieldDefinition, { type: 'table' }>;
		context: SettingsContext;
	};

	let { config, context }: Props = $props();
	const { t } = useI18n();

	let search = $state('');
	let busyAction = $state<string | null>(null);
	const copyFeedback = new CopyFeedback();

	onDestroy(() => copyFeedback.destroy());

	const tableRows = resolveTableRows(
		() => toSettingsTableRowsSource(config.rows, context),
		() => config.rowsReload?.(context)
	);

	const rowKey = $derived(config.rowKey ?? config.columns[0]?.key ?? 'key');

	const searchKeys = $derived(
		config.searchKeys ?? config.columns.map((column) => column.key)
	);

	const gridStyle = $derived.by(() => {
		const parts = config.columns.map(() => 'minmax(0, 1fr)');

		if (config.actions?.length) {
			parts.push('auto');
		}

		return `grid-template-columns: ${parts.join(' ')}`;
	});

	const filteredRows = $derived.by(() => {
		if (config.searchable === false) {
			return tableRows.rows;
		}

		const query = search.trim().toLowerCase();

		if (!query) {
			return tableRows.rows;
		}

		return tableRows.rows.filter((row) => {
			const haystack = searchKeys
				.map((key) => row[key] ?? '')
				.join(' ')
				.toLowerCase();

			return haystack.includes(query);
		});
	});

	function rowIdentity(row: SettingsTableRow): string {
		return row[rowKey] ?? Object.values(row).join('\0');
	}

	async function runAction(
		action: SettingsTableActionDefinition,
		row: SettingsTableRow
	): Promise<void> {
		const actionId = `${action.key}:${rowIdentity(row)}`;

		if (busyAction === actionId) {
			return;
		}

		const value = row[action.columnKey] ?? '';

		if (!value) {
			return;
		}

		busyAction = actionId;

		try {
			if (action.onCopy) {
				await action.onCopy(context, row, value);
				copyFeedback.mark(actionId);
				return;
			}

			const app = context.app as PluginAppApi;

			if (!(await copyToClipboard(value))) {
				app.toast.create({ title: t('Could not copy'), variant: 'warning' });
				return;
			}

			copyFeedback.mark(actionId);
			app.toast.create({
				title: t('Copied'),
				description: value,
				variant: 'success'
			});
		} finally {
			busyAction = null;
		}
	}
</script>

<div class="grid gap-3">
	<div class="flex flex-col gap-1">
		<Label>{config.name}</Label>
		{#if config.description}
			<p class="text-sm text-dark-100">{config.description}</p>
		{/if}
	</div>

	{#if config.searchable !== false}
		<InputText
			label={t('Search')}
			placeholder={config.searchPlaceholder ?? t('Search values')}
			value={search}
			oninput={(event) => {
				search = event.currentTarget.value;
			}}
		/>
	{/if}

	<div class="overflow-hidden rounded-xl border border-rule">
		<div
			class="grid gap-3 border-b border-rule bg-dark-700/40 px-3 py-2 text-xs font-medium text-dark-200"
			style={gridStyle}
		>
			{#each config.columns as column (column.key)}
				<span class={column.class}>{column.header}</span>
			{/each}
			{#if config.actions?.length}
				<span class="sr-only">{t('Actions')}</span>
			{/if}
		</div>

		<ScrollArea orientation="vertical" viewportClasses="max-h-80">
			{#if tableRows.loading}
				<p class="px-3 py-6 text-sm text-dark-300">
					{config.loadingPlaceholder ?? t('Loading…')}
				</p>
			{:else if filteredRows.length === 0}
				<EmptyState
					compact
					class="p-3"
					icon={search.trim() ? 'ri:search-line' : 'ri:inbox-line'}
					title={search.trim()
						? t('No values match your search.')
						: (config.emptyLabel ?? t('No values found.'))}
				/>
			{:else}
				<ul>
					{#each filteredRows as row (rowIdentity(row))}
						<li
							class={cn(
								'grid items-center gap-3 border-b border-rule px-3 py-2 last:border-b-0',
								'transition hover:bg-dark-700/40'
							)}
							style={gridStyle}
						>
							{#each config.columns as column (column.key)}
								{@const cell = row[column.key] ?? ''}
								{#if column.mono}
									<code
										class={cn(
											'truncate font-mono text-xs text-dark-100',
											column.class
										)}
										title={cell}
									>
										{cell}
									</code>
								{:else}
									<span
										class={cn('truncate text-sm text-dark-50', column.class)}
										title={cell}
									>
										{cell}
									</span>
								{/if}
							{/each}
							{#if config.actions?.length}
								<div class="flex items-center gap-1">
									{#each config.actions as action (action.key)}
										{@const actionId = `${action.key}:${rowIdentity(row)}`}
										{@const isBusy = busyAction === actionId}
										{@const copied = copyFeedback.isCopied(actionId)}
										{@const label = action.ariaLabel ?? t('Copy')}
										<Button
											type="button"
											variant="ghost"
											size="icon-sm"
											disabled={isBusy}
											aria-label={label}
											icon={isBusy
												? 'ri:loader-4-line'
												: copied
													? COPIED_ICON
													: (action.icon ?? COPY_ICON)}
											class={cn('transition-none', copied && 'text-success-400')}
											iconClass={cn(isBusy && 'animate-spin')}
											onclick={() => void runAction(action, row)}
											{@attach tooltip(() => (copied ? t('Copied') : label))}
										/>
									{/each}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</ScrollArea>
	</div>
</div>
