<script lang="ts">
	import type { CorePluginApi } from '../lib/plugin-api';
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);

	let revision = $state(0);

	const core = $derived(app.plugins.tryGet<CorePluginApi>('core'));

	$effect(() => {
		const logsApi = core?.logs;

		if (!logsApi) {
			return;
		}

		revision = logsApi.revision;

		return logsApi.subscribe(() => {
			revision = logsApi.revision;
		});
	});

	const logCount = $derived.by(() => {
		void revision;

		return core?.logs.getEntries().length ?? 0;
	});
</script>

<a href="/logs" class="block text-sm">
	<p class="text-2xl font-semibold text-dark-50">{String(logCount)}</p>
	<p class="mt-1 text-dark-100">{t('View all log entries')}</p>
</a>
