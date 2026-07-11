<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Button } from '@stream-kit/ui/button';
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

	let copied = $state(false);

	function copyId(): void {
		void navigator.clipboard.writeText(id).then(() => {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		});
	}
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
			<Button
				type="button"
				variant="ghost"
				size="icon-sm"
				icon={copied ? 'ri:check-line' : 'ri:file-copy-line'}
				aria-label={t('Copy ID')}
				onclick={copyId}
				class={cn('shrink-0', copied && 'text-success-400')}
			/>
		</div>
	</PopoverContent>
</PopoverRoot>
