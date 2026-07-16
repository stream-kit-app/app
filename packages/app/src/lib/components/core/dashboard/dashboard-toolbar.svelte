<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { ToggleGroup } from '@stream-kit/ui/toggle-group';

	import { useI18n } from '$lib/i18n';

	type Props = {
		editMode?: boolean;
		onEditModeChange?: (value: boolean) => void;
		onAddWidget?: () => void;
	};

	let { editMode = $bindable(false), onEditModeChange, onAddWidget }: Props = $props();

	const { t } = useI18n();

	type ViewMode = 'view' | 'customize';

	let mode = $derived<ViewMode>(editMode ? 'customize' : 'view');

	const modeItems = $derived([
		{
			value: 'view' as const,
			label: t('View'),
			icon: 'ri:layout-grid-line'
		},
		{
			value: 'customize' as const,
			label: t('Customize'),
			icon: 'ri:edit-2-line'
		}
	]);

	function onModeChange(next: ViewMode): void {
		editMode = next === 'customize';
		onEditModeChange?.(editMode);
	}
</script>

<div class="flex flex-wrap items-center gap-3">
	<ToggleGroup
		value={mode}
		ariaLabel={t('Dashboard view mode')}
		items={modeItems}
		onValueChange={onModeChange}
	/>

	{#if editMode}
		<Button icon="ri:add-line" onclick={() => onAddWidget?.()}>
			{t('Add widget')}
		</Button>
	{/if}
</div>
