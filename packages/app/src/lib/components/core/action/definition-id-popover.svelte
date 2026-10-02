<script lang="ts">
	import type { Snippet } from 'svelte';

	import { CopyButton } from '@stream-kit/ui/copy-button';
	import {
		Content as PopoverContent,
		Root as PopoverRoot,
		Trigger as PopoverTrigger
	} from '@stream-kit/ui/popover';

	import { cn } from '$lib/utils';

	import { resolveTranslate, type TranslateFn } from './resolve-translate';

	type Props = {
		id: string;
		class?: string;
		children: Snippet;
		t?: TranslateFn;
	};

	let { id, class: className, children, t: translateProp }: Props = $props();
	const t = $derived(resolveTranslate(translateProp));
</script>

<PopoverRoot>
	<PopoverTrigger>
		{#snippet child({ props }: { props: Record<string, unknown> })}
			<button {...props} type="button" class={cn('cursor-pointer text-left', className)}>
				{@render children()}
			</button>
		{/snippet}
	</PopoverTrigger>
	<PopoverContent align="start" class="w-auto max-w-sm p-2 pl-3">
		<div class="flex items-center gap-2">
			<code class="min-w-0 flex-1 font-mono text-xs break-all text-dark-100 select-text">
				{id}
			</code>
			<CopyButton value={id} label={t('Copy ID')} copiedLabel={t('Copied')} class="shrink-0" />
		</div>
	</PopoverContent>
</PopoverRoot>
