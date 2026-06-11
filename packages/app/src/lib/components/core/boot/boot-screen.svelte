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
		<div class="boot-grid" aria-hidden="true"></div>

		<div class="boot-enter relative z-10 flex flex-col items-center gap-8 px-6">
			<Logo />

			<div class="flex w-full flex-col items-center gap-3">
				<div class="boot-bar" aria-hidden="true">
					<div class="boot-bar-fill"></div>
				</div>

				<p class="font-outfit text-xs font-medium tracking-[0.2em] text-dark-400 uppercase">
					{t('Loading…')}
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.boot-bar {
		position: relative;
		width: 10rem;
		height: 2px;
		border-radius: 9999px;
		background: oklch(0.3 0.015 264 / 0.6);
		overflow: hidden;
	}

	.boot-bar-fill {
		position: absolute;
		inset-block: 0;
		width: 40%;
		border-radius: 9999px;
		background: #fffa00;
		animation: boot-bar-slide 1.4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
	}

	.boot-enter {
		animation: boot-enter 0.4s ease-out both;
	}

	@keyframes boot-enter {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes boot-bar-slide {
		from {
			translate: -110% 0;
		}

		to {
			translate: 260% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.boot-bar-fill,
		.boot-enter {
			animation: none;
		}
	}
</style>
