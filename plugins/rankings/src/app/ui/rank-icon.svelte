<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onDestroy } from 'svelte';
	import { watch } from 'runed';

	import { cn } from '@stream-kit/plugin/utils';

	import { DEFAULT_RANK_ICON, getRankIconKind } from '../../lib/rank-icon';
	import { getRankingsService } from '../lib/get-rankings';

	type Props = {
		icon?: string;
		class?: string;
	};

	let { icon, class: className }: Props = $props();

	const app = getRankingsService().requireApp();
	const kind = $derived(getRankIconKind(icon));
	let resolvedSrc = $state<string | null>(null);
	let objectUrl = $state<string | null>(null);

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

			if (!/^https?:\/\//i.test(trimmed)) {
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
		'flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary',
		className
	)}
	aria-hidden="true"
>
	{#if kind === 'image' && resolvedSrc}
		<img src={resolvedSrc} alt="" class="size-full max-h-10 max-w-10 object-contain p-1" />
	{:else}
		<Icon icon={icon?.trim() || DEFAULT_RANK_ICON} class="size-5" />
	{/if}
</div>
