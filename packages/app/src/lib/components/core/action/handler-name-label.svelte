<script lang="ts">
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';

	import { getHandlerOutputs } from '$lib/core/action/variable-scope';

	type Props = {
		handler: ActionHandler;
	};

	let { handler }: Props = $props();

	/** Variables this handler sets, for example `{usernameAlias}` on Set variable. */
	const outputs = $derived(
		getHandlerOutputs(handler)
			.map((output) => `{${output.key}}`)
			.join(' ')
	);
</script>

{handler.definition.name}
{#if outputs}
	<span class="ml-1 font-mono text-xs text-dark-400">{outputs}</span>
{/if}
