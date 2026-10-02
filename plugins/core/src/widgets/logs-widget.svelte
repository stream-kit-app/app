<script lang="ts">
	import type { CorePluginApi } from '../lib/plugin-api';
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	import { WidgetStat } from '@stream-kit/ui/widget';

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

<WidgetStat
	label={t('Log entries')}
	value={logCount}
	hint={t('View all log entries')}
	href="/logs"
/>
