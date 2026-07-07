<script lang="ts">
	import type { Command } from '../lib/command.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getCommandsService } from '../lib/get-commands';

	type Props = {
		command: Command;
	};

	let { command }: Props = $props();
	const app = getCommandsService().requireApp();
	const t = app.i18n.t;

	async function handleDelete() {
		const confirmed = await app.confirm.ask({
			title: t('Delete command'),
			description: t('Are you sure you want to delete "{name}"? This cannot be undone.', {
				name: command.name.trim() || t('this command')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await command.delete();
		}
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex items-center gap-2">
		{#if command.id != null}
			<Button
				variant="destructive"
				type="button"
				onclick={() => void handleDelete()}
				icon="ri:delete-bin-line"
			>
				{t('Delete')}
			</Button>
		{/if}
	</div>
	<div class="flex items-center gap-2">
		<Button variant="ghost" type="button" onclick={() => command.close()}>
			{t('Cancel')}
		</Button>
		<Button type="button" onclick={() => void command.save()}>{t('Save')}</Button>
	</div>
</div>
