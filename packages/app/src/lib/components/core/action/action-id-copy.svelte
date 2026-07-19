<script lang="ts">
	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		id: number;
		/** Compact badge for list cards; otherwise inline label + copy button. */
		variant?: 'badge' | 'inline';
		class?: string;
	};

	let { id, variant = 'inline', class: className }: Props = $props();
	const { t } = useI18n();

	let copied = $state(false);

	async function copyId(event: MouseEvent): Promise<void> {
		event.preventDefault();
		event.stopPropagation();

		try {
			await navigator.clipboard.writeText(String(id));
			copied = true;
			getApp().toast.create({
				title: t('Action ID copied'),
				description: t('ID {id}', { id }),
				variant: 'success'
			});
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {
			getApp().toast.create({
				title: t('Could not copy Action ID'),
				variant: 'warning'
			});
		}
	}
</script>

{#if variant === 'badge'}
	<button
		type="button"
		class={cn('cursor-pointer', className)}
		aria-label={t('Copy action ID {id}', { id })}
		onclick={(event) => void copyId(event)}
		{@attach tooltip(() => (copied ? t('Copied') : t('Copy action ID')))}
	>
		<Badge size="sm" variant="ghost" class={cn(copied && 'text-success-400')}>
			{t('ID {id}', { id })}
		</Badge>
	</button>
{:else}
	<div class={cn('flex items-center gap-1.5', className)}>
		<span class="text-sm text-dark-400">{t('Action ID')}</span>
		<code class="font-mono text-sm text-dark-200 tabular-nums">{id}</code>
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon={copied ? 'ri:check-line' : 'ri:file-copy-line'}
			aria-label={t('Copy action ID {id}', { id })}
			onclick={(event) => void copyId(event)}
			class={cn('shrink-0', copied && 'text-success-400')}
			{@attach tooltip(() => (copied ? t('Copied') : t('Copy action ID')))}
		/>
	</div>
{/if}
