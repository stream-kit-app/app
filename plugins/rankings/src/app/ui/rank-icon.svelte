<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onDestroy } from 'svelte';
	import { watch } from 'runed';

	import { cn } from '@stream-kit/plugin/utils';

	import { DEFAULT_RANK_ICON, getRankIconKind } from '../../lib/rank-icon';
	import { getRankingsService } from '../lib/get-rankings';

	type Props = {
		icon?: string;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	};

	let { icon, size = 'md', class: className }: Props = $props();

	const app = getRankingsService().requireApp();
	const kind = $derived(getRankIconKind(icon));
	let resolvedSrc = $state<string | null>(null);
	let objectUrl = $state<string | null>(null);

	const sizeClasses = {
		sm: { shell: 'size-8', glyph: 'size-4', image: 'max-h-8 max-w-8' },
		md: { shell: 'size-10', glyph: 'size-5', image: 'max-h-10 max-w-10' },
		lg: { shell: 'size-16', glyph: 'size-8', image: 'max-h-16 max-w-16' }
	} as const;

	const shellSizeClass = $derived(sizeClasses[size].shell);
	const glyphSizeClass = $derived(sizeClasses[size].glyph);
	const imageMaxClass = $derived(sizeClasses[size].image);

	function clearObjectUrl(): void {
		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
			objectUrl = null;
		}
	}

	watch(
		() => icon ?? '',
		(next) => {
			clearObjectUrl();
			resolvedSrc = null;

			const trimmed = next.trim();
			if (!trimmed || getRankIconKind(trimmed) !== 'image') {
				return;
			}

			if (trimmed.startsWith('data:image/')) {
				resolvedSrc = trimmed;
				return;
			}

			if (!app.userFiles.isCloudUrl(trimmed)) {
				return;
			}

			void (async () => {
				try {
					const blob = await app.userFiles.fetchBlob(trimmed);
					if ((icon ?? '').trim() !== trimmed) {
						return;
					}
					clearObjectUrl();
					objectUrl = URL.createObjectURL(blob);
					resolvedSrc = objectUrl;
				} catch {
					if ((icon ?? '').trim() === trimmed) {
						resolvedSrc = null;
					}
				}
			})();
		}
	);

	onDestroy(() => {
		clearObjectUrl();
	});
</script>

<div
	class={cn(
		'flex shrink-0 items-center justify-center rounded-md border border-rule text-primary',
		shellSizeClass,
		className
	)}
	aria-hidden="true"
>
	{#if kind === 'image' && resolvedSrc}
		<img
			src={resolvedSrc}
			alt=""
			class={cn('size-full object-contain p-1', imageMaxClass)}
		/>
	{:else}
		<Icon icon={icon?.trim() || DEFAULT_RANK_ICON} class={glyphSizeClass} />
	{/if}
</div>
