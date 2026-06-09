<script lang="ts">
	import type { LayoutProps } from './$types';

	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { ConfirmDialog } from '$lib/components/core/confirm';
	import { Modal } from '$lib/components/core/modal';
	import { Toast } from '$lib/components/core/toast';
	import { Logo } from '@stream-kit/ui/logo';
	import * as Nav from '@stream-kit/ui/nav';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';
	import { TooltipProvider } from '@stream-kit/ui/tooltip';
	import { app } from '$lib/core';
	import {
		initPluginDevWatcher,
		syncPluginDevWatchers
	} from '$lib/core/plugins/plugin-dev-watcher';
	import { settings } from '$lib/core/settings';
	import { registerI18n, useI18n } from '$lib/i18n';

	import './layout.css';

	let { children, data }: LayoutProps = $props();

	registerI18n(() => data.i18n);
	const { t } = useI18n();

	function translateTitle(title: string): string {
		return t(title as Parameters<typeof t>[0]);
	}

	onMount(() => {
		void (async () => {
			await settings.load();
			await initPluginDevWatcher();
			await syncPluginDevWatchers(app);
		})();
	});
</script>

<TooltipProvider>
	<div class="flex h-screen w-screen items-stretch p-4">
		<aside class="flex h-full w-64 flex-col rounded-xl bg-dark-800 shadow-sm">
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

{#each app.modals.entries() as [, modal]}
	<Modal {modal} />
{/each}

<ConfirmDialog confirm={app.confirm} />
<Toast toast={app.toast} />
