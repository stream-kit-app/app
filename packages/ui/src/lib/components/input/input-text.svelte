<script lang="ts">
	import type { InputSize } from './input-size-classes';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';

	import { cn } from '../../utils';
	import {
		inputFieldAdornmentBorder,
		inputFieldBorder,
		inputFieldDisabled,
		inputFieldErrorMessage,
		inputFieldFocusRing,
		inputFieldGroup,
		inputFieldSurface
	} from './input-field-classes';
	import {
		inputAdornmentSizeClasses,
		inputIconSizeClasses,
		inputPaddingClasses,
		inputShellSizeClasses
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
		class: className,
		...props
	}: Props = $props();

	let showPassword = $state(false);
	let copied = $state(false);
	let copyFeedbackTimer: ReturnType<typeof setTimeout> | undefined;

	const isPasswordField = $derived(props.type === 'password');
	const hasRightAdornment = $derived(Boolean(appendIcon) || isPasswordField || copyable);
	const inputReadonly = $derived(copyable ? (readonly ?? true) : readonly);
	const isCopyableReadonly = $derived(copyable && inputReadonly);

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

<div class={cn('relative grid w-full min-w-0 gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		class={cn(
			'relative flex w-full min-w-0 items-stretch rounded-xl',
			inputFieldGroup,
			inputShellSizeClasses[size],
			!isCopyableReadonly && inputFieldFocusRing(error)
		)}
	>
		{#if prependIcon}
			<span
				class={cn(
					'grid h-full place-items-center rounded-l-xl border text-dark-50 transition-colors',
					inputFieldAdornmentBorder(error),
					inputFieldSurface,
					inputAdornmentSizeClasses[size]
				)}
			>
				<Icon icon={prependIcon} class={inputIconSizeClasses[size]} />
			</span>
		{/if}
		<input
			{id}
			aria-invalid={error ? true : undefined}
			{value}
			readonly={inputReadonly}
			tabindex={isCopyableReadonly ? -1 : tabindex}
			{...props}
			class={cn(
				'box-border h-full min-h-0 min-w-0 w-full appearance-none truncate border outline-none transition-colors',
				inputFieldSurface,
				inputFieldDisabled,
				inputPaddingClasses[size],
				inputFieldBorder(error),
				{
					'rounded-l-none rounded-r-xl border-l-0': prependIcon && !hasRightAdornment,
					'rounded-l-none border-l-0': prependIcon && hasRightAdornment,
					'rounded-l-xl rounded-r-none border-r-0': !prependIcon && hasRightAdornment,
					'rounded-xl': !prependIcon && !hasRightAdornment
				}
			)}
			type={isPasswordField ? (showPassword ? 'text' : 'password') : props.type}
		/>
		{#if appendIcon}
			<span
				class={cn(
					'grid h-full place-items-center text-dark-50 transition-colors',
					inputAdornmentSizeClasses[size],
					isPasswordField || copyable
						? cn('border-y border-r-0 border-l', inputFieldAdornmentBorder(error))
						: cn('rounded-r-xl border border-l-0', inputFieldAdornmentBorder(error))
				)}
			>
				<Icon icon={appendIcon} class={inputIconSizeClasses[size]} />
			</span>
		{/if}
		{#if copyable}
			<button
				type="button"
				class={cn(
					'grid h-full place-items-center rounded-r-xl border transition-colors',
					inputFieldAdornmentBorder(error),
					inputFieldSurface,
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
					'grid h-full place-items-center rounded-r-xl border text-dark-50 transition-colors',
					inputFieldAdornmentBorder(error),
					inputFieldSurface,
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
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
