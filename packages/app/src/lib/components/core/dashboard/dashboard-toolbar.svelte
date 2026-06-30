<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		editMode?: boolean;
		onEditModeChange?: (value: boolean) => void;
		onAddWidget?: () => void;
	};

	let { editMode = $bindable(false), onAddWidget }: Props = $props();

	const { t } = useI18n();
</script>

<div class="flex flex-wrap items-center gap-3">
	<div
		class="inline-flex rounded-xl border border-dark-600/80 bg-dark-900/50 p-1 shadow-inner"
		role="group"
		aria-label={t('Dashboard view mode')}
	>
		<button
			type="button"
			class={cn(
				'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition',
				!editMode
					? 'bg-dark-700 text-dark-50 shadow-sm'
					: 'text-dark-300 hover:text-dark-100'
			)}
			aria-pressed={!editMode}
			onclick={() => (editMode = false)}
		>
			<Icon icon="ri:layout-grid-line" class="size-4" aria-hidden="true" />
			{t('View')}
		</button>
		<button
			type="button"
			class={cn(
				'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition',
				editMode
					? 'bg-primary/15 text-primary-100 shadow-sm ring-1 ring-primary/25'
					: 'text-dark-300 hover:text-dark-100'
			)}
			aria-pressed={editMode}
			onclick={() => (editMode = true)}
		>
			<Icon icon="ri:edit-2-line" class="size-4" aria-hidden="true" />
			{t('Customize')}
		</button>
	</div>

	{#if editMode}
		<Button icon="ri:add-line" onclick={() => onAddWidget?.()}>
			{t('Add widget')}
		</Button>
	{/if}
</div>
