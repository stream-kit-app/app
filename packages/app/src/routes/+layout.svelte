<script lang="ts">
	import type { LayoutProps } from './$types';

	import { dev } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	import { Logo } from '@stream-kit/ui/logo';
	import * as Nav from '@stream-kit/ui/nav';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';
	import { TooltipProvider } from '@stream-kit/ui/tooltip';

	import { BootScreen } from '$lib/components/core/boot';
	import { ConfirmDialog } from '$lib/components/core/confirm';
	import { Modal } from '$lib/components/core/modal';
	import { Toast } from '$lib/components/core/toast';
	import { app, bootApp } from '$lib/core';
	import {
		centerBootWindow,
		MAIN_WINDOW_CORNER_RADIUS_PX,
		revealMainWindow
	} from '$lib/core/window';
	import { registerI18n, useI18n } from '$lib/i18n';

	import './layout.css';

	let { children, data }: LayoutProps = $props();

	let isAppReady = $state(false);
	let isRevealingWindow = $state(false);
	let bootError = $state<string | null>(null);

	registerI18n(() => data.i18n);
	const { t } = useI18n();

	function translateTitle(title: string): string {
		return t(title as Parameters<typeof t>[0]);
	}

	bootApp()
		.then(async () => {
			if (!dev) {
				isRevealingWindow = true;
			}

			await revealMainWindow();

			isRevealingWindow = false;
			isAppReady = true;
		})
		.catch((error) => {
			bootError = error instanceof Error ? error.message : String(error);
		});

	function retryBoot(): void {
		// A full reload guarantees a clean state; re-running a partially completed
		// boot in-process could double-register plugins.
		window.location.reload();
	}

	onMount(async () => {
		if (!dev) {
			await centerBootWindow();
		}

		await tick();
		requestAnimationFrame(() => {
			document.getElementById('boot-splash')?.remove();
		});
	});

	beforeNavigate(() => {
		for (const [, modal] of app.modals) {
			modal.close();
		}
	});

	$effect(() => {
		if (dev) {
			return;
		}

		document.documentElement.style.setProperty(
			'--app-window-radius',
			isAppReady ? `${MAIN_WINDOW_CORNER_RADIUS_PX}px` : '0px'
		);

		document.documentElement.classList.toggle('app-window-ready', isAppReady);
	});
</script>

<BootScreen visible={!isAppReady || isRevealingWindow} error={bootError} onRetry={retryBoot} />

{#if isAppReady}
	<div
		class="relative isolate h-screen w-screen overflow-hidden"
		in:fade={{ duration: dev ? 0 : 300 }}
	>
		<div class="boot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>

		<TooltipProvider>
			<div class="flex h-full w-full items-stretch p-4">
				<aside
					class="flex h-full w-64 flex-col rounded-xl border border-dark-600 bg-dark-800 shadow-sm"
				>
					<section class="mt-4 mb-4 p-2.5">
						<Logo />
					</section>
					<section class="p-2.5">
						<Nav.Root
							items={app.menu.items}
							activePath={page.url.pathname}
							{translateTitle}
						/>
					</section>
				</aside>
				<main class="flex min-h-0 flex-1 flex-col">
					<ScrollArea
						orientation="vertical"
						class="h-full min-h-0 overflow-hidden"
						viewportClasses="h-full"
					>
						{@render children()}
					</ScrollArea>
				</main>
			</div>
		</TooltipProvider>

		{#each app.modals.entries() as [id, modal] (id)}
			<Modal {modal} onClosed={() => app.removeModal(id)} />
		{/each}

		<ConfirmDialog confirm={app.confirm} />
		<Toast toast={app.toast} />
	</div>
{/if}
