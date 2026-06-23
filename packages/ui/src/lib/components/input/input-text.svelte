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

	type Props = {
		label?: string;
		prependIcon?: string;
		appendIcon?: string;
		error?: string;
		size?: InputSize;
	} & Omit<HTMLInputAttributes, 'size'>;

	const {
		label,
		id = useId(),
		prependIcon,
		appendIcon,
		error,
		size = 'md',
		...props
	}: Props = $props();
	let showPassword = $state(false);

	const isPasswordField = $derived(props.type === 'password');
	const hasRightAdornment = $derived(Boolean(appendIcon) || isPasswordField);

	const sizeClasses = inputSizeClasses;
</script>

<div class={cn('relative grid w-full gap-2')}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		class={cn(
			'relative flex w-full items-center rounded-xl',
			'has-focus:ring-2 has-focus:ring-primary',
			error && 'has-focus:ring-red-500',
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
				'w-full border bg-dark-700 text-dark-50 outline-none',
				sizeClasses[size],
				error ? 'border-red-500' : 'border-dark-500',
				{
					'rounded-l-none rounded-r-xl border-l-0': prependIcon,
					'rounded-l-xl rounded-r-none border-r-0': hasRightAdornment,
					'rounded-xl': !prependIcon && !hasRightAdornment
				}
			)}
			aria-invalid={error ? true : undefined}
			{...props}
			type={isPasswordField ? (showPassword ? 'text' : 'password') : props.type}
		/>
		{#if appendIcon}
			<span
				class={cn(
					'grid h-full place-items-center text-dark-50',
					inputAdornmentSizeClasses[size],
					isPasswordField
						? 'border-y border-r-0 border-l border-dark-500'
						: 'rounded-r-xl border border-l-0 border-dark-500'
				)}
			>
				<Icon icon={appendIcon} class={inputIconSizeClasses[size]} />
			</span>
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
