<script lang="ts">
	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

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

	let copied = $state(false);

	async function copyId(event: MouseEvent): Promise<void> {
		event.preventDefault();
		event.stopPropagation();

		try {
			await navigator.clipboard.writeText(id);
			copied = true;
			app.toast.create({
				title: t('Command ID copied'),
				description: t('ID {id}', { id }),
				variant: 'success'
			});
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {
			app.toast.create({
				title: t('Could not copy Command ID'),
				variant: 'warning'
			});
		}
	}
</script>

{#if variant === 'badge'}
	<button
		type="button"
		class={cn('cursor-pointer', className)}
		aria-label={t('Copy command ID {id}', { id })}
		onclick={(event) => void copyId(event)}
		{@attach tooltip(() => (copied ? t('Copied') : t('Copy command ID')))}
	>
		<Badge size="sm" variant="ghost" class={cn(copied && 'text-success-400')}>
			{t('ID {id}', { id: shortId })}
		</Badge>
	</button>
{:else}
	<div class={cn('flex items-center gap-1.5', className)}>
		<span class="text-sm text-dark-400">{t('Command ID')}</span>
		<code class="font-mono text-sm text-dark-200 tabular-nums">{id}</code>
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon={copied ? 'ri:check-line' : 'ri:file-copy-line'}
			aria-label={t('Copy command ID {id}', { id })}
			onclick={(event) => void copyId(event)}
			class={cn('shrink-0', copied && 'text-success-400')}
			{@attach tooltip(() => (copied ? t('Copied') : t('Copy command ID')))}
		/>
	</div>
{/if}
