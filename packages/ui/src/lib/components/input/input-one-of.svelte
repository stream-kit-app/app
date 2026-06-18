<script lang="ts">
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';
	import Label from './label.svelte';

	export type OneOfTab = {
		id: string;
		label: string;
	};

	type Props = {
		label?: string;
		required?: boolean;
		error?: string;
		variants: OneOfTab[];
		value?: {
			variant: string;
			values: Record<string, unknown>;
		};
		panel: Snippet<
			[
				{
					variantId: string;
					value: unknown;
					setValue: (next: unknown) => void;
				}
			]
		>;
	};

	let {
		label,
		required,
		error,
		variants,
		value = $bindable({ variant: '', values: {} }),
		panel
	}: Props = $props();

	const activeVariantId = $derived(value.variant || variants[0]?.id || '');

	function setActiveVariant(variantId: string): void {
		value = {
			...value,
			variant: variantId
		};
	}

	function setVariantValue(variantId: string, next: unknown): void {
		value = {
			variant: value.variant || variantId,
			values: {
				...value.values,
				[variantId]: next
			}
		};
	}
</script>

<div class={cn('grid w-full gap-2')}>
	{#if label}
		<Label>
			{label}
			{#if required}
				<span class="text-red-400" aria-hidden="true">*</span>
			{/if}
		</Label>
	{/if}

	<div
		class={cn(
			'inline-flex w-fit gap-0.5 rounded-xl border border-dark-600 bg-dark-800 p-1',
			error && 'border-red-500'
		)}
		role="tablist"
		aria-label={label}
	>
		{#each variants as variant (variant.id)}
			<button
				type="button"
				role="tab"
				id={`tab-${variant.id}`}
				aria-selected={activeVariantId === variant.id}
				aria-controls={`panel-${variant.id}`}
				class={cn(
					'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
					activeVariantId === variant.id
						? 'bg-dark-600 text-dark-50'
						: 'text-dark-200 hover:bg-dark-800 hover:text-dark-50'
				)}
				onclick={() => setActiveVariant(variant.id)}
			>
				{variant.label}
			</button>
		{/each}
	</div>

	<div role="tabpanel" id={`panel-${activeVariantId}`} aria-labelledby={`tab-${activeVariantId}`}>
		{@render panel({
			variantId: activeVariantId,
			value: value.values[activeVariantId],
			setValue: (next) => setVariantValue(activeVariantId, next)
		})}
	</div>

	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
