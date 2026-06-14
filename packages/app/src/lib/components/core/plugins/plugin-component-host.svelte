<script lang="ts">
	import type { Component } from 'svelte';

	import { importPluginHostSvelte } from '$lib/core/plugins/plugin-host-url';

	type Props = {
		component: Component<any>;
		props?: Record<string, unknown>;
	};

	let { component, props = {} }: Props = $props();

	let target = $state<HTMLDivElement | undefined>();

	$effect(() => {
		const element = target;
		const view = component;
		const viewProps = props;

		if (!element || !view) {
			return;
		}

		let mounted: Record<string, unknown> | undefined;
		let active = true;

		void importPluginHostSvelte().then(({ mount }) => {
			if (!active) {
				return;
			}

			mounted = mount(view, {
				target: element,
				props: viewProps
			});
		});

		return () => {
			active = false;

			const instance = mounted;

			if (instance) {
				void importPluginHostSvelte().then(({ unmount }) => unmount(instance));
			}
		};
	});
</script>

<div bind:this={target}></div>
