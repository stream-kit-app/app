<script lang="ts">
	import type { Action as ActionType } from '$lib/core/action/action.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { Action } from '$lib/core/action/action.svelte';
	import { useI18n } from '$lib/i18n';

	type Props = {
		action: ActionType;
	};

	let { action }: Props = $props();
	const { t } = useI18n();

	const title = $derived(
		action.id != null ? t('Edit {name}', { name: action.name }) : t('New Action')
	);

	const canTest = $derived(
		action.hasTestableTriggers &&
			!action.execution.state.isRunning &&
			action.handlers.length > 0
	);

	function handleClone(): void {
		const clone = Action.createFrom(action);
		action.close();
		clone.open();
	}

	async function handleTest(): Promise<void> {
		await action.test();
	}
</script>

<div class="flex w-full items-start justify-between gap-4">
	<h2 class="min-w-0 truncate text-2xl font-bold">{title}</h2>
	<div class="flex shrink-0 items-center gap-2">
		{#if action.id != null}
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
		<Button
			type="button"
			size="sm"
			variant="outline"
			disabled={!canTest}
			onclick={() => void handleTest()}
			icon="ri:play-line"
		>
			{t('Test')}
		</Button>
	</div>
</div>
