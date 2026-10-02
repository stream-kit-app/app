<script lang="ts">
	import type { PluginWidgetColumns } from '$lib/core/plugins/types';
	import type { ToggleGroupItem } from '@stream-kit/ui/toggle-group';

	import { ToggleGroup } from '@stream-kit/ui/toggle-group';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		value: PluginWidgetColumns;
		class?: string;
		onValueChange?: (value: PluginWidgetColumns) => void;
	};

	let { value, class: className, onValueChange }: Props = $props();

	const { t } = useI18n();

	const options: PluginWidgetColumns[] = [1, 2, 3, 4, 5, 6];

	const items: ToggleGroupItem[] = options.map((columns) => ({
		value: String(columns),
		label: String(columns)
	}));
</script>

<ToggleGroup
	size="sm"
	{items}
	value={String(value)}
	ariaLabel={t('Width')}
	class={cn('shrink-0 tabular-nums', className)}
	onValueChange={(next) => onValueChange?.(Number(next) as PluginWidgetColumns)}
/>
