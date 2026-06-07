<script lang="ts">
	import type { WithoutChildren } from 'bits-ui';

	import Icon from '@iconify/svelte';
	import { Select, useId } from 'bits-ui';

	import type { SelectItemsSource } from '$lib/core/action/trigger';
	import { cn } from '$lib/utils';

	import Label from './label.svelte';
	import { resolveSelectItems } from './resolve-select-items.svelte';

	type SharedProps = {
		label?: string;
		items: SelectItemsSource;
		placeholder?: string;
		loadingPlaceholder?: string;
		prependIcon?: string;
		id?: string;
		class?: string;
		error?: string;
		contentProps?: WithoutChildren<Select.ContentProps>;
	};

	type SingleRootRest = Omit<
		WithoutChildren<Extract<Select.RootProps, { type: 'single' }>>,
		'type' | 'items' | 'disabled' | 'value'
	>;

	type MultipleRootRest = Omit<
		WithoutChildren<Extract<Select.RootProps, { type: 'multiple' }>>,
		'type' | 'items' | 'disabled' | 'value'
	>;

	type Props = SharedProps &
		(
			| Omit<WithoutChildren<Extract<Select.RootProps, { type: 'single' }>>, 'items'>
			| Omit<WithoutChildren<Extract<Select.RootProps, { type: 'multiple' }>>, 'items'>
		);

	let {
		label,
		items: itemsSource,
		placeholder = 'Select an option',
		loadingPlaceholder = 'Loading…',
		prependIcon,
		contentProps,
		id = useId(),
		class: className,
		error,
		type,
		disabled: disabledProp,
		value = $bindable(),
		...rootProps
	}: Props = $props();

	const resolvedItems = resolveSelectItems(() => itemsSource);
	const disabled = $derived(disabledProp);
</script>

{#snippet selectBody()}
	<div
		class={cn(
			'relative flex w-full items-center rounded-xl',
			'has-focus:ring-2 has-focus:ring-primary',
			error && 'has-focus:ring-red-500',
			className
		)}
	>
		<Select.Trigger {id} class="flex w-full cursor-pointer items-center outline-none">
			{#if prependIcon}
				<span
					class="grid h-full min-w-10 place-items-center rounded-l-xl border border-r-0 border-dark-700 text-dark-50"
				>
					<Icon icon={prependIcon} class="size-6" />
				</span>
			{/if}
			<span
				class={cn(
					'flex w-full items-center justify-between gap-2 border bg-dark-700 px-4 py-2 text-dark-50 outline-none',
					error ? 'border-red-500' : 'border-dark-500',
					{
						'rounded-l-none rounded-r-xl border-l-0': prependIcon,
						'rounded-xl': !prependIcon
					}
				)}
			>
				<Select.Value
					placeholder={resolvedItems.loading ? loadingPlaceholder : placeholder}
					class="data-placeholder:text-dark-300"
				/>
				<Icon icon="ri:expand-up-down-line" class="size-5 shrink-0 text-dark-300" />
			</span>
		</Select.Trigger>
	</div>
	<Select.Portal>
		<Select.Content
			{...contentProps}
			sideOffset={contentProps?.sideOffset ?? 4}
			class={cn(
				'z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width)',
				'rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none',
				contentProps?.class
			)}
		>
			<Select.ScrollUpButton class="flex w-full items-center justify-center py-1 text-dark-300">
				<Icon icon="ri:arrow-up-s-line" />
			</Select.ScrollUpButton>
			<Select.Viewport>
				{#if resolvedItems.loading}
					<div class="px-3 py-1.5 text-sm text-dark-300">{loadingPlaceholder}</div>
				{:else}
					{#each resolvedItems.items as { value: itemValue, label: itemLabel, disabled: itemDisabled } (itemValue)}
						<Select.Item
							value={itemValue}
							label={itemLabel}
							disabled={itemDisabled}
							class={cn(
								'flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none',
								'data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700'
							)}
						>
							{#snippet children({ selected })}
								{itemLabel}
								{#if selected}
									<Icon icon="ri:check-line" class="size-5 text-primary" />
								{/if}
							{/snippet}
						</Select.Item>
					{/each}
				{/if}
			</Select.Viewport>
			<Select.ScrollDownButton class="flex w-full items-center justify-center py-1 text-dark-300">
				<Icon icon="ri:arrow-down-s-line" />
			</Select.ScrollDownButton>
		</Select.Content>
	</Select.Portal>
{/snippet}

<div class={cn('relative grid w-full gap-2')}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	{#if type === 'single'}
		<Select.Root
			type="single"
			items={resolvedItems.items}
			{disabled}
			bind:value={value as string}
			{...(rootProps as SingleRootRest)}
		>
			{@render selectBody()}
		</Select.Root>
	{:else}
		<Select.Root
			type="multiple"
			items={resolvedItems.items}
			{disabled}
			bind:value={value as string[]}
			{...(rootProps as MultipleRootRest)}
		>
			{@render selectBody()}
		</Select.Root>
	{/if}
	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
