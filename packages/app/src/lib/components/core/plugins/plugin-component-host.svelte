<script lang="ts">
	import type { Component } from 'svelte';

	import { ensurePluginHostTooltipProvider } from '$lib/core/plugins/plugin-host-tooltip';
	import { importPluginHostSvelte } from '$lib/core/plugins/plugin-host-url';

	type Props = {
		component: Component<any>;
		props?: Record<string, unknown>;
	};

	let { component, props = {} }: Props = $props();

	let target = $state<HTMLDivElement | undefined>();
	let hostProps = $state<Record<string, unknown>>({});

	$effect(() => {
		const nextProps = props;

		for (const key of Object.keys(hostProps)) {
			if (!(key in nextProps)) {
				delete hostProps[key];
			}
		}

		Object.assign(hostProps, nextProps);
	});

	$effect(() => {
		const element = target;
		const view = component;

		if (!element || !view) {
			return;
		}

		let mounted: Record<string, unknown> | undefined;
		let active = true;

		void (async () => {
			await ensurePluginHostTooltipProvider();

			if (!active) {
				return;
			}

			const { mount } = await importPluginHostSvelte();

			if (!active) {
				return;
			}

			mounted = mount(view, {
				target: element,
				props: hostProps
			});
		})();

		return () => {
			active = false;

			const instance = mounted;

			if (instance) {
				void importPluginHostSvelte().then(({ unmount }) => unmount(instance));
			}
		};
	});
</script>

<div bind:this={target} class="flex min-h-full flex-col"></div>
