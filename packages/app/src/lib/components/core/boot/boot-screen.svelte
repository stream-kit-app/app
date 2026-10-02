<script lang="ts">
	import { fade } from 'svelte/transition';

	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';

	type Props = {
		visible?: boolean;
		error?: string | null;
		onRetry?: () => void;
	};

	let { visible = true, error = null, onRetry }: Props = $props();

	const { t } = useI18n();

	// Styles live in app.html (shared with the static pre-JS splash). Offsetting the
	// animations by the static splash's start time keeps the handoff seamless.
	const bootSplashStartedAt =
		(window as { __bootSplashStartedAt?: number }).__bootSplashStartedAt ?? performance.now();
	const bootOffsetMs = bootSplashStartedAt - performance.now();
</script>

{#if visible}
	<div
		class="boot-splash"
		style:--boot-offset="{bootOffsetMs}ms"
		role={error ? 'alert' : 'status'}
		aria-live={error ? 'assertive' : 'polite'}
		aria-busy={error ? undefined : 'true'}
		out:fade={{ duration: 150 }}
	>
		<div class="boot-emblem" aria-hidden="true">
			<svg class="boot-spinner" viewBox="0 0 50 50">
				<circle class="boot-spinner-track" cx="25" cy="25" r="22" />
				{#if !error}
					<circle class="boot-spinner-arc" cx="25" cy="25" r="22" />
				{/if}
			</svg>
			<img class="boot-mark" src="/logo.svg" width="52" height="52" alt="" />
		</div>

		<div class="boot-text">
			{#if error}
				<p class="boot-title">{t('Could not start Stream Kit')}</p>
				<p class="boot-subtitle line-clamp-3 wrap-break-word" title={error}>{error}</p>
			{:else}
				<p class="boot-title">{t('Loading…')}</p>
				<p class="boot-subtitle">Stream Kit</p>
			{/if}
		</div>

		{#if error && onRetry}
			<Button size="sm" onclick={onRetry}>{t('Try again')}</Button>
		{/if}
	</div>
{/if}
