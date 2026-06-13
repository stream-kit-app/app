<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';

	import { InputText } from '.';
	import { cn } from '../../utils';
	import Button from '../button/button.svelte';
	import Label from './label.svelte';

	type ListRow = {
		id: string;
		value: string;
	};

	type Props = {
		label?: string;
		values?: string[];
		placeholder?: string;
		error?: string;
		id?: string;
		addLabel?: string;
		removeLabel?: string;
		class?: string;
	};

	let {
		label,
		values = $bindable([]),
		placeholder,
		error,
		id = useId(),
		addLabel = 'Add',
		removeLabel = 'Remove',
		class: className
	}: Props = $props();

	let rows = $state<ListRow[]>([]);

	function rowsFromValues(nextValues: string[]): ListRow[] {
		return nextValues.map((value) => ({
			id: crypto.randomUUID(),
			value
		}));
	}

	function syncValuesFromRows(): void {
		values = rows.map((row) => row.value);
	}

	function updateRowValue(rowId: string, value: string): void {
		rows = rows.map((row) => (row.id === rowId ? { ...row, value } : row));
		syncValuesFromRows();
	}

	function removeRow(rowId: string): void {
		rows = rows.filter((row) => row.id !== rowId);
		syncValuesFromRows();
	}

	function addRow(): void {
		rows = [...rows, { id: crypto.randomUUID(), value: '' }];
		syncValuesFromRows();
	}

	$effect.pre(() => {
		const nextValues = values;
		const currentValues = rows.map((row) => row.value);

		if (
			nextValues.length === currentValues.length &&
			nextValues.every((value, index) => value === currentValues[index])
		) {
			return;
		}

		rows = rowsFromValues(nextValues);
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
			<div class="flex items-center gap-2">
				<InputText
					id={`${id}-${row.id}`}
					{placeholder}
					value={row.value}
					oninput={(event) => updateRowValue(row.id, event.currentTarget.value)}
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
