<script lang="ts">
	import { onDestroy } from 'svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { CopyButton, CopyFeedback } from '@stream-kit/ui/copy-button';

	import { cn } from '@stream-kit/plugin/utils';

	import { getCommandsService } from '../lib/get-commands';

	type Props = {
		id: string;
		/** Compact badge for list cards; otherwise inline label + copy button. */
		variant?: 'badge' | 'inline';
		class?: string;
	};

	let { id, variant = 'inline', class: className }: Props = $props();

	const app = getCommandsService().requireApp();
	const t = app.i18n.t;
	const shortId = $derived(id.length > 8 ? id.slice(0, 8) : id);

	const feedback = new CopyFeedback();
	const copied = $derived(feedback.isCopied());

	function notifyCopied(): void {
		app.toast.create({
			title: t('Command ID copied'),
			description: t('ID {id}', { id }),
			variant: 'success'
		});
	}

	function notifyCopyFailed(): void {
		app.toast.create({
			title: t('Could not copy Command ID'),
			variant: 'warning'
		});
	}

	async function copyBadge(event: MouseEvent): Promise<void> {
		event.preventDefault();
		event.stopPropagation();

		if (await feedback.copy(id)) {
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
		aria-label={t('Copy command ID {id}', { id })}
		onclick={(event) => void copyBadge(event)}
		{@attach tooltip(() => (copied ? t('Copied') : t('Copy command ID')))}
	>
		<Badge size="sm" variant="ghost" class={cn('transition-none', copied && 'text-success-400')}>
			{t('ID {id}', { id: shortId })}
		</Badge>
	</button>
{:else}
	<div class={cn('flex items-center gap-1.5', className)}>
		<span class="text-sm text-dark-400">{t('Command ID')}</span>
		<code class="font-mono text-sm text-dark-200 tabular-nums">{id}</code>
		<CopyButton
			value={id}
			label={t('Copy command ID')}
			copiedLabel={t('Copied')}
			class="shrink-0"
			onCopied={notifyCopied}
			onCopyError={notifyCopyFailed}
		/>
	</div>
{/if}
