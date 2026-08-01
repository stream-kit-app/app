<script lang="ts">
	import type { ToastItem } from '$lib/core/toast';

	import Icon from '@iconify/svelte';

	import { useI18n } from '$lib/i18n';

	import { toastIconVariants } from './toast-variants';

	type Props = {
		item: ToastItem;
		onDismiss: () => void;
	};

	const { item, onDismiss }: Props = $props();
	const { t } = useI18n();

	const iconByVariant = {
		default: 'ri:information-fill',
		success: 'ri:checkbox-circle-fill',
		error: 'ri:error-warning-fill',
		warning: 'ri:alert-fill',
		neutral: 'ri:refresh-line'
	} as const;

	const progressPercent = $derived.by(() => {
		const progress = item.progress;
		if (!progress || progress.total <= 0) {
			return 0;
		}
		return Math.min(100, Math.round((progress.done / progress.total) * 100));
	});
</script>

<Icon icon={iconByVariant[item.variant]} class={toastIconVariants({ variant: item.variant })} />
<div class="min-w-0 flex-1">
	<p class="font-semibold">{item.title}</p>
	{#if item.description}
		<p class="mt-1 text-sm text-dark-100">{item.description}</p>
	{/if}
	{#if item.progress && item.progress.total > 0}
		<div class="mt-2 grid gap-1.5">
			<div class="flex items-center justify-between gap-2 font-mono text-[11px] tabular-nums text-dark-300">
				<span>{progressPercent}%</span>
				<span>{item.progress.done} / {item.progress.total}</span>
			</div>
			<div
				class="h-1.5 overflow-hidden rounded-full bg-dark-700"
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={item.progress.total}
				aria-valuenow={item.progress.done}
				aria-label={item.title}
			>
				<div
					class="h-full rounded-full bg-primary transition-all duration-200"
					style:width="{progressPercent}%"
				></div>
			</div>
		</div>
	{/if}
	{#if item.content}
		<div class="mt-2">
			<item.content {...item.props} />
		</div>
	{/if}
</div>
<button
	type="button"
	class="shrink-0 cursor-pointer text-dark-200 outline-none hover:text-dark-50"
	onclick={onDismiss}
	aria-label={t('Dismiss toast')}
>
	<Icon icon="ri:close-fill" class="size-5" />
</button>
