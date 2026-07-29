<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';
	import { Debounced } from 'runed';

	import { cn } from '../../utils';
	import {
		CRON_FIELD_KEYS,
		DEFAULT_CRON_PRESETS,
		getCronNextRunLabel,
		getCronValidationError,
		normalizeCronExpression,
		splitCronParts,
		type CronFieldKey,
		type CronPreset
	} from './cron-expression';
	import { inputSizeClasses } from './input-size-classes';
	import InputSelect from './input-select.svelte';

	type CronFieldLabels = Record<CronFieldKey, string>;

	type Props = {
		value?: string;
		required?: boolean;
		placeholder?: string;
		presets?: CronPreset[];
		fieldLabels?: Partial<CronFieldLabels>;
		validLabel?: string;
		invalidLabel?: string;
		nextRunLabel?: string;
		presetsPlaceholder?: string;
		oninput?: FormEventHandler<HTMLInputElement>;
	};

	let {
		value = '',
		required,
		placeholder = '0 9 * * 1-5',
		presets = DEFAULT_CRON_PRESETS,
		fieldLabels,
		validLabel = 'Valid expression',
		invalidLabel = 'Invalid cron expression',
		nextRunLabel = 'Next run',
		presetsPlaceholder = 'Presets',
		oninput
	}: Props = $props();

	const id = useId();
	const debouncedValue = new Debounced(() => value, 250);

	const labels = $derived<CronFieldLabels>({
		minute: fieldLabels?.minute ?? 'Minute',
		hour: fieldLabels?.hour ?? 'Hour',
		day: fieldLabels?.day ?? 'Day',
		month: fieldLabels?.month ?? 'Month',
		weekday: fieldLabels?.weekday ?? 'Weekday'
	});

	const parts = $derived(splitCronParts(value));
	const normalizedDebouncedValue = $derived(normalizeCronExpression(debouncedValue.current));
	const validationError = $derived(getCronValidationError(normalizedDebouncedValue));
	const isValid = $derived(Boolean(normalizedDebouncedValue) && !validationError);
	const validationMessage = $derived(
		validationError === 'Invalid cron expression' ? invalidLabel : validationError
	);
	const nextRun = $derived(isValid ? getCronNextRunLabel(normalizedDebouncedValue) : undefined);
	const presetItems = $derived(presets.map((preset) => ({ value: preset.value, label: preset.label })));

	const fieldColors: Record<CronFieldKey, string> = {
		minute: 'text-sky-300',
		hour: 'text-violet-300',
		day: 'text-emerald-300',
		month: 'text-amber-300',
		weekday: 'text-rose-300'
	};

	const onInput: FormEventHandler<HTMLInputElement> = (event) => {
		oninput?.(event);
	};

	function applyPreset(expression: string): void {
		oninput?.({
			currentTarget: { value: expression }
		} as Event & { currentTarget: HTMLInputElement });
	}
</script>

<div class="overflow-hidden rounded-lg border border-border bg-dark-800/40 transition-all duration-200 focus-within:border-ring/50 focus-within:ring-2 focus-within:ring-ring/20">
	<div class="grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5">
		{#each CRON_FIELD_KEYS as field, index (field)}
			<div class={cn('px-1 text-center', index < 4 && 'border-r border-dark-700/50')}>
				<p class="text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase">
					{labels[field]}
				</p>
				<p class={cn('mt-0.5 truncate font-mono text-xs', fieldColors[field])}>
					{parts[index] || '—'}
				</p>
			</div>
		{/each}
	</div>

	<div class="relative flex items-center gap-2 px-3 py-2">
		<Icon icon="ri:time-line" class="size-5 shrink-0 text-dark-400" />
		<input
			{id}
			class={cn(
				'min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none',
				inputSizeClasses.md,
				'px-0 py-0'
			)}
			{placeholder}
			{required}
			spellcheck={false}
			autocomplete="off"
			value={value ?? ''}
			oninput={onInput}
		/>
		{#if normalizedDebouncedValue}
			<span
				class={cn(
					'inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
					isValid
						? 'bg-green-500/10 text-green-400 border-green-500/20'
						: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
				)}
			>
				<Icon icon={isValid ? 'ri:check-line' : 'ri:alert-line'} class="size-4" />
				{isValid ? validLabel : validationMessage}
			</span>
		{/if}
	</div>

	<div
		class="flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2"
	>
		<div class="min-w-40 max-w-xs flex-1">
			<InputSelect
				type="single"
				placeholder={presetsPlaceholder}
				items={presetItems}
				bind:value={() => '', (next) => {
					if (next) {
						applyPreset(next);
					}
				}}
			/>
		</div>

		{#if nextRun}
			<p class="text-xs text-dark-200">
				<span class="text-dark-400">{nextRunLabel}:</span>
				<span class="font-medium text-primary-100">{nextRun}</span>
			</p>
		{/if}
	</div>
</div>
