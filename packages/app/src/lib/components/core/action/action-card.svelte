<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip } from '$lib/attachments';
	import { cn } from '$lib/utils';

	type Props = {
		action: Action;
	};

	let { action }: Props = $props();

	const triggerSummary = $derived(
		action.triggers.map((trigger) => trigger.definition.name).join(', ') || 'None'
	);

	const handlerSummary = $derived(
		action.handlers.map((handler) => handler.definition.name).join(', ') || 'None'
	);
</script>

<button
	type="button"
	class={cn(
		'grid grid-cols-[30%_200px_200px_1fr]',
		'group w-full cursor-pointer items-center justify-between rounded-xl',
		' bg-dark-800 px-4 py-3 text-left transition-colors hover:bg-dark-600'
	)}
	onclick={() => action.open()}
>
	<span>{action.name.trim()}</span>
	<span
		class="text-center text-dark-300"
		{@attach tooltip(() =>
			action.triggers.map((trigger) => `- ${trigger.definition.name}`).join('<br />')
		)}
	>
		triggers ({action.triggers.length})
	</span>
	<span
		class="text-center text-dark-300"
		{@attach tooltip(() =>
			action.handlers.map((handler) => `- ${handler.definition.name}`).join('<br />')
		)}
	>
		handlers ({action.handlers.length})
	</span>
	<span class="justify-self-end">
		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 text-dark-400 transition-colors group-hover:text-dark-200"
			aria-hidden="true"
		/>
	</span>
</button>
