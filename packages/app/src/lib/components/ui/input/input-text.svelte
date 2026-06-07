<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';

	import { cn } from '$lib/utils';

	import Label from './label.svelte';

	type Props = {
		label?: string;
		prependIcon?: string;
		appendIcon?: string;
		error?: string;
	} & HTMLInputAttributes;

	const { label, id = useId(), prependIcon, appendIcon, error, ...props }: Props = $props();
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
				class="grid h-full min-w-10 place-items-center rounded-l-xl border border-dark-700 text-dark-50"
			>
				<Icon icon={prependIcon} class="size-6" />
			</span>
		{/if}
		<input
			{id}
			class={cn(
				'w-full border bg-dark-700 px-4 py-2 text-dark-50 outline-none',
				error ? 'border-red-500' : 'border-dark-500',
				{
					'rounded-l-none rounded-r-xl border-l-0': prependIcon,
					'rounded-l-xl rounded-r-none border-r-0': appendIcon,
					'rounded-xl': !prependIcon && !appendIcon
				}
			)}
			aria-invalid={error ? true : undefined}
			{...props}
		/>
		{#if appendIcon}
			<span
				class="grid h-full min-w-10 place-items-center border-r border-dark-700 text-dark-50"
			>
				<Icon icon={appendIcon} />
			</span>
		{/if}
	</div>
	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
