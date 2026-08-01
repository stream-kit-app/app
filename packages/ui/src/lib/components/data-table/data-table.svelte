<script lang="ts" generics="T">
	import type { DataTableAlign, DataTableColumn } from './types';

	import { cn } from '../../utils';
	import { Eyebrow } from '../blueprint';
	import { ScrollArea } from '../scroll-area';

	type Props = {
		data: T[];
		columns: DataTableColumn<T>[];
		getRowKey: (row: T) => string;
		title?: string;
		empty: string;
		emptyDescription?: string;
		maxHeight?: string;
		class?: string;
	};

	let {
		data,
		columns,
		getRowKey,
		title,
		empty,
		emptyDescription,
		maxHeight = 'max-h-96',
		class: className
	}: Props = $props();

	function alignClass(align: DataTableAlign = 'left'): string {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right';
		return 'text-left';
	}
</script>

<section class={cn('overflow-hidden rounded-none border border-rule', className)}>
	{#if title}
		<div class="border-b border-rule px-4 py-3">
			<Eyebrow>{title}</Eyebrow>
		</div>
	{/if}

	{#if data.length > 0}
		<ScrollArea
			orientation="vertical"
			class="overflow-hidden"
			viewportClasses={cn('w-full overflow-hidden', maxHeight)}
		>
			<table class="min-w-full text-sm">
				<thead class="sticky top-0 z-10 border-b border-rule bg-background">
					<tr>
						{#each columns as column (column.id)}
							<th
								class={cn(
									'px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase',
									alignClass(column.align),
									column.class
								)}
							>
								{column.header}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-rule">
					{#each data as row (getRowKey(row))}
						<tr class="transition-colors hover:bg-dark-700/40">
							{#each columns as column (column.id)}
								<td
									class={cn(
										'px-4 py-2.5 text-dark-200',
										alignClass(column.align),
										column.class
									)}
								>
									{@render column.cell(row)}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</ScrollArea>
	{:else}
		<div class="px-4 py-10 text-center">
			<p class="text-sm font-medium text-dark-300">{empty}</p>
			{#if emptyDescription}
				<p class="mt-1 text-sm text-dark-400">{emptyDescription}</p>
			{/if}
		</div>
	{/if}
</section>
