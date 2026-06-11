<script lang="ts">
	import { fade } from 'svelte/transition';

	import { Logo } from '@stream-kit/ui/logo';

	import { useI18n } from '$lib/i18n';

	type Props = {
		visible?: boolean;
	};

	let { visible = true }: Props = $props();

	const { t } = useI18n();
</script>

{#if visible}
	<div
		class="fixed inset-0 z-200 flex items-center justify-center overflow-hidden bg-dark-950"
		role="status"
		aria-live="polite"
		aria-busy="true"
		aria-label={t('Loading…')}
		out:fade={{ duration: 75, delay: 200 }}
	>
		<div class="boot-ambient" aria-hidden="true"></div>
		<div class="boot-grid" aria-hidden="true"></div>

		<div class="relative z-10 flex flex-col items-center gap-8 px-6">
			<div class="boot-logo-shell">
				<div class="boot-logo-glow" aria-hidden="true"></div>
				<div class="boot-logo">
					<Logo />
				</div>
			</div>

			<div class="flex w-full max-w-xs flex-col items-center gap-4">
				<p class="font-outfit text-sm font-medium tracking-[0.2em] text-dark-200 uppercase">
					{t('Loading…')}
				</p>

				<div class="flex items-center gap-2" aria-hidden="true">
					<span class="boot-dot"></span>
					<span class="boot-dot boot-dot-delay-1"></span>
					<span class="boot-dot boot-dot-delay-2"></span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.boot-logo-shell {
		position: relative;
		display: grid;
		place-items: center;
	}

	.boot-logo-glow {
		position: absolute;
		width: 12rem;
		height: 12rem;
		border-radius: 9999px;
		background: radial-gradient(circle, #fffa00 0%, transparent 68%);
		opacity: 0.35;
		filter: blur(24px);
		animation: boot-logo-glow 2.4s ease-in-out infinite;
	}

	.boot-logo {
		position: relative;
		animation: boot-logo-float 3s ease-in-out infinite;
	}

	.boot-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 9999px;
		background: oklch(0.62 0.14 255);
		animation: boot-dot-bounce 1.2s ease-in-out infinite;
	}

	.boot-dot-delay-1 {
		animation-delay: 0.15s;
	}

	.boot-dot-delay-2 {
		animation-delay: 0.3s;
	}

	@keyframes boot-logo-glow {
		0%,
		100% {
			opacity: 0.28;
			transform: scale(0.92);
		}

		50% {
			opacity: 0.5;
			transform: scale(1.08);
		}
	}

	@keyframes boot-logo-float {
		0%,
		100% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-6px);
		}
	}

	@keyframes boot-dot-bounce {
		0%,
		80%,
		100% {
			transform: translateY(0);
			opacity: 0.45;
		}

		40% {
			transform: translateY(-5px);
			opacity: 1;
		}
	}
</style>
