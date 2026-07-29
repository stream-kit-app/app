<script lang="ts">
	import type { LayoutProps } from './$types';

	import { dev } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	import { Crosshair } from '@stream-kit/ui/blueprint';
	import { Logo } from '@stream-kit/ui/logo';
	import * as Nav from '@stream-kit/ui/nav';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';
	import { TooltipProvider } from '@stream-kit/ui/tooltip';

	import { BootScreen } from '$lib/components/core/boot';
	import { ConfirmDialog } from '$lib/components/core/confirm';
	import { Modal } from '$lib/components/core/modal';
	import { AppPageHeader } from '$lib/components/core/page-header';
	import { Toast } from '$lib/components/core/toast';
	import { AppToolbar } from '$lib/components/core/toolbar';
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
		app.pageHeader.reset();
		app.toolbar.reset();

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
		class="relative isolate h-screen w-screen overflow-hidden bg-background"
		in:fade={{ duration: dev ? 0 : 300 }}
	>
		<TooltipProvider>
			<div class="flex h-full w-full overflow-hidden">
				<aside class="relative flex h-full w-64 shrink-0 flex-col border-r border-rule">
					<section class="relative flex h-14 shrink-0 items-center border-b border-rule px-4">
						<Crosshair position="top-right" size="sm" />
						<span class="[&>span]:grid-cols-[28px_auto] [&>span]:gap-1.5 [&_svg]:h-7 [&_svg]:w-7 [&>span>span]:text-sm">
							<Logo />
						</span>
					</section>
					<section class="flex min-h-0 flex-1 flex-col px-2.5 py-2">
						<ScrollArea
							orientation="vertical"
							class="h-full min-h-0 overflow-hidden"
							viewportClasses="h-full"
						>
							<Nav.Root
								items={app.menu.items}
								activePath={page.url.pathname}
								{translateTitle}
							/>
						</ScrollArea>
					</section>
				</aside>
				<div class="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
					<AppPageHeader />
					<AppToolbar />
					<main class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
						<ScrollArea
							orientation="vertical"
							class="h-full min-h-0 overflow-hidden"
							viewportClasses="h-full [&>*]:min-h-full"
						>
							{@render children()}
						</ScrollArea>
					</main>
				</div>
			</div>

			{#each app.modals.entries() as [id, modal] (id)}
				<Modal {modal} onClosed={() => app.removeModal(id)} />
			{/each}
		</TooltipProvider>

		<ConfirmDialog confirm={app.confirm} />
		<Toast toast={app.toast} />
	</div>
{/if}
