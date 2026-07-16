<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox, InputTextSelect } from '@stream-kit/ui/input';

	import { getCommandsService } from '../lib/get-commands';

	type Props = {
		selectedIds: string[];
		groupOrder: string[];
		onApplied?: () => void;
		onClose?: () => void;
	};

	let { selectedIds, groupOrder, onApplied, onClose }: Props = $props();

	const commands = getCommandsService();
	const t = commands.requireApp().i18n.t;

	let changeGroup = $state(false);
	let groupValue = $state('');
	let applying = $state(false);

	const selectedCount = $derived(selectedIds.length);
	const canApply = $derived(changeGroup && groupValue.trim().length > 0);

	async function handleApply(): Promise<void> {
		if (!canApply || applying) {
			return;
		}

		applying = true;

		try {
			await commands.moveToGroup(selectedIds, {
				group: groupValue,
				groupOrder
			});

			onApplied?.();
			onClose?.();
		} finally {
			applying = false;
		}
	}
</script>

<div class="grid gap-5">
	<p class="text-sm text-dark-200">{t('{count} selected', { count: selectedCount })}</p>

	<div class="grid gap-3">
		<InputCheckbox inline label={t('Move to group')} bind:checked={changeGroup} />
		<InputTextSelect
			label={t('Group')}
			placeholder={t('Select or enter a group')}
			items={() => commands.getGroupSelectItems()}
			bind:value={groupValue}
			disabled={!changeGroup}
		/>
	</div>

	<div class="flex flex-wrap justify-end gap-2">
		<Button variant="outline" disabled={applying} onclick={() => onClose?.()}>
			{t('Cancel')}
		</Button>
		<Button disabled={!canApply || applying} onclick={() => void handleApply()}>
			{t('Apply changes')}
		</Button>
	</div>
</div>
