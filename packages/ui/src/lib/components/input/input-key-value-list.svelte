<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';

	import { cn } from '../../utils';
	import Button from '../button/button.svelte';
	import { InputText } from '.';
	import Label from './label.svelte';

	export type KeyValueEntry = {
		key: string;
		value: string;
	};

	type ListRow = KeyValueEntry & {
		id: string;
	};

	type Props = {
		label?: string;
		entries?: KeyValueEntry[];
		keyPlaceholder?: string;
		valuePlaceholder?: string;
		error?: string;
		id?: string;
		addLabel?: string;
		removeLabel?: string;
		class?: string;
	};

	let {
		label,
		entries = $bindable([]),
		keyPlaceholder = 'KEY',
		valuePlaceholder = 'value',
		error,
		id = useId(),
		addLabel = 'Add',
		removeLabel = 'Remove',
		class: className
	}: Props = $props();

	let rows = $state<ListRow[]>([]);

	function rowsFromEntries(nextEntries: KeyValueEntry[]): ListRow[] {
		return nextEntries.map((entry) => ({
			id: crypto.randomUUID(),
			key: entry.key,
			value: entry.value
		}));
	}

	function syncEntriesFromRows(): void {
		entries = rows.map((row) => ({
			key: row.key,
			value: row.value
		}));
	}

	function updateRow(rowId: string, patch: Partial<Pick<ListRow, 'key' | 'value'>>): void {
		rows = rows.map((row) => (row.id === rowId ? { ...row, ...patch } : row));
		syncEntriesFromRows();
	}

	function removeRow(rowId: string): void {
		rows = rows.filter((row) => row.id !== rowId);
		syncEntriesFromRows();
	}

	function addRow(): void {
		rows = [...rows, { id: crypto.randomUUID(), key: '', value: '' }];
		syncEntriesFromRows();
	}

	$effect.pre(() => {
		const nextEntries = entries;
		const currentEntries = rows.map((row) => ({ key: row.key, value: row.value }));

		if (
			nextEntries.length === currentEntries.length &&
			nextEntries.every(
				(entry, index) =>
					entry.key === currentEntries[index]?.key &&
					entry.value === currentEntries[index]?.value
			)
		) {
			return;
		}

		rows = rowsFromEntries(nextEntries);
	});
</script>

<div
	class={cn('grid w-full gap-2', className)}
	role="group"
	aria-labelledby={label ? `${id}-label` : undefined}
>
	{#if label}
		<Label id={`${id}-label`}>{label}</Label>
	{/if}

	<div class="grid gap-2">
		{#each rows as row (row.id)}
			<div class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2">
				<InputText
					id={`${id}-${row.id}-key`}
					placeholder={keyPlaceholder}
					value={row.key}
					oninput={(event) => updateRow(row.id, { key: event.currentTarget.value })}
				/>
				<InputText
					id={`${id}-${row.id}-value`}
					placeholder={valuePlaceholder}
					value={row.value}
					oninput={(event) => updateRow(row.id, { value: event.currentTarget.value })}
				/>
				<Button
					variant="ghost"
					size="icon"
					type="button"
					aria-label={removeLabel}
					onclick={() => removeRow(row.id)}
				>
					<Icon icon="ri:delete-bin-line" class="size-5" aria-hidden="true" />
				</Button>
			</div>
		{/each}

		<Button variant="ghost" size="sm" type="button" icon="ri:add-line" onclick={addRow}>
			{addLabel}
		</Button>
	</div>

	{#if error}
		<p class="text-sm text-destructive-50">{error}</p>
	{/if}
</div>
