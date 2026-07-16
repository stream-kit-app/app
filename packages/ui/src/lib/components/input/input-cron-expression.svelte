<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';

	import { cn } from '../../utils';
	import {
		Content as PopoverContent,
		Root as PopoverRoot,
		Trigger as PopoverTrigger
	} from '../popover';
	import {
		getCronValidationError,
		normalizeCronExpression,
		type CronFieldKey,
		type CronPreset
	} from './cron-expression';
	import CronExpressionEditor from './cron-expression-editor.svelte';
	import {
		inputFieldErrorMessage,
		inputFieldSurface
	} from './input-field-classes';
	import { inputSizeClasses } from './input-size-classes';
	import Label from './label.svelte';

	type CronFieldLabels = Record<CronFieldKey, string>;

	type Props = {
		label?: string;
		id?: string;
		class?: string;
		value?: string;
		error?: string;
		required?: boolean;
		placeholder?: string;
		presets?: CronPreset[];
		fieldLabels?: Partial<CronFieldLabels>;
		validLabel?: string;
		invalidLabel?: string;
		nextRunLabel?: string;
		presetsPlaceholder?: string;
		editorTitle?: string;
		emptyLabel?: string;
		editAriaLabel?: string;
		oninput?: FormEventHandler<HTMLInputElement>;
	};

	let {
		label,
		id = useId(),
		class: className,
		value = '',
		error,
		required,
		placeholder = '0 9 * * 1-5',
		presets,
		fieldLabels,
		validLabel = 'Valid expression',
		invalidLabel = 'Invalid cron expression',
		nextRunLabel = 'Next run',
		presetsPlaceholder = 'Presets',
		editorTitle = 'Cron expression',
		emptyLabel = 'Configure cron expression',
		editAriaLabel = 'Edit cron expression',
		oninput
	}: Props = $props();

	let open = $state(false);

	const normalizedValue = $derived(normalizeCronExpression(value));
	const validationError = $derived(getCronValidationError(normalizedValue));
	const isValid = $derived(Boolean(normalizedValue) && !validationError);
	const summary = $derived(normalizedValue || emptyLabel);
	const summaryIsPlaceholder = $derived(!normalizedValue);
</script>

<div class={cn('relative grid w-full gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}

	<PopoverRoot bind:open>
		<PopoverTrigger>
			{#snippet child({ props }: { props: Record<string, unknown> })}
				<button
					{id}
					type="button"
					{...props}
					aria-label={editAriaLabel}
					class={cn(
						'flex w-full items-center gap-2 rounded-xl border text-left outline-none transition-all',
						inputFieldSurface,
						inputSizeClasses.md,
						'focus-visible:ring-2',
						error
							? 'border-destructive focus-visible:border-destructive/50 focus-visible:ring-destructive'
							: 'border-border hover:border-dark-400 focus-visible:border-ring/50 focus-visible:ring-ring'
					)}
				>
					<Icon icon="ri:time-line" class="size-5 shrink-0 text-dark-400" />
					<span
						class={cn(
							'min-w-0 flex-1 truncate text-sm',
							summaryIsPlaceholder ? 'font-sans text-dark-300' : 'font-mono text-dark-50'
						)}
					>
						{summary}
					</span>
					{#if normalizedValue}
						<Icon
							icon={isValid ? 'ri:check-line' : 'ri:alert-line'}
							class={cn('size-5 shrink-0', isValid ? 'text-green-400' : 'text-amber-400')}
						/>
					{/if}
					<Icon
						icon="ri:arrow-down-s-line"
						class={cn('size-5 shrink-0 text-dark-300 transition-transform', open && 'rotate-180')}
					/>
				</button>
			{/snippet}
		</PopoverTrigger>

		<PopoverContent align="start" class="w-[min(28rem,calc(100vw-2rem))] p-3">
			<p class="mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase">
				{editorTitle}
			</p>
			<CronExpressionEditor
				{value}
				{required}
				{placeholder}
				{presets}
				{fieldLabels}
				{validLabel}
				{invalidLabel}
				{nextRunLabel}
				{presetsPlaceholder}
				{oninput}
			/>
		</PopoverContent>
	</PopoverRoot>

	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
