<script lang="ts" module>
	import { cn } from '#lib/utils.js';

	/**
	 * Spine line on the grip axis (24px grip → x 12–13px). Shared with the If
	 * branch block so the line continues past an expanded If.
	 */
	export function connectorLineClass(blocking: boolean): string {
		return cn('border-l border-rule', !blocking && 'border-dashed');
	}
</script>

<script lang="ts">
	import type { TranslateFn } from './resolve-translate';
	import type { ActionHandler } from '#lib/core/action/action-handler.svelte.js';

	import { tooltip } from '@stream-kit/ui/attachments';

	import { getHandlerChainDndContext } from './handler-chain-dnd-context.svelte';
	import { resolveTranslate } from './resolve-translate';

	type Props = {
		/** The handler above the connector; its `blocking` flag decides whether the next one waits. */
		handler: ActionHandler;
		t?: TranslateFn;
	};

	let { handler, t: translateProp }: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const dnd = getHandlerChainDndContext();
	const chainDragging = $derived(dnd?.isDragging() ?? false);

	const label = $derived(
		handler.blocking ? t('Next handler waits for this one') : t('Next handler starts immediately')
	);
</script>

<div
	class={cn(
		'relative h-4 transition-opacity duration-150',
		chainDragging && 'pointer-events-none opacity-0'
	)}
	aria-hidden={chainDragging}
>
	<!-- Line at x 12–13px, dot (11px, odd so it centres on a 1px line) at 7–18px.
		The line reaches 7px into the rows above and below, up to the grip icons. -->
	<span
		class={cn('absolute -top-[7px] -bottom-[7px] left-3', connectorLineClass(handler.blocking))}
	></span>
	<button
		type="button"
		class="group/connector absolute -top-0.5 left-0.5 flex size-[21px] cursor-pointer items-center justify-center rounded-full outline-none"
		aria-pressed={!handler.blocking}
		aria-label={t('Toggle blocking for {name}', { name: handler.definition.name })}
		{@attach tooltip(() => label)}
		onclick={(event) => {
			event.stopPropagation();
			handler.blocking = !handler.blocking;
		}}
	>
		<span
			class={cn(
				'size-[11px] rounded-full transition-[transform,background-color] duration-150 group-hover/connector:scale-125 group-focus-visible/connector:scale-125',
				handler.blocking
					? 'bg-warning-300 group-hover/connector:bg-warning-200'
					: 'bg-dark-500 group-hover/connector:bg-dark-400'
			)}
		></span>
	</button>
</div>
