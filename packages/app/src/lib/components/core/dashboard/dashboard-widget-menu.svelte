<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';
	import * as Dropdown from '@stream-kit/ui/dropdown';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		wide: boolean;
		onOpenChange?: (open: boolean) => void;
		onWideChange?: (wide: boolean) => void;
		onRemove?: () => void;
	};

	let { wide, onOpenChange, onWideChange, onRemove }: Props = $props();

	const { t } = useI18n();

	const widthOptions = $derived([
		{ wide: false, label: t('Narrow'), icon: 'ri:layout-column-line' },
		{ wide: true, label: t('Wide'), icon: 'ri:layout-2-line' }
	]);
</script>

<Dropdown.Root onOpenChange={(open) => onOpenChange?.(open)}>
	{#snippet trigger({ props })}
		<Button
			{...props}
			variant="ghost"
			size="icon-sm"
			icon="ri:more-2-fill"
			class="size-7 text-dark-400 hover:text-dark-100"
			aria-label={t('Widget options')}
		/>
	{/snippet}
	<Dropdown.Content align="end" class="min-w-44">
		{#each widthOptions as option (option.wide)}
			<Dropdown.Item
				class="flex items-center gap-2.5 px-3 text-sm"
				onclick={() => onWideChange?.(option.wide)}
			>
				<Icon icon={option.icon} class="size-4 text-dark-300" aria-hidden="true" />
				<span class="flex-1">{option.label}</span>
				<Icon
					icon="ri:check-line"
					class={cn('size-4 text-primary', option.wide !== wide && 'invisible')}
					aria-hidden="true"
				/>
			</Dropdown.Item>
		{/each}
		<div class="my-1 h-px bg-rule" role="separator"></div>
		<Dropdown.Item
			class="flex items-center gap-2.5 px-3 text-sm text-destructive-100 hover:text-destructive-50 data-highlighted:text-destructive-50"
			onclick={() => onRemove?.()}
		>
			<Icon icon="ri:delete-bin-line" class="size-4" aria-hidden="true" />
			{t('Remove widget')}
		</Dropdown.Item>
	</Dropdown.Content>
</Dropdown.Root>
