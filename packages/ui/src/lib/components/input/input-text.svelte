<script lang="ts">
	import type { InputSize } from './input-size-classes';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';

	import { cn } from '../../utils';
	import {
		inputAdornmentSizeClasses,
		inputIconSizeClasses,
		inputSizeClasses
	} from './input-size-classes';
	import Label from './label.svelte';

	const COPY_FEEDBACK_MS = 2000;

	type Props = {
		label?: string;
		prependIcon?: string;
		appendIcon?: string;
		copyable?: boolean;
		copyLabel?: string;
		copiedLabel?: string;
		error?: string;
		size?: InputSize;
	} & Omit<HTMLInputAttributes, 'size'>;

	let {
		label,
		id = useId(),
		prependIcon,
		appendIcon,
		copyable = false,
		copyLabel = 'Copy',
		copiedLabel = 'Copied',
		error,
		size = 'md',
		readonly,
		value,
		tabindex,
		...props
	}: Props = $props();

	let showPassword = $state(false);
	let copied = $state(false);
	let copyFeedbackTimer: ReturnType<typeof setTimeout> | undefined;

	const isPasswordField = $derived(props.type === 'password');
	const hasRightAdornment = $derived(Boolean(appendIcon) || isPasswordField || copyable);
	const inputReadonly = $derived(copyable ? (readonly ?? true) : readonly);
	const isCopyableReadonly = $derived(copyable && inputReadonly);

	const sizeClasses = inputSizeClasses;

	async function copyValue(): Promise<void> {
		await navigator.clipboard.writeText(String(value ?? ''));

		if (copyFeedbackTimer) {
			clearTimeout(copyFeedbackTimer);
		}

		copied = true;
		copyFeedbackTimer = setTimeout(() => {
			copied = false;
		}, COPY_FEEDBACK_MS);
	}
</script>

<div class={cn('relative grid w-full min-w-0 gap-2')}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		class={cn(
			'relative flex w-full min-w-0 items-center rounded-xl',
			!isCopyableReadonly && 'has-focus:ring-2 has-focus:ring-primary',
			error && !isCopyableReadonly && 'has-focus:ring-red-500',
			props.class
		)}
	>
		{#if prependIcon}
			<span
				class={cn(
					'grid h-full place-items-center rounded-l-xl border border-dark-500 bg-dark-700 text-dark-50',
					inputAdornmentSizeClasses[size]
				)}
			>
				<Icon icon={prependIcon} class={inputIconSizeClasses[size]} />
			</span>
		{/if}
		<input
			{id}
			class={cn(
				'min-w-0 w-full truncate border bg-dark-700 text-dark-50 outline-none',
				sizeClasses[size],
				error ? 'border-red-500' : 'border-dark-500',
				{
					'rounded-l-none rounded-r-xl border-l-0': prependIcon && !hasRightAdornment,
					'rounded-l-none border-l-0': prependIcon && hasRightAdornment,
					'rounded-l-xl rounded-r-none border-r-0': !prependIcon && hasRightAdornment,
					'rounded-xl': !prependIcon && !hasRightAdornment
				}
			)}
			aria-invalid={error ? true : undefined}
			{value}
			readonly={inputReadonly}
			tabindex={isCopyableReadonly ? -1 : tabindex}
			{...props}
			type={isPasswordField ? (showPassword ? 'text' : 'password') : props.type}
		/>
		{#if appendIcon}
			<span
				class={cn(
					'grid h-full place-items-center text-dark-50',
					inputAdornmentSizeClasses[size],
					isPasswordField || copyable
						? 'border-y border-r-0 border-l border-dark-500'
						: 'rounded-r-xl border border-l-0 border-dark-500'
				)}
			>
				<Icon icon={appendIcon} class={inputIconSizeClasses[size]} />
			</span>
		{/if}
		{#if copyable}
			<button
				type="button"
				class={cn(
					'grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 transition-colors',
					copied ? 'text-success' : 'text-dark-50',
					inputAdornmentSizeClasses[size]
				)}
				aria-label={copied ? copiedLabel : copyLabel}
				onclick={() => void copyValue()}
			>
				<Icon
					icon={copied ? 'ri:checkbox-circle-fill' : 'ri:file-copy-line'}
					class={inputIconSizeClasses[size]}
				/>
			</button>
		{/if}
		{#if isPasswordField}
			<button
				type="button"
				class={cn(
					'grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 text-dark-50',
					inputAdornmentSizeClasses[size]
				)}
				aria-label={showPassword ? 'Hide password' : 'Show password'}
				aria-pressed={showPassword}
				onclick={() => (showPassword = !showPassword)}
			>
				<Icon
					icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}
					class={inputIconSizeClasses[size]}
				/>
			</button>
		{/if}
	</div>
	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
