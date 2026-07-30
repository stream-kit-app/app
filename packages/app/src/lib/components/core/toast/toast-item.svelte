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
</script>

<Icon icon={iconByVariant[item.variant]} class={toastIconVariants({ variant: item.variant })} />
<div class="min-w-0 flex-1">
	<p class="font-semibold">{item.title}</p>
	{#if item.description}
		<p class="mt-1 text-sm text-dark-100">{item.description}</p>
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
