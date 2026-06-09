<script lang="ts">
	import type { SupportedLocale } from '$lib/i18n';

	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox, InputSelect } from '@stream-kit/ui/input';
	import { app } from '$lib/core';
	import { saveLocale } from '$lib/core/locale/store';
	import {
		stopAllPluginDevWatchers,
		syncPluginDevWatchers
	} from '$lib/core/plugins/plugin-dev-watcher';
	import { settings } from '$lib/core/settings';
	import { useI18n } from '$lib/i18n';

	const { t, getLocale, setLocale } = useI18n();

	const localeItems = $derived([
		{ value: 'en', label: t('English') },
		{ value: 'nl', label: t('Dutch') }
	]);

	let selectedLocale = $state(getLocale() as SupportedLocale);
	let developerMode = $state(false);
	let hasLoadedSettings = $state(false);

	$effect(() => {
		void settings.ensureLoaded().then(() => {
			developerMode = settings.developerMode;
			hasLoadedSettings = true;
		});
	});

	$effect(() => {
		const locale = selectedLocale;

		if (locale === getLocale()) {
			return;
		}

		setLocale(locale);
		void saveLocale(locale);
	});

	$effect(() => {
		if (!hasLoadedSettings) {
			return;
		}

		const enabled = developerMode;

		if (enabled === settings.developerMode) {
			return;
		}

		void (async () => {
			await settings.setDeveloperMode(enabled);

			if (!enabled) {
				await stopAllPluginDevWatchers(app);
				return;
			}

			await syncPluginDevWatchers(app);
		})();
	});
</script>

<Container class="px-6 py-6">
	<Heading level="1">{t('Settings')}</Heading>

	<section class="mt-6 flex max-w-xl flex-col gap-4">
		<Heading level="3">{t('Appearance')}</Heading>

		<InputSelect
			type="single"
			label={t('Language')}
			items={localeItems}
			bind:value={selectedLocale}
		/>
	</section>

	<section class="mt-8 flex max-w-xl flex-col gap-4">
		<Heading level="3">{t('Developer')}</Heading>

		<InputCheckbox inline label={t('Developer mode')} bind:checked={developerMode} />

		<p class="text-sm text-dark-100">{t('Enable developer tools and plugin hot-reload')}</p>
	</section>
</Container>
