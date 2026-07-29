<script lang="ts">
	import type { Command as CommandType } from '../lib/command.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { Command } from '../lib/command.svelte';
	import { getCommandsService } from '../lib/get-commands';

	import CommandIdCopy from './command-id-copy.svelte';

	type Props = {
		command: CommandType;
	};

	let { command }: Props = $props();

	const t = getCommandsService().requireApp().i18n.t;

	const title = $derived(
		command.id != null ? t('Edit {name}', { name: command.name }) : t('New Command')
	);

	function handleClone(): void {
		const clone = Command.createFrom(command);
		command.close();
		clone.open();
	}
</script>

<div class="flex w-full items-start justify-between gap-4">
	<div class="flex min-w-0 flex-col gap-1">
		<h2 class="min-w-0 truncate text-2xl font-bold">{title}</h2>
		{#if command.id != null}
			<CommandIdCopy id={command.id} />
		{/if}
	</div>
	<div class="flex shrink-0 items-center gap-2">
		{#if command.id != null}
			<Button
				type="button"
				size="sm"
				variant="outline"
				onclick={handleClone}
				icon="clarity:clone-line"
			>
				{t('Clone')}
			</Button>
		{/if}
	</div>
</div>
