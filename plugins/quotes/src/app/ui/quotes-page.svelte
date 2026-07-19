<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import type { QuoteRecord } from '../../lib/types';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { DataTable } from '@stream-kit/ui/data-table';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText } from '@stream-kit/ui/input';

	import { Quote } from '../lib/quote.svelte';
	import { tryGetQuotesService } from '../lib/get-quotes';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const quotesService = $derived(tryGetQuotesService());
	const quotes = $derived(quotesService?.list() ?? []);

	let search = $state('');

	const filtered = $derived.by(() => {
		const query = search.trim().toLowerCase();

		if (!query) {
			return quotes;
		}

		return quotes.filter((quote) => {
			return (
				String(quote.id).includes(query) ||
				quote.text.toLowerCase().includes(query) ||
				quote.addedBy.toLowerCase().includes(query)
			);
		});
	});

	const totalCount = $derived(quotes.length);

	$effect(() => {
		app.toolbar.set({
			meta:
				totalCount > 0
					? [
							{
								icon: 'ri:double-quotes-l',
								label: t('{count} quotes', { count: totalCount })
							}
						]
					: [],
			primaryActions: [
				{
					id: 'add-quote',
					label: t('Add quote'),
					icon: 'ri:add-fill',
					onClick: () => Quote.createDraft().open()
				}
			]
		});
	});

	function formatDate(value: string): string {
		try {
			return new Date(value).toLocaleString();
		} catch {
			return value;
		}
	}

	async function deleteQuote(quote: QuoteRecord): Promise<void> {
		if (!quotesService) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Delete quote #{id}?', { id: quote.id }),
			description: t('This cannot be undone.'),
			confirmLabel: t('Delete')
		});

		if (!confirmed) {
			return;
		}

		try {
			await quotesService.delete(quote.id);
			app.toast.create({
				title: t('Quote deleted'),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Could not delete quote'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}
</script>

{#snippet idCell(quote: QuoteRecord)}
	<span class="tabular-nums font-medium text-dark-100">#{quote.id}</span>
{/snippet}

{#snippet textCell(quote: QuoteRecord)}
	<button
		type="button"
		class="cursor-pointer text-left text-dark-100 hover:text-primary"
		onclick={() => Quote.fromRecord(quote).open()}
	>
		<span class="line-clamp-2">{quote.text}</span>
	</button>
{/snippet}

{#snippet addedByCell(quote: QuoteRecord)}
	<span class="text-dark-300">{quote.addedBy}</span>
{/snippet}

{#snippet dateCell(quote: QuoteRecord)}
	<span class="tabular-nums text-dark-400">{formatDate(quote.createdAt)}</span>
{/snippet}

{#snippet actionsCell(quote: QuoteRecord)}
	<div class="flex items-center justify-end gap-1">
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon="ri:edit-line"
			aria-label={t('Edit quote')}
			onclick={() => Quote.fromRecord(quote).open()}
			{@attach tooltip(() => t('Edit'))}
		/>
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon="ri:delete-bin-line"
			aria-label={t('Delete quote')}
			onclick={() => void deleteQuote(quote)}
			{@attach tooltip(() => t('Delete'))}
		/>
	</div>
{/snippet}

{#if !quotesService}
	<EmptyState
		icon="ri:double-quotes-l"
		title={t('Quotes unavailable')}
		description={t('Enable the Quotes plugin to manage saved quotes.')}
	/>
{:else if quotes.length === 0}
	<EmptyState
		icon="ri:double-quotes-l"
		title={t('No quotes yet')}
		description={t('Save memorable chat moments, or enable !addquote under Bot → Commands.')}
		actionLabel={t('Add quote')}
		onAction={() => Quote.createDraft().open()}
	/>
{:else}
	<div class="flex min-h-full flex-1 flex-col">
		<Container class="shrink-0 px-6 pt-6" size="md">
			<InputText
				label={t('Search')}
				value={search}
				placeholder={t('Search quotes')}
				class="max-w-md"
				oninput={(event) => {
					search = (event.currentTarget as HTMLInputElement).value;
				}}
			/>
		</Container>
		{#if filtered.length === 0}
			<EmptyState
				icon="ri:double-quotes-l"
				title={t('No quotes found')}
				description={t('Try a different search term.')}
			/>
		{:else}
			<Container class="px-6 py-6" size="md">
				<DataTable
					data={filtered}
					getRowKey={(quote) => String(quote.id)}
					empty={t('No quotes found')}
					maxHeight="max-h-[min(36rem,70vh)]"
					columns={[
						{ id: 'id', header: t('ID'), cell: idCell, class: 'w-16' },
						{ id: 'text', header: t('Quote'), cell: textCell },
						{ id: 'addedBy', header: t('Author'), cell: addedByCell, class: 'w-36' },
						{ id: 'date', header: t('Date'), cell: dateCell, class: 'w-44' },
						{
							id: 'actions',
							header: '',
							align: 'right',
							cell: actionsCell,
							class: 'w-24'
						}
					]}
				/>
			</Container>
		{/if}
	</div>
{/if}
