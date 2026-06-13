<script lang="ts">
	import type { CorePluginApi } from '@stream-kit/plugin';

	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { LogViewer } from '@stream-kit/ui/log-viewer';

	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	let core = $derived(app.plugins.tryGet<CorePluginApi>('core'));
	let revision = $state(0);

	const entries = $derived.by(() => {
		revision;
		return core?.logs.getEntries() ?? [];
	});

	$effect(() => {
		const api = core;

		if (!api) {
			return;
		}

		revision = api.logs.revision;

		return api.logs.subscribe(() => {
			revision = api.logs.revision;
		});
	});

	async function handleClear(): Promise<void> {
		await core?.logs.clear();
	}
</script>

<Container class="p-6">
	<Heading level={1} class="mb-6">{t('Logs')}</Heading>

	<LogViewer
		{entries}
		title={t('Action logs')}
		subtitle={t('Entries written by the Log handler')}
		allLabel={t('All')}
		infoLabel={t('Info')}
		warnLabel={t('Warning')}
		errorLabel={t('Error')}
		debugLabel={t('Debug')}
		searchPlaceholder={t('Filter logs…')}
		autoScrollLabel={t('Auto-scroll')}
		clearLabel={t('Clear logs')}
		copyLabel={t('Copy')}
		copiedLabel={t('Copied')}
		emptyLabel={t('No log entries yet.')}
		emptyDescription={t('Run an action with a Log handler to see entries here.')}
		filteredEmptyLabel={t('No matching logs')}
		filteredEmptyDescription={t('No logs match your current filter or search criteria.')}
		onClear={core ? handleClear : undefined}
	/>
</Container>
