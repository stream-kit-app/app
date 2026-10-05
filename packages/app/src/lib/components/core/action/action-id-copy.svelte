<script lang="ts">
	import { onDestroy } from 'svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { CopyButton, CopyFeedback } from '@stream-kit/ui/copy-button';

	import { getApp } from '#lib/core/registry.js';
	import { useI18n } from '#lib/i18n.js';
	import { cn } from '#lib/utils.js';

	type Props = {
		id: number;
		/** Compact badge for list cards; otherwise inline label + copy button. */
		variant?: 'badge' | 'inline';
		class?: string;
	};

	let { id, variant = 'inline', class: className }: Props = $props();
	const { t } = useI18n();

	const feedback = new CopyFeedback();
	const copied = $derived(feedback.isCopied());

	function notifyCopied(): void {
		getApp().toast.create({
			title: t('Action ID copied'),
			description: t('ID {id}', { id }),
			variant: 'success'
		});
	}

	function notifyCopyFailed(): void {
		getApp().toast.create({
			title: t('Could not copy Action ID'),
			variant: 'warning'
		});
	}

	async function copyBadge(event: MouseEvent): Promise<void> {
		event.preventDefault();
		event.stopPropagation();

		if (await feedback.copy(String(id))) {
			notifyCopied();
		} else {
			notifyCopyFailed();
		}
	}

	onDestroy(() => feedback.destroy());
</script>

{#if variant === 'badge'}
	<button
		type="button"
		class={cn('cursor-pointer', className)}
		aria-label={t('Copy action ID {id}', { id })}
		onclick={(event) => void copyBadge(event)}
		{@attach tooltip(() => (copied ? t('Copied') : t('Copy action ID')))}
	>
		<Badge size="sm" variant="ghost" class={cn('transition-none', copied && 'text-success-400')}>
			{t('ID {id}', { id })}
		</Badge>
	</button>
{:else}
	<div class={cn('flex items-center gap-1.5', className)}>
		<span class="text-sm text-dark-400">{t('Action ID')}</span>
		<code class="font-mono text-sm text-dark-200 tabular-nums">{id}</code>
		<CopyButton
			value={String(id)}
			label={t('Copy action ID')}
			copiedLabel={t('Copied')}
			class="shrink-0"
			onCopied={notifyCopied}
			onCopyError={notifyCopyFailed}
		/>
	</div>
{/if}
