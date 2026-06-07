<script lang="ts">
	import Icon from '@iconify/svelte';

	import { ConfirmDialog } from '$lib/components/core/confirm';
	import { Modal } from '$lib/components/core/modal';
	import { Toast } from '$lib/components/core/toast';
	import * as Nav from '$lib/components/ui/nav';
	import { Link } from '$lib/components/ui/nav';
	import { TooltipProvider } from '$lib/components/ui/tooltip';
	import { app } from '$lib/core';

	import './layout.css';

	const { children } = $props();
</script>

<TooltipProvider>
	<div class="flex h-screen w-screen items-stretch p-4">
		<aside class="flex h-full w-64 flex-col rounded-xl bg-dark-800 shadow-sm">
			<section class="p-2.5">
				<Nav.Root items={app.menu.items} />
			</section>
		</aside>
		<main class="flex-1">
			{@render children()}
		</main>
	</div>
</TooltipProvider>

{#each app.modals.entries() as [, modal]}
	<Modal {modal} />
{/each}

<ConfirmDialog confirm={app.confirm} />
<Toast toast={app.toast} />
